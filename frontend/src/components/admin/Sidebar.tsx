import { Link } from 'react-router-dom'

export type AdminSectionKey = 'images' | 'extras' | 'packages' | 'rooms' | 'settings'

type SidebarProps = {
  active: AdminSectionKey
  isOpen: boolean
  onNavigate?: () => void
}

const ITEMS: Array<{ key: AdminSectionKey; label: string; icon: string }> = [
  { key: 'images', label: 'Images', icon: 'bi-image' },
  { key: 'extras', label: 'Extras', icon: 'bi-stars' },
  { key: 'packages', label: 'Packages', icon: 'bi-box-seam' },
  { key: 'rooms', label: 'Rooms', icon: 'bi-door-open' },
]

export function Sidebar({ active, isOpen, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`admin-sidebar text-white ${isOpen ? 'is-visible' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="px-3 py-3 border-bottom border-secondary">
        <Link
          to="/admin?tab=images"
          onClick={onNavigate}
          className="text-white text-decoration-none fw-semibold fs-5 d-flex align-items-center gap-2"
        >
          <i className="bi bi-speedometer2" aria-hidden />
          Gecko Admin
        </Link>
      </div>

      <nav className="flex-grow-1 overflow-auto py-3 px-2">
        <ul className="nav flex-column gap-1 list-unstyled mb-0">
          {ITEMS.map((item) => {
            const isActive = active === item.key
            return (
              <li key={item.key}>
                <Link
                  to={`/admin?tab=${item.key}`}
                  onClick={onNavigate}
                  className={`nav-link d-flex align-items-center gap-2 rounded py-2 px-3 ${
                    isActive
                      ? 'active bg-white bg-opacity-10 text-white fw-semibold'
                      : 'text-white opacity-75'
                  }`}
                >
                  <i className={`bi ${item.icon}`} aria-hidden />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <hr className="border-secondary my-3" />

        <ul className="nav flex-column gap-1 list-unstyled mb-0">
          <li>
            <Link
              to="/admin?tab=settings"
              onClick={onNavigate}
              className={`nav-link d-flex align-items-center gap-2 rounded py-2 px-3 ${
                active === 'settings'
                  ? 'active bg-white bg-opacity-10 text-white fw-semibold'
                  : 'text-white opacity-75'
              }`}
            >
              <i className="bi bi-gear" aria-hidden />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto px-3 py-3 border-top border-secondary small">
        <span className="text-white opacity-75">Signed in as </span>
        <span className="text-white fw-semibold">Admin</span>
      </div>
    </aside>
  )
}
