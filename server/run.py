#!/usr/bin/env python3
import os
from flask import Flask, send_from_directory
from config import app, db 


from routes.deck_routes import deck_routes
from routes.user_routes import user_routes
from routes.card_routes import card_routes
from routes.review_routes import review_routes

# Register the blueprints
app.register_blueprint(deck_routes)
app.register_blueprint(user_routes)
app.register_blueprint(card_routes)
app.register_blueprint(review_routes)


# Create the database tables
with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__== '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5555)), debug=True)

