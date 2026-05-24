import { useInView } from '../../hooks/useInView'
import { MARKETING_ROOMS } from '../../data/marketingRooms'

const GECKO_ICON = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1778622715/background-removed_kzu281.png'
const DIVIDER_COUNT = 20

export function HomeRoomsSection() {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <section
      ref={ref}
      id="rooms"
      className={`rs-section scroll-mt-24 relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
      aria-labelledby="rooms-heading"
    >
      {/* ── Gecko logo divider — separates packages from Stay With Us ── */}
      <div className="rs-divider" aria-hidden>
        <div className="rs-divider-track">
          {Array.from({ length: DIVIDER_COUNT }).map((_, i) => (
            <div key={i} className="rs-divider-cell">
              <img src={GECKO_ICON} alt="" className="rs-divider-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="rs-inner">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="rs-header reveal">
          <p className="rs-eyebrow font-label">Stay with us</p>
          <h2 id="rooms-heading" className="rs-heading font-display">
            Rooms built for<br />real travel rhythms.
          </h2>
          <p className="rs-subtext">
            From social dorms to private suites — spaces tuned for airflow,
            deep sleep, and quick turnarounds between waves.
          </p>
        </header>

        {/* ── Room grid ───────────────────────────────────────────────── */}
        <ul className="rs-grid" role="list">
          {MARKETING_ROOMS.map((room, i) => (
            <li key={room.id} className={`room-item room-item--${room.id} reveal stagger-${Math.min(i + 2, 5)}`}>
              <article className="room-card" aria-labelledby={`room-name-${room.id}`}>
                <div className="room-img-wrap">
                  <img
                    src={room.imageSrc}
                    alt={room.imageAlt}
                    loading="lazy"
                    className="room-img"
                  />
                  <div className="room-img-overlay" aria-hidden />
                </div>
                <div className="room-content">
                  <div className="room-badges">
                    <span className="room-type font-label">{room.roomType}</span>
                    <span className="room-price font-label">
                      From ${room.fromPriceUsd}
                      <span className="room-price-unit"> / night</span>
                    </span>
                  </div>
                  <h3 id={`room-name-${room.id}`} className="room-name font-display">
                    {room.name}
                  </h3>
                  <p className="room-tagline font-label">{room.tagline}</p>
                  <p className="room-desc">{room.description}</p>
                  <ul className="room-highlights" role="list">
                    {room.highlights.map((item) => (
                      <li key={item} className="room-highlight font-label">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="room-capacity font-label">{room.capacityLabel}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* ── CTA strip ───────────────────────────────────────────────── */}
        <div className="rs-cta">
          <div>
            <p className="rs-cta-eyebrow font-label">Live availability</p>
            <p className="rs-cta-body">
              Ready when you are — lock in dates and see real pricing in seconds.
            </p>
          </div>
          <a href="/booking" className="rs-cta-btn font-label">
            Search availability →
          </a>
        </div>

      </div>

      <style>{`

        /* ━━ Gecko logo divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rs-divider {
          background: #F9FDF9;
          overflow: hidden;
        }
        .rs-divider-track {
          display: grid;
          grid-template-columns: repeat(20, 1fr);
          width: 100%;
          padding: 0.65rem 0;
        }
        .rs-divider-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 1px;
        }
        .rs-divider-icon {
          height: clamp(28px, 3.8vw, 54px);
          width: 100%;
          object-fit: contain;
          object-position: center;
          opacity: 0.42;
          display: block;
        }

        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rs-section {
          background: #F9FDF9;
          padding: 0 0 6rem;
        }

        .rs-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 5rem clamp(1.5rem, 6vw, 6rem) 0;
        }

        /* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rs-header {
          margin-bottom: 2.75rem;
        }

        .rs-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #F97316;
          margin: 0 0 1rem;
        }

        .rs-heading {
          font-size: clamp(2.5rem, 3.5vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          color: #064E3B;
          margin: 0 0 1.25rem;
        }

        .rs-subtext {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(6, 78, 59, 0.6);
          max-width: 500px;
          margin: 0;
        }

        /* ━━ Grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rs-grid {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: grid;
          grid-template-columns: 58fr 40fr;
          grid-template-rows: 560px 520px;
          gap: 1.25rem;
          grid-template-areas:
            "gecko-dorm la-lora"
            "rocamar    paraiso";
        }

        .room-item--gecko-dorm { grid-area: gecko-dorm; }
        .room-item--la-lora    { grid-area: la-lora; }
        .room-item--paraiso    { grid-area: paraiso; }
        .room-item--rocamar    { grid-area: rocamar; }

        /* ━━ Base card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .room-card {
          width: 100%;
          height: 100%;
          border-radius: 1.75rem;
          overflow: hidden;
          position: relative;
        }

        .room-img-wrap {
          position: relative;
          overflow: hidden;
        }

        .room-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .room-card:hover .room-img {
          transform: scale(1.045);
        }

        .room-img-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* ━━ Shared badges ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .room-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .room-type,
        .room-price {
          display: inline-flex;
          align-items: center;
          padding: 0.32rem 0.9rem;
          border-radius: 100px;
          font-size: 0.52rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          line-height: 1;
        }

        .room-type {
          background: #34D399;
          color: #064E3B;
        }

        .room-price {
          background: rgba(249, 253, 249, 0.92);
          color: #064E3B;
        }

        .room-price-unit {
          opacity: 0.55;
        }

        /* ━━ Shared highlights ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .room-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .room-highlight {
          font-size: 0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          border: 1px solid;
          line-height: 1;
        }

        /* ━━ CARD 1 — gecko-dorm: dark bg, image top, content below ━━━ */
        .room-item--gecko-dorm .room-card {
          display: flex;
          flex-direction: column;
          background: #064E3B;
        }

        .room-item--gecko-dorm .room-img-wrap {
          flex: 0 0 56%;
        }

        .room-item--gecko-dorm .room-img-overlay {
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(6, 78, 59, 0.5) 100%
          );
        }

        .room-item--gecko-dorm .room-content {
          flex: 1;
          padding: 1.75rem 2.5rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow: hidden;
        }

        .room-item--gecko-dorm .room-name {
          font-size: clamp(1.75rem, 2vw, 2.25rem);
          line-height: 1.1;
          color: #F9FDF9;
          margin: 0.25rem 0 0;
        }

        .room-item--gecko-dorm .room-tagline {
          font-size: 0.57rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .room-item--gecko-dorm .room-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: rgba(249, 253, 249, 0.52);
          margin: 0;
          flex: 1;
        }

        .room-item--gecko-dorm .room-highlight {
          border-color: rgba(249, 253, 249, 0.14);
          color: rgba(249, 253, 249, 0.58);
          background: rgba(249, 253, 249, 0.06);
        }

        .room-item--gecko-dorm .room-capacity {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.28);
          margin: 0;
        }

        /* ━━ CARD 2 — la-lora: full-bleed, content floats at bottom ━━━ */
        .room-item--la-lora .room-img-wrap {
          position: absolute;
          inset: 0;
        }

        .room-item--la-lora .room-img {
          object-position: center 20%;
        }

        .room-item--la-lora .room-img-overlay {
          background: linear-gradient(
            to top,
            rgba(8, 15, 12, 0.94) 0%,
            rgba(8, 15, 12, 0.48) 48%,
            transparent 72%
          );
        }

        .room-item--la-lora .room-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          z-index: 2;
        }

        .room-item--la-lora .room-name {
          font-size: clamp(1.6rem, 2.2vw, 2rem);
          line-height: 1.1;
          color: #F9FDF9;
          margin: 0.25rem 0 0;
        }

        .room-item--la-lora .room-tagline {
          font-size: 0.57rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .room-item--la-lora .room-desc {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: rgba(249, 253, 249, 0.6);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .room-item--la-lora .room-highlight {
          border-color: rgba(249, 253, 249, 0.2);
          color: rgba(249, 253, 249, 0.72);
          background: rgba(2, 20, 12, 0.4);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .room-item--la-lora .room-capacity {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.35);
          margin: 0;
        }

        /* ━━ CARD 3 — rocamar: full-bleed, content floats at bottom ━━━━ */
        .room-item--rocamar .room-img-wrap {
          position: absolute;
          inset: 0;
        }

        .room-item--rocamar .room-img {
          object-position: center 25%;
        }

        .room-item--rocamar .room-img-overlay {
          background: linear-gradient(
            to top,
            rgba(8, 15, 12, 0.94) 0%,
            rgba(8, 15, 12, 0.48) 48%,
            transparent 72%
          );
        }

        .room-item--rocamar .room-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          z-index: 2;
        }

        .room-item--rocamar .room-name {
          font-size: clamp(1.6rem, 2.2vw, 2rem);
          line-height: 1.1;
          color: #F9FDF9;
          margin: 0.25rem 0 0;
        }

        .room-item--rocamar .room-tagline {
          font-size: 0.57rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .room-item--rocamar .room-desc {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: rgba(249, 253, 249, 0.6);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .room-item--rocamar .room-highlight {
          border-color: rgba(249, 253, 249, 0.2);
          color: rgba(249, 253, 249, 0.72);
          background: rgba(2, 20, 12, 0.4);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .room-item--rocamar .room-capacity {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.35);
          margin: 0;
        }

        /* ━━ CARD 4 — paraiso: mint frame, inset image, dark panel ━━━━ */
        .room-item--paraiso .room-card {
          display: flex;
          flex-direction: column;
          background: #ECFDF5;
        }

        .room-item--paraiso .room-img-wrap {
          margin: 1.25rem 1.25rem 0;
          border-radius: 1.25rem;
          flex: 0 0 calc(52% - 1.25rem);
        }

        .room-item--paraiso .room-img {
          object-position: center 30%;
          border-radius: 1.25rem; /* match wrap */
        }

        .room-item--paraiso .room-img-overlay {
          display: none;
        }

        .room-item--paraiso .room-content {
          flex: 1;
          background: #064E3B;
          padding: 1.75rem 2rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow: hidden;
          margin-top: 0.75rem;
          /* Outer card overflow:hidden clips bottom corners */
        }

        .room-item--paraiso .room-name {
          font-size: clamp(1.6rem, 2vw, 2rem);
          line-height: 1.1;
          color: #F9FDF9;
          margin: 0.25rem 0 0;
        }

        .room-item--paraiso .room-tagline {
          font-size: 0.57rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0;
        }

        .room-item--paraiso .room-desc {
          font-size: 0.875rem;
          line-height: 1.7;
          color: rgba(249, 253, 249, 0.52);
          margin: 0;
          flex: 1;
        }

        .room-item--paraiso .room-highlight {
          border-color: rgba(249, 253, 249, 0.14);
          color: rgba(249, 253, 249, 0.58);
          background: rgba(249, 253, 249, 0.06);
        }

        .room-item--paraiso .room-capacity {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.28);
          margin: 0;
        }

        /* ━━ CTA strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .rs-cta {
          background: #064E3B;
          border-radius: 1.5rem;
          padding: 2rem 2.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 20px 60px rgba(6, 78, 59, 0.18);
        }

        .rs-cta-eyebrow {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(249, 253, 249, 0.38);
          margin: 0 0 0.35rem;
        }

        .rs-cta-body {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: rgba(249, 253, 249, 0.88);
          margin: 0;
        }

        .rs-cta-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          border: 1.5px solid rgba(52, 211, 153, 0.4);
          background: rgba(52, 211, 153, 0.08);
          color: #F9FDF9;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .rs-cta-btn:hover {
          background: #34D399;
          color: #064E3B;
          border-color: #34D399;
        }

        /* ━━ Tablet (768–1023 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .rs-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 440px 440px;
          }

          .rs-cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .rs-section {
            padding: 4rem 0 5rem;
          }

          .rs-heading {
            font-size: 2.25rem;
          }

          .rs-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas:
              "gecko-dorm"
              "la-lora"
              "rocamar"
              "paraiso";
          }

          .room-item--gecko-dorm,
          .room-item--rocamar,
          .room-item--paraiso {
            min-height: 480px;
          }

          .room-item--la-lora {
            min-height: 520px;
          }

          /* paraiso: reduce inset margin on mobile */
          .room-item--paraiso .room-img-wrap {
            margin: 1rem 1rem 0;
            flex: 0 0 calc(48% - 1rem);
          }

          .rs-cta {
            border-radius: 1.25rem;
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
