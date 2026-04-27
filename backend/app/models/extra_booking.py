from app.extensions import db


class ExtraBooking(db.Model):
    __tablename__ = "extra_bookings"
    __table_args__ = (
        db.UniqueConstraint(
            "booking_reference_id",
            "extra_id",
            name="uq_extra_bookings_booking_extra",
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    booking_reference_id = db.Column(
        db.Integer,
        db.ForeignKey("booking_references.id", ondelete="CASCADE"),
        nullable=False,
    )
    extra_id = db.Column(
        db.Integer,
        db.ForeignKey("extras.id", ondelete="CASCADE"),
        nullable=False,
    )

    booking_reference = db.relationship("BookingReference", back_populates="extra_bookings")
    extra = db.relationship("Extra", back_populates="extra_bookings")
