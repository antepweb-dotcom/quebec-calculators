import { TaxCalculationResult, formatCurrency } from '@/utils/taxLogic'
import DonutChart from './DonutChart'

interface ResultsDisplayProps {
  results: TaxCalculationResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const breakdownItems = [
    { label: 'Impôt Fédéral', amount: results.federalTax, color: 'text-red-600' },
    { label: 'Impôt Provincial', amount: results.provincialTax, color: 'text-orange-600' },
    { label: 'RRQ (Régie des rentes)', amount: results.qpp, color: 'text-yellow-600' },
    { label: 'RQAP', amount: results.qpip, color: 'text-blue-600' },
    { label: 'AE (Assurance-emploi)', amount: results.ei, color: 'text-purple-600' },
  ]

  const monthly = {
    net: results.netIncome / 12,
    deductions: results.totalDeductions / 12,
  }

  const biweekly = {
    net: results.netIncome / 26,
    deductions: results.totalDeductions / 26,
  }

  return (
    <div className="space-y-6">
      {/* MASSIVE Hero Result - V2 Gold Standard */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Votre revenu net annuel
        </h2>
        <div className="text-center mb-8">
          <div className="text-6xl md:text-7xl font-bold text-green-600 mb-2">
            {formatCurrency(results.netIncome)}
          </div>
          <p className="text-gray-600 text-lg">
            sur un revenu brut de {formatCurrency(results.grossIncome)}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Par mois</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(monthly.net)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Aux 2 semaines</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(biweekly.net)}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Déductions totales</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(results.totalDeductions)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart and Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Où va votre argent?</h3>
          <DonutChart 
            netIncome={results.netIncome}
            totalTax={results.totalDeductions}
          />
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Détails des déductions</h3>
          <div className="space-y-3">
            {breakdownItems.map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 font-medium">{item.label}</span>
                <span className={`font-semibold ${item.color}`}>
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
              <span className="text-gray-900 font-bold">Total des déductions</span>
              <span className="font-bold text-red-600 text-lg">
                {formatCurrency(results.totalDeductions)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Résumé par période</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Catégorie</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Annuel</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Mensuel</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Aux deux semaines</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-900">Revenu Net</td>
              <td className="text-right py-3 px-4 text-green-600 font-semibold">
                {formatCurrency(results.netIncome)}
              </td>
              <td className="text-right py-3 px-4 text-green-600 font-semibold">
                {formatCurrency(monthly.net)}
              </td>
              <td className="text-right py-3 px-4 text-green-600 font-semibold">
                {formatCurrency(biweekly.net)}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Déductions totales</td>
              <td className="text-right py-3 px-4 text-red-600">
                {formatCurrency(results.totalDeductions)}
              </td>
              <td className="text-right py-3 px-4 text-red-600">
                {formatCurrency(monthly.deductions)}
              </td>
              <td className="text-right py-3 px-4 text-red-600">
                {formatCurrency(biweekly.deductions)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Affiliate CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Maximisez votre épargne</h3>
            <p className="text-gray-600">
              Découvrez les meilleurs taux d'épargne et placements pour faire fructifier votre argent
            </p>
          </div>
          <button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap">
            Voir les meilleurs taux (5%)
          </button>
        </div>
      </div>
    </div>
  )
}

