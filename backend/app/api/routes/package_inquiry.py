import os
import re

import resend
from flask import jsonify, request

from app.api import api_bp

_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Gecko Surf House <onboarding@resend.dev>")
_TO_EMAIL   = os.getenv("CONTACT_TO_EMAIL",  "geckosurfhousecr@gmail.com")
_EMAIL_RE   = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _fmt_date(ymd: str) -> str:
    """YYYYMMDD → 'Jun 22, 2026'."""
    if len(ymd) != 8:
        return ymd
    try:
        from datetime import date
        d = date(int(ymd[:4]), int(ymd[4:6]), int(ymd[6:]))
        return d.strftime("%b %d, %Y")
    except Exception:
        return ymd


@api_bp.post("/package-inquiry")
def package_inquiry():
    data = request.get_json(silent=True) or {}

    # Honeypot — bots fill hidden fields; humans don't
    if data.get("website"):
        return jsonify({"success": True}), 200

    name         = (data.get("name")         or "").strip()
    email        = (data.get("email")        or "").strip()
    whatsapp     = (data.get("whatsapp")     or "").strip()
    package_name = (data.get("package_name") or "Package inquiry").strip()
    arrival      = (data.get("arrival")      or "").strip()
    departure    = (data.get("departure")    or "").strip()
    guests       = int(data.get("guests") or 1)
    message      = (data.get("message")      or "").strip()

    errors = {}
    if not name:
        errors["name"] = "Name is required."
    if not email or not _EMAIL_RE.match(email):
        errors["email"] = "A valid email address is required."
    if not whatsapp:
        errors["whatsapp"] = "WhatsApp number is required."
    if errors:
        return jsonify({"error": "Validation failed", "fields": errors}), 422

    api_key = os.getenv("RESEND_API_KEY", "")
    if not api_key:
        return jsonify({"error": "Email service not configured."}), 503

    resend.api_key = api_key

    arr_fmt = _fmt_date(arrival)   if arrival   else "—"
    dep_fmt = _fmt_date(departure) if departure else "—"

    wa_href = f"https://wa.me/{whatsapp.replace('+','').replace(' ','')}"

    html = f"""
    <div style="font-family:system-ui,sans-serif;max-width:640px;color:#064E3B;
                background:#F9FDF9;border-radius:12px;overflow:hidden;
                border:1px solid #ECFDF5;">

      <!-- Header -->
      <div style="background:#064E3B;padding:1.5rem 2rem;">
        <p style="margin:0 0 0.25rem;font-size:0.7rem;letter-spacing:0.2em;
                  text-transform:uppercase;color:#34D399;">New Package Inquiry</p>
        <h2 style="margin:0;font-size:1.5rem;color:#F9FDF9;">{package_name}</h2>
      </div>

      <!-- Guest details -->
      <div style="padding:1.5rem 2rem;border-bottom:1px solid #ECFDF5;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:0.5rem 0;color:#34D399;font-size:0.7rem;
                       letter-spacing:0.15em;text-transform:uppercase;
                       width:130px;vertical-align:top;">Name</td>
            <td style="padding:0.5rem 0;font-weight:600;">{name}</td>
          </tr>
          <tr>
            <td style="padding:0.5rem 0;color:#34D399;font-size:0.7rem;
                       letter-spacing:0.15em;text-transform:uppercase;
                       vertical-align:top;">Email</td>
            <td style="padding:0.5rem 0;">
              <a href="mailto:{email}" style="color:#F97316;">{email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0.5rem 0;color:#34D399;font-size:0.7rem;
                       letter-spacing:0.15em;text-transform:uppercase;
                       vertical-align:top;">WhatsApp</td>
            <td style="padding:0.5rem 0;">
              <a href="{wa_href}" style="color:#25D366;font-weight:600;">{whatsapp}</a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Booking details -->
      <div style="padding:1.5rem 2rem;border-bottom:1px solid #ECFDF5;
                  background:#ECFDF5;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:0.4rem 0;color:rgba(6,78,59,0.55);font-size:0.7rem;
                       letter-spacing:0.12em;text-transform:uppercase;
                       width:130px;">Check-in</td>
            <td style="padding:0.4rem 0;font-weight:600;">{arr_fmt}</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0;color:rgba(6,78,59,0.55);font-size:0.7rem;
                       letter-spacing:0.12em;text-transform:uppercase;">Check-out</td>
            <td style="padding:0.4rem 0;font-weight:600;">{dep_fmt}</td>
          </tr>
          <tr>
            <td style="padding:0.4rem 0;color:rgba(6,78,59,0.55);font-size:0.7rem;
                       letter-spacing:0.12em;text-transform:uppercase;">Guests</td>
            <td style="padding:0.4rem 0;font-weight:600;">{guests}</td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      {'<div style="padding:1.5rem 2rem;border-bottom:1px solid #ECFDF5;"><p style="margin:0 0 0.5rem;color:#34D399;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;">Message</p><p style="margin:0;white-space:pre-wrap;line-height:1.7;">' + message + '</p></div>' if message else ''}

      <!-- CTA -->
      <div style="padding:1.5rem 2rem;display:flex;gap:1rem;flex-wrap:wrap;">
        <a href="mailto:{email}"
           style="display:inline-block;padding:0.75rem 1.5rem;
                  background:#064E3B;color:#F9FDF9;border-radius:9999px;
                  text-decoration:none;font-size:0.75rem;font-weight:600;
                  letter-spacing:0.12em;text-transform:uppercase;">
          Reply by email
        </a>
        <a href="{wa_href}"
           style="display:inline-block;padding:0.75rem 1.5rem;
                  background:#25D366;color:#fff;border-radius:9999px;
                  text-decoration:none;font-size:0.75rem;font-weight:600;
                  letter-spacing:0.12em;text-transform:uppercase;">
          Reply on WhatsApp
        </a>
      </div>

    </div>
    """

    try:
        resend.Emails.send({
            "from":     _FROM_EMAIL,
            "to":       [_TO_EMAIL],
            "reply_to": email,
            "subject":  f"[Package] {package_name} — {name} · {arr_fmt}",
            "html":     html,
        })
        return jsonify({"success": True}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500
