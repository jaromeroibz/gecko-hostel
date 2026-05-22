import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

const WA_NUMBER = '50687390370'
const WA_HREF   = `https://wa.me/${WA_NUMBER}`

export function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gecko-cream">
      <Navbar />
      {/* Fixed navbar takes no space in flow — add spacer on inner pages */}
      {!isHome && <div className="h-[108px] flex-shrink-0" aria-hidden />}
      <main
        className={`mx-auto w-full max-w-6xl flex-1 px-5 sm:px-6 ${isHome ? '' : 'pt-10 sm:pt-12'}`}
      >
        <Outlet />
      </main>
      <Footer />

      {/* ── Floating WhatsApp button ─────────────────────────────────── */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 9999,
          width: '3.25rem',
          height: '3.25rem',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,.45), 0 2px 8px rgba(0,0,0,.18)',
          transition: 'transform 0.2s cubic-bezier(0.25,0,0.1,1), box-shadow 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.transform = 'scale(1.1)'
          el.style.boxShadow = '0 6px 28px rgba(37,211,102,.6), 0 4px 12px rgba(0,0,0,.2)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 4px 20px rgba(37,211,102,.45), 0 2px 8px rgba(0,0,0,.18)'
        }}
      >
        {/* Official WhatsApp logo mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{ width: '1.875rem', height: '1.875rem', fill: '#ffffff' }}
          aria-hidden="true"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.478.65 4.8 1.785 6.818L2 30l7.388-1.758A13.93 13.93 0 0 0 16.002 30C23.72 30 30 23.72 30 16.002 30 8.28 23.72 2 16.002 2Zm0 25.45a11.386 11.386 0 0 1-5.808-1.587l-.416-.248-4.384 1.044 1.077-4.278-.272-.44A11.385 11.385 0 0 1 4.55 16c0-6.317 5.135-11.45 11.452-11.45C22.318 4.55 27.45 9.683 27.45 16c0 6.318-5.132 11.45-11.448 11.45Zm6.28-8.577c-.344-.172-2.036-1.004-2.352-1.118-.316-.114-.547-.172-.777.172-.23.344-.892 1.118-1.092 1.35-.2.23-.4.258-.744.086-.344-.172-1.453-.536-2.768-1.707-1.022-.912-1.713-2.038-1.913-2.382-.2-.344-.021-.53.15-.7.156-.155.344-.403.516-.605.172-.2.23-.344.344-.573.114-.23.057-.43-.029-.603-.086-.172-.777-1.876-1.065-2.57-.28-.673-.565-.582-.777-.593l-.662-.011c-.23 0-.603.086-.919.43-.316.344-1.207 1.179-1.207 2.877 0 1.697 1.236 3.337 1.408 3.568.172.23 2.433 3.714 5.897 5.21.824.355 1.467.568 1.97.728.827.263 1.58.226 2.175.137.663-.099 2.036-.832 2.323-1.635.287-.804.287-1.493.2-1.636-.085-.144-.315-.23-.66-.402Z" />
        </svg>
      </a>
    </div>
  )
}
