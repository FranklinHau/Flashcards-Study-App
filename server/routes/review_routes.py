from flask import Blueprint, jsonify, request
from config import db 
from models.review import Review

#create a Blueprint for the review routes 
review_routes = Blueprint('review_routes', __name__)

# create a new review
@review_routes.route('/api/review', methods=['POST'])
def create_review():
    print(request.headers)
    data = request.get_json()

     # Error handling for missing or invalid parameters
    if not data or 'deck_id' not in data or 'user_id' not in data:
        return jsonify({'message': 'Bad Request, missing or invalid parameters'}), 400

     # Validate rating if it's provided
    rating = data.get('rating')
    if rating is not None and (rating < 1 or rating > 5):
        return jsonify({'message': 'Rating must be between 1 and 5'}), 400

    new_review = Review(
        deck_id=data['deck_id'], 
        user_id=data['user_id'],
        rating=rating, 
        comment=data.get('comment') # comment is optional 
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'New review created'}), 201

# Get a specific review by its ID
@review_routes.route('/api/reviews/<int:id>', methods=['GET'])
def get_review(id): 
    print(request.headers)
    review = Review.query.get(id)
    if review:
        return jsonify(review.to_dict()), 200
    return jsonify({'message': 'Review not found'}), 404

 # Update a review by its ID
@review_routes.route('/api/reviews/<int:id>', methods=['PUT'])
def update_review(id): 
    print(request.headers)
    review = Review.query.get(id)
    if review: 
        data = request.get_json()
        review.rating = data.get('rating', review.rating)
        review.comment = data.get('comment', review.comment)

        db.session.commit()
        return jsonify({'message': 'Review updated'}), 200
    return jsonify({'message': 'Review not found'}), 404

# Delete a review by its ID
@review_routes.route('/api/reviews/<int:id>', methods=['DELETE'])
def delete_review(id): 
    print(request.headers)
    review = Review.query.get(id)
    if review: 
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted'}), 200
    return jsonify({'message': 'Review not found'}), 404

