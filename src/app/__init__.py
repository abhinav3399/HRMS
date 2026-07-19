from flask import Flask, send_from_directory
from flask_cors import CORS
from .routes import api_bp
import src.app.db as db

def create_app():
    # Set static_folder to point to frontend
    app = Flask(__name__, static_folder="../../frontend", static_url_path="")
    CORS(app)

    # Register all API endpoints
    app.register_blueprint(api_bp)

    # Serve the frontend
    @app.route("/")
    def serve_index():
        return send_from_directory(app.static_folder, "index.html")

    # Initialize DB (creates tables if using SQLite)
    with app.app_context():
        db.init_db()

    return app
