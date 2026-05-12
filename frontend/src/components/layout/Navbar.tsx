import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { GECKO_LOGO_MARK_URL } from '../../lib/branding'

type NavItemConfig = {
  label: string
  pathname: string
  hash?: string
}

const LEFT_NAV: NavItemConfig[] = [
  { label: 'Home', pathname: '/' },
  { label: 'Rooms', pathname: '/', hash: 'rooms' },
]

const RIGHT_NAV: NavItemConfig[] = [
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

function NavItemLink({ item }: { item: NavItemConfig }) {
  const { pathname, hash } = useLocation()
  const active = navItemIsActive(pathname, hash, item)
  const to = item.hash ? { pathname: '/', hash: item.hash } : item.pathname

  return (
    <NavLink
      to={to}
      className={`border-b-2 border-transparent pb-0.5 font-nav text-lg uppercase tracking-[0.14em] transition md:text-xl ${
        active
          ? 'border-gecko-forest text-gecko-forestDeep'
          : 'text-gecko-forest/80 hover:text-gecko-forestDeep'
      }`}
    >
      {item.label}
    </NavLink>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const showAdmin = !import.meta.env.PROD

  const [visible, setVisible] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }

    setVisible(window.scrollY > window.innerHeight * 0.75)

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-gecko-sand bg-gecko-cream/95 backdrop-blur-md transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <nav
        className="relative mx-auto max-w-6xl px-4 pb-4 pt-5 sm:px-5 md:px-6 md:pb-5 md:pt-6"
        aria-label="Main navigation"
      >
        {/* Mobile */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          <NavLink to="/" aria-label="Gecko Surf House home">
            <img
              src={GECKO_LOGO_MARK_URL}
              alt="Gecko Surf House"
              className="h-14 w-14 object-contain"
              decoding="async"
            />
          </NavLink>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
              <NavItemLink key={`${item.label}-${item.hash ?? 'root'}`} item={item} />
            ))}
            {showAdmin && (
              <NavLink
                to="/admin"
                className="font-nav text-lg uppercase tracking-[0.14em] text-gecko-forest/45"
              >
                Admin
              </NavLink>
            )}
          </div>
        </div>

        {/* Desktop: split links, centered logo */}
        <div className="relative hidden min-h-[3.5rem] md:block">
          <div className="flex items-center">
            {/* Left nav links */}
            <ul className="relative z-10 flex flex-1 flex-wrap items-center justify-end gap-8 pr-[3.25rem] lg:gap-10 lg:pr-20">
              {LEFT_NAV.map((item) => (
                <li key={`${item.label}-${item.hash ?? 'root'}`}>
                  <NavItemLink item={item} />
                </li>
              ))}
            </ul>

            {/* Centered logo */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="pointer-events-auto">
                <NavLink
                  to="/"
                  aria-label="Gecko Surf House home"
                  className="block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gecko-forest"
                >
                  <img
                    src={GECKO_LOGO_MARK_URL}
                    alt="Gecko Surf House"
                    className="h-[4.25rem] w-[4.25rem] object-contain lg:h-[4.5rem] lg:w-[4.5rem]"
                    decoding="async"
                  />
                </NavLink>
              </div>
            </div>

            {/* Right nav links */}
            <ul className="relative z-10 flex flex-1 flex-wrap items-center justify-start gap-8 pl-[3.25rem] lg:gap-10 lg:pl-20">
              {RIGHT_NAV.map((item) => (
                <li key={`${item.label}-${item.hash ?? 'root'}`}>
                  <NavItemLink item={item} />
                </li>
              ))}
              {showAdmin && (
                <li>
                  <NavLink
                    to="/admin"
                    className="font-nav text-lg uppercase tracking-[0.14em] text-gecko-forest/45 transition hover:text-gecko-forest/70"
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
