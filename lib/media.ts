export const photos = {
  living: {
    src: "/properties/living-room.jpg",
    width: 1400,
    height: 1050,
  },
  house: {
    src: "/properties/house-facade.jpg",
    width: 1600,
    height: 1067,
  },
  bedroom: {
    src: "/properties/bedroom.jpg",
    width: 1400,
    height: 1050,
  },
  interior: {
    src: "/properties/interior.jpg",
    width: 1400,
    height: 933,
  },
  apartment: {
    src: "/properties/apartment.jpg",
    width: 1400,
    height: 1050,
  },
  building: {
    src: "/properties/building.jpg",
    width: 1400,
    height: 933,
  },
} as const;

export const listingPhoto = {
  living: photos.living,
  house: photos.house,
  bedroom: photos.bedroom,
} as const;

/**
 * Illustrative property photography from Unsplash (https://unsplash.com/license).
 * The photos are not listings from a Reevue customer.
 * living-room: photo-1600210492486-724fe5c67fb0
 * house-facade: photo-1600585154340-be6161a56a0c
 * bedroom: photo-1616594039964-ae9021a400a0
 * interior: photo-1600607687939-ce8a6c25118c
 * apartment: photo-1502672260266-1c1ef2d93688
 * building: photo-1545324418-cc1a3fa10c00
 */
