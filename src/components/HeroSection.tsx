import { motion } from "framer-motion";
import heroImage from "@/assets/hero-beach.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Antigua's pristine Caribbean coastline at golden hour"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="image-overlay" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center px-6 pb-32 lg:pb-36">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="luxury-subheading text-foreground/35 mb-8 text-[10px] tracking-[0.5em]"
        >
          Private Travel Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="luxury-heading text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.08] mb-10"
        >
          The Caribbean,
          <br />
          <span className="italic">Curated.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-12 border-t border-primary/40 mb-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="luxury-body text-foreground/40 max-w-lg text-base lg:text-lg mb-14"
        >
          Antigua's finest stays, experiences, and services — for travelers
          who value discretion over display.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="luxury-btn-outline text-[10px] py-3.5 px-12"
        >
          Explore Antigua
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-foreground/15"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
