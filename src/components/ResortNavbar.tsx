import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["About", "Villas", "Dining", "Offers", "Wellbeing", "Weddings", "Experiences"];

const ResortNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[var(--shadow-soft)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#" className="luxury-heading text-2xl lg:text-3xl">
          <span className={`transition-colors duration-500 ${scrolled ? "text-foreground" : "text-foreground"}`}>
            Antigua<span className="gold-text">Bella</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`luxury-subheading text-[10px] tracking-[0.2em] transition-all duration-300 hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-primary/50 after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-foreground/70"
                  : "text-foreground/60"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Bold gold CTA button */}
        <a
          href="#contact"
          className="hidden xl:inline-block luxury-btn-bold text-[10px] py-3 px-8"
        >
          Book a Room
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 bg-foreground ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px transition-all duration-300 bg-foreground ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-background/98 backdrop-blur-lg border-t border-border/30"
          >
            <nav className="flex flex-col items-center gap-6 py-10">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="luxury-subheading text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                className="luxury-btn-bold text-[10px] py-3 px-8 mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Book a Room
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ResortNavbar;
