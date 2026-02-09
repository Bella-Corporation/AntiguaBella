import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import resortAerial from "@/assets/resort-aerial.jpg";

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="luxury-subheading text-primary/60 mb-6">The Platform</p>
            <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
              Access Without
              <br />
              <span className="italic">Compromise</span>
            </h2>
            <div className="luxury-divider mx-0 mb-10" />
            <p className="luxury-body text-muted-foreground mb-8">
              AntiguaBella connects discerning travelers to a handpicked
              collection of Antigua's most extraordinary stays, experiences,
              and private services.
            </p>
            <p className="luxury-body text-muted-foreground/50 text-[13px]">
              No noise. No compromise. Just the island, at its finest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden border border-border/15">
              <img
                src={resortAerial}
                alt="Aerial view of Antigua's coastline"
                className="w-full h-[460px] lg:h-[560px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
