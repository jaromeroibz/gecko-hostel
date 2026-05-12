import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEYS = {
  arrival: 'gecko_booking_arrival',
  departure: 'gecko_booking_departure',
  adults: 'gecko_booking_adults',
  packageLabel: 'gecko_booking_package',
} as const

function parseISODate(value: string | null): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export type PersistedBookingSearch = {
  arrivalDate: Date
  departureDate: Date
  adults: number
  packageLabel: string
}

const defaultArrival = () => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  d.setHours(12, 0, 0, 0)
  return d
}

const defaultDeparture = () => {
  const d = new Date()
  d.setDate(d.getDate() + 10)
  d.setHours(12, 0, 0, 0)
  return d
}

export function usePersistedBookingSearch() {
  const [arrivalDate, setArrivalDate] = useState<Date>(defaultArrival)
  const [departureDate, setDepartureDate] = useState<Date>(defaultDeparture)
  const [adults, setAdults] = useState(2)
  const [packageLabel, setPackageLabel] = useState('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const a = parseISODate(localStorage.getItem(STORAGE_KEYS.arrival))
      const dep = parseISODate(localStorage.getItem(STORAGE_KEYS.departure))
      const ad = localStorage.getItem(STORAGE_KEYS.adults)
      const pkg = localStorage.getItem(STORAGE_KEYS.packageLabel)

      if (a) setArrivalDate(a)
      if (dep) setDepartureDate(dep)
      if (ad) {
        const n = parseInt(ad, 10)
        if (!Number.isNaN(n) && n >= 1) setAdults(n)
      }
      if (pkg !== null) setPackageLabel(pkg)
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  const persist = useCallback(
    (next: Partial<PersistedBookingSearch>) => {
      if (next.arrivalDate) {
        localStorage.setItem(STORAGE_KEYS.arrival, next.arrivalDate.toISOString())
        setArrivalDate(next.arrivalDate)
      }
      if (next.departureDate) {
        localStorage.setItem(STORAGE_KEYS.departure, next.departureDate.toISOString())
        setDepartureDate(next.departureDate)
      }
      if (next.adults !== undefined) {
        const n = Math.max(1, Math.floor(next.adults))
        localStorage.setItem(STORAGE_KEYS.adults, String(n))
        setAdults(n)
      }
      if (next.packageLabel !== undefined) {
        localStorage.setItem(STORAGE_KEYS.packageLabel, next.packageLabel)
        setPackageLabel(next.packageLabel)
      }
    },
    [],
  )

  return {
    arrivalDate,
    departureDate,
    adults,
    packageLabel,
    setArrivalDate: (d: Date) => persist({ arrivalDate: d }),
    setDepartureDate: (d: Date) => persist({ departureDate: d }),
    setAdults: (n: number) => persist({ adults: n }),
    setPackageLabel: (s: string) => persist({ packageLabel: s }),
    hydrated,
  }
}
