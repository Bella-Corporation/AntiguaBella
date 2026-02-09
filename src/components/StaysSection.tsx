import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";

const stays = [
  {
    name: "Beachfront Estates",
    tagline: "Where the sand meets silence.",
    image: villaBeachfront,
  },
  {
    name: "Oceanview Villas",
    tagline: "Private pools. Panoramic calm.",
    image: villaBeachPool,
  },
  {
    name: "Hillside Retreats",
    tagline: "Elevated. Secluded. Timeless.",
    image: villaHillside,
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

const StaysSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="stays" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -25 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-24 lg:mb-32"
        >
          <p className="luxury-subheading text-primary/60 mb-6">Curated Stays</p>
          <h2 className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] max-w-md">
            Where You Stay
            <br />
            <span className="italic">Matters</span>
          </h2>
        </motion.div>

        {/* Asymmetric editorial layout */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Large featured stay */}
          <SlideInCard x={-25} delay={0} className="lg:col-span-7 group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden border border-border/15">
              <img
                src={stays[0].image}
                alt={stays[0].name}
                className="w-full h-[380px] lg:h-[540px] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="luxury-heading text-[1.4rem] lg:text-[1.7rem] text-foreground mb-2">
                  {stays[0].name}
                </h3>
                <p className="luxury-body text-foreground/30 text-[13px]">
                  {stays[0].tagline}
                </p>
              </div>
            </div>
          </SlideInCard>

          {/* Stacked smaller stays */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            {stays.slice(1).map((stay, i) => (
              <SlideInCard
                key={stay.name}
                x={25}
                delay={i * 0.1}
                className="group cursor-pointer flex-1"
              >
                <div className="relative rounded-2xl overflow-hidden border border-border/15 h-full">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-[220px] lg:h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="luxury-heading text-lg lg:text-[1.35rem] text-foreground mb-1">
                      {stay.name}
                    </h3>
                    <p className="luxury-body text-foreground/30 text-[13px]">
                      {stay.tagline}
                    </p>
                  </div>
                </div>
              </SlideInCard>
            ))}
          </div>
        </div>

        <SlideInCard x={0} delay={0} className="mt-20 lg:mt-24">
          <a href="#begin" className="luxury-btn-outline">
            Discover All Stays
          </a>
        </SlideInCard>
      </div>
    </section>
  );
};

export default StaysSection;
