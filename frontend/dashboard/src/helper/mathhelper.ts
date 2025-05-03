export default function formatCurrencyWithComma(amount: number): string {
  return amount.toLocaleString("en-US") + " VND";
}
