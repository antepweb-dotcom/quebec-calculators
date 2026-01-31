/**
 * Common formatting utilities used across the application
 * Centralized to avoid code duplication
 */

/**
 * Format a number as Canadian currency (CAD)
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string (e.g., "1 234,56 $")
 */
export function formatCurrency(
  amount: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0
  } = options

  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount)
}

/**
 * Format a number as a percentage
 * @param value - The value to format (as decimal, e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string (e.g., "15.0%")
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format a rate as a percentage (converts decimal to percentage)
 * @param rate - The rate as decimal (e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., "15.00%")
 */
export function formatRate(rate: number, decimals: number = 2): string {
  return `${(rate * 100).toFixed(decimals)}%`
}
