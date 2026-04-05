import type { ListingCurrency } from "@/types";

export const SUPPORTED_CURRENCIES: ListingCurrency[] = ["USD", "XCD"];

const XCD_PER_USD = 2.7;

export function convertCurrencyAmount(
  amount: number,
  fromCurrency: ListingCurrency,
  toCurrency: ListingCurrency
): number {
  if (fromCurrency === toCurrency) return amount;

  if (fromCurrency === "USD" && toCurrency === "XCD") {
    return amount * XCD_PER_USD;
  }

  return amount / XCD_PER_USD;
}

export function formatCurrencyAmount(
  amount: number,
  currency: ListingCurrency
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatConvertedMoney(
  amount: number,
  baseCurrency: ListingCurrency,
  displayCurrency: ListingCurrency
): string {
  return formatCurrencyAmount(
    convertCurrencyAmount(amount, baseCurrency, displayCurrency),
    displayCurrency
  );
}
