import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Stays", "Experiences", "Concierge"];

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
          ? "bg-background/95 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#" className="luxury-heading text-xl lg:text-[1.4rem] tracking-wide">
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </a>

        {/* Desktop Nav — minimal, restrained */}
        <nav className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="luxury-subheading text-[10px] tracking-[0.22em] text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Sign In — private platform access, not a CTA */}
        <a
          href="#begin"
          className="hidden xl:inline-block luxury-subheading text-[10px] tracking-[0.2em] text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
        >
          Sign In
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px transition-all duration-300 bg-foreground/40 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px transition-all duration-300 bg-foreground/40 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-background/98 backdrop-blur-lg border-t border-border/10"
          >
            <nav className="flex flex-col items-center gap-8 py-14">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="luxury-subheading text-foreground/35 hover:text-foreground/60 transition-colors duration-500"
                >
                  {link}
                </a>
              ))}
              <a
                href="#begin"
                className="luxury-subheading text-[10px] text-foreground/35 hover:text-foreground/60 transition-colors duration-500 mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ResortNavbar;
