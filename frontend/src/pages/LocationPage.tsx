import { Link } from 'react-router-dom'

import { useInView } from '../hooks/useInView'

// ── Images (swap for your own Cloudinary URLs when ready) ─────────────────────
const HERO_IMG = 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80'
const SURF_IMG = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80'

const TILES = [
  {
    id: 'waterfalls',
    title: 'Waterfalls',
    sub: 'Montezuma · Florida',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wildlife',
    title: 'Jungle & Wildlife',
    sub: 'Monkeys, turtles & scarlet macaws',
    img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'sunsets',
    title: 'Pacific Sunsets',
    sub: 'Golden hour every single evening',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'adventure',
    title: 'Adventure',
    sub: 'ATV, fishing & hiking',
    img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=80',
  },
  // shown on mobile only (desktop mosaic has 4 tiles)
  {
    id: 'food',
    title: 'Food & Nightlife',
    sub: 'Sodas, ceviche & rooftop bars',
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=700&q=80',
  },
]

const SURF_STATS: [string, string][] = [
  ['27°C',          'Water temp'],
  ['Beach + point', 'Break types'],
  ['All year',      'Surf season'],
  ['All levels',    'Instructors'],
]

const FACTS = [
  { value: '27–30°C',   label: 'Water & air year-round' },
  { value: 'Every day', label: 'Consistent waves' },
  { value: '3 min',     label: 'Walk to the surf break' },
  { value: '30 min',    label: 'From Cobano airport' },
]

