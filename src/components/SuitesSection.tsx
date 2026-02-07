import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import suiteImage from "@/assets/suite-ocean.jpg";
import poolImage from "@/assets/pool-view.jpg";

const suites = [
  {
    name: "Hillside Suite",
    description: "Perched among tropical gardens with sweeping ocean panoramas and a private plunge pool.",
    image: poolImage,
    size: "1,200 sq ft",
  },
  {
    name: "Beachfront Suite",
    description: "Steps from the shore with uninterrupted sea views from your private terrace.",
    image: suiteImage,
    size: "1,500 sq ft",
  },
];

const SuitesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="suites" className="py-28 lg:py-40 bg-secondary/50 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="luxury-subheading mb-6">Accommodations</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Suites & Villas
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Each suite is a private sanctuary designed to harmonize with the natural beauty
            of the island, offering an unparalleled sense of place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {suites.map((suite, i) => (
            <motion.div
              key={suite.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={suite.image}
                  alt={`${suite.name} at the luxury resort`}
                  className="w-full h-[400px] lg:h-[480px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="luxury-heading text-2xl lg:text-3xl text-foreground mb-2">
                    {suite.name}
                  </h3>
                  <p className="luxury-body text-muted-foreground">
                    {suite.description}
                  </p>
                </div>
                <span className="luxury-subheading text-[10px] shrink-0 mt-2">
                  {suite.size}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="luxury-btn-outline">
            View All Suites
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuitesSection;
