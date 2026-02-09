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

const StaysSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stays" className="section-padding">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 group cursor-pointer"
          >
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
          </motion.div>

          {/* Stacked smaller stays */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            {stays.slice(1).map((stay, i) => (
              <motion.div
                key={stay.name}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.15 }}
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
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 lg:mt-24"
        >
          <a href="#begin" className="luxury-btn-outline">
            Discover All Stays
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StaysSection;
