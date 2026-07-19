import os
import json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import jwt
import datetime
from functools import wraps

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# JWT configuration
SECRET_KEY = 'supersecretkey'  # In production, use environment variable
TOKEN_EXPIRY_MINUTES = 60

# Database helper
import db

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            # In a real app, verify user existence here
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        return f(*args, **kwargs)
    return decorated

# Authentication endpoint
@app.route('/api/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({'message': 'Username and password required'}), 400
    # Simple static credentials (replace with real user store)
    if auth['username'] == 'admin' and auth['password'] == 'admin123':
        token = jwt.encode({
            'user': auth['username'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=TOKEN_EXPIRY_MINUTES)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    return jsonify({'message': 'Invalid credentials'}), 401

# Serve frontend
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

# Employees API
@app.route('/api/employees', methods=['GET'])
@token_required
def get_employees():
    employees = db.get_all_employees()
    return jsonify(employees)

@app.route('/api/employees', methods=['POST'])
@token_required
def add_employee():
    new_emp = request.json
    emp_id = db.add_employee(new_emp)
    new_emp['id'] = emp_id
    return jsonify(new_emp), 201

@app.route('/api/employees/<emp_id>', methods=['PUT'])
@token_required
def update_employee(emp_id):
    updates = request.json
    db.update_employee(emp_id, updates)
    return jsonify({'id': emp_id, **updates})

@app.route('/api/employees/<emp_id>', methods=['DELETE'])
@token_required
def delete_employee(emp_id):
    db.delete_employee(emp_id)
    return jsonify({'success': True})

# Leave approvals
@app.route('/api/employees/<emp_id>/approve-leave', methods=['POST'])
@token_required
def approve_leave(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({'error': 'Employee not found'}), 404
    db.update_employee(emp_id, {'leaveStatus': 'Approved', 'status': 'Inactive'})
    return jsonify({'success': True})

@app.route('/api/employees/<emp_id>/reject-leave', methods=['POST'])
@token_required
def reject_leave(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({'error': 'Employee not found'}), 404
    db.update_employee(emp_id, {'leaveStatus': 'Rejected'})
    return jsonify({'success': True})

# Document upload simulation
@app.route('/api/employees/<emp_id>/upload-document', methods=['POST'])
@token_required
def upload_document(emp_id):
    emp = db.get_employee(emp_id)
    if not emp:
        return jsonify({'error': 'Employee not found'}), 404
    current_storage = emp.get('storage', 0)
    new_storage = min(100, current_storage + 10)
    db.update_employee(emp_id, {'storage': new_storage, 'lastModified': datetime.datetime.utcnow().strftime('%b. %d, %Y')})
    return jsonify({'success': True, 'newStorage': new_storage})

# Events API
@app.route('/api/events', methods=['GET'])
@token_required
def get_events():
    events = db.get_all_events()
    return jsonify(events)

@app.route('/api/events', methods=['POST'])
@token_required
def add_event():
    new_event = request.json
    event_id = db.add_event(new_event)
    new_event['id'] = event_id
    return jsonify(new_event), 201

@app.route('/api/events/<event_id>', methods=['PUT'])
@token_required
def update_event(event_id):
    updates = request.json
    db.update_event(event_id, updates)
    return jsonify({'id': event_id, **updates})

@app.route('/api/events/<event_id>', methods=['DELETE'])
@token_required
def delete_event(event_id):
    db.delete_event(event_id)
    return jsonify({'success': True})

# Integrations API
@app.route('/api/integrations', methods=['GET'])
@token_required
def get_integrations():
    integrations = db.get_all_integrations()
    return jsonify(integrations)

@app.route('/api/integrations', methods=['POST'])
@token_required
def add_integration():
    new_app = request.json
    app_id = db.add_integration(new_app)
    new_app['id'] = app_id
    return jsonify(new_app), 201

@app.route('/api/integrations/<app_id>', methods=['PUT'])
@token_required
def update_integration(app_id):
    updates = request.json
    db.update_integration(app_id, updates)
    return jsonify({'id': app_id, **updates})

@app.route('/api/integrations/<app_id>', methods=['DELETE'])
@token_required
def delete_integration(app_id):
    db.delete_integration(app_id)
    return jsonify({'success': True})

# Settings API
@app.route('/api/settings', methods=['GET'])
@token_required
def get_settings():
    settings = db.get_settings()
    return jsonify(settings)

@app.route('/api/settings', methods=['PUT'])
@token_required
def update_settings():
    updates = request.json
    db.update_settings(updates)
    return jsonify(db.get_settings())

if __name__ == '__main__':
    # Initialize DB if not present
    db.init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
