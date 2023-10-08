from config import db 

class Review(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)

    # Method to convert a review to a dictionary 
    def to_dict(self): 
        return {
            'id': self.id, 
            'deck_id': self.deck_id, 
            'user_id': self.user_id, 
            'rating': self.rating,
            'comment': self.comment  
        } 
    