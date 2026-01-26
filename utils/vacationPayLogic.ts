export interface VacationPayResult {
  annualSalary: number
  yearsOfService: number
  percentage: number
  vacationPay: number
  alternativePercentage: number
  alternativeVacationPay: number
  difference: number
}

export function calculateVacationPay(
  annualSalary: number,
  yearsOfService: number
): VacationPayResult {
  // Quebec vacation pay rules: 4% for < 3 years, 6% for >= 3 years
  const percentage = yearsOfService >= 3 ? 6 : 4
  const vacationPay = annualSalary * (percentage / 100)
  
  // Calculate alternative scenario
  const alternativePercentage = percentage === 4 ? 6 : 4
  const alternativeVacationPay = annualSalary * (alternativePercentage / 100)
  const difference = Math.abs(vacationPay - alternativeVacationPay)

  return {
    annualSalary,
    yearsOfService,
    percentage,
    vacationPay,
    alternativePercentage,
    alternativeVacationPay,
    difference
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
