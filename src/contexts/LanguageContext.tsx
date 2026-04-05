import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  SUPPORTED_LANGUAGES,
  translate,
  type AppLanguage,
  type TranslationKey,
} from "@/lib/translations";

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  supportedLanguages: AppLanguage[];
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const STORAGE_KEY = "antiguabella.language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    if (typeof window === "undefined") return "en";

    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "es" || stored === "fr" ? stored : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t: (key: TranslationKey, params?: Record<string, string | number>) =>
        translate(language, key, params),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
