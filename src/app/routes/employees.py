from flask import Blueprint, jsonify, request
import datetime
from src.app.utils.security import token_required
import src.app.db as db

employees_bp = Blueprint('employees', __name__)

@employees_bp.route("", methods=["GET"])
@token_required
def get_employees():
    employees = db.get_all_employees()
    return jsonify(employees)

@employees_bp.route("", methods=["POST"])
@token_required
def add_employee():
    new_emp = request.json
    emp_id = db.add_employee(new_emp)
    new_emp["id"] = emp_id
    return jsonify(new_emp), 201

@employees_bp.route("/<emp_id>", methods=["PUT"])
@token_required
def update_employee(emp_id):
    updates = request.json
    db.update_employee(emp_id, updates)
    return jsonify({"id": emp_id, **updates})

@employees_bp.route("/<emp_id>", methods=["DELETE"])
@token_required
def delete_employee(emp_id):
    db.delete_employee(emp_id)
    return jsonify({"success": True})

@employees_bp.route("/<emp_id>/approve-leave", methods=["POST"])
@token_required
def approve_leave(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({"error": "Employee not found"}), 404
    db.update_employee(emp_id, {"leaveStatus": "Approved", "status": "Inactive"})
    return jsonify({"success": True})

@employees_bp.route("/<emp_id>/reject-leave", methods=["POST"])
@token_required
def reject_leave(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({"error": "Employee not found"}), 404
    db.update_employee(emp_id, {"leaveStatus": "Rejected"})
    return jsonify({"success": True})

@employees_bp.route("/<emp_id>/upload-document", methods=["POST"])
@token_required
def upload_document(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({"error": "Employee not found"}), 404
    current_storage = emp.get("storage", 0)
    new_storage = min(100, current_storage + 10)
    db.update_employee(
        emp_id,
        {
            "storage": new_storage,
            "lastModified": datetime.datetime.utcnow().strftime("%b. %d, %Y"),
        },
    )
    return jsonify({"success": True, "newStorage": new_storage})
