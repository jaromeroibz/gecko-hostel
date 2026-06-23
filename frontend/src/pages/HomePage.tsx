import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { SEOHead } from '../components/seo/SEOHead'
import {
  HomeBookingCtaSection,
  HomeEditorialSection,
  HomeExperiencesSection,
  HomeHero,
  HomePackagesSection,
  HomeRoomsSection,
  HomeSurfServicesSection,
  HomeTestimonialsSection,
} from '../components/home'

export function HomePage() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return
    const id = hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [pathname, hash])

  return (
    <div className="space-y-0">
      <SEOHead
        title="Gecko Surf House | Surf Hostel in Santa Teresa, Costa Rica"
        description="Boutique surf hostel 3 minutes from Playa Carmen in Santa Teresa, Costa Rica. Surf packages from $890, private rooms & shared dorms. Book your Costa Rica surf trip today."
        path="/"
      />
      <HomeHero />
      <HomeEditorialSection />
      <HomeSurfServicesSection />
      <HomeExperiencesSection />
      <HomePackagesSection />
      <HomeRoomsSection />
      <HomeTestimonialsSection />
      <HomeBookingCtaSection />
    </div>
  )
}
