from flask import Blueprint

api_bp = Blueprint("api", __name__)

from app.api.routes import auth, booking_extras, contact, extras, health, images, packages  # noqa: E402,F401
