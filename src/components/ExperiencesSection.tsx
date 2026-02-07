import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import spaImage from "@/assets/spa-wellness.jpg";

const experiences = [
  { title: "Snorkeling & Diving", desc: "Explore vibrant coral reefs teeming with tropical marine life." },
  { title: "Sailing Excursions", desc: "Private sunset cruises along Antigua's stunning coastline." },
  { title: "Yoga & Meditation", desc: "Morning sessions on the beach with expert practitioners." },
  { title: "Island Tours", desc: "Discover the rich history and culture of Antigua." },
];

const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiences" className="relative">
      {/* Full-width spa image banner */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={spaImage}
          alt="Luxury spa treatment room with ocean view"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="luxury-subheading text-primary-foreground/70 mb-6">Wellness & Spa</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-7xl text-primary-foreground mb-6">
              Restore Your Soul
            </h2>
            <div className="luxury-divider border-primary-foreground/40" />
          </motion.div>
        </div>
      </div>

      {/* Experiences grid */}
      <div ref={ref} className="py-28 lg:py-40 px-6 bg-secondary/30">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="luxury-subheading mb-6">Activities</p>
            <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mb-6">
              Curated Experiences
            </h2>
            <div className="luxury-divider" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * i }}
                className="text-center"
              >
                <div className="w-12 h-px bg-primary/40 mx-auto mb-6" />
                <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-3">
                  {exp.title}
                </h3>
                <p className="luxury-body text-muted-foreground text-sm">
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
