import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useInView } from '../../hooks/useInView'

const IMG_GROUP   = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1779036017/AZC_9199_vecrln.jpg'
const IMG_PRIVATE = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1779036017/AZC_8726_y1g3pn.jpg'

const GROUP_PLANS = [
  { id: 'single',  price: '$70'  },
  { id: 'three',   price: '$180', saveKey: 'surfServices.group.save30' },
  { id: 'five',    price: '$275', saveKey: 'surfServices.group.save75', highlight: true },
]

const PRIVATE_PLANS = [
  { id: 'oneOnOne',    price: '$100' },
  { id: 'semiPrivate', price: '$160' },
]

const INCLUDED_ITEMS = [
  { icon: '🏄', id: 'surfboard'  },
  { icon: '👕', id: 'rashguard'  },
  { icon: '☀️', id: 'sunscreen'  },
  { icon: '🍉', id: 'freshFruit' },
]

export function HomeSurfServicesSection() {
  const [ref, inView] = useInView<HTMLElement>()
  const { t } = useTranslation()
  return (
    <section
      ref={ref}
      className={`ss-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
      aria-label="Surf services"
    >
      <style>{`
        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-section {
          background: #F4F1EA;
          padding: 5.5rem clamp(1.25rem, 6vw, 6rem) 0;
        }

        /* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-header {
          max-width: 640px;
          margin: 0 auto 3.5rem;
          text-align: center;
        }
        .ss-eyebrow {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin-bottom: 1rem;
        }
        .ss-heading {
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: #064E3B;
          margin: 0 0 1.125rem;
        }
        .ss-subline {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(6, 78, 59, 0.6);
          max-width: 480px;
          margin: 0 auto;
        }

        /* ━━ Cards grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          max-width: 1080px;
          margin: 0 auto;
        }

        /* ━━ Card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-card {
          position: relative;
          border-radius: 1.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 560px;
          box-shadow: 0 20px 60px rgba(6, 78, 59, 0.14);
        }

        /* photo fills top portion */
        .ss-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          position: absolute;
          inset: 0;
          display: block;
          transition: transform 1s cubic-bezier(0.25, 0, 0.1, 1);
        }
        .ss-card:hover .ss-card-img {
          transform: scale(1.04);
        }

        /* cinematic gradient — photo visible top, dark panel at bottom */
        .ss-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(4, 28, 20, 0.96) 0%,
            rgba(6, 78, 59, 0.75) 42%,
            rgba(6, 78, 59, 0.1) 72%,
            transparent 100%
          );
        }

        /* content anchored to bottom */
        .ss-card-body {
          position: relative;
          z-index: 2;
          margin-top: auto;
          padding: 2rem 2rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ━━ Card header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-card-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #34D399;
          border: 1px solid rgba(52, 211, 153, 0.35);
          border-radius: 9999px;
          padding: 0.3rem 0.75rem;
          width: fit-content;
        }
        .ss-card-title {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #F4F1EA;
          line-height: 1.1;
          margin: 0;
        }

        /* ━━ Pricing rows ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-prices {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1rem;
        }
        .ss-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .ss-price-row:last-child {
          border-bottom: none;
        }
        .ss-price-row--highlight {
          margin: 0 -0.5rem;
          padding: 0.6rem 0.5rem;
          background: rgba(52, 211, 153, 0.1);
          border-radius: 0.5rem;
          border-bottom: none;
        }
        .ss-price-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .ss-price-label {
          font-size: 0.875rem;
          color: rgba(244, 241, 234, 0.8);
          font-weight: 400;
        }
        .ss-price-row--highlight .ss-price-label {
          color: #F4F1EA;
          font-weight: 500;
        }
        .ss-price-save {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #34D399;
          background: rgba(52,211,153,0.12);
          border-radius: 9999px;
          padding: 0.15rem 0.5rem;
        }
        .ss-price-value {
          font-size: 1rem;
          font-weight: 600;
          color: #F4F1EA;
          letter-spacing: -0.01em;
        }
        .ss-price-row--highlight .ss-price-value {
          color: #34D399;
        }

        /* ━━ CTA button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #F59E0B;
          color: #064E3B;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.75rem 1.625rem;
          border-radius: 9999px;
          text-decoration: none;
          width: fit-content;
          transition: background 0.18s, transform 0.12s;
        }
        .ss-cta:hover {
          background: #D97706;
          transform: translateY(-1px);
        }

        /* ━━ Included strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-included {
          margin-top: 1.25rem;
          background: #F4F1EA;
          border-top: 1px solid rgba(6,78,59,0.1);
          padding: 1.625rem clamp(1.25rem, 6vw, 6rem);
        }
        .ss-included-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem 2rem;
        }
        .ss-included-label {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(6,78,59,0.45);
          flex-shrink: 0;
        }
        .ss-included-divider {
          width: 1px;
          height: 1rem;
          background: rgba(6,78,59,0.15);
          flex-shrink: 0;
        }
        .ss-included-items {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.375rem 1.5rem;
          flex: 1;
        }
        .ss-included-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          color: rgba(6,78,59,0.75);
          font-weight: 500;
        }
        .ss-included-item span:first-child {
          font-size: 0.9rem;
        }
        .ss-included-duration {
          margin-left: auto;
          font-size: 0.6875rem;
          color: rgba(6,78,59,0.4);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* ━━ Video Analysis ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ss-video {
          background: #F4F1EA;
          padding: 2.75rem clamp(1.25rem, 6vw, 6rem) 4.5rem;
        }
        .ss-video-inner {
          max-width: 1080px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }
        .ss-video-left { flex: 1; }

        .ss-video-eyebrow {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #34D399;
          margin: 0 0 0.75rem;
        }
        .ss-video-heading {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: #064E3B;
          margin: 0 0 1rem;
        }
        .ss-video-desc {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(6,78,59,0.55);
          max-width: 500px;
          margin: 0 0 1.375rem;
        }
        .ss-video-perks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ss-video-perk {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: rgba(6,78,59,0.7);
        }
        .ss-video-perk-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #34D399;
          flex-shrink: 0;
        }

        .ss-video-right {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.375rem;
          text-align: center;
        }
        .ss-video-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }
        .ss-video-price-num {
          font-size: clamp(3.5rem, 5.5vw, 5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #064E3B;
          font-family: 'Comfortaa', cursive, sans-serif;
        }
        .ss-video-price-unit {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(6,78,59,0.4);
        }

        /* ━━ Tablet ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 767px) {
          .ss-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .ss-card {
            min-height: 480px;
          }
          .ss-card-body {
            padding: 1.625rem 1.625rem 1.875rem;
          }
          .ss-included-divider { display: none; }
          .ss-included-duration { margin-left: 0; }

          .ss-video-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }
          .ss-video-right {
            align-items: flex-start;
            text-align: left;
            flex-direction: row;
            align-items: center;
            gap: 2rem;
          }
        }

        @media (max-width: 479px) {
          .ss-section {
            padding-top: 4rem;
          }
          .ss-header {
            margin-bottom: 2.5rem;
          }
          .ss-card {
            min-height: 440px;
          }
          .ss-included {
            padding-top: 1.375rem;
            padding-bottom: 1.375rem;
          }
          .ss-video {
            padding-bottom: 3.5rem;
          }
          .ss-video-right {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="ss-header reveal">
        <p className="ss-eyebrow">{t('surfServices.eyebrow')}</p>
        <h2 className="ss-heading font-display">
          {t('surfServices.heading1')}<br />{t('surfServices.heading2')}
        </h2>
        <p className="ss-subline">{t('surfServices.subline')}</p>
      </div>

      {/* ── Cards ───────────────────────────────────────────────────────── */}
      <div className="ss-grid">

        {/* ── Card 1: Group Sessions ──────────────────────────────────── */}
        <div className="ss-card reveal stagger-2">
          <img
            className="ss-card-img"
            src={IMG_GROUP}
            alt="Group surf lesson in Santa Teresa, Costa Rica"
            loading="lazy"
          />
          <div className="ss-card-overlay" aria-hidden />
          <div className="ss-card-body">
            <span className="ss-card-pill">{t('surfServices.group.pill')}</span>
            <h3 className="ss-card-title font-display">{t('surfServices.group.title')}</h3>

            <div className="ss-prices">
              {GROUP_PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`ss-price-row${plan.highlight ? ' ss-price-row--highlight' : ''}`}
                >
                  <div className="ss-price-left">
                    <span className="ss-price-label">{t(`surfServices.group.${plan.id}`)}</span>
                    {plan.saveKey && (
                      <span className="ss-price-save">{t(plan.saveKey)}</span>
                    )}
                  </div>
                  <span className="ss-price-value">{plan.price}</span>
                </div>
              ))}
            </div>

            <Link to="/booking" className="ss-cta">
              {t('surfServices.group.cta')}
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14 }}>
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06L9.28 12.53a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Card 2: Private Coaching ─────────────────────────────────── */}
        <div className="ss-card reveal stagger-3">
          <img
            className="ss-card-img"
            src={IMG_PRIVATE}
            alt="Private surf coaching in Santa Teresa"
            loading="lazy"
          />
          <div className="ss-card-overlay" aria-hidden />
          <div className="ss-card-body">
            <span className="ss-card-pill">{t('surfServices.private.pill')}</span>
            <h3 className="ss-card-title font-display">{t('surfServices.private.title')}</h3>

            <div className="ss-prices">
              {PRIVATE_PLANS.map(plan => (
                <div key={plan.id} className="ss-price-row">
                  <span className="ss-price-label">{t(`surfServices.private.${plan.id}`)}</span>
                  <span className="ss-price-value">{plan.price}</span>
                </div>
              ))}
              <div className="ss-price-row" style={{ borderBottom: 'none', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(244,241,234,0.4)', lineHeight: 1.5 }}>
                  {t('surfServices.private.tagline')}
                </span>
              </div>
            </div>

            <Link to="/booking" className="ss-cta">
              {t('surfServices.private.cta')}
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14 }}>
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06L9.28 12.53a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

      </div>

      {/* ── Included strip ──────────────────────────────────────────────── */}
      <div className="ss-included">
        <div className="ss-included-inner">
          <span className="ss-included-label">{t('surfServices.included.label')}</span>
          <div className="ss-included-divider" aria-hidden />
          <div className="ss-included-items">
            {INCLUDED_ITEMS.map(item => (
              <span key={item.id} className="ss-included-item">
                <span>{item.icon}</span>
                <span>{t(`surfServices.included.${item.id}`)}</span>
              </span>
            ))}
          </div>
          <span className="ss-included-duration">{t('surfServices.included.duration')}</span>
        </div>
      </div>

      {/* ── Video Analysis ──────────────────────────────────────────────── */}
      <div className="ss-video reveal stagger-4">
        <div className="ss-video-inner">

          {/* Left — label + description + perks */}
          <div className="ss-video-left">
            <p className="ss-video-eyebrow font-label">{t('surfServices.video.eyebrow')}</p>
            <h3 className="ss-video-heading font-display">{t('surfServices.video.heading')}</h3>
            <p className="ss-video-desc">{t('surfServices.video.desc')}</p>
            <div className="ss-video-perks">
              {(['perk1', 'perk2', 'perk3'] as const).map(key => (
                <div key={key} className="ss-video-perk">
                  <span className="ss-video-perk-dot" aria-hidden />
                  {t(`surfServices.video.${key}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Right — price + CTA */}
          <div className="ss-video-right">
            <div className="ss-video-price">
              <span className="ss-video-price-num">$60</span>
              <span className="ss-video-price-unit font-label">{t('surfServices.video.priceUnit')}</span>
            </div>
            <Link to="/booking" className="ss-cta">
              {t('surfServices.video.cta')}
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14 }}>
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06L9.28 12.53a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}
