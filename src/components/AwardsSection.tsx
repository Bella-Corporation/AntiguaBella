import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 lg:py-44 px-6 lg:px-10 border-t border-border/15">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="luxury-divider mb-16" />

          <p className="luxury-heading text-2xl md:text-3xl lg:text-4xl text-foreground/80 italic leading-[1.5] mb-12 max-w-2xl mx-auto">
            "A rare platform that understands the difference between
            luxury and excess. Antigua, finally done right."
          </p>

          <p className="luxury-subheading text-[10px] text-primary/50 mb-16">
            — Condé Nast Traveler
          </p>

          <div className="flex items-center justify-center gap-12 lg:gap-16">
            {["Condé Nast Gold List", "Forbes Travel Guide", "Michelin Keys"].map((name, i) => (
              <motion.p
                key={name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                className="luxury-subheading text-[9px] text-muted-foreground/40 tracking-[0.2em]"
              >
                {name}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
