import { useTranslation } from 'react-i18next'
import { WaveButton } from '../ui/WaveButton'
import { useInView } from '../../hooks/useInView'

const IMAGE_1 =
  'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1200/v1779688177/v2qsha0l6ppjfternu6w.webp'
const IMAGE_2 =
  'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1200/v1779688351/evakkr0xhkqn8w1qerma.webp'

export function HomeEditorialSection() {
  const [ref, inView] = useInView<HTMLElement>()
  const { t } = useTranslation()
  return (
    <section
      ref={ref}
      className={`editorial-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2${inView ? ' in-view' : ''}`}
    >
      <div className="editorial-grid">

        {/* ── LEFT: Text content ───────────────────────────────────── */}
        <div className="editorial-text reveal">
          <p className="editorial-tagline font-label font-medium uppercase text-gecko-clay">
            {t('editorial.tagline')}
          </p>

          <h2 className="editorial-heading font-display font-medium tracking-tight text-gecko-cream">
            {t('editorial.heading1')}<br />
            {t('editorial.heading2')}
          </h2>

          <div className="editorial-body">
            <p>{t('editorial.body1')}</p>
            <p>{t('editorial.body2')}</p>
          </div>

          <p className="editorial-closer font-display">
            {t('editorial.closer')}
          </p>

          <WaveButton to="/booking" className="editorial-cta font-label font-medium uppercase">
            {t('editorial.cta')}
          </WaveButton>
        </div>

        {/* ── RIGHT: Overlapping image composition ─────────────────── */}
        <div className="editorial-images">
          {/* Image 1 — upper left */}
          <div className="img-wrap img-1 reveal-from-left stagger-2">
            <img src={IMAGE_1} alt="Santa Teresa, Costa Rica" loading="lazy" />
          </div>

          {/* Image 2 — lower right, overlapping */}
          <div className="img-wrap img-2 reveal-from-right stagger-3">
            <img src={IMAGE_2} alt="Gecko Surf House" loading="lazy" />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section — dark full-width immersive ─────────── */
        .editorial-section {
          position: relative;
          background: #064E3B;
          padding: 9rem clamp(2rem, 8vw, 7rem) 10rem;
        }

        /* ── Grid ─────────────────────────────────────────── */
        .editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Text ─────────────────────────────────────────── */
        .editorial-text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 480px;
        }

        .editorial-tagline {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          margin: 0;
          color: #34D399; /* electric mint — pops on deep jungle */
        }

        .editorial-heading {
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.06;
          margin: 0;
          /* color controlled by Tailwind text-gecko-cream */
        }

        .editorial-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 1rem;
          line-height: 1.9;
          color: rgba(240, 253, 244, 0.62);
        }

        .editorial-body p { margin: 0; }

        .editorial-closer {
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.55;
          color: rgba(240, 253, 244, 0.8);
          margin: 0;
        }

        /* ── CTA — mint-bordered pill, orange wave on hover ── */
        .editorial-cta {
          align-self: flex-start;
          background: transparent;
          color: #F9FDF9;
          border: 1.5px solid rgba(52, 211, 153, 0.55);
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          margin-top: 0.5rem;
        }

        .editorial-cta:hover {
          background-color: #F59E0B;
          border-color: #F59E0B;
          color: #064E3B;
        }


        /* ── Image composition ────────────────────────────── */
        .editorial-images {
          position: relative;
          height: 580px;
        }

        .img-wrap {
          position: absolute;
          overflow: hidden;
          border-radius: 1.5rem;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }

        .img-wrap:hover img {
          transform: scale(1.04);
        }

        /* Image 1 — upper left, slightly taller/narrower */
        .img-1 {
          top: 0;
          left: 0;
          width: 52%;
          height: 60%;
          z-index: 1;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.55);
        }

        /* Image 2 — lower right, larger, overlaps image 1 */
        .img-2 {
          bottom: 0;
          right: 0;
          width: 64%;
          height: 72%;
          z-index: 2;
          box-shadow: 0 20px 64px rgba(0, 0, 0, 0.65);
        }

        /* ── Tablet (768–1023px) ──────────────────────────── */
        @media (max-width: 1023px) {
          .editorial-section {
            padding: 7rem clamp(2rem, 6vw, 4rem) 8rem;
          }

          .editorial-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }

          .editorial-text {
            max-width: 100%;
          }

          .editorial-images {
            height: 460px;
          }
        }

        /* ── Mobile (<640px) ──────────────────────────────── */
        @media (max-width: 639px) {
          .editorial-section {
            padding: 6rem 1.5rem 7rem;
          }

          .editorial-images {
            height: 360px;
          }

          .editorial-cta {
            align-self: stretch;
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
