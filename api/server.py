import json
from typing import Tuple, Optional

from flask import jsonify, request, session, Response

from api.index import app, db
from api.model import User
from api.nylas import NylasAPI

NYLAS_ACCESS_TOKEN_KEY = 'nylas_access_token'


def get_nylas_api() -> NylasAPI:
    # the before_request check_authorization() function ensures truthy values
    # for session[NYLAS_ACCESS_TOKEN_KEY] on all routes _except_ `login`
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    return NylasAPI(nylas_access_token)


@app.before_request
def check_authorization() -> Optional[Tuple[Response, int]]:
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    if request.path != '/login' and not nylas_access_token:
        return jsonify({'message': 'Missing credentials'}), 400
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
                session[NYLAS_ACCESS_TOKEN_KEY] = user.nylas_access_token
                return jsonify({'email': user.email,
                                'firstName': user.first_name,
                                'lastName': user.last_name}), 200
            else:
                return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Missing credentials'}), 400


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


@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id) -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    event_json = request.json
    response_json, status_code = nylas_api.update_event(event_id, event_json)
    return jsonify(response_json), status_code


@app.route('/send', methods=['POST'])
def send_email() -> Tuple[Response, int]:
    nylas_api = get_nylas_api()
    email_data = request.json
    response_json, status_code = nylas_api.send_email(email_data)
    return jsonify(response_json), status_code


@app.route('/thread/<thread_id>', methods=['GET'])
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
