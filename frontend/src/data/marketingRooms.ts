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
      'https://res.cloudinary.com/doow0mhrm/image/upload/f_auto,q_auto,w_1200/v1779470181/trpavi8zpjdcrjisycz3.webp',
    imageAlt: 'Spacious shared dorm at Gecko Surf House',
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
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106215/lphrdekhiwz6shgubevs.png',
    imageAlt: 'Private double room at Gecko Surf House — La Lora',
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
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106383/ljp9opiqapsdx5u5ipno.png',
    imageAlt: 'Paraíso quadruple room at Gecko Surf House',
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
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778097552/nptib5wvaavcyx87vmlj.png',
    imageAlt: 'Rocamar quadruple room at Gecko Surf House',
    highlights: ['Premium mattress', 'Rain shower', 'Local art touches'],
  },
]
