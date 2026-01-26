// Quebec Land Transfer Tax Calculator (Taxe de Bienvenue / Droits de mutation)
// Progressive tax brackets similar to income tax

export type Location = 'montreal' | 'quebec';

export interface TransferTaxBracket {
  min: number;
  max: number;
  rate: number;
}

// Standard Quebec (Provincial Base)
export const QUEBEC_BRACKETS: TransferTaxBracket[] = [
  { min: 0, max: 58900, rate: 0.005 },
  { min: 58900, max: 294600, rate: 0.01 },
  { min: 294600, max: Infinity, rate: 0.015 },
];

// Montreal (Higher rates for luxury properties)
export const MONTREAL_BRACKETS: TransferTaxBracket[] = [
  { min: 0, max: 58900, rate: 0.005 },
  { min: 58900, max: 294600, rate: 0.01 },
  { min: 294600, max: 589200, rate: 0.015 },
  { min: 589200, max: 1178500, rate: 0.02 },
  { min: 1178500, max: 2357000, rate: 0.025 },
  { min: 2357000, max: Infinity, rate: 0.035 },
];

export interface TaxBreakdown {
  bracketLabel: string;
  amount: number;
  rate: number;
}

export interface TransferTaxResult {
  propertyPrice: number;
  location: Location;
  totalTax: number;
  breakdown: TaxBreakdown[];
  effectiveRate: number;
}

function calculateProgressiveTransferTax(
  propertyPrice: number,
  brackets: TransferTaxBracket[]
): { totalTax: number; breakdown: TaxBreakdown[] } {
  let totalTax = 0;
  let remainingPrice = propertyPrice;
  const breakdown: TaxBreakdown[] = [];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    
    if (remainingPrice <= 0) break;

    // Calculate the size of this bracket
    const bracketSize = bracket.max - bracket.min;
    
    // How much of the property price falls in this bracket
    const amountInBracket = Math.min(remainingPrice, bracketSize);
    
    // Calculate tax for this bracket
    const taxForBracket = amountInBracket * bracket.rate;
    totalTax += taxForBracket;

    // Add to breakdown
    breakdown.push({
      bracketLabel: formatBracketLabel(bracket.min, bracket.max),
      amount: taxForBracket,
      rate: bracket.rate,
    });

    // Reduce remaining price
    remainingPrice -= amountInBracket;
  }

  return { totalTax, breakdown };
}

function formatBracketLabel(min: number, max: number): string {
  const minFormatted = formatCurrency(min, false);
  const maxFormatted = max === Infinity ? '+' : formatCurrency(max, false);
  return `${minFormatted} - ${maxFormatted}`;
}

export function calculateTransferTax(
  propertyPrice: number,
  location: Location
): TransferTaxResult {
  const brackets = location === 'montreal' ? MONTREAL_BRACKETS : QUEBEC_BRACKETS;
  const { totalTax, breakdown } = calculateProgressiveTransferTax(propertyPrice, brackets);
  const effectiveRate = (totalTax / propertyPrice) * 100;

  return {
    propertyPrice,
    location,
    totalTax,
    breakdown,
    effectiveRate,
  };
}

export function formatCurrency(amount: number, includeCents: boolean = true): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function getLocationName(location: Location): string {
  return location === 'montreal' ? 'Montréal' : 'Ailleurs au Québec';
}
