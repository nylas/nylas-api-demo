import json

from flask import jsonify, request, session

from api.index import app, db
from api.model import User


@app.route("/login", methods=['POST'])
def login():
    if request.data:
        body = json.loads(request.data)
        email, password = body.get('email'), body.get('password')
        if email and password:
            # authenticate
            user = db.session.query(User).filter(User.email == email).first()

            if user is not None and user.check_password(password) is True:
                session['nylas_access_token'] = user.nylas_access_token
                return jsonify({'email': user.email,
                                'firstName': user.first_name,
                                'lastName': user.last_name}), 200
            else:
                return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({'message': 'Missing credentials'}), 400
