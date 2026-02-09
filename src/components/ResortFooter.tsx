import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "X / Twitter" },
];

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

      {/* Brand info, contact & social */}
      <div className="border-t border-border/8 py-20 lg:py-28 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
          {/* Brand description */}
          <div>
            <p className="luxury-heading text-lg mb-4">
              Antigua<span className="gold-text">Bella</span>
            </p>
            <p className="luxury-body text-muted-foreground text-[13px] mb-2">
              An elite luxury experiences platform on Antigua's most exclusive shores.
            </p>
            <p className="luxury-body text-muted-foreground/50 text-[12px]">
              Where Caribbean luxury finds its finest expression.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="luxury-subheading text-primary/50 mb-6">Contact</p>
            <div className="luxury-body text-muted-foreground text-[13px] space-y-1.5">
              <p>AntiguaBella, St. Mary's</p>
              <p>Antigua, West Indies</p>
              <a
                href="tel:+12685625500"
                className="block hover:text-primary/70 transition-colors duration-300"
              >
                +1 (268) 562-5500
              </a>
              <a
                href="mailto:concierge@antiguabella.com"
                className="block hover:text-primary/70 transition-colors duration-300"
              >
                concierge@antiguabella.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="luxury-subheading text-primary/50 mb-6">Follow</p>
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-muted-foreground/30 hover:text-primary transition-colors duration-400"
                >
                  <social.icon size={18} strokeWidth={1.3} />
                </a>
              ))}
            </div>
          </div>
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
