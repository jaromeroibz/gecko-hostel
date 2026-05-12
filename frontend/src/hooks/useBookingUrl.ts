import { useMemo } from 'react'

import { LODGIFY_PROPERTIES_BASE_URL } from '../lib/lodgifyConstants'
import { formatDateToYYYYMMDD } from '../utils/formatDateToYYYYMMDD'

export type UseBookingUrlParams = {
  baseUrl?: string
  arrivalDate: Date
  departureDate: Date
  adults: number
}

/**
 * Builds the Lodgify general booking URL with arrival, departure, and adults query params.
 */
export function useBookingUrl({
  baseUrl = import.meta.env.VITE_LODGIFY_BOOKING_URL ?? LODGIFY_PROPERTIES_BASE_URL,
  arrivalDate,
  departureDate,
  adults,
}: UseBookingUrlParams): string {
  return useMemo(() => {
    const url = new URL(baseUrl)
    url.searchParams.set('arrival', formatDateToYYYYMMDD(arrivalDate))
    url.searchParams.set('departure', formatDateToYYYYMMDD(departureDate))
    url.searchParams.set('adults', String(Math.max(1, Math.floor(adults))))
    return url.toString()
  }, [baseUrl, arrivalDate, departureDate, adults])
}
