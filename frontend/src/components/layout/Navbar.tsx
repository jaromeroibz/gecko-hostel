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
  { label: 'Activities', pathname: '/', hash: 'activities' },
  { label: 'Contact Us', pathname: '/contact' },
]

function navItemIsActive(pathname: string, hash: string, item: NavItemConfig): boolean {
  if (item.pathname === '/contact') {
    return pathname === '/contact'
  }
  if (item.hash) {
    return pathname === '/' && hash === `#${item.hash}`
  }
  if (item.pathname === '/' && !item.hash) {
    return pathname === '/' && (hash === '' || hash === '#')
  }
  return pathname === item.pathname && !item.hash
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
          : 'text-gecko-forest/85 hover:text-gecko-forestDeep'
      }`}
    >
      {item.label}
    </NavLink>
  )
}

function LocationPinIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function LogoMark({ className = '', imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <NavLink
      to="/"
      className={`relative z-20 block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gecko-forest ${className}`}
      aria-label="Gecko Hostel home"
    >
      <img
        src={GECKO_LOGO_MARK_URL}
        alt="Gecko Hostel"
        width={112}
        height={112}
        className={`rounded-lg object-cover shadow-md ring-2 ring-gecko-sand ${imgClassName ?? ''}`}
        decoding="async"
      />
    </NavLink>
  )
}

export function Navbar() {
  const showAdmin = !import.meta.env.PROD

  return (
    <header className="relative z-30 overflow-visible border-b border-gecko-sand bg-gecko-cream">
      <nav
        className="relative mx-auto max-w-6xl px-4 pb-4 pt-5 sm:px-5 md:px-6 md:pb-5 md:pt-6"
        aria-label="Main navigation"
      >
        {/* Mobile */}
        <div className="flex flex-col items-center gap-5 md:hidden">
          <LogoMark imgClassName="h-16 w-16" />

          <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {LEFT_NAV.map((item) => (
              <NavItemLink key={`${item.label}-${item.hash ?? 'root'}`} item={item} />
            ))}
            {RIGHT_NAV.map((item) => (
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

          <div className="flex items-center gap-4">
            <NavLink
              to="/booking"
              className="rounded-full bg-gecko-forest px-6 py-2.5 font-nav text-base uppercase tracking-[0.16em] text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep"
            >
              Book Now
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gecko-forest transition hover:text-gecko-forestDeep"
              aria-label="Location and contact"
            >
              <LocationPinIcon className="block" />
            </NavLink>
          </div>
        </div>

        {/* Desktop: split links, centered logo overlaps bar slightly */}
        <div className="relative hidden min-h-[3.5rem] md:block">
          <div className="flex items-center">
            <ul className="relative z-10 flex flex-1 flex-wrap items-center justify-end gap-8 pr-[3.25rem] lg:gap-10 lg:pr-20">
              {LEFT_NAV.map((item) => (
                <li key={`${item.label}-${item.hash ?? 'root'}`}>
                  <NavItemLink item={item} />
                </li>
              ))}
            </ul>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="pointer-events-auto translate-y-1">
                <LogoMark imgClassName="h-[4.25rem] w-[4.25rem] lg:h-[4.5rem] lg:w-[4.5rem]" />
              </div>
            </div>

            <div className="relative z-10 flex min-w-0 flex-1 flex-wrap items-center justify-start gap-8 pl-[3.25rem] lg:gap-10 lg:pl-20">
              <ul className="flex min-w-0 flex-wrap items-center gap-8 lg:gap-10">
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

              <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
                <NavLink
                  to="/booking"
                  className="rounded-full bg-gecko-forest px-6 py-2.5 font-nav text-base uppercase tracking-[0.16em] text-gecko-cream shadow-sm transition hover:bg-gecko-forestDeep"
                >
                  Book Now
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-gecko-forest transition hover:text-gecko-forestDeep"
                  aria-label="Location and contact"
                >
                  <LocationPinIcon className="block" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
