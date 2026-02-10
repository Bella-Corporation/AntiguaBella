import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

type ResultType = "villa" | "experience";

interface SearchResult {
  name: string;
  type: ResultType;
}

const allResults: SearchResult[] = [
  { name: "Beachfront Villa", type: "villa" },
  { name: "Hillside Villa", type: "villa" },
  { name: "Ocean Suite", type: "villa" },
  { name: "Beach Pool Villa", type: "villa" },
  { name: "Sunset Cooking Class", type: "experience" },
  { name: "Snorkeling Adventure", type: "experience" },
  { name: "Farm-to-Table Tour", type: "experience" },
  { name: "Private Boat Charter", type: "experience" },
  { name: "Spa & Wellness Retreat", type: "experience" },
  { name: "Yoga at Sunrise", type: "experience" },
];

const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ResultType>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery("");
      setFilter("all");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = allResults.filter((r) => {
    if (filter !== "all" && r.type !== filter) return false;
    if (query.trim() && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const showResults = open && (query.trim().length > 0 || filter !== "all");

  return (
    <>
      {/* Search icon trigger */}
      <AnimatePresence mode="wait">
        {!open && (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            className="hero-glow-hover flex items-center justify-center h-11 w-11 md:h-8 md:w-8 text-foreground/50 transition-all duration-300 hover:scale-110"
            aria-label="Open search"
          >
            <Search size={17} strokeWidth={1.4} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded search bar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Search container */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 right-0 z-[70] px-4 pt-4 sm:px-6 sm:pt-5"
            >
              <div className="mx-auto max-w-xl">
                {/* Input row */}
                <div
                  className="flex items-center gap-3 rounded-lg px-4 py-3"
                  style={{
                    background: "hsl(0 0% 6%)",
                    border: "1px solid hsl(var(--primary) / 0.25)",
                    boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.7), 0 0 0 1px hsl(var(--primary) / 0.08)",
                  }}
                >
                  <Search size={16} strokeWidth={1.4} className="shrink-0 text-primary/60" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search villas & experiences…"
                    className="flex-1 bg-transparent text-sm font-light text-foreground/90 placeholder:text-foreground/25 outline-none"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="hero-glow-hover shrink-0 text-foreground/30 transition-colors duration-200 hover:text-primary/80"
                    aria-label="Close search"
                  >
                    <X size={16} strokeWidth={1.4} />
                  </button>
                </div>

                {/* Filter pills */}
                <div className="mt-3 flex gap-2 px-1">
                  {(["all", "villa", "experience"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-md px-3.5 py-1.5 text-[10px] font-light uppercase tracking-[0.2em] transition-all duration-300 ${
                        filter === f
                          ? "text-primary/90"
                          : "text-foreground/25 hover:text-foreground/50"
                      }`}
                      style={{
                        background: filter === f ? "hsl(var(--primary) / 0.08)" : "hsl(0 0% 6% / 0.6)",
                        border: `1px solid ${filter === f ? "hsl(var(--primary) / 0.2)" : "hsl(var(--foreground) / 0.06)"}`,
                      }}
                    >
                      {f === "all" ? "All" : f === "villa" ? "Villas" : "Experiences"}
                    </button>
                  ))}
                </div>

                {/* Results */}
                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-2 overflow-hidden rounded-lg"
                      style={{
                        background: "hsl(0 0% 6%)",
                        border: "1px solid hsl(var(--primary) / 0.12)",
                        boxShadow: "0 12px 40px -12px hsl(0 0% 0% / 0.8)",
                      }}
                    >
                      <div className="max-h-[280px] overflow-y-auto py-2">
                        {filtered.length === 0 ? (
                          <p className="px-4 py-6 text-center text-xs font-light text-foreground/25">
                            No results found
                          </p>
                        ) : (
                          filtered.map((result, i) => (
                            <button
                              key={result.name}
                              className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-200 hover:bg-primary/[0.04]"
                              style={{
                                borderBottom:
                                  i < filtered.length - 1
                                    ? "1px solid hsl(var(--primary) / 0.06)"
                                    : "none",
                              }}
                              onClick={() => setOpen(false)}
                            >
                              <span className="text-sm font-light text-foreground/70">
                                {result.name}
                              </span>
                              <span
                                className="rounded px-2 py-0.5 text-[9px] uppercase tracking-[0.18em]"
                                style={{
                                  color: "hsl(var(--primary) / 0.6)",
                                  background: "hsl(var(--primary) / 0.06)",
                                  border: "1px solid hsl(var(--primary) / 0.1)",
                                }}
                              >
                                {result.type}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderSearch;
