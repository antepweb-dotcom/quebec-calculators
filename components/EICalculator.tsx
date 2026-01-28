'use client'

import { useState } from 'react'
import { calculateEI, EIInputs, EIResult, Region, formatCurrency, getRegionName } from '@/utils/eiLogic'
import AffiliateCard from '@/components/AffiliateCard'

export default function EICalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>('50000')
  const [region, setRegion] = useState<Region>('montreal')
  const [hasDependents, setHasDependents] = useState<boolean>(false)
  const [result, setResult] = useState<EIResult | null>(null)

  const handleCalculate = () => {
    const salary = parseFloat(annualSalary)
    
    if (isNaN(salary) || salary <= 0) {
      alert('Veuillez entrer un salaire valide')
      return
    }

    const inputs: EIInputs = {
      annualGrossSalary: salary,
      region,
      hasDependents,
    }

    const calculatedResult = calculateEI(inputs)
    setResult(calculatedResult)
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Left Column - Input Form (40%) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-5">
            {/* Annual Salary */}
            <div>
              <label htmlFor="annualSalary" className="block text-sm font-semibold text-gray-700 mb-2">
                Salaire annuel brut
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  id="annualSalary"
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label htmlFor="region" className="block text-sm font-semibold text-gray-700 mb-2">
                Région
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="montreal">Montréal</option>
                <option value="quebec-city">Québec</option>
                <option value="other">Autres régions</option>
              </select>
            </div>

            {/* Dependents */}
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Personnes à charge</span>
                  <p className="text-xs text-gray-500 mt-1">Enfants ou dépendants</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={hasDependents}
                    onChange={(e) => setHasDependents(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setHasDependents(!hasDependents)}
                    className={`w-14 h-8 rounded-full transition-colors ${
                      hasDependents ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        hasDependents ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-sm"
            >
              Calculer ma prestation
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results (60%, Sticky) */}
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          {result ? (
            <div className="space-y-6">
              {/* Hero Result Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-lg font-medium mb-2 opacity-90 text-center">Votre Prestation</h2>
                <div className="text-center mb-4">
                  <div className="text-6xl md:text-7xl font-bold mb-2">
                    {formatCurrency(result.weeklyBenefitBeforeTax)}
                  </div>
                  <p className="text-xl opacity-90">par semaine</p>
                  <p className="text-2xl text-blue-100 mt-2">
                    ≈ {formatCurrency(result.monthlyBenefitBeforeTax)} / mois
                  </p>
                </div>
                {result.isAtMaximum && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4 text-center">
                    <p className="text-sm font-semibold">
                      ✓ Montant maximum d'assurance-emploi
                    </p>
                  </div>
                )}
              </div>

              {/* Compact Alert Banners */}
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-red-900 mb-1">Attention : Montant imposable</h3>
                    <p className="text-sm text-red-800 mb-2">
                      Retenue d'impôt d'environ <strong>10%</strong> sera effectuée.
                    </p>
                    <div className="bg-white rounded-lg p-3 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Prestation brute</span>
                        <span className="font-semibold">{formatCurrency(result.weeklyBenefitBeforeTax)}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Retenue (~10%)</span>
                        <span className="font-semibold">-{formatCurrency(result.estimatedTaxWithholding)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-900">Net estimé</span>
                        <span className="font-bold text-emerald-600">{formatCurrency(result.weeklyBenefitAfterTax)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-yellow-900 mb-1">Estimation basée sur vos meilleures semaines</h3>
                    <p className="text-sm text-yellow-800">
                      Le montant réel dépend de vos gains des 52 dernières semaines. Service Canada calculera votre prestation exacte.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Détails du calcul</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">Salaire annuel brut</span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.annualGrossSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">Gains assurables (max 63 200 $)</span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.insurableEarnings)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">Taux de prestation</span>
                    <span className="text-sm font-semibold text-gray-900">55%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">Région</span>
                    <span className="text-sm font-semibold text-gray-900">{getRegionName(result.region)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">Personnes à charge</span>
                    <span className="text-sm font-semibold text-gray-900">{result.hasDependents ? 'Oui' : 'Non'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 mt-2 rounded-lg">
                    <span className="text-sm font-bold text-gray-900">Prestation hebdomadaire</span>
                    <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.weeklyBenefitBeforeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-emerald-50 -mx-6 px-6 rounded-lg">
                    <span className="text-sm font-bold text-gray-900">Prestation mensuelle</span>
                    <span className="font-bold text-emerald-600 text-lg">{formatCurrency(result.monthlyBenefitBeforeTax)}</span>
                  </div>
                </div>
              </div>

              {/* Affiliate Card */}
              <AffiliateCard
                title="Besoin d'aide avec vos finances?"
                description="Wealthsimple offre des conseils financiers gratuits et des outils d'épargne automatique. Obtenez 25$ de bonus à l'inscription."
                buttonText="Obtenir 25$ de bonus"
                link="https://wealthsimple.com/fr-ca"
                theme="blue"
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="text-gray-300 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Calculez votre prestation
              </h3>
              <p className="text-gray-500 text-sm">
                Entrez vos informations pour estimer votre prestation hebdomadaire
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

