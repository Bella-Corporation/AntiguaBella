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

      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center px-6 pb-40 lg:pb-48">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="luxury-heading text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] text-foreground leading-[1.05] mb-14"
        >
          The Caribbean,
          <br />
          <span className="italic">Curated.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="w-10 border-t border-primary/30 mb-14"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="luxury-body text-foreground/30 max-w-sm text-[15px] mb-20"
        >
          Antigua's finest — for travelers who value discretion.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="luxury-btn-outline py-3.5 px-12"
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
          className="w-px h-8 bg-foreground/10"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
