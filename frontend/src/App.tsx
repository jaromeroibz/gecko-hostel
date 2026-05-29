import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from './components/layout/MainLayout'
import { ScrollToTop } from './components/utils/ScrollToTop'

// Route-level code splitting — each page loads only when navigated to.
// This cuts the initial JS bundle and speeds up first paint.
const HomePage    = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const Booking     = lazy(() => import('./pages/Booking').then(m => ({ default: m.Booking })))
const BookingRoom = lazy(() => import('./pages/BookingRoom').then(m => ({ default: m.BookingRoom })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const LocationPage = lazy(() => import('./pages/LocationPage').then(m => ({ default: m.LocationPage })))

/** Minimal full-screen spinner shown while a lazy chunk loads */
function PageFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2.5px solid #1e3d3230', borderTopColor: '#1e3d32', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:roomId" element={<BookingRoom />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/location" element={<LocationPage />} />
            {/* Admin routes disabled — feature not included in current plan */}
            <Route path="/admin/login" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
