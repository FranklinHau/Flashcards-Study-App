from config import db 

# Defining the Card model
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False) 
    question = db.Column(db.String(200), nullable=False) 
    answer = db.Column(db.String(200), nullable=False) 
    hint = db.Column(db.String(200)) 

    # Method to convert a Card to a Dictionary
    def to_dict(self): 
        return {
            'id': self.id, 
            'deck_id': self.deck_id,
            'question': self.question,
            'answer': self.answer,
            'hint': self.hint
        }