from app import db 

class Review(db.Model): 
    id = db.column(db.Integer, primary_key=True)
    