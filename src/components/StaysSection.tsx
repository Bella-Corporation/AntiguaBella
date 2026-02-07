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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-20 lg:mb-28"
        >
          <p className="luxury-subheading text-primary/70 mb-8">Curated Stays</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.15] max-w-xl">
            Where You Stay
            <br />
            <span className="italic">Matters</span>
          </h2>
        </motion.div>

        {/* Asymmetric editorial layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Large featured stay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/20">
              <img
                src={stays[0].image}
                alt={stays[0].name}
                className="w-full h-[400px] lg:h-[560px] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="luxury-heading text-2xl lg:text-3xl text-foreground mb-2">
                  {stays[0].name}
                </h3>
                <p className="luxury-body text-foreground/40 text-sm">
                  {stays[0].tagline}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stacked smaller stays */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {stays.slice(1).map((stay, i) => (
              <motion.div
                key={stay.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                className="group cursor-pointer flex-1"
              >
                <div className="relative rounded-2xl overflow-hidden border border-border/20 h-full">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-[240px] lg:h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="luxury-heading text-xl lg:text-2xl text-foreground mb-1">
                      {stay.name}
                    </h3>
                    <p className="luxury-body text-foreground/40 text-sm">
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
          className="mt-16 lg:mt-20"
        >
          <a href="#begin" className="luxury-btn-outline text-[10px]">
            Discover All Stays
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StaysSection;
