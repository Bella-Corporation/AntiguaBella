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

      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center px-6 pb-36 lg:pb-44">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="luxury-heading text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.08] mb-12"
        >
          The Caribbean,
          <br />
          <span className="italic">Curated.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="w-12 border-t border-primary/40 mb-12"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="luxury-body text-foreground/35 max-w-sm text-base mb-16"
        >
          Antigua's finest — for travelers who value discretion.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="luxury-btn-outline text-[10px] py-3.5 px-12"
        >
          Explore
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
