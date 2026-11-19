export type DisplayCurrency = "BRL" | "USD";

type CurrencyFormatterSet = {
  standard: Intl.NumberFormat;
  compact: Intl.NumberFormat;
};

const currencyFormatters: Record<DisplayCurrency, CurrencyFormatterSet> = {
  BRL: {
    standard: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 8,
    }),
    compact: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 2,
    }),
  },
  USD: {
    standard: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 8,
    }),
    compact: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }),
  },
};

export function formatCurrency(
  valueUsd: number,
  currency: DisplayCurrency,
  usdToBrlRate: number | null,
  compact = false,
): string {
  if (!Number.isFinite(valueUsd)) return "—";

  const exchangeRate = currency === "BRL" ? usdToBrlRate : 1;
  if (exchangeRate === null) return "—";

  const formatter = compact
    ? currencyFormatters[currency].compact
    : currencyFormatters[currency].standard;

  return formatter.format(valueUsd * exchangeRate);
}
