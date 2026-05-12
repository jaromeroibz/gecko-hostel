import { LODGIFY_PROPERTIES_BASE_URL } from '../lib/lodgifyConstants'

const YMD_RE = /^\d{8}$/

export function isValidLodgifyYmd(value: string): boolean {
  return YMD_RE.test(value)
}

/**
 * Builds Lodgify properties URL with arrival, departure, adults (Lodgify commonly uses YYYYMMDD).
 */
export function buildLodgifyPropertiesSearchUrl(options: {
  baseUrl?: string
  arrivalYmd: string
  departureYmd: string
  adults: number
}): string {
  const base = options.baseUrl ?? LODGIFY_PROPERTIES_BASE_URL
  const url = new URL(base)
  url.searchParams.set('arrival', options.arrivalYmd)
  url.searchParams.set('departure', options.departureYmd)
  url.searchParams.set('adults', String(Math.max(1, Math.floor(options.adults))))
  return url.toString()
}
