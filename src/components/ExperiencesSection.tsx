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

const SlideInCard = ({
  children,
  x = 0,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  x?: number;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ExperiencesSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="experiences" className="section-padding bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-28 items-start mb-20 lg:mb-28">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -25 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <p className="luxury-subheading text-primary/60 mb-6">Experiences</p>
            <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-10">
              Beyond the
              <br />
              <span className="italic">Expected</span>
            </h2>
            <div className="luxury-divider mx-0 mb-10" />
            <p className="luxury-body text-muted-foreground max-w-sm">
              Every experience on the platform is vetted, private, and
              designed for travelers who prefer depth over spectacle.
            </p>
          </motion.div>
        </div>

        {/* 2×2 grid, restrained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {experiences.map((exp, i) => (
            <SlideInCard
              key={exp.title}
              x={i % 2 === 0 ? -20 : 20}
              delay={0.08 * i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/15 image-card-hover"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-[260px] lg:h-[340px] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-background/35 group-hover:bg-background/25 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="luxury-heading text-lg lg:text-[1.35rem] text-foreground mb-1">
                  {exp.title}
                </h3>
                <p className="luxury-body text-foreground/30 text-[13px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {exp.tagline}
                </p>
              </div>
            </SlideInCard>
          ))}
        </div>

        <SlideInCard x={0} delay={0} className="mt-20 lg:mt-24">
          <a href="#begin" className="luxury-btn-outline">
            Browse Experiences
          </a>
        </SlideInCard>
      </div>
    </section>
  );
};

export default ExperiencesSection;
