import { BookingButton } from './BookingButton'

export type PreBookingSummarySectionProps = {
  arrivalDate: Date
  departureDate: Date
  adults: number
  packageName?: string | null
  /** Lodgify redirect delay on CTA (ms). 0 = instant new tab. */
  redirectDelayMs?: number
  /** When false, CTA is disabled (e.g. invalid date range). */
  canProceed?: boolean
  blockedReason?: string
  className?: string
}

function formatRange(arrival: Date, departure: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return `${arrival.toLocaleDateString(undefined, opts)} → ${departure.toLocaleDateString(undefined, opts)}`
}

export function PreBookingSummarySection({
  arrivalDate,
  departureDate,
  adults,
  packageName,
  redirectDelayMs,
  canProceed = true,
  blockedReason,
  className = '',
}: PreBookingSummarySectionProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm transition-opacity duration-300 sm:p-8 ${className}`}
    >
      <h2 className="text-lg font-semibold text-slate-900">Your stay</h2>
      <p className="mt-1 text-sm text-slate-500">
        Review your details, then continue to Lodgify for live availability and payment.
      </p>

      <dl className="mt-6 space-y-4 border-t border-slate-100 pt-6">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Dates</dt>
          <dd className="mt-1 text-base font-medium text-slate-900">{formatRange(arrivalDate, departureDate)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Guests</dt>
          <dd className="mt-1 text-base font-medium text-slate-900">
            {adults} {adults === 1 ? 'adult' : 'adults'}
          </dd>
        </div>
        {packageName?.trim() ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Package</dt>
            <dd className="mt-1 text-base font-medium text-slate-900">{packageName.trim()}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8">
        <BookingButton
          arrivalDate={arrivalDate}
          departureDate={departureDate}
          adults={adults}
          redirectDelayMs={redirectDelayMs}
          disabled={!canProceed}
        >
          Check availability
        </BookingButton>
        {!canProceed && blockedReason ? (
          <p className="mt-2 text-center text-sm text-amber-800">{blockedReason}</p>
        ) : null}
      </div>
    </section>
  )
}
