import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useLodgifySearchFromRoute } from '../hooks/useLodgifySearchFromRoute'
import { LODGIFY_PROPERTIES_BASE_URL } from '../lib/lodgifyConstants'
import { buildLodgifyPropertiesSearchUrl } from '../utils/lodgifySearchUrl'

const ROOM_NAME_KEYWORDS = ['gecko', 'la lora', 'paraiso', 'rocamar']

export function Booking() {
  const search = useLodgifySearchFromRoute()
  const lodgifyUrl = useMemo(
    () =>
      buildLodgifyPropertiesSearchUrl({
        baseUrl: LODGIFY_PROPERTIES_BASE_URL,
        arrivalYmd: search.arrivalYmd,
        departureYmd: search.departureYmd,
        adults: search.adults,
      }),
    [search.adults, search.arrivalYmd, search.departureYmd],
  )

  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const delayedAttemptRef = useRef<number | null>(null)

  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [isCrossOriginBlocked, setIsCrossOriginBlocked] = useState(false)

  const clearDomWatchers = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    if (delayedAttemptRef.current) {
      window.clearTimeout(delayedAttemptRef.current)
      delayedAttemptRef.current = null
    }
  }, [])

  const filterPropertyCards = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) return

      // Try a few likely Lodgify selectors and fallback to broad card-like blocks.
      const cardSelector = [
        '[data-property-id]',
        '.property-card',
        '.property-list-item',
        '.search-result',
        '.room-card',
        'article',
      ].join(', ')
      const cards = Array.from(iframeDoc.querySelectorAll<HTMLElement>(cardSelector))
      if (cards.length === 0) return

      const cardsWithTitle = cards
        .map((card) => {
          const titleElement =
            card.querySelector<HTMLElement>('h1, h2, h3, h4, [data-title], .title, .name') || card
          const title = (titleElement.textContent ?? '').trim().toLowerCase()
          return { card, title }
        })
        .filter((entry) => entry.title.length > 0)

      if (cardsWithTitle.length === 0) return

      const keepCount = cardsWithTitle.filter((entry) =>
        ROOM_NAME_KEYWORDS.some((keyword) => entry.title.includes(keyword)),
      ).length

      // Guardrail: if no explicit Gecko match found, keep everything visible.
      if (keepCount === 0) return

      cardsWithTitle.forEach(({ card, title }) => {
        const shouldKeep = ROOM_NAME_KEYWORDS.some((keyword) => title.includes(keyword))
        if (!shouldKeep) card.style.display = 'none'
      })
    } catch (error) {
      // Cross-origin iframes throw on document access. Fallback: keep all results visible.
      setIsCrossOriginBlocked(true)
      clearDomWatchers()
      console.warn(
        '[Booking] Lodgify iframe filtering skipped: cross-origin access is blocked.',
        error,
      )
    }
  }, [clearDomWatchers])

  useEffect(() => {
    if (!isIframeLoaded) return

    const iframe = iframeRef.current
    if (!iframe) return

    clearDomWatchers()
    filterPropertyCards()

    delayedAttemptRef.current = window.setTimeout(() => {
      filterPropertyCards()
    }, 1200)

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc?.body) return

      observerRef.current = new MutationObserver(() => {
        filterPropertyCards()
      })
      observerRef.current.observe(iframeDoc.body, {
        childList: true,
        subtree: true,
      })
    } catch {
      // filterPropertyCards already handles warning/fallback.
    }

    return () => {
      clearDomWatchers()
    }
  }, [clearDomWatchers, filterPropertyCards, isIframeLoaded])

  useEffect(() => {
    setIsIframeLoaded(false)
    setIsCrossOriginBlocked(false)
    clearDomWatchers()
  }, [clearDomWatchers, lodgifyUrl])

  useEffect(() => {
    return () => {
      clearDomWatchers()
    }
  }, [clearDomWatchers])

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Booking</h1>
        <p className="text-sm text-slate-600 sm:text-base">
          Showing available rooms at Gecko Hostel
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">Search being sent to Lodgify</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <span>
                Arrival <strong className="text-slate-900">{search.arrivalYmd}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Departure <strong className="text-slate-900">{search.departureYmd}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Adults <strong className="text-slate-900">{search.adults}</strong>
              </span>
            </div>
          </div>
          <a
            href={lodgifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Open same search in new tab
          </a>
        </div>
        <div className="mt-3">
          <Link
            to="/"
            className="text-xs font-medium text-teal-700 underline-offset-2 hover:underline"
          >
            Change dates and guests
          </Link>
        </div>
      </div>

      {isCrossOriginBlocked && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Unable to filter rooms inside Lodgify due to browser cross-origin restrictions. Showing all
          results.
        </p>
      )}

      <div className="relative min-h-[1000px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
            <p className="text-sm font-medium text-slate-700">Loading booking results...</p>
          </div>
        )}

        <iframe
          key={lodgifyUrl}
          ref={iframeRef}
          id="lodgify-frame"
          title="Lodgify booking results"
          src={lodgifyUrl}
          width="100%"
          height="1000px"
          style={{ border: 'none' }}
          onLoad={() => {
            setIsIframeLoaded(true)
            setIsCrossOriginBlocked(false)
          }}
        />
      </div>
    </section>
  )
}
