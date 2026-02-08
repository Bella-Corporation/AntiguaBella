import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const heroNavLinks = ["Stays", "Experiences", "Concierge"];

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreCompact, setExploreCompact] = useState(false);
  const [exploreHidden, setExploreHidden] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setExploreCompact(y > 40);
      setExploreHidden(maxScroll > 0 && y >= maxScroll - 80);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen cinematic video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        {/* Dark overlay with very subtle gold warmth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(0,0%,0%,0.38) 0%, hsla(41,20%,8%,0.32) 50%, hsla(0,0%,0%,0.42) 100%)",
          }}
        />
      </div>

      {/* ── Single consolidated overlay ──────────── */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Top bar — sticky header that transitions on scroll */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md py-3"
              : "bg-transparent py-5 lg:py-6"
          }`}
          style={{ paddingTop: scrolled ? undefined : "max(env(safe-area-inset-top, 0px), 1.25rem)" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
            {/* Book — left */}
            <a
              href="#book"
              className="hero-glow-hover font-aguero text-[11px] tracking-[0.22em] uppercase text-foreground/50 transition-all duration-300"
            >
              Book
            </a>

            {/* Brand — center */}
            <a href="#" className="absolute left-1/2 -translate-x-1/2 luxury-heading tracking-wide">
              <span className={`transition-all duration-700 ${
                scrolled ? "text-[1.4rem] lg:text-[1.6rem]" : "text-[1.6rem] lg:text-[2rem]"
              }`}>
                <span className="text-foreground/90">
                  Antigua<span className="gold-text">Bella</span>
                </span>
              </span>
            </a>

            {/* Hamburger — right */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hero-glow-hover flex flex-col items-end gap-[5px] p-1 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-foreground/50 transition-all duration-300 ${
                  menuOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-5"
                }`}
              />
              <span
                className={`block h-px bg-foreground/50 transition-all duration-300 ${
                  menuOpen ? "w-5 -rotate-45 -translate-y-[3px]" : "w-4"
                }`}
              />
              {!menuOpen && (
                <span className="block h-px w-3 bg-foreground/50 transition-all duration-300" />
              )}
            </button>
          </div>

          {/* Mobile / menu drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden bg-background/98 backdrop-blur-lg border-t border-border/10"
              >
                <nav className="flex flex-col items-center gap-7 py-12">
                  {heroNavLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="hero-glow-hover font-aguero text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors duration-400"
                    >
                      {link}
                    </a>
                  ))}
                  <a
                    href="#begin"
                    onClick={() => setMenuOpen(false)}
                    className="hero-glow-hover font-aguero text-[10px] tracking-[0.22em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors duration-500 mt-4"
                  >
                    Sign In
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Spacer */}
        <div className="flex-1" />
      </div>

      {/* Fixed Explore CTA — bottom center, persists on scroll */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 2.5rem)" }}
        animate={{
          scale: exploreHidden ? 0.8 : exploreCompact ? 0.88 : 1,
          opacity: exploreHidden ? 0 : 1,
          y: exploreHidden ? 20 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
          className={`hero-glow-hover pointer-events-auto font-luxury text-[13px] tracking-[0.3em] uppercase text-foreground/70 border-0 rounded-md backdrop-blur-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/40 focus-visible:outline-offset-2 ${
            exploreCompact ? "py-2.5 px-10" : "py-3.5 px-14"
          }`}
          style={{
            background: exploreCompact
              ? "hsla(41, 12%, 50%, 0.06)"
              : "hsla(41, 12%, 50%, 0.08)",
            boxShadow: "inset 0 0.5px 0 0 hsla(38, 15%, 92%, 0.06)",
          }}
        >
          Explore
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
