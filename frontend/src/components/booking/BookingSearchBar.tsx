import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { dateToHtmlDateValue, htmlDateValueToDate } from '../../utils/formatDateToYYYYMMDD'

type Props = {
  arrivalYmd: string
  departureYmd: string
  adults: number
  /** Hide the guests +/- control. Pass false for per-room-priced rooms. Default: true */
  showGuests?: boolean
  /** Base path for the search navigate. Default: '/booking' (the room list). */
  basePath?: string
  /** Extra query params to preserve on navigation (e.g. { package: 'backpacker' }). */
  extraQuery?: Record<string, string>
  /** Minimum number of nights — enforces minimum stay for packages. */
  minNights?: number
  /** Maximum number of nights — enforces exact duration for packages. */
  maxNights?: number
  /** Label for the submit button. Default: 'Search'. */
  submitLabel?: string
  /** Called after a successful search navigation — use to scroll to results. */
  onAfterSearch?: () => void
  /** Called immediately whenever the guest count changes — use to keep the
   *  inline widget in sync without waiting for the user to hit Search. */
  onAdultsChange?: (adults: number) => void
}

function ymdToHtml(ymd: string): string {
  if (ymd.length !== 8) return ''
  return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`
}

function htmlToYmd(value: string): string {
  return value.replace(/-/g, '')
}

function todayHtml(): string {
  return dateToHtmlDateValue(new Date())
}

export function BookingSearchBar({
  arrivalYmd,
  departureYmd,
  adults: initialAdults,
  showGuests = true,
  basePath = '/booking',
  extraQuery,
  minNights,
  maxNights,
  submitLabel = 'Search',
  onAfterSearch,
  onAdultsChange,
}: Props) {
  const navigate = useNavigate()
  const [arrival, setArrival] = useState(() => ymdToHtml(arrivalYmd))
  const [departure, setDeparture] = useState(() => {
    const arr = ymdToHtml(arrivalYmd)
    const dep = ymdToHtml(departureYmd)
    if (arr) {
      // Exact duration: always lock to arrival + maxNights
      if (maxNights) {
        const d = htmlDateValueToDate(arr)
        if (d) { d.setDate(d.getDate() + maxNights); return dateToHtmlDateValue(d) }
      }
      // Minimum stay: bump forward if too short
      if (minNights) {
        const d = htmlDateValueToDate(arr)
        if (d) {
          d.setDate(d.getDate() + minNights)
          const minDep = dateToHtmlDateValue(d)
          if (!dep || dep < minDep) return minDep
        }
      }
    }
    return dep
  })
  const [adults, setAdults] = useState(initialAdults)

  // Earliest allowed departure given an arrival date and minNights requirement
  function calcMinDeparture(arrivalHtml: string): string {
    const d = htmlDateValueToDate(arrivalHtml)
    if (!d) return arrivalHtml
    d.setDate(d.getDate() + (minNights ?? 1))
    return dateToHtmlDateValue(d)
  }

  // Latest allowed departure when maxNights is set (exact package duration)
  function calcMaxDeparture(arrivalHtml: string): string | undefined {
    if (!maxNights) return undefined
    const d = htmlDateValueToDate(arrivalHtml)
    if (!d) return undefined
    d.setDate(d.getDate() + maxNights)
    return dateToHtmlDateValue(d)
  }

  function handleArrivalChange(value: string) {
    setArrival(value)
    if (!value) return
    // When maxNights is set, lock departure to exactly arrival + maxNights
    if (maxNights) {
      setDeparture(calcMaxDeparture(value) ?? departure)
      return
    }
    // Otherwise auto-advance departure to satisfy minNights (or at least 1 night ahead)
    const minDep = calcMinDeparture(value)
    if (!departure || departure < minDep) {
      setDeparture(minDep)
    }
  }

  function adjustAdults(delta: number) {
    setAdults((prev) => {
      const next = Math.max(1, Math.min(10, prev + delta))
      onAdultsChange?.(next)
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!arrival || !departure) return
    const params = new URLSearchParams({
      arrival: htmlToYmd(arrival),
      departure: htmlToYmd(departure),
      adults: String(adults),
      ...(extraQuery ?? {}),
    })
    navigate(`${basePath}?${params.toString()}`, { replace: true })
    // Scroll to results after navigation settles
    if (onAfterSearch) {
      setTimeout(onAfterSearch, 80)
    }
  }

  const today = todayHtml()

  // Night count between the two selected dates
  const nights: number | null = (() => {
    if (!arrival || !departure) return null
    const diff = Math.round(
      (new Date(departure).getTime() - new Date(arrival).getTime()) / 86400000,
    )
    return diff > 0 ? diff : null
  })()

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bsb-form flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3"
        aria-label="Search availability"
      >
        {/* ── Check-in ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="bsb-arrival" className="bsb-label font-label">
            Check-in
          </label>
          <input
            id="bsb-arrival"
            type="date"
            value={arrival}
            min={today}
            onChange={(e) => handleArrivalChange(e.target.value)}
            required
            className="bsb-input"
          />
        </div>

        {/* ── Night count separator ──────────────────────────── */}
        <div className="flex items-center justify-center sm:self-end sm:pb-[9px]">
          {nights !== null ? (
            <span className="bsb-nights-pill font-label">
              {nights} night{nights !== 1 ? 's' : ''}
            </span>
          ) : (
            <span className="bsb-arrow hidden sm:block">→</span>
          )}
        </div>

        {/* ── Check-out ─────────────────────────────────────── */}
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="bsb-departure" className="bsb-label font-label">
            Check-out
          </label>
          <input
            id="bsb-departure"
            type="date"
            value={departure}
            min={arrival ? calcMinDeparture(arrival) : today}
            max={arrival && maxNights ? calcMaxDeparture(arrival) : undefined}
            onChange={maxNights ? undefined : (e) => setDeparture(e.target.value)}
            readOnly={!!maxNights}
            required
            className={`bsb-input${maxNights ? ' bsb-input--locked' : ''}`}
          />
        </div>

        {/* ── Guests ────────────────────────────────────────── */}
        {showGuests && (
          <div className="flex flex-col gap-1.5">
            <span className="bsb-label font-label">Guests</span>
            <div className="bsb-guests">
              <button
                type="button"
                onClick={() => adjustAdults(-1)}
                disabled={adults <= 1}
                aria-label="Remove guest"
                className="bsb-guest-btn"
              >
                −
              </button>
              <span className="bsb-guest-count font-label">{adults}</span>
              <button
                type="button"
                onClick={() => adjustAdults(1)}
                disabled={adults >= 10}
                aria-label="Add guest"
                className="bsb-guest-btn"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* ── Submit ────────────────────────────────────────── */}
        <button type="submit" className="bsb-submit font-label sm:self-end">
          {submitLabel}
        </button>
      </form>

      <style>{`
        /* ━━ Form shell ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-form {
          background: #ffffff;
          border: 1px solid rgba(6, 78, 59, 0.1);
          border-radius: 1.5rem;
          padding: 1.25rem 1.5rem;
          box-shadow:
            0 1px 0 rgba(6, 78, 59, 0.03),
            0 8px 32px -8px rgba(6, 78, 59, 0.1);
        }

        /* ━━ Labels ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.45);
        }

        /* ━━ Date inputs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid rgba(6, 78, 59, 0.13);
          background: #F9FDF9;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #064E3B;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .bsb-input:focus {
          border-color: rgba(52, 211, 153, 0.6);
          box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.12);
        }

        /* Locked departure — auto-calculated, not user-editable */
        .bsb-input--locked {
          background: #ECFDF5;
          border-color: rgba(52, 211, 153, 0.25);
          color: rgba(6, 78, 59, 0.55);
          cursor: default;
          pointer-events: none;
        }

        /* ━━ Night pill / arrow ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-nights-pill {
          display: inline-block;
          background: #ECFDF5;
          color: #064E3B;
          border-radius: 100px;
          padding: 0.28rem 0.75rem;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          font-weight: 600;
          white-space: nowrap;
        }

        .bsb-arrow {
          color: rgba(6, 78, 59, 0.25);
        }

        /* ━━ Guests control ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-guests {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          border-radius: 0.875rem;
          border: 1px solid rgba(6, 78, 59, 0.13);
          background: #F9FDF9;
          padding: 0.5rem 0.875rem;
        }

        .bsb-guest-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 100px;
          font-size: 1.1rem;
          line-height: 1;
          color: #064E3B;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
        }

        .bsb-guest-btn:hover:not(:disabled) {
          background: #ECFDF5;
        }

        .bsb-guest-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .bsb-guest-count {
          width: 1.25rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: #064E3B;
        }

        /* ━━ Submit button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bsb-submit {
          border-radius: 0.875rem;
          background: #064E3B;
          color: #F9FDF9;
          padding: 0.65rem 1.75rem;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.22s, color 0.22s;
          white-space: nowrap;
        }

        .bsb-submit:hover {
          background: #F97316;
          color: #F9FDF9;
        }
      `}</style>
    </>
  )
}
