const mediaRoot = "/media/shared";

export type SharedPhoto = {
  id: string;
  webp: string;
  src: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
};

function photo(
  id: string,
  alt: string,
  width: number,
  height: number,
): SharedPhoto {
  return {
    id,
    webp: `${mediaRoot}/${id}.webp`,
    src: `${mediaRoot}/${id}.jpg`,
    srcSet: `${mediaRoot}/${id}-640.jpg 640w, ${mediaRoot}/${id}.jpg ${width}w`,
    alt,
    width,
    height,
  };
}

/** Harbor, island, and hills. Used as destination context, not as a villa view. */
export const sharedCoastAerial = photo(
  "coast-aerial",
  "Aerial view of Antigua’s harbor, a small island, and the green coast",
  682,
  1024,
);

/** Anchored boats and a headland. Destination atmosphere, not an AntiguaBella vessel. */
export const sharedCoastIsland = photo(
  "coast-island",
  "Sailboats anchored off a green headland on the Antigua coast",
  1024,
  682,
);

/** Open bay with sailboats. Used only as coast atmosphere, not as a charter the brand operates. */
export const sharedCoastBay = photo(
  "coast-bay",
  "Sailboats in a bay along the Antigua coast, seen through shoreline trees",
  1024,
  682,
);

function frame(id: string, alt: string): SharedPhoto {
  return {
    id,
    webp: `${mediaRoot}/${id}-640.webp 640w, ${mediaRoot}/${id}.webp 722w`,
    src: `${mediaRoot}/${id}.jpg`,
    srcSet: `${mediaRoot}/${id}-640.jpg 640w, ${mediaRoot}/${id}.jpg 722w`,
    alt,
    width: 722,
    height: 722,
  };
}

/** Left third of the patio panorama. Homepage card only. */
export const panoSoleil = frame(
  "pano-soleil",
  "Lounge chairs beside the pool on the left side of the patio",
);

/** Center third of the patio panorama. Homepage card only. */
export const panoBoth = frame(
  "pano-both",
  "Pergola and seating at the center of the patio, with the coast beyond",
);

/** Right third of the patio panorama. Homepage card only. */
export const panoBella = frame(
  "pano-bella",
  "Pool, umbrella, and hillside on the right side of the patio",
);
