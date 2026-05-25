import { useTranslation } from 'react-i18next'
import { useInView } from '../../hooks/useInView'

// ─── Testimonials data (static — names/initials/source stay same) ─────────────
const REVIEWS = [
  { id: 'leon',              name: 'Léon',    initial: 'L', source: 'Airbnb' },
  { id: 'josefine',          name: 'Josefine', initial: 'J', source: 'Airbnb' },
  { id: 'kenzo',             name: 'Kenzo',   initial: 'K', source: 'Airbnb' },
  { id: 'josefine-statement', name: 'Josefine', initial: 'J', source: 'Airbnb' },
]

function Stars() {
  return <span className="tr-stars" aria-label="5 stars">★★★★★</span>
}

function Avatar({ initial }: { initial: string }) {
  return <span className="tr-avatar font-display" aria-hidden>{initial}</span>
}

export function HomeTestimonialsSection() {
  const [hero, right1, right2, statement] = REVIEWS
  const [ref, inView] = useInView<HTMLElement>()
  const { t } = useTranslation()

  const GECKO_ICON = 'https://res.cloudinary.com/doow0mhrm/image/upload/v1778622715/background-removed_kzu281.png'
  const DIVIDER_COUNT = 20

  return (
    <section
      ref={ref}
      id="testimonials"
      className={`tr-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
      aria-labelledby="tr-heading"
    >
      {/* ── Gecko logo divider strip ─────────────────────────────────── */}
      <div className="tr-divider" aria-hidden>
        <div className="tr-divider-track">
          {Array.from({ length: DIVIDER_COUNT }).map((_, i) => (
            <div key={i} className="tr-divider-cell">
              <img src={GECKO_ICON} alt="" className="tr-divider-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="tr-inner">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="tr-header reveal">
          <div className="tr-header-left">
            <p className="tr-eyebrow font-label uppercase">{t('testimonials.eyebrow')}</p>
            <h2 id="tr-heading" className="tr-heading font-display">
              {t('testimonials.heading1')}<br />{t('testimonials.heading2')}
            </h2>
            <p className="tr-subtext">{t('testimonials.subtext')}</p>
          </div>

          {/* Rating callout card */}
          <div className="tr-rating-card">
            <div className="tr-rating-stars"><Stars /></div>
            <p className="tr-rating-score font-display">{t('testimonials.allFiveStar')}</p>
            <p className="tr-rating-source font-label uppercase">
              {t('testimonials.verifiedReviews')}<br />{t('testimonials.sources')}
            </p>
          </div>
        </div>

        {/* ── Main cluster ─────────────────────────────────────────────── */}
        <div className="tr-cluster">

          {/* Left — Hero featured review */}
          <article className="tr-hero reveal stagger-2" aria-label={`Review by ${hero.name}`}>
            {/* Decorative oversized quote mark */}
            <span className="tr-deco-quote font-display" aria-hidden>"</span>

            {/* Quote */}
            <blockquote className="tr-hero-quote font-display">
              {t(`testimonials.reviews.${hero.id}.quote`)}
            </blockquote>

            {/* Divider */}
            <div className="tr-hero-divider" aria-hidden />

            {/* Reviewer */}
            <div className="tr-reviewer">
              <Avatar initial={hero.initial} />
              <div className="tr-reviewer-info">
                <Stars />
                <p className="tr-reviewer-name">{hero.name}</p>
                <p className="tr-reviewer-detail font-label uppercase">
                  {t(`testimonials.reviews.${hero.id}.detail`)}
                </p>
              </div>
              <span className="tr-source-badge font-label uppercase">
                via {hero.source}
              </span>
            </div>
          </article>

          {/* Right — stacked smaller reviews */}
          <div className="tr-col reveal stagger-3">

            {/* Card — sand */}
            <article className="tr-card tr-card--sand" aria-label={`Review by ${right1.name}`}>
              <blockquote className="tr-card-quote font-display">
                {t(`testimonials.reviews.${right1.id}.quote`)}
              </blockquote>
              <div className="tr-card-footer">
                <Avatar initial={right1.initial} />
                <div>
                  <Stars />
                  <p className="tr-card-name">{right1.name}</p>
                  <p className="tr-card-origin font-label uppercase">{t(`testimonials.reviews.${right1.id}.detail`)}</p>
                </div>
              </div>
            </article>

            {/* Card — terracotta */}
            <article className="tr-card tr-card--clay" aria-label={`Review by ${right2.name}`}>
              <blockquote className="tr-card-quote font-display">
                {t(`testimonials.reviews.${right2.id}.quote`)}
              </blockquote>
              <div className="tr-card-footer">
                <Avatar initial={right2.initial} />
                <div>
                  <Stars />
                  <p className="tr-card-name">{right2.name}</p>
                  <p className="tr-card-origin font-label uppercase">{t(`testimonials.reviews.${right2.id}.detail`)}</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>

      {/* ── Full-width statement strip ───────────────────────────────── */}
      <div className="tr-statement">
        <div className="tr-statement-inner">
          <span className="tr-statement-deco font-display" aria-hidden>"</span>
          <blockquote className="tr-statement-quote font-display">
            {t(`testimonials.reviews.${statement.id}.quote`)}
          </blockquote>
          <div className="tr-statement-byline">
            <Stars />
            <p className="tr-statement-name font-label uppercase">
              {statement.name} · {t(`testimonials.reviews.${statement.id}.detail`)}
            </p>
          </div>
        </div>
      </div>

      <style>{`

        /* ━━ Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-section {
          background: #F9FDF9;
          padding: 0 0 0;
        }

        /* ━━ Gecko logo divider ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-divider {
          background: #F9FDF9;
          overflow: hidden;
        }
        .tr-divider-track {
          display: grid;
          grid-template-columns: repeat(20, 1fr);
          width: 100%;
          padding: 0.65rem 0;
        }
        .tr-divider-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 1px;
        }
        .tr-divider-icon {
          height: clamp(28px, 3.8vw, 54px);
          width: 100%;
          object-fit: contain;
          object-position: center;
          opacity: 0.42;
          display: block;
        }

        .tr-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 6rem clamp(1.5rem, 6vw, 6rem) 0;
        }

        /* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: end;
          margin-bottom: 2.75rem;
        }

        .tr-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          color: #F97316;
          margin: 0 0 1.1rem;
        }

        .tr-heading {
          font-size: clamp(2.75rem, 4vw, 5rem);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #064E3B;
          margin: 0 0 1.1rem;
        }

        .tr-subtext {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(6, 78, 59, 0.55);
          max-width: 420px;
          margin: 0;
        }

        /* Rating callout card */
        .tr-rating-card {
          background: #064E3B;
          border-radius: 1.5rem;
          padding: 1.75rem 2rem 2rem;
          text-align: center;
          min-width: 190px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 20px 60px rgba(6,78,59,0.22);
        }

        .tr-rating-stars {
          font-size: 1.1rem;
          color: #34D399;
          letter-spacing: 0.1em;
          margin-bottom: 0.65rem;
        }

        .tr-rating-score {
          font-size: 1.35rem;
          line-height: 1.1;
          color: #F9FDF9;
          margin: 0 0 0.6rem;
          font-style: italic;
        }

        .tr-rating-source {
          font-size: 0.48rem;
          letter-spacing: 0.18em;
          color: rgba(249,253,249,0.42);
          margin: 0;
          line-height: 1.7;
        }

        /* ━━ Main cluster ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-cluster {
          display: grid;
          grid-template-columns: 59fr 39fr;
          gap: 1.25rem;
          height: 500px;
        }

        /* ━━ Hero card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-hero {
          background: #064E3B;
          border-radius: 1.75rem;
          padding: 3rem 3.25rem 3rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 32px 80px rgba(6,78,59,0.28);
          transition: box-shadow 0.3s ease;
        }

        .tr-hero:hover {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 40px 100px rgba(6,78,59,0.36);
        }

        /* Oversized decorative quote mark */
        .tr-deco-quote {
          position: absolute;
          top: -1rem;
          left: 2.5rem;
          font-size: 10rem;
          line-height: 1;
          color: rgba(52, 211, 153, 0.15);
          pointer-events: none;
          user-select: none;
          font-style: italic;
        }

        .tr-hero-quote {
          font-size: clamp(1.15rem, 1.6vw, 1.5rem);
          font-style: italic;
          line-height: 1.55;
          color: #F9FDF9;
          margin: 2.5rem 0 0;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .tr-hero-divider {
          height: 1px;
          background: rgba(249,253,249,0.12);
          margin: 2rem 0 1.75rem;
        }

        /* Reviewer row */
        .tr-reviewer {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        .tr-reviewer-info {
          flex: 1;
        }

        .tr-reviewer-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #F9FDF9;
          margin: 0.3rem 0 0.2rem;
        }

        .tr-reviewer-detail {
          font-size: 0.48rem;
          letter-spacing: 0.2em;
          color: rgba(249,253,249,0.42);
          margin: 0;
        }

        /* Stars */
        .tr-stars {
          display: block;
          font-size: 0.7rem;
          color: #34D399;
          letter-spacing: 0.1em;
          margin-bottom: 0.15rem;
        }

        /* Avatar initial */
        .tr-avatar {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background: rgba(52,211,153,0.15);
          border: 1px solid rgba(52,211,153,0.3);
          color: #34D399;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-style: italic;
          flex-shrink: 0;
        }

        /* Source badge */
        .tr-source-badge {
          font-size: 0.44rem;
          letter-spacing: 0.15em;
          color: rgba(249,253,249,0.35);
          background: rgba(249,253,249,0.07);
          border: 1px solid rgba(249,253,249,0.12);
          padding: 0.3rem 0.7rem;
          border-radius: 100px;
          align-self: flex-start;
          white-space: nowrap;
        }

        /* ━━ Right column ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Shared card base */
        .tr-card {
          flex: 1;
          border-radius: 1.75rem;
          padding: 2rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s cubic-bezier(0.25, 0, 0.1, 1),
                      box-shadow 0.3s ease;
        }

        .tr-card:hover {
          transform: translateY(-3px);
        }

        /* Mint-white card (was sand) */
        .tr-card--sand {
          background: #ECFDF5;
          box-shadow: 0 12px 40px rgba(6,78,59,0.08);
        }

        .tr-card--sand:hover {
          box-shadow: 0 20px 60px rgba(6,78,59,0.13);
        }

        .tr-card--sand .tr-card-quote {
          color: #064E3B;
        }

        .tr-card--sand .tr-stars {
          color: #F97316;
        }

        .tr-card--sand .tr-card-name {
          color: #064E3B;
        }

        .tr-card--sand .tr-card-origin {
          color: rgba(6,78,59,0.45);
        }

        .tr-card--sand .tr-avatar {
          background: rgba(6,78,59,0.08);
          border-color: rgba(6,78,59,0.15);
          color: #064E3B;
        }

        /* Mint card (was terracotta) */
        .tr-card--clay {
          background: #34D399;
          box-shadow: 0 12px 40px rgba(52,211,153,0.3);
        }

        .tr-card--clay:hover {
          box-shadow: 0 20px 60px rgba(52,211,153,0.42);
        }

        .tr-card--clay .tr-card-quote {
          color: #064E3B;
        }

        .tr-card--clay .tr-stars {
          color: rgba(6,78,59,0.75);
        }

        .tr-card--clay .tr-card-name {
          color: #064E3B;
        }

        .tr-card--clay .tr-card-origin {
          color: rgba(6,78,59,0.55);
        }

        .tr-card--clay .tr-avatar {
          background: rgba(6,78,59,0.1);
          border-color: rgba(6,78,59,0.18);
          color: #064E3B;
        }

        /* Card content */
        .tr-card-quote {
          font-size: 0.875rem;
          font-style: italic;
          line-height: 1.7;
          margin: 0 0 1.25rem;
        }

        .tr-card-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tr-card-name {
          font-size: 0.8rem;
          font-weight: 500;
          margin: 0.25rem 0 0.15rem;
        }

        .tr-card-origin {
          font-size: 0.44rem;
          letter-spacing: 0.18em;
          margin: 0;
        }

        /* ━━ Statement strip ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .tr-statement {
          background: #064E3B;
          margin-top: 1.25rem;
          padding: 5rem clamp(1.5rem, 6vw, 6rem) 5.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Large ghost " behind the quote */
        .tr-statement::before {
          content: '"';
          position: absolute;
          top: -4rem;
          left: 4%;
          font-family: 'Comfortaa', cursive, sans-serif;
          font-size: 28rem;
          line-height: 1;
          color: rgba(52,211,153,0.05);
          pointer-events: none;
          user-select: none;
        }

        .tr-statement-inner {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .tr-statement-deco {
          display: block;
          font-size: 4rem;
          line-height: 0.8;
          color: #FCD34D;
          font-style: italic;
          margin-bottom: 1rem;
          opacity: 0.85;
        }

        .tr-statement-quote {
          font-size: clamp(1.75rem, 3vw, 3rem);
          font-style: italic;
          line-height: 1.25;
          color: #F9FDF9;
          margin: 0 0 2rem;
          letter-spacing: -0.01em;
        }

        .tr-statement-byline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .tr-statement-byline .tr-stars {
          display: inline;
          color: #34D399;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
        }

        .tr-statement-name {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          color: rgba(249,253,249,0.45);
          margin: 0;
        }

        /* ━━ Tablet (768–1023 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .tr-header {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .tr-rating-card {
            display: flex;
            align-items: center;
            gap: 1.25rem;
            text-align: left;
            padding: 1.25rem 1.75rem;
            min-width: auto;
          }

          .tr-rating-stars {
            margin-bottom: 0;
          }

          .tr-cluster {
            grid-template-columns: 1fr;
            height: auto;
          }

          .tr-hero {
            min-height: 420px;
          }

          .tr-col {
            flex-direction: row;
          }

          .tr-card {
            flex: 1;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .tr-section {
            padding: 5rem 0 0;
          }

          .tr-heading {
            font-size: 2.75rem;
          }

          .tr-hero {
            min-height: 380px;
            padding: 2.5rem 2rem 2.25rem;
          }

          .tr-hero-quote {
            margin-top: 2rem;
          }

          .tr-col {
            flex-direction: column;
          }

          .tr-cluster {
            gap: 1rem;
          }

          .tr-statement {
            padding: 4rem 1.5rem 4.5rem;
          }

          .tr-statement-quote {
            font-size: 1.75rem;
          }

          .tr-statement::before {
            font-size: 18rem;
            top: -2rem;
          }
        }
      `}</style>
    </section>
  )
}
