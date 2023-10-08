from config import db 

class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    subject = db.Column(db.String(50))
    public = db.Column(db.Boolean, default=True)

    # Method to convert a Deck to a dictionary 
    def to_dict(self): 
        return {
            'id': self.id, 
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'subject': self.subject,
            'public': self.public
        }


    