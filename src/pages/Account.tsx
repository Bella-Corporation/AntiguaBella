import { Link } from "react-router-dom";
import { ArrowLeft, Settings, CalendarCheck, Compass } from "lucide-react";
import ResortFooter from "@/components/ResortFooter";

const accountLinks = [
  { to: "/account/settings", label: "Account Settings", icon: Settings },
  { to: "/account/appointments", label: "My Appointments", icon: CalendarCheck },
  { to: "/account/journey", label: "My Journey", icon: Compass },
];

const Account = () => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-20 border-b border-border/10 bg-background/95 backdrop-blur py-6 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="luxury-subheading text-[10px] tracking-[0.22em]">Back</span>
        </Link>
        <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
          Antigua<span className="gold-text">Bella</span>
        </Link>
        <Link
          to="/request"
          className="luxury-subheading text-[10px] tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Request
        </Link>
      </div>
    </header>

    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
      <p className="luxury-subheading text-primary/60 mb-4">Account</p>
      <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
        My <span className="italic">Account</span>
      </h1>
      <div
        className="my-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
      />
      <p className="luxury-body text-muted-foreground/80 text-[15px] leading-[1.75] mb-10">
        Manage your profile, reservations, and travel plans. Account features are being prepared and will appear here.
      </p>
      <div className="space-y-3">
        {accountLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 luxury-btn-outline w-full sm:w-auto sm:inline-flex justify-center"
          >
            <Icon size={16} strokeWidth={1.4} />
            {label}
          </Link>
        ))}
      </div>
    </main>

    <ResortFooter />
  </div>
);

export default Account;
