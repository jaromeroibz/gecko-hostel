export type Package = {
  id: string
  name: string
  duration: string
  /** Number of nights included in the package — enforced as minimum stay */
  nights: number
  accommodation: string
  price: number
  /** How the price is billed — '/ person' for dorms, '/ room' for private rooms */
  priceUnit: string
  /** Room IDs from bookingRooms.ts that this package applies to */
  roomIds: string[]
  /** Shown when more than one room is valid for this package */
  note?: string
}

export const PACKAGES: Record<string, Package> = {
  backpacker: {
    id: 'backpacker',
    name: 'Backpacker Surf Camp',
    duration: '6 days · 5 nights',
    nights: 5,
    accommodation: 'Shared dorm',
    price: 749,
    priceUnit: '/ person',
    roomIds: ['6-gecko'],
  },
  adventure: {
    id: 'adventure',
    name: 'Surf & Adventure Camp',
    duration: '10 days · 7 nights',
    nights: 7,
    accommodation: 'Shared dorm',
    price: 1249,
    priceUnit: '/ person',
    roomIds: ['6-gecko'],
  },
  couples: {
    id: 'couples',
    name: 'Couples Surf Escape',
    duration: '6 days · 5 nights',
    nights: 5,
    accommodation: 'Private room for 2',
    price: 1798,
    priceUnit: '/ room',
    roomIds: ['la-lora'],
  },
  family: {
    id: 'family',
    name: 'Friends & Family Surf Retreat',
    duration: '5 days · 5 nights',
    nights: 5,
    accommodation: 'Private family room',
    price: 3396,
    priceUnit: '/ room',
    roomIds: ['rocamar', 'paraiso'],
    note: 'Both rooms below work for this package — pick whichever suits your group.',
  },
}
