import { describe, it, expect } from "vitest";
import {
  getAllListings,
  getFeaturedListings,
  getListingsByType,
  getListingById,
  getListingBySlug,
} from "./listings";

describe("listings helpers", () => {
  it("getAllListings returns the centralized listings array", () => {
    const all = getAllListings();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((l) => l.id && l.slug && l.type && l.title)).toBe(true);
  });

  it("getFeaturedListings returns only featured listings", () => {
    const featured = getFeaturedListings();
    expect(Array.isArray(featured)).toBe(true);
    expect(featured.every((l) => l.featured === true)).toBe(true);
    const all = getAllListings();
    expect(featured.length).toBeLessThanOrEqual(all.length);
  });

  it("getListingsByType returns correct villa listings", () => {
    const villas = getListingsByType("villa");
    expect(villas.every((l) => l.type === "villa")).toBe(true);
    expect(villas.some((l) => l.id === "AntiguaBella")).toBe(true);
    expect(villas.some((l) => l.id === "AntiguaSoleil")).toBe(true);
  });

  it("getListingsByType returns correct experience listings", () => {
    const experiences = getListingsByType("experience");
    expect(experiences.every((l) => l.type === "experience")).toBe(true);
    expect(experiences.some((l) => l.id === "culinary_journeys")).toBe(true);
    expect(experiences.some((l) => l.id === "ocean_reef")).toBe(true);
  });

  it("getListingsByType returns correct charter listings", () => {
    const charters = getListingsByType("charter");
    expect(charters.every((l) => l.type === "charter")).toBe(true);
    expect(charters.some((l) => l.id === "coastline_private_day")).toBe(true);
  });

  it("getListingById returns the expected listing for a known id", () => {
    const villa = getListingById("AntiguaBella");
    expect(villa).toBeDefined();
    expect(villa!.id).toBe("AntiguaBella");
    expect(villa!.type).toBe("villa");
    expect(villa!.slug).toBe("antiguabella");

    const experience = getListingById("ocean_reef");
    expect(experience).toBeDefined();
    expect(experience!.id).toBe("ocean_reef");
    expect(experience!.type).toBe("experience");

    const charter = getListingById("coastline_private_day");
    expect(charter).toBeDefined();
    expect(charter!.id).toBe("coastline_private_day");
    expect(charter!.type).toBe("charter");
  });

  it("getListingBySlug returns the expected listing for a known slug", () => {
    const villa = getListingBySlug("antiguabella");
    expect(villa).toBeDefined();
    expect(villa!.slug).toBe("antiguabella");
    expect(villa!.id).toBe("AntiguaBella");

    const experience = getListingBySlug("ocean-and-reef");
    expect(experience).toBeDefined();
    expect(experience!.slug).toBe("ocean-and-reef");
    expect(experience!.id).toBe("ocean_reef");

    const charter = getListingBySlug("private-coastline-day-charter");
    expect(charter).toBeDefined();
    expect(charter!.slug).toBe("private-coastline-day-charter");
    expect(charter!.id).toBe("coastline_private_day");
  });

  it("getListingById returns undefined for unknown id", () => {
    expect(getListingById("__nonexistent__")).toBeUndefined();
    expect(getListingById("")).toBeUndefined();
  });

  it("getListingBySlug returns undefined for unknown slug", () => {
    expect(getListingBySlug("__nonexistent__")).toBeUndefined();
    expect(getListingBySlug("")).toBeUndefined();
  });
});
