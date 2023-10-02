#!/usr/bin/env python3

from config import app
from app.routes import deck_routes
from app.routes import user_routes 
    
app.register_blueprint(deck_routes)
app.register_blueprint(user_routes)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

