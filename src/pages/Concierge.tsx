import { Link } from "react-router-dom";
import { ArrowLeft, Plane, ChefHat, Sparkles, MapPinned, PartyPopper, CarFront } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import ResortFooter from "@/components/ResortFooter";
import heroBeach from "@/assets/hero-beach.jpg";

const conciergeServices = [
  {
    title: "Airport Transfer",
    detail: "Arrival transfer planning, private-driver coordination, and residence handoff details in one request.",
    icon: Plane,
  },
  {
    title: "Private Chef",
    detail: "Chef introductions, menu planning, and dining coordination shaped around your preferences.",
    icon: ChefHat,
  },
  {
    title: "Wellness & Spa Coordination",
    detail: "Wellness scheduling and therapist coordination aligned to your stay and pace.",
    icon: Sparkles,
  },
  {
    title: "Custom Itineraries",
    detail: "Help combining stays, experiences, charters, and timing into one clear request.",
    icon: MapPinned,
  },
  {
    title: "Celebration Planning",
    detail: "Support for milestone stays, private dining, and discreet special-request coordination.",
    icon: PartyPopper,
  },
  {
    title: "Local Transport Coordination",
    detail: "Driver and transport coordination when your plans extend beyond a single stay or activity.",
    icon: CarFront,
  },
];

const steps = [
  {
    label: "1. Share Your Intent",
    copy: "Tell us what you are considering, along with dates, priorities, or combinations you would like help shaping.",
  },
  {
    label: "2. Concierge Review",
    copy: "AntiguaBella reviews the request and identifies the right stay, experience, charter, or mix of options.",
  },
  {
    label: "3. Personal Follow-Up",
    copy: "We follow up manually with fit, timing, and next steps.",
  },
];

const curatedPackages = [
  {
    title: "Island Escape",
    tagline: "Stays, charters, and dining woven into a seamless week.",
  },
  {
    title: "Romantic Retreat",
    tagline: "Intimate villas, private dinners, and in-villa wellness.",
  },
  {
    title: "Family & Friends",
    tagline: "Multi-villa arrangements, curated activities, and celebration planning.",
  },
];

const capabilityCategories = [
  { title: "Transport & Transfer", description: "From runway to residence" },
  { title: "Dining & Chef", description: "In-villa and island-wide" },
  { title: "Wellness & Spa", description: "Therapists and restorative experiences" },
  { title: "Experiences & Charters", description: "Water, land, and curated moments" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Concierge = () => {
  useScrollReveal();
  const { t } = useLanguage();
  usePageMeta({
    title: "Concierge — AntiguaBella",
    description:
      "Personal concierge services including airport transfers, private chef, wellness coordination, and custom itinerary planning. All enquiry-led.",
    canonicalPath: "/concierge",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[62vh] md:h-[70vh] overflow-hidden">
        <img
          src={heroBeach}
          alt="AntiguaBella concierge service"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsla(0,0%,0%,0.5) 0%, hsla(0,0%,0%,0.25) 50%, hsla(0,0%,0%,0.7) 100%)",
          }}
        />

        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 z-20 py-6 md:py-8 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
            </Link>
            <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
              Antigua<span className="gold-text">Bella</span>
            </Link>
            <Link
              to="/request"
              className="luxury-subheading text-[10px] tracking-[0.22em] text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              {t("common_request_with_concierge")}
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-14 md:pb-16 px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="luxury-subheading text-primary mb-4"
          >
            Concierge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            Custom Planning, <span className="italic">Designed Around You</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="luxury-divider mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="luxury-body text-foreground/50 max-w-xl text-sm md:text-base"
          >
            Use Concierge when browsing a single stay, experience, or charter is not enough and you want AntiguaBella to help shape the right request.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="luxury-subheading text-primary/60 mb-4">Concierge Services</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              Support Beyond <span className="italic">Browsing</span>
            </h2>
            <div className="luxury-divider mb-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conciergeServices.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="rounded-2xl border border-border/40 bg-card p-6 lg:p-7"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center mb-5">
                  <service.icon className="w-5 h-5 text-primary/70" strokeWidth={1.4} />
                </div>
                <h3 className="luxury-heading text-xl text-foreground mb-3">{service.title}</h3>
                <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7]">{service.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Packages Preview */}
      <section className="py-20 md:py-24 bg-card/30 border-y border-border/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="luxury-subheading text-primary/60 mb-4">Planning Paths</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              When Browsing Is <span className="italic">Not Enough</span>
            </h2>
            <div className="luxury-divider mb-6" />
            <p className="luxury-body text-muted-foreground/60 text-sm max-w-xl mx-auto">
              Use Concierge when your stay, time on the water, dining, or celebrations need to be shaped together in one request.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {curatedPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="rounded-2xl border border-border/40 bg-card p-6 lg:p-7"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="luxury-heading text-xl text-foreground mb-3">{pkg.title}</h3>
                <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7]">{pkg.tagline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Categories */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="luxury-subheading text-primary/60 mb-4">By Category</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              What Concierge Can <span className="italic">Coordinate</span>
            </h2>
            <div className="luxury-divider mb-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilityCategories.map((cap, i) => (
              <motion.div
                key={cap.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="rounded-xl border border-border/30 bg-card/50 px-5 py-4"
              >
                <h3 className="luxury-heading text-base text-foreground mb-1">{cap.title}</h3>
                <p className="luxury-body text-muted-foreground/50 text-[12px]">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div
            className="rounded-2xl border border-border/40 bg-card p-8 lg:p-10"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p className="luxury-subheading text-primary/60 mb-4">How it Works</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
              From Inquiry to <span className="italic">Follow-Up</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                >
                  <p className="luxury-subheading text-primary/70 mb-3">{step.label}</p>
                  <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7]">{step.copy}</p>
                </motion.div>
              ))}
            </div>

            <div
              className="my-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/request" className="luxury-btn-bold text-center sm:min-w-[220px]">
                {t("common_request_with_concierge")}
              </Link>
              <Link to="/charters" className="luxury-btn-outline text-center sm:min-w-[220px]">
                {t("common_explore_charters")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ResortFooter />
    </div>
  );
};

export default Concierge;

