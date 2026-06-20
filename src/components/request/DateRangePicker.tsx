import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isAfter,
  isBefore,
  startOfDay,
  getDay,
  differenceInDays,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import type { BlockedRange } from "@/lib/availability";

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  minDate?: Date;
  /** Ranges where endDate is exclusive (departure day is free for next check-in). */
  disabledRanges?: BlockedRange[];
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  minDate,
  disabledRanges = [],
}: DateRangePickerProps) {
  const today = startOfDay(new Date());
  const floor = minDate ? startOfDay(minDate) : today;

  const isDateBlocked = (day: Date): boolean => {
    if (disabledRanges.length === 0) return false;
    const d = startOfDay(day);
    return disabledRanges.some(({ startDate, endDate }) => {
      const start = startOfDay(parseISO(startDate));
      const end = startOfDay(parseISO(endDate));
      // startDate inclusive, endDate exclusive
      return !isBefore(d, start) && isBefore(d, end);
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [leftMonth, setLeftMonth] = useState(startOfMonth(floor));
  const containerRef = useRef<HTMLDivElement>(null);
  const rightMonth = addMonths(leftMonth, 1);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHoverDate(null);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handleOpen = () => {
    if (!isOpen) {
      setSelecting(checkIn && !checkOut ? "end" : "start");
    }
    setIsOpen((o) => !o);
  };

  const handleDayClick = (day: Date) => {
    if (isBefore(day, floor) || isDateBlocked(day)) return;

    if (selecting === "start") {
      onChange(day, null);
      setSelecting("end");
    } else {
      if (isBefore(day, checkIn!) || isSameDay(day, checkIn!)) {
        onChange(day, null);
        setSelecting("end");
      } else {
        onChange(checkIn, day);
        setSelecting("start");
        setIsOpen(false);
        setHoverDate(null);
      }
    }
  };

  const isInRange = (day: Date): boolean => {
    if (!checkIn) return false;
    const end = checkOut ?? (selecting === "end" ? hoverDate : null);
    if (!end) return false;
    return isAfter(day, checkIn) && isBefore(day, end);
  };

  const GOLD = "#C9A84C";
  const GOLD_RANGE_BG = "rgba(201,168,76,0.12)";

  const isRangeStart = (day: Date) => checkIn != null && isSameDay(day, checkIn);
  const isRangeEnd = (day: Date) => checkOut != null && isSameDay(day, checkOut);

  // Show start half-fill whenever there is a visible range (confirmed or hover preview)
  const hasVisibleRangeFromStart = (day: Date) => {
    if (!checkIn || !isSameDay(day, checkIn)) return false;
    if (checkOut) return true;
    return selecting === "end" && hoverDate != null && isAfter(hoverDate, checkIn);
  };

  const renderMonth = (monthStart: Date, side: "left" | "right") => {
    const days = eachDayOfInterval({
      start: startOfMonth(monthStart),
      end: endOfMonth(monthStart),
    });
    const leadingBlanks = getDay(startOfMonth(monthStart));

    return (
      <div className={`flex-1 min-w-0 ${side === "right" ? "hidden sm:block" : ""}`}>
        <p className="text-center text-[13px] font-sans font-medium text-foreground/75 mb-3 tracking-wide">
          {format(monthStart, "MMMM yyyy")}
        </p>
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[10px] text-muted-foreground/40 pb-2 font-sans">
              {d}
            </div>
          ))}
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {days.map((day) => {
            const isStart = isRangeStart(day);
            const isEnd = isRangeEnd(day);
            const inRange = isInRange(day);
            const isDisabled = isBefore(day, floor) || isDateBlocked(day);
            const isToday = isSameDay(day, today);
            const isHovered =
              hoverDate != null &&
              selecting === "end" &&
              checkIn != null &&
              isSameDay(day, hoverDate) &&
              isAfter(day, checkIn);
            const showStartHalf = hasVisibleRangeFromStart(day);

            return (
              <div key={day.toISOString()} className="relative h-9 flex items-center justify-center">
                {/*
                  Capsule band — positional clipping, no border-radius tricks.
                  h-7 + top-1/2 -translate-y-1/2 pins the band exactly behind the circles.
                  Start cell  → left-1/2 right-0  (fill begins at circle centre, extends right)
                  In-range    → left-0   right-0   (full width connector)
                  End cell    → left-0   right-1/2 (fill ends at circle centre, no right bleed)
                  The circle (z-10) covers the centre point so no bleed is visible.
                */}
                {showStartHalf && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 h-7 left-1/2 right-0 pointer-events-none z-0"
                    style={{ backgroundColor: GOLD_RANGE_BG }}
                  />
                )}
                {inRange && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 h-7 left-0 right-0 pointer-events-none z-0"
                    style={{ backgroundColor: GOLD_RANGE_BG }}
                  />
                )}
                {(isEnd || isHovered) && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 h-7 left-0 right-1/2 pointer-events-none z-0"
                    style={{ backgroundColor: GOLD_RANGE_BG }}
                  />
                )}

                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => setHoverDate(day)}
                  onMouseLeave={() => setHoverDate(null)}
                  style={{
                    ...(isStart || isEnd || isHovered
                      ? { backgroundColor: GOLD, color: "#1c1204" }
                      : {}),
                    ...(isToday && !isStart && !isEnd
                      ? { boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.45)" }
                      : {}),
                  }}
                  className={[
                    "relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-sans transition-all duration-150 select-none",
                    isDisabled ? "text-muted-foreground/20 cursor-not-allowed" : "cursor-pointer",
                    isStart || isEnd ? "font-medium" : "",
                    !isStart && !isEnd && !isDisabled && !isHovered
                      ? "text-foreground/65 hover:text-foreground/90"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const nights =
    checkIn && checkOut ? differenceInDays(checkOut, checkIn) : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full bg-background/50 border rounded-xl px-4 py-3 text-left text-sm transition-colors focus:outline-none ${
          isOpen
            ? "border-primary/40"
            : "border-foreground/10 hover:border-foreground/20"
        }`}
      >
        {checkIn || checkOut ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50 font-sans mb-0.5">
                Check-in
              </p>
              <p className={checkIn ? "text-foreground/80" : "text-muted-foreground/35"}>
                {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
              </p>
            </div>
            <div className="border-l border-border/20 pl-3">
              <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50 font-sans mb-0.5">
                Check-out
              </p>
              <p className={checkOut ? "text-foreground/80" : "text-muted-foreground/35"}>
                {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground/40">
            <CalendarDays className="w-4 h-4 shrink-0" />
            <span>Select check-in and check-out dates</span>
          </div>
        )}
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border/40 bg-card p-5 shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.55)" }}
        >
          {/* Month navigation */}
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setLeftMonth(subMonths(leftMonth, 1))}
              className="mt-0.5 p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors shrink-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex flex-1 gap-6 overflow-hidden">
              {renderMonth(leftMonth, "left")}
              {renderMonth(rightMonth, "right")}
            </div>

            <button
              type="button"
              onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
              className="mt-0.5 p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors shrink-0"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer hint */}
          <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
            <p className="text-[11px] font-sans text-muted-foreground/40">
              {selecting === "start"
                ? "Select your check-in date"
                : "Now select your check-out date"}
            </p>
            {nights != null && (
              <p className="text-[11px] font-sans text-primary/70">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
