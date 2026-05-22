import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import {
  HomeBookingCtaSection,
  HomeEditorialSection,
  HomeExperiencesSection,
  HomeHero,
  HomeLogoDivider,
  HomePackagesSection,
  HomeRoomsSection,
  HomeSurfServicesSection,
  HomeTestimonialsSection,
  HomeWhySection,
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
      <HomeHero />
      <HomeEditorialSection />
      <HomeSurfServicesSection />
      <HomeExperiencesSection />
      <HomePackagesSection />
      <HomeRoomsSection />
      <HomeLogoDivider />
      <HomeWhySection />
      <HomeLogoDivider />
      <HomeTestimonialsSection />
      <HomeBookingCtaSection />
    </div>
  )
}
