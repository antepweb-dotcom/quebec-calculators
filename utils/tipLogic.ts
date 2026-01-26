export interface TipCalculationResult {
  billAmount: number
  calculateBeforeTax: boolean
  tipPercentage: number
  subtotal: number
  taxes: number
  tipAmount: number
  total: number
  savingsVsAfterTax: number
}

const QUEBEC_TAX_RATE = 0.14975 // TPS (5%) + TVQ (9.975%) = 14.975%

export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  calculateBeforeTax: boolean
): TipCalculationResult {
  let subtotal: number
  let taxes: number
  let tipAmount: number
  let total: number
  let savingsVsAfterTax: number

  if (calculateBeforeTax) {
    // User entered the subtotal (before tax)
    subtotal = billAmount
    taxes = subtotal * QUEBEC_TAX_RATE
    tipAmount = subtotal * (tipPercentage / 100)
    total = subtotal + taxes + tipAmount

    // Calculate savings vs tipping after tax
    const tipIfAfterTax = (subtotal + taxes) * (tipPercentage / 100)
    savingsVsAfterTax = tipIfAfterTax - tipAmount
  } else {
    // User entered the total (after tax)
    total = billAmount
    subtotal = total / (1 + QUEBEC_TAX_RATE)
    taxes = subtotal * QUEBEC_TAX_RATE
    tipAmount = total * (tipPercentage / 100)
    total = total + tipAmount

    // Calculate what they would have saved if tipping before tax
    const tipIfBeforeTax = subtotal * (tipPercentage / 100)
    savingsVsAfterTax = tipAmount - tipIfBeforeTax
  }

  return {
    billAmount,
    calculateBeforeTax,
    tipPercentage,
    subtotal,
    taxes,
    tipAmount,
    total,
    savingsVsAfterTax
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}
