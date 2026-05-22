import { useState, useId } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000/api'

type FormState = 'idle' | 'sending' | 'success' | 'error'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const CONTACT_DETAILS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cp-icon">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'geckosurfhousecr@gmail.com',
    href: 'mailto:geckosurfhousecr@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cp-icon">
        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: 'Phone · WhatsApp',
    value: '+506 8739 0370',
    href: 'https://wa.me/50687390370',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cp-icon">
        <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: 'Location',
    value: 'Santa Teresa, Cobano, Puntarenas, Costa Rica',
    href: 'https://www.google.com/maps/place/Gecko+Surf+House/@9.6320219,-85.1573193,17z/data=!3m1!4b1!4m9!3m8!1s0x8f9f6f0f48e60c9b:0xcb2a9e0024365938!5m2!4m1!1i2!8m2!3d9.6320219!4d-85.154739!16s%2Fg%2F11z15gjhb9?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cp-icon">
        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: 'Reception hours',
    value: 'Mon–Sun · 8 am – 10 pm',
    href: null,
  },
]

export function ContactPage() {
  const uid = useId()

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honey,   setHoney]   = useState('')   // honeypot

  const [status,       setStatus]       = useState<FormState>('idle')
  const [fieldErrors,  setFieldErrors]  = useState<FieldErrors>({})
  const [serverError,  setServerError]  = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setFieldErrors({})
    setServerError('')

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subject || undefined,
          message,
          website: honey,   // honeypot field
        }),
      })

      const json = await res.json()

      if (res.ok && json.success) {
        setStatus('success')
        return
      }

      if (res.status === 422 && json.fields) {
        setFieldErrors(json.fields)
        setStatus('idle')
        return
      }

      setServerError(json.error ?? 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setServerError('Could not reach the server. Please check your connection.')
      setStatus('error')
    }
  }

  function reset() {
    setName(''); setEmail(''); setSubject(''); setMessage('')
    setFieldErrors({}); setServerError('')
    setStatus('idle')
  }

  const sending = status === 'sending'

  return (
    <>
      <style>{`
        /* ── Hero ──────────────────────────────────────────────────────── */
        .cp-hero {
          background: linear-gradient(135deg, #064E3B 0%, #1a5c47 60%, #064E3B 100%);
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,211,153,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-hero-eyebrow {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #34D399;
          margin-bottom: 1rem;
        }
        .cp-hero h1 {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #F4F1EA;
          line-height: 1.12;
          margin-bottom: 1.25rem;
        }
        .cp-hero p {
          font-size: 1.0625rem;
          color: rgba(244,241,234,.7);
          max-width: 42ch;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Layout ────────────────────────────────────────────────────── */
        .cp-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding: 3.5rem 0 5rem;
        }
        @media (min-width: 900px) {
          .cp-body {
            grid-template-columns: 1fr 400px;
            gap: 4rem;
            align-items: start;
          }
        }

        /* ── Form ──────────────────────────────────────────────────────── */
        .cp-form-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #064E3B;
          margin-bottom: 1.75rem;
          letter-spacing: -0.01em;
        }

        .cp-field {
          margin-bottom: 1.25rem;
        }
        .cp-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #064E3B;
          margin-bottom: 0.45rem;
        }
        .cp-input,
        .cp-textarea {
          width: 100%;
          background: #F4F1EA;
          border: 1.5px solid transparent;
          border-radius: 0.6rem;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          color: #064E3B;
          transition: border-color 0.18s, box-shadow 0.18s;
          outline: none;
          -webkit-appearance: none;
        }
        .cp-input::placeholder,
        .cp-textarea::placeholder { color: rgba(6,78,59,.4); }
        .cp-input:focus,
        .cp-textarea:focus {
          border-color: #34D399;
          box-shadow: 0 0 0 3px rgba(52,211,153,.15);
        }
        .cp-input.error,
        .cp-textarea.error {
          border-color: #F97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,.12);
        }
        .cp-textarea {
          min-height: 9rem;
          resize: vertical;
          line-height: 1.6;
        }
        .cp-field-error {
          margin-top: 0.35rem;
          font-size: 0.8125rem;
          color: #F97316;
          font-weight: 500;
        }

        /* Honeypot — visually hidden, not display:none (bots still see it) */
        .cp-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          tab-index: -1;
        }

        /* ── Submit button ─────────────────────────────────────────────── */
        .cp-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #064E3B;
          color: #F4F1EA;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.8rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: background 0.18s, transform 0.12s, opacity 0.18s;
          margin-top: 0.5rem;
        }
        .cp-submit:hover:not(:disabled) { background: #1a5c47; transform: translateY(-1px); }
        .cp-submit:active:not(:disabled) { transform: translateY(0); }
        .cp-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .cp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(244,241,234,.35);
          border-top-color: #F4F1EA;
          border-radius: 50%;
          animation: cp-spin 0.7s linear infinite;
        }
        @keyframes cp-spin { to { transform: rotate(360deg); } }

        /* ── Server error banner ───────────────────────────────────────── */
        .cp-banner-error {
          background: #FFF7ED;
          border: 1.5px solid #FDBA74;
          border-radius: 0.6rem;
          padding: 0.875rem 1.125rem;
          color: #9A3412;
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        /* ── Success state ─────────────────────────────────────────────── */
        .cp-success {
          text-align: center;
          padding: 3.5rem 1.5rem;
          background: #ECFDF5;
          border-radius: 1.25rem;
        }
        .cp-success-icon {
          width: 3.5rem;
          height: 3.5rem;
          background: #064E3B;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .cp-success-icon svg {
          width: 1.625rem;
          height: 1.625rem;
          stroke: #34D399;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .cp-success h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #064E3B;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        .cp-success p {
          color: rgba(6,78,59,.65);
          max-width: 36ch;
          margin: 0 auto 2rem;
          line-height: 1.65;
          font-size: 0.9375rem;
        }
        .cp-success-btn {
          background: none;
          border: 1.5px solid #064E3B;
          color: #064E3B;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.7rem 1.75rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .cp-success-btn:hover { background: #064E3B; color: #F4F1EA; }

        /* ── Sidebar ───────────────────────────────────────────────────── */
        .cp-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .cp-detail-card {
          background: #ECFDF5;
          border-radius: 1rem;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .cp-detail-card h3 {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #34D399;
          margin-bottom: 0.25rem;
        }
        .cp-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
        }
        .cp-icon-wrap {
          width: 2rem;
          height: 2rem;
          background: rgba(52,211,153,.15);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        .cp-icon {
          width: 1.0625rem;
          height: 1.0625rem;
          color: #064E3B;
        }
        .cp-detail-label {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #34D399;
          margin-bottom: 0.2rem;
        }
        .cp-detail-value {
          font-size: 0.9375rem;
          color: #064E3B;
          line-height: 1.5;
          font-weight: 500;
        }
        .cp-detail-value a {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(6,78,59,.3);
          transition: color 0.15s, text-decoration-color 0.15s;
        }
        .cp-detail-value a:hover {
          color: #F97316;
          text-decoration-color: #F97316;
        }

        /* Booking CTA card */
        .cp-cta-card {
          background: #064E3B;
          border-radius: 1rem;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
        }
        .cp-cta-card::before {
          content: '';
          position: absolute;
          top: -2rem;
          right: -2rem;
          width: 8rem;
          height: 8rem;
          background: rgba(52,211,153,.08);
          border-radius: 50%;
        }
        .cp-cta-card h3 {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #F4F1EA;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .cp-cta-card p {
          font-size: 0.875rem;
          color: rgba(244,241,234,.6);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .cp-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
        }
        .cp-cta-btn {
          display: inline-block;
          background: #34D399;
          color: #064E3B;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: background 0.18s, transform 0.12s;
        }
        .cp-cta-btn:hover { background: #6EE7B7; transform: translateY(-1px); }
        .cp-cta-btn-ghost {
          display: inline-block;
          background: transparent;
          color: rgba(244,241,234,.65);
          border: 1.5px solid rgba(244,241,234,.25);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: border-color 0.18s, color 0.18s;
        }
        .cp-cta-btn-ghost:hover {
          border-color: rgba(244,241,234,.6);
          color: #F4F1EA;
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 -mt-10 sm:-mt-12">
        <div className="cp-hero">
          <p className="cp-hero-eyebrow">We'd love to hear from you</p>
          <h1>Get in touch</h1>
          <p>
            Questions about a stay, a surf lesson, or just curious what the vibe is like?
            Drop us a note — we usually reply within a few hours.
          </p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="cp-body">

        {/* ── Contact form ──────────────────────────────────────────────── */}
        <div>
          {status === 'success' ? (
            <div className="cp-success">
              <div className="cp-success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2>Message sent!</h2>
              <p>
                Thanks for reaching out. We'll get back to you at <strong>{email}</strong> shortly.
              </p>
              <button className="cp-success-btn" onClick={reset}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <p className="cp-form-title">Send us a message</p>

              {status === 'error' && serverError && (
                <div className="cp-banner-error" role="alert">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from humans, bots fill it */}
                <div className="cp-honeypot" aria-hidden="true">
                  <label htmlFor={`${uid}-website`}>Leave this blank</label>
                  <input
                    id={`${uid}-website`}
                    type="text"
                    name="website"
                    value={honey}
                    onChange={e => setHoney(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* Name */}
                <div className="cp-field">
                  <label className="cp-label" htmlFor={`${uid}-name`}>
                    Your name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${uid}-name`}
                    className={`cp-input${fieldErrors.name ? ' error' : ''}`}
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={sending}
                    autoComplete="name"
                  />
                  {fieldErrors.name && (
                    <p className="cp-field-error" role="alert">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="cp-field">
                  <label className="cp-label" htmlFor={`${uid}-email`}>
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${uid}-email`}
                    className={`cp-input${fieldErrors.email ? ' error' : ''}`}
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={sending}
                    autoComplete="email"
                  />
                  {fieldErrors.email && (
                    <p className="cp-field-error" role="alert">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Subject (optional) */}
                <div className="cp-field">
                  <label className="cp-label" htmlFor={`${uid}-subject`}>
                    Subject <span style={{ color: 'rgba(6,78,59,.4)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— optional</span>
                  </label>
                  <input
                    id={`${uid}-subject`}
                    className="cp-input"
                    type="text"
                    placeholder="e.g. Surf lesson enquiry"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    disabled={sending}
                  />
                </div>

                {/* Message */}
                <div className="cp-field">
                  <label className="cp-label" htmlFor={`${uid}-message`}>
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    className={`cp-textarea${fieldErrors.message ? ' error' : ''}`}
                    placeholder="Tell us what's on your mind…"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={sending}
                  />
                  {fieldErrors.message && (
                    <p className="cp-field-error" role="alert">{fieldErrors.message}</p>
                  )}
                </div>

                <button className="cp-submit" type="submit" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="cp-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
                        <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <div className="cp-sidebar">
          <div className="cp-detail-card">
            <h3>Find us</h3>
            {CONTACT_DETAILS.map(d => (
              <div key={d.label} className="cp-detail-item">
                <div className="cp-icon-wrap">{d.icon}</div>
                <div>
                  <p className="cp-detail-label">{d.label}</p>
                  <p className="cp-detail-value">
                    {d.href ? (
                      <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {d.value}
                      </a>
                    ) : d.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="cp-cta-card">
            <h3>Ready to book?</h3>
            <p>
              Browse rooms, check availability, and secure your spot in Santa Teresa —
              directly through our booking page.
            </p>
            <div className="cp-cta-btns">
              <Link to="/booking" className="cp-cta-btn">
                View rooms →
              </Link>
              <Link to="/#packages" className="cp-cta-btn-ghost">
                Browse packages →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
