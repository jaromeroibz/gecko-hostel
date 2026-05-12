from decimal import Decimal, InvalidOperation

from flask import jsonify, request
from flask_jwt_extended import jwt_required

from app.api import api_bp
from app.extensions import db
from app.models.package import Package


def serialize_package(package: Package) -> dict:
    return {
        "id": package.id,
        "name": package.name,
        "description": package.description,
        "price": float(package.price),
        "duration_days": package.duration_days,
        "includes": package.includes,
        "image_url": package.image_url,
    }


def validate_package_payload(payload: dict, partial: bool = False) -> dict:
    if not isinstance(payload, dict):
        return {"error": "Invalid JSON body"}

    cleaned_data = {}

    if not partial or "name" in payload:
        name = payload.get("name", "")
        if not isinstance(name, str) or not name.strip():
            return {"error": "Field 'name' is required"}
        cleaned_data["name"] = name.strip()

    if not partial or "description" in payload:
        description = payload.get("description", "")
        if not isinstance(description, str) or not description.strip():
            return {"error": "Field 'description' is required"}
        cleaned_data["description"] = description.strip()

    if not partial or "price" in payload:
        price_raw = payload.get("price")
        try:
            price = Decimal(str(price_raw))
        except (InvalidOperation, TypeError, ValueError):
            return {"error": "Field 'price' must be a valid number"}

        if price < 0:
            return {"error": "Field 'price' must be greater than or equal to 0"}
        cleaned_data["price"] = price

    if not partial or "duration_days" in payload:
        duration_days = payload.get("duration_days")
        if not isinstance(duration_days, int) or duration_days <= 0:
            return {"error": "Field 'duration_days' must be a positive integer"}
        cleaned_data["duration_days"] = duration_days

    if not partial or "includes" in payload:
        includes = payload.get("includes", "")
        if not isinstance(includes, str) or not includes.strip():
            return {"error": "Field 'includes' is required"}
        cleaned_data["includes"] = includes.strip()

    if "image_url" in payload:
        image_url = payload.get("image_url")
        if image_url is not None and not isinstance(image_url, str):
            return {"error": "Field 'image_url' must be a string"}
        cleaned_data["image_url"] = image_url
    elif not partial:
        cleaned_data["image_url"] = None

    return cleaned_data


@api_bp.get("/packages")
@jwt_required()
def get_packages():
    packages = Package.query.order_by(Package.id.asc()).all()
    return jsonify([serialize_package(package) for package in packages]), 200


@api_bp.post("/packages")
@jwt_required()
def create_package():
    payload = request.get_json(silent=True)
    validated = validate_package_payload(payload, partial=False)
    if "error" in validated:
        return jsonify(validated), 400

    package = Package(**validated)
    db.session.add(package)
    db.session.commit()
    return jsonify(serialize_package(package)), 201


@api_bp.put("/packages/<int:package_id>")
@jwt_required()
def update_package(package_id: int):
    package = Package.query.get(package_id)
    if package is None:
        return jsonify({"error": "Package not found"}), 404

    payload = request.get_json(silent=True)
    validated = validate_package_payload(payload, partial=True)
    if "error" in validated:
        return jsonify(validated), 400
    if not validated:
        return jsonify({"error": "At least one field must be provided"}), 400

    for field, value in validated.items():
        setattr(package, field, value)

    db.session.commit()
    return jsonify(serialize_package(package)), 200


@api_bp.delete("/packages/<int:package_id>")
@jwt_required()
def delete_package(package_id: int):
    package = Package.query.get(package_id)
    if package is None:
        return jsonify({"error": "Package not found"}), 404

    db.session.delete(package)
    db.session.commit()
    return jsonify({"message": "Package deleted"}), 200
