import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, CalendarCheck, Compass, LogIn, UserPlus, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  { labelKey: "account_my_account", icon: User, to: "/account" },
  { labelKey: "account_settings", icon: Settings, to: "/account/settings" },
  { labelKey: "account_my_appointments", icon: CalendarCheck, to: "/account/appointments" },
  { labelKey: "account_my_journey", icon: Compass, to: "/account/journey" },
];

const HeaderAccount = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

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
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <Link
                      key={item.labelKey}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="hero-glow-hover flex items-center gap-3 font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                    >
                      <item.icon size={15} strokeWidth={1.4} />
                      {t(item.labelKey)}
                    </Link>
                  ))}
                  <div className="w-8 border-t border-foreground/10" />
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="hero-glow-hover flex items-center gap-3 font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                  >
                    <LogOut size={15} strokeWidth={1.4} />
                    {t("auth_sign_out")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={`/auth?returnTo=${returnTo}`}
                    onClick={() => setOpen(false)}
                    className="hero-glow-hover flex items-center gap-3 font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                  >
                    <LogIn size={15} strokeWidth={1.4} />
                    {t("auth_login")}
                  </Link>
                  <Link
                    to={`/auth?mode=signup&returnTo=${returnTo}`}
                    onClick={() => setOpen(false)}
                    className="hero-glow-hover flex items-center gap-3 font-aguero text-[13px] tracking-[0.25em] uppercase text-foreground/50 hover:text-foreground/80 transition-colors duration-400"
                  >
                    <UserPlus size={15} strokeWidth={1.4} />
                    {t("auth_sign_up")}
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderAccount;
