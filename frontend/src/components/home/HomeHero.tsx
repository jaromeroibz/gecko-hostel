import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WaveButton } from '../ui/WaveButton'

const LOGO_URL =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778622715/background-removed_kzu281.png'

// Ambient background — hero full viewport
const HERO_BG =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778627977/frames-for-your-heart-eBSKJJuPeO8-unsplash_uc6ksc.jpg'

const HERO_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/#rooms' },
  { label: 'Location', to: '/location' },
  { label: 'Contact Us', to: '/contact' },
]

export function HomeHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── Hero section ────────────────────────────────────────────── */}
      <div
        className="relative left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2"
        style={{
          height: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundColor: '#F9FDF9',
        }}
      >
        {/* Barely-mint veil — lets the beach texture breathe without competing with the logo */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(249, 253, 249, 0.88)',
          }}
        />
        <div className="hero-content">

          {/* ROW 1: Logo + Welcome text */}
          <div className="hero-row">

            <div className="hero-logo-col">
              <img
                src={LOGO_URL}
                alt="Gecko Surf House"
                className="hero-logo-img"
                fetchPriority="high"
              />
            </div>

            <div className="hero-text-col">
              <h1 className="hero-heading font-display font-medium tracking-tight text-gecko-forestDeep">
                Welcome to<br />Gecko Surf House
              </h1>
            </div>
          </div>

          {/* ROW 2: Desktop navbar */}
          <nav className="hero-nav" aria-label="Hero navigation">
            {HERO_NAV.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="hero-nav-link font-label font-medium uppercase text-gecko-forest hover:text-gecko-forestDeep"
              >
                {label}
              </Link>
            ))}
            <WaveButton to="/booking" className="hero-book-btn font-label font-medium uppercase">
              Book Now
            </WaveButton>
          </nav>

          {/* Burger — mobile only */}
          <div className="hero-burger-wrap">
            <button
              className="hero-burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {/* ── Drawer backdrop ─────────────────────────────────────────── */}
      <div
        className="drawer-backdrop"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        onClick={close}
      />

      {/* ── Side drawer ─────────────────────────────────────────────── */}
      <div
        className="drawer"
        style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
        aria-hidden={!menuOpen}
      >
        <button className="drawer-close" onClick={close} aria-label="Close menu">✕</button>

        <nav className="drawer-nav">
          {HERO_NAV.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="drawer-link font-label font-medium uppercase text-gecko-forest hover:text-gecko-forestDeep"
              onClick={close}
            >
              {label}
            </Link>
          ))}
          <WaveButton to="/booking" className="drawer-book font-label font-medium uppercase" onClick={close}>
            Book Now
          </WaveButton>
        </nav>
      </div>

      <style>{`
        /* ── Content block ─────────────────────────────── */
        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;
          padding: 0 2rem;
        }

        /* ── Row 1 ─────────────────────────────────────── */
        .hero-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4rem;
        }

        .hero-logo-col {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-logo-img {
          width: 100%;
          max-width: 450px;
          height: auto;
        }

        .hero-text-col {
          flex: 1;
        }

        .hero-heading {
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          line-height: 1.06;
          margin: 0;
        }

        /* ── Desktop navbar ────────────────────────────── */
        .hero-nav {
          margin-top: 3.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }

        .hero-nav-link {
          position: relative;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
        }

        .hero-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: currentColor;
          transition: width 0.25s ease;
        }

        .hero-nav-link:hover::after {
          width: 100%;
        }

        /* Heading color override (Tailwind text-gecko-forestDeep → jungle green) */
        .hero-heading { color: #064E3B; }

        /* Nav link color overrides */
        .hero-nav-link { color: #064E3B; }
        .hero-nav-link:hover { color: #042e24; }

        .hero-book-btn {
          font-size: 0.9rem;
          letter-spacing: 0.16em;
          border: 1px solid #064E3B;
          border-radius: 9999px;
          padding: 0.75rem 1.75rem;
          transition: border-color 0.2s;
        }

        /* Orange wave floods in on hover */
        .hero-book-btn .gecko-wave-fill { background: #F97316; }
        .hero-book-btn .gecko-wave-text { color: #064E3B; }
        .hero-book-btn.gecko-wave-btn:hover .gecko-wave-text {
          animation: hero-wave-reveal 1s forwards;
        }
        @keyframes hero-wave-reveal {
          0%, 78% { color: #064E3B; }
          100%     { color: #F9FDF9; }
        }

        /* ── Burger — hidden on desktop ────────────────── */
        .hero-burger-wrap { display: none; }

        .hero-burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hero-burger span {
          display: block;
          width: 26px;
          height: 2px;
          background: #064E3B;
          border-radius: 2px;
        }

        /* ── Backdrop ──────────────────────────────────── */
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 78, 59, 0.35);
          z-index: 90;
          transition: opacity 0.3s ease;
        }

        /* ── Drawer ────────────────────────────────────── */
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100dvh;
          width: 280px;
          background: #F9FDF9;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 2rem 2rem 3rem;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -4px 0 24px rgba(6, 78, 59, 0.12);
        }

        .drawer-close {
          align-self: flex-end;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          color: #064E3B;
          padding: 4px 8px;
          margin-bottom: 2.5rem;
        }

        .drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .drawer-link {
          position: relative;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          padding-bottom: 2px;
          color: #064E3B;
        }

        .drawer-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #064E3B;
          transition: width 0.25s ease;
        }

        .drawer-link:hover::after {
          width: 100%;
        }

        .drawer-book {
          font-size: 1rem;
          letter-spacing: 0.16em;
          border: 1px solid #064E3B;
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        /* Orange wave in drawer button */
        .drawer-book .gecko-wave-fill { background: #F97316; }
        .drawer-book .gecko-wave-text { color: #064E3B; }
        .drawer-book.gecko-wave-btn:hover .gecko-wave-text {
          animation: drawer-wave-reveal 1s forwards;
        }
        @keyframes drawer-wave-reveal {
          0%, 78% { color: #064E3B; }
          100%     { color: #F9FDF9; }
        }

        /* ── Tablet (768–1023px) ───────────────────────── */
        @media (max-width: 1023px) {
          .hero-row { gap: 2.5rem; }
          .hero-logo-img { max-width: 320px; }
        }

        /* ── Mobile (<768px) ───────────────────────────── */
        @media (max-width: 767px) {
          .hero-row {
            flex-direction: column;
            gap: 1.5rem;
          }

          .hero-logo-img { max-width: 180px; }

          .hero-text-col { text-align: center; }

          .hero-heading { font-size: clamp(1.75rem, 6vw, 2.5rem); }

          .hero-nav { display: none; }

          .hero-burger-wrap {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  )
}
