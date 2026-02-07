import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
            <p className="luxury-subheading mb-6">The Experience</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              A World Apart,
              <br />
              All Your Own
            </h2>
            <div className="luxury-divider mx-0 mb-8" />
            <p className="luxury-body text-muted-foreground text-lg mb-6">
              Set upon a pristine crescent of white sand along Antigua's unspoiled western coast,
              Hermitage Bay is an award-winning all-inclusive luxury resort offering an intimate
              escape from the ordinary.
            </p>
            <p className="luxury-body text-muted-foreground">
              With just 30 individually appointed suites, each with breathtaking views of the
              Caribbean Sea, our resort provides a rare sense of privacy and tranquility that
              defines the art of Caribbean luxury.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
              <img
                src={resortAerial}
                alt="Aerial view of the luxury resort estate with tropical gardens"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-lg p-6 lg:p-8 shadow-[var(--shadow-card)] hidden lg:block">
              <p className="luxury-subheading text-[10px] mb-2">Established</p>
              <p className="luxury-heading text-3xl text-foreground">2003</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
