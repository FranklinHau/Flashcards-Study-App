from flask import Blueprint, jsonify, request 
from config import db 
from models import Deck 

deck_routes = Blueprint('deck_routes', __name__)

@deck_routes.route('/api/decks', methods=['POST'])
def create_deck():
    data = request.get_json()
    new_deck = Deck(title=data['title'], description=data['description'], user_id=data['user_id'])
    db.session.add(new_deck)
    db.session.commit()
    return jsonify({'message': 'New deck created'}), 201