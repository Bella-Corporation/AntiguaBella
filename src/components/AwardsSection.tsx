import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Shield, Crown } from "lucide-react";

const awards = [
  {
    icon: Crown,
    title: "Condé Nast Gold List",
    subtitle: "2024 & 2025",
  },
  {
    icon: Star,
    title: "Michelin Keys",
    subtitle: "Two Keys Distinction",
  },
  {
    icon: Award,
    title: "TripAdvisor",
    subtitle: "Travelers' Choice 2025",
  },
  {
    icon: Shield,
    title: "Forbes Travel Guide",
    subtitle: "Five-Star Rating",
  },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-foreground text-background px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="luxury-subheading text-background/40 mb-6">Recognition</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-5xl text-background mb-6">
            World-Class Accolades
          </h2>
          <div className="w-16 border-t border-background/20 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="text-center"
            >
              <award.icon className="w-8 h-8 mx-auto mb-4 text-gold opacity-80" strokeWidth={1} />
              <h3 className="luxury-heading text-lg lg:text-xl text-background mb-1">
                {award.title}
              </h3>
              <p className="luxury-body text-background/50 text-xs">
                {award.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="luxury-body text-background/40 text-sm italic max-w-xl mx-auto">
            "One of the Caribbean's finest boutique resorts — an intimate paradise 
            that redefines luxury hospitality."
          </p>
          <p className="luxury-subheading text-[10px] text-background/30 mt-4">
            — Condé Nast Traveler
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
