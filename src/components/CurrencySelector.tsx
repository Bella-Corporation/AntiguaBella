import { useCurrency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full border border-border/40 bg-background/85 p-1 backdrop-blur-md">
      <div className="flex items-center gap-1">
        {supportedCurrencies.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setCurrency(option)}
            className={`min-w-[56px] rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              option === currency
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={option === currency}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;
