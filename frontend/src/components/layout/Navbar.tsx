import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { WaveButton } from '../ui/WaveButton'

const LOGO_URL =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/v1779896306/gecko-logo-cropped_hpduef.png'

type NavItemConfig = {
  labelKey: string
  pathname: string
  hash?: string
}

const NAV_ITEMS: NavItemConfig[] = [
  { labelKey: 'nav.home',     pathname: '/' },
  { labelKey: 'nav.rooms',    pathname: '/booking' },
  { labelKey: 'nav.packages', pathname: '/', hash: 'packages' },
  { labelKey: 'nav.location', pathname: '/location' },
  { labelKey: 'nav.contact',  pathname: '/contact' },
]

function navItemIsActive(pathname: string, hash: string, item: NavItemConfig): boolean {
  if (item.pathname === '/contact' || item.pathname === '/location') {
    return pathname === item.pathname
  }
  if (item.hash) {
    return pathname === '/' && hash === `#${item.hash}`
  }
  if (item.pathname === '/' && !item.hash) {
    return pathname === '/' && (hash === '' || hash === '#')
  }
  return false
}

export function Navbar() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'
  const { t, i18n } = useTranslation()

  const [visible, setVisible] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }
    setVisible(window.scrollY > window.innerHeight * 0.75)
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const toggle = () => i18n.changeLanguage(currentLang === 'en' ? 'es' : 'en')

  return (
    <header
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(244, 241, 234, 0.95)',
        backdropFilter: 'blur(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <nav className="sn-nav">

        {/* ── Left: Logo ───────────────────────────────────────────── */}
        <Link to="/" className="sn-logo-link" aria-label="Gecko Surf House — Home">
          <img src={LOGO_URL} alt="Gecko Surf House" className="sn-logo" />
        </Link>

        {/* ── Centre: links + language toggle ─────────────────────── */}
        <div className="sn-centre">
          {NAV_ITEMS.map((item) => {
            const active = navItemIsActive(pathname, hash, item)
            const to = item.hash ? { pathname: '/', hash: item.hash } : item.pathname
            return (
              <NavLink
                key={`${item.labelKey}-${item.hash ?? 'root'}`}
                to={to}
                className={`font-label sn-link${active ? ' sn-link--active' : ''}`}
              >
                {t(item.labelKey)}
              </NavLink>
            )
          })}

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="font-label sn-lang"
            aria-label={currentLang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
          >
            <span className={currentLang === 'en' ? 'sn-lang--active' : ''}>EN</span>
            <span className="sn-lang-sep">·</span>
            <span className={currentLang === 'es' ? 'sn-lang--active' : ''}>ES</span>
          </button>
        </div>

        {/* ── Right: Book Now ──────────────────────────────────────── */}
        <div className="sn-right">
          <WaveButton
            to="/booking"
            className="font-label sn-book"
          >
            {t('nav.bookNow')}
          </WaveButton>
        </div>

      </nav>

      <style>{`
        .sn-nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.5rem;
        }

        /* ── Logo ── */
        .sn-logo-link { display: flex; align-items: center; flex-shrink: 0; }
        .sn-logo { height: 62px; width: auto; object-fit: contain; display: block; }

        /* ── Centre links ── */
        .sn-centre {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .sn-link {
          position: relative;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: #1e3d32;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.2s;
          padding-bottom: 2px;
          white-space: nowrap;
        }

        .sn-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #064E3B;
          transition: width 0.25s ease;
        }

        .sn-link:hover { color: #064E3B; }
        .sn-link:hover::after { width: 100%; }

        .sn-link--active {
          color: #142923;
          font-weight: 700;
        }
        .sn-link--active::after { width: 100%; }

        /* ── Language toggle ── */
        .sn-lang {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: rgba(30, 61, 50, 0.5);
          text-transform: uppercase;
          padding: 0;
          white-space: nowrap;
        }

        .sn-lang:hover { color: #1e3d32; }
        .sn-lang--active { color: #064E3B; font-weight: 700; }
        .sn-lang-sep { opacity: 0.4; }

        /* ── Book Now ── */
        .sn-right { display: flex; align-items: center; flex-shrink: 0; }

        .sn-book {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          border: 1px solid #1e3d32;
          border-radius: 9999px;
          padding: 0.6rem 1.5rem;
          font-weight: 500;
          text-transform: uppercase;
          white-space: nowrap;
          color: #064E3B;
          background: transparent;
        }

        .sn-book:hover {
          background: #F59E0B;
          border-color: #F59E0B;
          color: #064E3B;
        }

        /* ── Collapse centre links on small screens ── */
        @media (max-width: 900px) {
          .sn-centre { gap: 1.25rem; }
          .sn-link { font-size: 0.65rem; }
        }

        @media (max-width: 700px) {
          .sn-centre { display: none; }
          .sn-nav { grid-template-columns: auto 1fr auto; }
        }
      `}</style>
    </header>
  )
}
