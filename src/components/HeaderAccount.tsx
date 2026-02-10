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
        className="hero-glow-hover text-foreground/50 transition-all duration-300 hover:scale-110"
        aria-label="Account menu"
      >
        <User size={18} strokeWidth={1.4} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-lg py-1.5"
            style={{
              background: "hsl(0 0% 6%)",
              border: "1px solid hsl(var(--primary) / 0.18)",
              boxShadow:
                "0 12px 40px -12px hsl(0 0% 0% / 0.8), 0 0 0 1px hsl(var(--primary) / 0.06)",
            }}
          >
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-primary/[0.05]"
                  style={{
                    borderBottom:
                      i < menuItems.length - 1
                        ? "1px solid hsl(var(--primary) / 0.06)"
                        : "none",
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.4}
                    className="shrink-0 text-primary/50"
                  />
                  <span className="text-[12px] font-light tracking-[0.06em] text-foreground/60">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderAccount;
