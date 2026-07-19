from flask import Blueprint, jsonify, request
from src.app.utils.security import token_required
import src.app.db as db

integrations_bp = Blueprint('integrations', __name__)

@integrations_bp.route("", methods=["GET"])
@token_required
def get_integrations():
    integrations = db.get_all_integrations()
    return jsonify(integrations)

@integrations_bp.route("", methods=["POST"])
@token_required
def add_integration():
    new_app = request.json
    app_id = db.add_integration(new_app)
    new_app["id"] = app_id
    return jsonify(new_app), 201

@integrations_bp.route("/<app_id>", methods=["PUT"])
@token_required
def update_integration(app_id):
    updates = request.json
    db.update_integration(app_id, updates)
    return jsonify({"id": app_id, **updates})

@integrations_bp.route("/<app_id>", methods=["DELETE"])
@token_required
def delete_integration(app_id):
    db.delete_integration(app_id)
    return jsonify({"success": True})
