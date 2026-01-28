'use client'

import { useState, useEffect } from 'react'
import { calculateTaxes, TaxCalculationResult, formatCurrency } from '@/utils/taxLogic'
import { Calculator, TrendingDown, PiggyBank, FileText } from 'lucide-react'
import DonutChart from '@/components/DonutChart'
import AffiliateCard from '@/components/AffiliateCard'

interface PageProps {
  params: { salary: string }
}

const POPULAR_SALARIES = [
  { label: '35k', value: 35000 },
  { label: '45k', value: 45000 },
  { label: '55k', value: 55000 },
  { label: '65k', value: 65000 },
  { label: '75k', value: 75000 },
  { label: '85k', value: 85000 },
  { label: '100k', value: 100000 },
  { label: '125k', value: 125000 },
]

export default function Page({ params }: PageProps) {
  const initialSalary = parseInt(params.salary)
  const [salary, setSalary] = useState(initialSalary)
  const [results, setResults] = useState<TaxCalculationResult | null>(null)
  const [showBreakdown, setShowBreakdown] = useState(false)

  useEffect(() => {
    if (!isNaN(salary) && salary > 0) {
      const calculatedResults = calculateTaxes(salary)
      setResults(calculatedResults)
    }
  }, [salary])

  const handleSalaryChange = (newSalary: number) => {
    setSalary(newSalary)
    window.history.replaceState(null, '', `/salaire-net-quebec/${newSalary}`)
  }

  const breakdownItems = results ? [
    { label: 'Impôt Fédéral', amount: results.federalTax, color: 'text-red-600' },
    { label: 'Impôt Provincial', amount: results.provincialTax, color: 'text-orange-600' },
    { label: 'RRQ', amount: results.qpp, color: 'text-yellow-600' },
    { label: 'RQAP', amount: results.qpip, color: 'text-blue-600' },
    { label: 'AE', amount: results.ei, color: 'text-purple-600' },
  ] : []

  if (isNaN(initialSalary)) {
    return <div className="p-10 text-center">Montant invalide</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Title Area */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Calculateur d'Impôt Québec 2026
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Estimez votre revenu net réel et optimisez vos finances.
          </p>
        </div>

        {/* The Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Inputs (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Votre salaire</h2>
              
              <div className="space-y-5">
                {/* Salary Input */}
                <div>
                  <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                    Revenu annuel brut
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      id="salary"
                      type="number"
                      value={salary}
                      onChange={(e) => handleSalaryChange(parseInt(e.target.value) || 0)}
                      placeholder="50000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                {/* Salary Slider */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ajustement rapide
                  </label>
                  <input 
                    type="range" 
                    min="20000" 
                    max="200000" 
                    step="1000" 
                    value={salary}
                    onChange={(e) => handleSalaryChange(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20k</span>
                    <span>200k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Salaries - Horizontal Scrollable Pills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Salaires populaires</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {POPULAR_SALARIES.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleSalaryChange(item.value)}
                    className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 text-gray-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Results (Span 7) - STICKY */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-6">
              {results ? (
                <>
                  {/* Hero Result Card */}
                  <div className="bg-emerald-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
                    {/* Decorative Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full opacity-20 -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700 rounded-full opacity-20 -ml-24 -mb-24"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-lg font-medium mb-2 opacity-90 text-center">
                        Votre revenu net annuel
                      </h2>
                      <div className="text-center mb-6">
                        <div className="text-6xl md:text-7xl font-bold mb-2">
                          {formatCurrency(results.netIncome)}
                        </div>
                        <p className="text-emerald-200 text-base">
                          sur {formatCurrency(results.grossIncome)} brut
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <p className="text-xs opacity-90 mb-1">Mensuel</p>
                          <p className="text-lg font-bold">{formatCurrency(results.netIncome / 12)}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <p className="text-xs opacity-90 mb-1">Aux 2 sem.</p>
                          <p className="text-lg font-bold">{formatCurrency(results.netIncome / 26)}</p>
                        </div>
                        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                          <p className="text-xs opacity-90 mb-1">Déductions</p>
                          <p className="text-lg font-bold">{formatCurrency(results.totalDeductions)}</p>
                        </div>
                      </div>

                      {/* Integrated Donut Chart */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-base font-semibold mb-3 text-center">Répartition de votre revenu</h3>
                        <DonutChart 
                          netIncome={results.netIncome}
                          totalTax={results.totalDeductions}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <button
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="w-full flex items-center justify-between text-left py-2"
                    >
                      <span className="text-base font-semibold text-gray-900">Détails des déductions</span>
                      <svg 
                        className={`w-5 h-5 text-gray-600 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showBreakdown && (
                      <div className="mt-3 space-y-2 animate-in slide-in-from-top">
                        {breakdownItems.map((item) => (
                          <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-700">{item.label}</span>
                            <span className={`text-sm font-semibold ${item.color}`}>
                              {formatCurrency(item.amount)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center py-2 pt-3 border-t border-gray-200">
                          <span className="text-sm font-bold text-gray-900">Total</span>
                          <span className="font-bold text-red-600">
                            {formatCurrency(results.totalDeductions)}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Taux d'imposition effectif</span>
                            <span className="font-bold">
                              {((results.totalDeductions / results.grossIncome) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Affiliate Card */}
                  <AffiliateCard
                    title="Maximisez votre épargne avec Wealthsimple"
                    description="Ouvrez un CELI et obtenez 25$ de bonus. Investissez automatiquement votre salaire net et faites-le fructifier sans payer d'impôt sur les gains."
                    buttonText="Obtenir 25$ de bonus"
                    link="https://wealthsimple.com/fr-ca"
                    theme="green"
                  />
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                  <div className="text-gray-300 mb-4">
                    <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Entrez votre salaire pour commencer
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Les résultats apparaîtront ici
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Section Below - Full Width */}
        {results && (
          <section className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne le calcul ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Impôt Fédéral</h3>
                <p className="text-sm text-gray-600">
                  Taux progressifs de <strong>15% à 33%</strong> après déduction du montant personnel de base de 15 705 $.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Impôt Provincial</h3>
                <p className="text-sm text-gray-600">
                  Taux progressifs de <strong>14% à 25,75%</strong> après déduction du montant personnel de base de 18 056 $.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Cotisations sociales</h3>
                <p className="text-sm text-gray-600">
                  <strong>RRQ:</strong> 6,4% jusqu'à 68 500 $<br/>
                  <strong>RQAP:</strong> 0,494%<br/>
                  <strong>AE:</strong> 1,27% jusqu'à 63 200 $
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Pro Tips Section */}
        {results && (
          <section className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour optimiser votre situation fiscale
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-blue-600" />
                  Contribuez à votre REER
                </h3>
                <p className="text-sm text-gray-600">
                  Les cotisations REER réduisent votre revenu imposable. Cotisez jusqu'à 18% de votre revenu et récupérez jusqu'à <strong>50% en remboursement d'impôt</strong>.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  Maximisez votre CELI
                </h3>
                <p className="text-sm text-gray-600">
                  Tous les gains sont <strong>libres d'impôt à vie</strong>. Limite de 7 000 $ par année en 2026. Idéal pour l'épargne à court terme.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Déduisez vos frais de garde
                </h3>
                <p className="text-sm text-gray-600">
                  Les frais de garde d'enfants sont déductibles d'impôt. Conservez tous vos reçus pour augmenter votre remboursement.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Ajustez vos retenues à la source
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous recevez un gros remboursement chaque année, ajustez vos retenues avec le formulaire TP-1015.3-V pour avoir plus d'argent maintenant.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
