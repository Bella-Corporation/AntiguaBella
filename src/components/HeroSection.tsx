import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* ── Hero overlay UI ──────────────────────── */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-6 lg:px-10 lg:pt-8"
          style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 1.5rem)" }}
        >
          {/* Book — top left */}
          <a
            href="#book"
            className="hero-glow-hover font-aguero text-[11px] tracking-[0.22em] uppercase text-foreground/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book
          </a>

          {/* Hamburger — top right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hero-glow-hover flex flex-col items-end gap-[5px] p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

        {/* Mobile drawer from hero hamburger */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <nav className="flex flex-col items-center gap-7 py-12">
                {["Stays", "Experiences", "Concierge"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-aguero text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors duration-400"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Explore CTA — bottom center */}
        <div
          className="flex justify-center pb-10 lg:pb-14"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 2.5rem)" }}
        >
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
            className="hero-glow-hover font-luxury text-[12px] tracking-[0.3em] uppercase text-foreground/55 border border-foreground/10 py-3.5 px-14 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
