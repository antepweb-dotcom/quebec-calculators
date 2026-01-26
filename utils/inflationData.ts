// Bank of Canada CPI (Consumer Price Index) Data
// Simplified yearly average CPI from 1980 to 2025

export interface CPIData {
  [year: number]: number;
}

// CPI Data (Base 2002 = 100)
// Source: Bank of Canada / Statistics Canada
export const CPI_DATA: CPIData = {
  1980: 38.4,
  1981: 42.6,
  1982: 47.0,
  1983: 49.8,
  1984: 52.1,
  1985: 54.6,
  1986: 56.9,
  1987: 59.2,
  1988: 61.6,
  1989: 64.9,
  1990: 68.5,
  1991: 72.9,
  1992: 74.9,
  1993: 76.6,
  1994: 77.0,
  1995: 79.0,
  1996: 80.5,
  1997: 82.0,
  1998: 83.1,
  1999: 84.6,
  2000: 87.9,
  2001: 90.3,
  2002: 92.9,
  2003: 95.3,
  2004: 97.3,
  2005: 100.0,
  2006: 102.0,
  2007: 104.7,
  2008: 107.0,
  2009: 107.2,
  2010: 109.4,
  2011: 112.9,
  2012: 115.2,
  2013: 116.5,
  2014: 118.6,
  2015: 119.9,
  2016: 121.7,
  2017: 124.4,
  2018: 127.7,
  2019: 130.4,
  2020: 131.6,
  2021: 135.6,
  2022: 144.1,
  2023: 151.2,
  2024: 155.8,
  2025: 159.5,
  2026: 163.0, // Projected ~2.2% inflation
  2027: 166.5, // Projected ~2.1% inflation
  2028: 170.0, // Projected ~2.1% inflation
  2029: 173.5, // Projected ~2.1% inflation
  2030: 177.0, // Projected ~2.0% inflation
};

export const AVAILABLE_YEARS = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
export const MIN_YEAR = Math.min(...AVAILABLE_YEARS);
export const MAX_YEAR = Math.max(...AVAILABLE_YEARS);

export interface InflationResult {
  amount: number;
  startYear: number;
  endYear: number;
  startCPI: number;
  endCPI: number;
  adjustedAmount: number;
  percentageChange: number;
  yearsDifference: number;
}

export function calculateInflation(
  amount: number,
  startYear: number,
  endYear: number
): InflationResult {
  const startCPI = CPI_DATA[startYear];
  const endCPI = CPI_DATA[endYear];
  
  if (!startCPI || !endCPI) {
    throw new Error('Invalid year selected');
  }
  
  // Calculate adjusted amount
  const adjustedAmount = amount * (endCPI / startCPI);
  
  // Calculate percentage change
  const percentageChange = ((endCPI - startCPI) / startCPI) * 100;
  
  const yearsDifference = endYear - startYear;
  
  return {
    amount,
    startYear,
    endYear,
    startCPI,
    endCPI,
    adjustedAmount,
    percentageChange,
    yearsDifference,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
