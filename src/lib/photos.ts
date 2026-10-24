// Every photo slot on the site, in one place. To swap a photo: drop the new file
// in public/images/ and change `src` (and `alt`) here. Set `status` to 'final'
// once Rawdah has approved it.
//
//   final      Rawdah's own photo, approved for launch
//   rawdah     Rawdah's own photo from V1, waiting for a better or approved version
//   stand-in   Generic place photo (Wikimedia Commons, see public/images/placeholder/CREDITS.md).
//              Shown with a "Placeholder photo" tag. Must be replaced before launch.
//   missing    No photo yet. Renders a labelled empty frame describing what's needed.

export type PhotoStatus = 'final' | 'rawdah' | 'stand-in' | 'missing'

export type Photo = {
  src: string | null
  alt: string
  /** What this slot should show. Printed in the frame when the photo is missing. */
  needs: string
  status: PhotoStatus
  width?: number
  height?: number
  /** CSS object-position, to keep faces in frame */
  position?: string
}

export const PHOTOS = {
  homeHero: {
    src: '/images/journeys/group-ihram-palms.jpg',
    alt: 'A Rawdah Tours group in ihram, standing together under palm trees before Umrah',
    needs: 'Group photo, ideally in ihram, landscape, high resolution',
    status: 'rawdah',
    width: 1600,
    height: 1200,
    position: '50% 62%',
  },
  homeHajj: {
    src: '/images/placeholder/haram-mataf.jpg',
    alt: 'Pilgrims in ihram praying around the Kaaba in daylight',
    needs: 'Hajj or Makkah photo for the Hajj 2027 panel',
    status: 'stand-in',
    width: 1800,
    height: 1124,
    position: '50% 45%',
  },
  homeUmrah: {
    src: '/images/journeys/group-madinah-mosque.jpg',
    alt: 'A Rawdah Tours group outside a white mosque in Madinah',
    needs: 'Umrah group photo for the Umrah panel',
    status: 'rawdah',
    width: 1600,
    height: 1200,
    position: '50% 70%',
  },
  meaning: {
    src: '/images/placeholder/madinah-arcade.jpg',
    alt: 'The green dome of Masjid an-Nabawi above the mosque’s arcades in Madinah',
    needs: 'Masjid an-Nabawi or the green dome, ideally taken on a Rawdah trip',
    status: 'stand-in',
    width: 1400,
    height: 1400,
    position: '60% 40%',
  },
  journeyMadinah: {
    src: '/images/placeholder/madinah-plaza.jpg',
    alt: 'The umbrellas in the courtyard of Masjid an-Nabawi, with the green dome beyond',
    needs: 'Madinah scene for the journey chapter',
    status: 'stand-in',
    width: 1350,
    height: 1800,
    position: '50% 55%',
  },
  journeyMakkah: {
    src: '/images/placeholder/haram-night.jpg',
    alt: 'The Kaaba at night with pilgrims in ihram',
    needs: 'Makkah scene at night for the journey chapter',
    status: 'stand-in',
    width: 1800,
    height: 1274,
    position: '50% 50%',
  },
  hajjHero: {
    src: '/images/journeys/group-haram-evening.jpg',
    alt: 'A Rawdah Tours group together outside the Haram in the evening',
    needs: 'Group photo in Makkah for the Hajj page (the live page uses one)',
    status: 'rawdah',
    width: 1200,
    height: 1600,
    position: '50% 60%',
  },
  hajjPreparation: {
    src: null,
    alt: '',
    needs: 'Travellers in a Hajj preparation session',
    status: 'missing',
  },
  umrahHero: {
    src: '/images/journeys/three-in-ihram.jpg',
    alt: 'Three Rawdah Tours travellers in ihram, smiling in a palm-shaded courtyard',
    needs: 'Umrah photo for the Umrah page',
    status: 'rawdah',
    width: 1200,
    height: 1600,
    position: '50% 35%',
  },
  aboutHero: {
    src: '/images/journeys/group-ziyarah-hill.jpg',
    alt: 'A Rawdah Tours group on a hillside during ziyarah, mountains behind them',
    needs: 'Group photo for the About page',
    status: 'rawdah',
    width: 1600,
    height: 1200,
    position: '50% 55%',
  },
} satisfies Record<string, Photo>

/** Photos from previous Rawdah journeys, for the gallery. */
export const GALLERY: Photo[] = [
  {
    src: '/images/journeys/group-madinah-mosque.jpg',
    alt: 'A Rawdah Tours group outside a white mosque in Madinah',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1600,
    height: 1200,
  },
  {
    src: '/images/journeys/three-in-ihram.jpg',
    alt: 'Three travellers in ihram, smiling, before Umrah',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1200,
    height: 1600,
    position: '50% 35%',
  },
  {
    src: '/images/journeys/group-ziyarah-hill.jpg',
    alt: 'The group on a rocky hillside during ziyarah',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1600,
    height: 1200,
  },
  {
    src: '/images/journeys/group-makkah-clock-tower.jpg',
    alt: 'Four travellers in the courtyard of Masjid al-Haram, the clock tower behind them',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1350,
    height: 1800,
    position: '50% 70%',
  },
  {
    src: '/images/journeys/group-haram-evening.jpg',
    alt: 'The group together outside the Haram in the evening',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1200,
    height: 1600,
    position: '50% 60%',
  },
  {
    src: '/images/journeys/group-ihram-palms.jpg',
    alt: 'The group in ihram under palm trees',
    needs: 'Trip photo',
    status: 'rawdah',
    width: 1600,
    height: 1200,
  },
]

export const GALLERY_CAPTIONS = ['Madinah', 'Before Umrah', 'On ziyarah', 'Makkah', 'At the Haram', 'In ihram, together']
