from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from config import db

MAX_USERNAME_LENGTH = 50
MAX_EMAIL_LENGTH = 100
MAX_PASSWORD_LENGTH = 100
MAX_PROFILE_IMAGE_LENGTH = 200
MAX_TITLE_LENGTH = 100
MAX_SUBJECT_LENGTH = 50
MAX_QUESTION_LENGTH = 200
MAX_ANSWER_LENGTH = 200
MAX_HINT_LENGTH = 200

class User(db.Model, SerializerMixin):
    """User model for storing user-related data."""
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(MAX_USERNAME_LENGTH), unique=True, nullable=False)
    email = db.Column(db.String(MAX_EMAIL_LENGTH), unique=True, nullable=False)
    hashed_password = db.Column(db.String(MAX_PASSWORD_LENGTH), nullable=False)
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(MAX_PROFILE_IMAGE_LENGTH))

    serialize_only = ('id', 'username', 'email', 'bio', 'profile_image')
    decks = relationship("Deck", back_populates="user")
    self_reviews = relationship("SelfReview", back_populates="user")
    cards = relationship("Card", back_populates="user") 


    def set_password(self, password: str) -> None:
        """Set hashed password."""
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Check if hashed password matches the one in the database."""
        return check_password_hash(self.hashed_password, password)
    
    def authenticate(self, password):
        return check_password_hash(self.hashed_password, password)


class SelfReview(db.Model):
    """SelfReview model for storing self reviews."""
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    mood_rating = db.Column(db.Integer, nullable=False)  
    today_confidence = db.Column(db.Float, nullable=False) 

    user = relationship("User", back_populates="self_reviews")  
    deck = db.relationship("Deck", back_populates="self_reviews")

    def to_dict(self) -> dict:
        """Serialize the SelfReview object to a dictionary."""
        return {'id': self.id, 'user_id': self.user_id, 'mood_rating': self.mood_rating, 'today_confidence': self.today_confidence}



class Deck(db.Model):
    """Deck model for storing decks."""
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(MAX_TITLE_LENGTH), nullable=False)
    description = db.Column(db.Text)
    subject = db.Column(db.String(MAX_SUBJECT_LENGTH))
    public = db.Column(db.Boolean, default=True)

    user = relationship("User", back_populates="decks")
    cards = relationship("Card", back_populates="deck")
    self_reviews = relationship("SelfReview", back_populates="deck") 

    def to_dict(self) -> dict:
        """Serialize the Deck object to a dictionary."""
        return {'id': self.id, 'user_id': self.user_id, 'title': self.title, 'description': self.description, 'subject': self.subject, 'public': self.public}


class Card(db.Model):
    """Card model for storing cards in a deck."""
    
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    question = db.Column(db.String(MAX_QUESTION_LENGTH), nullable=False)
    answer = db.Column(db.String(MAX_ANSWER_LENGTH), nullable=False)
    hint = db.Column(db.String(MAX_HINT_LENGTH))

    deck = relationship("Deck", back_populates="cards")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="cards")  
    
    def to_dict(self) -> dict:
        """Serialize the Card object to a dictionary."""
        return {'id': self.id, 'deck_id': self.deck_id, 'question': self.question, 'answer': self.answer, 'hint': self.hint}
