import { useSelectedExtras } from '../context/SelectedExtrasContext'

export function BookingPage() {
  const { clearExtras, selectedCount, selectedExtraIds } = useSelectedExtras()

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Booking</h1>
      <p className="text-slate-600">
        This page will host the Lodgify embed and selected extras flow.
      </p>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-700">Selected extras summary</p>
        <p className="mt-1 text-sm text-slate-500">Selected extras count: {selectedCount}</p>
        <p className="mt-1 text-sm text-slate-500">Selected IDs: {selectedExtraIds.join(', ') || 'none'}</p>
      </div>
      <button
        type="button"
        onClick={clearExtras}
        className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Limpiar extras
      </button>
    </section>
  )
}
