import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useInView } from '../hooks/useInView'

import { BookingSearchBar } from '../components/booking/BookingSearchBar'
import { CheckoutReminderModal } from '../components/booking/CheckoutReminderModal'
import { LodgifyWidget } from '../components/booking/LodgifyWidget'
import { RoomCard } from '../components/booking/RoomCard'
import { StickyDateBar } from '../components/booking/StickyDateBar'
import { SEOHead } from '../components/seo/SEOHead'
import { BreadcrumbSchema } from '../components/seo/SchemaMarkup'
import { BOOKING_ROOMS } from '../data/bookingRooms'
import { PACKAGES } from '../data/packages'
import { useLodgifySearchFromRoute } from '../hooks/useLodgifySearchFromRoute'

const HERO_BG =
  'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1200/v1779689915/ktet7vjrefaeo0lqdwg9.webp'

const TRUST_KEYS = [
  { icon: '★', key: 'booking.trust.fiveStars' },
  { icon: '✓', key: 'booking.trust.freeCancellation' },
  { icon: '⌾', key: 'booking.trust.minFromBreak' },
]

export function Booking() {
  const { t } = useTranslation()
  const search = useLodgifySearchFromRoute()
  const [searchParams] = useSearchParams()
  const searchRef  = useRef<HTMLDivElement>(null)
  const roomsRef   = useRef<HTMLUListElement>(null)
  const widgetRef  = useRef<HTMLDivElement>(null)

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)

  // ── Checkout reminder modal (for the inline package widget) ───────────────
  const [reminderOpen, setReminderOpen] = useState(false)
  const [checkoutUrl,  setCheckoutUrl]  = useState('')

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'ldg-checkout-intercept' && typeof e.data.url === 'string') {
        setCheckoutUrl(e.data.url)
        setReminderOpen(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const [trustRef, trustInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef,  gridInView]  = useInView<HTMLDivElement>({ threshold: 0.06 })

  // Tracks the guest count in real-time (updates on every +/− tap, not just
  // on search-submit), so the Lodgify widget always prices for the right
  // number of guests without requiring the user to hit "Select your room →".
  const [liveAdults, setLiveAdults] = useState(search.adults)
  useEffect(() => { setLiveAdults(search.adults) }, [search.adults])

  // ── Package filter ─────────────────────────────────────────────────────────
  const packageId     = searchParams.get('package') ?? ''
  const activePackage = packageId ? PACKAGES[packageId] : null

  const visibleRooms = activePackage
    ? BOOKING_ROOMS.filter((r) => activePackage.roomIds.includes(r.id))
    : BOOKING_ROOMS

  // Preserve ?package= through date searches and into individual room pages
  const extraQuery   = activePackage ? { package: packageId } : undefined
  const searchQuery  =
    `?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}` +
    (activePackage ? `&package=${packageId}` : '')

  function scrollToSearch() {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function handleSelectRoom(roomId: string) {
    setSelectedRoomId(roomId)
    setTimeout(() => {
      widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  // Dynamic SEO: package pages get their own optimized title/description
  const seoTitle = activePackage
    ? `${activePackage.name} — Surf Package in Santa Teresa, Costa Rica`
    : 'Book Your Stay | Surf Hostel Rooms in Santa Teresa, Costa Rica'
  const seoDescription = activePackage
    ? `${activePackage.duration} surf package at Gecko Surf House, Santa Teresa. ${activePackage.accommodation} included. From $${activePackage.price} ${activePackage.priceUnit}. Book now.`
    : 'Check availability and book your room at Gecko Surf House, Santa Teresa. Private rooms, shared dorms, and surf packages near Playa Carmen, Costa Rica. Live pricing.'
  const seoPath = activePackage ? `/booking?package=${packageId}` : '/booking'

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
        noindex={!activePackage && (!!searchParams.get('arrival'))}
      />
      <BreadcrumbSchema
        crumbs={[
          { name: 'Book Your Stay', path: '/booking' },
          ...(activePackage ? [{ name: activePackage.name, path: `/booking?package=${packageId}` }] : []),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bk-hero relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 -mt-10 sm:-mt-12">
        <div
          className="bk-hero-bg"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          aria-hidden
        />
        <div className="bk-hero-overlay" aria-hidden />
        <div className="bk-hero-inner">
          <p className="bk-eyebrow font-label" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}>{t('booking.liveAvailability')}</p>
          <h1 className="bk-heading font-display" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}>
            {activePackage ? (
              <>{t('booking.bookYourPackage1')}<br />{t('booking.bookYourPackage2')}</>
            ) : (
              <>{t('booking.findYourRoom1')}<br />{t('booking.findYourRoom2')}</>
            )}
          </h1>
          <p className="bk-subtext font-label" style={{ animation: 'hero-enter 0.8s cubic-bezier(0.22,1,0.36,1) 0.48s both' }}>
            {t('booking.realtimePricing')}
          </p>
        </div>
      </div>

      {/* ── Search bar — overlaps hero bottom ────────────────────────── */}
      <div className="bk-search-wrap" ref={searchRef}>
        <BookingSearchBar
          key={`${search.arrivalYmd}-${search.departureYmd}-${search.adults}-${packageId}`}
          arrivalYmd={search.arrivalYmd}
          departureYmd={search.departureYmd}
          adults={search.adults}
          extraQuery={extraQuery}
          minNights={activePackage?.nights}
          maxNights={activePackage?.nights}
          submitLabel={activePackage ? t('booking.selectYourRoom') : t('booking.seeRooms')}
          onAfterSearch={() => roomsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          onAdultsChange={setLiveAdults}
        />
      </div>

      {/* ── Package context banner (shown only when ?package= is active) ─ */}
      {activePackage && (
        <div className="bk-pkg-banner">
          <div className="bk-pkg-banner-left">
            <p className="bk-pkg-banner-eyebrow font-label">{t('booking.packageSelected')}</p>
            <p className="bk-pkg-banner-name font-display">{activePackage.name}</p>
            <div className="bk-pkg-banner-meta">
              <span className="bk-pkg-pill font-label">{activePackage.duration}</span>
              <span className="bk-pkg-pill font-label">{activePackage.accommodation}</span>
              <span className="bk-pkg-pill bk-pkg-pill--price font-label">
                From ${activePackage.price.toLocaleString()} {activePackage.priceUnit}
              </span>
              <span className="bk-pkg-pill bk-pkg-pill--nights font-label">
                ⏱ {activePackage.nights} {t('booking.nightMinimum')}
              </span>
            </div>
            {activePackage.note && (
              <p className="bk-pkg-banner-note font-label">{activePackage.note}</p>
            )}
            <p className="bk-pkg-extra-nights font-label">
              {t('booking.arriveEarlyQ')}{' '}
              <Link
                to={`/booking?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}`}
                className="bk-pkg-extra-nights-link"
              >
                {t('booking.browseRoomOnly')}
              </Link>
            </p>
          </div>
          <Link
            to={`/booking?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}`}
            className="bk-pkg-clear font-label"
          >
            {t('booking.browseAllRooms')}
          </Link>
        </div>
      )}

      {/* ── Trust micro-strip (shown only without a package filter) ──── */}
      {!activePackage && (
        <div ref={trustRef} className={`bk-trust-strip${trustInView ? ' in-view' : ''}`}>
          {TRUST_KEYS.map(({ icon, key }, i) => (
            <span key={key} className={`bk-trust-item font-label reveal stagger-${i + 1}`}>
              <span className="bk-trust-icon">{icon}</span>
              {t(key)}
              {i < TRUST_KEYS.length - 1 && (
                <span className="bk-trust-sep" aria-hidden>·</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* ── Room cards ───────────────────────────────────────────────── */}
      <div ref={gridRef} className={gridInView ? 'in-view' : ''}>
        <ul
          ref={roomsRef}
          className={`bk-grid${visibleRooms.length === 1 ? ' bk-grid--single' : ''}`}
          role="list"
        >
          {visibleRooms.map((room, i) => (
            <li key={room.id} className={`reveal stagger-${Math.min(i + 1, 5)}`}>
              <RoomCard
                room={room}
                searchQuery={searchQuery}
                onSelect={activePackage ? () => handleSelectRoom(room.id) : undefined}
                isSelected={selectedRoomId === room.id}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* ── Inline Lodgify widget (package context only) ─────────────── */}
      {activePackage && selectedRoomId && (() => {
        const selectedRoom = BOOKING_ROOMS.find(r => r.id === selectedRoomId)
        if (!selectedRoom) return null
        return (
          <div ref={widgetRef} className="bk-widget-section">
            <div className="bk-widget-header">
              <div>
                <p className="bk-widget-eyebrow font-label">{t('booking.availabilityAndPricing')}</p>
                <p className="bk-widget-room-name font-display">{selectedRoom.name}</p>
              </div>
              {visibleRooms.length > 1 && (
                <button
                  type="button"
                  onClick={() => setSelectedRoomId(null)}
                  className="bk-widget-change font-label"
                >
                  {t('booking.chooseDifferentRoom')}
                </button>
              )}
            </div>
            <LodgifyWidget
              room={selectedRoom}
              arrivalYmd={search.arrivalYmd}
              departureYmd={search.departureYmd}
              adults={liveAdults}
            />
          </div>
        )
      })()}

      {/* ── Footer note ──────────────────────────────────────────────── */}
      <p className="bk-footnote font-label">
        {activePackage ? t('booking.footnotePackage') : t('booking.footnoteLive')}
      </p>

      {/* ── Checkout reminder modal (package inline widget) ──────────── */}
      <CheckoutReminderModal
        isOpen={reminderOpen}
        onClose={() => setReminderOpen(false)}
        onConfirm={() => {
          setReminderOpen(false)
          window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
        }}
        roomName={BOOKING_ROOMS.find(r => r.id === selectedRoomId)?.name ?? ''}
        arrivalYmd={search.arrivalYmd}
        departureYmd={search.departureYmd}
        adults={search.adults}
        hasPackage={!!activePackage}
        packageName={activePackage?.name}
      />

      {/* ── Sticky mobile bar ────────────────────────────────────────── */}
      <StickyDateBar
        arrivalYmd={search.arrivalYmd}
        departureYmd={search.departureYmd}
        adults={search.adults}
        onEdit={scrollToSearch}
      />

      <style>{`

        /* ━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-hero {
          height: 52vh;
          min-height: 360px;
          max-height: 560px;
          overflow: hidden;
        }

        .bk-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 30%;
          transform: scale(1.04);
        }

        .bk-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(2, 26, 17, 0.92) 0%,
            rgba(6, 78, 59, 0.78) 55%,
            rgba(6, 78, 59, 0.88) 100%
          );
        }

        .bk-hero-inner {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(1.5rem, 6vw, 5rem) 3rem;
          max-width: 1152px;
          margin: 0 auto;
        }

        .bk-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 0.8rem;
        }

        .bk-heading {
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: #F9FDF9;
          margin: 0 0 0.65rem;
        }

        .bk-subtext {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.38);
          margin: 0;
        }

        /* ━━ Search bar wrapper ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-search-wrap {
          position: relative;
          z-index: 10;
          margin-top: -1.75rem;
        }

        /* ━━ Package context banner ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-pkg-banner {
          margin-top: 1.25rem;
          background: #ECFDF5;
          border: 1px solid rgba(52, 211, 153, 0.25);
          border-left: 3px solid #34D399;
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .bk-pkg-banner-left {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
        }

        .bk-pkg-banner-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .bk-pkg-banner-name {
          font-size: 1.2rem;
          color: #064E3B;
          margin: 0;
          line-height: 1.2;
        }

        .bk-pkg-banner-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .bk-pkg-pill {
          display: inline-flex;
          align-items: center;
          background: rgba(6, 78, 59, 0.07);
          border: 1px solid rgba(6, 78, 59, 0.12);
          color: rgba(6, 78, 59, 0.65);
          border-radius: 100px;
          padding: 0.25rem 0.75rem;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .bk-pkg-pill--price {
          background: rgba(249, 115, 22, 0.08);
          border-color: rgba(249, 115, 22, 0.18);
          color: #F97316;
        }

        .bk-pkg-pill--nights {
          background: rgba(6, 78, 59, 0.06);
          border-color: rgba(6, 78, 59, 0.15);
          color: rgba(6, 78, 59, 0.6);
          font-weight: 600;
        }

        .bk-pkg-banner-note {
          font-size: 0.75rem;
          color: rgba(6, 78, 59, 0.55);
          margin: 0;
          letter-spacing: 0.01em;
        }

        .bk-pkg-extra-nights {
          font-size: 0.72rem;
          color: rgba(6, 78, 59, 0.42);
          margin: 0;
          letter-spacing: 0.01em;
        }

        .bk-pkg-extra-nights-link {
          color: rgba(6, 78, 59, 0.55);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .bk-pkg-extra-nights-link:hover {
          color: #064E3B;
        }

        .bk-pkg-clear {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.45);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          align-self: center;
          transition: color 0.2s;
        }

        .bk-pkg-clear:hover {
          color: #064E3B;
        }

        /* ━━ Trust strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-trust-strip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0 0.1rem;
          margin-top: 1.25rem;
        }

        .bk-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.5);
        }

        .bk-trust-icon {
          color: #34D399;
          font-size: 0.7rem;
        }

        .bk-trust-sep {
          margin: 0 0.75rem;
          color: rgba(6, 78, 59, 0.2);
        }

        /* ━━ Room grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-grid {
          list-style: none;
          padding: 0;
          margin: 2rem 0 0;
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(2, 1fr);
        }

        /* Single room — centered with a comfortable max-width */
        .bk-grid--single {
          grid-template-columns: 1fr;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ━━ Inline widget section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-widget-section {
          margin-top: 2rem;
          scroll-margin-top: 6rem;
        }

        .bk-widget-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .bk-widget-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 0.3rem;
        }

        .bk-widget-room-name {
          font-size: 1.25rem;
          color: #064E3B;
          margin: 0;
          line-height: 1.2;
        }

        .bk-widget-change {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.45);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          align-self: center;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .bk-widget-change:hover {
          color: #064E3B;
        }

        /* ━━ Footnote ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .bk-footnote {
          margin: 1.5rem 0 2.5rem;
          font-size: 0.67rem;
          letter-spacing: 0.1em;
          color: rgba(6, 78, 59, 0.3);
          text-align: center;
        }

        /* ━━ Mobile ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .bk-hero { height: 44vh; }
          .bk-hero-inner { padding-bottom: 2.5rem; }
          .bk-search-wrap { margin-top: -1.25rem; }

          .bk-pkg-banner {
            flex-direction: column;
            gap: 1rem;
          }

          .bk-pkg-clear { align-self: flex-start; }

          .bk-grid { grid-template-columns: 1fr; }

          .bk-trust-sep { display: none; }
          .bk-trust-strip { gap: 0.6rem 0; }
          .bk-trust-item { width: 100%; }

          .bk-footnote { margin-bottom: 6rem; }
        }
      `}</style>
    </>
  )
}