export function LocationPage() {
  const [statementRef, statementInView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [surfRef,      surfInView]      = useInView<HTMLDivElement>({ threshold: 0.08 })
  const [expRef,       expInView]       = useInView<HTMLDivElement>({ threshold: 0.06 })
  const [factsRef,     factsInView]     = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [gtRef,        gtInView]        = useInView<HTMLDivElement>({ threshold: 0.1  })
  const [ctaRef,       ctaInView]       = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="lc-hero relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 -mt-10 sm:-mt-12">
        <div
          className="lc-hero-bg absolute inset-0"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
          aria-hidden
        />
        <div className="lc-hero-overlay absolute inset-0" aria-hidden />
        <div className="lc-hero-inner">
          <p className="lc-eyebrow font-label" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}>Nicoya Peninsula · Costa Rica</p>
          <h1 className="lc-hero-heading font-display" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22,1,0.36,1) 0.32s both' }}>
            Santa Teresa<br />
            doesn't let<br />
            you leave.
          </h1>
          <p className="lc-hero-sub font-label" style={{ animation: 'hero-enter 0.85s cubic-bezier(0.22,1,0.36,1) 0.5s both' }}>
            Where the jungle meets the Pacific.
          </p>
          <Link to="/booking" className="lc-hero-cta font-label" style={{ animation: 'hero-enter 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}>
            Book your stay →
          </Link>
        </div>
        <div className="lc-scroll-hint" aria-hidden>
          <span className="lc-scroll-line" />
        </div>
      </div>

      {/* ── Opening statement ────────────────────────────────────────── */}
      <div ref={statementRef} className={`lc-statement${statementInView ? ' in-view' : ''}`}>
        <p className="lc-statement-text reveal">
          A dirt road lined with surf shops, howler monkeys overhead, scarlet
          macaws crossing the sky at dawn.{' '}
          <span className="lc-statement-accent">
            Santa Teresa sits at the tip of the Nicoya Peninsula
          </span>{' '}
          — and once you arrive, leaving feels like a mistake.
        </p>
      </div>

      {/* ── Surf section ─────────────────────────────────────────────── */}
      <div ref={surfRef} className={`lc-surf relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${surfInView ? ' in-view' : ''}`}>
        <div className="lc-surf-inner">
          <div className="lc-surf-text reveal-from-left">
            <p className="lc-surf-eyebrow font-label">The main attraction</p>
            <h2 className="lc-surf-heading font-display">
              Consistent waves,<br />year-round.
            </h2>
            <p className="lc-surf-desc">
              Playa Santa Teresa and Playa Carmen deliver powerful beach breaks
              and long point breaks that work on every swell. The warm Pacific
              water, world-class surf schools and a community built around the
              ocean make this one of the finest surf destinations in Central
              America — whether you're paddling out for the first time or
              hunting barrels before breakfast.
            </p>
            <div className="lc-surf-stats">
              {SURF_STATS.map(([val, label], i) => (
                <div key={label} className={`lc-stat reveal stagger-${i + 2}`}>
                  <span className="lc-stat-val font-display">{val}</span>
                  <span className="lc-stat-label font-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="lc-surf-photo reveal-from-right stagger-2"
            style={{ backgroundImage: `url('${SURF_IMG}')` }}
            aria-hidden
          />
        </div>
      </div>

      {/* ── Experiences mosaic ───────────────────────────────────────── */}
      <div ref={expRef} className={`lc-experiences${expInView ? ' in-view' : ''}`}>
        <div className="lc-exp-header reveal">
          <p className="lc-exp-eyebrow font-label">More than just surf</p>
          <h2 className="lc-exp-heading font-display">Life in Santa Teresa</h2>
        </div>

        <div className="lc-mosaic reveal stagger-2" role="list">
          {TILES.map((tile) => (
            <div
              key={tile.id}
              role="listitem"
              className={`lc-tile lc-tile--${tile.id}`}
              aria-label={tile.title}
            >
              <div
                className="lc-tile-img"
                style={{ backgroundImage: `url('${tile.img}')` }}
                aria-hidden
              />
              <div className="lc-tile-overlay" aria-hidden />
              <div className="lc-tile-text">
                <span className="lc-tile-title font-display">{tile.title}</span>
                <span className="lc-tile-sub font-label">{tile.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fact strip ───────────────────────────────────────────────── */}
      <div ref={factsRef} className={`lc-facts relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${factsInView ? ' in-view' : ''}`}>
        <div className="lc-facts-inner">
          {FACTS.map(({ value, label }, i) => (
            <div key={label} className={`lc-fact reveal stagger-${i + 1}`}>
              <span className="lc-fact-val font-display">{value}</span>
              <span className="lc-fact-label font-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Getting there ────────────────────────────────────────────── */}
      <div ref={gtRef} className={`lc-getting-there${gtInView ? ' in-view' : ''}`}>
        <p className="lc-gt-eyebrow font-label reveal">Getting here</p>
        <h2 className="lc-gt-heading font-display reveal stagger-1">
          Finding paradise is easier than you think.
        </h2>
        <div className="lc-gt-cards">
          <div className="lc-gt-card reveal stagger-2">
            <div className="lc-gt-icon" aria-hidden>✈️</div>
            <h3 className="lc-gt-card-title font-display">By air</h3>
            <p className="lc-gt-card-desc">
              Fly San José → Cobano (45 min domestic flight), then a
              30-minute taxi or shuttle to Santa Teresa. The fastest and most
              comfortable option — you'll be in the water by afternoon.
            </p>
            <span className="lc-gt-route font-label">
              SJO → Cobano → Santa Teresa · ~1.5 hrs total
            </span>
          </div>

          <div className="lc-gt-card reveal stagger-3">
            <div className="lc-gt-icon" aria-hidden>⛴️</div>
            <h3 className="lc-gt-card-title font-display">By bus & ferry</h3>
            <p className="lc-gt-card-desc">
              Bus to Puntarenas, ferry to Paquera, then a local bus straight
              to Santa Teresa. Longer, but the ferry crossing through the Gulf
              of Nicoya is an experience in itself — book a window seat.
            </p>
            <span className="lc-gt-route font-label">
              San José → Paquera ferry → Santa Teresa · ~5–6 hrs
            </span>
          </div>
        </div>
      </div>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <div ref={ctaRef} className={`lc-cta relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${ctaInView ? ' in-view' : ''}`}>
        <div className="lc-cta-inner">
          <p className="lc-cta-eyebrow font-label reveal">You've read enough</p>
          <h2 className="lc-cta-heading font-display reveal stagger-1">
            Santa Teresa<br />is waiting.
          </h2>
          <p className="lc-cta-sub font-label reveal stagger-2">
            Waves every morning. Jungle at your door.<br />
            The rest figures itself out.
          </p>
          <div className="lc-cta-btns reveal stagger-3">
            <Link to="/booking" className="lc-cta-btn-primary font-label">
              Book your stay →
            </Link>
            <Link to="/#packages" className="lc-cta-btn-secondary font-label">
              Browse packages →
            </Link>
          </div>
        </div>
      </div>

      <style>{`

        /* ━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-hero {
          height: 100vh;
          min-height: 620px;
          max-height: 960px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .lc-hero-bg {
          background-size: cover;
          background-position: center 40%;
          transform: scale(1.04);
        }

        .lc-hero-overlay {
          background: linear-gradient(
            160deg,
            rgba(2, 26, 17, 0.9)  0%,
            rgba(6, 78, 59, 0.72) 50%,
            rgba(2, 26, 17, 0.85) 100%
          );
        }

        .lc-hero-inner {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 9vh, 7rem);
          max-width: 1152px;
          width: 100%;
          margin: 0 auto;
        }

        .lc-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 1.25rem;
        }

        .lc-hero-heading {
          font-size: clamp(3rem, 7.5vw, 5.75rem);
          line-height: 1.01;
          letter-spacing: -0.025em;
          color: #F9FDF9;
          margin: 0 0 1.5rem;
        }

        .lc-hero-sub {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.42);
          margin: 0 0 2.75rem;
          max-width: 440px;
        }

        .lc-hero-cta {
          display: inline-flex;
          align-items: center;
          background: #F97316;
          color: #F9FDF9;
          border-radius: 100px;
          padding: 0.9rem 2.25rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .lc-hero-cta:hover { background: #ea6500; transform: translateY(-2px); }

        /* Animated scroll line */
        .lc-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: clamp(1.5rem, 6vw, 5rem);
          z-index: 1;
        }
        .lc-scroll-line {
          display: block;
          width: 1px;
          height: 52px;
          background: linear-gradient(to bottom, rgba(52, 211, 153, 0.7), transparent);
          animation: lc-drop 2.2s ease-in-out infinite;
        }
        @keyframes lc-drop {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          40%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          80%  { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        /* ━━ Opening statement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-statement {
          padding: 5.5rem clamp(1.5rem, 6vw, 5rem);
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .lc-statement-text {
          font-size: clamp(1.2rem, 2.2vw, 1.75rem);
          line-height: 1.65;
          color: rgba(6, 78, 59, 0.65);
          margin: 0;
        }
        .lc-statement-accent {
          color: #064E3B;
          font-weight: 600;
        }

        /* ━━ Surf section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-surf { background: #064E3B; }

        .lc-surf-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1152px;
          margin: 0 auto;
          min-height: 600px;
        }

        .lc-surf-text {
          padding: clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3.5rem)
                   clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .lc-surf-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 1.25rem;
        }

        .lc-surf-heading {
          font-size: clamp(2.25rem, 3.5vw, 3.25rem);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #F9FDF9;
          margin: 0 0 1.5rem;
        }

        .lc-surf-desc {
          font-size: 0.9375rem;
          line-height: 1.85;
          color: rgba(249, 253, 249, 0.58);
          margin: 0 0 2.75rem;
        }

        .lc-surf-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 2.5rem;
        }

        .lc-stat { display: flex; flex-direction: column; gap: 0.3rem; }

        .lc-stat-val {
          font-size: 1.4rem;
          color: #F9FDF9;
          line-height: 1.1;
        }
        .lc-stat-label {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.38);
        }

        .lc-surf-photo {
          background-size: cover;
          background-position: center 30%;
          min-height: 420px;
        }

        /* ━━ Experiences ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-experiences {
          padding: 5.5rem clamp(1.5rem, 6vw, 5rem);
          max-width: 1152px;
          margin: 0 auto;
        }

        .lc-exp-header { margin-bottom: 2.5rem; }

        .lc-exp-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #F97316;
          margin: 0 0 0.75rem;
        }

        .lc-exp-heading {
          font-size: clamp(2rem, 3.2vw, 3rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: #064E3B;
          margin: 0;
        }

        /* 3-col grid: waterfalls spans 2 cols (row 1), adventure spans 2 cols (row 2) */
        .lc-mosaic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 400px 290px;
          gap: 0.75rem;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .lc-tile--waterfalls { grid-column: 1 / 3; grid-row: 1; }
        .lc-tile--wildlife   { grid-column: 3;     grid-row: 1; }
        .lc-tile--sunsets    { grid-column: 1;     grid-row: 2; }
        .lc-tile--adventure  { grid-column: 2 / 4; grid-row: 2; }
        .lc-tile--food       { display: none; }

        .lc-tile {
          position: relative;
          overflow: hidden;
          background: #021a0f;
        }

        .lc-tile-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s ease;
        }
        .lc-tile:hover .lc-tile-img { transform: scale(1.06); }

        .lc-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(2, 18, 12, 0.82) 0%,
            rgba(6, 78, 59, 0.2)  45%,
            transparent 70%
          );
          transition: background 0.4s ease;
        }
        .lc-tile:hover .lc-tile-overlay {
          background: linear-gradient(
            to top,
            rgba(2, 18, 12, 0.88) 0%,
            rgba(6, 78, 59, 0.32) 55%,
            rgba(6, 78, 59, 0.06) 80%
          );
        }

        .lc-tile-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem 1.875rem;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .lc-tile-title {
          font-size: 1.25rem;
          color: #F9FDF9;
          line-height: 1.1;
          display: block;
        }

        .lc-tile-sub {
          display: block;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.55);
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .lc-tile:hover .lc-tile-sub { opacity: 1; transform: translateY(0); }

        /* ━━ Fact strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-facts { background: #ECFDF5; }

        .lc-facts-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1152px;
          margin: 0 auto;
          padding: 3.75rem clamp(1.5rem, 6vw, 5rem);
          gap: 2rem;
        }

        .lc-fact { display: flex; flex-direction: column; gap: 0.45rem; }

        .lc-fact-val {
          font-size: clamp(1.5rem, 2.5vw, 2.1rem);
          color: #064E3B;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .lc-fact-label {
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.48);
          line-height: 1.5;
        }

        /* ━━ Getting there ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-getting-there {
          padding: 5.5rem clamp(1.5rem, 6vw, 5rem);
          max-width: 1152px;
          margin: 0 auto;
        }

        .lc-gt-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 0.75rem;
        }

        .lc-gt-heading {
          font-size: clamp(1.75rem, 2.8vw, 2.6rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #064E3B;
          margin: 0 0 2.75rem;
          max-width: 540px;
        }

        .lc-gt-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .lc-gt-card {
          background: #ffffff;
          border: 1px solid rgba(6, 78, 59, 0.09);
          border-radius: 1.35rem;
          padding: 2rem 2.25rem 2.25rem;
          box-shadow:
            0 1px 0 rgba(6, 78, 59, 0.03),
            0 12px 40px -10px rgba(6, 78, 59, 0.1);
          display: flex;
          flex-direction: column;
        }

        .lc-gt-icon { font-size: 2rem; margin-bottom: 1.25rem; line-height: 1; }

        .lc-gt-card-title {
          font-size: 1.25rem;
          color: #064E3B;
          margin: 0 0 0.875rem;
          font-weight: 500;
        }

        .lc-gt-card-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(6, 78, 59, 0.58);
          margin: 0 0 1.5rem;
          flex: 1;
        }

        .lc-gt-route {
          display: inline-flex;
          align-items: center;
          background: #ECFDF5;
          border: 1px solid rgba(52, 211, 153, 0.28);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.6);
          width: fit-content;
        }

        /* ━━ Final CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lc-cta { background: #064E3B; }

        .lc-cta-inner {
          max-width: 680px;
          margin: 0 auto;
          padding: 6.5rem clamp(1.5rem, 6vw, 5rem);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .lc-cta-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .lc-cta-heading {
          font-size: clamp(2.75rem, 5vw, 4.5rem);
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: #F9FDF9;
          margin: 0;
        }

        .lc-cta-sub {
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.35);
          margin: 0.25rem 0 0.75rem;
          line-height: 1.9;
        }

        .lc-cta-btns {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .lc-cta-btn-primary {
          display: inline-flex;
          align-items: center;
          background: #F97316;
          color: #F9FDF9;
          border-radius: 100px;
          padding: 0.9rem 2.25rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .lc-cta-btn-primary:hover { background: #ea6500; transform: translateY(-2px); }

        .lc-cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: rgba(249, 253, 249, 0.62);
          border: 1.5px solid rgba(249, 253, 249, 0.22);
          border-radius: 100px;
          padding: 0.9rem 2.25rem;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.22s ease, color 0.22s ease;
        }
        .lc-cta-btn-secondary:hover {
          border-color: rgba(249, 253, 249, 0.55);
          color: #F9FDF9;
        }

        /* ━━ Responsive ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .lc-mosaic { grid-template-rows: 340px 250px; }
        }

        @media (max-width: 767px) {
          .lc-surf-inner  { grid-template-columns: 1fr; }
          .lc-surf-photo  { min-height: 300px; }
          .lc-surf-stats  { grid-template-columns: 1fr 1fr; }

          .lc-mosaic {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, 270px);
            border-radius: 1.25rem;
          }
          .lc-tile--waterfalls,
          .lc-tile--wildlife,
          .lc-tile--sunsets,
          .lc-tile--adventure { grid-column: 1; grid-row: auto; }
          .lc-tile--food      { display: block; }
          .lc-tile-sub        { opacity: 1; transform: translateY(0); }

          .lc-facts-inner { grid-template-columns: 1fr 1fr; }
          .lc-gt-cards    { grid-template-columns: 1fr; }
        }

        @media (max-width: 479px) {
          .lc-hero        { max-height: 820px; }
          .lc-hero-heading { font-size: 2.75rem; }
          .lc-statement   { padding: 4rem 1.5rem; }
          .lc-experiences { padding: 4rem 1.5rem; }
          .lc-getting-there { padding: 4rem 1.5rem; }
          .lc-cta-inner   { padding: 5rem 1.5rem; }
        }
      `}</style>
    </>
  )
}
