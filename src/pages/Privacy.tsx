import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import ResortFooter from "@/components/ResortFooter";

const Privacy = () => {
  const { t } = useLanguage();
  usePageMeta({
    title: "Privacy Policy — AntiguaBella",
    description:
      "How AntiguaBella collects, uses, and protects your personal information and inquiry data.",
  });

  return <div className="min-h-screen bg-background text-foreground">
    <header className="site-bar">
      <div className="site-bar-inner">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
        </Link>
        <Link to="/" className="site-bar-logo">
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

    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-24">
      <p className="luxury-subheading text-primary/60 mb-4">Legal</p>
      <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
        Privacy <span className="italic">Policy</span>
      </h1>
      <div
        className="my-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
      />
      <p className="luxury-body text-muted-foreground/80 text-[15px] leading-[1.75] mb-6">
        {t("privacy_intro")}
      </p>
      <Link to="/support" className="luxury-btn-outline inline-block">
        {t("common_contact_support")}
      </Link>
    </main>

    <ResortFooter />
  </div>;
};

export default Privacy;
