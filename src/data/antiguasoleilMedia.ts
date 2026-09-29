import type { PropertyPhoto } from "@/data/antiguabellaMedia";

const mediaRoot = "/media/antiguasoleil";

function photo(
  id: string,
  alt: string,
  caption: string,
  width: number,
  height: number,
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

/** Opening image for the AntiguaSoleil property page. */
export const antiguaSoleilHero = photo(
  "pool-framed",
  "Covered terrace and pool at AntiguaSoleil, looking toward the coast",
  "Covered terrace, pool, and the view toward the coast",
  1024,
  682,
);

/** Listing-card image. Different frame from the property-page hero. */
export const antiguaSoleilCard = photo(
  "pool-wide",
  "Pool and lounge terrace at AntiguaSoleil overlooking the coast",
  "Pool and lounge terrace",
  1024,
  682,
);

export const antiguaSoleilGallery: PropertyPhoto[] = [
  antiguaSoleilHero,
  photo(
    "outdoor-dining",
    "Outdoor dining table beside the pool at AntiguaSoleil",
    "Outdoor dining beside the pool",
    1024,
    682,
  ),
  photo(
    "living-doors",
    "Living room at AntiguaSoleil opening toward the terrace",
    "Living room opening toward the terrace",
    1024,
    682,
  ),
  photo(
    "open-plan",
    "Dining room, kitchen, and living area at AntiguaSoleil",
    "Dining room, kitchen, and living area",
    1024,
    682,
  ),
  photo(
    "kitchen",
    "Kitchen at AntiguaSoleil",
    "Kitchen",
    1024,
    682,
  ),
  photo(
    "canopy-bedroom",
    "Bedroom at AntiguaSoleil opening onto a terrace",
    "Bedroom opening onto a terrace",
    1024,
    682,
  ),
  photo(
    "yellow-bedroom",
    "Bedroom at AntiguaSoleil with a garden window",
    "Bedroom with a garden window",
    1024,
    682,
  ),
  photo(
    "teal-bedroom",
    "Bedroom at AntiguaSoleil",
    "Bedroom",
    1024,
    682,
  ),
  photo(
    "teal-windows",
    "Bedroom at AntiguaSoleil with arched windows",
    "Bedroom with arched windows",
    1024,
    682,
  ),
  photo(
    "glass-bath",
    "Shower and vessel sink at AntiguaSoleil",
    "Shower and vessel sink",
    1024,
    682,
  ),
  photo(
    "bath-layout",
    "Bathroom at AntiguaSoleil",
    "Bathroom",
    682,
    1024,
  ),
  photo(
    "vanity-bath",
    "Second bathroom at AntiguaSoleil",
    "Second bathroom",
    1024,
    682,
  ),
  antiguaSoleilCard,
  photo(
    "welcome-sign",
    "Welcome sign reading AntiguaSoleil",
    "Welcome sign at AntiguaSoleil",
    1024,
    682,
  ),
];

/** Mosaic order: lifestyle, living, two bedrooms, shared rooms, bath. */
export const antiguaSoleilHighlights = [
  "outdoor-dining",
  "living-doors",
  "canopy-bedroom",
  "yellow-bedroom",
  "open-plan",
  "glass-bath",
];
