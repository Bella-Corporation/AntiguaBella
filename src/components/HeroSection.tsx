import { motion } from "framer-motion";
import heroImage from "@/assets/hero-beach.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Aerial view of Hermitage Bay luxury resort on pristine Caribbean beach"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="image-overlay" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="luxury-subheading text-primary-foreground/80 mb-6"
        >
          Antigua, West Indies
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="luxury-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight mb-8"
        >
          Where Luxury
          <br />
          Meets Paradise
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="luxury-divider border-primary-foreground/50 mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="luxury-body text-primary-foreground/80 max-w-lg text-lg mb-10"
        >
          An intimate sanctuary nestled on a secluded beach,
          where every moment is crafted for your indulgence.
        </motion.p>

        <motion.a
          href="#suites"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="luxury-btn-primary"
        >
          Explore the Resort
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="luxury-subheading text-[9px] text-primary-foreground/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-primary-foreground/30"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
