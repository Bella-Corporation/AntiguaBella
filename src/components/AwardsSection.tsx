import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-36 lg:py-48 px-6 lg:px-12 border-t border-border/10">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="luxury-divider mb-20" />

          <p className="luxury-heading text-[1.4rem] md:text-[1.7rem] lg:text-[2rem] text-foreground/70 italic leading-[1.6] mb-14 max-w-xl mx-auto">
            "A rare platform that understands the difference between
            luxury and excess. Antigua, finally done right."
          </p>

          <p className="luxury-subheading text-[10px] text-primary/40 mb-20">
            — Condé Nast Traveler
          </p>

          <div className="flex items-center justify-center gap-14 lg:gap-20">
            {["Condé Nast Gold List", "Forbes Travel Guide", "Michelin Keys"].map((name, i) => (
              <motion.p
                key={name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                className="luxury-subheading text-[9px] text-muted-foreground/30 tracking-[0.2em]"
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
