import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, KeyRound, Globe, Star } from "lucide-react";

const accolades = [
  { name: "Condé Nast Gold List", detail: "2024 & 2025", icon: Award },
  { name: "Michelin Keys", detail: "Two Keys Distinction", icon: KeyRound },
  { name: "TripAdvisor", detail: "Travelers' Choice 2025", icon: Globe },
  { name: "Forbes Travel Guide", detail: "Five-Star Rating", icon: Star },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding border-t border-border/10">
      <div ref={ref} className="mx-auto max-w-7xl">
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
            <div
              key={award.name}
              className="text-center"
              data-reveal={i === 0 ? "slide-left" : i === 3 ? "slide-right" : "slide-up"}
            >
              <div className="w-10 h-10 mx-auto mb-6 rounded-full border border-border/30 flex items-center justify-center">
                <award.icon className="w-[17px] h-[17px] text-primary/60" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-base lg:text-lg text-foreground mb-2">
                {award.name}
              </h3>
              <p className="luxury-body text-muted-foreground/50 text-[12px]">
                {award.detail}
              </p>
            </div>
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
