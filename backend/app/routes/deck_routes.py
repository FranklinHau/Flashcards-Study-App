from flask import Blueprint, jsonify, request 
from config import db 
from app.models.deck import Deck 

deck_routes = Blueprint('deck_routes', __name__)

# create deck
@deck_routes.route('/api/decks', methods=['POST'])
def create_deck():
    data = request.get_json()
    new_deck = Deck(title=data['title'], description=data['description'], user_id=data['user_id'])
    db.session.add(new_deck)
    db.session.commit()
    return jsonify({'message': 'New deck created'}), 201

# get all decks
@deck_routes.route('/api/decks', methods=['GET'])
def get_decks():
    decks = Deck.query.all()
    return jsonify([deck.to_dict() for deck in decks]), 200 
    

# get a single deck by id
@deck_routes.route('/api/decks/<int:id>', methods=['GET'])
def get_deck(id):
    deck = Deck.query.get(id)
    if deck: 
        return jsonify(deck.to_dict()), 200
    return jsonify({'message': 'Deck not found'}), 404

# update deck by id
@deck_routes.route('/api/decks/<int:id>', methods=['PUT'])
def update_deck(id):
    deck = Deck.query.get(id)
    if deck: 
        data = request.get_json()
        deck.title = data.get('title', deck.title)
        deck.description = data.get('description', deck.description)

        db.session.commit()
        return jsonify({'message': 'Deck updated'}), 200
    return jsonify({'message': 'Deck not found'}), 404 

# delete deck
@deck_routes.route('/api/decks/<int:id>', methods=['DELETE'])
def delete_deck(id):
    deck = Deck.query.get(id)
    if deck: 
        db.session.delete(deck)
        db.session.commit()
        return jsonify({'message': 'Deck deleted'}), 200
    return jsonify({'message': 'Deck not found'}), 404
    
