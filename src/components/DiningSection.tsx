import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import diningImage from "@/assets/dining-sunset.jpg";

const DiningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dining" className="py-28 lg:py-40 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden">
              <img
                src={diningImage}
                alt="Fine dining on the beach at sunset with candlelit table"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <p className="luxury-subheading mb-6">Culinary</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              A Feast for
              <br />
              Every Sense
            </h2>
            <div className="luxury-divider mx-0 mb-8" />
            <p className="luxury-body text-muted-foreground text-lg mb-6">
              Our culinary journey celebrates the freshest Caribbean ingredients, transformed
              by our acclaimed chefs into extraordinary dining experiences that honor both
              local tradition and global innovation.
            </p>
            <p className="luxury-body text-muted-foreground mb-8">
              From beachside breakfasts to candlelit dinners under the stars, every meal
              is a celebration of flavor, craftsmanship, and the incomparable setting of
              our island sanctuary.
            </p>
            <a href="#contact" className="luxury-btn-outline">
              Discover Dining
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
