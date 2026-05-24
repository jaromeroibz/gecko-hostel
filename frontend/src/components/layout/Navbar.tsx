import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { WaveButton } from '../ui/WaveButton'

type NavItemConfig = {
  label: string
  pathname: string
  hash?: string
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Home', pathname: '/' },
  { label: 'Rooms', pathname: '/booking' },
  { label: 'Location', pathname: '/location' },
  { label: 'Contact Us', pathname: '/contact' },
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

  return (
    <>
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
      <nav
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            width: '100%',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = navItemIsActive(pathname, hash, item)
            const to = item.hash ? { pathname: '/', hash: item.hash } : item.pathname
            return (
              <NavLink
                key={`${item.label}-${item.hash ?? 'root'}`}
                to={to}
                style={{
                  position: 'relative',
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  color: active ? '#142923' : '#1e3d32',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  paddingBottom: '2px',
                }}
                className={`font-label navbar-link${active ? ' navbar-link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            )
          })}

          <WaveButton
            to="/booking"
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.16em',
              border: '1px solid #1e3d32',
              borderRadius: '9999px',
              padding: '0.75rem 1.75rem',
              fontWeight: 500,
            }}
            className="font-label nav-book-btn"
          >
            Book Now
          </WaveButton>
        </div>
      </nav>
    </header>
    </>
  )
}
