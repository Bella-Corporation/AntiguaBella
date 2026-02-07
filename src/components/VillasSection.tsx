import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import villaBeachfront from "@/assets/villa-beachfront.jpg";
import villaBeachPool from "@/assets/villa-beach-pool.jpg";
import villaHillside from "@/assets/villa-hillside.jpg";

const villas = [
  {
    name: "Beachfront Villas",
    description:
      "Steps from the shore with uninterrupted sea views and private terraces opening directly onto pristine white sand.",
    image: villaBeachfront,
  },
  {
    name: "Beach Pool Villas",
    description:
      "Oceanfront living with your own private plunge pool, a seamless blend of indoor-outdoor Caribbean luxury.",
    image: villaBeachPool,
  },
  {
    name: "Hillside Garden Pool Villas",
    description:
      "Nestled among lush tropical gardens with panoramic ocean vistas, private pools, and enchanting natural surroundings.",
    image: villaHillside,
  },
];

const VillasSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="villas" className="py-28 lg:py-40 bg-secondary/50 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="luxury-subheading mb-6">Accommodations</p>
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Your Private Sanctuary
          </h2>
          <div className="luxury-divider mb-8" />
          <p className="luxury-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Each villa is thoughtfully designed to harmonize with the natural beauty
            of the island, offering an unparalleled sense of place and privacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {villas.map((villa, i) => (
            <motion.div
              key={villa.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={villa.image}
                  alt={`${villa.name} at Hermitage Bay resort`}
                  className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <h3 className="luxury-heading text-2xl lg:text-3xl text-foreground mb-3">
                {villa.name}
              </h3>
              <p className="luxury-body text-muted-foreground text-sm leading-relaxed">
                {villa.description}
              </p>
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
            View All Villas
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VillasSection;
