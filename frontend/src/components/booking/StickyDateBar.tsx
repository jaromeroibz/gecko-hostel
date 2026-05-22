type Props = {
  arrivalYmd: string
  departureYmd: string
  adults: number
  onEdit: () => void
}

function formatShort(ymd: string): string {
  if (ymd.length !== 8) return '—'
  const iso = `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function nightsBetween(a: string, d: string): number | null {
  if (a.length !== 8 || d.length !== 8) return null
  const diff = Math.round(
    (new Date(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`).getTime() -
      new Date(`${a.slice(0, 4)}-${a.slice(4, 6)}-${a.slice(6, 8)}`).getTime()) /
      86400000,
  )
  return diff > 0 ? diff : null
}

export function StickyDateBar({ arrivalYmd, departureYmd, adults, onEdit }: Props) {
  const hasDates = arrivalYmd.length === 8 && departureYmd.length === 8
  const nights   = nightsBetween(arrivalYmd, departureYmd)

  return (
    <>
      <div className="sdb-bar sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            {hasDates ? (
              <p className="sdb-dates font-label">
                {formatShort(arrivalYmd)} → {formatShort(departureYmd)}
              </p>
            ) : (
              <p className="sdb-dates font-label">Select your dates</p>
            )}
            <p className="sdb-sub font-label">
              {nights ? `${nights} night${nights !== 1 ? 's' : ''} · ` : ''}
              {adults} {adults === 1 ? 'guest' : 'guests'}
            </p>
          </div>

          <button onClick={onEdit} className="sdb-edit-btn font-label">
            Edit search ↑
          </button>
        </div>
      </div>

      <style>{`
        .sdb-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 40;
          border-top: 1px solid rgba(6, 78, 59, 0.1);
          background: rgba(249, 253, 249, 0.97);
          padding: 0.875rem 1.25rem;
          box-shadow: 0 -4px 24px rgba(6, 78, 59, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .sdb-dates {
          font-size: 0.875rem;
          font-weight: 600;
          color: #064E3B;
          margin: 0;
        }

        .sdb-sub {
          font-size: 0.72rem;
          color: rgba(6, 78, 59, 0.5);
          margin: 0;
          letter-spacing: 0.04em;
        }

        .sdb-edit-btn {
          border-radius: 0.75rem;
          border: 1.5px solid rgba(6, 78, 59, 0.35);
          padding: 0.55rem 1.1rem;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: #064E3B;
          background: none;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          white-space: nowrap;
        }

        .sdb-edit-btn:active,
        .sdb-edit-btn:hover {
          background: #064E3B;
          color: #F9FDF9;
          border-color: #064E3B;
        }
      `}</style>
    </>
  )
}
