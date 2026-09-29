import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeaderSearch from "@/components/HeaderSearch";
import HeaderAccount from "@/components/HeaderAccount";
import { antiguaBellaHero, heroLoopSrc } from "@/data/antiguabellaMedia";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Decide before paint so a phone or reduced-motion visit never creates the video.
  const [preferStill] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  );
  const [videoStarted, setVideoStarted] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const { t } = useLanguage();
  const [exploreCompact, setExploreCompact] = useState(false);
  const [exploreHidden, setExploreHidden] = useState(false);
  const [exploreVisible, setExploreVisible] = useState(false);
  const heroNavLinks = [
    { label: "AntiguaBella", route: "/stays/antiguabella" },
    { label: "AntiguaSoleil", route: "/stays/antiguasoleil" },
    // MVP v0.0.1 — villa rentals only; re-enable when experiences/charters/concierge launch
    // { label: t("nav_experiences"), route: "/experiences" },
    // { label: t("nav_charters"), route: "/charters" },
    // { label: t("nav_concierge"), route: "/concierge" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setExploreVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (preferStill) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const tryPlay = () => {
      if (userPaused) return;
      video.play().catch(() => setVideoStarted(false));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    tryPlay();
    return () => observer.disconnect();
  }, [preferStill, userPaused]);

  const toggleBackground = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => setVideoStarted(false));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

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
    <section ref={sectionRef} className="relative h-[78svh] w-full overflow-hidden md:h-screen">
      {/* Still on phones and reduced motion. Desktop video stays out of the mobile document. */}
      <div className="absolute inset-0">
        <img
          src={antiguaBellaHero.src}
          srcSet={antiguaBellaHero.srcSet}
          sizes="100vw"
          alt={antiguaBellaHero.alt}
          width={antiguaBellaHero.width}
          height={antiguaBellaHero.height}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[28%_center] md:object-center"
        />
        {!preferStill && (
          <video
            ref={videoRef}
            src={heroLoopSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setVideoStarted(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoStarted ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(0,0%,0%,0.38) 0%, hsla(41,20%,8%,0.32) 50%, hsla(0,0%,0%,0.42) 100%)",
          }}
        />
      </div>

      {!preferStill && (
        <button
          type="button"
          onClick={toggleBackground}
          aria-pressed={userPaused}
          className="absolute bottom-28 left-4 z-30 rounded-md border border-foreground/20 bg-background/45 px-4 py-2 font-aguero text-[11px] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-sm md:bottom-32 md:left-8"
        >
          {userPaused ? "Play background" : "Pause background"}
        </button>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md py-3 md:py-4"
              : "bg-transparent py-5 md:py-6 lg:py-8"
          }`}
          style={{ paddingTop: scrolled ? undefined : "max(env(safe-area-inset-top, 0px), 2rem)" }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12 min-h-[44px] md:min-h-[40px]">
            {/* Request — canonical inquiry path, visible on all breakpoints */}
            <div className="flex items-center h-8 min-w-[44px] md:min-w-[80px]">
              <Link
                to="/request"
                className="hero-glow-hover font-aguero text-[11px] tracking-[0.22em] uppercase text-foreground/50 transition-all duration-300 leading-none flex items-center h-8 px-1"
              >
                {t("common_request")}
              </Link>
            </div>

            <a href="#" className="absolute left-1/2 -translate-x-1/2 luxury-heading tracking-wide flex items-center">
              <span className={`transition-all duration-700 ${
                scrolled ? "text-[1.25rem] md:text-[1.4rem] lg:text-[1.6rem]" : "text-[1.4rem] md:text-[1.6rem] lg:text-[2rem]"
              }`}>
                <span className="text-foreground/90">
                  Antigua<span className="gold-text">Bella</span>
                </span>
              </span>
            </a>

            <div className="flex items-center justify-end gap-2 sm:gap-4" style={{ minWidth: isMobile ? '44px' : '80px' }}>
              {/* Desktop-only icons */}
              {!isMobile && (
                <>
                  <HeaderSearch />
                  <HeaderAccount />
                  <Link
                    to="/bag"
                    className="hero-glow-hover flex items-center justify-center h-8 w-8 text-foreground/50 transition-all duration-300"
                    aria-label="View bag itinerary"
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                  </Link>
                </>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hero-glow-hover flex flex-col items-center justify-center h-11 w-11 md:h-8 md:w-8 gap-[5px] transition-all duration-300"
                style={{ marginTop: '-1px' }}
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

        </header>

        {/* Menu drawer — outside header for proper z-index stacking */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/30 backdrop-blur-xl z-40"
            >
              <nav className="flex flex-col items-center gap-6 h-full justify-center">
                {/* Account — always visible at top of menu */}
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="hero-glow-hover font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                >
                  {t("common_account")}
                </Link>
                <div className="w-8 border-t border-foreground/10" />
                {/* Mobile-only action links */}
                {isMobile && (
                  <Link
                    to="/request"
                    onClick={() => setMenuOpen(false)}
                    className="hero-glow-hover flex items-center gap-3 font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                  >
                    <ShoppingBag size={15} strokeWidth={1.4} />
                    {t("common_request")}
                  </Link>
                )}
                {heroNavLinks.map((link) => {
                  return link.route ? (
                    <Link
                      key={link.route}
                      to={link.route}
                      onClick={() => setMenuOpen(false)}
                      className="hero-glow-hover font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={`#${link.label.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      className="hero-glow-hover font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />
      </div>

      {/* Fixed Explore CTA — scroll-driven visibility is functional UI, not reveal animation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 2.5rem)",
          opacity: !exploreVisible ? 0 : (exploreHidden || menuOpen) ? 0 : 1,
          transform: !exploreVisible ? "translateY(20px) scale(0.85)" : (exploreHidden || menuOpen) ? "translateY(20px) scale(0.85)" : "translateY(0) scale(1)",
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
