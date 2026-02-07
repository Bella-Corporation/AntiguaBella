import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import expBoat from "@/assets/exp-boat.jpg";
import expCooking from "@/assets/exp-cooking.jpg";
import expFarm from "@/assets/exp-farm.jpg";
import expSnorkel from "@/assets/exp-snorkel.jpg";

const experiences = [
  {
    title: "Private Charters",
    tagline: "Your own vessel. Your own horizon.",
    image: expBoat,
  },
  {
    title: "Culinary Journeys",
    tagline: "Island flavors, chef-led.",
    image: expCooking,
  },
  {
    title: "Island Discovery",
    tagline: "Beyond the shoreline.",
    image: expFarm,
  },
  {
    title: "Ocean & Reef",
    tagline: "Caribbean waters, explored.",
    image: expSnorkel,
  },
];

const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experiences" className="section-padding bg-card">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="lg:col-span-5"
          >
            <p className="luxury-subheading text-primary/70 mb-8">Experiences</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.15] mb-8">
              Beyond the
              <br />
              <span className="italic">Expected</span>
            </h2>
            <div className="luxury-divider mx-0 mb-8" />
            <p className="luxury-body text-muted-foreground text-base max-w-sm">
              Every experience on the platform is vetted, private, and
              designed for travelers who prefer depth over spectacle.
            </p>
          </motion.div>
        </div>

        {/* 2×2 grid, restrained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 * i }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/20"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-[280px] lg:h-[360px] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-background/35 group-hover:bg-background/25 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-1">
                  {exp.title}
                </h3>
                <p className="luxury-body text-foreground/35 text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {exp.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <a href="#begin" className="luxury-btn-outline text-[10px]">
            Browse Experiences
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
