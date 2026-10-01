import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeaderSearch from "@/components/HeaderSearch";
import HeaderAccount from "@/components/HeaderAccount";
import { antiguaBellaHero, heroLoopMobileSrc, heroLoopSrc } from "@/data/antiguabellaMedia";
import { useIsMobile } from "@/hooks/use-mobile";

const menuEase = [0.22, 0.61, 0.36, 1] as const;

const menuItemMotion = (index: number, reduceMotion: boolean | null) => {
  if (reduceMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.48,
      delay: 0.06 + index * 0.04,
      ease: menuEase,
    },
  };
};

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Reduced motion keeps the still. Phones get the same muted hero video as desktop.
  const [preferStill] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Chosen once, before the element mounts, so a phone never requests the landscape file.
  const [heroSrc] = useState(() => {
    if (typeof window === "undefined") return heroLoopSrc;
    return window.matchMedia("(max-width: 767px)").matches ? heroLoopMobileSrc : heroLoopSrc;
  });
  const [videoStarted, setVideoStarted] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const { t } = useLanguage();
  const [exploreCompact, setExploreCompact] = useState(false);
  const [exploreHidden, setExploreHidden] = useState(false);
  const [exploreVisible, setExploreVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const reduceMotion = useReducedMotion();
  const heroNavLinks = [
    { label: "AntiguaBella", route: "/stays/antiguabella" },
    { label: "AntiguaSoleil", route: "/stays/antiguasoleil" },
    // MVP v0.0.1 — villa rentals only; re-enable when experiences/charters/concierge launch
    // { label: t("nav_experiences"), route: "/experiences" },
    // { label: t("nav_charters"), route: "/charters" },
    // { label: t("nav_concierge"), route: "/concierge" },
  ];

  useEffect(() => {
    if (exploreVisible) return;
    const timer = setTimeout(() => setExploreVisible(true), 900);
    return () => clearTimeout(timer);
  }, [exploreVisible]);

  useEffect(() => {
    if (preferStill) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const tryPlay = () => {
      if (userPaused) return;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      const promise = video.play();
      if (!promise) return;
      promise.catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setVideoStarted(false);
      });
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

    // Both masters end in a short encoded fade to black. Restart on the last
    // picture so the loop does not hold that black frame. Native `loop` remains;
    // `ended` covers browsers that ignore it.
    let restarting = false;
    const restart = () => {
      if (restarting || userPaused) return;
      restarting = true;
      video.currentTime = 0;
      const promise = video.play();
      if (!promise) return;
      promise.catch((error: unknown) => {
        restarting = false;
        if (error instanceof DOMException && error.name === "AbortError") return;
        setVideoStarted(false);
      });
    };
    const onTimeUpdate = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration < 1) return;
      if (video.currentTime < 1) {
        restarting = false;
        return;
      }
      if (restarting) return;
      if (video.currentTime >= duration - 0.85) restart();
    };
    const onEnded = () => restart();
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
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
    <section ref={sectionRef} className="hero-stage relative w-full overflow-hidden">
      {/* Still shows immediately. The video covers it only after playback has started. */}
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
          className="h-full w-full object-cover object-[26%_center] md:object-center"
        />
        {!preferStill && (
          <video
            ref={videoRef}
            src={heroSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={antiguaBellaHero.src}
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setVideoStarted(true)}
            className={`hero-video pointer-events-none absolute inset-0 h-full w-full object-cover object-center ${
              videoStarted ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="hero-veil absolute inset-0" />
      </div>

      {!preferStill && (
        <button
          type="button"
          onClick={toggleBackground}
          aria-pressed={userPaused}
          className="hero-glow-hover absolute bottom-28 left-4 z-30 hidden rounded-md border border-foreground/20 bg-background/45 px-4 py-2 font-aguero text-[11px] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-sm md:bottom-32 md:left-8 md:block"
        >
          {userPaused ? "Play background" : "Pause background"}
        </button>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <header
          className={`hero-bar fixed top-0 left-0 right-0 z-50 ${
            scrolled
              ? "is-scrolled bg-background/95 backdrop-blur-md"
              : "is-open bg-transparent"
          }`}
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 sm:px-6 lg:px-12 min-h-11">
            {/* Request — canonical inquiry path, visible on all breakpoints */}
            <div className="flex min-w-0 items-center">
              <Link
                to="/request"
                className="hero-glow-hover flex h-11 items-center whitespace-nowrap px-0.5 font-aguero text-[10px] uppercase leading-none tracking-[0.04em] text-foreground/50 transition-all duration-300 min-[380px]:tracking-[0.1em] sm:px-1 sm:text-[11px] sm:tracking-[0.18em] md:tracking-[0.22em]"
              >
                {t("common_request")}
              </Link>
            </div>

            <a href="#" className="luxury-heading flex items-center justify-self-center whitespace-nowrap tracking-wide">
              <span className={`text-foreground/90 transition-all duration-700 ${
                scrolled
                  ? "text-[0.95rem] min-[380px]:text-[1.02rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]"
                  : "text-[1rem] min-[380px]:text-[1.12rem] sm:text-[1.35rem] md:text-[1.6rem] lg:text-[2rem]"
              }`}>
                Antigua<span className="gold-text">Bella</span>
              </span>
            </a>

            <div className="flex items-center justify-end gap-1 sm:gap-4">
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
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/30 backdrop-blur-xl z-40"
            >
              <nav className="flex h-full flex-col items-center justify-center gap-1 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,env(safe-area-inset-top))]">
                <motion.div {...menuItemMotion(0, reduceMotion)}>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="hero-glow-hover inline-flex min-h-11 items-center px-4 font-aguero text-[13px] uppercase tracking-[0.18em] text-foreground/50 transition-colors duration-400 hover:text-foreground/80 sm:tracking-[0.25em]"
                  >
                    {t("common_account")}
                  </Link>
                </motion.div>
                <motion.div {...menuItemMotion(1, reduceMotion)} className="w-8 border-t border-foreground/10" />
                {isMobile && (
                  <motion.div {...menuItemMotion(2, reduceMotion)}>
                    <Link
                      to="/request"
                      onClick={() => setMenuOpen(false)}
                      className="hero-glow-hover inline-flex min-h-11 items-center gap-3 px-4 font-aguero text-[13px] uppercase tracking-[0.18em] text-foreground/50 transition-colors duration-400 hover:text-foreground/80 sm:tracking-[0.25em]"
                    >
                      <ShoppingBag size={15} strokeWidth={1.4} />
                      {t("common_request")}
                    </Link>
                  </motion.div>
                )}
                {heroNavLinks.map((link, index) => {
                  const itemIndex = (isMobile ? 3 : 2) + index;
                  const className = "hero-glow-hover inline-flex min-h-11 items-center px-4 font-aguero text-[13px] uppercase tracking-[0.18em] text-foreground/50 transition-colors duration-400 hover:text-foreground/80 sm:tracking-[0.25em]";
                  return link.route ? (
                    <motion.div key={link.route} {...menuItemMotion(itemIndex, reduceMotion)}>
                      <Link
                        to={link.route}
                        onClick={() => setMenuOpen(false)}
                        className={className}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key={link.label} {...menuItemMotion(itemIndex, reduceMotion)}>
                      <a
                        href={`#${link.label.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        className={className}
                      >
                        {link.label}
                      </a>
                    </motion.div>
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
        className={`explore-cta absolute inset-x-0 bottom-0 z-30 flex justify-center pointer-events-none md:fixed md:z-50 ${
          exploreVisible && !exploreHidden && !menuOpen ? "is-shown" : ""
        }`}
      >
        <a
          href="#about"
          className={`explore-pill hero-glow-hover pointer-events-auto rounded-md border-0 font-luxury text-[11px] uppercase tracking-[0.18em] text-foreground/90 backdrop-blur-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/40 focus-visible:outline-offset-2 md:text-[13px] md:tracking-[0.3em] md:text-foreground/70 ${
            exploreCompact ? "is-compact px-7 py-2.5 md:px-10" : "px-8 py-3 md:px-14 md:py-3.5"
          }`}
        >
          Explore
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
