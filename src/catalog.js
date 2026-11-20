export const instagram = 'https://www.instagram.com/keblawe_motors1/'
export const phone = '+961 71 817 825'
export const directions = 'https://www.google.com/maps/search/?api=1&query=Keblawe+Motors+Ghazieh+Lebanon'

export function whatsapp(message = '') {
  const destination = 'https://wa.me/96171817825'
  return message ? `${destination}?text=${encodeURIComponent(message)}` : destination
}

export function vehicleName({ year, make, model }) {
  return [year, make, model].filter(Boolean).join(' ')
}

const photo = (file, alt, position) => ({ src: `/images/${file}.webp`, alt, position: `center ${position}%` })

export const vehicles = [
  {
    id: 'mercedes-c300',
    make: 'Mercedes-Benz',
    model: 'C 300 AMG',
    year: 2018,
    category: 'Sedan',
    source: 'https://www.instagram.com/stories/highlights/18112856305899733/',
    photos: [
      photo('c300-front', 'White Mercedes-Benz C 300 AMG, front three-quarter view', 78),
      photo('c300-front-detail', 'Opposite front angle of the white C 300 AMG', 75),
      photo('c300-wheel', 'Rear wheel and bodywork on the C 300 AMG', 61),
      photo('c300-side', 'Side mirror and doors on the C 300 AMG', 58),
    ],
  },
  {
    id: 'range-rover-2016',
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2016,
    category: 'SUV',
    source: 'https://www.instagram.com/stories/highlights/17978531916051107/',
    photos: [
      photo('range-rover-front-quarter', 'Black Range Rover from the front three-quarter angle', 75),
      photo('range-rover-front', 'Front of the black Range Rover', 82),
      photo('range-rover-opposite-side', 'Black Range Rover from the opposite front angle', 77),
      photo('range-rover-engine', 'Black Range Rover with its bonnet open', 75),
    ],
  },
  {
    id: 'mercedes-e300',
    make: 'Mercedes-Benz',
    model: 'E 300',
    year: 2018,
    category: 'Sedan',
    source: 'https://www.instagram.com/stories/highlights/18162532831458574/',
    photos: [
      photo('e300-rear', 'Black Mercedes-Benz E 300, rear three-quarter view', 78),
      photo('e300-rear-sunset', 'Black E 300 from the opposite rear angle at sunset', 78),
      photo('e300-badge', 'Rear badge and taillight on the black E 300', 65),
      photo('e300-dashboard', 'Dashboard and center console in the E 300', 61),
      photo('e300-seats', 'Front seats in the E 300', 57),
    ],
  },
  {
    id: 'range-rover-sport',
    make: 'Land Rover',
    model: 'Range Rover Sport',
    category: 'SUV',
    source: 'https://www.instagram.com/keblawe_motors1/reel/Df45tn0AGyT/',
    photos: [
      photo('rover-sport', 'White Range Rover Sport seen from the front quarter', 50),
    ],
  },
  {
    id: 'honda-civic',
    make: 'Honda',
    model: 'Civic',
    category: 'Sedan',
    source: 'https://www.instagram.com/keblawe_motors1/reel/DfmDExnglfT/',
    photos: [
      photo('honda-civic-front', 'Gray Honda Civic from the front three-quarter angle', 76),
      photo('honda-civic-rear', 'Rear three-quarter view of the gray Honda Civic', 64),
      photo('honda-civic-cabin', 'Honda Civic front seats and center console', 57),
    ],
  },
  {
    id: 'jeep-grand-cherokee',
    make: 'Jeep',
    model: 'Grand Cherokee',
    category: 'SUV',
    source: 'https://www.instagram.com/keblawe_motors1/reel/DfVaPWJAE1T/',
    photos: [
      photo('jeep-grand-cherokee-rear', 'Black Jeep Grand Cherokee from the rear three-quarter angle', 68),
      photo('jeep-grand-cherokee-front', 'Front three-quarter view of the black Jeep Grand Cherokee', 62),
      photo('jeep-grand-cherokee-tailgate', 'Rear window, tailgate, and badges on the Jeep Grand Cherokee', 58),
    ],
  },
  {
    id: 'mercedes-c250-2014',
    make: 'Mercedes-Benz',
    model: 'C 250',
    year: 2014,
    category: 'Coupe',
    source: 'https://www.instagram.com/keblawe_motors1/reel/DfsliJtAAo9/',
    photos: [
      photo('mercedes-c250-2014-front', 'Black Mercedes-Benz C 250 coupe from the front three-quarter angle', 69),
      photo('mercedes-c250-2014-rear', 'Rear and C 250 badge on the black Mercedes-Benz coupe', 56),
      photo('mercedes-c250-2014-cabin', 'Burgundy front seat in the Mercedes-Benz C 250 coupe', 57),
    ],
  },
  {
    id: 'mercedes-c250-2012',
    make: 'Mercedes-Benz',
    model: 'C 250',
    year: 2012,
    category: 'Sedan',
    source: 'https://www.instagram.com/keblawe_motors1/reel/DfqHD3MgDr5/',
    photos: [
      photo('mercedes-c250-2012-front', 'Front of the black Mercedes-Benz C 250 sedan', 62),
      photo('mercedes-c250-2012-dashboard', 'Dashboard and front passenger seat in the Mercedes-Benz C 250 sedan', 50),
      photo('mercedes-c250-2012-rear-seats', 'Rear seats in the Mercedes-Benz C 250 sedan', 54),
    ],
  },
]
