const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

export function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}
