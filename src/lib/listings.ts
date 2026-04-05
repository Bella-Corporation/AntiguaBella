import { listings } from "@/data/listings";
import type { BaseListing } from "@/types/index";

export function getAllListings(): BaseListing[] {
  return listings;
}

export function getFeaturedListings(): BaseListing[] {
  return listings.filter((l) => l.featured === true);
}

export function getListingsByType(type: "villa" | "experience" | "charter"): BaseListing[] {
  return listings.filter((l) => l.type === type);
}

export function getListingBySlug(slug: string): BaseListing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getListingById(id: string): BaseListing | undefined {
  return listings.find((l) => l.id === id);
}

