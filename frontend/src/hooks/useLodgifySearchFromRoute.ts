import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { isValidLodgifyYmd } from '../utils/lodgifySearchUrl'

const STORAGE = {
  arrival: 'lodgify_search_arrival_ymd',
  departure: 'lodgify_search_departure_ymd',
  adults: 'lodgify_search_adults',
} as const

function defaultYmdPair(): { arrivalYmd: string; departureYmd: string } {
  const a = new Date()
  a.setDate(a.getDate() + 7)
  a.setHours(12, 0, 0, 0)
  const d = new Date()
  d.setDate(d.getDate() + 10)
  d.setHours(12, 0, 0, 0)
  const toYmd = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${y}${m}${day}`
  }
  return { arrivalYmd: toYmd(a), departureYmd: toYmd(d) }
}

function readStoredSearch(): {
  arrivalYmd: string | null
  departureYmd: string | null
  adults: number | null
} {
  try {
    const arrivalYmd = localStorage.getItem(STORAGE.arrival)
    const departureYmd = localStorage.getItem(STORAGE.departure)
    const adultsRaw = localStorage.getItem(STORAGE.adults)
    const adults = adultsRaw ? parseInt(adultsRaw, 10) : null
    return {
      arrivalYmd,
      departureYmd,
      adults: adults !== null && !Number.isNaN(adults) && adults >= 1 ? adults : null,
    }
  } catch {
    return { arrivalYmd: null, departureYmd: null, adults: null }
  }
}

function persistSearch(arrivalYmd: string, departureYmd: string, adults: number) {
  try {
    localStorage.setItem(STORAGE.arrival, arrivalYmd)
    localStorage.setItem(STORAGE.departure, departureYmd)
    localStorage.setItem(STORAGE.adults, String(Math.max(1, Math.floor(adults))))
  } catch {
    // ignore quota / private mode
  }
}

export type LodgifyResolvedSearch = {
  arrivalYmd: string
  departureYmd: string
  adults: number
  source: 'url' | 'storage' | 'default'
}

/**
 * Resolves Lodgify search from URL (?arrival=&departure=&adults=) with localStorage fallback
 * and sensible defaults. Persists when URL contains valid values.
 */
export function useLodgifySearchFromRoute(): LodgifyResolvedSearch {
  const [searchParams] = useSearchParams()
  const queryKey = searchParams.toString()

  return useMemo(() => {
    const params = new URLSearchParams(queryKey)
    const urlArrival = params.get('arrival') ?? ''
    const urlDeparture = params.get('departure') ?? ''
    const urlAdultsRaw = params.get('adults')
    const urlAdults = urlAdultsRaw ? parseInt(urlAdultsRaw, 10) : NaN

    const urlValid =
      isValidLodgifyYmd(urlArrival) &&
      isValidLodgifyYmd(urlDeparture) &&
      !Number.isNaN(urlAdults) &&
      urlAdults >= 1 &&
      urlDeparture > urlArrival

    if (urlValid) {
      const adults = Math.max(1, Math.floor(urlAdults))
      persistSearch(urlArrival, urlDeparture, adults)
      return {
        arrivalYmd: urlArrival,
        departureYmd: urlDeparture,
        adults,
        source: 'url' as const,
      }
    }

    const stored = readStoredSearch()
    if (
      stored.arrivalYmd &&
      stored.departureYmd &&
      isValidLodgifyYmd(stored.arrivalYmd) &&
      isValidLodgifyYmd(stored.departureYmd) &&
      stored.adults !== null &&
      stored.departureYmd > stored.arrivalYmd
    ) {
      return {
        arrivalYmd: stored.arrivalYmd,
        departureYmd: stored.departureYmd,
        adults: stored.adults,
        source: 'storage' as const,
      }
    }

    const defaults = defaultYmdPair()
    return {
      arrivalYmd: defaults.arrivalYmd,
      departureYmd: defaults.departureYmd,
      adults: 2,
      source: 'default' as const,
    }
  }, [queryKey])
}
