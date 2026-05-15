import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { RequireAdminAuth } from './components/auth/RequireAdminAuth'
import { MainLayout } from './components/layout/MainLayout'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { Booking } from './pages/Booking'
import { BookingRoom } from './pages/BookingRoom'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { LocationPage } from './pages/LocationPage'

const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })))

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:roomId" element={<BookingRoom />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>
      {/* Full-viewport admin shell (no public navbar / max-width wrapper — avoids fixed sidebar overlap) */}
      <Route element={<RequireAdminAuth />}>
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, sans-serif',
                    color: '#6c757d',
                    fontSize: '0.875rem',
                  }}
                >
                  Loading admin…
                </div>
              }
            >
              <AdminPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
