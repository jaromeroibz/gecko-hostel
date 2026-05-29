import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'

import { BookingSearchBar } from '../components/booking/BookingSearchBar'
import { CheckoutReminderModal } from '../components/booking/CheckoutReminderModal'
import { AccommodationSchema, BreadcrumbSchema } from '../components/seo/SchemaMarkup'
import { SEOHead } from '../components/seo/SEOHead'
import { BOOKING_ROOMS } from '../data/bookingRooms'
import { PACKAGES } from '../data/packages'
import { useLodgifySearchFromRoute } from '../hooks/useLodgifySearchFromRoute'

const PLACEHOLDER_IMG =
  'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1200/v1779470181/trpavi8zpjdcrjisycz3.webp'

// ── Component ────────────────────────────────────────────────────────────────

export function BookingRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const search = useLodgifySearchFromRoute()
  const [searchParams] = useSearchParams()
  const packageId = searchParams.get('package')

  // ── All hooks must be declared before any early return ───────────────────
  const [iframeHeight, setIframeHeight]       = useState(420)
  const [imgIdx, setImgIdx]                   = useState(0)
  const [widgetLoaded, setWidgetLoaded]       = useState(false)
  const [isWidgetVisible, setIsWidgetVisible] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // ── Checkout reminder modal ────────────────────────────────────────────────
  const [reminderOpen, setReminderOpen]   = useState(false)
  const [checkoutUrl,  setCheckoutUrl]    = useState('')

  const room = BOOKING_ROOMS.find((r) => r.id === roomId)

  // Compute widgetSrc before effects so it can be a dependency.
  const isDormitory  = room?.type === 'Dormitory Room' ?? false
  const widgetAdults = isDormitory ? search.adults : 1
  const widgetSrc    = room
    ? `/booking-widget.html?rentalId=${room.rentalId}` +
      `&arrival=${search.arrivalYmd}` +
      `&departure=${search.departureYmd}` +
      `&adults=${widgetAdults}`
    : ''

  // Reset loaded flag whenever the iframe URL changes (dates / room change).
  useEffect(() => {
    setWidgetLoaded(false)
  }, [widgetSrc])

  // Listen for messages from the iframe.
  // ldg-widget-height → update iframe height (fires often, incl. on dialog open).
  // ldg-widget-ready  → widget is interactive; hide the spinner (fires exactly once per load).
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'ldg-widget-height' && typeof e.data.height === 'number') {
        setIframeHeight(e.data.height + 16)
      }
      if (e.data?.type === 'ldg-widget-ready') {
        setWidgetLoaded(true)
      }
      // Fired from booking-widget.html when the user clicks "Book now"
      if (e.data?.type === 'ldg-checkout-intercept' && typeof e.data.url === 'string') {
        setCheckoutUrl(e.data.url)
        setReminderOpen(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])
  // Hide sticky bar when the booking widget is scrolled into view.
  useEffect(() => {
    const el = widgetRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsWidgetVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  // ─────────────────────────────────────────────────────────────────────────

  const activePackage = packageId ? PACKAGES[packageId] : null

  function handleReminderConfirm() {
    setReminderOpen(false)
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
  }

  if (!room) return <Navigate to="/booking" replace />

  const images      = room.images.length > 0 ? room.images : [PLACEHOLDER_IMG]
  const hasMultiple = images.length > 1
  const backHref    =
    `/booking?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}` +
    (packageId ? `&package=${packageId}` : '')

  function prevImg() { setImgIdx((i) => (i - 1 + images.length) % images.length) }
  function nextImg() { setImgIdx((i) => (i + 1) % images.length) }

  function scrollToWidget() {
    widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /** Format YYYYMMDD → "16 May" */
  function fmtDate(ymd: string) {
    if (ymd.length !== 8) return ''
    return new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`)
      .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }
  const hasValidDates = search.arrivalYmd.length === 8 && search.departureYmd.length === 8
  const nights = hasValidDates
    ? Math.round(
        (new Date(`${search.departureYmd.slice(0, 4)}-${search.departureYmd.slice(4, 6)}-${search.departureYmd.slice(6, 8)}`).getTime() -
          new Date(`${search.arrivalYmd.slice(0, 4)}-${search.arrivalYmd.slice(4, 6)}-${search.arrivalYmd.slice(6, 8)}`).getTime()) /
          86400000,
      )
    : null

  const seoImage = images[0]
  const seoTitle = `${room.name} | Surf Hostel Room in Santa Teresa, Costa Rica`
  const seoDescription = `${room.description} Free WiFi, AC, 3 min to Carmen Beach. Book at Gecko Surf House.`

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        path={`/booking/${room.id}`}
        image={seoImage}
        noindex={!!searchParams.get('arrival')}
      />
      <AccommodationSchema
        name={room.name}
        description={room.description}
        type={room.type}
        image={seoImage}
        capacity={room.capacity}
        size={room.size}
        path={`/booking/${room.id}`}
      />
      <BreadcrumbSchema
        crumbs={[
          { name: 'Book Your Stay', path: '/booking' },
          { name: room.name, path: `/booking/${room.id}` },
        ]}
      />
    <div className="space-y-8 pb-28 pt-4 sm:pb-8 sm:pt-6">

      {/* ── Back link ───────────────────────────────────────────────── */}
      <Link
        to={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gecko-forest/70 hover:text-gecko-forest"
        style={{ animation: 'hero-enter 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
      >
        ← All rooms
      </Link>

      {/* ── Hero photo carousel ─────────────────────────────────────── */}
      <div className="group relative aspect-[21/9] overflow-hidden rounded-2xl" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both' }}>

        {/* Crossfading images */}
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${room.name} — photo ${i + 1} of ${images.length}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === imgIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            fetchPriority={i === 0 ? 'high' : 'auto'}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gecko-forestDeep/60 via-transparent to-transparent"
          aria-hidden
        />

        {/* Prev / Next arrows — fade in on group-hover */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImg}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-xl text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/55 group-hover:opacity-100 focus-visible:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={nextImg}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-xl text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/55 group-hover:opacity-100 focus-visible:opacity-100"
            >
              ›
            </button>
          </>
        )}

        {/* Bottom bar: badges (left) + dot indicators (right) */}
        <div className="absolute bottom-4 left-5 right-5 z-10 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-gecko-cream/95 px-3 py-1.5 text-xs font-semibold text-gecko-forest shadow-sm backdrop-blur-sm">
              {room.type}
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {room.size} m² · {room.bathroom === 'private' ? 'Private bathroom' : 'Shared bathroom'}
            </span>
          </div>

          {hasMultiple && (
            <div className="flex shrink-0 items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === imgIdx ? 'h-1.5 w-4 bg-white' : 'h-1.5 w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Room info + Booking Box ──────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.38s both' }}>

        {/* Left: description + amenities */}
        <div className="space-y-5">
          <div>
            <h1 className="font-display text-3xl font-medium tracking-tight text-gecko-forestDeep sm:text-4xl">
              {room.name}
            </h1>
            <p className="mt-1 text-sm text-gecko-sage">{room.beds}</p>
            <p className="mt-0.5 text-sm text-gecko-sage">
              Up to {room.capacity} guest{room.capacity !== 1 ? 's' : ''}
            </p>
          </div>
          <p className="text-base leading-relaxed text-gecko-forest/75">{room.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Amenities">
            {room.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-gecko-mist bg-gecko-cream/80 px-3 py-1 text-xs font-medium text-gecko-forest/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: date search + Booking Box */}
        <div className="space-y-5">

          {/* Our date picker — updates URL params */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/55">
              Your dates
            </p>
            <BookingSearchBar
              key={`${search.arrivalYmd}-${search.departureYmd}-${search.adults}`}
              arrivalYmd={search.arrivalYmd}
              departureYmd={search.departureYmd}
              adults={search.adults}
              showGuests={isDormitory}
              basePath={`/booking/${room.id}`}
            />
          </div>

          {/* Lodgify Booking Box ─────────────────────────────────────── */}
          <div ref={widgetRef} className="rounded-2xl border border-gecko-sand bg-gecko-cream p-5 shadow-sm">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/55">
              Book this room
            </p>

            {/* Spinner — shown while iframe loads; height reserves card space */}
            {!widgetLoaded && (
              <div className="flex h-64 items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gecko-forest/20 border-t-gecko-forest" />
              </div>
            )}

            {/* iframe — always in DOM so it loads in the background.
                Height is 0 while loading (invisible, no space), then
                expands to the reported height and fades in. */}
            <iframe
              key={widgetSrc}
              src={widgetSrc}
              title="Book this room"
              style={{
                width: '100%',
                height: widgetLoaded ? iframeHeight : 0,
                border: 'none',
                display: 'block',
                opacity: widgetLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>

      {/* ── Mobile sticky "Book this room" bar ──────────────────────── */}
      {/* Hidden on sm+ (sidebar widget is visible). Hidden when the widget
          is already scrolled into view so it doesn't cover the widget. */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ${
          isWidgetVisible ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="border-t border-gecko-sand bg-white/95 px-4 pb-6 pt-3 shadow-[0_-4px_24px_-6px_rgba(20,41,35,0.12)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-gecko-sage">{room.name}</p>
              {hasValidDates ? (
                <p className="truncate text-sm font-semibold text-gecko-forestDeep">
                  {fmtDate(search.arrivalYmd)} → {fmtDate(search.departureYmd)}
                  {nights && nights > 0 ? (
                    <span className="ml-1.5 text-xs font-normal text-gecko-sage">
                      · {nights}n
                    </span>
                  ) : null}
                </p>
              ) : (
                <p className="truncate text-sm font-semibold text-gecko-forestDeep">
                  Select dates to book
                </p>
              )}
            </div>
            <button
              onClick={scrollToWidget}
              className="shrink-0 rounded-xl bg-gecko-forest px-5 py-2.5 text-sm font-semibold text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep active:scale-95"
            >
              Book now →
            </button>
          </div>
        </div>
      </div>
      {/* ── Checkout reminder modal ───────────────────────────────────── */}
      <CheckoutReminderModal
        isOpen={reminderOpen}
        onClose={() => setReminderOpen(false)}
        onConfirm={handleReminderConfirm}
        roomName={room.name}
        arrivalYmd={search.arrivalYmd}
        departureYmd={search.departureYmd}
        adults={search.adults}
        hasPackage={!!activePackage}
        packageName={activePackage?.name}
      />
    </>
  )
}
