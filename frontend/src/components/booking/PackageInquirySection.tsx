import { useState } from 'react'
import type { Package } from '../../data/packages'
import type { BookingRoom } from '../../data/bookingRooms'

const API_BASE       = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5001/api'
const WHATSAPP_NUMBER = '50687390370' // Costa Rica +506

function fmtDate(ymd: string): string {
  if (ymd.length !== 8) return ''
  return new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type Props = {
  pkg: Package
  room: BookingRoom
  arrivalYmd: string
  departureYmd: string
  adults: number
}

export function PackageInquirySection({ pkg, room, arrivalYmd, departureYmd, adults }: Props) {
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', message: '',
  })
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const nights = arrivalYmd && departureYmd
    ? Math.round((new Date(`${departureYmd.slice(0,4)}-${departureYmd.slice(4,6)}-${departureYmd.slice(6,8)}`).getTime() -
                  new Date(`${arrivalYmd.slice(0,4)}-${arrivalYmd.slice(4,6)}-${arrivalYmd.slice(6,8)}`).getTime()) / 86400000)
    : pkg.nights

  // WhatsApp pre-filled message
  const waText = encodeURIComponent(
    `Hi! I'm interested in the *${pkg.name}* at Gecko Surf House.\n` +
    `Dates: ${fmtDate(arrivalYmd)} → ${fmtDate(departureYmd)} (${nights} nights)\n` +
    `Guests: ${adults}\nCan you help me book?`
  )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim())     e.name     = 'Name is required.'
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      e.email = 'A valid email is required.'
    }
    if (!form.whatsapp.trim()) e.whatsapp = 'WhatsApp number is required.'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/package-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         form.name,
          email:        form.email,
          whatsapp:     form.whatsapp,
          package_name: pkg.name,
          arrival:      arrivalYmd,
          departure:    departureYmd,
          guests:       adults,
          message:      form.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Request failed')
      setStatus('success')
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="piq-success">
        <span className="piq-success-icon" aria-hidden>🏄</span>
        <h3 className="piq-success-title font-display">You're on the list!</h3>
        <p className="piq-success-text">
          We'll send you a payment link within 24 hours to confirm your
          <strong> {pkg.name}</strong>. Keep an eye on your inbox and WhatsApp.
        </p>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="piq-wa-btn font-label">
          <WaIcon /> Chat with us on WhatsApp
        </a>

        <style>{PIQ_STYLES}</style>
      </div>
    )
  }

  return (
    <div className="piq-wrap">

      {/* ── Package summary ──────────────────────────────────────────── */}
      <div className="piq-summary">
        <p className="piq-eyebrow font-label">Package selected</p>
        <h3 className="piq-pkg-name font-display">{pkg.name}</h3>
        <div className="piq-pills">
          <span className="piq-pill font-label">{pkg.duration}</span>
          <span className="piq-pill font-label">{pkg.accommodation}</span>
          <span className="piq-pill piq-pill--price font-label">
            From ${pkg.price.toLocaleString()} {pkg.priceUnit}
          </span>
        </div>
        {arrivalYmd && (
          <div className="piq-dates font-label">
            <span>{fmtDate(arrivalYmd)}</span>
            <span className="piq-arrow" aria-hidden>→</span>
            <span>{fmtDate(departureYmd)}</span>
            <span className="piq-nights">{nights}n · {adults} guest{adults !== 1 ? 's' : ''}</span>
          </div>
        )}
        <p className="piq-howto">
          Send us your details and we'll reply within&nbsp;24&nbsp;hours with a payment link
          for the full package — accommodation, surf lessons, tours and everything included.
        </p>
      </div>

      {/* ── Inquiry form ─────────────────────────────────────────────── */}
      <form className="piq-form" onSubmit={handleSubmit} noValidate>

        <div className="piq-row">
          <div className="piq-field">
            <label className="piq-label font-label" htmlFor="piq-name">Full name *</label>
            <input
              id="piq-name"
              className={`piq-input${errors.name ? ' piq-input--error' : ''}`}
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Jane Smith"
            />
            {errors.name && <p className="piq-error">{errors.name}</p>}
          </div>
          <div className="piq-field">
            <label className="piq-label font-label" htmlFor="piq-email">Email *</label>
            <input
              id="piq-email"
              className={`piq-input${errors.email ? ' piq-input--error' : ''}`}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="jane@email.com"
            />
            {errors.email && <p className="piq-error">{errors.email}</p>}
          </div>
        </div>

        <div className="piq-field">
          <label className="piq-label font-label" htmlFor="piq-wa">
            WhatsApp number *
            <span className="piq-label-hint"> (incl. country code, e.g. +1 555 …)</span>
          </label>
          <input
            id="piq-wa"
            className={`piq-input${errors.whatsapp ? ' piq-input--error' : ''}`}
            type="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
            placeholder="+1 555 000 0000"
          />
          {errors.whatsapp && <p className="piq-error">{errors.whatsapp}</p>}
        </div>

        <div className="piq-field">
          <label className="piq-label font-label" htmlFor="piq-msg">
            Questions or special requests
            <span className="piq-label-hint"> (optional)</span>
          </label>
          <textarea
            id="piq-msg"
            className="piq-input piq-textarea"
            rows={3}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Any questions about the package, dietary needs, experience level…"
          />
        </div>

        {/* Honeypot */}
        <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} aria-hidden />

        {status === 'error' && (
          <p className="piq-server-error">{serverError}</p>
        )}

        <div className="piq-actions">
          <button
            type="submit"
            className="piq-submit font-label"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending…' : 'Send inquiry →'}
          </button>

          <span className="piq-divider font-label">or</span>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="piq-wa-btn font-label"
          >
            <WaIcon /> Chat on WhatsApp
          </a>
        </div>

      </form>

      <style>{PIQ_STYLES}</style>
    </div>
  )
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const PIQ_STYLES = `
  /* ── Wrapper ── */
  .piq-wrap {
    display: grid;
    gap: 2rem;
    margin-top: 1.5rem;
  }
  @media (min-width: 768px) {
    .piq-wrap {
      grid-template-columns: 1fr 1.4fr;
      align-items: start;
    }
  }

  /* ── Package summary card ── */
  .piq-summary {
    background: #064E3B;
    border-radius: 1.5rem;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: sticky;
    top: 6rem;
  }

  .piq-eyebrow {
    font-size: 0.58rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #34D399;
    margin: 0;
  }

  .piq-pkg-name {
    font-size: 1.35rem;
    line-height: 1.15;
    color: #F9FDF9;
    margin: 0;
  }

  .piq-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .piq-pill {
    display: inline-flex;
    align-items: center;
    background: rgba(249, 253, 249, 0.1);
    border: 1px solid rgba(249, 253, 249, 0.15);
    color: rgba(249, 253, 249, 0.75);
    border-radius: 100px;
    padding: 0.25rem 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .piq-pill--price {
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(245, 158, 11, 0.3);
    color: #F59E0B;
    font-weight: 700;
  }

  .piq-dates {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: rgba(249, 253, 249, 0.9);
    font-weight: 600;
  }

  .piq-arrow { color: #34D399; }

  .piq-nights {
    font-size: 0.7rem;
    color: rgba(249, 253, 249, 0.5);
    margin-left: 0.25rem;
  }

  .piq-howto {
    font-size: 0.82rem;
    line-height: 1.65;
    color: rgba(249, 253, 249, 0.6);
    margin: 0.25rem 0 0;
  }

  /* ── Form ── */
  .piq-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #ffffff;
    border: 1px solid rgba(6, 78, 59, 0.1);
    border-radius: 1.5rem;
    padding: 1.75rem;
    box-shadow: 0 8px 32px -8px rgba(6, 78, 59, 0.1);
  }

  .piq-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
  }
  @media (max-width: 480px) {
    .piq-row { grid-template-columns: 1fr; }
  }

  .piq-field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .piq-label {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(6, 78, 59, 0.5);
    font-weight: 700;
  }

  .piq-label-hint {
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    text-transform: none;
    color: rgba(6, 78, 59, 0.35);
    font-weight: 400;
  }

  .piq-input {
    width: 100%;
    border-radius: 0.875rem;
    border: 1.5px solid rgba(6, 78, 59, 0.13);
    background: rgba(6, 78, 59, 0.03);
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #064E3B;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: inherit;
    box-sizing: border-box;
  }

  .piq-input:focus {
    border-color: rgba(52, 211, 153, 0.6);
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.12);
  }

  .piq-input--error {
    border-color: rgba(239, 68, 68, 0.5);
  }

  .piq-textarea { resize: vertical; min-height: 80px; }

  .piq-error {
    font-size: 0.72rem;
    color: #dc2626;
    margin: 0;
    letter-spacing: 0.02em;
  }

  .piq-server-error {
    font-size: 0.8rem;
    color: #dc2626;
    background: rgba(239, 68, 68, 0.07);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    margin: 0;
  }

  /* ── Actions ── */
  .piq-actions {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  .piq-submit {
    flex: 1;
    min-width: 140px;
    background: #064E3B;
    color: #F9FDF9;
    border: none;
    border-radius: 9999px;
    padding: 0.8rem 1.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }

  .piq-submit:hover:not(:disabled) {
    background: #142923;
    transform: translateY(-1px);
  }

  .piq-submit:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .piq-divider {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: rgba(6, 78, 59, 0.3);
    flex-shrink: 0;
  }

  .piq-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #25D366;
    color: #fff;
    border-radius: 9999px;
    padding: 0.8rem 1.25rem;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .piq-wa-btn:hover {
    background: #1ebe5d;
    transform: translateY(-1px);
  }

  /* ── Success state ── */
  .piq-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    background: #ECFDF5;
    border: 1.5px solid rgba(52, 211, 153, 0.3);
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    margin-top: 1.5rem;
  }

  .piq-success-icon { font-size: 2.5rem; }

  .piq-success-title {
    font-size: 1.5rem;
    color: #064E3B;
    margin: 0;
  }

  .piq-success-text {
    font-size: 0.9rem;
    line-height: 1.65;
    color: rgba(6, 78, 59, 0.7);
    max-width: 400px;
    margin: 0;
  }
`
