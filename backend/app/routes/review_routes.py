from flask import Blueprint, jsonify, request
from config import db 
from app.models.review import Review

#create a Blueprint for the review routes 
review_routes = Blueprint('review_routes', __name__)

# create a new review
@review_routes.route('/api/review', methods=['POST'])
def create_review():
    data = request.get_json()
    new_review = Review(
        deck_id=data['deck_id'], 
        user_id=data['user_id'],
        rating=data.get('rating'), # rating is optional 
        comment=data.get('comment') # comment is optional 
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'New review created'}), 201

