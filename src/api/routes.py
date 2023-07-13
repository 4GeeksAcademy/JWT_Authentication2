from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
import secrets

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
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Your login logic here
    
    # Generate a random access token
    access_token = secrets.token_hex(16)
    
    response_body = {
        'message': 'Logged in successfully',
        'access_token': access_token
    }
    return jsonify(response_body), 200

users = [
    {'email': 'test1@example.com', 'password': 'password1'},
    {'email': 'test2@example.com', 'password': 'password2'},
]

@api.route('/token', methods=['POST'])
def generate_token():
    # Get email and password from request body
    email = request.json.get('email')
    password = request.json.get('password')

    # Validate email and password
    user = next((user for user in users if user['email'] == email), None)
    if user and user['password'] == password:
        # Generate a random access token
        access_token = secrets.token_hex(16)

        response_body = {
            'access_token': access_token
        }
        return jsonify(response_body), 200
# Register the API blueprint
app.register_blueprint(api, url_prefix='/api')

# Run the Flask app
if __name__ == '__main__':
    app.run()
