import { motion } from "framer-motion";

const ResortFooter = () => {
  return (
    <footer id="begin" className="border-t border-border/10 text-foreground">
      {/* Newsletter / Begin section */}
      <div className="py-36 lg:py-48 px-6 lg:px-12">
        <div className="mx-auto max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="luxury-subheading text-primary/60 mb-6">Begin</p>
            <h2 className="luxury-heading text-[1.7rem] md:text-[2.2rem] lg:text-[2.5rem] text-foreground mb-10 leading-[1.2]">
              Ready When <span className="italic">You Are</span>
            </h2>
            <p className="luxury-body text-muted-foreground mb-14 max-w-sm mx-auto">
              Leave your details. Our concierge will reach out personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-border/30 rounded-none px-5 py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/35 focus:border-primary/25 focus:outline-none transition-all duration-300"
              />
              <button className="luxury-btn-outline py-3.5 px-8 whitespace-nowrap">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/8 py-8 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="luxury-heading text-base tracking-normal">
            Antigua<span className="gold-text">Bella</span>
          </p>

          <p className="luxury-body text-muted-foreground/30 text-[11px]">
            © 2025 AntiguaBella
          </p>

          <div className="flex gap-8">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="luxury-subheading text-[9px] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300"
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
