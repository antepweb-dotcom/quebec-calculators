import { Metadata } from 'next'
import { calculateTaxes } from '@/utils/taxLogic'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(amount)
}

export function generateSalaryMetadata(salary: number): Metadata {
  const results = calculateTaxes(salary)
  const netIncome = formatCurrency(results.netIncome)
  const monthlyNet = formatCurrency(results.netIncome / 12)
  const effectiveRate = ((results.totalDeductions / results.grossIncome) * 100).toFixed(1)

  return {
    title: `Salaire Net ${formatCurrency(salary)} au Québec 2026 | Calcul Impôt`,
    description: `Salaire net pour ${formatCurrency(salary)} au Québec : ${netIncome}/an (${monthlyNet}/mois). Taux effectif ${effectiveRate}%. Calcul détaillé impôts fédéral, provincial, RRQ, RQAP, AE 2026.`,
    keywords: [
      `salaire net ${salary} québec`,
      `impôt ${salary} québec`,
      `revenu net ${salary}`,
      `calcul impôt ${salary}`,
      'taux imposition québec 2026',
      'déductions salariales',
      'RRQ RQAP AE',
    ],
    alternates: {
      canonical: `/salaire-net-quebec/${salary}`,
    },
    openGraph: {
      title: `Salaire Net ${formatCurrency(salary)} au Québec (2026)`,
      description: `Avec ${formatCurrency(salary)} brut, votre salaire net est ${netIncome} (${monthlyNet}/mois). Taux effectif: ${effectiveRate}%. Calcul détaillé avec taux 2026.`,
      url: `/salaire-net-quebec/${salary}`,
      type: 'article',
      locale: 'fr_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Salaire Net ${formatCurrency(salary)} Québec`,
      description: `Net: ${netIncome}/an | ${monthlyNet}/mois | Taux: ${effectiveRate}%`,
    },
  }
}
