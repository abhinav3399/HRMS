"""Application factory and extensions initialization."""

from flask import Flask
from .extensions import db, cors, jwt
from .routes import api_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object("src.app.config.Config")
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    # Register blueprints
    app.register_blueprint(api_bp)
    return app
