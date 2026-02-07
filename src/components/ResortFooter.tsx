import { motion } from "framer-motion";

const ResortFooter = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-24 lg:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="luxury-heading text-3xl lg:text-4xl mb-6">
              Hermitage Bay
            </h3>
            <p className="luxury-body text-background/60 text-sm leading-loose">
              An award-winning all-inclusive boutique resort on Antigua's unspoiled west coast.
              Where Caribbean luxury finds its purest expression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="luxury-subheading text-background/40 mb-6">Contact</p>
            <div className="space-y-3 luxury-body text-background/70 text-sm">
              <p>Hermitage Bay, St. Mary's</p>
              <p>Antigua, West Indies</p>
              <p className="pt-2">+1 (268) 562-5500</p>
              <p>reservations@hermitagebay.com</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="luxury-subheading text-background/40 mb-6">Newsletter</p>
            <p className="luxury-body text-background/60 text-sm mb-6">
              Receive exclusive offers and island inspiration.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-background/20 pb-3 text-sm text-background placeholder:text-background/30 focus:border-background/60 focus:outline-none transition-colors"
              />
              <button className="luxury-subheading text-[10px] text-background/60 hover:text-background ml-4 pb-3 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-background/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="luxury-body text-background/30 text-xs">
            © 2025 Hermitage Bay. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="luxury-subheading text-[10px] text-background/30 hover:text-background/60 transition-colors"
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
