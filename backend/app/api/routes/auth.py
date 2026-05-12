from flask import jsonify, request
from flask_jwt_extended import create_access_token

from app.api import api_bp
from app.models.admin import Admin


@api_bp.post("/login")
def login():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Invalid JSON body"}), 400

    username = payload.get("username", "")
    password = payload.get("password", "")
    if not isinstance(username, str) or not username.strip():
        return jsonify({"error": "Field 'username' is required"}), 400
    if not isinstance(password, str) or not password:
        return jsonify({"error": "Field 'password' is required"}), 400

    admin = Admin.query.filter_by(username=username.strip()).first()
    if admin is None or not admin.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(admin.id))
    return jsonify({"access_token": token}), 200
