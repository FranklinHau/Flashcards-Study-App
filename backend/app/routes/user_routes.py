from flask import Blueprint, request, jsonify
from config import db 
from app.models.user import User 
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from config import app
from validate_email_address import validate_email


# Creating a Blueprint for the user routes 
user_routes = Blueprint('user_routes', __name__)

# Initialize JWT
jwt = JWTManager(app)

# Create user
@user_routes.route('/users', methods=['POST'])
def manage_users():
    if request.method == 'POST': 
        data = request.get_json()
        
        # validation logic 
        if not validate_email(data['email']):
            return jsonify({'message': 'Invalid email'}), 400
         
        existing_user = User.query.filter_by(email=data(email=data['email'])).first()
        if existing_user: 
            return jsonify({'message': 'Email already in use'}), 400
    
    # CAPTCHA validation 
    recaptcha_response = request.form['g-recaptcha-response']
    payload = {
        'secret': "YOUR_RECAPTCHA_SECRET_KEY_HERE",
        'response': recaptcha_response
    }
    response = request.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
    result = response.json()

    if not result['success']:
        return jsonify({'error': 'Invalid reCAPTCHA. Please try again'}), 400
    return jsonify({"message": 'User created successfully.'}), 201
# get user 
@user_routes.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user: 
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'User not found'}), 404

# Update user
@user_routes.route('/users/<int:id>', methods=['PUT'])
def update_user(id): 
    user = User.query.get(id)
    if user: 
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)

        db.session.commit()
        return jsonify({'message': 'User update'}), 200
    return jsonify({'message': 'User not found'}), 404

#Delete user 
@user_routes.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id): 
    user = User.query.get(id)
    if user: 
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'}), 200
    return jsonify({'message': 'User not found'}), 404

# Login user
@user_routes.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.hashed_password, password):
        access_token = create_access_token(identity=email) # create JWT token 
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else: 
        return jsonify({'message': 'Invalid email or password'}), 401
    
@user_routes.route('/users/me', methods=["GET"])
@jwt_required() # requires the user to be login 
def get_current_user(): 
    current_user_email = get_jwt_identity() # get the email from the JWT token 

    user = User.query.filter_by(email=current_user_email).first()
    if user: 
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'User not found'}), 404

