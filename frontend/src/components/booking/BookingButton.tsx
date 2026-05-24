import { useCallback, useEffect, useRef, useState } from 'react'

import { useBookingUrl } from '../../hooks/useBookingUrl'

/**
 * Opens Lodgify general booking link in a new tab with `arrival`, `departure`, `adults` query params.
 *
 * @example
 * ```tsx
 * <BookingButton
 *   arrivalDate={arrival}
 *   departureDate={departure}
 *   adults={2}
 *   redirectDelayMs={0}
 * >
 *   Book now
 * </BookingButton>
 * ```
 */
export type BookingButtonProps = {
  arrivalDate: Date
  departureDate: Date
  adults: number
  /** ms before opening Lodgify. Use 0 to open immediately (e.g. compact nav CTAs). Default ~2.6s for UX. */
  redirectDelayMs?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

/** Default delay: subtle “secure redirect” beat before new tab. */
const DEFAULT_UX_DELAY_MS = 2600

export function BookingButton({
  arrivalDate,
  departureDate,
  adults,
  redirectDelayMs = DEFAULT_UX_DELAY_MS,
  disabled = false,
  className = '',
  children = 'Check availability',
}: BookingButtonProps) {
  const bookingUrl = useBookingUrl({ arrivalDate, departureDate, adults })
  const [isRedirecting, setIsRedirecting] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const openLodgify = useCallback(() => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
  }, [bookingUrl])

  const handleClick = useCallback(() => {
    if (disabled) return

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (redirectDelayMs <= 0) {
      openLodgify()
      return
    }

    setIsRedirecting(true)
    timeoutRef.current = window.setTimeout(() => {
      openLodgify()
      setIsRedirecting(false)
      timeoutRef.current = null
    }, redirectDelayMs)
  }, [disabled, openLodgify, redirectDelayMs])

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isRedirecting}
        className={`inline-flex items-center justify-center rounded-xl bg-[#F59E0B] px-6 py-3 text-base font-semibold text-[#064E3B] shadow-sm transition hover:bg-[#D97706] disabled:opacity-50 ${isRedirecting ? 'cursor-wait' : 'disabled:cursor-not-allowed'} ${className}`}
      >
        {isRedirecting ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Preparing…
          </span>
        ) : (
          children
        )}
      </button>
      {isRedirecting && (
        <p className="text-center text-sm text-slate-600 motion-safe:animate-pulse">
          Redirecting to secure booking…
        </p>
      )}
    </div>
  )
}
