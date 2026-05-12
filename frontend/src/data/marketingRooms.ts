/**
 * Static marketing copy for room types. Structured for future API or Lodgify wiring.
 */
export type MarketingRoom = {
  id: string
  name: string
  tagline: string
  description: string
  capacityLabel: string
  roomType: string
  /** Display price — marketing only; live rates remain on Lodgify */
  fromPriceUsd: number
  imageSrc: string
  imageAlt: string
  highlights: string[]
}

export const MARKETING_ROOMS: MarketingRoom[] = [
  {
    id: 'gecko-dorm',
    name: '6 Gecko',
    tagline: 'Social surf energy',
    description:
      'Our signature shared space—perfect for meeting travelers, early surf missions, and easygoing evenings after the beach.',
    capacityLabel: 'Sleeps 6',
    roomType: 'Shared dorm',
    fromPriceUsd: 45,
    imageSrc:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bright hostel dorm with wooden bunks and warm lighting',
    highlights: ['Lockers', 'Shared lounge', 'Surf rinse area nearby'],
  },
  {
    id: 'la-lora',
    name: 'Doble — La Lora',
    tagline: 'Private room calm',
    description:
      'A quiet double for couples or friends who want privacy without losing the hostel pulse—ideal after long days in the water.',
    capacityLabel: 'Sleeps 2',
    roomType: 'Private room',
    fromPriceUsd: 95,
    imageSrc:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Minimal private bedroom with crisp linens',
    highlights: ['Private bathroom', 'Daily housekeeping', 'Premium linens'],
  },
  {
    id: 'paraiso',
    name: 'Paraíso',
    tagline: 'Space for small crews',
    description:
      'Extra room to spread out—great for small groups or families who want comfort, airflow, and a basecamp for adventures.',
    capacityLabel: 'Sleeps 4',
    roomType: 'Family room',
    fromPriceUsd: 120,
    imageSrc:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Spacious hotel family room with two beds',
    highlights: ['Lounge seating', 'Work-friendly table', 'Kid-friendly layout'],
  },
  {
    id: 'rocamar',
    name: 'Rocamar',
    tagline: 'Elevated surf retreat',
    description:
      'Our most refined private option—tailored for travelers who want elevated comfort and a slower rhythm between sessions.',
    capacityLabel: 'Sleeps 2',
    roomType: 'Private suite',
    fromPriceUsd: 110,
    imageSrc:
      'https://images.unsplash.com/photo-1611892440504-42a792e54d32?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Boutique hotel suite with ocean-inspired decor',
    highlights: ['Premium mattress', 'Rain shower', 'Local art touches'],
  },
]
