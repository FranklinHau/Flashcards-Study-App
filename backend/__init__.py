from flask import Flask 
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)
# Initialize database 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'
db = SQLAlchemy(app)