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
    <section className="py-24 lg:py-36 bg-charcoal-deep px-6 lg:px-10 border-t border-border/30">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="luxury-subheading text-primary mb-6">Recognition</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            World-Class <span className="italic">Accolades</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[var(--shadow-gold)] transition-all duration-500">
                <award.icon className="w-7 h-7 text-primary opacity-80 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1} />
              </div>
              <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-1">
                {award.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-xs">
                {award.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="luxury-body text-foreground/30 text-sm italic max-w-xl mx-auto leading-relaxed">
            "One of the Caribbean's finest luxury experiences — an intimate paradise
            that redefines island hospitality."
          </p>
          <p className="luxury-subheading text-[10px] text-primary/50 mt-5">
            — Condé Nast Traveler
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
