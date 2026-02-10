import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, CalendarCheck, Compass } from "lucide-react";

const menuItems = [
  { label: "My Account", icon: User },
  { label: "Account Settings", icon: Settings },
  { label: "My Appointments", icon: CalendarCheck },
  { label: "My Journeys", icon: Compass },
];

const HeaderAccount = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hero-glow-hover flex items-center justify-center h-11 w-11 md:h-8 md:w-8 text-foreground/50 transition-all duration-300 hover:scale-110"
        aria-label="Account menu"
      >
        <User size={18} strokeWidth={1.4} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 bg-background/30 backdrop-blur-xl overflow-hidden z-[-1]"
          >
            <nav className="flex flex-col items-center gap-6 py-12 pt-24">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className="hero-glow-hover font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderAccount;
