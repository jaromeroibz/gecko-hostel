/**
 * Formats a JS Date as YYYYMMDD for Lodgify query params (e.g. arrival=20260623).
 */
export function formatDateToYYYYMMDD(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

/** Value for `<input type="date" />` in local calendar date. */
export function dateToHtmlDateValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function htmlDateValueToDate(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d, 12, 0, 0, 0)
  return Number.isNaN(date.getTime()) ? null : date
}
