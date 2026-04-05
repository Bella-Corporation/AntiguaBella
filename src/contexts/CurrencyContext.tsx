import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { ListingCurrency } from "@/types";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";

interface CurrencyContextValue {
  currency: ListingCurrency;
  setCurrency: (currency: ListingCurrency) => void;
  supportedCurrencies: ListingCurrency[];
}

const STORAGE_KEY = "antiguabella.currency";

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currency, setCurrency] = useState<ListingCurrency>(() => {
    if (typeof window === "undefined") return "USD";

    const storedCurrency = window.localStorage.getItem(STORAGE_KEY);
    return storedCurrency === "XCD" ? "XCD" : "USD";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      supportedCurrencies: SUPPORTED_CURRENCIES,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }

  return context;
};
