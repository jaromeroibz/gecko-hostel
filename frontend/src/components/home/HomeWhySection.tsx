// Surf session at golden hour — sets the outdoor lifestyle mood
const IMG_SURF =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1779036019/AZC_9979_gzhuvd.jpg'

// Bonfire at sunset — community, social energy, warmth
const IMG_BONFIRE =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1779039282/kimson-doan-AZMmUy2qL6A-unsplash_pwv13o.jpg'

export function HomeWhySection() {
  return (
    <section
      id="why-gecko"
      className="why-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      aria-labelledby="why-heading"
    >
      <div className="why-inner">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="why-header">
          <p className="why-eyebrow font-label uppercase">Why Gecko Surf House</p>
          <h2 id="why-heading" className="why-heading font-display">
            Some places<br />just have it.
          </h2>
        </header>

        {/* ── ACT 1 — Hero image + manifesto panel ───────────────────── */}
        <div className="why-act1">

          {/* Left: cinematic image with floating terracotta badge */}
          <div className="why-hero">
            <img
              src={IMG_SURF}
              alt="Surfer at golden hour in Santa Teresa, Costa Rica"
              loading="lazy"
              className="why-hero-img"
            />
            <div className="why-hero-overlay" aria-hidden />

            {/* Floating badge — terracotta, bottom-left */}
            <div className="why-badge">
              <span className="why-badge-num font-display">3</span>
              <span className="why-badge-label font-label">minutes to Carmen Beach</span>
            </div>
          </div>

          {/* Right: dark manifesto panel */}
          <div className="why-panel">
            <p className="why-panel-eyebrow font-label uppercase">The Gecko difference</p>

            <blockquote className="why-pullquote font-display">
              "Hard to explain until you're around the fire at midnight, swapping stories with someone from Norway about the wave you both caught at dawn."
            </blockquote>

            <p className="why-panel-body">
              A 3-minute walk from the break. A backyard that pulls strangers together.
              People from everywhere who somehow feel like they've always known each other.
              Santa Teresa does something to you — Gecko makes sure you feel it.
            </p>

            <div className="why-divider" aria-hidden />

            <p className="why-panel-stat font-display">
              12+ nationalities.<br />One backyard.
            </p>
          </div>
        </div>

        {/* ── ACT 2 — Three differentiator cards ─────────────────────── */}
        <div className="why-trio">

          {/* Card 1 — Community (full-bleed image) */}
          <div className="why-community">
            <img
              src={IMG_BONFIRE}
              alt="Friends around a beach bonfire at Gecko Surf House"
              loading="lazy"
              className="why-community-img"
            />
            <div className="why-community-overlay" aria-hidden />
            <div className="why-community-content">
              <p className="why-community-label font-label uppercase">Community</p>
              <h3 className="why-community-title font-display">
                Strangers become crew.
              </h3>
              <p className="why-community-copy">
                Six countries around one fire. Shared waves, shared meals, stories
                that keep going long after the sun goes down.
              </p>
            </div>
          </div>

          {/* Card 2 — Stat (terracotta) */}
          <div className="why-stat">
            <span className="why-stat-num font-display">3</span>
            <span className="why-stat-label font-label uppercase">min to the water</span>
            <p className="why-stat-copy">
              Close enough to paddle out before the crowd even wakes up.
            </p>
          </div>

          {/* Card 3 — Soul (dark, ghost watermark) */}
          <div className="why-soul">
            <span className="why-soul-ghost font-display" aria-hidden>soul</span>
            <div className="why-soul-content">
              <h3 className="why-soul-title font-display">
                Run by surfers.<br />Loved by travelers.
              </h3>
              <p className="why-soul-copy">
                We've been here long enough to know where the swell lines up,
                where the best tacos are, and why nobody ever leaves on time.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`

        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .why-section {
          background: #e6e1d6;
          padding: 6rem 0 7rem;
        }

        .why-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 6rem);
        }

        /* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .why-header {
          margin-bottom: 2.75rem;
        }

        .why-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          color: #b85c3a;
          margin: 0 0 1.1rem;
        }

        .why-heading {
          font-size: clamp(3rem, 4.5vw, 5.5rem);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #142923;
          margin: 0;
        }

        /* ━━ ACT 1 — Hero + Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .why-act1 {
          display: grid;
          grid-template-columns: 57fr 43fr;
          gap: 1.25rem;
          height: 560px;
        }

        /* Hero image card */
        .why-hero {
          position: relative;
          border-radius: 1.75rem;
          overflow: hidden;
        }

        .why-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          transition: transform 0.9s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .why-hero:hover .why-hero-img {
          transform: scale(1.04);
        }

        .why-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 20, 15, 0.72) 0%,
            rgba(10, 20, 15, 0.12) 52%,
            transparent 75%
          );
        }

        /* Floating terracotta badge */
        .why-badge {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          background: #b85c3a;
          border-radius: 1.25rem;
          padding: 1.25rem 1.75rem;
          z-index: 2;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 12px 40px rgba(184, 92, 58, 0.4);
        }

        .why-badge-num {
          display: block;
          font-size: 2.75rem;
          line-height: 1;
          color: #f4f1ea;
        }

        .why-badge-label {
          display: block;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: rgba(244, 241, 234, 0.7);
          margin-top: 0.3rem;
        }

        /* Dark manifesto panel */
        .why-panel {
          background: #142923;
          border-radius: 1.75rem;
          padding: 3rem 2.75rem 3.5rem;
          display: flex;
          flex-direction: column;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 80px rgba(20, 41, 35, 0.2);
          overflow: hidden;
        }

        .why-panel-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          color: #b85c3a;
          margin: 0 0 1.75rem;
        }

        .why-pullquote {
          font-size: clamp(1.2rem, 1.6vw, 1.55rem);
          font-style: italic;
          line-height: 1.45;
          color: #f4f1ea;
          margin: 0 0 1.75rem;
          flex: 1;
        }

        .why-panel-body {
          font-size: 0.9rem;
          line-height: 1.85;
          color: rgba(244, 241, 234, 0.55);
          margin: 0 0 2rem;
        }

        .why-divider {
          height: 1px;
          background: rgba(244, 241, 234, 0.1);
          margin-bottom: 1.75rem;
        }

        .why-panel-stat {
          font-size: clamp(1.25rem, 1.6vw, 1.65rem);
          line-height: 1.25;
          color: rgba(244, 241, 234, 0.88);
          font-style: italic;
          margin: 0;
        }

        /* ━━ ACT 2 — Trio ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .why-trio {
          display: grid;
          grid-template-columns: 45fr 22fr 33fr;
          gap: 1.25rem;
          height: 380px;
          margin-top: 1.25rem;
        }

        /* Community card — full-bleed image */
        .why-community {
          position: relative;
          border-radius: 1.75rem;
          overflow: hidden;
        }

        .why-community-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          display: block;
          transition: transform 0.9s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .why-community:hover .why-community-img {
          transform: scale(1.04);
        }

        .why-community-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 15, 12, 0.92) 0%,
            rgba(8, 15, 12, 0.45) 48%,
            transparent 72%
          );
        }

        .why-community-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 2.25rem 2.25rem;
          z-index: 2;
        }

        .why-community-label {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          color: #b85c3a;
          margin: 0 0 0.65rem;
        }

        .why-community-title {
          font-size: clamp(1.5rem, 1.9vw, 1.9rem);
          line-height: 1.1;
          color: #f4f1ea;
          margin: 0 0 0.75rem;
        }

        .why-community-copy {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: rgba(244, 241, 234, 0.62);
          margin: 0;
        }

        /* Stat card — terracotta */
        .why-stat {
          background: #b85c3a;
          border-radius: 1.75rem;
          padding: 2.5rem 1.75rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 24px 80px rgba(184, 92, 58, 0.28);
        }

        .why-stat-num {
          display: block;
          font-size: clamp(4rem, 5.5vw, 6.5rem);
          line-height: 1;
          color: #f4f1ea;
          margin-bottom: 0.3rem;
        }

        .why-stat-label {
          display: block;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: rgba(244, 241, 234, 0.62);
          margin-bottom: 1.25rem;
        }

        .why-stat-copy {
          font-size: 0.85rem;
          line-height: 1.65;
          color: rgba(244, 241, 234, 0.78);
          margin: 0;
        }

        /* Soul card — dark with ghost watermark */
        .why-soul {
          background: #142923;
          border-radius: 1.75rem;
          padding: 2.5rem 2.25rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 80px rgba(20, 41, 35, 0.18);
        }

        /* Ghost watermark */
        .why-soul-ghost {
          position: absolute;
          top: -0.5rem;
          left: -0.5rem;
          font-size: clamp(5rem, 7vw, 9rem);
          line-height: 1;
          color: rgba(244, 241, 234, 0.045);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .why-soul-content {
          position: relative;
          z-index: 2;
        }

        .why-soul-title {
          font-size: clamp(1.35rem, 1.7vw, 1.75rem);
          line-height: 1.15;
          color: #f4f1ea;
          margin: 0 0 0.9rem;
        }

        .why-soul-copy {
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(244, 241, 234, 0.52);
          margin: 0;
        }

        /* ━━ Tablet (768–1023 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .why-act1 {
            grid-template-columns: 1fr;
            height: auto;
          }

          .why-hero {
            height: 420px;
          }

          .why-panel {
            padding: 2.5rem 2.25rem 3rem;
          }

          .why-trio {
            grid-template-columns: 1fr 1fr;
            height: auto;
          }

          .why-community {
            grid-column: 1 / -1;
            height: 340px;
          }

          .why-stat {
            height: 280px;
          }

          .why-soul {
            height: 280px;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .why-section {
            padding: 5rem 0 6rem;
          }

          .why-heading {
            font-size: 3rem;
          }

          .why-act1 {
            gap: 1rem;
          }

          .why-hero {
            height: 360px;
          }

          .why-trio {
            grid-template-columns: 1fr;
            gap: 1rem;
            height: auto;
          }

          .why-community {
            grid-column: auto;
            height: 320px;
          }

          .why-stat {
            height: 220px;
          }

          .why-soul {
            height: auto;
            padding: 2rem 1.75rem;
          }
        }
      `}</style>
    </section>
  )
}
