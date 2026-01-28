'use client'

import { useState, useEffect } from 'react'
import { calculateTaxes, TaxCalculationResult } from '@/utils/taxLogic'
import { Calculator, PiggyBank, FileText, Lock, CheckCircle2, TrendingDown } from 'lucide-react'
import SalaryChart from '@/components/SalaryChart'
import Breadcrumb from '@/components/Breadcrumb'
import AffiliateCard from '@/components/AffiliateCard'

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

export default function SalaryDetailPage({ params }: PageProps) {
  const initialSalary = parseInt(params.salary)
  const [salary, setSalary] = useState(initialSalary)
  const [results, setResults] = useState<TaxCalculationResult | null>(null)

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

  const handleCalculateClick = () => {
    handleSalaryChange(salary)
    // Auto-scroll to results on mobile
    setTimeout(() => {
      const resultsElement = document.getElementById('results-card')
      if (resultsElement && window.innerWidth < 1024) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }

  if (isNaN(initialSalary) || initialSalary <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Montant invalide</h1>
          <p className="text-gray-600">Veuillez entrer un salaire valide</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Breadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Salaire Net Québec', href: '/salaire-net-quebec' },
            { label: `${formatCurrency(salary)}` }
          ]} 
        />

        <header className="text-center mb-8 mt-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Taux officiels 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Impôt sur un salaire de {formatCurrency(salary)} au Québec (2026)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calcul détaillé de votre revenu net après impôts et déductions
          </p>
        </header>

        {/* Main Content - Mobile: Custom Order, Desktop: 2 Columns (5+7) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN - Desktop: 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* 1. Ajustez votre salaire - Mobile: Order 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 order-1 lg:order-none">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-5">
                Ajustez votre salaire
              </h2>
              
              <div className="space-y-5">
                <div>
                  <input 
                    type="range" 
                    min="20000" 
                    max="200000" 
                    step="1000" 
                    value={salary}
                    onChange={(e) => handleSalaryChange(parseInt(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition-all"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((salary - 20000) / 180000) * 100}%, #e5e7eb ${((salary - 20000) / 180000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>20 000 $</span>
                    <span>200 000 $</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Revenu annuel brut
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">$</span>
                    <input 
                      type="number" 
                      value={salary}
                      onChange={(e) => handleSalaryChange(parseInt(e.target.value) || 20000)}
                      className="w-full pl-10 pr-5 py-4 border-2 border-gray-200 rounded-xl text-right text-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[48px]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculateClick}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 min-h-[48px]"
                >
                  Recalculer
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Calcul sécurisé 100% local. Aucune donnée envoyée au serveur.</span>
                </div>
              </div>
            </div>

            {/* 3. Répartition visuelle - Mobile: Order 3 */}
            {results && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 order-4 lg:order-none">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                  Répartition visuelle
                </h3>
                
                <div className="mb-4">
                  <SalaryChart
                    net={results.netIncome}
                    impotFederal={results.federalTax}
                    impotQuebec={results.provincialTax}
                    rrq={results.qpp}
                    rqap={results.qpip}
                    ae={results.ei}
                  />
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">Revenu net</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">
                      {((results.netIncome / results.grossIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">Impôt fédéral</span>
                    </div>
                    <span className="text-xs font-bold text-red-600">
                      {((results.federalTax / results.grossIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">Impôt provincial</span>
                    </div>
                    <span className="text-xs font-bold text-orange-600">
                      {((results.provincialTax / results.grossIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Vous gardez</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {((results.netIncome / results.grossIncome) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Déductions</p>
                    <p className="text-lg font-bold text-red-600">
                      {((results.totalDeductions / results.grossIncome) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Salaires populaires - Mobile: Order 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 order-5 lg:order-none">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">
                Salaires populaires
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      handleSalaryChange(amount)
                      setTimeout(() => {
                        const resultsElement = document.getElementById('results-card')
                        if (resultsElement && window.innerWidth < 1024) {
                          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 150)
                    }}
                    className="px-3 py-2.5 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-all active:scale-95 min-h-[48px]"
                  >
                    {amount.toLocaleString('fr-CA')} $
                  </button>
                ))}
              </div>
            </div>

            {/* Informations clés - Desktop only, hidden on mobile */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hidden lg:block">
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Informations clés
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Taux 2026 officiels</p>
                    <p className="text-gray-600 text-xs">Calculs basés sur les derniers taux d'imposition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Cotisations incluses</p>
                    <p className="text-gray-600 text-xs">RRQ, RQAP et AE calculés</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - Desktop: 7 cols, STICKY */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 lg:h-fit">

              {/* 2. Résultat du calcul - Mobile: Order 2, Desktop: Sticky Right */}
              {results && (
                <div id="results-card" className="bg-white rounded-2xl shadow-2xl border border-gray-100 order-2 scroll-mt-20">
                  
                  <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 border-b border-emerald-100 px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
                        Résultat du calcul
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Taux officiels 2026 appliqués</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 lg:px-8 py-8 text-center">
                    <p className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">
                      Revenu Net Annuel
                    </p>
                    <p className="text-5xl lg:text-6xl font-extrabold text-emerald-600 mb-8 tracking-tight">
                      {formatCurrency(results.netIncome)}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs text-gray-600 mb-1.5 font-medium">Par mois</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{formatCurrency(results.netIncome / 12)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs text-gray-600 mb-1.5 font-medium">Aux 2 semaines</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{formatCurrency(results.netIncome / 26)}</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs text-gray-600 mb-1.5 font-medium">Par semaine</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{formatCurrency(results.netIncome / 52)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Taux effectif</p>
                        <p className="text-lg font-bold text-red-600">
                          {((results.totalDeductions / results.grossIncome) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-px h-10 bg-gray-200"></div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Vous gardez</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {((results.netIncome / results.grossIncome) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Educational Content Below - Full Width */}
        {results && (
          <div className="max-w-7xl mx-auto mt-12 space-y-8">
            
            {/* 5. Affiliate Card - Mobile: Order 5 */}
            <div className="order-6 lg:order-none">
              <AffiliateCard
                title="Ouvrez un compte CELI avec Wealthsimple"
                description="Obtenez 25$ de bonus en vous inscrivant et commencez à investir sans frais de commission. Parfait pour faire fructifier votre salaire net à l'abri de l'impôt."
                buttonText="Profiter de l'offre"
                link="https://wealthsimple.com/fr-ca"
                theme="dark"
              />
            </div>

            {/* 6. Comment fonctionne le calcul - Mobile: Order 6 */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 order-7 lg:order-none">
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
                    <strong>AE:</strong> 1,27%
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Conseils pour optimiser - Mobile: Order 7 */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-gray-100 p-8 order-8 lg:order-none">
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
                    Les cotisations REER réduisent votre revenu imposable et peuvent vous faire récupérer jusqu'à <strong>50% en remboursement d'impôt</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                    Maximisez votre CELI
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tous les gains sont <strong>libres d'impôt à vie</strong>. Limite de 7 000 $ par année en 2026.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Déduisez vos frais de garde
                  </h3>
                  <p className="text-sm text-gray-600">
                    Les frais de garde d'enfants sont déductibles d'impôt au Québec. Conservez tous vos reçus.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Planifiez vos retenues
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ajustez vos retenues à la source avec le formulaire TP-1015.3-V pour avoir plus d'argent maintenant.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. FAQ Accordion - NEW */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 order-9 lg:order-none">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-lg text-gray-600">
                  Tout ce que vous devez savoir sur un salaire de {formatCurrency(salary)}
                </p>
              </div>
              
              <div className="space-y-4">
                <details className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      Quel est mon salaire net mensuel avec {formatCurrency(salary)}?
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Avec un salaire annuel de {formatCurrency(salary)}, votre <strong>revenu net mensuel est de {formatCurrency(results.netIncome / 12)}</strong>. 
                      Ce montant est calculé après toutes les déductions fiscales (impôts fédéral et provincial) et 
                      cotisations sociales (RRQ, RQAP, AE). Si vous êtes payé aux deux semaines, vous recevrez 
                      environ <strong>{formatCurrency(results.netIncome / 26)} par paie</strong>.
                    </p>
                  </div>
                </details>
                
                <details className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      Combien d'impôts je paie sur {formatCurrency(salary)}?
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Sur un revenu de {formatCurrency(salary)}, vous payez environ <strong>{formatCurrency(results.totalDeductions)} en impôts et cotisations</strong>, 
                      soit {((results.totalDeductions / results.grossIncome) * 100).toFixed(1)}% de votre revenu brut. 
                      Cela inclut {formatCurrency(results.federalTax)} d'impôt fédéral ({((results.federalTax / results.grossIncome) * 100).toFixed(1)}%), {formatCurrency(results.provincialTax)} d'impôt provincial ({((results.provincialTax / results.grossIncome) * 100).toFixed(1)}%), 
                      et {formatCurrency(results.qpp + results.qpip + results.ei)} de cotisations sociales (RRQ, RQAP, AE).
                    </p>
                  </div>
                </details>
                
                <details className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      Comment puis-je réduire mes impôts avec {formatCurrency(salary)}?
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <p>Les stratégies les plus efficaces incluent :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Maximiser votre REER</strong> : Cotisez jusqu'à {formatCurrency(salary * 0.18)} (18% de votre revenu) pour réduire votre revenu imposable</li>
                        <li><strong>Utiliser votre CELI</strong> : 7 000 $ en 2026 pour des gains libres d'impôt à vie</li>
                        <li><strong>Déductions bureau à domicile</strong> : Si vous travaillez de la maison, déduisez une portion de vos dépenses</li>
                        <li><strong>Fractionnement de revenu</strong> : Partagez avec votre conjoint pour réduire le taux familial</li>
                      </ul>
                      <p className="font-semibold text-emerald-700">Consultez un planificateur financier pour optimiser votre situation personnelle.</p>
                    </div>
                  </div>
                </details>
                
                <details className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      Quelle est ma tranche d'imposition avec {formatCurrency(salary)}?
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Votre <strong>taux effectif global est de {((results.totalDeductions / results.grossIncome) * 100).toFixed(1)}%</strong>, 
                      ce qui signifie que c'est le pourcentage réel d'impôt que vous payez sur votre revenu total. 
                      Votre taux marginal (le taux appliqué sur votre dernier dollar gagné) est différent et dépend de votre 
                      tranche d'imposition. Au Québec, les taux marginaux combinés (fédéral + provincial) varient de 27.5% à 53.3% 
                      selon votre niveau de revenu.
                    </p>
                  </div>
                </details>
                
                <details className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 pr-4">
                      Est-ce que {formatCurrency(salary)} est un bon salaire au Québec?
                    </h3>
                    <svg 
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {salary >= 100000 ? (
                        <>
                          Oui, {formatCurrency(salary)} est un <strong>excellent salaire au Québec</strong>. 
                          Le salaire médian québécois est d'environ 50 000 $, ce qui signifie que vous gagnez 
                          {(salary / 50000).toFixed(1)}x plus que la médiane. Avec un revenu net de {formatCurrency(results.netIncome)}, 
                          vous disposez de moyens financiers confortables pour épargner, investir et maintenir un niveau de vie élevé.
                        </>
                      ) : salary >= 60000 ? (
                        <>
                          Oui, {formatCurrency(salary)} est un <strong>bon salaire au Québec</strong>. 
                          C'est au-dessus du salaire médian québécois d'environ 50 000 $. Avec un revenu net de {formatCurrency(results.netIncome)}, 
                          vous pouvez vivre confortablement et épargner pour vos objectifs financiers.
                        </>
                      ) : (
                        <>
                          {formatCurrency(salary)} représente un salaire proche de la médiane québécoise (environ 50 000 $). 
                          Avec un revenu net de {formatCurrency(results.netIncome)}, vous pouvez couvrir vos besoins essentiels 
                          et commencer à épargner pour vos objectifs financiers.
                        </>
                      )}
                    </p>
                  </div>
                </details>
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  )
}
