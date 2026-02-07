import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import diningImage from "@/assets/dining-sunset.jpg";

const DiningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dining" className="py-28 lg:py-40 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image on left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="overflow-hidden">
              <img
                src={diningImage}
                alt="Fine dining on the beach at sunset with candlelit table"
                className="w-full h-[450px] lg:h-[600px] object-cover"
              />
            </div>
          </motion.div>

          {/* Text on right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <p className="luxury-subheading mb-6">Dining & Drinks</p>
            <h2 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
              A Feast for
              <br />
              Every Sense
            </h2>
            <div className="luxury-divider mx-0 mb-8" />
            <p className="luxury-body text-muted-foreground text-lg mb-6">
              Our culinary journey celebrates the freshest Caribbean ingredients,
              transformed by our acclaimed chefs into extraordinary dining experiences
              that honor both local tradition and global innovation.
            </p>
            <p className="luxury-body text-muted-foreground mb-4">
              From beachside breakfasts with freshly-caught lobster to candlelit
              dinners under the stars featuring island-grown produce, every meal
              is a celebration of Antiguan flavors and craftsmanship.
            </p>
            <ul className="space-y-2 mb-8">
              {["Farm-to-table organic ingredients", "Caribbean rum & cocktail bar", "Private beach dining experiences"].map((item) => (
                <li key={item} className="luxury-body text-muted-foreground text-sm flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="luxury-btn-outline">
              Explore Menus
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
