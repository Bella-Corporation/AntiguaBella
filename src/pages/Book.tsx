import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Minus, Plus, ChevronDown, MessageCircle, X } from "lucide-react";
import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";
import suiteOcean from "@/assets/suite-ocean.jpg";
import poolView from "@/assets/pool-view.jpg";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  differenceInCalendarDays,
} from "date-fns";

/* ── Fake price data ─────────────────────────────────── */
const generatePrices = (month: Date) => {
  const prices: Record<string, number | null> = {};
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  days.forEach((d) => {
    const key = format(d, "yyyy-MM-dd");
    const rand = Math.random();
    if (rand < 0.15) {
      prices[key] = null; // unavailable
    } else {
      prices[key] = 350 + Math.round(Math.random() * 250);
    }
  });
  return prices;
};

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "XCD", symbol: "EC$" },
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const villaOptions = [
  { name: "AntiguaBella", price: "From $3,100 / night", image: villaBeachfront, tagline: "Where elegance meets the Caribbean shore" },
  { name: "AntiguaSoleil", price: "From $2,200 / night", image: villaBeachPool, tagline: "Sun-drenched luxury with panoramic views" },
  { name: "Sugar Moon", price: "From $1,650 / night", image: villaHillside, tagline: "Romantic seclusion under Caribbean skies" },
  { name: "NewMoon", price: "From $1,200 / night", image: suiteOcean, tagline: "Contemporary design in a timeless setting" },
  { name: "MoonBreeze", price: "From $1,450 / night", image: poolView, tagline: "Effortless island living with a gentle breeze" },
];

