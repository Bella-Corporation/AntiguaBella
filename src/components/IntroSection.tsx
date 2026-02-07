import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import resortAerial from "@/assets/resort-aerial.jpg";

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="luxury-subheading text-primary mb-6">The Experience</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              A World Apart,
              <br />
              <span className="italic">All Your Own</span>
            </h2>
            <div className="luxury-divider mx-0 mb-8" />
            <p className="luxury-body text-muted-foreground text-lg mb-6">
              Set upon a pristine crescent of white sand along Antigua's unspoiled western coast,
              AntiguaBella is an elite luxury platform offering curated access to the island's
              most extraordinary experiences.
            </p>
            <p className="luxury-body text-muted-foreground">
              With an intimate collection of handpicked villas and bespoke concierge services,
              we provide the rare privacy and sophistication that defines modern Caribbean luxury.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border/30">
              <img
                src={resortAerial}
                alt="Aerial view of luxury resort estate with tropical gardens"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-card)] border border-border/30 hidden lg:block">
              <p className="luxury-subheading text-[10px] text-primary mb-2">Established</p>
              <p className="luxury-heading text-3xl text-foreground">2003</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
