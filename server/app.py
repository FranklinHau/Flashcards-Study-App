import hashlib
import sqlalchemy
import traceback
from flask import request, session, jsonify
from flask_restful import Resource
from http import HTTPStatus
from config import app, db, api
from models import User, Deck, Card, SelfReview, db
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError

# Class definitions for various API endpoints are here

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
        # Attempting to add a new user to the database
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
        
       # user = db.session.get(User, user_id) 
        if user_id:
            user = User.query.filter(User.id == user_id).first()
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
    def get(self, userId):
        decks = Deck.query.filter_by(user_id=userId).all()
        deck_list = []
        for deck in decks:
            cards = Card.query.filter_by(deck_id=deck.id).all()
            card_list = [{'question': card.question, 'answer': card.answer, 'hint': card.hint} for card in cards]
            deck_list.append({
                'id': deck.id,
                'title': deck.title,
                'description': deck.description,
                'subject': deck.subject,
                'cards': card_list
            })
        return jsonify(deck_list)
    
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
    def post(self, userId):
        json_data = request.get_json()
        print("Received data:", json_data)
        
        cards_data = json_data.get('cards')

        if not cards_data:
            return {"message": "No card data provided"}, 400

        new_cards = []
        for card_data in cards_data:
            question = card_data.get('question')
            answer = card_data.get('answer')
            hint = card_data.get('hint', '')
            deck_id = card_data.get('deck_id')  # Extract deck_id from each card's data

            if not question or not answer or not deck_id:
                return {"message": "Question, answer and deck ID are required"}, 400

            new_card = Card(question=question, answer=answer, hint=hint, user_id=userId, deck_id=deck_id)
            new_cards.append(new_card)

        try:
            db.session.bulk_save_objects(new_cards)
            db.session.commit()
            return {"message": "Cards added successfully"}, 201
        except sqlalchemy.exc.IntegrityError as e:
            db.session.rollback()
            return {"message": f"Database integrity error: {str(e)}"}, 500
    

class SubmitSelfReview(Resource):
    def post(self, userId):
        json_data = request.get_json()
        print("Received data:", json_data)
        user_id = userId
        mood_rating = json_data.get('mood_rating')
        today_confidence = json_data.get('today_confidence')
        
        if not user_id or not mood_rating or not today_confidence:
            return {"message": "User ID, mood rating and today's confidence are required"}, HTTPStatus.BAD_REQUEST
        
        new_review = SelfReview(user_id=user_id, mood_rating=mood_rating, today_confidence=today_confidence)
        
        try:
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 201
        except sqlalchemy.exc.IntegrityError:
            db.session.rollback()
            return {"message": "Database integrity error"}, 500
        
class DefaultDeck(Resource):
    def get(self, userId):
        
        default_deck = Deck.query.filter_by(user_id=userId).first()  
        if default_deck:
            return {"deckId": default_deck.id}, HTTPStatus.OK
        else:
            return {"message": "No default deck found"}, HTTPStatus.NOT_FOUND

# Add resources to the API
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CreateDeck, '/create_deck')
api.add_resource(UserDecks, '/userDecks/<int:userId>')
api.add_resource(PublicDecks, '/public_decks')
api.add_resource(DeckCards, '/deckCards/<int:deckId>')
api.add_resource(SaveCards, '/saveCards/<int:userId>')
api.add_resource(SubmitSelfReview, '/submitSelfReview/<int:userId>')
api.add_resource(DefaultDeck, '/defaultDeck/<int:userId>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

print(hashlib.algorithms_guaranteed) # Printing the guaranteed hash algorithms available in the system











