// Bonfire at sunset — group of friends on the beach
const IMG_BONFIRE =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1779039282/kimson-doan-AZMmUy2qL6A-unsplash_pwv13o.jpg'

// Four friends walking the wet sand at crimson sunset
const IMG_SUNSET_WALK =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778627973/lisa-van-vliet-vpsnM6zxrkc-unsplash_spsmme.jpg'

export function HomeLifestyleSection() {
  return (
    <section
      className="ls-section relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      aria-label="Life at Gecko"
    >
      <div className="ls-cluster">

        {/* ── LAYER 1 — Dark text card (back) ──────────────────────────── */}
        <div className="ls-dark-card">
          <p className="ls-eyebrow font-label font-medium uppercase text-gecko-clay">
            Life at Gecko
          </p>
          <h2 className="ls-heading font-display font-medium text-gecko-cream">
            Every sunset<br />finds its crew.
          </h2>
          <div className="ls-body">
            <p>
              After the surf, before the stars — that window belongs to Santa Teresa.
              Fire on the sand, new faces from everywhere, stories traded over cold drinks.
            </p>
            <p>
              This is what Gecko is built for.
            </p>
          </div>
          <div className="ls-stats">
            <div className="ls-stat">
              <span className="ls-stat-num font-display text-gecko-cream">3</span>
              <span className="ls-stat-label font-label">min to the beach</span>
            </div>
            <div className="ls-stat">
              <span className="ls-stat-num font-display text-gecko-cream">12+</span>
              <span className="ls-stat-label font-label">nationalities</span>
            </div>
            <div className="ls-stat">
              <span className="ls-stat-num font-display text-gecko-cream">∞</span>
              <span className="ls-stat-label font-label">good vibes</span>
            </div>
          </div>
        </div>

        {/* ── LAYER 2 — Bonfire image card (overlaps dark card's right edge) */}
        <div className="ls-image-card">
          <img
            src={IMG_BONFIRE}
            alt="Friends gathered around a beach bonfire at sunset"
            loading="lazy"
          />
          {/* Bottom gradient for quote legibility */}
          <div className="ls-img-bottom" aria-hidden />
          {/* Floating quote */}
          <blockquote className="ls-quote">
            <p className="ls-quote-text font-display">
              "The owner invited us to a barbecue. Loved the relaxed vibe and the backyard."
            </p>
            <cite className="ls-quote-cite font-label">— Eline, Netherlands</cite>
          </blockquote>
        </div>

        {/* ── LAYER 3 — Portrait card (floats at bottom-left of cluster) ── */}
        <div className="ls-portrait-card">
          <img
            src={IMG_SUNSET_WALK}
            alt="Friends walking the beach at sunset in Santa Teresa, Costa Rica"
            loading="lazy"
          />
          <p className="ls-portrait-caption font-label">Santa Teresa · Costa Rica</p>
        </div>

      </div>

      <style>{`

        /* ━━ Section — warm sand canvas, full-width ━━━━━━━━━━━━━━━━━━━━━ */
        .ls-section {
          background: #e6e1d6;
          padding: 5rem clamp(1.5rem, 6vw, 6rem) 11rem;
        }

        /* ━━ Cluster — bounded, relative stacking context ━━━━━━━━━━━━━━ */
        .ls-cluster {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          min-height: 520px;
        }

        /* ━━ LAYER 1 — Dark text card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-dark-card {
          position: relative;
          z-index: 1;
          width: 62%;
          min-height: 480px;
          background: #142923;
          border-radius: 2rem;
          padding: 4rem 3.25rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 80px rgba(20, 41, 35, 0.22);
        }

        /* ━━ Eyebrow ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          margin: 0;
        }

        /* ━━ Heading ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-heading {
          font-size: clamp(2.5rem, 3.5vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 300px;
        }

        /* ━━ Body copy ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 0.9375rem;
          line-height: 1.85;
          color: rgba(244, 241, 234, 0.58);
          max-width: 300px;
        }
        .ls-body p { margin: 0; }

        /* ━━ Stats ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-stats {
          display: flex;
          gap: 2.25rem;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .ls-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ls-stat-num {
          font-size: clamp(1.75rem, 2.2vw, 2.25rem);
          line-height: 1;
        }

        .ls-stat-label {
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(244, 241, 234, 0.4);
        }

        /* ━━ LAYER 2 — Bonfire image card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* Positioned absolute: right-aligned, overlaps dark card by ~14% */
        .ls-image-card {
          position: absolute;
          top: 3rem;
          right: 0;
          bottom: -1rem;
          width: 52%;
          border-radius: 1.75rem;
          overflow: hidden;
          z-index: 2;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 32px 80px rgba(0, 0, 0, 0.28);
        }

        .ls-image-card > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 38%;
          display: block;
          transition: transform 1s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .ls-image-card:hover > img {
          transform: scale(1.04);
        }

        /* Bottom gradient for quote readability */
        .ls-img-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 20, 16, 0.68) 0%,
            transparent 50%
          );
        }

        /* ━━ Quote card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .ls-quote {
          position: absolute;
          bottom: 2rem;
          left: 1.75rem;
          right: 1.25rem;
          margin: 0;
          padding: 1.5rem 1.75rem;
          background: rgba(14, 26, 20, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 1.25rem;
          border: 1px solid rgba(244, 241, 234, 0.09);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .ls-quote-text {
          font-size: 1rem;
          font-style: italic;
          line-height: 1.55;
          color: #f4f1ea;
          margin: 0 0 0.85rem;
        }

        .ls-quote-cite {
          display: block;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(244, 241, 234, 0.45);
          font-style: normal;
        }

        /* ━━ LAYER 3 — Portrait card ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* Sits in the dark card's empty right zone (past max-width: 300px  */
        /* content), partially bleeding into the image card's left edge.    */
        .ls-portrait-card {
          position: absolute;
          bottom: -4rem;
          left: calc(3.25rem + 300px + 2.5rem); /* padding + content-width + gap */
          z-index: 10;
          width: 178px;
        }

        .ls-portrait-card img {
          width: 100%;
          height: 248px;
          object-fit: cover;
          object-position: center 20%;
          border-radius: 1.25rem;
          display: block;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 20px 56px rgba(0, 0, 0, 0.22);
          transition: transform 0.6s cubic-bezier(0.25, 0, 0.1, 1);
        }

        .ls-portrait-card:hover img {
          transform: scale(1.035) translateY(-5px);
        }

        .ls-portrait-caption {
          margin-top: 0.7rem;
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(20, 41, 35, 0.45);
          text-align: center;
        }

        /* ━━ Tablet (768 – 1023 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .ls-cluster {
            min-height: auto;
            padding-bottom: 3.5rem; /* room for portrait hanging below */
          }

          .ls-dark-card {
            width: 100%;
            min-height: auto;
            padding: 3rem 2.5rem 3.5rem;
          }

          /* Image card drops back into flow on tablet */
          .ls-image-card {
            position: relative;
            top: auto;
            right: auto;
            bottom: auto;
            width: 100%;
            height: 380px;
            margin-top: 1.5rem;
          }

          /* Portrait tucks into bottom-right of cluster */
          .ls-portrait-card {
            bottom: 0;
            left: auto;
            right: 2rem;
            width: 152px;
          }

          .ls-portrait-card img {
            height: 210px;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .ls-section {
            padding: 4rem 1.25rem 9rem;
          }

          .ls-dark-card {
            border-radius: 1.5rem;
            padding: 2.5rem 1.75rem;
          }

          .ls-heading {
            font-size: 2.25rem;
            max-width: 100%;
          }

          .ls-body {
            font-size: 0.9rem;
            max-width: 100%;
          }

          .ls-stats {
            gap: 1.5rem;
          }

          .ls-image-card {
            height: 300px;
            border-radius: 1.25rem;
          }

          .ls-portrait-card {
            right: 1rem;
            width: 132px;
          }

          .ls-portrait-card img {
            height: 180px;
            border-radius: 1rem;
          }
        }
      `}</style>
    </section>
  )
}
