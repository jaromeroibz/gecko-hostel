import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { WaveButton } from '../ui/WaveButton'

const LOGO_URL =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778622715/background-removed_kzu281.png'

// Ambient background — hero full viewport
// URL must match the <link rel="preload"> in index.html so the browser reuses the prefetched asset
const HERO_BG =
  'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1920/v1778627977/frames-for-your-heart-eBSKJJuPeO8-unsplash_uc6ksc.jpg'

const NAV_KEYS = [
  { labelKey: 'nav.home',     to: '/' },
  { labelKey: 'nav.rooms',    to: '/booking' },
  { labelKey: 'nav.packages', to: '/#packages' },
  { labelKey: 'nav.location', to: '/location' },
  { labelKey: 'nav.contact',  to: '/contact' },
]

export function HomeHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Parallax — only while hero is in view
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const toggleLang = () => i18n.changeLanguage(currentLang === 'en' ? 'es' : 'en')

  return (
    <>
      {/* ── Hero section ────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2"
        style={{
          height: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F9FDF9',
          overflow: 'hidden',
        }}
      >
        {/* ── Hero background as <img> (not CSS background-image) ──────────────
            Using a real img element makes it a valid LCP candidate and lets the
            <link rel="preload"> in index.html directly benefit this fetch.
            CSS background-image is invisible to Lighthouse's LCP detector.     */}
        <img
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            transform: `translateY(${scrollY * 0.22}px)`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />

        {/* Barely-mint veil — lets the beach texture breathe without competing with the logo */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(249, 253, 249, 0.88)',
          }}
        />

        {/* ── Bottom wave — transitions hero image into dark editorial ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
            transform: 'rotate(180deg)',
            zIndex: 2,
          }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '147px' }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#064E3B"
            />
          </svg>
        </div>
        <div className="hero-content">

          {/* ROW 1: Logo + Welcome text */}
          <div className="hero-row">

            <div className="hero-logo-col" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both' }}>
              <img
                src={LOGO_URL}
                alt="Gecko Surf House"
                className="hero-logo-img"
                fetchPriority="high"
              />
            </div>

            <div className="hero-text-col" style={{ animation: 'hero-enter 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both' }}>
              <h1 className="hero-heading font-display font-medium tracking-tight text-gecko-forestDeep">
                {t('hero.welcomeTo')}<br />{t('hero.hostelName')}
              </h1>
            </div>
          </div>

          {/* ROW 2: Desktop navbar */}
          <nav className="hero-nav" aria-label="Hero navigation" style={{ animation: 'hero-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both' }}>
            {NAV_KEYS.map(({ labelKey, to }) => (
              <Link
                key={labelKey}
                to={to}
                className="hero-nav-link font-label font-medium uppercase text-gecko-forest hover:text-gecko-forestDeep"
              >
                {t(labelKey)}
              </Link>
            ))}
            <WaveButton to="/booking" className="hero-book-btn font-label font-medium uppercase">
              {t('nav.bookNow')}
            </WaveButton>

            {/* Language toggle — desktop */}
            <button
              onClick={toggleLang}
              className="font-label lang-toggle-light"
              aria-label={currentLang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
            >
              <span className={currentLang === 'en' ? 'navbar-lang--active' : ''}>EN</span>
              <span className="navbar-lang-sep">·</span>
              <span className={currentLang === 'es' ? 'navbar-lang--active' : ''}>ES</span>
            </button>
          </nav>

          {/* Burger — mobile only */}
          <div className="hero-burger-wrap" style={{ animation: 'hero-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both' }}>
            <button
              className="hero-burger"
              onClick={() => setMenuOpen(true)}
              aria-label={t('hero.openMenu')}
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
        <button className="drawer-close" onClick={close} aria-label={t('hero.closeMenu')}>✕</button>

        <nav className="drawer-nav" aria-label="Mobile navigation">
          {NAV_KEYS.map(({ labelKey, to }) => (
            <Link
              key={labelKey}
              to={to}
              className="drawer-link font-label font-medium uppercase text-gecko-forest hover:text-gecko-forestDeep"
              onClick={close}
            >
              {t(labelKey)}
            </Link>
          ))}
          <WaveButton to="/booking" className="drawer-book font-label font-medium uppercase" onClick={close}>
            {t('nav.bookNow')}
          </WaveButton>

          {/* Language toggle — mobile drawer */}
          <button
            onClick={() => { toggleLang(); close() }}
            className="font-label lang-toggle-light"
            style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
            aria-label={currentLang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
          >
            <span className={currentLang === 'en' ? 'navbar-lang--active' : ''}>EN</span>
            <span className="navbar-lang-sep">·</span>
            <span className={currentLang === 'es' ? 'navbar-lang--active' : ''}>ES</span>
          </button>
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
          background: transparent;
          color: #064E3B;
          border: 1px solid #064E3B;
          border-radius: 9999px;
          padding: 0.75rem 1.75rem;
        }

        .hero-book-btn:hover {
          background-color: #F59E0B;
          border-color: #F59E0B;
          color: #064E3B;
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
          background: transparent;
          color: #064E3B;
          border: 1px solid #064E3B;
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        .drawer-book:hover {
          background-color: #F59E0B;
          border-color: #F59E0B;
          color: #064E3B;
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
