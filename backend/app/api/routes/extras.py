from decimal import Decimal, InvalidOperation

from flask import jsonify, request

from app.api import api_bp
from app.extensions import db
from app.models.extra import Extra


def serialize_extra(extra: Extra) -> dict:
    return {
        "id": extra.id,
        "name": extra.name,
        "description": extra.description,
        "price": float(extra.price),
    }


def validate_extra_payload(payload: dict, partial: bool = False) -> dict:
    if not isinstance(payload, dict):
        return {"error": "Invalid JSON body"}

    cleaned_data = {}

    if not partial or "name" in payload:
        name = payload.get("name", "")
        if not isinstance(name, str) or not name.strip():
            return {"error": "Field 'name' is required"}
        cleaned_data["name"] = name.strip()

    if not partial or "price" in payload:
        price_raw = payload.get("price")
        try:
            price = Decimal(str(price_raw))
        except (InvalidOperation, TypeError, ValueError):
            return {"error": "Field 'price' must be a valid number"}

        if price < 0:
            return {"error": "Field 'price' must be greater than or equal to 0"}
        cleaned_data["price"] = price

    if "description" in payload:
        description = payload.get("description")
        if description is not None and not isinstance(description, str):
            return {"error": "Field 'description' must be a string"}
        cleaned_data["description"] = description
    elif not partial:
        cleaned_data["description"] = None

    return cleaned_data


@api_bp.get("/extras")
def get_extras():
    extras = Extra.query.order_by(Extra.id.asc()).all()
    return jsonify([serialize_extra(extra) for extra in extras]), 200


@api_bp.post("/extras")
def create_extra():
    payload = request.get_json(silent=True)
    validated = validate_extra_payload(payload, partial=False)

    if "error" in validated:
        return jsonify(validated), 400

    extra = Extra(**validated)
    db.session.add(extra)
    db.session.commit()

    return jsonify(serialize_extra(extra)), 201


@api_bp.get("/extras/<int:extra_id>")
def get_extra(extra_id: int):
    extra = Extra.query.get(extra_id)
    if extra is None:
        return jsonify({"error": "Extra not found"}), 404

    return jsonify(serialize_extra(extra)), 200


@api_bp.put("/extras/<int:extra_id>")
def update_extra(extra_id: int):
    extra = Extra.query.get(extra_id)
    if extra is None:
        return jsonify({"error": "Extra not found"}), 404

    payload = request.get_json(silent=True)
    validated = validate_extra_payload(payload, partial=True)
    if "error" in validated:
        return jsonify(validated), 400

    if not validated:
        return jsonify({"error": "At least one field must be provided"}), 400

    for field, value in validated.items():
        setattr(extra, field, value)

    db.session.commit()
    return jsonify(serialize_extra(extra)), 200


@api_bp.delete("/extras/<int:extra_id>")
def delete_extra(extra_id: int):
    extra = Extra.query.get(extra_id)
    if extra is None:
        return jsonify({"error": "Extra not found"}), 404

    db.session.delete(extra)
    db.session.commit()
    return jsonify({"message": "Extra deleted"}), 200
