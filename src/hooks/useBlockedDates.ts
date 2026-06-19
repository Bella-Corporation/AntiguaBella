import { useEffect, useState } from "react";
import { startOfDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

export function useBlockedDates(listingId: string | null | undefined) {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!listingId) {
      setBlockedDates([]);
      return;
    }

    setLoading(true);

    supabase
      .from("blocked_dates")
      .select("date")
      .eq("listing_id", listingId)
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to fetch blocked dates:", error);
          setBlockedDates([]);
        } else {
          setBlockedDates(
            (data ?? []).map((row) => startOfDay(new Date(`${row.date}T00:00:00`)))
          );
        }
        setLoading(false);
      });
  }, [listingId]);

  return { blockedDates, loading };
}
