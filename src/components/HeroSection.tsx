import { motion } from "framer-motion";
import heroImage from "@/assets/hero-beach.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cinematic aerial view of Antigua's pristine Caribbean coastline at golden hour"
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="image-overlay" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="luxury-subheading text-foreground/50 mb-8 text-xs tracking-[0.4em]"
        >
          Antigua · West Indies
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="luxury-heading text-5xl md:text-7xl lg:text-[6.5rem] text-foreground leading-[1.05] mb-10"
        >
          Live the
          <br />
          <span className="italic">Caribbean Way</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-20 border-t border-primary/60 mb-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="luxury-body text-foreground/60 max-w-md text-lg mb-12"
        >
          An elite concierge experience on Antigua's most exclusive shores.
          Curated luxury, without compromise.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="luxury-btn-bold text-[11px] py-4 px-14"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Now
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="luxury-subheading text-[9px] text-foreground/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-primary/30"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
