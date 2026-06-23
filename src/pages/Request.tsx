import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { Check } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import DateRangePicker from "@/components/request/DateRangePicker";
import GuestSelector, { type GuestBreakdown } from "@/components/request/GuestSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { decodeRequestSelectionContext } from "@/lib/request";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getBlockedRanges, type BlockedRange, type VillaAvailabilityId } from "@/lib/availability";

import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";

const NIGHTLY_RATE = 850;

type VillaId = "AntiguaBella" | "AntiguaSoleil" | "BothVillas";

interface VillaConfig {
  id: VillaId;
  label: string;
  sublabel: string;
  beds: number;
  maxGuests: number;
}

const VILLAS: VillaConfig[] = [
  { id: "AntiguaSoleil", label: "AntiguaSoleil", sublabel: "Garden Retreat", beds: 3, maxGuests: 8  },
  { id: "AntiguaBella",  label: "AntiguaBella",  sublabel: "Beachfront",     beds: 3, maxGuests: 8  },
  { id: "BothVillas",    label: "Both Villas",   sublabel: "Full Estate",    beds: 6, maxGuests: 16 },
];

function VillaCardImage({ id }: { id: VillaId }) {
  if (id === "BothVillas") {
    return (
      <>
        <img
          src={villaBeachfront}
          alt="AntiguaBella"
          className="absolute inset-0 w-1/2 h-full object-cover object-right"
        />
        <img
          src={villaHillside}
          alt="AntiguaSoleil"
          className="absolute inset-0 left-1/2 w-1/2 h-full object-cover object-left"
        />
        <div className="absolute inset-y-0 left-1/2 w-px bg-background/40 z-10" />
      </>
    );
  }
  return (
    <img
      src={id === "AntiguaBella" ? villaBeachfront : villaHillside}
      alt={id}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

const VILLA_ID_MAP: Record<VillaId, string> = {
  AntiguaBella:  "antiguabella",
  AntiguaSoleil: "antiguasoleil",
  BothVillas:    "both",
};

const RequestPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  usePageMeta({
    title: "Request Your Stay — AntiguaBella",
    description:
      "Tell us what you're looking for. Every inquiry is reviewed and fulfilled personally — no automated booking.",
    canonicalPath: "/request",
  });

  const requestContext = useMemo(
    () => decodeRequestSelectionContext(searchParams),
    [searchParams]
  );

  const initialVilla = useMemo((): VillaId => {
    // Auth-return path encodes villa as ?villa=<VillaId>; check that first.
    const villaParam = searchParams.get("villa");
    if (villaParam === "AntiguaBella" || villaParam === "AntiguaSoleil" || villaParam === "BothVillas")
      return villaParam as VillaId;
    // Listing-link path encodes villa id via decodeRequestSelectionContext (?item=<id>).
    const id = requestContext?.id;
    if (id === "AntiguaBella" || id === "AntiguaSoleil" || id === "BothVillas")
      return id as VillaId;
    return "AntiguaBella";
  }, [requestContext, searchParams]);

  const [selectedVilla, setSelectedVilla] = useState<VillaId>(initialVilla);

  const [checkIn, setCheckIn] = useState<Date | null>(() => {
    const s = searchParams.get("checkIn");
    if (!s) return null;
    const d = new Date(`${s}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  });

  const [checkOut, setCheckOut] = useState<Date | null>(() => {
    const s = searchParams.get("checkOut");
    if (!s) return null;
    const d = new Date(`${s}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  });

  const [guests, setGuests] = useState<GuestBreakdown>(() => {
    const adults   = parseInt(searchParams.get("adults")   ?? "", 10);
    const children = parseInt(searchParams.get("children") ?? "", 10);
    const infants  = parseInt(searchParams.get("infants")  ?? "", 10);
    return {
      adults:   isNaN(adults)   || adults   < 1 ? 2 : adults,
      children: isNaN(children) || children < 0 ? 0 : children,
      infants:  isNaN(infants)  || infants  < 0 ? 0 : infants,
    };
  });
  const [blockedRanges, setBlockedRanges] = useState<BlockedRange[]>([]);

  useEffect(() => {
    const dbVillaId = VILLA_ID_MAP[selectedVilla] as VillaAvailabilityId;
    getBlockedRanges(dbVillaId).then(setBlockedRanges).catch(() => {
      // Non-fatal — calendar remains usable without availability data
    });
  }, [selectedVilla]);

  const villaConfig = VILLAS.find((v) => v.id === selectedVilla)!;
  const maxGuests = villaConfig.maxGuests;

  const hasValidDates = checkIn != null && checkOut != null && checkOut > checkIn;
  const nights = hasValidDates ? differenceInDays(checkOut!, checkIn!) : null;
  const totalOccupants = guests.adults + guests.children;
  const hasGuests = totalOccupants >= 1;

  const showSummary = hasValidDates && hasGuests;
  const submitReady = showSummary;

  const handleSubmit = async () => {
    if (!submitReady || submitting) return;

    // Not logged in — send to auth, return here with form state preserved
    if (!user) {
      const params = new URLSearchParams({
        villa: selectedVilla!,
        checkIn: format(checkIn!, "yyyy-MM-dd"),
        checkOut: format(checkOut!, "yyyy-MM-dd"),
        adults: String(guests.adults),
        children: String(guests.children),
        infants: String(guests.infants),
      });
      navigate(`/auth?next=${encodeURIComponent(`/request?${params.toString()}`)}`);
      return;
    }

    // Logged in — persist to Supabase then redirect to confirmation
    setSubmitting(true);
    try {
      const { error } = await supabase.from("booking_requests").insert({
        user_id:     user.id,
        villa_id:    VILLA_ID_MAP[selectedVilla],
        check_in:    format(checkIn!, "yyyy-MM-dd"),
        check_out:   format(checkOut!, "yyyy-MM-dd"),
        guest_count: guests.adults + guests.children,
      });

      if (error) throw error;

      navigate("/request/confirmed", {
        state: {
          villaLabel: villaConfig.label,
          checkIn:    format(checkIn!, "EEE, MMM d, yyyy"),
          checkOut:   format(checkOut!, "EEE, MMM d, yyyy"),
          guests:     guestSummaryLabel(),
          nights,
        },
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "We couldn't save your request. Please try again.",
      });
      setSubmitting(false);
    }
  };

  const guestSummaryLabel = () => {
    const parts: string[] = [];
    if (guests.adults > 0) parts.push(`${guests.adults} adult${guests.adults !== 1 ? "s" : ""}`);
    if (guests.children > 0) parts.push(`${guests.children} child${guests.children !== 1 ? "ren" : ""}`);
    if (guests.infants > 0) parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
        >
          ← {t("common_back")}
        </Link>
        <Link to="/" className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]">
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      <main className="flex justify-center px-4 pb-24 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Page heading */}
          <div className="text-center mb-10">
            <p className="luxury-subheading text-primary/60 mb-3">Private Villa Inquiry</p>
            <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              Reserve Your <span className="italic">Stay</span>
            </h1>
            <div className="luxury-divider" />
          </div>

          {/* ── Villa selector ── */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {VILLAS.map((villa) => {
              const isSelected = selectedVilla === villa.id;
              return (
                <button
                  key={villa.id}
                  type="button"
                  onClick={() => {
                    setSelectedVilla(villa.id);
                    /* clamp guests if switching to a villa with lower cap */
                    if (totalOccupants > villa.maxGuests) {
                      const overflow = totalOccupants - villa.maxGuests;
                      const newChildren = Math.max(0, guests.children - overflow);
                      const remaining = overflow - (guests.children - newChildren);
                      setGuests({
                        adults: Math.max(1, guests.adults - remaining),
                        children: newChildren,
                        infants: guests.infants,
                      });
                    }
                  }}
                  className={`relative overflow-hidden rounded-xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isSelected
                      ? "shadow-[0_0_0_1.5px_hsl(var(--primary)/0.38),0_0_20px_hsl(var(--primary)/0.16),0_8px_28px_hsl(var(--primary)/0.10)]"
                      : "ring-1 ring-border/30 hover:ring-border/60 hover:shadow-md"
                  }`}
                >
                  {/* Image — fixed 3:2 ratio */}
                  <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
                    <VillaCardImage id={villa.id} />
                    {/* base gradient */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background:
                          "linear-gradient(180deg, hsla(0,0%,0%,0.22) 0%, hsla(0,0%,0%,0.58) 100%)",
                      }}
                    />
                    {/* gold tint on selected */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(var(--primary)/0.12) 0%, hsl(var(--primary)/0.04) 100%)",
                        opacity: isSelected ? 1 : 0,
                      }}
                    />
                    {/* checkmark badge */}
                    <div
                      className="absolute top-2 right-2 z-20 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-md transition-all duration-200"
                      style={{
                        opacity: isSelected ? 1 : 0,
                        transform: isSelected ? "scale(1)" : "scale(0.6)",
                      }}
                    >
                      <Check className="w-3 h-3 text-background" strokeWidth={3} />
                    </div>
                  </div>

                  {/* Info strip */}
                  <div className="px-3 py-2.5 bg-card border-t border-border/20">
                    <p
                      className={`luxury-heading text-[13px] leading-tight mb-0.5 transition-colors duration-300 ${
                        isSelected ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {villa.label}
                    </p>
                    <p className="luxury-subheading text-[9px] text-muted-foreground/50 tracking-[0.1em]">
                      {villa.beds} BR · UP TO {villa.maxGuests}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Form card ── */}
          <div
            className="rounded-2xl border border-border/40 bg-card overflow-visible"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Step 1 — Dates */}
            <div className="p-6 lg:p-8">
              <p className="luxury-subheading text-primary/60 mb-3">Dates</p>
              <DateRangePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
                minDate={new Date()}
                disabledRanges={blockedRanges}
              />
            </div>

            <div className="mx-6 lg:mx-8 border-t border-border/20" />

            {/* Step 2 — Guests */}
            <div className="p-6 lg:p-8">
              <p className="luxury-subheading text-primary/60 mb-3">Guests</p>
              <GuestSelector
                value={guests}
                onChange={setGuests}
                maxOccupants={maxGuests}
              />
            </div>

            {/* Step 3 — Summary (animated in when complete) */}
            <AnimatePresence>
              {showSummary && nights != null && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mx-6 lg:mx-8 border-t border-border/20" />
                  <div className="p-6 lg:p-8">
                    <p className="luxury-subheading text-primary/60 mb-4">Your Stay</p>

                    <div className="space-y-2.5">
                      <SummaryRow label="Villa" value={villaConfig?.label ?? ""} />
                      <SummaryRow
                        label="Check-in"
                        value={format(checkIn!, "EEE, MMM d, yyyy")}
                      />
                      <SummaryRow
                        label="Check-out"
                        value={format(checkOut!, "EEE, MMM d, yyyy")}
                      />
                      <SummaryRow
                        label="Nights"
                        value={`${nights} ${nights === 1 ? "night" : "nights"}`}
                      />
                      <SummaryRow label="Guests" value={guestSummaryLabel()} />
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/20 flex items-end justify-between">
                      <div>
                        <p className="luxury-subheading text-primary/60 text-[10px] mb-0.5">
                          Estimated Total
                        </p>
                        <p className="text-[10px] font-sans text-muted-foreground/35">
                          ${NIGHTLY_RATE.toLocaleString()} / night · {nights}{" "}
                          {nights === 1 ? "night" : "nights"}
                        </p>
                      </div>
                      <p className="luxury-heading text-2xl text-primary">
                        ${(NIGHTLY_RATE * nights).toLocaleString()}
                      </p>
                    </div>

                    <p className="mt-3 text-[10px] font-sans text-muted-foreground/30 leading-relaxed">
                      Rates are indicative. Final pricing is confirmed upon inquiry.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4 — Button */}
            <div className="px-6 pb-6 lg:px-8 lg:pb-8">
              <motion.button
                type="button"
                whileHover={submitReady && !submitting ? { scale: 1.01 } : {}}
                whileTap={submitReady && !submitting ? { scale: 0.99 } : {}}
                disabled={!submitReady || submitting}
                onClick={handleSubmit}
                className={`
                  w-full py-4 rounded-lg text-[11px] uppercase tracking-[0.3em] font-sans font-medium
                  border transition-all duration-500
                  ${
                    submitReady && !submitting
                      ? "border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_36px_hsl(var(--primary)/0.24)] cursor-pointer"
                      : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
                  }
                `}
              >
                {submitting ? "Submitting…" : "Request Your Stay"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[12px] font-sans text-muted-foreground/50 shrink-0">{label}</span>
      <span className="text-[13px] font-sans text-foreground/75 text-right">{value}</span>
    </div>
  );
}

export default RequestPage;
