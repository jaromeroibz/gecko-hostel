from app.api import api_bp


@api_bp.get("/health")
def health_check():
    return "API running", 200
