from flask import jsonify, request
from flask_jwt_extended import jwt_required

from app.api import api_bp
from app.extensions import db
from app.models.image_asset import ImageAsset


def serialize_image(image: ImageAsset) -> dict:
    return {
        "id": image.id,
        "name": image.name,
        "category": image.category,
        "size": image.size_bytes,
        "original_url": image.original_url,
        "optimized_url": image.optimized_url,
        "uploaded_at": image.created_at.isoformat() if image.created_at else None,
    }


def validate_image_payload(payload: dict, partial: bool = False) -> dict:
    if not isinstance(payload, dict):
        return {"error": "Invalid JSON body"}

    cleaned_data = {}

    if not partial or "name" in payload:
        name = payload.get("name", "")
        if not isinstance(name, str) or not name.strip():
            return {"error": "Field 'name' is required"}
        cleaned_data["name"] = name.strip()

    if not partial:
        category = payload.get("category", "")
        if not isinstance(category, str):
            return {"error": "Field 'category' must be a string"}
        cleaned_data["category"] = category.strip()
    elif "category" in payload:
        category = payload["category"]
        if not isinstance(category, str):
            return {"error": "Field 'category' must be a string"}
        cleaned_data["category"] = category.strip()

    if not partial or "size" in payload:
        size = payload.get("size")
        if not isinstance(size, int) or size < 0:
            return {"error": "Field 'size' must be a non-negative integer"}
        cleaned_data["size_bytes"] = size

    if not partial or "original_url" in payload:
        original_url = payload.get("original_url", "")
        if not isinstance(original_url, str) or not original_url.strip():
            return {"error": "Field 'original_url' is required"}
        cleaned_data["original_url"] = original_url.strip()

    if not partial or "optimized_url" in payload:
        optimized_url = payload.get("optimized_url", "")
        if not isinstance(optimized_url, str) or not optimized_url.strip():
            return {"error": "Field 'optimized_url' is required"}
        cleaned_data["optimized_url"] = optimized_url.strip()

    return cleaned_data


@api_bp.get("/images")
@jwt_required()
def get_images():
    search = (request.args.get("search") or "").strip()
    category = (request.args.get("category") or "").strip().lower()

    query = ImageAsset.query
    if search:
        query = query.filter(ImageAsset.name.ilike(f"%{search}%"))
    if category and category != "all":
        if category == "_empty":
            query = query.filter(ImageAsset.category == "")
        else:
            query = query.filter(db.func.lower(ImageAsset.category) == category)

    images = query.order_by(ImageAsset.id.desc()).all()
    return jsonify([serialize_image(image) for image in images]), 200


@api_bp.post("/images")
@jwt_required()
def create_image():
    payload = request.get_json(silent=True)
    validated = validate_image_payload(payload, partial=False)
    if "error" in validated:
        return jsonify(validated), 400

    image = ImageAsset(**validated)
    db.session.add(image)
    db.session.commit()
    return jsonify(serialize_image(image)), 201


@api_bp.put("/images/<int:image_id>")
@jwt_required()
def update_image(image_id: int):
    image = ImageAsset.query.get(image_id)
    if image is None:
        return jsonify({"error": "Image not found"}), 404

    payload = request.get_json(silent=True)
    validated = validate_image_payload(payload, partial=True)
    if "error" in validated:
        return jsonify(validated), 400
    if not validated:
        return jsonify({"error": "At least one field must be provided"}), 400

    for field, value in validated.items():
        setattr(image, field, value)

    db.session.commit()
    return jsonify(serialize_image(image)), 200


@api_bp.delete("/images/<int:image_id>")
@jwt_required()
def delete_image(image_id: int):
    image = ImageAsset.query.get(image_id)
    if image is None:
        return jsonify({"error": "Image not found"}), 404

    db.session.delete(image)
    db.session.commit()
    return jsonify({"message": "Image deleted"}), 200
