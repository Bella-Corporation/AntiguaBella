export type ListingType = "villa" | "experience" | "charter";

export type ListingCurrency = "USD" | "XCD";

export type AvailabilityStatus = "available" | "limited" | "unavailable";

export interface BaseListing {
  id: string;
  slug: string;
  type: ListingType;
  title: string;
  description: string;
  location: string;
  price: number;
  currency: ListingCurrency;
  images: string[];
  tags: string[];

  subtitle?: string;
  shortDescription?: string;
  featuredImage?: string;
  category?: string;
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  availabilityStatus?: AvailabilityStatus;
  featured?: boolean;
}

