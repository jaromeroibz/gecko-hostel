import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

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
    </div>
  )
}
