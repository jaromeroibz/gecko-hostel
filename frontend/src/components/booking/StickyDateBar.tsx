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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gecko-sand/80 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(20,41,35,0.08)] backdrop-blur-sm sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          {hasDates ? (
            <p className="text-sm font-semibold text-gecko-forestDeep">
              {formatShort(arrivalYmd)} → {formatShort(departureYmd)}
            </p>
          ) : (
            <p className="text-sm font-semibold text-gecko-forestDeep">Select your dates</p>
          )}
          <p className="text-xs text-gecko-forest/55">
            {nights ? `${nights} night${nights !== 1 ? 's' : ''} · ` : ''}
            {adults} {adults === 1 ? 'guest' : 'guests'}
          </p>
        </div>

        <button
          onClick={onEdit}
          className="rounded-xl border border-gecko-forest px-4 py-2 text-xs font-semibold text-gecko-forest transition active:bg-gecko-forest active:text-gecko-cream"
        >
          Edit search ↑
        </button>
      </div>
    </div>
  )
}
