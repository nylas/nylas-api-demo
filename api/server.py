import json
from typing import Tuple, Optional

from flask import jsonify, request, session, Response

from api.index import app, db
from api.model import User
from api.nylas import NylasAPI

NYLAS_ACCESS_TOKEN_KEY = 'nylas_access_token'
USER_ID_KEY = 'user_id'


def get_nylas_api() -> NylasAPI:
    # the before_request check_authorization() function ensures truthy values
    # for session[NYLAS_ACCESS_TOKEN_KEY] on all routes _except_ `login`
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    return NylasAPI(nylas_access_token)


@app.before_request
def check_authorization() -> Optional[Tuple[Response, int]]:
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    if request.path != '/login' and not nylas_access_token:
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
    return jsonify(response_json), status_code


@app.route('/events/<event_id>', methods=['GET'])
def get_event(event_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    response_json, status_code = nylas_api.get_event(event_id)
    return jsonify(response_json), status_code


@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    event_json = request.json
    response_json, status_code = nylas_api.update_event(event_id, event_json)
    return jsonify(response_json), status_code


@app.route('/messages', methods=['GET'])
def get_messages() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    message_json = request.json
    response_json, status_code = nylas_api.get_messages(message_json)
    return jsonify(response_json), status_code


@app.route('/send', methods=['POST'])
def send_email() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    email_data = request.json
    response_json, status_code = nylas_api.send_email(email_data)
    return jsonify(response_json), status_code


@app.route('/threads/<thread_id>', methods=['GET'])
def get_thread(thread_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    response_json, status_code = nylas_api.get_thread(thread_id)
    return jsonify(response_json), status_code


@app.route('/threads', methods=['GET'])
def get_threads() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    thread_json = request.json
    response_json, status_code = nylas_api.get_threads(thread_json)
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

    if 'display_text' in user_json:
        user.display_text = user_json['display_text']
    if 'display_logo' in user_json:
        user.display_logo = user_json['display_logo']
    if 'default_calendar' in user_json:
        user.default_calendar = user_json['default_calendar']

    try:
        db.session.add(user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({'message': 'Error Accessing Database.'}), 500

    return jsonify(user.serialize()), 200
