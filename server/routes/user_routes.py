import logging
from flask import Blueprint, request, jsonify
from config import db
from models.user import User
from werkzeug.security import check_password_hash
from validate_email_address import validate_email

# Initialize logging
logging.basicConfig(filename='application.log', level=logging.DEBUG)

# Define the user_routes Blueprint
user_routes = Blueprint('user_routes', __name__)

# Endpoint to create a new user
@user_routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validate required fields
    if not all(k in data for k in ('email', 'username', 'password')):
        return jsonify({'message': 'Missing fields'}), 400

    # Validate email format
    if not validate_email(data['email']):
        return jsonify({'message': 'Invalid email'}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Email already in use'}), 400

    # Create and save the new user
    new_user = User(email=data['email'], username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Endpoint to get user details
@user_routes.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'User not found'}), 404

# Endpoint to update user details
@user_routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user:
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        db.session.commit()
        return jsonify({'message': 'User updated'}), 200

    return jsonify({'message': 'User not found'}), 404

# Endpoint to delete a user
@user_routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'}), 200

    return jsonify({'message': 'User not found'}), 404

# Endpoint to login a user
@user_routes.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.hashed_password, password):
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid email or password'}), 401
