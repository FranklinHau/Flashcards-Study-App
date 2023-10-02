from flask import Blueprint, request, jsonify
from config import db 
from app.models import User 

# Creating a Blueprint for the user routes 
user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/users', methods=['POST'])
    
