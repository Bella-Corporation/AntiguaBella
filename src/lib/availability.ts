import { supabase } from "@/integrations/supabase/client";

export type VillaAvailabilityId = "antiguabella" | "antiguasoleil" | "both";

/**
 * A date range where startDate is inclusive and endDate is exclusive.
 * Convention matches booking_requests check_in/check_out:
 *   a guest checking out on endDate frees that date for the next check-in.
 */
export interface BlockedRange {
  startDate: string; // yyyy-MM-dd inclusive
  endDate: string;   // yyyy-MM-dd exclusive (departure day is available)
}

/**
 * Returns which villa_id values overlap with the requested villaId.
 *
 * - "antiguabella"  → also blocked by "both"
 * - "antiguasoleil" → also blocked by "both"
 * - "both"          → blocked by any individual villa or "both"
 */
function overlappingVillaIds(villaId: VillaAvailabilityId): string[] {
  if (villaId === "antiguabella")  return ["antiguabella", "both"];
  if (villaId === "antiguasoleil") return ["antiguasoleil", "both"];
  return ["antiguabella", "antiguasoleil", "both"];
}

/**
 * Queries both `availability_blocks` and confirmed `booking_requests` for the
 * given villaId and returns a merged list of blocked date ranges.
 *
 * Ranges are returned as-is (no coalescing of overlapping ranges).
 * endDate is treated as exclusive throughout.
 */
export async function getBlockedRanges(
  villaId: VillaAvailabilityId
): Promise<BlockedRange[]> {
  const villaIds = overlappingVillaIds(villaId);

  const [blocksResult, requestsResult] = await Promise.all([
    supabase
      .from("availability_blocks")
      .select("start_date, end_date")
      .in("villa_id", villaIds),

    supabase
      .from("booking_requests")
      .select("check_in, check_out")
      .in("villa_id", villaIds)
      .eq("status", "confirmed"),
  ]);

  const ranges: BlockedRange[] = [];

  if (blocksResult.data) {
    for (const row of blocksResult.data) {
      ranges.push({ startDate: row.start_date, endDate: row.end_date });
    }
  }

  if (requestsResult.data) {
    for (const row of requestsResult.data) {
      ranges.push({ startDate: row.check_in, endDate: row.check_out });
    }
  }

  return ranges;
}
