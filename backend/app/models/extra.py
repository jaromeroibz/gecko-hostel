from app.extensions import db


class Extra(db.Model):
    __tablename__ = "extras"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    extra_bookings = db.relationship(
        "ExtraBooking",
        back_populates="extra",
        cascade="all, delete-orphan",
    )
