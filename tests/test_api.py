import pytest
import json
from server import app as flask_app
import db


# Helper to obtain JWT token
def get_token(client, username="admin", password="admin123"):
    resp = client.post("/api/login", json={"username": username, "password": password})
    assert resp.status_code == 200
    data = resp.get_json()
    return data["token"]


def test_login_success(client):
    resp = client.post("/api/login", json={"username": "admin", "password": "admin123"})
    assert resp.status_code == 200
    data = resp.get_json()
    assert "token" in data


def test_login_failure(client):
    resp = client.post("/api/login", json={"username": "admin", "password": "wrong"})
    assert resp.status_code == 401
    data = resp.get_json()
    assert data["message"] == "Invalid credentials"


def test_protected_endpoint_requires_token(client):
    # Attempt to access without token
    resp = client.get("/api/employees")
    assert resp.status_code == 401
    data = resp.get_json()
    assert data["message"] == "Token is missing!"


def test_employee_crud_flow(client):
    token = get_token(client)
    headers = {"Authorization": f"Bearer {token}"}

    # Create employee
    new_emp = {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "Developer",
        "dept": "Engineering",
    }
    resp = client.post("/api/employees", json=new_emp, headers=headers)
    assert resp.status_code == 201
    created = resp.get_json()
    emp_id = created["id"]
    assert created["email"] == new_emp["email"]

    # Get employees list
    resp = client.get("/api/employees", headers=headers)
    assert resp.status_code == 200
    employees = resp.get_json()
    assert any(e["id"] == emp_id for e in employees)

    # Update employee
    update_data = {"role": "Senior Developer"}
    resp = client.put(f"/api/employees/{emp_id}", json=update_data, headers=headers)
    assert resp.status_code == 200
    updated = resp.get_json()
    assert updated["role"] == "Senior Developer"

    # Delete employee
    resp = client.delete(f"/api/employees/{emp_id}", headers=headers)
    assert resp.status_code == 200
    # Verify deletion
    resp = client.get("/api/employees", headers=headers)
    employees = resp.get_json()
    assert not any(e["id"] == emp_id for e in employees)
