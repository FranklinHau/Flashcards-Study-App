from flask import jsonify, request 
from app import app, db 
from app.models import Card 

@app.route('/api/cards', methods=['POST'])
def create_card():
    data = request.get_json()
    new_card = Card(title=data['title'], description=data['descriptiom'], user_id=data['user_id'])
