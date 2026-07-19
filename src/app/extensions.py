"""Flask extensions initialization.

Provides instances of SQLAlchemy, CORS, and JWTManager that are
imported by the app factory and the rest of the codebase.
"""

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Extension objects – created once and later bound to the app

db = SQLAlchemy()
cors = CORS()
jwt = JWTManager()

# Helper init functions (optional, but keep for clarity)

def init_app(app):
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
