import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LOGO =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/v1779032984/Untitled_xbxmok.png'

const NAV_LINKS = [
  { labelKey: 'nav.home',     to: '/'          },
  { labelKey: 'nav.rooms',    to: '/#rooms'    },
  { labelKey: 'nav.packages', to: '/#packages' },
  { labelKey: 'nav.location', to: '/location'  },
  { labelKey: 'nav.contact',  to: '/contact'   },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/gecko_surfhouse/' },
]

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer-root">

      {/* ── Ghost "GECKO" watermark ──────────────────────────────────── */}
      <span className="footer-ghost font-display" aria-hidden>GECKO</span>

      <div className="footer-inner">

        {/* ── Masthead — logo + editorial tagline ─────────────────────── */}
        <div className="footer-masthead">
          <img
            src={LOGO}
            alt="Gecko Surf House"
            className="footer-logo"
          />
          <p className="footer-tagline font-display">
            {t('footer.tagline1')}<br />
            <em>{t('footer.tagline2')}</em>
          </p>
        </div>

        {/* ── Terracotta separator ─────────────────────────────────────── */}
        <div className="footer-sep-clay" aria-hidden />

        {/* ── Main grid ───────────────────────────────────────────────── */}
        <div className="footer-grid">

          {/* Column 1 — Navigate */}
          <div className="footer-col">
            <p className="footer-col-label font-label uppercase">{t('footer.explore')}</p>
            <nav aria-label="Footer navigation">
              <ul className="footer-link-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.labelKey}>
                    <Link to={link.to} className="footer-link font-label">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/booking" className="footer-link footer-link--cta font-label">
                    {t('footer.bookNowLink')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 2 — Visit Us */}
          <div className="footer-col">
            <p className="footer-col-label font-label uppercase">{t('footer.visitUs')}</p>
            <address className="footer-address font-label">
              <p>Santa Teresa</p>
              <p>{t('footer.province')}</p>
              <p>Costa Rica</p>
            </address>
            <div className="footer-hours font-label">
              <div className="footer-hours-row">
                <span className="footer-hours-key">{t('footer.checkIn')}</span>
                <span className="footer-hours-val">{t('footer.checkInTime')}</span>
              </div>
              <div className="footer-hours-row">
                <span className="footer-hours-key">{t('footer.checkOut')}</span>
                <span className="footer-hours-val">{t('footer.checkOutTime')}</span>
              </div>
            </div>
          </div>

          {/* Column 3 — Follow */}
          <div className="footer-col">
            <p className="footer-col-label font-label uppercase">{t('footer.follow')}</p>
            <ul className="footer-link-list">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link font-label"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="footer-social-tag font-label">
              {t('footer.socialTag')}<br />
              <span className="footer-social-handle">#GeckoSurfHouse</span>
            </p>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="footer-sep-hair" aria-hidden />

        <div className="footer-bottom">
          <p className="footer-copy font-label">
            © {new Date().getFullYear()} {t('footer.copyright')}
            {' · '}
            <Link to="/privacy" className="footer-dev-link">Privacy Policy</Link>
          </p>
          <p className="footer-locale font-label uppercase">
            Santa Teresa · Costa Rica
          </p>
          <p className="footer-dev font-label">
            {t('footer.developedBy')}{' '}
            <a
              href="https://jaromeroibz.github.io/porftolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-dev-link"
            >
              Sunlight Dev
            </a>
          </p>
        </div>

      </div>

      <style>{`

        /* ━━ Root ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-root {
          background: #142923;
          width: 100%;
          position: relative;
          overflow: hidden;
          /* No border-top — divider lives at the bottom of the CTA section above */
        }

        /* ━━ Ghost watermark ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-ghost {
          position: absolute;
          bottom: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(7rem, 18vw, 20rem);
          line-height: 1;
          color: rgba(244, 241, 234, 0.03);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          letter-spacing: 0.06em;
          z-index: 0;
        }

        /* ━━ Inner container ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          margin: 0 auto;
          padding: clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem) clamp(2rem, 4vw, 3rem);
        }

        /* ━━ Masthead ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-masthead {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.75rem;
        }

        .footer-logo {
          width: clamp(100px, 14vw, 160px);
          height: auto;
          display: block;
          /* Make logo white on dark background */
          filter: brightness(0) invert(1);
          opacity: 0.88;
          flex-shrink: 0;
        }

        .footer-tagline {
          font-size: clamp(2.75rem, 5vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: -0.035em;
          color: #f4f1ea;
          text-align: right;
          margin: 0;
        }

        .footer-tagline em {
          font-style: italic;
          color: rgba(244, 241, 234, 0.42);
        }

        /* ━━ Separators ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-sep-clay {
          height: 1.5px;
          background: linear-gradient(
            to right,
            rgba(184, 92, 58, 0.55),
            rgba(184, 92, 58, 0.15) 60%,
            rgba(184, 92, 58, 0)
          );
          margin-bottom: 3rem;
          border-radius: 100px;
        }

        .footer-sep-hair {
          height: 1px;
          background: rgba(244, 241, 234, 0.07);
          margin-bottom: 1.75rem;
        }

        /* ━━ Main link grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.1fr 0.8fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        /* ━━ Column ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-col-label {
          font-size: 0.52rem;
          letter-spacing: 0.28em;
          color: #b85c3a;
          margin: 0 0 1.25rem;
        }

        /* ━━ Link lists ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          font-size: 0.9rem;
          font-weight: 400;
          color: rgba(244, 241, 234, 0.5);
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #f4f1ea;
        }

        .footer-link--cta {
          color: #b85c3a;
          font-weight: 600;
          margin-top: 0.4rem;
        }

        .footer-link--cta:hover {
          color: #c9683f;
        }

        /* ━━ Social tagline ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-social-tag {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          line-height: 1.7;
          color: rgba(244, 241, 234, 0.3);
          margin-bottom: 0;
        }

        .footer-social-handle {
          color: #b85c3a;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ━━ Address ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-address {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 1.5rem;
        }

        .footer-address p {
          font-size: 0.9rem;
          color: rgba(244, 241, 234, 0.5);
          margin: 0;
        }

        /* ━━ Hours ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-hours {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-left: 1.5px solid rgba(184, 92, 58, 0.25);
          padding-left: 0.85rem;
        }

        .footer-hours-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .footer-hours-key {
          font-size: 0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(244, 241, 234, 0.3);
          min-width: 5rem;
        }

        .footer-hours-val {
          font-size: 0.825rem;
          color: rgba(244, 241, 234, 0.55);
        }

        /* ━━ Bottom bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 0.75rem;
          color: rgba(244, 241, 234, 0.28);
          margin: 0;
        }

        .footer-locale {
          font-size: 0.48rem;
          letter-spacing: 0.22em;
          color: rgba(244, 241, 234, 0.22);
          margin: 0;
        }

        .footer-dev {
          font-size: 0.75rem;
          color: rgba(244, 241, 234, 0.28);
          margin: 0;
        }

        .footer-dev-link {
          color: rgba(244, 241, 234, 0.42);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-dev-link:hover {
          color: #f4f1ea;
        }

        /* ━━ Tablet (< 1024 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem 3rem;
          }
        }

        /* ━━ Mobile (< 640 px) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 639px) {
          .footer-masthead {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 2.25rem;
          }

          .footer-tagline {
            text-align: left;
            font-size: 2.75rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .footer-ghost {
            font-size: 5.5rem;
          }
        }
      `}</style>
    </footer>
  )
}
