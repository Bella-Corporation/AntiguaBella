import { useEffect } from "react";

/**
 * Luxury scroll-reveal system using a single IntersectionObserver.
 * Supports staggered delays via data-reveal-delay="100" (ms).
 * Animates once on enter, then locks — never resets on scroll-up.
 *
 * Also handles [data-scroll-cue] elements: applies a brief gold
 * emphasis when they enter the viewport, then fades it back.
 */
const useScrollReveal = () => {
  useEffect(() => {
    // --- Reveal system ---
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");

    const revealObserver = new IntersectionObserver(
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

            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((el) => revealObserver.observe(el));

    // --- Scroll cue system ---
    const cueElements = document.querySelectorAll<HTMLElement>("[data-scroll-cue]");
    const cueTimers = new Map<HTMLElement, number>();

    const cueObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting && !el.dataset.cueFired) {
            el.dataset.cueFired = "true";

            // Small delay so it plays after the reveal settles
            const activateDelay = window.setTimeout(() => {
              el.classList.add("cue-active");

              // Fade back after 1.6s
              const fadeTimer = window.setTimeout(() => {
                el.classList.remove("cue-active");
              }, 1600);

              cueTimers.set(el, fadeTimer);
            }, 400);

            cueTimers.set(el, activateDelay);
            cueObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    cueElements.forEach((el) => cueObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      cueObserver.disconnect();
      cueTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);
};

export default useScrollReveal;
