#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# model imports
from models.card import Card 
from models.deck import Deck 
from models.review import Review
from models.user import User

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

