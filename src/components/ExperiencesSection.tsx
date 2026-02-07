import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import expBoat from "@/assets/exp-boat.jpg";
import expCooking from "@/assets/exp-cooking.jpg";
import expFarm from "@/assets/exp-farm.jpg";
import expSnorkel from "@/assets/exp-snorkel.jpg";

const experiences = [
  {
    title: "Private Boat Charters",
    description: "Sail the turquoise waters of Antigua aboard your own private catamaran.",
    image: expBoat,
  },
  {
    title: "Cooking Demos",
    description: "Master Caribbean cuisine with our chefs using fresh, local ingredients.",
    image: expCooking,
  },
  {
    title: "Farm Tours",
    description: "Explore our organic gardens and discover the island's rich agricultural heritage.",
    image: expFarm,
  },
  {
    title: "Snorkeling & Diving",
    description: "Discover vibrant coral reefs teeming with tropical marine life.",
    image: expSnorkel,
  },
];

const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiences" className="py-28 lg:py-40 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="luxury-subheading mb-6">Experiences</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Curated Moments
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-2xl mx-auto text-lg">
            From ocean adventures to cultural discoveries, every experience at
            Hermitage Bay is crafted to create lasting memories.
          </p>
        </motion.div>

        {/* Gallery Grid - asymmetric layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.12 * i }}
              className={`group relative overflow-hidden cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? "h-[400px] lg:h-full" : "h-[200px] lg:h-[280px]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="luxury-heading text-lg lg:text-xl text-primary-foreground mb-1">
                  {exp.title}
                </h3>
                <p className="luxury-body text-primary-foreground/80 text-xs lg:text-sm">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
