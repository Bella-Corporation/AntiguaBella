import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import resortAerial from "@/assets/resort-aerial.jpg";

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
          >
            <p className="luxury-subheading text-primary/70 mb-8">The Platform</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.15] mb-10">
              Access Without
              <br />
              <span className="italic">Compromise</span>
            </h2>
            <div className="luxury-divider mx-0 mb-10" />
            <p className="luxury-body text-muted-foreground text-base lg:text-lg mb-6">
              AntiguaBella connects discerning travelers to a handpicked
              collection of Antigua's most extraordinary stays, experiences,
              and private services.
            </p>
            <p className="luxury-body text-muted-foreground/60 text-sm">
              No noise. No compromise. Just the island, at its finest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-border/20">
              <img
                src={resortAerial}
                alt="Aerial view of Antigua's coastline"
                className="w-full h-[480px] lg:h-[580px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
