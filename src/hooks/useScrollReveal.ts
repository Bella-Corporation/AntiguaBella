import { useEffect } from "react";

/**
 * Luxury scroll-reveal system using a single IntersectionObserver.
 * Supports staggered delays via data-reveal-delay="100" (ms).
 * Animates once on enter, then locks — never resets on scroll-up.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.revealDelay || "0", 10);

            if (delay > 0) {
              setTimeout(() => {
                el.classList.add("is-revealed");
                el.setAttribute("data-revealed", "true");
              }, delay);
            } else {
              el.classList.add("is-revealed");
              el.setAttribute("data-revealed", "true");
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
