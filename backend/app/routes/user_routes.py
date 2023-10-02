from flask import Blueprint, request, jsonify
from config import db 
from app.models import User 

# Creating a Blueprint for the user routes 
user_routes = Blueprint('user_routes', __name__)

# Create operation 
@user_routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        username=data['username'],
        email=data['email']
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created'}), 201

# Read operation
@user_routes.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user: 
        return jsonify(user.serialize()), 200
    return jsonify({'message': 'User not found'}), 404


    
    
