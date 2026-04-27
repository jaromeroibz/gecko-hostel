from app.extensions import db


class BookingReference(db.Model):
    __tablename__ = "booking_references"

    id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False, index=True)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)
    lodgify_booking_id = db.Column(db.String(120), nullable=False, unique=True, index=True)

    extra_bookings = db.relationship(
        "ExtraBooking",
        back_populates="booking_reference",
        cascade="all, delete-orphan",
    )
