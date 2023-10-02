from flask import Blueprint, jsonify, request 
from config import db 
from models import Card 

card_routes = Blueprint('card_routes', __name__)

# create a card 
@card_routes.route('/api/cards', methods=['POST'])
def create_card():
    data = request.get_json()
    new_card = Card(
        deck_id=data['deck_id'],
        question=data['answer'], 
        hint=data.get('hint') #hint is optional 
    )
    db.session.add(new_card)
    db.session.commit()

    return jsonify({'message': 'New card created'}), 201

# get a card
@card_routes.route('/api/cards/<int:id>', methods=['GET'])
def get_card(id):
    card = Card.query.get(id)
    if card: 
        return jsonify(card.serialize()), 200
    return jsonify({'message': 'Card not found'}), 404

    

