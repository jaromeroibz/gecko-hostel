import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  roomName: string
  arrivalYmd: string
  departureYmd: string
  adults: number
  hasPackage: boolean
  packageName?: string
}

function formatDate(ymd: string): string {
  if (!ymd) return '—'
  // Accept YYYYMMDD (8 chars, no dashes) or YYYY-MM-DD
  const normalized = ymd.length === 8 && !ymd.includes('-')
    ? `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`
    : ymd
  const [y, m, d] = normalized.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function CheckoutReminderModal({
  isOpen,
  onClose,
  onConfirm,
  roomName,
  arrivalYmd,
  departureYmd,
  adults,
  hasPackage,
  packageName,
}: Props) {
  const { t } = useTranslation()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="crm-backdrop" onClick={onClose} aria-hidden />

      {/* Modal */}
      <div
        className="crm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crm-title"
      >
        {/* Header */}
        <div className="crm-header">
          <span className="crm-icon" aria-hidden>🏄</span>
          <h2 id="crm-title" className="crm-title font-display">
            {t('booking.reminderTitle')}
          </h2>
          <button onClick={onClose} className="crm-close" aria-label="Close">✕</button>
        </div>

        {/* Booking summary */}
        <div className="crm-summary">
          <div className="crm-row">
            <span className="crm-label font-label">{t('booking.reminderRoom')}</span>
            <span className="crm-value font-label">{roomName}</span>
          </div>
          <div className="crm-row">
            <span className="crm-label font-label">{t('booking.reminderDates')}</span>
            <span className="crm-value font-label">
              {formatDate(arrivalYmd)} → {formatDate(departureYmd)}
            </span>
          </div>
          <div className="crm-row">
            <span className="crm-label font-label">{t('booking.reminderGuests')}</span>
            <span className="crm-value font-label">
              {adults} {adults !== 1 ? t('booking.guestsPlural') : t('booking.guest')}
            </span>
          </div>
          {hasPackage && packageName && (
            <div className="crm-row">
              <span className="crm-label font-label">{t('booking.packageSelected')}</span>
              <span className="crm-value crm-value--pkg font-label">{packageName}</span>
            </div>
          )}
        </div>

        {/* Reminder notice */}
        <div className="crm-notice">
          <span className="crm-notice-icon" aria-hidden>⚠️</span>
          <p className="crm-notice-text font-label">
            {hasPackage
              ? t('booking.reminderNotePackage')
              : t('booking.reminderNoteExtras')}
          </p>
        </div>

        {/* Actions */}
        <div className="crm-actions">
          <button onClick={onClose} className="crm-btn-back font-label">
            {t('booking.reminderBack')}
          </button>
          <button onClick={onConfirm} className="crm-btn-confirm font-label">
            {t('booking.reminderConfirm')}
          </button>
        </div>
      </div>

      <style>{`
        .crm-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 30, 20, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 200;
          animation: crm-fade-in 0.2s ease both;
        }

        .crm-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 201;
          width: min(92vw, 480px);
          background: #F9FDF9;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(6, 78, 59, 0.08),
            0 32px 80px -16px rgba(6, 30, 20, 0.35);
          animation: crm-slide-up 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes crm-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes crm-slide-up {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }

        /* ── Header ── */
        .crm-header {
          background: #064E3B;
          padding: 1.5rem 1.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
        }

        .crm-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .crm-title {
          font-size: 1.35rem;
          line-height: 1.2;
          color: #F9FDF9;
          margin: 0;
          flex: 1;
          letter-spacing: -0.01em;
        }

        .crm-close {
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(249, 253, 249, 0.5);
          font-size: 1rem;
          padding: 4px 8px;
          transition: color 0.2s;
        }

        .crm-close:hover { color: #F9FDF9; }

        /* ── Summary ── */
        .crm-summary {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(6, 78, 59, 0.08);
        }

        .crm-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
        }

        .crm-label {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.45);
          flex-shrink: 0;
        }

        .crm-value {
          font-size: 0.875rem;
          color: #064E3B;
          font-weight: 500;
          text-align: right;
        }

        .crm-value--pkg {
          color: #F97316;
          font-weight: 700;
        }

        /* ── Notice ── */
        .crm-notice {
          margin: 0 1.75rem 1.5rem;
          padding: 1rem 1.25rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 0.875rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .crm-notice-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

        .crm-notice-text {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: #92400e;
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* ── Actions ── */
        .crm-actions {
          padding: 0 1.75rem 1.75rem;
          display: flex;
          gap: 0.75rem;
        }

        .crm-btn-back {
          flex: 1;
          padding: 0.8rem 1.25rem;
          border-radius: 100px;
          border: 1.5px solid rgba(6, 78, 59, 0.2);
          background: transparent;
          color: rgba(6, 78, 59, 0.65);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .crm-btn-back:hover {
          border-color: rgba(6, 78, 59, 0.4);
          color: #064E3B;
        }

        .crm-btn-confirm {
          flex: 2;
          padding: 0.8rem 1.25rem;
          border-radius: 100px;
          border: none;
          background: #F59E0B;
          color: #064E3B;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .crm-btn-confirm:hover {
          background: #d97706;
          transform: translateY(-1px);
        }

        .crm-btn-confirm:active { transform: translateY(0); }
      `}</style>
    </>
  )
}
