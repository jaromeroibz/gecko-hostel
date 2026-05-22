import os
import re

import resend
from flask import jsonify, request

from app.api import api_bp

# The "from" address must belong to a domain verified in your Resend dashboard.
# The "from" address must belong to a domain verified in your Resend dashboard,
# or use the Resend sandbox address for testing.
_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Gecko Surf House <onboarding@resend.dev>")
_TO_EMAIL   = os.getenv("CONTACT_TO_EMAIL",  "geckosurfhousecr@gmail.com")

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@api_bp.post("/contact")
def send_contact():
    data = request.get_json(silent=True) or {}

    # Honeypot — bots fill hidden fields; humans don't
    if data.get("website"):
        return jsonify({"success": True}), 200

    name    = (data.get("name")    or "").strip()
    email   = (data.get("email")   or "").strip()
    subject = (data.get("subject") or "Website enquiry").strip()
    message = (data.get("message") or "").strip()

    errors = {}
    if not name:
        errors["name"] = "Name is required."
    if not email or not _EMAIL_RE.match(email):
        errors["email"] = "A valid email address is required."
    if not message:
        errors["message"] = "Message is required."
    if errors:
        return jsonify({"error": "Validation failed", "fields": errors}), 422

    api_key = os.getenv("RESEND_API_KEY", "")
    if not api_key:
        return jsonify({"error": "Email service not configured."}), 503

    resend.api_key = api_key

    html = f"""
    <div style="font-family:system-ui,sans-serif;max-width:600px;color:#064E3B;">
      <h2 style="margin:0 0 1rem;font-size:1.5rem;">
        New message from the Gecko Hostel website
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
        <tr>
          <td style="padding:0.5rem 0;color:#34D399;font-size:0.75rem;
                     letter-spacing:0.1em;text-transform:uppercase;
                     width:100px;vertical-align:top;">Name</td>
          <td style="padding:0.5rem 0;">{name}</td>
        </tr>
        <tr>
          <td style="padding:0.5rem 0;color:#34D399;font-size:0.75rem;
                     letter-spacing:0.1em;text-transform:uppercase;
                     vertical-align:top;">Email</td>
          <td style="padding:0.5rem 0;">
            <a href="mailto:{email}" style="color:#F97316;">{email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0.5rem 0;color:#34D399;font-size:0.75rem;
                     letter-spacing:0.1em;text-transform:uppercase;
                     vertical-align:top;">Subject</td>
          <td style="padding:0.5rem 0;">{subject}</td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #ECFDF5;margin-bottom:1.5rem;" />
      <p style="white-space:pre-wrap;line-height:1.7;margin:0;">{message}</p>
    </div>
    """

    try:
        resend.Emails.send({
            "from":     _FROM_EMAIL,
            "to":       [_TO_EMAIL],
            "reply_to": email,
            "subject":  f"[Contact] {subject} — {name}",
            "html":     html,
        })
        return jsonify({"success": True}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500
