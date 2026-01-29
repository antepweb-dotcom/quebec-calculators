// Metadata helper for dynamic salary pages
export function getSalaryMetadata(salary: number) {
  const formattedSalary = salary.toLocaleString('fr-CA')
  
  return {
    title: `Salaire Net ${formattedSalary} $ Québec 2026 - Calcul Après Impôts`,
    description: `Combien reste-t-il sur un salaire de ${formattedSalary} $ au Québec? Calcul détaillé des impôts, RRQ et RQAP pour 2026. Résultat précis.`,
    canonical: `https://qcfinance.ca/salaire-net-quebec/${salary}`,
  }
}

// Pre-calculated salary ranges for quick reference
export const SALARY_RANGES = {
  entry: { min: 30000, max: 45000, label: 'Débutant' },
  intermediate: { min: 45000, max: 70000, label: 'Intermédiaire' },
  senior: { min: 70000, max: 100000, label: 'Expérimenté' },
  executive: { min: 100000, max: 200000, label: 'Cadre' },
}

// Common salary increments for programmatic SEO
export const COMMON_SALARIES = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  160000, 170000, 180000, 190000, 200000
]
