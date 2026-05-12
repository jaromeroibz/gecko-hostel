import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ExperienceUpsell } from '../components/ExperienceUpsell'
import {
  HomeBookingCtaSection,
  HomeHero,
  HomeRoomsSection,
  HomeStaySearchSection,
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
    <div className="-mt-2 space-y-20 sm:space-y-28">
      <HomeHero />

      <div className="space-y-20 sm:space-y-28">
        <HomeStaySearchSection />
        <HomeRoomsSection />
        <div id="activities" className="scroll-mt-28">
          <ExperienceUpsell />
        </div>
        <HomeBookingCtaSection />
      </div>
    </div>
  )
}
