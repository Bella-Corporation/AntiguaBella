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
    <section id="wellbeing" className="py-28 lg:py-40 bg-secondary/30 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="luxury-subheading mb-6">Wellness & Spa</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Restore Your Soul
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Surrender to serenity in our award-winning spa, where ancient healing
            traditions meet modern wellness in a setting of unparalleled natural beauty.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const index = (activeIndex + offset) % wellnessCards.length;
              const card = wellnessCards[index];
              return (
                <div key={`${card.title}-${offset}`} className="group">
                  <div className="overflow-hidden mb-5">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[300px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="luxury-body text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 card */}
          <div className="md:hidden">
            <div className="group">
              <div className="overflow-hidden mb-5">
                <img
                  src={wellnessCards[activeIndex].image}
                  alt={wellnessCards[activeIndex].title}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <h3 className="luxury-heading text-xl text-foreground mb-2">
                {wellnessCards[activeIndex].title}
              </h3>
              <p className="luxury-body text-muted-foreground text-sm">
                {wellnessCards[activeIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
              aria-label="Previous wellness card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {wellnessCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === activeIndex ? "bg-primary" : "bg-foreground/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-10 h-10 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
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
