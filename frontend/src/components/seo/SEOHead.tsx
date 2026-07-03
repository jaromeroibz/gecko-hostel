import { Helmet } from 'react-helmet-async'

// ── Site-wide constants ────────────────────────────────────────────────────────
export const SITE_NAME = 'Gecko Surf House'
export const SITE_URL  = 'https://geckosurfhouse.com'

// Social-share image: 1200×630 Cloudinary crop — update if hero image changes
export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1778627977/frames-for-your-heart-eBSKJJuPeO8-unsplash_uc6ksc.jpg'

type Props = {
  /** Page-level title. If it already contains the site name it won't be appended. */
  title: string
  /** 140–160 char meta description. Make it specific and action-oriented. */
  description: string
  /** Relative path, e.g. "/booking". Defaults to "". */
  path?: string
  /** Override the social share image (1200×630 recommended). */
  image?: string
  /** 'website' (default) or 'article' */
  type?: 'website' | 'article'
  /** Set true for pages that must not be indexed (booking detail pages, etc.) */
  noindex?: boolean
}

export function SEOHead({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}: Props) {
  const fullTitle    = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      {/* ── Primary ─────────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      {/* ── OpenGraph ───────────────────────────────────────────────── */}
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter / X Card ────────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  )
}
