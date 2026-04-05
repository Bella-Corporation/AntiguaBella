import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import ResortFooter from "@/components/ResortFooter";

const Sitemap = () => {
  const { t } = useLanguage();
  usePageMeta({
    title: "Site Map — AntiguaBella",
    description:
      "A complete index of all AntiguaBella pages — stays, experiences, charters, concierge, and more.",
  });
  const routes = [
    { path: "/", label: t("common_home") },
    { path: "/stays", label: t("nav_stays") },
    { path: "/experiences", label: t("nav_experiences") },
    { path: "/charters", label: t("nav_charters") },
    { path: "/concierge", label: t("nav_concierge") },
    { path: "/request", label: t("common_request") },
    { path: "/support", label: t("common_contact_support") },
    { path: "/blog", label: t("common_blog") },
    { path: "/privacy", label: t("common_privacy_policy") },
    { path: "/terms", label: t("common_terms_of_service") },
  ];

  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-20 border-b border-border/10 bg-background/95 backdrop-blur py-6 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
        </Link>
        <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
          Antigua<span className="gold-text">Bella</span>
        </Link>
        <Link
          to="/request"
          className="luxury-subheading text-[10px] tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          {t("common_request")}
        </Link>
      </div>
    </header>

    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
      <p className="luxury-subheading text-primary/60 mb-4">Navigate</p>
      <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
        Site <span className="italic">Map</span>
      </h1>
      <div
        className="my-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
      />
      <ul className="space-y-3">
        {routes.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className="luxury-body text-muted-foreground/80 hover:text-primary text-[15px] transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-primary/50 text-[10px] tracking-widest">{path}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>

    <ResortFooter />
  </div>;
};

export default Sitemap;
