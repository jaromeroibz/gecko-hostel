/**
 * Global JSON-LD structured data rendered once inside <MainLayout>.
 * Covers: Hostel, LocalBusiness, WebSite, and FAQ.
 *
 * Per-page schemas (Accommodation, BreadcrumbList, TouristDestination)
 * are injected inside their respective page components.
 */

import { SITE_URL } from './SEOHead'

const LOGO_URL =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/v1779896306/gecko-logo-cropped_hpduef.png'

const HERO_IMAGE =
  'https://res.cloudinary.com/dgvalkx1m/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1778627977/frames-for-your-heart-eBSKJJuPeO8-unsplash_uc6ksc.jpg'

// ── Helper: inject a <script type="application/ld+json"> ──────────────────────
function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  )
}

// ── 1. Hostel / LodgingBusiness ───────────────────────────────────────────────
const hostelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hostel',
  '@id': `${SITE_URL}/#hostel`,
  name: 'Gecko Surf House',
  alternateName: ['Gecko Surf Hostel', 'Gecko Santa Teresa'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 433,
    height: 378,
  },
  image: [HERO_IMAGE],
  description:
    'Boutique surf hostel in Santa Teresa, Costa Rica — 3 minutes from Playa Carmen. Offering surf packages, private rooms, and shared dorms for backpackers, surfers, couples and groups.',
  telephone: '+50687390370',
  email: 'geckosurfhousecr@gmail.com',
  priceRange: '$$',
  currenciesAccepted: 'USD, CRC',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Santa Teresa',
    addressLocality: 'Santa Teresa',
    addressRegion: 'Puntarenas',
    postalCode: '60111',
    addressCountry: 'CR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.6320219,
    longitude: -85.1573193,
  },
  hasMap: 'https://www.google.com/maps/place/Gecko+Surf+House/@9.6320219,-85.1573193,17z',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  checkinTime: '15:00',
  checkoutTime: '11:00',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi',                value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning',         value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Shared Kitchen',           value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Surfboard Storage',        value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Surf Lessons Available',   value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor Patio',            value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Coffee Machine',           value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Video Analysis Available', value: true },
  ],
  numberOfRooms: 4,
  petsAllowed: false,
  sameAs: [
    'https://www.instagram.com/gecko_surfhouse/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '24',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Léon' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      publisher: { '@type': 'Organization', name: 'Airbnb' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Josefine' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      publisher: { '@type': 'Organization', name: 'Airbnb' },
    },
  ],
}

// ── 2. WebSite ────────────────────────────────────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Gecko Surf House',
  description: 'Boutique surf hostel in Santa Teresa, Costa Rica',
  publisher: { '@id': `${SITE_URL}/#hostel` },
  inLanguage: ['en', 'es'],
}

// ── 3. FAQ ────────────────────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How far is Gecko Surf House from the beach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gecko Surf House is a 3-minute walk from Playa Carmen in Santa Teresa, Costa Rica — one of the most consistent surf breaks on the Pacific coast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Gecko Surf House offer surf lessons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer surf lessons through our packages (Backpacker Surf Camp, Surf & Adventure Camp, Couples Surf Escape, and Friends & Family Surf Retreat) as well as individual add-on lessons you can book as extras at checkout.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of rooms are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We have four rooms: Gecko Dorm (6-bed shared dormitory), La Lora (private double), Rocamar (private quadruple with patio), and Paraíso (spacious private quadruple). All include free WiFi and AC.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the check-in and check-out times?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check-in is from 3:00 PM and check-out is by 11:00 AM, Monday through Sunday. Reception is open 8 AM–10 PM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have surf packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we offer four curated multi-day surf packages starting from $890 per person. Each includes accommodation, surf lessons, guided tours, and breakfast. Packages range from 5 to 7 nights.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where exactly is Gecko Surf House located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are located in Santa Teresa, on the Nicoya Peninsula in Puntarenas Province, Costa Rica. The nearest airport is Cobano (30 minutes away). GPS coordinates: 9.6320219, -85.1573193.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a shared kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a fully equipped shared kitchen, coffee machine, and outdoor patio are available to all guests.',
      },
    },
  ],
}

// ── 4. Local Business (reinforces map/local signals) ──────────────────────────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Gecko Surf House',
  image: HERO_IMAGE,
  url: SITE_URL,
  telephone: '+50687390370',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Santa Teresa',
    addressLocality: 'Santa Teresa',
    addressRegion: 'Puntarenas',
    addressCountry: 'CR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.6320219,
    longitude: -85.1573193,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  sameAs: ['https://www.instagram.com/gecko_surfhouse/'],
}

// ── Export ────────────────────────────────────────────────────────────────────
export function SchemaMarkup() {
  return (
    <>
      <JsonLd schema={hostelSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={localBusinessSchema} />
    </>
  )
}

// ── Per-page schemas (used directly in individual pages) ──────────────────────

/** BreadcrumbList for inner pages */
export function BreadcrumbSchema({
  crumbs,
}: {
  crumbs: Array<{ name: string; path: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    ],
  }
  return <JsonLd schema={schema} />
}

/** Individual room / accommodation schema */
export function AccommodationSchema({
  name,
  description,
  type,
  image,
  capacity,
  size,
  path,
  price,
}: {
  name: string
  description: string
  type: string
  image?: string
  capacity: number
  size: number
  path: string
  price?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name,
    description,
    accommodationCategory: type,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: capacity,
      unitCode: 'C62',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: size,
      unitCode: 'MTK',
    },
    url: `${SITE_URL}${path}`,
    ...(image ? { image } : {}),
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
    containedInPlace: { '@id': `${SITE_URL}/#hostel` },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi',          value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning',   value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Shared Kitchen',     value: true },
    ],
  }
  return <JsonLd schema={schema} />
}

/** TouristDestination schema for the location page */
export function TouristDestinationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Santa Teresa, Costa Rica',
    description:
      'Santa Teresa is a world-class surf destination on the Nicoya Peninsula, Costa Rica — famous for consistent beach and point breaks, 27°C water, jungle wildlife, and Pacific sunsets.',
    url: `${SITE_URL}/location`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.6320219,
      longitude: -85.1573193,
    },
    touristType: ['Surfer', 'Backpacker', 'Adventure Traveler', 'Nature Lover'],
    includesAttraction: [
      {
        '@type': 'TouristAttraction',
        name: 'Playa Carmen',
        description: 'Main surf beach in Santa Teresa — powerful beach break perfect for all levels.',
      },
      {
        '@type': 'TouristAttraction',
        name: 'Montezuma Waterfalls',
        description: 'Stunning three-tiered waterfall system reachable by guided tour from Santa Teresa.',
      },
      {
        '@type': 'TouristAttraction',
        name: 'Nicoya Peninsula Tide Pools',
        description: 'Rich coastal tide pools with diverse marine life along the Santa Teresa coastline.',
      },
    ],
    containedInPlace: {
      '@type': 'State',
      name: 'Puntarenas',
      containedInPlace: {
        '@type': 'Country',
        name: 'Costa Rica',
      },
    },
  }
  return <JsonLd schema={schema} />
}
