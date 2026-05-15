import { useEffect, useState } from 'react'

import { LODGIFY_BOOK_NOW_BOX_SCRIPT_URL } from '../lib/lodgifyConstants'

let loadPromise: Promise<void> | null = null

function scriptAlreadyInDom(): boolean {
  return Boolean(
    document.querySelector(`script[src="${LODGIFY_BOOK_NOW_BOX_SCRIPT_URL}"]`),
  )
}

export function ensureLodgifyBookNowBoxScript(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve()
  if (scriptAlreadyInDom()) return Promise.resolve()

  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = LODGIFY_BOOK_NOW_BOX_SCRIPT_URL
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        loadPromise = null
        reject(new Error('Failed to load Lodgify Book Now Box script'))
      }
      document.body.appendChild(script)
    })
  }

  return loadPromise
}

export function useLodgifyBookNowBoxScript(): { ready: boolean; error: string | null } {
  const [ready, setReady] = useState(() =>
    typeof document !== 'undefined' ? scriptAlreadyInDom() : false,
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ensureLodgifyBookNowBoxScript()
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Script load failed')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { ready, error }
}