const BookPage = () => {
  const [searchParams] = useSearchParams();
  const villaParam = searchParams.get("villa");
  const initialVilla = villaOptions.find((v) => v.name === villaParam) || villaOptions[0];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [currency, setCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(initialVilla);
  const [villaOpen, setVillaOpen] = useState(false);

  /* Prices for current displayed month */
  const prices = useMemo(() => generatePrices(currentMonth), [currentMonth.getTime()]);

  /* Calendar grid days */
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth.getTime()]);

  /* Selection helpers */
  const isInRange = (day: Date) => {
    if (!checkIn || !checkOut) return false;
    return isAfter(day, checkIn) && isBefore(day, checkOut);
  };

  const handleDayClick = (day: Date) => {
    const key = format(day, "yyyy-MM-dd");
    if (prices[key] === null && isSameMonth(day, currentMonth)) return; // unavailable
    if (isBefore(day, today) && !isSameDay(day, today)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
    } else {
      if (isBefore(day, checkIn)) {
        setCheckIn(day);
      } else {
        setCheckOut(day);
      }
    }
  };

  /* Total price */
  const totalNights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;
  const avgPrice = 480; // simplified avg
  const totalPrice = totalNights * avgPrice;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* ── Header ─────────────────────────────── */}
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
        >
          ← Back
        </Link>
        <Link to="/" className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]">
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      {/* ── Main Booking Card ──────────────────── */}
      <main className="flex justify-center px-4 pb-32 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl rounded-2xl border border-border/40 bg-card p-6 lg:p-10"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)] transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="luxury-heading text-lg text-foreground/90">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)] transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((d) => (
              <div key={d} className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-sans">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px">
            {calendarDays.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const inMonth = isSameMonth(day, currentMonth);
              const price = prices[key];
              const unavailable = inMonth && price === null;
              const isPast = isBefore(day, today) && !isSameDay(day, today);
              const isCheckIn = checkIn && isSameDay(day, checkIn);
              const isCheckOut = checkOut && isSameDay(day, checkOut);
              const inRange = isInRange(day);
              const isSelected = isCheckIn || isCheckOut;

              return (
                <button
                  key={key}
                  onClick={() => inMonth && handleDayClick(day)}
                  disabled={!inMonth || unavailable || isPast}
                  className={`
                    relative flex flex-col items-center justify-center py-2.5 lg:py-3 rounded-lg
                    text-sm font-sans transition-all duration-300
                    ${!inMonth ? "opacity-0 pointer-events-none" : ""}
                    ${unavailable ? "opacity-20 cursor-not-allowed" : ""}
                    ${isPast && inMonth ? "opacity-25 cursor-not-allowed" : ""}
                    ${isSelected ? "bg-primary/15 text-primary shadow-[0_0_16px_hsl(var(--primary)/0.2)]" : ""}
                    ${inRange ? "bg-primary/5" : ""}
                    ${!isSelected && !unavailable && !isPast && inMonth ? "hover:bg-primary/8 hover:shadow-[0_0_10px_hsl(var(--primary)/0.1)] cursor-pointer" : ""}
                  `}
                >
                  <span className={`text-[13px] ${isSelected ? "font-medium text-primary" : "text-foreground/70"}`}>
                    {format(day, "d")}
                  </span>
                  {inMonth && price !== null && !isPast && (
                    <span className={`text-[9px] mt-0.5 ${isSelected ? "text-primary/70" : "text-muted-foreground/60"}`}>
                      {currency.symbol}{price}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Gold divider ───────────────────── */}
          <div className="my-8 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }} />

          {/* ── Villa Selector ─────────────────── */}
          <div className="flex items-center justify-between mb-6 relative">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">Villa</span>
            <button
              onClick={() => setVillaOpen(!villaOpen)}
              className="flex items-center gap-2 text-sm font-sans text-foreground/70 hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary/30"
            >
              {selectedVilla.name}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${villaOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {villaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-8 z-20 rounded-xl border border-border/50 bg-card shadow-lg overflow-hidden min-w-[200px]"
                >
                  {villaOptions.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => { setSelectedVilla(v); setVillaOpen(false); }}
                      className={`block w-full px-5 py-2.5 text-left text-sm font-sans transition-colors duration-200 ${
                        v.name === selectedVilla.name
                          ? "text-primary bg-primary/5"
                          : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span className="block">{v.name}</span>
                      <span className="block text-[10px] text-muted-foreground/50">{v.price}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Guest Selector ─────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">Guests</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.12)] transition-all duration-300"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-lg font-sans font-light text-primary w-6 text-center">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(12, guests + 1))}
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.12)] transition-all duration-300"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* ── Currency Selector ──────────────── */}
          <div className="flex items-center justify-between mb-8 relative">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">Currency</span>
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-2 text-sm font-sans text-foreground/70 hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary/30"
            >
              {currency.code}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-8 z-20 rounded-xl border border-border/50 bg-card shadow-lg overflow-hidden"
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className={`block w-full px-5 py-2.5 text-left text-sm font-sans transition-colors duration-200 ${
                        c.code === currency.code
                          ? "text-primary bg-primary/5"
                          : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Booking Summary ────────────────── */}
          <div className="rounded-xl bg-secondary/40 p-5 mb-8">
            <div className="flex justify-between text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans mb-3">
              <span>Check-in</span>
              <span>Check-out</span>
            </div>
            <div className="flex justify-between text-sm font-sans text-foreground/80 mb-4">
              <span>{checkIn ? format(checkIn, "MMM d, yyyy") : "—"}</span>
              <span>{checkOut ? format(checkOut, "MMM d, yyyy") : "—"}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-sans mb-1">
              <span>{guests} guest{guests > 1 ? "s" : ""} · {totalNights} night{totalNights !== 1 ? "s" : ""}</span>
            </div>
            {/* Gold divider */}
            <div className="my-4 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }} />
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">Total</span>
              <span className="luxury-heading text-xl text-primary">
                {totalNights > 0 ? `${currency.symbol}${totalPrice.toLocaleString()}` : "—"}
              </span>
            </div>
          </div>

          {/* ── Book Now Button ─────────────────── */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={!checkIn || !checkOut}
            className={`
              w-full py-4 rounded-lg text-[11px] uppercase tracking-[0.25em] font-sans font-medium
              border transition-all duration-500
              ${checkIn && checkOut
                ? "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] cursor-pointer"
                : "border-border/30 text-muted-foreground/40 cursor-not-allowed"
              }
            `}
          >
            Book Now
          </motion.button>
        </motion.div>
      </main>

      {/* ── Chatbot Widget ─────────────────────── */}
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-4 w-72 rounded-2xl border border-primary/20 bg-card overflow-hidden"
              style={{ boxShadow: "0 8px 30px -8px hsl(0 0% 0% / 0.7)" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">Concierge</span>
                <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4 h-48 flex items-end">
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Welcome to AntiguaBella. How may we assist with your booking?
                </p>
              </div>
              <div className="p-3 border-t border-border/30">
                <input
                  type="text"
                  placeholder="Type your message…"
                  className="w-full bg-secondary/40 rounded-lg px-3 py-2 text-sm font-sans text-foreground/80 placeholder:text-muted-foreground/40 outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="w-12 h-12 rounded-full border border-primary/30 bg-card flex items-center justify-center hover:shadow-[0_0_16px_hsl(var(--primary)/0.15)] transition-all duration-300"
        >
          {/* Pineapple-style icon in gold */}
          <span className="text-primary text-lg">🍍</span>
        </motion.button>
      </div>
    </div>
  );
};

export default BookPage;
