from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token

app = Flask(__name__)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    rb = request.get_json()
    email = rb["email"]
    password = rb["password"]
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify(message='Email already registered'), 200

    new_user = User(email=rb["email"], password=rb["password"], is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message='User registered successfully'), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(message='Failed to register user'), 500

@api.route('/login', methods=['POST'])
def login():
    get_login = request.get_json()
    email = get_login["email"]
    password = get_login["password"]

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({'message': 'Invalid credentials'}), 401

    # create token
    access_token = create_access_token(identity= user.id)
    return jsonify({'message': 'Logged in successfully.', 'access_token':access_token}), 200


app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run()
