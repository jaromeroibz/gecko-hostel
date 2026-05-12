import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './admin-shell.css'

import { Sidebar, type AdminSectionKey } from './Sidebar'

type AdminLayoutProps = {
  activeSection: AdminSectionKey
  children: ReactNode
  onLogout: () => void
}

export function AdminLayout({ activeSection, children, onLogout }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 992px)').matches,
  )
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const closeOnNavigate = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 991.98px)').matches) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="admin-shell">
      {sidebarOpen ? (
        <button
          type="button"
          className="admin-backdrop position-fixed top-0 start-0 w-100 h-100 border-0 p-0 d-lg-none bg-dark bg-opacity-50"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar
        active={activeSection}
        isOpen={sidebarOpen}
        onNavigate={closeOnNavigate}
      />

      <div className={`admin-content bg-light ${sidebarOpen ? 'is-shifted' : ''}`}>
        <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm px-3 px-lg-4 py-2 sticky-top">
          <div className="container-fluid">
            <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-2"
                aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <i className="bi bi-list fs-4" aria-hidden />
              </button>
              <span className="navbar-brand mb-0 fs-5 text-truncate">Admin Dashboard</span>
            </div>

            <div className="ms-auto position-relative" ref={userMenuRef}>
              <button
                type="button"
                className="btn btn-light border rounded-circle p-2 lh-1"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                <i className="bi bi-person-circle fs-3 text-secondary" aria-hidden />
                <span className="visually-hidden">Account menu</span>
              </button>
              {userMenuOpen ? (
                <ul
                  className="dropdown-menu dropdown-menu-end show position-absolute end-0 mt-1 shadow"
                  style={{ minWidth: '12rem' }}
                >
                  <li>
                    <Link className="dropdown-item" to="/" onClick={() => setUserMenuOpen(false)}>
                      <i className="bi bi-house-door me-2" aria-hidden />
                      View site
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item text-danger"
                      onClick={() => {
                        setUserMenuOpen(false)
                        onLogout()
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2" aria-hidden />
                      Logout
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </nav>

        <div className="container-fluid p-4 flex-grow-1">{children}</div>
      </div>
    </div>
  )
}
