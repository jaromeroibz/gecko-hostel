import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from './components/layout/MainLayout'
import { ScrollToTop } from './components/utils/ScrollToTop'
// HomePage is eagerly imported — it's the landing page and must render immediately.
// Lazy-loading it creates a waterfall (main bundle → page chunk → render → image)
// that wrecks FCP and causes NO_LCP in Lighthouse.
import { HomePage } from './pages/HomePage'

// Inner pages are lazy-loaded — users only reach them after the home page loads,
// so the extra chunk fetch happens in the background / after interaction.
const Booking      = lazy(() => import('./pages/Booking').then(m => ({ default: m.Booking })))
const BookingRoom  = lazy(() => import('./pages/BookingRoom').then(m => ({ default: m.BookingRoom })))
const ContactPage  = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const LocationPage      = lazy(() => import('./pages/LocationPage').then(m => ({ default: m.LocationPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))

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
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
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
