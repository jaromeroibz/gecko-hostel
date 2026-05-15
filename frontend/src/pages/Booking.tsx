import { useRef } from 'react'

import { BookingSearchBar } from '../components/booking/BookingSearchBar'
import { RoomCard } from '../components/booking/RoomCard'
import { StickyDateBar } from '../components/booking/StickyDateBar'
import { BOOKING_ROOMS } from '../data/bookingRooms'
import { useLodgifySearchFromRoute } from '../hooks/useLodgifySearchFromRoute'

export function Booking() {
  const search = useLodgifySearchFromRoute()
  const searchRef = useRef<HTMLDivElement>(null)

  const searchQuery = `?arrival=${search.arrivalYmd}&departure=${search.departureYmd}&adults=${search.adults}`

  function scrollToSearch() {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="space-y-8 pb-24 pt-4 sm:pb-8 sm:pt-6">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-clay">
          Availability
        </p>
        <h1 className="font-display text-3xl font-medium tracking-tight text-gecko-forestDeep sm:text-4xl">
          Choose your room
        </h1>
      </header>

      {/* ── Date search bar ─────────────────────────────────────────── */}
      <div ref={searchRef} className="scroll-mt-6">
        <BookingSearchBar
          key={`${search.arrivalYmd}-${search.departureYmd}-${search.adults}`}
          arrivalYmd={search.arrivalYmd}
          departureYmd={search.departureYmd}
          adults={search.adults}
        />
      </div>

      {/* ── Room cards grid ─────────────────────────────────────────── */}
      <ul className="grid gap-8 sm:grid-cols-2">
        {BOOKING_ROOMS.map((room) => (
          <li key={room.id}>
            <RoomCard room={room} searchQuery={searchQuery} />
          </li>
        ))}
      </ul>

      <p className="text-center text-xs text-gecko-forest/45">
        Live pricing powered by Lodgify · Availability confirmed at checkout
      </p>

      {/* ── Sticky mobile bar ───────────────────────────────────────── */}
      <StickyDateBar
        arrivalYmd={search.arrivalYmd}
        departureYmd={search.departureYmd}
        adults={search.adults}
        onEdit={scrollToSearch}
      />
    </section>
  )
}
