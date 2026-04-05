import { describe, expect, it } from "vitest";

import {
  createRequestPath,
  createRequestSelectionContext,
  decodeRequestSelectionContext,
  getCanonicalRequestPath,
} from "@/lib/request";

describe("request context helpers", () => {
  it("encodes and decodes the normalized request contract", () => {
    const context = createRequestSelectionContext({
      type: "villa",
      id: "AntiguaBella",
      name: "AntiguaBella",
      tagline: "Where elegance meets the Caribbean shore",
      categoryLabel: "Villas",
    });

    const path = createRequestPath(context);
    const query = path.split("?")[1] ?? "";
    const decoded = decodeRequestSelectionContext(new URLSearchParams(query));

    expect(decoded).toEqual(context);
  });

  it("returns the canonical request path for normalized params", () => {
    const params = new URLSearchParams({
      type: "experience",
      item: "culinary_journeys",
      name: "Culinary Journeys",
      tagline: "Island flavors, chef-led",
    });

    expect(getCanonicalRequestPath(params)).toBe(
      "/request?type=experience&item=culinary_journeys&name=Culinary+Journeys&tagline=Island+flavors%2C+chef-led"
    );
  });

  it("converts legacy params into the normalized request path", () => {
    const params = new URLSearchParams({
      charterId: "coastline_private_day",
    });

    expect(getCanonicalRequestPath(params)).toBe(
      "/request?type=charter&item=coastline_private_day&name=Private+Coastline+Day+Charter&tagline=Unhurried+hours+on+your+own+horizon&category=Charters"
    );
  });
});
