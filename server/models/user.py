from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash 



from config import db

class User(db.Model, SerializerMixin): 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(200))

    # Serialize settings
    serialize_only = ('id', 'username', 'email', 'bio', 'profile_image')

    # Hash the password before storing it in database
    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)
    def check_password(self, password):
        # Check if the provided password matches the hashed password in the database
        return check_password_hash(self.hashed_password, password)





