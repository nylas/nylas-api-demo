import json

from flask import jsonify, request, session

from api.index import app, db
from api.model import User
from api.nylas import NylasAPI

NYLAS_ACCESS_TOKEN_KEY = 'nylas_access_token'


def get_nylas_api():
    nylas_access_token = session.get(NYLAS_ACCESS_TOKEN_KEY)
    if nylas_access_token:
        return NylasAPI(nylas_access_token)


@app.route('/login', methods=['POST'])
def login():
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


@app.route('/threads', methods=['GET'])
def get_threads():
    nylas_api = get_nylas_api()

    if nylas_api:
        thread_json = request.json
        response_json, status_code = nylas_api.get_threads(thread_json)
        return jsonify(response_json), status_code

    return jsonify({'message': 'Access token required'}), 400


@app.route('/send', methods=['POST'])
def send_email():
    nylas_api = get_nylas_api()

    if nylas_api:
        email_data = request.json
        response_json, status_code = nylas_api.send_email(email_data)
        return jsonify(response_json), status_code

    return jsonify({'message': 'Access token required'}), 400
