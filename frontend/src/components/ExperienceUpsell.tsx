import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelectedExtras } from '../context/SelectedExtrasContext'
import { getExtras, type Extra } from '../services/api'

type ExperienceCardProps = {
  extra: Extra
  imageUrl: string
  isPopular: boolean
  isRecommended: boolean
  selected: boolean
  onToggle: () => void
}

const POPULAR_KEYWORDS = ['surf', 'tour']
const RECOMMENDED_KEYWORDS = ['espa', 'spanish']

const imageLibrary: Record<string, string> = {
  surf:
    'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
  tour:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  spanish:
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  default:
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
}

function getFallbackImage(extra: Extra): string {
  const text = `${extra.name} ${extra.description ?? ''}`.toLowerCase()
  if (text.includes('surf')) return imageLibrary.surf
  if (text.includes('tour')) return imageLibrary.tour
  if (text.includes('espa') || text.includes('spanish')) return imageLibrary.spanish
  return imageLibrary.default
}

function getCardImage(extra: Extra): string {
  const fromApi = extra.image_url?.trim()
  if (fromApi) return fromApi
  return getFallbackImage(extra)
}

function isPopularExtra(extra: Extra): boolean {
  const searchableText = `${extra.name} ${extra.description ?? ''}`.toLowerCase()
  return POPULAR_KEYWORDS.some((keyword) => searchableText.includes(keyword))
}

function isRecommendedExtra(extra: Extra): boolean {
  const searchableText = `${extra.name} ${extra.description ?? ''}`.toLowerCase()
  return RECOMMENDED_KEYWORDS.some((keyword) => searchableText.includes(keyword))
}

function getBenefitDescription(extra: Extra): string {
  if (extra.description?.trim()) return extra.description
  return 'Make your trip more memorable from day one with a guided local experience.'
}

function ExperienceCard({
  extra,
  imageUrl,
  isPopular,
  isRecommended,
  selected,
  onToggle,
}: ExperienceCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.35rem] border bg-white shadow-[0_1px_0_rgba(30,61,50,0.04),0_16px_40px_-28px_rgba(20,41,35,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? 'border-gecko-sage ring-2 ring-gecko-sage/40 ring-offset-2 ring-offset-gecko-cream'
          : 'border-gecko-sand hover:border-gecko-sage/50'
      }`}
    >
      <div className="relative aspect-[5/3] overflow-hidden sm:aspect-[16/10]">
        <img
          src={imageUrl}
          alt={extra.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gecko-forestDeep/40 to-transparent opacity-70"
          aria-hidden
        />
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {isPopular && (
            <span className="rounded-full border border-gecko-clay/25 bg-gecko-clay/10 px-3 py-1 text-xs font-semibold text-gecko-clay">
              Guest favorite
            </span>
          )}
          {isRecommended && (
            <span className="rounded-full border border-gecko-sage/40 bg-gecko-mist/80 px-3 py-1 text-xs font-semibold text-gecko-forest">
              Recommended
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-xl font-medium text-gecko-forest">{extra.name}</h3>
          <p className="text-sm leading-relaxed text-gecko-forest/70">{getBenefitDescription(extra)}</p>
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <p className="text-lg font-bold text-gecko-forest">
            ${extra.price.toFixed(2)}
            <span className="ml-1 text-xs font-medium text-gecko-forest/50">per person</span>
          </p>

          <button
            type="button"
            onClick={onToggle}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
              selected
                ? 'bg-gecko-forest text-gecko-cream hover:bg-gecko-forestDeep'
                : 'bg-gecko-forest text-gecko-cream hover:scale-[1.02] hover:bg-gecko-forestDeep'
            }`}
          >
            {selected ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}

export function ExperienceUpsell() {
  const [extras, setExtras] = useState<Extra[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [preselectedPopular, setPreselectedPopular] = useState(false)
  const { addExtra, removeExtra, isSelected, selectedExtraIds } = useSelectedExtras()

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
          setError('We could not load experiences right now. Please try again in a few seconds.')
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

  useEffect(() => {
    if (preselectedPopular || extras.length === 0 || selectedExtraIds.length > 0) return

    const popularDefault = extras.find((extra) => isPopularExtra(extra))
    if (popularDefault) {
      addExtra(popularDefault.id)
      setPreselectedPopular(true)
    }
  }, [addExtra, extras, preselectedPopular, selectedExtraIds.length])

  const selectedExtras = useMemo(
    () => extras.filter((extra) => selectedExtraIds.includes(extra.id)),
    [extras, selectedExtraIds],
  )

  const selectedTotal = useMemo(
    () => selectedExtras.reduce((sum, extra) => sum + extra.price, 0),
    [selectedExtras],
  )

  if (isLoading) {
    return <p className="text-gecko-forest/50">Loading experiences…</p>
  }

  if (error) {
    return <p className="rounded-xl border border-red-200/80 bg-red-50/90 p-4 text-sm text-red-800">{error}</p>
  }

  if (extras.length === 0) {
    return <p className="text-gecko-forest/50">No experiences are available right now.</p>
  }

  return (
    <section className="space-y-8 border-t border-gecko-sand/70 pt-16 sm:space-y-10 sm:pt-20">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-clay">
          Experiences
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-gecko-forest sm:text-4xl">
          Elevate your stay
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-gecko-forest/70 sm:text-base">
          Add surf lessons, tours, and activities before you book—limited spots for travelers each
          week.
        </p>
      </header>

      <div className="rounded-[1.25rem] border border-gecko-clay/20 bg-gradient-to-r from-gecko-clay/8 to-gecko-mist/40 px-5 py-3.5 text-sm font-medium text-gecko-forest">
        Most booked by Gecko guests this season
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
        {extras.map((extra) => {
          const selected = isSelected(extra.id)
          const popular = isPopularExtra(extra)
          const recommended = isRecommendedExtra(extra)

          const toggleSelection = () => {
            if (selected) {
              removeExtra(extra.id)
              return
            }
            addExtra(extra.id)
          }

          return (
            <ExperienceCard
              key={extra.id}
              extra={extra}
              imageUrl={getCardImage(extra)}
              isPopular={popular}
              isRecommended={recommended}
              selected={selected}
              onToggle={toggleSelection}
            />
          )
        })}
      </div>

      <aside className="rounded-[1.35rem] border border-gecko-sand bg-white/95 p-6 shadow-[0_1px_0_rgba(30,61,50,0.05),0_22px_50px_-30px_rgba(20,41,35,0.14)] sm:p-7">
        <h3 className="font-display text-xl font-medium text-gecko-forest">Your experience</h3>

        <div className="mt-4 space-y-2">
          {selectedExtras.length === 0 ? (
            <p className="text-sm text-gecko-forest/55">You have not added any experiences yet.</p>
          ) : (
            selectedExtras.map((extra) => (
              <p key={extra.id} className="flex items-center justify-between text-sm text-gecko-forest/85">
                <span>{extra.name}</span>
                <span className="font-semibold tabular-nums">${extra.price.toFixed(2)}</span>
              </p>
            ))
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gecko-sand pt-5">
          <span className="text-sm text-gecko-forest/65">Estimated total</span>
          <span className="text-xl font-bold tabular-nums text-gecko-forest">${selectedTotal.toFixed(2)}</span>
        </div>

        <Link
          to="/booking"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gecko-forest px-4 py-3.5 text-sm font-semibold text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep"
        >
          Continue to booking
        </Link>

        <p className="mt-3 text-xs leading-relaxed text-gecko-forest/50">
          You can confirm these add-ons in the next step before you pay on Lodgify.
        </p>
      </aside>
    </section>
  )
}
