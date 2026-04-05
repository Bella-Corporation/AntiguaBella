import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import spaTreatment from "@/assets/spa-treatment.jpg";
import yogaDeck from "@/assets/yoga-deck.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";
import spaPool from "@/assets/spa-pool.jpg";

const offerings = [
  {
    title: "Signature Massage",
    description:
      "A luxurious full-body treatment using locally-sourced essential oils and warm Caribbean techniques.",
    image: spaTreatment,
  },
  {
    title: "Sunrise Yoga",
    description:
      "Begin each morning with guided yoga on our ocean-facing deck, connecting breath with the rhythm of the sea.",
    image: yogaDeck,
  },
  {
    title: "Holistic Spa Rituals",
    description:
      "Multi-sensory spa journeys combining ancient healing traditions with modern wellness therapies.",
    image: spaWellness,
  },
  {
    title: "Hydrotherapy Pool",
    description:
      "Rejuvenate in our thermal pools overlooking the Caribbean, designed for deep relaxation and recovery.",
    image: spaPool,
  },
];

const PAGE_SIZE = 3;

const WellnessSection = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalPages = Math.ceil(offerings.length / PAGE_SIZE);
  const visible = offerings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goToPage = (newPage: number) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  return (
    <section id="wellness" className="section-padding bg-card">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="text-center mb-14 lg:mb-20">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-4">Wellness & Spa</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" data-scroll-cue className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-7">
            Restore Your <span className="italic">Soul</span>
          </h2>
          <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mb-7" />
          <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-lg mx-auto">
            Surrender to serenity in our award-winning spa, where ancient healing traditions
            meet modern wellness in a setting of unparalleled natural beauty.
          </p>
        </div>

        <div data-reveal="slide-up" data-reveal-delay="520" className="relative overflow-hidden mb-16">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                animate: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {visible.map((item) => (
                <div key={item.title} className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]" style={{ background: 'hsl(0 0% 7%)', border: '1px solid hsl(41 54% 54% / 0.2)', boxShadow: 'none' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px -4px hsl(41 54% 54% / 0.25), 0 0 40px -8px hsl(41 54% 54% / 0.1)'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.45)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.2)'; }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[260px] lg:h-[300px] object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="luxury-subheading text-[11px] font-bold" style={{ color: 'hsl(41 54% 54%)', textShadow: '0 0 4px hsl(0 0% 0% / 0.9), 0 0 8px hsl(0 0% 0% / 0.6)' }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="luxury-body text-muted-foreground text-[13px] max-w-[300px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div id="wellness-pagination" data-reveal="fade" data-reveal-delay="620" className="flex items-center justify-center gap-4">
          <button
            onClick={() => goToPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border border-border/30 flex items-center justify-center text-foreground/50 hover:text-foreground disabled:opacity-30 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === page ? "bg-primary w-3" : "bg-foreground/20"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => goToPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border border-border/30 flex items-center justify-center text-foreground/50 hover:text-foreground disabled:opacity-30 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WellnessSection;
