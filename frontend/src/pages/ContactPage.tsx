export function ContactPage() {
  return (
    <section className="space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gecko-clay">
        Get in touch
      </p>
      <h1 className="font-display text-4xl font-medium tracking-tight text-gecko-forestDeep sm:text-5xl">
        Contact
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-gecko-forest/70">
        Questions about your stay? Reach us at{' '}
        <a
          className="font-medium text-gecko-forest underline underline-offset-2 transition hover:text-gecko-forestDeep"
          href="mailto:hello@geckohostel.com"
        >
          hello@geckohostel.com
        </a>
        .
      </p>
    </section>
  )
}
