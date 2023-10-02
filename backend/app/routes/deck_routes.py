from flask import jsonify, request 
from app import app, db 
from app.models import Deck 

@app.route('/api/decks', methods=['POST'])
def create_deck():
    data = request.get_json()
    new_deck = Deck(title=data['title'], description=data['description'], user_id=data['user_id'])
    db.session.add(new_deck)
    db.session.commit()
    return jsonify({'message': 'New deck created'}), 201