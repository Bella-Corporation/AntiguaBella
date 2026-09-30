import { useEffect } from "react";

/**
 * Luxury scroll-reveal system using a single IntersectionObserver.
 * Supports staggered delays via data-reveal-delay="100" (ms).
 * Animates once on enter, then locks — never resets on scroll-up.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const timers = new Set<number>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.revealDelay || "0", 10);
          const reveal = () => {
            el.classList.add("is-revealed");
            el.setAttribute("data-revealed", "true");
          };

          if (delay > 0) {
            timers.add(window.setTimeout(reveal, delay));
          } else {
            reveal();
          }

          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
};

export default useScrollReveal;
