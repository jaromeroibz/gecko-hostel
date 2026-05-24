import { useInView } from '../../hooks/useInView'

// ── Experience images ──────────────────────────────────────────────────────
const IMG_ATV       = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1779215038/pexels-srkportraits-8310033_cka0zv.jpg'
const IMG_TIDEPOOLS = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1779036017/AZC_8778_qyo4bt.jpg'

export function HomeExperiencesSection() {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <section
      ref={ref}
      className={`ex-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
      aria-label="Experiences at Gecko"
    >
      {/* ── Top wave — barely-mint peeling into dark section ── */}
      <div className="ex-top-wave" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <header className="ex-header reveal">
        <p className="ex-eyebrow font-label font-medium uppercase text-gecko-clay">
          Explore with us
        </p>
        <h2 className="ex-heading font-display text-gecko-cream">
          Beyond the break.
        </h2>
        <p className="ex-subtext">
          Santa Teresa doesn't start and end in the water.<br />
          Jungle trails, hidden falls, secret coastlines —<br />
          there's a whole world between sessions.
        </p>
      </header>

      {/* ── Main cluster ──────────────────────────────────────────────────── */}
      <div className="ex-cluster">

        {/* ─── ROW 1 — Hero card: ATV Tours ────────────────────────────── */}
        <div className="ex-hero-card reveal stagger-2">
          <img
            src={IMG_ATV}
            alt="ATV tour through the jungle in Santa Teresa, Costa Rica"
            loading="lazy"
            className="ex-hero-img"
          />
          <div className="ex-hero-overlay" aria-hidden />

          {/* Floating content panel — bottom left */}
          <div className="ex-hero-panel">
            <span className="ex-cat font-label">Off-road · Guided & rentals</span>
            <h3 className="ex-panel-title font-display">
              Rip through<br />the jungle.
            </h3>
            <p className="ex-panel-body">
              Coastal cliffs, hidden lookouts, jungle trails.
              Book a guided ATV tour or rent one and carve your own path —
              Santa Teresa's wildest terrain is yours.
            </p>
            <span className="ex-tag font-label">
              ATV Tours · Half day · Guided or self-guided
            </span>
          </div>

          {/* Badge — top right */}
          <div className="ex-badge font-label" aria-label="Most popular experience">
            ★ Most popular
          </div>

          <span className="ex-num" aria-hidden>01</span>
        </div>

        {/* ─── ROW 2 — Waterfalls + Tide Pools ────────────────────────── */}
        <div className="ex-row-2">

          {/* Waterfalls — warm sun-yellow colour block */}
          <div className="ex-card ex-card--warm reveal stagger-3">
            <div className="ex-warm-bg" aria-hidden />
            <span className="ex-ghost font-display" aria-hidden>Falls</span>
            <span className="ex-num ex-num--dark" aria-hidden>02</span>
            <div className="ex-card-content ex-card-content--warm">
              <span className="ex-cat ex-cat--dark font-label">Into the wild</span>
              <h3 className="ex-card-title ex-card-title--dark font-display">
                Swim<br />somewhere<br />untouched.
              </h3>
              <p className="ex-card-body ex-card-body--dark">
                Hike through dense rainforest to waterfalls so remote
                they feel like secrets. Cold water, warm light, zero crowds.
              </p>
              <span className="ex-tag ex-tag--dark font-label">
                Waterfall Tours · Full day · Guided
              </span>
            </div>
          </div>

          {/* Tide Pools & Hidden Beaches */}
          <div className="ex-card reveal stagger-4">
            <img
              src={IMG_TIDEPOOLS}
              alt="Tide pools and hidden beaches along the Costa Rica coastline"
              loading="lazy"
            />
            <div className="ex-card-overlay" aria-hidden />
            <span className="ex-num" aria-hidden>03</span>
            <div className="ex-card-content">
              <span className="ex-cat font-label">Coast & ocean</span>
              <h3 className="ex-card-title font-display">
                The coast<br />hides its<br />best secrets.
              </h3>
              <p className="ex-card-body">
                Tide pools teeming with life, hidden coves only locals know.
                A guided walk along the raw coastline between sessions.
              </p>
              <span className="ex-tag font-label">
                Tide Pools · Hidden Beaches · Guided walk
              </span>
            </div>
          </div>

        </div>

        {/* ─── CTA strip ────────────────────────────────────────────────── */}
        <div className="ex-cta-strip reveal stagger-5">
          <p className="ex-cta-copy font-display">
            Every day is a new adventure.
          </p>
          <a href="/booking" className="ex-cta-btn font-label font-medium uppercase">
            Book your stay →
          </a>
        </div>

      </div>

      {/* ── Bottom wave — dark → cream for rooms section ──────────────── */}
      <div className="ex-bottom-wave" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <style>{`

        /* ━━ Section — deep jungle canvas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-section {
          background: #064E3B;
          padding: 7rem clamp(1.5rem, 6vw, 5rem) 9rem;
          position: relative;
        }

        /* ━━ Top wave — barely-mint peeling into dark ━━━━━━━━━━━━━━━━━━ */
        .ex-top-wave {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 88px;
          overflow: hidden;
          line-height: 0;
          pointer-events: none;
        }

        .ex-top-wave svg {
          display: block;
          width: 100%;
          height: 88px;
          fill: #F4F1EA;
        }

        /* ━━ Section header — centered editorial intro ━━━━━━━━━━━━━━━━━ */
        .ex-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ex-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          margin: 0;
        }

        .ex-heading {
          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 1.0;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .ex-eyebrow { color: #34D399; }
        .ex-heading  { color: #F9FDF9; }

        .ex-subtext {
          font-size: 0.9375rem;
          line-height: 1.85;
          color: rgba(249, 253, 249, 0.48);
          margin: 0;
        }

        /* ━━ Cluster ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-cluster {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
        }

        /* ━━ ROW 1 — Hero card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-hero-card {
          position: relative;
          height: 540px;
          border-radius: 1.75rem;
          overflow: hidden;
          cursor: pointer;
        }

        .ex-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          display: block;
          transition: transform 1.2s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .ex-hero-card:hover .ex-hero-img {
          transform: scale(1.04);
        }

        .ex-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 16, 12, 0.92) 0%,
            rgba(8, 16, 12, 0.55) 38%,
            rgba(8, 16, 12, 0.15) 65%,
            transparent 100%
          );
        }

        .ex-hero-panel {
          position: absolute;
          bottom: 2.75rem;
          left: 2.75rem;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .ex-panel-title {
          font-size: clamp(2.5rem, 4vw, 4.25rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #F9FDF9;
          margin: 0;
        }

        .ex-panel-body {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(249, 253, 249, 0.65);
          margin: 0;
          max-width: 400px;
        }

        .ex-badge {
          position: absolute;
          top: 1.75rem;
          right: 1.75rem;
          background: rgba(249, 115, 22, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #F9FDF9;
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          border: 1px solid rgba(249, 253, 249, 0.18);
        }

        /* ━━ ROW 2 — 41 / 57 split ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-row-2 {
          display: grid;
          grid-template-columns: 41fr 57fr;
          gap: 1.125rem;
          height: 420px;
        }

        /* ━━ Individual experience cards ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-card {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          cursor: pointer;
        }

        .ex-card > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          display: block;
          transition: transform 1s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .ex-card:hover > img {
          transform: scale(1.04);
        }

        .ex-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 16, 12, 0.88) 0%,
            rgba(8, 16, 12, 0.45) 42%,
            transparent 72%
          );
        }

        /* Waterfalls — sun yellow colour block */
        .ex-card--warm {
          background: #FCD34D;
        }

        .ex-warm-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            145deg,
            #f5c518 0%,
            #FCD34D 40%,
            #fde47a 65%,
            #FCD34D 85%,
            #e8b800 100%
          );
        }

        /* Ghost watermark text — jungle tint on yellow */
        .ex-ghost {
          position: absolute;
          bottom: -0.5rem;
          right: -1rem;
          font-size: clamp(5rem, 12vw, 10rem);
          line-height: 1;
          color: rgba(6, 78, 59, 0.1);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
        }

        /* ━━ Card content ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .ex-card-content--warm {
          height: 100%;
          justify-content: flex-end;
        }

        /* ━━ Card number accents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-num {
          position: absolute;
          top: 1.5rem;
          left: 2rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: rgba(244, 241, 234, 0.22);
          pointer-events: none;
          user-select: none;
        }

        .ex-num--dark {
          color: rgba(6, 78, 59, 0.22);
        }

        /* ━━ Shared type styles ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-cat {
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .ex-cat--dark {
          color: rgba(6, 78, 59, 0.62);
        }

        .ex-card-title {
          font-size: clamp(1.5rem, 2.2vw, 2.15rem);
          line-height: 1.06;
          letter-spacing: -0.01em;
          color: #F9FDF9;
          margin: 0;
        }

        .ex-card-title--dark {
          color: #064E3B;
        }

        .ex-card-body {
          font-size: 0.875rem;
          line-height: 1.75;
          color: rgba(249, 253, 249, 0.6);
          margin: 0;
          max-width: 320px;
        }

        .ex-card-body--dark {
          color: rgba(6, 78, 59, 0.62);
        }

        .ex-tag {
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.35);
          margin: 0;
        }

        .ex-tag--dark {
          color: rgba(6, 78, 59, 0.48);
        }

        /* ━━ CTA strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-cta-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          background: rgba(52, 211, 153, 0.06);
          border: 1px solid rgba(52, 211, 153, 0.14);
          border-radius: 1.5rem;
          padding: 2rem 2.75rem;
          margin-top: 0.25rem;
        }

        .ex-cta-copy {
          font-size: clamp(1.1rem, 1.8vw, 1.6rem);
          font-style: italic;
          color: rgba(249, 253, 249, 0.78);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .ex-cta-btn {
          flex-shrink: 0;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: #F9FDF9;
          border: 1.5px solid rgba(52, 211, 153, 0.45);
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          transition: border-color 0.22s, background 0.22s, color 0.22s;
          white-space: nowrap;
          display: inline-block;
        }

        .ex-cta-btn:hover {
          border-color: #34D399;
          background: #34D399;
          color: #064E3B;
        }

        /* ━━ Bottom wave ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ex-bottom-wave {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 88px;
          overflow: hidden;
          line-height: 0;
          pointer-events: none;
        }

        .ex-bottom-wave svg {
          display: block;
          width: 100%;
          height: 88px;
          transform: scaleY(-1);
          fill: #F9FDF9;
        }

        /* ━━ Tablet (768 – 1023px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .ex-section {
            padding: 6rem clamp(1.5rem, 5vw, 3.5rem) 7rem;
          }

          .ex-hero-card {
            height: 480px;
          }

          .ex-row-2 {
            grid-template-columns: 1fr;
            height: auto;
          }

          .ex-row-2 .ex-card {
            height: 360px;
          }

          .ex-card--warm {
            height: 320px;
          }

          .ex-cta-strip {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
        }

        /* ━━ Mobile (< 640px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .ex-section {
            padding: 5rem 1.25rem 7rem;
          }

          .ex-hero-card {
            height: 400px;
            border-radius: 1.25rem;
          }

          .ex-hero-panel {
            left: 1.5rem;
            bottom: 1.75rem;
            right: 1.5rem;
            max-width: 100%;
          }

          .ex-badge {
            top: 1.25rem;
            right: 1.25rem;
          }

          .ex-row-2 .ex-card {
            height: 300px;
            border-radius: 1.25rem;
          }

          .ex-card--warm {
            height: 280px;
            border-radius: 1.25rem;
          }

          .ex-card-content {
            padding: 1.5rem 1.75rem;
          }

          .ex-cta-strip {
            padding: 1.75rem;
            border-radius: 1.25rem;
          }

          .ex-ghost {
            font-size: 5rem;
          }
        }
      `}</style>
    </section>
  )
}
