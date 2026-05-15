import { useEffect, useState } from 'react'

import { LODGIFY_BOOK_NOW_BOX_SCRIPT_URL } from '../lib/lodgifyConstants'

/**
 * Forces the Lodgify Book Now Box script to re-execute on each mount.
 * Used on single-room pages where exactly one widget is present in the DOM.
 * Unlike the singleton hook, this removes any existing script tag so the
 * browser re-runs the initialisation logic against the current DOM.
 */
export function useLodgifyBookNowBoxReinit(): { ready: boolean } {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)

    // Remove any previously injected copy so the browser re-executes it.
    document
      .querySelectorAll(`script[src="${LODGIFY_BOOK_NOW_BOX_SCRIPT_URL}"]`)
      .forEach((s) => s.remove())

    const script = document.createElement('script')
    script.src = LODGIFY_BOOK_NOW_BOX_SCRIPT_URL
    script.async = true
    script.onload = () => setReady(true)
    script.onerror = () => console.warn('[Lodgify] Book Now Box script failed to load')
    document.body.appendChild(script)
  }, [])

  return { ready }
}
