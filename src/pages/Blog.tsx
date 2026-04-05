import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import ResortFooter from "@/components/ResortFooter";

const Blog = () => {
  const { t } = useLanguage();
  usePageMeta({
    title: "Blog & Insights — AntiguaBella",
    description:
      "Stories, guides, and island insights from the AntiguaBella team — Antigua travel, private stays, and curated experiences.",
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
      <p className="luxury-subheading text-primary/60 mb-4">Stories</p>
      <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
        Blog & <span className="italic">Insights</span>
      </h1>
      <div
        className="my-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
      />
      <p className="luxury-body text-muted-foreground/80 text-[15px] leading-[1.75] mb-8">
        {t("blog_intro")}
      </p>
      <Link to="/" className="luxury-btn-outline inline-block">
        {t("common_return_home")}
      </Link>
    </main>

    <ResortFooter />
  </div>;
};

export default Blog;
