from app import db 

class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    