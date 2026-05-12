import { useLodgifyPortableSearchScript } from '../../hooks/useLodgifyPortableSearchScript'

const WEBSITE_ID = '595112'
/** Override with `VITE_LODGIFY_SEARCH_LANGUAGE` (e.g. `es`) if the Lodgify widget should stay non-English. */
const LANGUAGE = import.meta.env.VITE_LODGIFY_SEARCH_LANGUAGE ?? 'en'

export type LodgifySearchBarProps = {
  /** Where Lodgify sends the user after search (same app). Default `/booking`. */
  searchPageUrl?: string
  className?: string
}

/**
 * Lodgify Portable Search Bar — loads vendor script once and mounts the required mount node.
 */
export function LodgifySearchBar({
  searchPageUrl = '/booking',
  className = '',
}: LodgifySearchBarProps) {
  const { ready, error } = useLodgifyPortableSearchScript()

  return (
    <div className={`space-y-2 ${className}`}>
      {error && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Search could not load: {error}
        </p>
      )}
      {!ready && !error && (
        <p className="text-sm text-slate-500 motion-safe:animate-pulse">Loading search…</p>
      )}
      <div
        id="lodgify-search-bar"
        data-website-id={WEBSITE_ID}
        data-language-code={LANGUAGE}
        data-search-page-url={searchPageUrl}
        data-new-tab="false"
        className="min-h-[72px] w-full transition-opacity duration-500 ease-out"
        style={{ opacity: ready ? 1 : 0.35 }}
      />
    </div>
  )
}
