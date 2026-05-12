import { LodgifySearchBar } from '../lodgify/LodgifySearchBar'

export function HomeStaySearchSection() {
  return (
    <section
      id="plan-your-stay"
      className="scroll-mt-24 rounded-[1.75rem] border border-gecko-sand bg-white/90 p-7 shadow-[0_1px_0_rgba(30,61,50,0.06),0_18px_48px_-24px_rgba(20,41,35,0.18)] backdrop-blur-sm sm:p-9"
      aria-labelledby="plan-your-stay-heading"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-clay">
        Book
      </p>
      <h2
        id="plan-your-stay-heading"
        className="mt-2 font-display text-3xl font-medium tracking-tight text-gecko-forest sm:text-4xl"
      >
        Plan your stay
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gecko-forest/70 sm:text-base">
        Live availability lives on Lodgify—start here with your dates and guests, then continue in
        one flow.
      </p>
      <div className="mt-8 rounded-2xl border border-gecko-mist/80 bg-gecko-cream/50 p-4 sm:p-5">
        <LodgifySearchBar searchPageUrl="/booking" />
      </div>
    </section>
  )
}
