import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import spaTreatment from "@/assets/spa-treatment.jpg";
import yogaDeck from "@/assets/yoga-deck.jpg";
import spaWellness from "@/assets/spa-wellness.jpg";
import spaPool from "@/assets/spa-pool.jpg";

const wellnessCards = [
  {
    title: "Signature Massage",
    description: "A luxurious full-body treatment using locally-sourced essential oils and warm Caribbean techniques.",
    image: spaTreatment,
  },
  {
    title: "Sunrise Yoga",
    description: "Begin each morning with guided yoga on our ocean-facing deck, connecting breath with the rhythm of the sea.",
    image: yogaDeck,
  },
  {
    title: "Holistic Spa Rituals",
    description: "Multi-sensory spa journeys combining ancient healing traditions with modern wellness therapies.",
    image: spaWellness,
  },
  {
    title: "Garden Hydrotherapy",
    description: "Immerse yourself in our tropical garden pools, designed for deep relaxation and restoration.",
    image: spaPool,
  },
];

const WellnessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = () => setActiveIndex((prev) => (prev === 0 ? wellnessCards.length - 1 : prev - 1));
  const scrollNext = () => setActiveIndex((prev) => (prev === wellnessCards.length - 1 ? 0 : prev + 1));

  return (
    <section id="wellbeing" className="section-padding bg-secondary/50">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <p className="luxury-subheading text-primary mb-6">Wellness & Spa</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Restore Your <span className="italic">Soul</span>
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Surrender to serenity in our award-winning spa, where ancient healing
            traditions meet modern wellness in a setting of unparalleled natural beauty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((offset) => {
              const index = (activeIndex + offset) % wellnessCards.length;
              const card = wellnessCards[index];
              return (
                <div key={`${card.title}-${offset}`} className="luxury-card group">
                  <div className="luxury-card-image">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-[280px] lg:h-[340px]"
                    />
                    <div className="luxury-card-overlay" />
                  </div>
                  <div className="luxury-card-body">
                    <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="luxury-body text-muted-foreground text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 card */}
          <div className="md:hidden">
            <div className="luxury-card group">
              <div className="luxury-card-image">
                <img
                  src={wellnessCards[activeIndex].image}
                  alt={wellnessCards[activeIndex].title}
                  className="h-[280px]"
                />
              </div>
              <div className="luxury-card-body">
                <h3 className="luxury-heading text-xl text-foreground mb-2">
                  {wellnessCards[activeIndex].title}
                </h3>
                <p className="luxury-body text-muted-foreground text-sm">
                  {wellnessCards[activeIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
              aria-label="Previous wellness card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2.5">
              {wellnessCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "bg-primary scale-125" : "bg-foreground/15 hover:bg-foreground/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-300"
              aria-label="Next wellness card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WellnessSection;
