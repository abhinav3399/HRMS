from flask import Blueprint, jsonify, request
from src.app.utils.security import token_required
import src.app.db as db

settings_bp = Blueprint('settings', __name__)

@settings_bp.route("", methods=["GET"])
@token_required
def get_settings():
    settings = db.get_settings()
    return jsonify(settings)

@settings_bp.route("", methods=["PUT"])
@token_required
def update_settings():
    updates = request.json
    db.update_settings(updates)
    return jsonify(db.get_settings())
