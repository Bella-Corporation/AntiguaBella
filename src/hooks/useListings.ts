import { listings } from "@/data/listings";
import type { BaseListing } from "@/types/index";

type VillaListing = BaseListing & { type: "villa" };
type ExperienceListing = BaseListing & { type: "experience" };
type CharterListing = BaseListing & { type: "charter" };
type FeaturedListing = BaseListing & { featured: true };

export function useListings(): {
  all: BaseListing[];
  villas: VillaListing[];
  experiences: ExperienceListing[];
  charters: CharterListing[];
  featured: FeaturedListing[];
} {
  const all = listings;

  const villas = listings.filter((l): l is VillaListing => l.type === "villa");
  const experiences = listings.filter(
    (l): l is ExperienceListing => l.type === "experience"
  );
  const charters = listings.filter(
    (l): l is CharterListing => l.type === "charter"
  );

  const featured = listings.filter(
    (l): l is FeaturedListing => l.featured === true
  );

  return { all, villas, experiences, charters, featured };
}

