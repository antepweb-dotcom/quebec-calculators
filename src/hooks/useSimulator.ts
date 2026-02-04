/**
 * useSimulator Hook
 * Custom hook for Quebec Life Simulator calculations
 */

import { useMemo } from 'react';
import { calculateQuebecTax, type TaxCalculationResult } from '@/src/lib/calculations';
import { 
  getCityById, 
  calculateDisposableIncome,
  calculateMonthlyCityExpenses,
  getFinancialHealthStatus,
  calculateRentToIncomeRatio,
  type QuebecCity 
} from '@/src/data/quebecCosts';

export interface SimulatorResult {
  // Tax Calculations
  tax: TaxCalculationResult;
  
  // City Data
  city: QuebecCity;
  monthlyExpenses: number;
  annualExpenses: number;
  
  // Disposable Income
  disposableIncome: number;
  annualDisposableIncome: number;
  savingsRate: number;
  
  // Financial Health
  financialHealth: {
    status: 'excellent' | 'good' | 'tight' | 'deficit';
    label: string;
    color: string;
    description: string;
  };
  
  // Affordability Metrics
  rentToIncomeRatio: number;
  isRentAffordable: boolean;
  
  // Breakdown for Charts
  breakdown: {
    federalTax: number;
    provincialTax: number;
    qpp: number;
    qpip: number;
    ei: number;
    rent: number;
    groceries: number;
    utilities: number;
    transportation: number;
    disposable: number;
  };
}

/**
 * Main simulator hook
 * @param grossSalary - Annual gross salary
 * @param cityId - Selected city ID
 * @param hasPartner - Living with partner (splits rent/utilities)
 * @param hasCar - Owns a car (adds car expenses)
 * @returns Complete simulation results
 */
export function useSimulator(
  grossSalary: number,
  cityId: string,
  hasPartner: boolean = false,
  hasCar: boolean = false
): SimulatorResult | null {
  return useMemo(() => {
    // Validate inputs
    if (!grossSalary || grossSalary <= 0) {
      return null;
    }

    const city = getCityById(cityId);
    if (!city) {
      return null;
    }

    // Calculate taxes
    const tax = calculateQuebecTax(grossSalary);

    // Calculate city expenses with lifestyle adjustments
    const monthlyExpenses = calculateMonthlyCityExpenses(city, hasPartner, hasCar);
    const annualExpenses = monthlyExpenses * 12;

    // Calculate disposable income
    const disposableIncome = calculateDisposableIncome(tax.netMonthly, city);
    const annualDisposableIncome = disposableIncome * 12;
    const savingsRate = tax.netMonthly > 0 
      ? (disposableIncome / tax.netMonthly) * 100 
      : 0;

    // Get financial health status
    const financialHealth = getFinancialHealthStatus(disposableIncome, tax.netMonthly);

    // Calculate affordability metrics
    const rentToIncomeRatio = calculateRentToIncomeRatio(city.avgRent, tax.netMonthly);
    const isRentAffordable = rentToIncomeRatio < 30;

    // Create breakdown for visualizations
    const breakdown = {
      federalTax: tax.federalTax,
      provincialTax: tax.provincialTax,
      qpp: tax.qppContribution,
      qpip: tax.qpipContribution,
      ei: tax.eiContribution,
      rent: city.avgRent * 12,
      groceries: city.monthlyGrocery * 12,
      utilities: city.utilities * 12,
      transportation: city.transportation * 12,
      disposable: Math.max(0, annualDisposableIncome),
    };

    return {
      tax,
      city,
      monthlyExpenses,
      annualExpenses,
      disposableIncome,
      annualDisposableIncome,
      savingsRate,
      financialHealth,
      rentToIncomeRatio,
      isRentAffordable,
      breakdown,
    };
  }, [grossSalary, cityId, hasPartner, hasCar]);
}

export type InsightType = 'success' | 'warning' | 'info' | 'danger';

export interface Insight {
  icon: string;
  title: string;
  description: string;
  type: InsightType;
}

/**
 * Generate smart insights based on simulation results
 */
