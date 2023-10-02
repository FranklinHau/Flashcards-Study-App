from app import db 

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    