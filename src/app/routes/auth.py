from flask import Blueprint, jsonify, request
import jwt
import datetime
from src.app.utils.security import SECRET_KEY, TOKEN_EXPIRY_MINUTES

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    auth = request.json
    if not auth or not auth.get("username") or not auth.get("password"):
        return jsonify({"message": "Username and password required"}), 400
    if auth["username"] == "admin" and auth["password"] == "admin123":
        token = jwt.encode(
            {
                "user": auth["username"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=TOKEN_EXPIRY_MINUTES),
            },
            SECRET_KEY,
            algorithm="HS256",
        )
        return jsonify({"token": token})
    return jsonify({"message": "Invalid credentials"}), 401
