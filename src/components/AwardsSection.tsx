import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accolades = [
  { name: "Condé Nast Gold List", detail: "2024 & 2025" },
  { name: "Michelin Keys", detail: "Two Keys Distinction" },
  { name: "TripAdvisor", detail: "Travelers' Choice 2025" },
  { name: "Forbes Travel Guide", detail: "Five-Star Rating" },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section className="py-36 lg:py-48 px-6 lg:px-12 border-t border-border/10">
      <div ref={ref} className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="luxury-subheading text-primary/60 mb-6">Recognition</p>
          <h2 className="luxury-heading text-[1.7rem] md:text-[2.2rem] lg:text-[2.5rem] text-foreground leading-[1.2]">
            World-Class <span className="italic">Accolades</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {accolades.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
              className="text-center"
            >
              <div className="luxury-divider mb-6" />
              <h3 className="luxury-heading text-base lg:text-lg text-foreground mb-2">
                {award.name}
              </h3>
              <p className="luxury-body text-muted-foreground/50 text-[12px]">
                {award.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center"
        >
          <div className="luxury-divider mb-14" />
          <p className="luxury-heading text-[1.2rem] md:text-[1.5rem] lg:text-[1.7rem] text-foreground/70 italic leading-[1.6] mb-8 max-w-xl mx-auto">
            "A rare platform that understands the difference between
            luxury and excess. Antigua, finally done right."
          </p>
          <p className="luxury-subheading text-[10px] text-primary/40">
            — Condé Nast Traveler
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
