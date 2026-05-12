import { useEffect, useState } from 'react'

import { LODGIFY_PORTABLE_SEARCH_SCRIPT_URL } from '../lib/lodgifyConstants'

let loadPromise: Promise<void> | null = null

function scriptAlreadyInDom(): boolean {
  return Boolean(
    document.querySelector(`script[src="${LODGIFY_PORTABLE_SEARCH_SCRIPT_URL}"]`),
  )
}

/**
 * Injects Lodgify portable search script once. Safe across remounts / Strict Mode.
 */
export function ensureLodgifyPortableSearchScript(): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.resolve()
  }

  if (scriptAlreadyInDom()) {
    return Promise.resolve()
  }

  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = LODGIFY_PORTABLE_SEARCH_SCRIPT_URL
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        loadPromise = null
        reject(new Error('Failed to load Lodgify portable search script'))
      }
      document.body.appendChild(script)
    })
  }

  return loadPromise
}

export type UseLodgifyPortableSearchScriptResult = {
  ready: boolean
  error: string | null
}

/**
 * Loads portable search script after mount. `ready` becomes true when load completes.
 */
export function useLodgifyPortableSearchScript(): UseLodgifyPortableSearchScriptResult {
  const [ready, setReady] = useState(() =>
    typeof document !== 'undefined' ? scriptAlreadyInDom() : false,
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ensureLodgifyPortableSearchScript()
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Script load failed')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { ready, error }
}
