
import hashlib
import sqlalchemy
from flask import request, session, jsonify
from flask_restful import Resource
from http import HTTPStatus
from config import app, db, api
from models import User, Deck, Card, db
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError

class Signup(Resource):
    """Resource to handle user signup."""
    
    def post(self):
        json_data = request.get_json()
        
        username = json_data.get('username')
        email = json_data.get('email')  
        bio = json_data.get('bio')
        password = json_data.get('password')
        
        if not username or not password or not email:
            return {"message": "Username, email and password are required"}, HTTPStatus.UNPROCESSABLE_ENTITY
        
        user = User(username=username, email=email, bio=bio)
        user.hashed_password = generate_password_hash(password)
        
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {"message": "Username or email already exists"}, HTTPStatus.CONFLICT
        
        session['user_id'] = user.id
        
        return {"id": user.id, "username": user.username, "bio": user.bio}, HTTPStatus.CREATED

class CheckSession(Resource):
    """Resource to check user session."""
    
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
        
        user = db.session.get(User, user_id) 
        if user:
            return {"id": user.id, "username": user.username, "bio": user.bio}, HTTPStatus.OK
        else:
            return {"message": "User not found"}, HTTPStatus.NOT_FOUND

class Login(Resource):
    """Resource to handle user login."""
    
    def post(self):
        json_data = request.get_json()
        email = json_data.get('email')
        password = json_data.get('password')
        
        if not email or not password:
            return {"message": "Email and password are required"}, HTTPStatus.BAD_REQUEST
        
        user = User.query.filter(User.email == email).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return {"id": user.id, "username": user.username, "bio": user.bio}, HTTPStatus.CREATED
        else:
            return {"message": "Invalid email or password"}, HTTPStatus.UNAUTHORIZED

class Logout(Resource):
    """Resource to handle user logout."""
    
    def delete(self):
        if session.get('user_id'):
            session.pop('user_id')
            return {}, HTTPStatus.NO_CONTENT
        else:
            return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
        
class CreateDeck(Resource):
    def post(self):
        json_data = request.get_json()
        print("Received data:", json_data)
        
        title = json_data.get('title')
        description = json_data.get('description')
        subject = json_data.get('subject')
        public = json_data.get('public')
        user_id = json_data.get('user_id')

        if not title:
            return {"message": "Title is required"}, 400

        if not user_id:
            return {"message": "User ID is required"}, 400

        new_deck = Deck(title=title, description=description, subject=subject, public=public, user_id=user_id)
        
        try:
            db.session.add(new_deck)
            db.session.commit()
            return new_deck.to_dict(), 201
        except sqlalchemy.exc.IntegrityError:
            db.session.rollback()
            return {"message": "Database integrity error"}, 500   
        
class UserDecks(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {"message": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
        decks = Deck.query.filter(Deck.user_id == user_id).all()
        return jsonify([deck.to_dict() for deck in decks])
    
class PublicDecks(Resource):
    def get(self):
        public_decks = Deck.query.filter_by(public=True).all()
        return jsonify([{
            **deck.to_dict(),
            'cards': [card.to_dict() for card in deck.cards]
        } for deck in public_decks])
    
class DeckCards(Resource):
    def get(self, deckId):
        try:
            cards = Card.query.filter(Card.deck_id == deckId).all()
            if not cards:
                return {"message": "No cards found for this deck"}, HTTPStatus.NOT_FOUND
            
            return jsonify([card.to_dict() for card in cards])

        except Exception as e:
            return {"message": str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR


class SaveCards(Resource):
    def post(self, deckId):
        json_data = request.get_json()
        cards_data = json_data.get('cards')

        for card_data in cards_data:
            new_card = Card(
                question=card_data.get('question'),
                answer=card_data.get('answer'),
                hint=card_data.get('hint'),
                deck_id=deckId
            )
            db.session.add(new_card)
        
        try:
            db.session.commit()
            return {"message": "Cards added successfully"}, HTTPStatus.CREATED
        except sqlalchemy.exc.IntegrityError:
            db.session.rollback()
            return {"message": "Database integrity error"}, HTTPStatus.INTERNAL_SERVER_ERROR


# Add resources to the API
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CreateDeck, '/create_deck')
api.add_resource(UserDecks, '/userDecks')
api.add_resource(PublicDecks, '/public_decks')
api.add_resource(DeckCards, '/deckCards/<int:deckId>')
api.add_resource(SaveCards, '/saveCards/<int:deckId>')






if __name__ == '__main__':
    app.run(port=5555, debug=True)

print(hashlib.algorithms_guaranteed)











