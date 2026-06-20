import { useRef, useEffect, useState } from "react";
import { Minus, Plus, Users } from "lucide-react";

export interface GuestBreakdown {
  adults: number;
  children: number;
  infants: number;
}

interface GuestSelectorProps {
  value: GuestBreakdown;
  onChange: (value: GuestBreakdown) => void;
  maxOccupants?: number;
}

const MAX_INFANTS = 4;

interface GuestRowProps {
  label: string;
  sublabel: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
}

function GuestRow({
  label,
  sublabel,
  count,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
}: GuestRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
      <div>
        <p className="text-sm font-sans text-foreground/80">{label}</p>
        <p className="text-[11px] font-sans text-muted-foreground/45">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={!canDecrement}
          onClick={onDecrement}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canDecrement
              ? "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
              : "border-border/20 text-muted-foreground/20 cursor-not-allowed"
          }`}
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-4 text-center text-sm font-sans text-foreground/80">{count}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={!canIncrement}
          onClick={onIncrement}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            canIncrement
              ? "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
              : "border-border/20 text-muted-foreground/20 cursor-not-allowed"
          }`}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function GuestSelector({
  value,
  onChange,
  maxOccupants = 6,
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { adults, children, infants } = value;
  const totalOccupants = adults + children;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const set = (patch: Partial<GuestBreakdown>) =>
    onChange({ ...value, ...patch });

  const totalLabel = () => {
    const parts: string[] = [];
    const occupants = adults + children;
    if (occupants > 0) parts.push(`${occupants} guest${occupants !== 1 ? "s" : ""}`);
    if (infants > 0) parts.push(`${infants} infant${infants !== 1 ? "s" : ""}`);
    return parts.length ? parts.join(", ") : "Add guests";
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`w-full bg-background/50 border rounded-lg px-4 py-3 text-left text-sm transition-colors focus:outline-none flex items-center justify-between ${
          isOpen
            ? "border-primary/40"
            : "border-foreground/10 hover:border-foreground/20"
        }`}
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground/50 shrink-0" />
          <span className={totalOccupants > 0 ? "text-foreground/80" : "text-muted-foreground/40"}>
            {totalLabel()}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-muted-foreground/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-border/40 bg-card px-5 py-2 shadow-2xl"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.55)" }}
        >
          <GuestRow
            label="Adults"
            sublabel="Ages 13 or above"
            count={adults}
            canDecrement={adults > 1}
            canIncrement={totalOccupants < maxOccupants}
            onDecrement={() => set({ adults: Math.max(1, adults - 1) })}
            onIncrement={() => {
              if (totalOccupants < maxOccupants) set({ adults: adults + 1 });
            }}
          />
          <GuestRow
            label="Children"
            sublabel="Ages 2–12"
            count={children}
            canDecrement={children > 0}
            canIncrement={totalOccupants < maxOccupants}
            onDecrement={() => set({ children: Math.max(0, children - 1) })}
            onIncrement={() => {
              if (totalOccupants < maxOccupants) set({ children: children + 1 });
            }}
          />
          <GuestRow
            label="Infants"
            sublabel="Under 2"
            count={infants}
            canDecrement={infants > 0}
            canIncrement={infants < MAX_INFANTS}
            onDecrement={() => set({ infants: Math.max(0, infants - 1) })}
            onIncrement={() => {
              if (infants < MAX_INFANTS) set({ infants: infants + 1 });
            }}
          />
          <p className="text-[10px] font-sans text-muted-foreground/35 pt-3 pb-1">
            This villa accommodates up to {maxOccupants} guests. Infants don't count toward the limit.
          </p>
        </div>
      )}
    </div>
  );
}
