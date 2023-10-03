#!/usr/bin/env python3

from config import app
from app.routes.deck_routes import deck_routes
from app.routes.user_routes import user_routes 
from app.routes.card_routes import card_routes 
from app.routes.review_routes import review_routes
    
app.register_blueprint(deck_routes)
app.register_blueprint(user_routes)
app.register_blueprint(card_routes)
app.register_blueprint(review_routes)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

