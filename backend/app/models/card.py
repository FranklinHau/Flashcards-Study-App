from config import db 

# Defining the Card model
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True) # An integer column that serves as the primary key
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False) # Foreign key referencing the deck model  
    question = db.Column(db.String(200), nullable=False) # A string column for the question, cannot be null 
    answer = db.Column(db.String(200), nullable=False) # A string column for the answer, cannot be null 
    hint = db.Column(db.String(200)) # A String column for the hint, can be null 

    # Method to convert a Card to a Dictionary
    def to_dict(self): 
        return {
            'id': self.id, 
            'deck_id': self.deck_id,
            'question': self.question,
            'answer': self.answer,
            'hint': self.hint
        }