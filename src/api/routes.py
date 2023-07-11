"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    # Get email and password from request body
    email = request.json.get('email')
    password = request.json.get('password')

    # Check if user with the provided email already exists
    if User.query.filter_by(email=email).first():
        raise APIException('User already exists', status_code=400)

    # Create a new user
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Return success message
    response_body = {
        'message': 'User created successfully'
    }
    return jsonify(response_body), 201


@api.route('/login', methods=['POST'])
def handle_login():
    # Get email and password from request body
    email = request.json.get('email')
    password = request.json.get('password')

    # Find user by email
    user = User.query.filter_by(email=email).first()

    # Check if user exists and the password is correct
    if not user or not user.check_password(password):
        raise APIException('Invalid email or password', status_code=401)

    # Generate token or session for the logged-in user
    token = generate_token()  # Replace with your token generation logic

    # Return the token as the response
    response_body = {
        'token': token
    }
    return jsonify(response_body), 200


@api.route('/private', methods=['GET'])
def handle_private():
    # Get token from request headers or query parameters
    token = request.headers.get('Authorization')  # Example: Bearer <token>

    # Check if token exists and is valid (add your token validation logic here)

    # Return private data
    response_body = {
        'message': 'Private data'
    }
    return jsonify(response_body), 200