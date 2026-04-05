import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  usePageMeta({
    title: "Page Not Found — AntiguaBella",
    description:
      "The page you're looking for doesn't exist. Return to AntiguaBella to browse private stays, experiences, and charters in Antigua.",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("not_found_heading")}</p>
        <p className="mb-4 text-sm text-muted-foreground/80">{t("not_found_copy")}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {t("common_return_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
