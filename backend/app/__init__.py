import os
from typing import Optional

from flask import Flask, jsonify

from app.api import api_bp
from app.config import config_by_name
from app.extensions import cors, db
from app import models  # noqa: F401


def create_app(config_name: Optional[str] = None) -> Flask:
    """Application factory used by Flask CLI and WSGI servers."""
    selected_config = config_name or os.getenv("FLASK_ENV", "development")
    config_class = config_by_name.get(selected_config, config_by_name["development"])

    app = Flask(__name__)
    app.config.from_object(config_class)

    register_extensions(app)
    register_blueprints(app)
    register_error_handlers(app)

    return app


def register_extensions(app: Flask) -> None:
    db.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})


def register_blueprints(app: Flask) -> None:
    app.register_blueprint(api_bp, url_prefix="/api")


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(404)
    def handle_not_found(_error):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def handle_server_error(_error):
        return jsonify({"error": "Internal server error"}), 500
