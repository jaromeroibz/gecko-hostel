import { useInView } from '../../hooks/useInView'

const PACKAGES = [
  {
    id: 'backpacker',
    category: 'Solo · Backpacker',
    name: 'Backpacker\nSurf Camp',
    duration: '6 days / 5 nights',
    accommodation: 'Shared dorm',
    price: 749,
    priceUnit: '/ person',
    taxNote: '~$845 with taxes',
    surfLessons: 4,
    videoSessions: 3,
    inclusions: [
      '4 surf lessons',
      '3 video analyses',
      'Daily breakfast',
      'Montezuma Waterfall',
      'Playa Hermosa + Tide Pools',
    ],
    bookingHref: '/booking?package=backpacker',
    cardStyle: 'dark',
  },
  {
    id: 'adventure',
    category: 'Best Value',
    name: 'Surf & Adventure\nCamp',
    duration: '10 days / 7 nights',
    accommodation: 'Shared dorm',
    price: 1249,
    priceUnit: '/ person',
    taxNote: '~$1,410 with taxes',
    surfLessons: 8,
    videoSessions: 4,
    inclusions: [
      '8 surf lessons',
      '4 video analyses',
      'Daily breakfast',
      'Montezuma + Florida Waterfalls',
      'Playa Hermosa + La Perla + Manzanillo',
    ],
    bookingHref: '/booking?package=adventure',
    cardStyle: 'orange',
  },
  {
    id: 'couples',
    category: 'Couples · Private Room',
    name: 'Couples\nSurf Escape',
    duration: '6 days / 5 nights',
    accommodation: 'Private room for 2',
    price: 1798,
    priceUnit: '/ room',
    taxNote: 'taxes included',
    surfLessons: 5,
    videoSessions: 4,
    inclusions: [
      '5 surf lessons',
      '4 video analyses',
      'Daily breakfast',
      'Montezuma Waterfall',
      'La Perla + Playa Manzanillo',
    ],
    bookingHref: '/booking?package=couples',
    cardStyle: 'mint',
  },
  {
    id: 'family',
    category: 'Groups · Families',
    name: 'Friends & Family\nSurf Retreat',
    duration: '5 days / 5 nights',
    accommodation: 'Private family room',
    price: 3396,
    priceUnit: '/ room',
    taxNote: 'taxes included',
    surfLessons: 3,
    videoSessions: 2,
    inclusions: [
      '3 surf lessons',
      '2 video analyses',
      'Daily breakfast',
      'Playa Hermosa + Tide Pools',
      'Mal País + Playa Suecos',
    ],
    bookingHref: '/booking?package=family',
    cardStyle: 'yellow',
  },
] as const

