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

# Get a specific review by its ID
@review_routes.route('/api/reviews/<int:id>', methods=['GET'])
def get_review(id): 
    review = Review.query.get(id)
    if review:
        return jsonify(review.to_dict()), 200
    return jsonify({'message': 'Review not found'}), 404

 # Update a review by its ID
@review_routes.route('/api/reviews/<int:id>', methods=['PUT'])
def update_review(id): 
    review = Review.query.get(id)
    if review: 
        data = request.get_json()
        review.rating = data.get('rating', review.rating)
        review.comment = data.get('comment', review.comment)

        db.session.commit()
        return jsonify({'rating', 'Review updated'}), 200
    return jsonify({'message': 'Review not found'}), 404


