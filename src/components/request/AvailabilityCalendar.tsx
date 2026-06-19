import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBlockedDates } from "@/hooks/useBlockedDates";

interface AvailabilityCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onRangeChange: (from: Date | null, to: Date | null) => void;
  listingId?: string | null;
}

const AvailabilityCalendar = ({
  checkIn,
  checkOut,
  onRangeChange,
  listingId,
}: AvailabilityCalendarProps) => {
  const isMobile = useIsMobile();
  const { blockedDates, loading } = useBlockedDates(listingId);

  const today = startOfDay(new Date());

  const selected: DateRange = {
    from: checkIn ?? undefined,
    to: checkOut ?? undefined,
  };

  const rangeLabel = (() => {
    if (checkIn && checkOut)
      return `${format(checkIn, "MMM d")} — ${format(checkOut, "MMM d, yyyy")}`;
    if (checkIn) return `${format(checkIn, "MMM d, yyyy")} — select departure`;
    return null;
  })();

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl border border-border/30 bg-background/30 p-4 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-card/90 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-sans">
              Loading availability…
            </p>
          </div>
        )}

        <DayPicker
          mode="range"
          selected={selected}
          onSelect={(range) =>
            onRangeChange(range?.from ?? null, range?.to ?? null)
          }
          numberOfMonths={isMobile ? 1 : 2}
          fromDate={today}
          showOutsideDays={false}
          disabled={[{ before: today }]}
          modifiers={{ blocked: blockedDates }}
          modifiersClassNames={{
            blocked:
              "line-through opacity-25 cursor-not-allowed pointer-events-none",
          }}
          classNames={{
            months: "flex flex-col md:flex-row gap-6",
            month: "flex-1",
            caption:
              "flex justify-center pt-1 relative items-center mb-4",
            caption_label:
              "text-[11px] uppercase tracking-[0.18em] text-foreground/50 font-sans",
            nav: "flex items-center gap-1",
            nav_button:
              "h-7 w-7 rounded-full border border-border/40 bg-transparent flex items-center justify-center text-muted-foreground/50 hover:border-primary/40 hover:text-primary transition-all duration-300",
            nav_button_previous: "absolute left-0",
            nav_button_next: "absolute right-0",
            table: "w-full border-collapse",
            head_row: "flex w-full mb-2",
            head_cell:
              "flex-1 text-center text-[10px] uppercase tracking-[0.08em] text-muted-foreground/30 font-sans py-1",
            row: "flex w-full mb-1",
            cell: [
              "flex-1 text-center relative p-0",
              // Range middle background spans the full cell width
              "[&:has([data-range-middle])]:bg-primary/8",
              "first:[&:has([data-range-middle])]:rounded-l-full",
              "last:[&:has([data-range-middle])]:rounded-r-full",
            ].join(" "),
            day: "w-8 h-8 mx-auto flex items-center justify-center text-[13px] font-sans text-foreground/60 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer select-none",
            day_selected:
              "bg-primary text-background font-medium hover:bg-primary hover:text-background focus:bg-primary focus:text-background",
            day_today:
              "text-primary font-medium ring-1 ring-primary/30",
            day_outside: "opacity-0 pointer-events-none",
            day_disabled:
              "opacity-20 cursor-not-allowed pointer-events-none hover:bg-transparent hover:text-foreground/60",
            day_range_middle:
              "rounded-none bg-primary/8 text-primary aria-selected:bg-primary/8 aria-selected:text-primary",
            day_range_end:
              "bg-primary text-background font-medium rounded-full hover:bg-primary",
            day_range_start:
              "bg-primary text-background font-medium rounded-full hover:bg-primary",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-3 w-3" />,
            IconRight: () => <ChevronRight className="h-3 w-3" />,
          }}
        />
      </div>

      {/* Selected range display + legend */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] font-sans text-muted-foreground/40">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/30" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground/20 line-through text-[8px]">x</span>
            Blocked
          </span>
        </div>
        {rangeLabel ? (
          <p className="text-xs font-sans text-primary/70 text-right">
            {rangeLabel}
          </p>
        ) : (
          <p className="text-[10px] uppercase tracking-[0.1em] font-sans text-muted-foreground/30 text-right">
            Select arrival date
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
