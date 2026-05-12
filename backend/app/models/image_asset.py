from app.extensions import db


class ImageAsset(db.Model):
    __tablename__ = "image_assets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    category = db.Column(db.String(80), nullable=False, server_default="", default="")
    size_bytes = db.Column(db.Integer, nullable=False)
    original_url = db.Column(db.Text, nullable=False)
    optimized_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
