import {
  getAllListings,
  getListingById,
} from "@/lib/listings";
import type { TranslationKey } from "@/lib/translations";
import type { BaseListing, ListingType } from "@/types";

export interface RequestSelectionContext {
  type: ListingType;
  id: string;
  name: string;
  tagline?: string;
  categoryLabel?: string;
}

interface RequestSelectionInput {
  type: ListingType;
  id: string;
  name: string;
  tagline?: string;
  categoryLabel?: string;
}

const REQUEST_PARAM_KEYS = {
  type: "type",
  id: "item",
  name: "name",
  tagline: "tagline",
  categoryLabel: "category",
} as const;

const REQUEST_TYPES: ListingType[] = ["villa", "experience", "charter"];

function isRequestType(value: string | null): value is ListingType {
  return value != null && REQUEST_TYPES.includes(value as ListingType);
}

function normalizeValue(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function createRequestSelectionContext(
  input: RequestSelectionInput
): RequestSelectionContext {
  return {
    type: input.type,
    id: input.id.trim(),
    name: input.name.trim(),
    tagline: normalizeValue(input.tagline),
    categoryLabel: normalizeValue(input.categoryLabel),
  };
}

export function createRequestSelectionContextFromListing(
  listing: Pick<
    BaseListing,
    "type" | "id" | "title" | "subtitle" | "shortDescription" | "category"
  >
): RequestSelectionContext {
  return createRequestSelectionContext({
    type: listing.type,
    id: listing.id,
    name: listing.title,
    tagline: listing.subtitle ?? listing.shortDescription ?? "",
    categoryLabel: listing.category,
  });
}

export function encodeRequestSelectionContext(
  context: RequestSelectionContext
): URLSearchParams {
  const params = new URLSearchParams();

  params.set(REQUEST_PARAM_KEYS.type, context.type);
  params.set(REQUEST_PARAM_KEYS.id, context.id);
  params.set(REQUEST_PARAM_KEYS.name, context.name);

  if (context.tagline) {
    params.set(REQUEST_PARAM_KEYS.tagline, context.tagline);
  }

  if (context.categoryLabel) {
    params.set(REQUEST_PARAM_KEYS.categoryLabel, context.categoryLabel);
  }

  return params;
}

export function decodeRequestSelectionContext(
  searchParams: URLSearchParams
): RequestSelectionContext | null {
  const type = searchParams.get(REQUEST_PARAM_KEYS.type);
  const id = normalizeValue(searchParams.get(REQUEST_PARAM_KEYS.id));
  const name = normalizeValue(searchParams.get(REQUEST_PARAM_KEYS.name));

  if (!isRequestType(type) || !id || !name) {
    return null;
  }

  return createRequestSelectionContext({
    type,
    id,
    name,
    tagline: searchParams.get(REQUEST_PARAM_KEYS.tagline),
    categoryLabel: searchParams.get(REQUEST_PARAM_KEYS.categoryLabel),
  });
}

function createLegacyRequestSelectionContext(
  listing: BaseListing
): RequestSelectionContext {
  return createRequestSelectionContextFromListing(listing);
}

export function decodeLegacyRequestSelectionContext(
  searchParams: URLSearchParams
): RequestSelectionContext | null {
  const legacyVillaId = normalizeValue(searchParams.get("villaId"));
  const legacyExperienceId = normalizeValue(searchParams.get("experienceId"));
  const legacyCharterId = normalizeValue(searchParams.get("charterId"));
  const legacyVillaName = normalizeValue(searchParams.get("villa"));

  if (legacyVillaId) {
    const listing = getListingById(legacyVillaId);
    if (listing?.type === "villa") {
      return createLegacyRequestSelectionContext(listing);
    }
  }

  if (legacyExperienceId) {
    const listing = getListingById(legacyExperienceId);
    if (listing?.type === "experience") {
      return createLegacyRequestSelectionContext(listing);
    }
  }

  if (legacyCharterId) {
    const listing = getListingById(legacyCharterId);
    if (listing?.type === "charter") {
      return createLegacyRequestSelectionContext(listing);
    }
  }

  if (legacyVillaName) {
    const listing = getAllListings().find(
      (item) => item.type === "villa" && item.title === legacyVillaName
    );

    if (listing) {
      return createLegacyRequestSelectionContext(listing);
    }
  }

  return null;
}

export function createRequestPath(
  context?: RequestSelectionContext | null,
  pathname = "/request"
): string {
  if (!context) {
    return pathname;
  }

  const search = encodeRequestSelectionContext(context).toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function getCanonicalRequestPath(
  searchParams: URLSearchParams
): string {
  const normalizedContext =
    decodeRequestSelectionContext(searchParams) ??
    decodeLegacyRequestSelectionContext(searchParams);

  return createRequestPath(normalizedContext);
}

export function getPrimaryRequestCtaKey(
  type?: ListingType
): TranslationKey {
  switch (type) {
    case "villa":
      return "common_request_stay";
    case "experience":
      return "common_request_experience";
    case "charter":
      return "common_request_charter";
    default:
      return "common_request";
  }
}

export function getRequestTypeLabelKey(type: ListingType): TranslationKey {
  switch (type) {
    case "villa":
      return "request_type_stay";
    case "experience":
      return "request_type_experience";
    case "charter":
      return "request_type_charter";
  }
}
