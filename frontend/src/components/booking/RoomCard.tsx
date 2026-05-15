import { Link } from 'react-router-dom'

import type { BookingRoom } from '../../data/bookingRooms'

const GECKO_DORM_PLACEHOLDER =
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'

type Props = {
  room: BookingRoom
  /** Full query string to preserve dates when navigating to the room page */
  searchQuery: string
}

export function RoomCard({ room, searchQuery }: Props) {
  const coverImg = room.images[0] ?? GECKO_DORM_PLACEHOLDER
  const bookHref = `/booking/${room.id}${searchQuery}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-gecko-sand/90 bg-white shadow-[0_1px_0_rgba(30,61,50,0.04),0_20px_50px_-28px_rgba(20,41,35,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-26px_rgba(20,41,35,0.18)]">

      {/* ── Photo ─────────────────────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={coverImg}
          alt={room.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gecko-forestDeep/70 via-gecko-forest/10 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-end justify-between gap-2">
          <span className="rounded-full bg-gecko-cream/95 px-3 py-1.5 text-xs font-semibold text-gecko-forest shadow-sm backdrop-blur-sm">
            {room.type}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {room.size} m² · {room.bathroom === 'private' ? 'Private bath' : 'Shared bath'}
          </span>
        </div>
      </div>

      {/* ── Info ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h2 className="font-display text-xl font-medium text-gecko-forestDeep sm:text-2xl">
          {room.name}
        </h2>
        <p className="mt-1 text-sm text-gecko-sage">{room.beds}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gecko-forest/70">
          {room.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Amenities">
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className="border-t border-gecko-sand/60 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <Link
          to={bookHref}
          className="flex w-full items-center justify-center rounded-xl bg-gecko-forest px-5 py-3 text-sm font-semibold text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep"
        >
          Book this room →
        </Link>
      </div>
    </article>
  )
}
