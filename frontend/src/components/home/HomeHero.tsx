const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85'

/**
 * Full-bleed hero relative to `MainLayout` main column. Parent layout should use `overflow-x-hidden`.
 * Wave footer softens transition into cream page (Gecko / reference rhythm).
 */
export function HomeHero() {
  return (
    <div className="relative left-1/2 z-0 mb-0 w-screen max-w-[100vw] -translate-x-1/2">
      <div className="relative min-h-[min(90vh,840px)] overflow-hidden bg-gecko-forestDeep">
        <img
          src={HERO_IMAGE}
          alt="Tropical shoreline at golden hour"
          className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.05]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-gecko-forestDeep via-gecko-forestDeep/75 to-gecko-forest/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-gecko-forestDeep/60 via-transparent to-gecko-forestDeep/30"
          aria-hidden
        />

        <div className="relative flex min-h-[min(90vh,840px)] flex-col justify-end px-5 pb-24 pt-28 sm:px-10 sm:pb-28 sm:pt-32 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gecko-sageLight sm:text-xs">
            Costa Rica · Gecko Hostel
          </p>
          <h1 className="mt-4 max-w-[14ch] font-display text-4xl font-medium leading-[1.08] tracking-tight text-gecko-cream sm:max-w-[18ch] sm:text-5xl sm:leading-[1.06] lg:text-6xl lg:leading-[1.05]">
            Where jungle calm meets surf culture
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gecko-cream/90 sm:text-lg">
            Gecko Hostel is for travelers who want salt on their skin, quiet mornings, and a
            straight path from daydream to booking—without losing the hostel pulse.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#plan-your-stay"
              className="inline-flex items-center justify-center rounded-xl bg-gecko-sageLight px-7 py-3.5 text-center text-base font-semibold text-gecko-forestDeep shadow-lg shadow-black/25 transition hover:bg-gecko-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gecko-cream"
            >
              Check dates and guests
            </a>
            <a
              href="#rooms"
              className="inline-flex items-center justify-center rounded-xl border border-gecko-cream/35 bg-gecko-cream/10 px-7 py-3.5 text-center text-base font-semibold text-gecko-cream backdrop-blur-md transition hover:border-gecko-cream/55 hover:bg-gecko-cream/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gecko-cream"
            >
              Explore rooms
            </a>
          </div>
          <p className="mt-6 max-w-md text-xs leading-relaxed text-gecko-cream/65 sm:text-sm">
            Start with your dates below, wander the room stories, then stack surf and tour extras
            before you complete payment on Lodgify.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-px" aria-hidden>
          <svg
            className="h-12 w-full text-gecko-cream sm:h-16"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,38 C240,12 480,52 720,34 C960,16 1200,44 1440,28 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
