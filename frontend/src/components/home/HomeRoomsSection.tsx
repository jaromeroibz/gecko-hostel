import { MARKETING_ROOMS } from '../../data/marketingRooms'

export function HomeRoomsSection() {
  return (
    <section id="rooms" className="scroll-mt-24 space-y-10 sm:space-y-12" aria-labelledby="rooms-heading">
      <div className="max-w-2xl space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-clay">
          Stay with us
        </p>
        <h2
          id="rooms-heading"
          className="font-display text-3xl font-medium tracking-tight text-gecko-forest sm:text-4xl"
        >
          Rooms built for real travel rhythms
        </h2>
        <p className="text-sm leading-relaxed text-gecko-forest/70 sm:text-base">
          From social dorms to private suites—spaces tuned for airflow, deep sleep, and quick
          turnarounds between waves. Rates and availability always confirm at checkout on Lodgify.
        </p>
      </div>

      <ul className="grid gap-7 sm:grid-cols-2 sm:gap-8">
        {MARKETING_ROOMS.map((room) => (
          <li key={room.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-gecko-sand/90 bg-white shadow-[0_1px_0_rgba(30,61,50,0.04),0_20px_50px_-28px_rgba(20,41,35,0.12)] transition duration-300 hover:-translate-y-1 hover:border-gecko-sage/50 hover:shadow-[0_24px_60px_-26px_rgba(20,41,35,0.18)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.imageSrc}
                  alt={room.imageAlt}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-gecko-forestDeep/75 via-gecko-forest/15 to-transparent opacity-90"
                  aria-hidden
                />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-end justify-between gap-2">
                  <span className="rounded-full bg-gecko-cream/95 px-3 py-1.5 text-xs font-semibold text-gecko-forest shadow-sm backdrop-blur-sm">
                    {room.roomType}
                  </span>
                  <span className="rounded-full bg-gecko-forest px-3 py-1.5 text-xs font-semibold text-gecko-cream shadow-md">
                    From ${room.fromPriceUsd}
                    <span className="font-normal text-gecko-sageLight/95"> / night</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-xl font-medium text-gecko-forest sm:text-2xl">
                  {room.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-gecko-sage">{room.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-gecko-forest/72">
                  {room.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {room.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-gecko-mist bg-gecko-cream/80 px-3 py-1 text-xs font-medium text-gecko-forest/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gecko-forest/45">
                  {room.capacityLabel}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-start gap-4 rounded-[1.35rem] border border-gecko-sage/35 bg-gradient-to-br from-gecko-mist/50 to-gecko-cream px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
        <p className="text-sm font-medium leading-relaxed text-gecko-forest/85">
          Ready when you are—lock in dates and see live pricing in seconds.
        </p>
        <a
          href="#plan-your-stay"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gecko-forest px-5 py-2.5 text-sm font-semibold text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep"
        >
          Search availability
        </a>
      </div>
    </section>
  )
}
