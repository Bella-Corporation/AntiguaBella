import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import ResortFooter from "@/components/ResortFooter";

const Terms = () => {
  const { t } = useLanguage();
  usePageMeta({
    title: "Terms of Service — AntiguaBella",
    description:
      "The terms and conditions governing use of AntiguaBella's website and inquiry-led arrangement services.",
  });

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
      <p className="luxury-subheading text-primary/60 mb-4">Legal</p>
      <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
        Terms of <span className="italic">Service</span>
      </h1>
      <div
        className="my-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
      />
      <p className="luxury-body text-muted-foreground/80 text-[15px] leading-[1.75] mb-6">
        {t("terms_intro")}
      </p>
      <Link to="/support" className="luxury-btn-outline inline-block">
        {t("common_contact_support")}
      </Link>
    </main>

    <ResortFooter />
  </div>;
};

export default Terms;
