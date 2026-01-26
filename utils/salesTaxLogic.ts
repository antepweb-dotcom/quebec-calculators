// Quebec Sales Tax Calculator (TPS/TVQ)
// Supports both adding taxes and reverse calculation (extracting taxes)

export const TPS_RATE = 0.05; // 5% GST (Federal)
export const TVQ_RATE = 0.09975; // 9.975% QST (Quebec)
export const TOTAL_TAX_RATE = TPS_RATE + TVQ_RATE; // 14.975%

export type CalculationMode = 'add' | 'reverse';

export interface SalesTaxResult {
  mode: CalculationMode;
  amountBeforeTax: number;
  tpsAmount: number;
  tvqAmount: number;
  totalAmount: number;
}

/**
 * Add taxes to a base amount
 */
export function addTaxes(amountBeforeTax: number): SalesTaxResult {
  const tpsAmount = amountBeforeTax * TPS_RATE;
  const tvqAmount = amountBeforeTax * TVQ_RATE;
  const totalAmount = amountBeforeTax + tpsAmount + tvqAmount;

  return {
    mode: 'add',
    amountBeforeTax,
    tpsAmount,
    tvqAmount,
    totalAmount,
  };
}

/**
 * Extract taxes from a total amount (reverse calculation)
 */
export function extractTaxes(totalAmount: number): SalesTaxResult {
  // Formula: amountBeforeTax = totalAmount / (1 + totalTaxRate)
  const amountBeforeTax = totalAmount / (1 + TOTAL_TAX_RATE);
  const tpsAmount = amountBeforeTax * TPS_RATE;
  const tvqAmount = amountBeforeTax * TVQ_RATE;

  return {
    mode: 'reverse',
    amountBeforeTax,
    tpsAmount,
    tvqAmount,
    totalAmount,
  };
}

export function calculateSalesTax(
  amount: number,
  mode: CalculationMode
): SalesTaxResult {
  return mode === 'add' ? addTaxes(amount) : extractTaxes(amount);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(3)}%`;
}
