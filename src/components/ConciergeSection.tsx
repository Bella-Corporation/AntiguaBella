import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, MessageSquare, Map } from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "Personal Concierge",
    description: "A single point of contact who understands your preferences and handles every detail before you arrive.",
  },
  {
    icon: Compass,
    title: "Curated Itineraries",
    description: "Tailored day-by-day plans built around your pace, your interests, and the island's best-kept offerings.",
  },
  {
    icon: Map,
    title: "Island Intelligence",
    description: "An evolving guide to Antigua's finest — from secluded beaches to private dining, updated by locals who know.",
  },
];

const ConciergeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="concierge" className="section-padding">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24 lg:mb-32"
        >
          <p className="luxury-subheading text-primary/70 mb-8">The Concierge</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.15] mb-10">
            Your Antigua,
            <br />
            <span className="italic">Designed</span>
          </h2>
          <div className="luxury-divider mb-10" />
          <p className="luxury-body text-muted-foreground text-base max-w-lg mx-auto">
            Every journey through AntiguaBella begins with understanding.
            We design around you — not the other way around.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="text-center lg:text-left"
            >
              <div className="w-12 h-12 mx-auto lg:mx-0 mb-6 rounded-full border border-border/40 flex items-center justify-center">
                <pillar.icon className="w-5 h-5 text-primary/70" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-sm max-w-xs mx-auto lg:mx-0">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConciergeSection;
