import { Link } from 'react-router-dom'

export function HomeBookingCtaSection() {
  return (
    <section
      className="relative overflow-hidden rounded-[1.75rem] bg-gecko-forest px-6 py-14 text-center sm:px-10 sm:py-16"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gecko-sage/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gecko-sageLight/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-sageLight/90">
          Next step
        </p>
        <h2
          id="cta-heading"
          className="font-display text-3xl font-medium tracking-tight text-gecko-cream sm:text-4xl"
        >
          Your next session starts with a room key
        </h2>
        <p className="text-sm leading-relaxed text-gecko-cream/80 sm:text-base">
          Open Lodgify on your terms—same search, same extras mindset. Add surf and tours from home,
          then finish payment where availability is always real-time.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 pt-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-xl bg-gecko-sageLight px-8 py-3.5 text-base font-semibold text-gecko-forestDeep shadow-lg shadow-black/20 transition hover:bg-gecko-cream"
          >
            Go to booking
          </Link>
          <a
            href="#plan-your-stay"
            className="inline-flex items-center justify-center rounded-xl border border-gecko-cream/30 bg-transparent px-8 py-3.5 text-base font-semibold text-gecko-cream transition hover:border-gecko-cream/50 hover:bg-gecko-cream/10"
          >
            Adjust search
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-[0.35]" aria-hidden>
        <svg className="h-8 w-full text-gecko-sageLight" viewBox="0 0 1440 32" preserveAspectRatio="none">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M0,20 Q360,6 720,18 T1440,14"
          />
        </svg>
      </div>
    </section>
  )
}
