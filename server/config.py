import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS
from sqlalchemy import MetaData

# Constants for default values
DEFAULT_SECRET_KEY = b'a\xa7\xcd\xc5\xf0\xc0\x897\x1e\xe6\xe8\xbb\xc2\x85\xe7\xd0'

# Instantiate app
app = Flask(__name__)

# Secret key for session management
app.secret_key = os.environ.get('SECRET_KEY', DEFAULT_SECRET_KEY)

# Database configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
db.init_app(app) # Linking the database instance to the Flask app
migrate = Migrate(app, db) # Initializing migration scripts for the database

# Instantiate REST API
api = Api(app)

# Instantiate Bcrypt for hashing passwords
bcrypt = Bcrypt(app)

# Initialize CORS
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

