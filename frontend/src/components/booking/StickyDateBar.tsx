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

export function StickyDateBar({ arrivalYmd, departureYmd, adults, onEdit }: Props) {
  const hasDates = arrivalYmd.length === 8 && departureYmd.length === 8

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
