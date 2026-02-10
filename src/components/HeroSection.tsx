import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import HeaderSearch from "@/components/HeaderSearch";
import heroVideo from "@/assets/hero-video.mp4";

const heroNavLinks = ["Stays", "Experiences", "Concierge", "Dining", "Weddings", "Parties", "Blogs"];

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreCompact, setExploreCompact] = useState(false);
  const [exploreHidden, setExploreHidden] = useState(false);
  const [exploreVisible, setExploreVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExploreVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setExploreCompact(y > 40);

      // Hide when near footer OR when overlapping wellness pagination
      let hideForPagination = false;
      const paginationEl = document.getElementById("wellness-pagination");
      if (paginationEl) {
        const rect = paginationEl.getBoundingClientRect();
        const viewportBottom = window.innerHeight;
        hideForPagination = rect.bottom > viewportBottom - 120 && rect.top < viewportBottom;
      }

      setExploreHidden((maxScroll > 0 && y >= maxScroll - 80) || hideForPagination);
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(0,0%,0%,0.38) 0%, hsla(41,20%,8%,0.32) 50%, hsla(0,0%,0%,0.42) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md py-3"
              : "bg-transparent py-5 lg:py-6"
          }`}
          style={{ paddingTop: scrolled ? undefined : "max(env(safe-area-inset-top, 0px), 1.75rem)" }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-12">
            <div className="flex items-center" style={{ minWidth: '120px' }}>
              <Link
                to="/book"
                className="hero-glow-hover font-aguero text-[11px] tracking-[0.22em] uppercase text-foreground/50 transition-all duration-300"
              >
                Book
              </Link>
            </div>

            <a href="#" className="absolute left-1/2 -translate-x-1/2 luxury-heading tracking-wide">
              <span className={`transition-all duration-700 ${
                scrolled ? "text-[1.4rem] lg:text-[1.6rem]" : "text-[1.6rem] lg:text-[2rem]"
              }`}>
                <span className="text-foreground/90">
                  Antigua<span className="gold-text">Bella</span>
                </span>
              </span>
            </a>

            <div className="flex items-center justify-end gap-4" style={{ minWidth: '120px' }}>
              <HeaderSearch />
              <Link
                to="/book"
                className="hero-glow-hover text-foreground/50 transition-all duration-300"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
              </Link>
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
          </div>

          {/* Mobile / menu drawer — kept as interactive UI animation */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 bg-background/30 backdrop-blur-xl overflow-hidden z-[-1]"
              >
                <nav className="flex flex-col items-center gap-6 py-12 pt-24">
                  {heroNavLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="hero-glow-hover font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="flex-1" />
      </div>

      {/* Fixed Explore CTA — scroll-driven visibility is functional UI, not reveal animation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 2.5rem)",
          opacity: !exploreVisible ? 0 : exploreHidden ? 0 : 1,
          transform: !exploreVisible ? "translateY(20px) scale(0.85)" : exploreHidden ? "translateY(20px) scale(0.85)" : "translateY(0) scale(1)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <a
          href="#about"
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
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
