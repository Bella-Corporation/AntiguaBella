import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const totalPages = Math.ceil(offerings.length / PAGE_SIZE);
  const visible = offerings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="wellness" className="section-padding bg-background">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20 lg:mb-28"
        >
          <p className="luxury-subheading text-primary/60 mb-6">Wellness & Spa</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
            Restore Your <span className="italic">Soul</span>
          </h2>
          <div className="luxury-divider mb-10" />
          <p className="luxury-body text-muted-foreground max-w-lg mx-auto">
            Surrender to serenity in our award-winning spa, where ancient healing traditions
            meet modern wellness in a setting of unparalleled natural beauty.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {visible.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden border border-border/15 mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[260px] lg:h-[300px] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-[13px] max-w-[300px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots & arrows */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
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
                onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === page ? "bg-primary w-3" : "bg-foreground/20"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
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