export function generateInsights(result: SimulatorResult | null): Insight[] {
  if (!result) return [];

  const insights: Insight[] = [];

  // High tax rate insight
  if (result.tax.effectiveTaxRate > 30) {
    const rrspSavings = Math.round(5000 * (result.tax.effectiveTaxRate / 100));
    insights.push({
      icon: '💰',
      title: 'Optimisation REER',
      description: `Votre taux d'imposition effectif est de ${result.tax.effectiveTaxRate.toFixed(1)}%. Cotiser 5 000$ à un REER pourrait vous faire économiser environ ${rrspSavings}$ en impôts.`,
      type: 'info' as const,
    });
  }

  // Low savings rate
  if (result.savingsRate < 10 && result.savingsRate >= 0) {
    insights.push({
      icon: '⚠️',
      title: 'Économies Faibles',
      description: `Vous n'économisez que ${result.savingsRate.toFixed(1)}% de votre revenu net. Visez au moins 10% pour une meilleure sécurité financière.`,
      type: 'warning' as const,
    });
  }

  // Deficit budget
  if (result.disposableIncome < 0) {
    insights.push({
      icon: '🚨',
      title: 'Budget Déficitaire',
      description: `Vos dépenses dépassent vos revenus de ${Math.abs(result.disposableIncome).toFixed(0)}$ par mois. Considérez une ville moins chère ou cherchez à augmenter vos revenus.`,
      type: 'danger' as const,
    });
  }

  // High rent ratio
  if (result.rentToIncomeRatio > 35) {
    insights.push({
      icon: '🏠',
      title: 'Loyer Trop Élevé',
      description: `Votre loyer représente ${result.rentToIncomeRatio.toFixed(0)}% de votre revenu. La recommandation est de rester sous 30%. Cherchez un logement moins cher ou augmentez vos revenus.`,
      type: 'warning' as const,
    });
  }

  // Good savings rate
  if (result.savingsRate >= 30) {
    insights.push({
      icon: '🎉',
      title: 'Excellente Gestion',
      description: `Félicitations! Vous économisez ${result.savingsRate.toFixed(0)}% de votre revenu net. Vous êtes sur la bonne voie pour atteindre vos objectifs financiers.`,
      type: 'success' as const,
    });
  }

  // Marginal tax rate info
  if (result.tax.marginalTaxRate > 40) {
    insights.push({
      icon: '📊',
      title: 'Taux Marginal Élevé',
      description: `Votre taux marginal d'imposition est de ${result.tax.marginalTaxRate.toFixed(1)}%. Chaque dollar supplémentaire gagné sera imposé à ce taux. Considérez des stratégies de planification fiscale.`,
      type: 'info' as const,
    });
  }

  return insights;
}

/**
 * Compare multiple cities for the same salary
 */
export function compareCities(
  grossSalary: number,
  cityIds: string[]
): Array<SimulatorResult | null> {
  return cityIds.map((cityId) => {
    const city = getCityById(cityId);
    if (!city) return null;

    const tax = calculateQuebecTax(grossSalary);
    const monthlyExpenses = calculateMonthlyCityExpenses(city);
    const disposableIncome = calculateDisposableIncome(tax.netMonthly, city);
    const savingsRate = tax.netMonthly > 0 
      ? (disposableIncome / tax.netMonthly) * 100 
      : 0;

    return {
      tax,
      city,
      monthlyExpenses,
      annualExpenses: monthlyExpenses * 12,
      disposableIncome,
      annualDisposableIncome: disposableIncome * 12,
      savingsRate,
      financialHealth: getFinancialHealthStatus(disposableIncome, tax.netMonthly),
      rentToIncomeRatio: calculateRentToIncomeRatio(city.avgRent, tax.netMonthly),
      isRentAffordable: calculateRentToIncomeRatio(city.avgRent, tax.netMonthly) < 30,
      breakdown: {
        federalTax: tax.federalTax,
        provincialTax: tax.provincialTax,
        qpp: tax.qppContribution,
        qpip: tax.qpipContribution,
        ei: tax.eiContribution,
        rent: city.avgRent * 12,
        groceries: city.monthlyGrocery * 12,
        utilities: city.utilities * 12,
        transportation: city.transportation * 12,
        disposable: Math.max(0, disposableIncome * 12),
      },
    };
  });
}
