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
}: Props) {
  const navigate = useNavigate()
  const [arrival, setArrival] = useState(() => ymdToHtml(arrivalYmd))
  const [departure, setDeparture] = useState(() => ymdToHtml(departureYmd))
  const [adults, setAdults] = useState(initialAdults)

  function handleArrivalChange(value: string) {
    setArrival(value)
    // Push departure forward if it's no longer after arrival
    if (departure && value >= departure) {
      const next = htmlDateValueToDate(value)
      if (next) {
        next.setDate(next.getDate() + 1)
        setDeparture(dateToHtmlDateValue(next))
      }
    }
  }

  function adjustAdults(delta: number) {
    setAdults((prev) => Math.max(1, Math.min(10, prev + delta)))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!arrival || !departure) return
    navigate(
      `${basePath}?arrival=${htmlToYmd(arrival)}&departure=${htmlToYmd(departure)}&adults=${adults}`,
      { replace: true },
    )
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-gecko-sand bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:gap-3 sm:p-5"
      aria-label="Search availability"
    >
      {/* ── Check-in ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1.5">
        <label
          htmlFor="bsb-arrival"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/60"
        >
          Check-in
        </label>
        <input
          id="bsb-arrival"
          type="date"
          value={arrival}
          min={today}
          onChange={(e) => handleArrivalChange(e.target.value)}
          required
          className="rounded-xl border border-gecko-sand bg-gecko-cream/60 px-3 py-2.5 text-sm font-medium text-gecko-forestDeep focus:border-gecko-forest focus:outline-none focus:ring-1 focus:ring-gecko-forest"
        />
      </div>

      {/* ── Night count separator ──────────────────────────── */}
      <div className="flex items-center justify-center sm:self-end sm:pb-[9px]">
        {nights !== null ? (
          <span className="rounded-full bg-gecko-mist px-2.5 py-1 text-[11px] font-semibold text-gecko-forest">
            {nights} night{nights !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="hidden text-gecko-forest/30 sm:block">→</span>
        )}
      </div>

      {/* ── Check-out ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1.5">
        <label
          htmlFor="bsb-departure"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/60"
        >
          Check-out
        </label>
        <input
          id="bsb-departure"
          type="date"
          value={departure}
          min={arrival || today}
          onChange={(e) => setDeparture(e.target.value)}
          required
          className="rounded-xl border border-gecko-sand bg-gecko-cream/60 px-3 py-2.5 text-sm font-medium text-gecko-forestDeep focus:border-gecko-forest focus:outline-none focus:ring-1 focus:ring-gecko-forest"
        />
      </div>

      {/* ── Guests ────────────────────────────────────────── */}
      {showGuests && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/60">
            Guests
          </span>
          <div className="flex items-center gap-3 rounded-xl border border-gecko-sand bg-gecko-cream/60 px-3 py-2">
            <button
              type="button"
              onClick={() => adjustAdults(-1)}
              disabled={adults <= 1}
              aria-label="Remove guest"
              className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none text-gecko-forest transition hover:bg-gecko-mist disabled:opacity-30"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-semibold text-gecko-forestDeep">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => adjustAdults(1)}
              disabled={adults >= 10}
              aria-label="Add guest"
              className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none text-gecko-forest transition hover:bg-gecko-mist disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* ── Submit ────────────────────────────────────────── */}
      <button
        type="submit"
        className="rounded-xl bg-gecko-forest px-6 py-2.5 text-sm font-semibold text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep sm:self-end"
      >
        Search
      </button>
    </form>
  )
}
