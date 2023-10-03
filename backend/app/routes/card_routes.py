from flask import Blueprint, jsonify, request 
from config import db 
from app.models.card import Card 

card_routes = Blueprint('card_routes', __name__)

# create a card 
@card_routes.route('/api/cards', methods=['POST'])
def create_card():
    data = request.get_json()
    new_card = Card(
        deck_id=data['deck_id'],
        question=data['question'], 
        answer=data['answer'],
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

# update card 
@card_routes.route('/api/cards/<int:id>', methods=['PUT'])
def update_card(id): 
    card = Card.query.get(id)
    if card: 
        data = request.get.json()
        card.question = data.get('question', card.question)
        card.answer = data.get('answer', card.answer)
        card.hint = data.get('hint', card.hint)

        db.session.commit()
        return jsonify({'message': 'Card updated'}), 200
    return jsonify({'message': 'Card not found'}), 404

# delete card 
@card_routes.route('/api/cards/<int:id>', methods=['DELETE'])
def delete_card(id):
    card = Card.query.get(id)
    if card: 
        db.session.delete(card)
        db.session.commit()
        return jsonify({'message': 'Card deleted'}), 200
    return jsonify({'message': 'Card not found'}), 404


    

