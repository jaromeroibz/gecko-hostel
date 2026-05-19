export type BookingRoom = {
  id: string
  rentalId: string
  name: string
  type: string
  beds: string
  capacity: number
  size: number
  bathroom: 'private' | 'shared'
  description: string
  highlights: string[]
  images: string[]
}

export const BOOKING_ROOMS: BookingRoom[] = [
  {
    id: '6-gecko',
    rentalId: '765108',
    name: '6 Gecko',
    type: 'Dormitory Room',
    beds: '1 single bed',
    capacity: 6,
    size: 56,
    bathroom: 'shared',
    description:
      'Our largest unit — a spacious shared dorm built for the surf traveler. Private kitchen, outdoor patio, and all the essentials for an easy surf trip. 3 minutes from Carmen Beach.',
    highlights: ['Free WiFi', 'AC', 'Shared kitchen', 'Patio', 'Coffee machine', 'Bicycle parking'],
    images: [],
  },
  {
    id: 'la-lora',
    rentalId: '765109',
    name: 'Doble — La Lora',
    type: 'Double Room',
    beds: '1 double bed',
    capacity: 2,
    size: 30,
    bathroom: 'shared',
    description:
      'A cozy private double ideal for couples or close friends. Fully equipped kitchen, flat-screen TV, and a private patio — all the comforts of home, steps from the surf.',
    highlights: ['Free WiFi', 'AC', 'Flat-screen TV', 'Kitchen', 'Patio', 'Coffee machine'],
    images: [
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106215/lphrdekhiwz6shgubevs.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106212/qienaslc4mc9kmemvqlk.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778097565/i9ezll1b3t4kzpuyrw2s.png',
    ],
  },
  {
    id: 'rocamar',
    rentalId: '765110',
    name: '4 Arriba — Rocamar',
    type: 'Quadruple Room',
    beds: '2 single beds + 1 double bed',
    capacity: 4,
    size: 42,
    bathroom: 'private',
    description:
      'A well-equipped quadruple with private bathroom and city views — perfect for groups or families. Full kitchen, outdoor dining area, and flat-screen TV included.',
    highlights: ['Free WiFi', 'AC', 'Private bathroom', 'Flat-screen TV', 'Kitchen', 'City view'],
    images: [
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778097552/nptib5wvaavcyx87vmlj.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778097552/vigg2fz4tko4rvgcu8fw.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778097537/ankzk8jf40mapd5a8xvj.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778094543/mcnilngopvbv74yzeeic.png',
    ],
  },
  {
    id: 'paraiso',
    rentalId: '765111',
    name: '4 Abajo — Paraíso',
    type: 'Quadruple Room',
    beds: '2 single beds + 1 double bed',
    capacity: 4,
    size: 42,
    bathroom: 'private',
    description:
      'Garden and city views from this ground-floor quadruple. Private kitchen, outdoor seating, and private bathroom make it an ideal base for families or friend groups.',
    highlights: ['Free WiFi', 'AC', 'Private bathroom', 'Flat-screen TV', 'Garden view', 'Patio'],
    images: [
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106383/ljp9opiqapsdx5u5ipno.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106383/qdi6cuh7ds6gwfoes7to.png',
      'https://res.cloudinary.com/doow0mhrm/image/upload/v1778106372/c4bub57upaqiryfx1hqw.png',
    ],
  },
]
