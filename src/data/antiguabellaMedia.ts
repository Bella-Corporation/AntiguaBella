const mediaRoot = "/media/antiguabella";

export type PropertyPhoto = {
  id: string;
  avif?: string;
  webp?: string;
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

function photo(
  id: string,
  alt: string,
  caption: string,
  width = 1024,
  height = 682,
): PropertyPhoto {
  return {
    id,
    webp: `${mediaRoot}/${id}.webp`,
    src: `${mediaRoot}/${id}.jpg`,
    srcSet: `${mediaRoot}/${id}-640.jpg 640w, ${mediaRoot}/${id}.jpg ${width}w`,
    alt,
    caption,
    width,
    height,
  };
}

/** Landing-page still. Left in place so the homepage video treatment stays unchanged. */
export const antiguaBellaHero = {
  src: `${mediaRoot}/01-homepage-pool-terrace-1920.jpg`,
  srcSet: `${mediaRoot}/01-homepage-pool-terrace-1280.jpg 1280w, ${mediaRoot}/01-homepage-pool-terrace-1920.jpg 1920w`,
  width: 1920,
  height: 1440,
  alt: "Pool and terracotta terrace with a white pergola and coastal view",
};

/** Opening image on the AntiguaBella property page. */
export const antiguaBellaPageHero = photo(
  "bella-terrace-dining",
  "Covered dining terrace and pool at AntiguaBella, with hills and the coast beyond",
  "Dining terrace and pool",
);

/** Listing-card image. A different frame from the property-page hero. */
export const antiguaBellaCard = photo(
  "bella-bistro-view",
  "Terrace table overlooking the coast at AntiguaBella",
  "Terrace table overlooking the coast",
);

export const antiguaBellaAbout = photo(
  "bella-pergola",
  "Outdoor sofa under a pergola beside the pool at AntiguaBella",
  "Pergola seating beside the pool",
  682,
  1024,
);

/** Wide view used on the stays index, separate from the property hero and the card. */
export const antiguaBellaStaysHero = photo(
  "bella-balcony",
  "Terrace overlook toward the coast at AntiguaBella",
  "Terrace overlook toward the coast",
);

export const antiguaBellaGallery: PropertyPhoto[] = [
  antiguaBellaPageHero,
  photo(
    "bella-island-dining",
    "Outdoor dining at AntiguaBella framed toward an offshore island",
    "Dining framed toward the coast",
  ),
  antiguaBellaCard,
  antiguaBellaStaysHero,
  photo(
    "bella-living",
    "Living room at AntiguaBella",
    "Living room",
  ),
  photo(
    "bella-open-plan",
    "Dining room, kitchen, and living area at AntiguaBella",
    "Dining room, kitchen, and living area",
  ),
  photo(
    "bella-kitchen",
    "Kitchen at AntiguaBella",
    "Kitchen",
  ),
  photo(
    "bella-coffee-bar",
    "Kitchen counter at AntiguaBella",
    "Kitchen counter",
  ),
  photo(
    "bella-canopy-bedroom",
    "Canopy bedroom at AntiguaBella opening onto a terrace",
    "Canopy bedroom opening onto a terrace",
  ),
  photo(
    "bella-canopy-window",
    "Canopy bedroom at AntiguaBella with a window toward the pool",
    "Canopy bedroom with a window toward the pool",
  ),
  photo(
    "bella-yellow-bedroom",
    "Bedroom at AntiguaBella with a draped four-poster bed",
    "Bedroom with a draped four-poster",
  ),
  photo(
    "bella-yellow-corner",
    "Bedroom at AntiguaBella with garden windows",
    "Bedroom with garden windows",
  ),
  photo(
    "bella-teal-bedroom",
    "Bedroom at AntiguaBella with an arched window",
    "Bedroom with an arched window",
  ),
  photo(
    "bella-glass-bath",
    "Bathroom at AntiguaBella with a glass-block shower",
    "Bathroom with a glass-block shower",
  ),
  photo(
    "bella-vanity-bath",
    "Bathroom at AntiguaBella",
    "Bathroom",
  ),
  antiguaBellaAbout,
  photo(
    "bella-pool-lounger",
    "Lounge chair beside the pool at AntiguaBella",
    "Lounge chair beside the pool",
  ),
  photo(
    "bella-welcome",
    "Welcome sign reading AntiguaBella",
    "Welcome sign at AntiguaBella",
  ),
];

export const antiguaBellaFeatured = antiguaBellaCard;

/** Mosaic: view, living, two bedrooms, kitchen, bath. The pool terrace is the page hero. */
export const antiguaBellaHighlights = [
  "bella-island-dining",
  "bella-living",
  "bella-canopy-bedroom",
  "bella-yellow-bedroom",
  "bella-kitchen",
  "bella-glass-bath",
];

export const heroLoopSrc = `${mediaRoot}/hero-landing.mp4`;

export const villaFilmSrc = `${mediaRoot}/villa-film.mp4`;

export const villaFilmPoster = `${mediaRoot}/villa-film-poster.jpg`;