export function HomePackagesSection() {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <section
      ref={ref}
      id="packages"
      className={`pk-section scroll-mt-24 relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
      aria-labelledby="packages-heading"
    >
      <div className="pk-inner">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="pk-header reveal">
          <p className="pk-eyebrow font-label">Surf Packages</p>
          <h2 id="packages-heading" className="pk-heading font-display">
            Surf more. Explore more.<br />All in one package.
          </h2>
          <p className="pk-subtext">
            Curated multi-day camps with lessons, tours, breakfast and a bed —
            everything sorted so you can focus on the waves.
          </p>
        </header>

        {/* ── Package grid ────────────────────────────────────────────── */}
        <ul className="pk-grid" role="list">
          {PACKAGES.map((pkg, i) => (
            <li key={pkg.id} className={`pk-item pk-item--${pkg.cardStyle} reveal stagger-${i + 2}`}>
              <article className="pk-card" aria-labelledby={`pkg-name-${pkg.id}`}>

                {/* Top: category + name + duration */}
                <div className="pk-card-top">
                  <span className="pk-category font-label">{pkg.category}</span>
                  <h3 id={`pkg-name-${pkg.id}`} className="pk-name font-display">
                    {pkg.name.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </h3>
                  <div className="pk-meta-row">
                    <span className="pk-duration font-label">{pkg.duration}</span>
                    <span className="pk-accom font-label">{pkg.accommodation}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="pk-price-row">
                  <span className="pk-price font-display">${pkg.price.toLocaleString()}</span>
                  <span className="pk-price-unit font-label">{pkg.priceUnit}</span>
                  <span className="pk-price-tax font-label">{pkg.taxNote}</span>
                </div>

                {/* Divider */}
                <div className="pk-divider" aria-hidden />

                {/* Inclusions */}
                <ul className="pk-inclusions" role="list">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="pk-inclusion font-label">
                      <span className="pk-check" aria-hidden>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={pkg.bookingHref} className="pk-cta font-label">
                  Book this package →
                </a>

              </article>
            </li>
          ))}
        </ul>

        {/* ── Footer note ─────────────────────────────────────────────── */}
        <p className="pk-footnote font-label">
          Packages include accommodation, lessons &amp; tours — flights not included.
          Extras are added during checkout.
        </p>

      </div>

      <style>{`

        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-section {
          background: #F9FDF9;
          padding: 5rem 0 6rem;
        }

        .pk-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 6rem);
        }

        /* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-header {
          margin-bottom: 2.75rem;
        }

        .pk-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #F97316;
          margin: 0 0 1rem;
        }

        .pk-heading {
          font-size: clamp(2.5rem, 3.5vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          color: #064E3B;
          margin: 0 0 1.25rem;
        }

        .pk-subtext {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(6, 78, 59, 0.6);
          max-width: 520px;
          margin: 0;
        }

        /* ━━ Grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-grid {
          list-style: none;
          padding: 0;
          margin: 0 0 1.75rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        /* ━━ Base card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-card {
          width: 100%;
          height: 100%;
          border-radius: 1.75rem;
          overflow: hidden;
          padding: 2.25rem 2.5rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pk-card:hover {
          transform: translateY(-4px);
        }

        /* ━━ Card top area ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-card-top {
          flex: 0;
          margin-bottom: 1.5rem;
        }

        .pk-category {
          display: inline-block;
          font-size: 0.52rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
        }

        .pk-name {
          font-size: clamp(1.75rem, 2.2vw, 2.25rem);
          line-height: 1.08;
          margin: 0 0 1rem;
        }

        .pk-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pk-duration,
        .pk-accom {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.875rem;
          border-radius: 100px;
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1;
        }

        /* ━━ Price row ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-price-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.4rem 0.6rem;
          margin-bottom: 1.5rem;
        }

        .pk-price {
          font-size: clamp(2rem, 3vw, 2.75rem);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .pk-price-unit {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        .pk-price-tax {
          width: 100%;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          opacity: 0.4;
          text-transform: uppercase;
        }

        /* ━━ Divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-divider {
          height: 1px;
          margin-bottom: 1.25rem;
        }

        /* ━━ Inclusions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-inclusions {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .pk-inclusion {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        .pk-check {
          font-size: 0.65rem;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        /* ━━ CTA button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          border-radius: 100px;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          border: 1.5px solid;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          align-self: flex-start;
          width: 100%;
          text-align: center;
        }

        /* ━━ Footnote ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-footnote {
          text-align: center;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: rgba(6, 78, 59, 0.35);
          margin: 0;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* CARD 1 — dark jungle                                          */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-item--dark .pk-card {
          background: #064E3B;
          box-shadow: 0 20px 60px rgba(6, 78, 59, 0.28);
        }

        .pk-item--dark .pk-category {
          color: #34D399;
        }

        .pk-item--dark .pk-name {
          color: #F9FDF9;
        }

        .pk-item--dark .pk-duration {
          background: rgba(249, 253, 249, 0.08);
          border: 1px solid rgba(249, 253, 249, 0.14);
          color: rgba(249, 253, 249, 0.65);
        }

        .pk-item--dark .pk-accom {
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.22);
          color: #34D399;
        }

        .pk-item--dark .pk-price {
          color: #F9FDF9;
        }

        .pk-item--dark .pk-price-unit,
        .pk-item--dark .pk-price-tax {
          color: #F9FDF9;
        }

        .pk-item--dark .pk-divider {
          background: rgba(249, 253, 249, 0.1);
        }

        .pk-item--dark .pk-inclusion {
          color: rgba(249, 253, 249, 0.62);
        }

        .pk-item--dark .pk-check {
          color: #34D399;
        }

        .pk-item--dark .pk-cta {
          border-color: rgba(52, 211, 153, 0.4);
          background: rgba(52, 211, 153, 0.08);
          color: #F9FDF9;
        }

        .pk-item--dark .pk-cta:hover {
          background: #34D399;
          border-color: #34D399;
          color: #064E3B;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* CARD 2 — vivid orange (Adventure / Best Value)                */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-item--orange .pk-card {
          background: #F97316;
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.32);
        }

        .pk-item--orange .pk-category {
          color: rgba(249, 253, 249, 0.95);
          background: rgba(6, 78, 59, 0.2);
          padding: 0.28rem 0.875rem;
          border-radius: 100px;
          border: 1px solid rgba(249, 253, 249, 0.25);
        }

        .pk-item--orange .pk-name {
          color: #F9FDF9;
        }

        .pk-item--orange .pk-duration {
          background: rgba(249, 253, 249, 0.14);
          border: 1px solid rgba(249, 253, 249, 0.22);
          color: rgba(249, 253, 249, 0.85);
        }

        .pk-item--orange .pk-accom {
          background: rgba(6, 78, 59, 0.15);
          border: 1px solid rgba(6, 78, 59, 0.2);
          color: rgba(6, 78, 59, 0.85);
        }

        .pk-item--orange .pk-price {
          color: #F9FDF9;
        }

        .pk-item--orange .pk-price-unit,
        .pk-item--orange .pk-price-tax {
          color: #F9FDF9;
        }

        .pk-item--orange .pk-divider {
          background: rgba(249, 253, 249, 0.2);
        }

        .pk-item--orange .pk-inclusion {
          color: rgba(249, 253, 249, 0.82);
        }

        .pk-item--orange .pk-check {
          color: rgba(249, 253, 249, 0.95);
        }

        .pk-item--orange .pk-cta {
          border-color: rgba(6, 78, 59, 0.3);
          background: rgba(6, 78, 59, 0.18);
          color: #F9FDF9;
        }

        .pk-item--orange .pk-cta:hover {
          background: #064E3B;
          border-color: #064E3B;
          color: #F9FDF9;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* CARD 3 — barely-mint (Couples)                                */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-item--mint .pk-card {
          background: #ECFDF5;
          border: 1px solid rgba(6, 78, 59, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 20px 50px rgba(6, 78, 59, 0.08);
        }

        .pk-item--mint .pk-category {
          color: #F97316;
        }

        .pk-item--mint .pk-name {
          color: #064E3B;
        }

        .pk-item--mint .pk-duration {
          background: rgba(6, 78, 59, 0.07);
          border: 1px solid rgba(6, 78, 59, 0.12);
          color: rgba(6, 78, 59, 0.65);
        }

        .pk-item--mint .pk-accom {
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.2);
          color: #F97316;
        }

        .pk-item--mint .pk-price {
          color: #064E3B;
        }

        .pk-item--mint .pk-price-unit,
        .pk-item--mint .pk-price-tax {
          color: #064E3B;
        }

        .pk-item--mint .pk-divider {
          background: rgba(6, 78, 59, 0.1);
        }

        .pk-item--mint .pk-inclusion {
          color: rgba(6, 78, 59, 0.65);
        }

        .pk-item--mint .pk-check {
          color: #34D399;
        }

        .pk-item--mint .pk-cta {
          border-color: rgba(6, 78, 59, 0.3);
          background: transparent;
          color: #064E3B;
        }

        .pk-item--mint .pk-cta:hover {
          background: #064E3B;
          border-color: #064E3B;
          color: #F9FDF9;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* CARD 4 — sun yellow (Family)                                  */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .pk-item--yellow .pk-card {
          background: #FCD34D;
          box-shadow: 0 20px 60px rgba(234, 179, 8, 0.3);
        }

        .pk-item--yellow .pk-category {
          color: rgba(6, 78, 59, 0.7);
        }

        .pk-item--yellow .pk-name {
          color: #064E3B;
        }

        .pk-item--yellow .pk-duration {
          background: rgba(6, 78, 59, 0.1);
          border: 1px solid rgba(6, 78, 59, 0.15);
          color: rgba(6, 78, 59, 0.7);
        }

        .pk-item--yellow .pk-accom {
          background: rgba(6, 78, 59, 0.12);
          border: 1px solid rgba(6, 78, 59, 0.18);
          color: rgba(6, 78, 59, 0.75);
        }

        .pk-item--yellow .pk-price {
          color: #064E3B;
        }

        .pk-item--yellow .pk-price-unit,
        .pk-item--yellow .pk-price-tax {
          color: #064E3B;
        }

        .pk-item--yellow .pk-divider {
          background: rgba(6, 78, 59, 0.14);
        }

        .pk-item--yellow .pk-inclusion {
          color: rgba(6, 78, 59, 0.72);
        }

        .pk-item--yellow .pk-check {
          color: #064E3B;
        }

        .pk-item--yellow .pk-cta {
          border-color: rgba(6, 78, 59, 0.35);
          background: rgba(6, 78, 59, 0.08);
          color: #064E3B;
        }

        .pk-item--yellow .pk-cta:hover {
          background: #064E3B;
          border-color: #064E3B;
          color: #F9FDF9;
        }

        /* ━━ Tablet (< 1024px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .pk-grid {
            grid-template-columns: 1fr 1fr;
          }

          .pk-card {
            padding: 1.75rem 2rem 2rem;
          }
        }

        /* ━━ Mobile (< 640px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .pk-section {
            padding: 4rem 0 5rem;
          }

          .pk-heading {
            font-size: 2.25rem;
          }

          .pk-grid {
            grid-template-columns: 1fr;
          }

          .pk-card {
            padding: 2rem 1.75rem 2rem;
          }

          .pk-cta {
            align-self: stretch;
          }
        }
      `}</style>
    </section>
  )
}
