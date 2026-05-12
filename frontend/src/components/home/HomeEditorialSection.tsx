import { Link } from 'react-router-dom'

const IMAGE_1 =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778627977/frames-for-your-heart-eBSKJJuPeO8-unsplash_uc6ksc.jpg'
const IMAGE_2 =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778627973/lisa-van-vliet-vpsnM6zxrkc-unsplash_spsmme.jpg'

export function HomeEditorialSection() {
  return (
    <section className="editorial-section">
      <div className="editorial-grid">

        {/* ── LEFT: Text content ───────────────────────────────────── */}
        <div className="editorial-text">
          <p className="editorial-tagline font-nav font-medium uppercase text-gecko-clay">
            Waves in front. Jungle behind. Sunsets everywhere.
          </p>

          <h2 className="editorial-heading font-display font-medium tracking-tight text-gecko-forestDeep">
            Welcome to<br />Gecko Surf House
          </h2>

          <div className="editorial-body text-gecko-forest">
            <p>
              A laid-back backpacker hostel in the heart of Santa Teresa, Costa Rica. Surf
              world-class waves just steps away, explore tropical nature, watch incredible
              sunsets, and connect with travelers from all over the world.
            </p>
            <p>
              From early morning surf sessions to late-night BBQs under the stars, Gecko Surf
              House is built around simple moments and good vibes.
            </p>
          </div>

          <p className="editorial-closer font-display text-gecko-forest">
            Stay close to the ocean. Stay close to nature.
          </p>

          <Link
            to="/booking"
            className="editorial-cta font-nav font-medium uppercase text-gecko-cream hover:bg-gecko-forestDeep"
          >
            Book your next adventure
          </Link>
        </div>

        {/* ── RIGHT: Overlapping image composition ─────────────────── */}
        <div className="editorial-images">
          {/* Image 1 — upper left */}
          <div className="img-wrap img-1">
            <img src={IMAGE_1} alt="Santa Teresa, Costa Rica" loading="lazy" />
          </div>

          {/* Image 2 — lower right, overlapping */}
          <div className="img-wrap img-2">
            <img src={IMAGE_2} alt="Gecko Surf House" loading="lazy" />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section ──────────────────────────────────────── */
        .editorial-section {
          padding: 6rem 0 7rem;
        }

        /* ── Grid ─────────────────────────────────────────── */
        .editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
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
          letter-spacing: 0.28em;
          margin: 0;
        }

        .editorial-heading {
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.08;
          margin: 0;
        }

        .editorial-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 1rem;
          line-height: 1.8;
          opacity: 0.75;
        }

        .editorial-body p { margin: 0; }

        .editorial-closer {
          font-size: 1.05rem;
          font-style: italic;
          line-height: 1.5;
          opacity: 0.85;
          margin: 0;
        }

        .editorial-cta {
          align-self: flex-start;
          background: #1e3d32;
          border-radius: 0.75rem;
          padding: 0.875rem 1.75rem;
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          transition: background 0.2s;
          margin-top: 0.5rem;
        }

        /* ── Image composition ────────────────────────────── */
        .editorial-images {
          position: relative;
          height: 580px;
        }

        .img-wrap {
          position: absolute;
          overflow: hidden;
          border-radius: 12px;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Image 1 — upper left, slightly taller/narrower */
        .img-1 {
          top: 0;
          left: 0;
          width: 52%;
          height: 60%;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(20, 41, 35, 0.13);
        }

        /* Image 2 — lower right, larger, overlaps image 1 */
        .img-2 {
          bottom: 0;
          right: 0;
          width: 64%;
          height: 72%;
          z-index: 2;
          box-shadow: 0 12px 40px rgba(20, 41, 35, 0.18);
        }

        /* ── Tablet (768–1023px) ──────────────────────────── */
        @media (max-width: 1023px) {
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
            padding: 4rem 0 5rem;
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
