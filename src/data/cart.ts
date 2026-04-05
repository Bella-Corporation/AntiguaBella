import spaWellness from "@/assets/spa-wellness.jpg";
import { getListingById } from "@/lib/listings";
import type { BaseListing, ListingType } from "@/types/index";

export type CartItemType = ListingType | "car";

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  description: string;
  image: string;
  price: number;
  dates: { from: Date; to: Date };
  guests?: number;
  selected: boolean;
}

export const categoryLabels: Record<CartItemType, string> = {
  villa: "Villas",
  experience: "Experiences",
  charter: "Charters",
  car: "Car Rentals",
};

export const categoryOrder: CartItemType[] = ["villa", "experience", "charter", "car"];

const listingImage = (listing: BaseListing) =>
  listing.featuredImage ?? listing.images[0];

const requireListing = <TType extends ListingType>(
  id: string,
  type: TType
): BaseListing & { type: TType } => {
  const listing = getListingById(id);
  if (!listing || listing.type !== type) {
    throw new Error(`Missing expected ${type} listing mock: ${id}`);
  }
  return listing;
};

// Mock cart seed used by the current `/bag` page.
// Kept isolated so list pages, booking UI, and future checkout all share the same “mock world”.
export const initialCartItems: CartItem[] = (() => {
  const villaAntiguaBella = requireListing("AntiguaBella", "villa");
  const villaSugarMoon = requireListing("Sugar Moon", "villa");
  const charterPrivateCoastline = requireListing("coastline_private_day", "charter");
  const expCulinaryJourneys = requireListing("culinary_journeys", "experience");
  const expOceanReef = requireListing("ocean_reef", "experience");

  return [
    {
      id: "v1",
      type: "villa",
      name: villaAntiguaBella.title,
      description: villaAntiguaBella.shortDescription ?? villaAntiguaBella.description,
      image: listingImage(villaAntiguaBella),
      price: villaAntiguaBella.price,
      dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 17) },
      guests: 4,
      selected: true,
    },
    {
      id: "v2",
      type: "villa",
      name: villaSugarMoon.title,
      description: villaSugarMoon.shortDescription ?? villaSugarMoon.description,
      image: listingImage(villaSugarMoon),
      price: villaSugarMoon.price,
      dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 14) },
      guests: 2,
      selected: true,
    },
    {
      id: "e1",
      type: "charter",
      name: charterPrivateCoastline.title,
      description: charterPrivateCoastline.shortDescription ?? charterPrivateCoastline.description,
      image: listingImage(charterPrivateCoastline),
      price: charterPrivateCoastline.price,
      dates: { from: new Date(2026, 3, 12), to: new Date(2026, 3, 12) },
      guests: 4,
      selected: true,
    },
    {
      id: "e2",
      type: "experience",
      name: expCulinaryJourneys.title,
      description: expCulinaryJourneys.shortDescription ?? expCulinaryJourneys.description,
      image: listingImage(expCulinaryJourneys),
      price: expCulinaryJourneys.price,
      dates: { from: new Date(2026, 3, 13), to: new Date(2026, 3, 13) },
      guests: 2,
      selected: true,
    },
    {
      id: "e3",
      type: "experience",
      name: expOceanReef.title,
      description: expOceanReef.shortDescription ?? expOceanReef.description,
      image: listingImage(expOceanReef),
      price: expOceanReef.price,
      dates: { from: new Date(2026, 3, 15), to: new Date(2026, 3, 15) },
      guests: 4,
      selected: false,
    },
    {
      id: "c1",
      type: "car",
      name: "Range Rover Sport",
      description: "Luxury SUV with GPS, AC & full insurance included",
      image: spaWellness,
      price: 280,
      dates: { from: new Date(2026, 3, 10), to: new Date(2026, 3, 17) },
      selected: true,
    },
  ];
})();

