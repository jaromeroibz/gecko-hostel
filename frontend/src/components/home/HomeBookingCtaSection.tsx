import { Link } from 'react-router-dom'

// Surfer paddling at dusk — deep moody blue, cinematic
const CTA_BG =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1779036018/AZC_9775_bnnbdm.jpg'

export function HomeBookingCtaSection() {
  return (
    <section
      id="booking-cta"
      className="cta-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      aria-labelledby="cta-heading"
    >

      {/* ── Cinematic background ─────────────────────────────────────── */}
      <div className="cta-backdrop" aria-hidden>
        <img src={CTA_BG} alt="" className="cta-bg-img" />
        {/* Heavy dark gradient — light at sky, deep at ground */}
        <div className="cta-overlay" />
        {/* Warm amber bloom — evokes golden hour over water */}
        <div className="cta-overlay-warm" />
        {/* Side vignettes — darken edges where content lives, keep center open */}
        <div className="cta-overlay-sides" />
      </div>

      {/* ── Ghost watermark ──────────────────────────────────────────── */}
      <span className="cta-ghost font-display" aria-hidden>surf</span>

      {/* ── Bottom divider — same terracotta gradient used across sections */}
      <div className="cta-divider" aria-hidden />

      {/* ── Bottom content grid ──────────────────────────────────────── */}
      <div className="cta-inner">

        {/* Left — editorial headline cluster */}
        <div className="cta-left">
          <p className="cta-eyebrow font-label uppercase">
            Santa Teresa · Costa Rica
          </p>

          <h2 id="cta-heading" className="cta-heading font-display">
            Your next<br />
            morning<br />
            <em>starts here.</em>
          </h2>

          <p className="cta-body">
            3 minutes from the break. Hot coffee before the crowd wakes up.
            A backyard that turns strangers into crew.
            The only thing left is your room.
          </p>
        </div>

        {/* Right — floating cream booking panel */}
        <div className="cta-panel">

          {/* Terracotta top accent */}
          <div className="cta-panel-bar" aria-hidden />

          <p className="cta-panel-eyebrow font-label uppercase">
            Reserve your stay
          </p>

          <p className="cta-panel-heading font-display">
            Rooms fill fast.<br />
            <em>Don't wait.</em>
          </p>

          <div className="cta-panel-divider" aria-hidden />

          <p className="cta-panel-note font-label">
            Real-time availability · Secure booking
          </p>

          <Link
            to="/booking"
            className="cta-btn-primary font-label"
          >
            Book your room
          </Link>

        </div>
      </div>

      <style>{`

        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-section {
          background: #0c1e18;
          min-height: 90vh;
          display: flex;
          align-items: flex-end;
          padding-bottom: 7rem;
          overflow: hidden;
        }

        /* ━━ Background layers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .cta-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          transform: scale(1.04);
          transition: transform 16s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .cta-section:hover .cta-bg-img {
          transform: scale(1.07);
        }

        /* Gradient: sky open, ground deepens — lighter overall to let surfer breathe */
        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(12, 30, 24, 0.12)  0%,
            rgba(12, 30, 24, 0.35) 38%,
            rgba(12, 30, 24, 0.78) 72%,
            rgba(12, 30, 24, 0.96) 100%
          );
        }

        /* Warm radial glow — golden hour at the horizon */
        .cta-overlay-warm {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 62% 18%,
            rgba(184, 92, 58, 0.16) 0%,
            transparent 52%
          );
        }

        /* Side vignettes — darken left & right edges for text legibility,
           leave the center open so the surfer shows clearly */
        .cta-overlay-sides {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(12, 30, 24, 0.72) 0%,
            rgba(12, 30, 24, 0.0)  28%,
            rgba(12, 30, 24, 0.0)  72%,
            rgba(12, 30, 24, 0.72) 100%
          );
        }

        /* ━━ Ghost watermark ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-ghost {
          position: absolute;
          bottom: -4rem;
          right: -2rem;
          font-size: clamp(8rem, 18vw, 21rem);
          line-height: 1;
          color: rgba(244, 241, 234, 0.028);
          pointer-events: none;
          user-select: none;
          font-style: italic;
          white-space: nowrap;
          z-index: 1;
        }

        /* ━━ Content — spread to edges, surfer centre-stage ━━━━━━━━━━━ */
        .cta-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 clamp(2rem, 5vw, 5.5rem);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
        }

        /* ━━ Left — editorial headline ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-left {
          max-width: 420px;
          flex-shrink: 0;
          padding-bottom: 0.5rem;
        }

        .cta-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          color: #b85c3a;
          margin: 0 0 2rem;
        }

        .cta-heading {
          font-size: clamp(3.5rem, 6.2vw, 7.75rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #f4f1ea;
          margin: 0 0 2.25rem;
        }

        .cta-heading em {
          font-style: italic;
          color: rgba(244, 241, 234, 0.52);
        }

        .cta-body {
          font-size: 1rem;
          line-height: 1.9;
          color: rgba(244, 241, 234, 0.42);
          max-width: 380px;
          margin: 0;
        }

        /* ━━ Floating cream panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-panel {
          max-width: 360px;
          width: 100%;
          flex-shrink: 0;
          background: #f4f1ea;
          border-radius: 2rem;
          padding: 3rem 2.75rem 3.25rem;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 60px 140px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(0, 0, 0, 0.06);
        }

        /* Terracotta top accent bar */
        .cta-panel-bar {
          position: absolute;
          top: 0;
          left: 2.75rem;
          right: 2.75rem;
          height: 2.5px;
          background: linear-gradient(
            to right,
            #b85c3a,
            rgba(184, 92, 58, 0)
          );
          border-radius: 100px;
        }

        .cta-panel-eyebrow {
          font-size: 0.52rem;
          letter-spacing: 0.28em;
          color: #b85c3a;
          margin: 0 0 1.25rem;
        }

        .cta-panel-heading {
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          line-height: 1.15;
          color: #142923;
          margin: 0 0 1.75rem;
          font-family: 'Comfortaa', cursive, sans-serif;
        }

        .cta-panel-heading em {
          font-style: italic;
          color: rgba(20, 41, 35, 0.4);
        }

        .cta-panel-divider {
          height: 1px;
          background: rgba(20, 41, 35, 0.09);
          margin-bottom: 1.25rem;
        }

        .cta-panel-note {
          font-size: 0.5rem;
          letter-spacing: 0.16em;
          color: rgba(20, 41, 35, 0.32);
          text-transform: uppercase;
          margin: 0 0 1.75rem;
        }

        /* ━━ Button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* Primary — terracotta solid */
        .cta-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #b85c3a;
          color: #f4f1ea;
          border-radius: 1.25rem;
          padding: 1.1rem 2rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition:
            background 0.25s ease,
            transform 0.25s cubic-bezier(0.25, 0, 0.1, 1),
            box-shadow 0.25s ease;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 8px 28px rgba(184, 92, 58, 0.42);
        }

        .cta-btn-primary:hover {
          background: #c96940;
          transform: translateY(-2px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 16px 48px rgba(184, 92, 58, 0.54);
        }

        /* ━━ Bottom divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .cta-divider {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 4;
          background: linear-gradient(
            to right,
            rgba(184, 92, 58, 0)    0%,
            rgba(184, 92, 58, 0.65) 22%,
            rgba(184, 92, 58, 0.65) 78%,
            rgba(184, 92, 58, 0)    100%
          );
        }

        /* ━━ Tablet (768–1023 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .cta-section {
            min-height: 75vh;
            padding-bottom: 5rem;
          }

          /* Stack vertically — left on top, panel below */
          .cta-inner {
            flex-direction: column;
            justify-content: flex-end;
            gap: 2.5rem;
          }

          .cta-left {
            max-width: 100%;
          }

          .cta-panel {
            max-width: 100%;
          }

          .cta-heading {
            font-size: clamp(3rem, 8vw, 5.5rem);
          }

          .cta-body {
            max-width: 540px;
          }

          /* Restore even gradient on smaller screens */
          .cta-overlay-sides {
            display: none;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .cta-section {
            min-height: 80vh;
            padding-bottom: 3.5rem;
          }

          .cta-eyebrow {
            margin-bottom: 1.5rem;
          }

          .cta-heading {
            font-size: 3rem;
            margin-bottom: 1.75rem;
          }

          .cta-body {
            font-size: 0.9375rem;
            max-width: 100%;
          }

          .cta-panel {
            padding: 2.25rem 1.75rem 2.5rem;
          }

          .cta-panel-bar {
            left: 1.75rem;
            right: 1.75rem;
          }

          .cta-ghost {
            font-size: 6rem;
            right: -1rem;
            bottom: -1rem;
          }
        }
      `}</style>
    </section>
  )
}
