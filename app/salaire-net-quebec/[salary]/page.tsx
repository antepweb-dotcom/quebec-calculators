'use client'

import { useState, useEffect } from 'react'
import { calculateTaxes, TaxCalculationResult } from '@/utils/taxLogic'
import Navbar from "@/components/Navbar"
import { Calculator, TrendingDown, PiggyBank, FileText } from 'lucide-react'

// Metadata will be handled by parent or we'll add it back if needed
interface PageProps {
  params: { salary: string }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(amount)
}

export default function Page({ params }: PageProps) {
  const salaryAmount = parseInt(params.salary)
  const [results, setResults] = useState<TaxCalculationResult | null>(null)

  useEffect(() => {
    if (!isNaN(salaryAmount) && salaryAmount > 0) {
      const calculatedResults = calculateTaxes(salaryAmount)
      setResults(calculatedResults)
    }
  }, [salaryAmount])

  if (isNaN(salaryAmount)) {
    return <div className="p-10 text-center">Montant invalide</div>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculateur d'Impôt Québec 2026
            </h1>
            <p className="text-xl text-gray-600">
              Salaire brut: {formatCurrency(salaryAmount)}
            </p>
          </header>

          {/* 3 Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Ad Space */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center sticky top-6">
                <p className="text-gray-500 font-medium">Espace Publicitaire</p>
                <p className="text-sm text-gray-400 mt-2">300x600</p>
              </div>
            </div>

            {/* Middle Column - Results */}
            <div className="lg:col-span-2">
              {results && (
                <>
                  {/* HERO RESULT - V2 Gold Standard */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-6 text-white text-center">
                    <h2 className="text-xl font-medium mb-3 opacity-90">Votre Salaire Net Annuel</h2>
                    <p className="text-5xl md:text-6xl font-bold mb-6">
                      {formatCurrency(results.netIncome)}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs opacity-90 mb-1">Par mois</p>
                        <p className="text-lg font-bold">{formatCurrency(results.netIncome / 12)}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs opacity-90 mb-1">Aux 2 semaines</p>
                        <p className="text-lg font-bold">{formatCurrency(results.netIncome / 26)}</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-xs opacity-90 mb-1">Par semaine</p>
                        <p className="text-lg font-bold">{formatCurrency(results.netIncome / 52)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tax Breakdown with Progress Bars */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition des déductions</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Impôt Fédéral</span>
                          <span className="text-sm font-bold text-red-600">{formatCurrency(results.federalTax)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(results.federalTax / results.grossIncome) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((results.federalTax / results.grossIncome) * 100).toFixed(1)}% de votre salaire brut
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Impôt Provincial (Québec)</span>
                          <span className="text-sm font-bold text-blue-600">{formatCurrency(results.provincialTax)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(results.provincialTax / results.grossIncome) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((results.provincialTax / results.grossIncome) * 100).toFixed(1)}% de votre salaire brut
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">RRQ (Régie des rentes)</span>
                          <span className="text-sm font-bold text-yellow-600">{formatCurrency(results.qpp)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(results.qpp / results.grossIncome) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((results.qpp / results.grossIncome) * 100).toFixed(1)}% de votre salaire brut
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">RQAP + AE</span>
                          <span className="text-sm font-bold text-purple-600">{formatCurrency(results.qpip + results.ei)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${((results.qpip + results.ei) / results.grossIncome) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {(((results.qpip + results.ei) / results.grossIncome) * 100).toFixed(1)}% de votre salaire brut
                        </p>
                      </div>

                      <div className="pt-3 border-t-2 border-gray-300">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total des déductions</span>
                          <span className="text-xl font-bold text-red-600">
                            {formatCurrency(results.totalDeductions)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Taux d'imposition effectif: <strong>{((results.totalDeductions / results.grossIncome) * 100).toFixed(1)}%</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ad Space - Middle */}
                  <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center mb-6">
                    <p className="text-gray-500 font-medium">Espace Publicitaire</p>
                    <p className="text-sm text-gray-400 mt-2">728x90</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Full Width Sections Below */}
          {results && (
            <>
              {/* Educational Section - V2 Gold Standard */}
              <section className="mt-8 bg-white rounded-xl shadow-lg p-8">
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
                      Le gouvernement fédéral perçoit cet impôt pour financer les programmes nationaux.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Impôt Provincial (Québec)</h3>
                    <p className="text-sm text-gray-600">
                      Taux progressifs de <strong>14% à 25,75%</strong> après déduction du montant personnel de base de 18 056 $. 
                      Le Québec a son propre système fiscal distinct des autres provinces.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Calculator className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Cotisations sociales</h3>
                    <p className="text-sm text-gray-600">
                      <strong>RRQ:</strong> 6,4% jusqu'à 68 500 $<br/>
                      <strong>RQAP:</strong> 0,494% jusqu'à 94 000 $<br/>
                      <strong>AE:</strong> 1,27% jusqu'à 63 200 $
                    </p>
                  </div>
                </div>
              </section>

              {/* Pro Tips Section - V2 Gold Standard */}
              <section className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Conseils pour optimiser votre situation fiscale
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-blue-600" />
                      Contribuez à votre REER pour baisser l'impôt
                    </h3>
                    <p className="text-sm text-gray-600">
                      Les cotisations REER réduisent votre revenu imposable. Vous pouvez cotiser jusqu'à 18% de votre revenu (max 31 560 $ en 2026) 
                      et récupérer jusqu'à <strong>50% en remboursement d'impôt</strong> selon votre tranche.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-blue-600" />
                      Maximisez votre CELI
                    </h3>
                    <p className="text-sm text-gray-600">
                      Le CELI ne réduit pas vos impôts maintenant, mais tous les gains sont <strong>libres d'impôt à vie</strong>. 
                      Limite de 7 000 $ par année en 2026. Idéal pour l'épargne à court terme.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-blue-600" />
                      Déduisez vos frais de garde
                    </h3>
                    <p className="text-sm text-gray-600">
                      Les frais de garde d'enfants sont déductibles d'impôt au Québec. Conservez tous vos reçus pour réduire votre revenu imposable 
                      et augmenter votre remboursement.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Planifiez vos retenues à la source
                    </h3>
                    <p className="text-sm text-gray-600">
                      Si vous recevez un gros remboursement chaque année, ajustez vos retenues à la source avec le formulaire TP-1015.3-V 
                      pour avoir plus d'argent dans vos poches maintenant.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Calculateur d'Impôt Québec. Les calculs sont fournis à titre indicatif seulement.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
