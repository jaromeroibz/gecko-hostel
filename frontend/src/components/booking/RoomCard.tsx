import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { BookingRoom } from '../../data/bookingRooms'

const GECKO_DORM_PLACEHOLDER =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/f_auto,q_auto,w_1200/v1779470181/trpavi8zpjdcrjisycz3.webp'

type Props = {
  room: BookingRoom
  /** Full query string to preserve dates when navigating to the room page */
  searchQuery: string
  /**
   * Package context: called instead of navigating when the user wants to
   * check availability. When provided the CTA label changes to
   * "Check availability →" and no page navigation occurs.
   */
  onSelect?: () => void
  /** Highlights the card with a mint ring when it's the active selection */
  isSelected?: boolean
  /**
   * When provided, intercepts the default "Book this room" Link and calls
   * this handler instead (used to open the checkout reminder modal).
   */
  onBookNow?: () => void
}

export function RoomCard({ room, searchQuery, onSelect, isSelected, onBookNow }: Props) {
  const [imgIdx, setImgIdx] = useState(0)
  const { t } = useTranslation()

  const images = room.images.length > 0 ? room.images : [GECKO_DORM_PLACEHOLDER]
  const hasMultiple = images.length > 1
  const bookHref = `/booking/${room.id}${searchQuery}`

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    setImgIdx((i) => (i - 1 + images.length) % images.length)
  }
  function next(e: React.MouseEvent) {
    e.preventDefault()
    setImgIdx((i) => (i + 1) % images.length)
  }

  return (
    <>
      <article className={`rc-card group${isSelected ? ' rc-card--selected' : ''}`}>

        {/* ── Photo carousel ──────────────────────────────────────────── */}
        <div className="relative aspect-[16/10] overflow-hidden">

          {/* Inner wrapper — only photos scale on hover, not the UI */}
          <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.04]">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${room.name} — photo ${i + 1} of ${images.length}`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  i === imgIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="rc-photo-gradient absolute inset-0" aria-hidden />

          {/* Prev / Next arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-lg text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/55 group-hover:opacity-100 focus-visible:opacity-100"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-lg text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/55 group-hover:opacity-100 focus-visible:opacity-100"
              >
                ›
              </button>
            </>
          )}

          {/* Bottom bar: badges (left) + dots (right) */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex flex-wrap items-end justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="rc-badge-type font-label">{t(`bookingRooms.${room.id}.type`)}</span>
              <span className="rc-badge-meta font-label">
                {room.size} m² · {room.bathroom === 'private' ? t('booking.privateBath') : t('booking.sharedBath')}
              </span>
            </div>

            {hasMultiple && (
              <div className="flex shrink-0 items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); setImgIdx(i) }}
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

        {/* ── Info ────────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h2 className="rc-name font-display">{room.name}</h2>
          <p className="rc-meta mt-1">{t(`bookingRooms.${room.id}.beds`)}</p>
          <p className="rc-meta mt-0.5">
            {t('booking.upTo')} {room.capacity} {room.capacity !== 1 ? t('booking.guestsPlural') : t('booking.guest')}
          </p>
          <p className="rc-desc mt-3 flex-1">{t(`bookingRooms.${room.id}.description`)}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Amenities">
            {(t(`bookingRooms.${room.id}.highlights`, { returnObjects: true }) as string[]).map((item) => (
              <li key={item} className="rc-highlight font-label">{item}</li>
            ))}
          </ul>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="rc-cta-wrap px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
          {onSelect ? (
            <button
              type="button"
              onClick={onSelect}
              className={`rc-cta-btn font-label${isSelected ? ' rc-cta-btn--active' : ''}`}
            >
              {isSelected ? t('booking.availabilityShown') : t('booking.checkAvailability')}
            </button>
          ) : onBookNow ? (
            <button
              type="button"
              onClick={onBookNow}
              className="rc-cta-btn font-label"
            >
              {t('booking.bookRoom')}
            </button>
          ) : (
            <Link to={bookHref} className="rc-cta-btn font-label">
              {t('booking.bookRoom')}
            </Link>
          )}
        </div>

      </article>

      <style>{`
        /* ━━ Card shell ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          border-radius: 1.35rem;
          border: 1px solid rgba(6, 78, 59, 0.09);
          background: #ffffff;
          box-shadow:
            0 1px 0 rgba(6, 78, 59, 0.03),
            0 20px 50px -28px rgba(6, 78, 59, 0.14);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .rc-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 1px 0 rgba(6, 78, 59, 0.03),
            0 28px 60px -26px rgba(6, 78, 59, 0.22);
        }

        .rc-card--selected {
          box-shadow:
            0 0 0 2.5px #34D399,
            0 20px 50px -20px rgba(6, 78, 59, 0.2);
        }

        /* ━━ Photo gradient ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-photo-gradient {
          background: linear-gradient(
            to top,
            rgba(6, 78, 59, 0.72) 0%,
            rgba(6, 78, 59, 0.1) 40%,
            transparent 65%
          );
          pointer-events: none;
        }

        /* ━━ Photo badges ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-badge-type {
          display: inline-flex;
          align-items: center;
          background: #34D399;
          color: #064E3B;
          border-radius: 100px;
          padding: 0.3rem 0.875rem;
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .rc-badge-meta {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          border-radius: 100px;
          padding: 0.3rem 0.875rem;
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        /* ━━ Info text ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-name {
          font-size: 1.25rem;
          font-weight: 500;
          color: #064E3B;
        }

        @media (min-width: 640px) {
          .rc-name { font-size: 1.4rem; }
        }

        .rc-meta {
          font-size: 0.8125rem;
          color: rgba(6, 78, 59, 0.48);
        }

        .rc-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: rgba(6, 78, 59, 0.62);
        }

        /* ━━ Highlight pills ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-highlight {
          display: inline-flex;
          align-items: center;
          border-radius: 100px;
          border: 1px solid rgba(6, 78, 59, 0.12);
          background: #ECFDF5;
          padding: 0.28rem 0.75rem;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(6, 78, 59, 0.7);
        }

        /* ━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rc-cta-wrap {
          border-top: 1px solid rgba(6, 78, 59, 0.07);
        }

        .rc-cta-btn {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          border-radius: 0.875rem;
          background: #064E3B;
          padding: 0.8rem 1.25rem;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: #F9FDF9;
          transition: background 0.22s ease, color 0.22s ease;
          text-decoration: none;
        }

        .rc-cta-btn:hover {
          background: #F59E0B;
          color: #064E3B;
        }

        /* Active state — room is selected, widget is open */
        .rc-cta-btn--active {
          background: #ECFDF5;
          border: 1.5px solid rgba(52, 211, 153, 0.5);
          color: #064E3B;
          cursor: default;
        }

        .rc-cta-btn--active:hover {
          background: #ECFDF5;
          color: #064E3B;
        }
      `}</style>
    </>
  )
}
