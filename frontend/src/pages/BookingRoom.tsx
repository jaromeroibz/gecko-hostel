import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { BookingSearchBar } from '../components/booking/BookingSearchBar'
import { BOOKING_ROOMS } from '../data/bookingRooms'
import { useLodgifySearchFromRoute } from '../hooks/useLodgifySearchFromRoute'

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'

// ── Component ────────────────────────────────────────────────────────────────

export function BookingRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const search = useLodgifySearchFromRoute()
  const [iframeHeight, setIframeHeight] = useState(420)

  const room = BOOKING_ROOMS.find((r) => r.id === roomId)
  if (!room) return <Navigate to="/booking" replace />

  const isDormitory = room.type === 'Dormitory Room'
  const coverImg = room.images[0] ?? PLACEHOLDER_IMG
  const backHref = `/booking?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}`

  // Private rooms are priced per room — pass adults=1 so the widget shows the
  // correct per-room total instead of multiplying by guest count.
  const widgetAdults = isDormitory ? search.adults : 1
  const widgetSrc =
    `/booking-widget.html?rentalId=${room.rentalId}` +
    `&arrival=${search.arrivalYmd}` +
    `&departure=${search.departureYmd}` +
    `&adults=${widgetAdults}`

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'ldg-widget-height' && typeof e.data.height === 'number') {
        setIframeHeight(e.data.height + 16)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="space-y-8 pb-8 pt-4 sm:pt-6">

      {/* ── Back link ───────────────────────────────────────────────── */}
      <Link
        to={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gecko-forest/70 hover:text-gecko-forest"
      >
        ← All rooms
      </Link>

      {/* ── Hero photo ──────────────────────────────────────────────── */}
      <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
        <img
          src={coverImg}
          alt={room.name}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gecko-forestDeep/60 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-gecko-cream/95 px-3 py-1.5 text-xs font-semibold text-gecko-forest shadow-sm backdrop-blur-sm">
            {room.type}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {room.size} m² · {room.bathroom === 'private' ? 'Private bathroom' : 'Shared bathroom'}
          </span>
        </div>
      </div>

      {/* ── Room info + Booking Box ──────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

        {/* Left: description + amenities */}
        <div className="space-y-5">
          <div>
            <h1 className="font-display text-3xl font-medium tracking-tight text-gecko-forestDeep sm:text-4xl">
              {room.name}
            </h1>
            <p className="mt-1 text-sm text-gecko-sage">{room.beds}</p>
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

          {/* Lodgify Booking Box — isolated in its own iframe to avoid React conflicts */}
          <div className="rounded-2xl border border-gecko-sand bg-white p-5 shadow-sm">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/55">
              Book this room
            </p>
            <iframe
              key={widgetSrc}
              src={widgetSrc}
              style={{ width: '100%', height: iframeHeight, border: 'none', display: 'block' }}
              title="Book this room"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
