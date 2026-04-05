import type { BaseListing } from "@/types/index";
import type { ListingCurrency } from "@/types";
import { formatConvertedMoney } from "@/lib/currency";

export function formatListingMoney(
  currency: BaseListing["currency"],
  amount: number,
  displayCurrency: ListingCurrency = currency
): string {
  return formatConvertedMoney(amount, currency, displayCurrency);
}

export function getListingImage(
  listing: BaseListing,
  fallback = ""
): string {
  return listing.featuredImage ?? listing.images[0] ?? fallback;
}

export function getListingTagline(listing: BaseListing): string {
  return listing.subtitle ?? listing.shortDescription ?? "";
}

export function getListingEyebrow(
  listing: BaseListing,
  fallback: string
): string {
  return listing.category ?? listing.availabilityStatus ?? fallback;
}

export function getListingGuestLabel(listing: BaseListing): string {
  return listing.maxGuests != null ? `Up to ${listing.maxGuests} guests` : "";
}

export function getVillaSizeLabel(listing: BaseListing): string {
  if (listing.bedrooms != null) {
    return `${listing.bedrooms} Bedroom${listing.bedrooms === 1 ? "" : "s"}`;
  }

  return listing.category ?? "";
}

export function getListingPriceLabel(
  listing: BaseListing,
  suffix: "night" | "charter",
  displayCurrency: ListingCurrency = listing.currency
): string {
  return `From ${formatListingMoney(listing.currency, listing.price, displayCurrency)} / ${suffix}`;
}

export function getListingHighlights(
  listing: BaseListing,
  limit?: number
): string[] {
  const highlights = listing.amenities ?? listing.tags;
  return limit == null ? highlights : highlights.slice(0, limit);
}
