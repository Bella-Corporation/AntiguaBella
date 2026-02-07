import { motion } from "framer-motion";

const ResortFooter = () => {
  return (
    <footer id="begin" className="border-t border-border/15 text-foreground">
      {/* Newsletter / Begin section */}
      <div className="py-28 lg:py-36 px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="luxury-subheading text-primary/70 mb-8">Begin</p>
            <h2 className="luxury-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-[1.2]">
              Ready When <span className="italic">You Are</span>
            </h2>
            <p className="luxury-body text-muted-foreground text-base mb-12 max-w-md mx-auto">
              Leave your details. Our concierge will reach out personally
              to understand your ideal Antigua experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-border/40 rounded-none px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none transition-all duration-300"
              />
              <button className="luxury-btn-outline text-[10px] py-3.5 px-8 whitespace-nowrap">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/10 py-8 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="luxury-heading text-lg">
            Antigua<span className="gold-text">Bella</span>
          </p>

          <p className="luxury-body text-muted-foreground/35 text-xs">
            © 2025 AntiguaBella. All rights reserved.
          </p>

          <div className="flex gap-8">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="luxury-subheading text-[9px] text-muted-foreground/35 hover:text-primary/50 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResortFooter;
