from datetime import date
from uuid import uuid4

from flask import jsonify, request

from app.api import api_bp
from app.extensions import db
from app.models.booking_reference import BookingReference
from app.models.extra import Extra
from app.models.extra_booking import ExtraBooking


def parse_iso_date(value: str, field_name: str):
    try:
        return date.fromisoformat(value)
    except (TypeError, ValueError):
        return jsonify({"error": f"Field '{field_name}' must be a valid date (YYYY-MM-DD)"}), 400


def validate_payload(payload: dict):
    if not isinstance(payload, dict):
        return jsonify({"error": "Invalid JSON body"}), 400

    required_fields = ["guest_name", "email", "check_in", "check_out", "selected_extras"]
    for field in required_fields:
        if field not in payload:
            return jsonify({"error": f"Field '{field}' is required"}), 400

    guest_name = payload.get("guest_name")
    email = payload.get("email")
    if not isinstance(guest_name, str) or not guest_name.strip():
        return jsonify({"error": "Field 'guest_name' is required"}), 400
    if not isinstance(email, str) or "@" not in email:
        return jsonify({"error": "Field 'email' must be valid"}), 400

    check_in = parse_iso_date(payload.get("check_in"), "check_in")
    if isinstance(check_in, tuple):
        return check_in
    check_out = parse_iso_date(payload.get("check_out"), "check_out")
    if isinstance(check_out, tuple):
        return check_out
    if check_out <= check_in:
        return jsonify({"error": "Field 'check_out' must be later than 'check_in'"}), 400

    selected_extras = payload.get("selected_extras")
    if not isinstance(selected_extras, list) or len(selected_extras) == 0:
        return jsonify({"error": "Field 'selected_extras' must be a non-empty array"}), 400
    if not all(isinstance(extra_id, int) for extra_id in selected_extras):
        return jsonify({"error": "Field 'selected_extras' must contain integer IDs"}), 400
    if len(selected_extras) != len(set(selected_extras)):
        return jsonify({"error": "Field 'selected_extras' contains duplicated IDs"}), 400

    return {
        "guest_name": guest_name.strip(),
        "email": email.strip().lower(),
        "check_in": check_in,
        "check_out": check_out,
        "selected_extras": selected_extras,
    }


@api_bp.post("/bookings/extras")
def create_booking_with_extras():
    payload = request.get_json(silent=True)
    validated = validate_payload(payload)
    if isinstance(validated, tuple):
        return validated

    selected_extras = validated["selected_extras"]
    extras = Extra.query.filter(Extra.id.in_(selected_extras)).all()
    found_ids = {extra.id for extra in extras}
    missing_ids = [extra_id for extra_id in selected_extras if extra_id not in found_ids]
    if missing_ids:
        return jsonify({"error": f"Extras not found: {missing_ids}"}), 404

    booking_reference = BookingReference(
        guest_name=validated["guest_name"],
        email=validated["email"],
        check_in=validated["check_in"],
        check_out=validated["check_out"],
        lodgify_booking_id=f"pending-{uuid4()}",
    )

    try:
        db.session.add(booking_reference)
        db.session.flush()

        for extra_id in selected_extras:
            db.session.add(
                ExtraBooking(
                    booking_reference_id=booking_reference.id,
                    extra_id=extra_id,
                )
            )

        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Could not create booking with extras"}), 400

    return (
        jsonify(
            {
                "message": "Booking with extras created successfully",
                "booking_reference": {
                    "id": booking_reference.id,
                    "guest_name": booking_reference.guest_name,
                    "email": booking_reference.email,
                    "check_in": booking_reference.check_in.isoformat(),
                    "check_out": booking_reference.check_out.isoformat(),
                    "lodgify_booking_id": booking_reference.lodgify_booking_id,
                    "selected_extras": selected_extras,
                },
            }
        ),
        201,
    )
