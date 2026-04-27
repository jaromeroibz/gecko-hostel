import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelectedExtras } from '../context/SelectedExtrasContext'
import { getExtras, type Extra } from '../services/api'

const POPULAR_KEYWORDS = ['surf', 'tour']

function isPopularExtra(extra: Extra) {
  const searchableText = `${extra.name} ${extra.description ?? ''}`.toLowerCase()
  return POPULAR_KEYWORDS.some((keyword) => searchableText.includes(keyword))
}

export function ExtrasList() {
  const [extras, setExtras] = useState<Extra[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isSelected, selectedCount, selectedExtraIds, toggleExtra } = useSelectedExtras()

  useEffect(() => {
    let mounted = true

    const fetchExtras = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getExtras()
        if (mounted) {
          setExtras(data)
        }
      } catch {
        if (mounted) {
          setError('Could not load extras right now.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchExtras()

    return () => {
      mounted = false
    }
  }, [])

  if (isLoading) {
    return <p className="text-slate-500">Loading extras...</p>
  }

  if (error) {
    return <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
  }

  if (extras.length === 0) {
    return <p className="text-slate-500">No extras available.</p>
  }

  const selectedExtras = extras.filter((extra) => selectedExtraIds.includes(extra.id))
  const selectedTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0)

  return (
    <div className="space-y-6">
      <aside className="rounded-xl border border-teal-200 bg-teal-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-800">Your pre-booking selection</p>
            <p className="text-sm text-teal-700">
              {selectedCount > 0
                ? `${selectedCount} extra(s) selected · Estimated total $${selectedTotal.toFixed(2)}`
                : 'Select extras now to increase your reservation value and save time at checkout.'}
            </p>
          </div>
          <Link
            to="/booking"
            className="inline-flex justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Continue to booking
          </Link>
        </div>
      </aside>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {extras.map((extra) => {
          const selected = isSelected(extra.id)
          const popular = isPopularExtra(extra)

          return (
            <article
              key={extra.id}
              className={`rounded-xl border bg-white p-4 shadow-sm transition ${
                selected ? 'border-teal-400 ring-2 ring-teal-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">{extra.name}</h3>
                {popular && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-12 text-sm text-slate-600">
                {extra.description || 'No description available.'}
              </p>
              <p className="mt-4 text-base font-bold text-teal-700">${extra.price.toFixed(2)}</p>
              <button
                type="button"
                onClick={() => toggleExtra(extra.id)}
                className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-semibold text-white transition ${
                  selected ? 'bg-slate-700 hover:bg-slate-800' : 'bg-teal-700 hover:bg-teal-800'
                }`}
              >
                {selected ? 'Quitar' : 'Agregar'}
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
