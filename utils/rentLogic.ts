// Quebec Rent Increase Calculator Logic (TAL - Tribunal administratif du logement)
// Simplified 2026 factors for MVP

export type HeatingType = 'none' | 'electricity' | 'gas' | 'oil';

export interface RentIncreaseInputs {
  currentRent: number;
  isHeatedByLandlord: boolean;
  heatingType: HeatingType;
  municipalTaxIncrease: number;
  schoolTaxIncrease: number;
  insuranceIncrease: number;
  majorRenovations: number;
  maintenanceIncrease: number;
}

export interface RentIncreaseResult {
  currentRent: number;
  baseIndexIncrease: number;
  heatingAdjustment: number;
  municipalTaxIncrease: number;
  schoolTaxIncrease: number;
  insuranceIncrease: number;
  renovationIncrease: number;
  maintenanceIncrease: number;
  totalIncrease: number;
  newRent: number;
  percentageIncrease: number;
}

// Simplified TAL factors for 2026 (approximation)
const BASE_INDEX_RATE = 0.04; // 4% base increase for unheated units
const HEATING_ADJUSTMENT_RATES = {
  none: 0,
  electricity: 0.015, // 1.5% additional for electric heating
  gas: 0.012, // 1.2% additional for gas heating
  oil: 0.018, // 1.8% additional for oil heating
};

const RENOVATION_AMORTIZATION_RATE = 0.048; // 4.8% of renovation cost per year
const MONTHS_PER_YEAR = 12;

export function calculateRentIncrease(inputs: RentIncreaseInputs): RentIncreaseResult {
  const {
    currentRent,
    isHeatedByLandlord,
    heatingType,
    municipalTaxIncrease,
    schoolTaxIncrease,
    insuranceIncrease,
    majorRenovations,
    maintenanceIncrease,
  } = inputs;

  // Base index increase (4% of current rent if unheated)
  let baseIndexIncrease = currentRent * BASE_INDEX_RATE;

  // Heating adjustment (additional percentage if heated by landlord)
  let heatingAdjustment = 0;
  if (isHeatedByLandlord && heatingType !== 'none') {
    heatingAdjustment = currentRent * HEATING_ADJUSTMENT_RATES[heatingType];
  }

  // Tax increases (100% passed to tenant, divided by 12 for monthly)
  const monthlyMunicipalTax = municipalTaxIncrease / MONTHS_PER_YEAR;
  const monthlySchoolTax = schoolTaxIncrease / MONTHS_PER_YEAR;

  // Insurance and maintenance (100% passed to tenant, divided by 12)
  const monthlyInsurance = insuranceIncrease / MONTHS_PER_YEAR;
  const monthlyMaintenance = maintenanceIncrease / MONTHS_PER_YEAR;

  // Major renovations (4.8% of cost per year, divided by 12 for monthly)
  const renovationIncrease = (majorRenovations * RENOVATION_AMORTIZATION_RATE) / MONTHS_PER_YEAR;

  // Total monthly increase
  const totalIncrease =
    baseIndexIncrease +
    heatingAdjustment +
    monthlyMunicipalTax +
    monthlySchoolTax +
    monthlyInsurance +
    monthlyMaintenance +
    renovationIncrease;

  const newRent = currentRent + totalIncrease;
  const percentageIncrease = (totalIncrease / currentRent) * 100;

  return {
    currentRent,
    baseIndexIncrease,
    heatingAdjustment,
    municipalTaxIncrease: monthlyMunicipalTax,
    schoolTaxIncrease: monthlySchoolTax,
    insuranceIncrease: monthlyInsurance,
    renovationIncrease,
    maintenanceIncrease: monthlyMaintenance,
    totalIncrease,
    newRent,
    percentageIncrease,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
