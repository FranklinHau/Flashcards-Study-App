# Standard library import
import os

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv


# environment variables
load_dotenv()
# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key = 'FllONS_tAFtg3q5ShVV5E8ASD5yz1yvAebrNO-PZnKQ'
# Get database URI from environment variables 
# fetched from an environment variable 'DATABASE_URI', falling back to 'sqlite://app/db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Disable tracking of modifications 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#authentication JWT (JSON Web Tokens)

# Don't compact the JSON output
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
