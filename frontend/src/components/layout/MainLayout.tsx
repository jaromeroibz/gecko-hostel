import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gecko-cream">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-6 sm:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
