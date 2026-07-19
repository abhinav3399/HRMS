from flask import Blueprint, jsonify, request
from src.app.utils.security import token_required
import src.app.db as db

events_bp = Blueprint('events', __name__)

@events_bp.route("", methods=["GET"])
@token_required
def get_events():
    events = db.get_all_events()
    return jsonify(events)

@events_bp.route("", methods=["POST"])
@token_required
def add_event():
    new_event = request.json
    event_id = db.add_event(new_event)
    new_event["id"] = event_id
    return jsonify(new_event), 201

@events_bp.route("/<event_id>", methods=["PUT"])
@token_required
def update_event(event_id):
    updates = request.json
    db.update_event(event_id, updates)
    return jsonify({"id": event_id, **updates})

@events_bp.route("/<event_id>", methods=["DELETE"])
@token_required
def delete_event(event_id):
    db.delete_event(event_id)
    return jsonify({"success": True})
