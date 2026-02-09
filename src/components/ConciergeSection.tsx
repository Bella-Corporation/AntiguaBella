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
      <div ref={ref} className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-28 lg:mb-36"
        >
          <p className="luxury-subheading text-primary/60 mb-6">The Concierge</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
            Your Antigua,
            <br />
            <span className="italic">Designed</span>
          </h2>
          <div className="luxury-divider mb-10" />
          <p className="luxury-body text-muted-foreground max-w-md mx-auto">
            Every journey through AntiguaBella begins with understanding.
            We design around you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: i === 0 ? -30 : i === 2 ? 30 : 0, y: i === 1 ? 20 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 * i }}
              className="text-center lg:text-left"
              data-reveal={i === 0 ? "slide-left" : i === 1 ? "slide-up" : "slide-right"}
            >
              <div className="w-11 h-11 mx-auto lg:mx-0 mb-7 rounded-full border border-border/30 flex items-center justify-center">
                <pillar.icon className="w-[18px] h-[18px] text-primary/60" strokeWidth={1.2} />
              </div>
              <h3 className="luxury-heading text-lg lg:text-xl text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-[13px] max-w-[260px] mx-auto lg:mx-0">
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
