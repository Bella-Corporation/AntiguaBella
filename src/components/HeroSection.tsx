import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen cinematic video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/35" />
      </div>

      {/* Single CTA — bottom center */}
      <div className="relative z-10 flex h-full items-end justify-center pb-20 lg:pb-24">
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.8, ease: "easeOut" }}
          className="luxury-btn-outline py-3.5 px-14 text-foreground/50 border-foreground/8 hover:text-primary/80 hover:border-primary/20 transition-all duration-700"
        >
          Explore
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
