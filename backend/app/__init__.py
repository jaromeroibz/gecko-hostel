import os
from typing import Optional

import click
from flask import Flask, jsonify

from app.api import api_bp
from app.config import config_by_name
from app.extensions import cors, db, jwt, migrate
from app import models  # noqa: F401
from app.models.admin import Admin


def create_app(config_name: Optional[str] = None) -> Flask:
    """Application factory used by Flask CLI and WSGI servers."""
    selected_config = config_name or os.getenv("FLASK_ENV", "development")
    config_class = config_by_name.get(selected_config, config_by_name["development"])

    app = Flask(__name__)
    app.config.from_object(config_class)

    register_extensions(app)
    register_blueprints(app)
    register_error_handlers(app)
    register_commands(app)

    return app


def register_extensions(app: Flask) -> None:
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
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


def register_commands(app: Flask) -> None:
    @app.cli.command("create-admin")
    @click.option("--username", default="admin", show_default=True, help="Admin username")
    @click.option("--password", default="admin123", show_default=True, help="Admin password")
    def create_admin(username: str, password: str):
        """Create or update an admin user."""
        normalized_username = username.strip()
        if not normalized_username:
            raise click.ClickException("Username cannot be empty")
        if not password:
            raise click.ClickException("Password cannot be empty")

        existing_admin = Admin.query.filter_by(username=normalized_username).first()
        if existing_admin:
            existing_admin.set_password(password)
            db.session.commit()
            click.echo(f"Updated admin '{normalized_username}'.")
            return

        admin = Admin(username=normalized_username)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        click.echo(f"Created admin '{normalized_username}'.")
