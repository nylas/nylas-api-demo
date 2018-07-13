import json
import os
from typing import Tuple, Optional

from flask import jsonify, request, session, Response, make_response
from flask_cors import CORS

from api.cache import MAX_AGE, ObjectCache, ObjectListCache
from api.index import app, db
from api.model import User
from api.nylas.nylas_api import NylasAPI
from api.nylas.nylas_utils import verify_signature

NYLAS_ACCESS_TOKEN_KEY = 'nylas_access_token'
USER_ID_KEY = 'user_id'

# FRONTEND = '*nylas-sales-demo.herokuapp.com/' if os.environ['NYLAS_ENV'] == 'production' else '*'
open_traffic_routes = {'/login', '/webhook'}
CORS(app,
     resources={'*'},
     origins=['http://localhost:3000',
              'https://nylas-sales-demo.herokuapp.com',
              'https://api.nylas.com'],
     methods=['GET', 'POST', 'PUT', 'OPTIONS'],
     allow_headers=['Content-Type'],
     supports_credentials=True)

event_cache = ObjectCache(max_len=100, max_age_seconds=MAX_AGE)
thread_messages_cache = ObjectListCache(max_len=100, max_age_seconds=MAX_AGE)


def get_nylas_api() -> NylasAPI:
    # the before_request check_authorization() function ensures truthy values
    # for session[NYLAS_ACCESS_TOKEN_KEY] on all routes _except_ `open_traffic_routes`
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    return NylasAPI(nylas_access_token)


@app.before_request
def check_authorization() -> Optional[Tuple[Response, int]]:
    # Don't require authentication on preflight requests
    if request.method == 'OPTIONS':
        return None
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    if request.path not in open_traffic_routes and not nylas_access_token:
        return jsonify({'message': 'Missing credentials'}), 401
    return None


@app.route('/login', methods=['POST'])
def login() -> Tuple[Response, int]:
    if request.data:
        body = json.loads(request.data)
        email, password = body.get('email'), body.get('password')
        if email and password:
            # authenticate
            user = db.session.query(User).filter(User.email == email).first()

            if user is not None and user.check_password(password) is True:
                # persist user data in session
                session[NYLAS_ACCESS_TOKEN_KEY] = user.nylas_access_token
                session[USER_ID_KEY] = user.id
                return jsonify(user.serialize()), 200
            else:
                return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Missing credentials'}), 401


@app.route('/logout', methods=['POST'])
def logout() -> Tuple[Response, int]:
    del session[USER_ID_KEY]
    return jsonify('Success'), 200


@app.route('/calendars', methods=['GET'])
def get_calendars() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    response_json, status_code = nylas_api.get_calendars()
    return jsonify(response_json), status_code


@app.route('/events', methods=['POST'])
def create_event() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    event_json = request.json
    response_json, status_code = nylas_api.create_event(event_json)
    # Add event to event cache
    if status_code == 200:
        event_id = response_json['id']
        event_cache.add(event_id, response_json)
    return jsonify(response_json), status_code


@app.route('/events/<event_id>', methods=['GET'])
def get_event(event_id) -> Tuple[Response, int]:
    # if event is cached and doesn't need to be refreshed, return it
    cached_event = event_cache.get_if_fresh(event_id)
    if cached_event:
        return jsonify(cached_event), 200
    nylas_api = get_nylas_api()
    response_json, status_code = nylas_api.get_event(event_id)
    # update cache with fresh data
    if status_code == 200:
        event_cache.update(event_id, response_json)
    return jsonify(response_json), status_code


@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    event_json = request.json
    response_json, status_code = nylas_api.update_event(event_id, event_json)
    # update cache with fresh data
    if status_code == 200:
        event_cache.update(event_id, response_json)
    return jsonify(response_json), status_code


@app.route('/messages', methods=['GET'])
def get_messages() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    message_args = request.args or {}
    thread_id = message_args.get('thread_id')
    # If thread_id persisted in cache and not marked for refresh, return it
    # Note: Implementation doesn't allow for further filtering on cached messages
    if thread_id:
        cached_messages = thread_messages_cache.get_if_fresh(thread_id)
        if cached_messages:
            return jsonify(cached_messages), 200
    response_json, status_code = nylas_api.get_messages(message_args)
    # If thread_id persisted in cache, persist refreshed message data
    if status_code == 200 and thread_id:
        thread_messages_cache.update(thread_id, response_json)
    return jsonify(response_json), status_code


@app.route('/send', methods=['POST'])
def send_email() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    email_data = request.json
    response_json, status_code = nylas_api.send_email(email_data)
    # Add thread to thread cache
    if status_code == 200:
        thread_id = response_json['thread_id']
        thread_messages_cache.add(thread_id, response_json)
    return jsonify(response_json), status_code


@app.route('/threads/<thread_id>', methods=['GET'])
def get_thread(thread_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    response_json, status_code = nylas_api.get_thread(thread_id)
    return jsonify(response_json), status_code


@app.route('/threads', methods=['GET'])
def get_threads() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    thread_args = request.args
    response_json, status_code = nylas_api.get_threads(thread_args)
    return jsonify(response_json), status_code


@app.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id) -> Tuple[Response, int]:
    """
    Allows users to update the display text, display logo, and default calendar for their account.
    """
    user_id = int(user_id)
    if user_id != session.get(USER_ID_KEY):
        return jsonify({'message': 'Unauthorized action'}), 401

    user = db.session.query(User).get(user_id)
    user_json = request.json

    if 'companyText' in user_json:
        user.company_text = user_json['companyText']
    if 'companyLogo' in user_json:
        user.company_logo = user_json['companyLogo']
    if 'defaultCalendar' in user_json:
        user.default_calendar = user_json['defaultCalendar']

    try:
        db.session.add(user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({'message': 'Error Accessing Database.'}), 500

    return jsonify(user.serialize()), 200


@app.route('/webhook', methods=['POST'])
def receive_webhook() -> Tuple[Response, int]:
    nylas_oauth_client_secret = os.environ.get('NYLAS_OAUTH_CLIENT_SECRET')
    if nylas_oauth_client_secret is None:
        raise Exception('Environment variable NYLAS_OAUTH_CLIENT_SECRET not set.')

    is_genuine = verify_signature(message=request.data,
                                  key=nylas_oauth_client_secret.encode('utf8'),
                                  signature=request.headers.get('X-Nylas-Signature'))
    if not is_genuine:
        return jsonify({'message': 'Signature verification failed'}), 401

    data = request.json
    for delta in data['deltas']:
        if delta['object'] == 'event':
            # we only cache a subset of the most recent events; mark event for refresh
            event_id = delta['object_data']['id']
            event_cache.set_refresh(event_id)
        elif delta['type'] == 'thread.replied':
            # we only cache a subset of the most recent threads; mark thread for refresh
            thread_id = delta['object_data']['metadata']['thread_id']
            thread_messages_cache.set_refresh(thread_id)

    return jsonify('Success'), 200


@app.route('/webhook', methods=['GET'])
def validate_webhook() -> Tuple[Response, int]:
    # After we register a new webhook, Nylas sends a GET request with a `challenge` param to the endpoint.
    # To validate the new webhook, just return the `challenge` param.
    return make_response(request.args.get("challenge")), 200
