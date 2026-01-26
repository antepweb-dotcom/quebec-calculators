'use client'

import { useState } from 'react'
import { calculateEI, EIInputs, EIResult, Region, formatCurrency, getRegionName } from '@/utils/eiLogic'

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
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-5">
            {/* Annual Salary */}
            <div>
              <label htmlFor="annualSalary" className="block text-sm font-semibold text-gray-700 mb-2">
                Salaire annuel brut
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
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
                  <span className="text-sm font-semibold text-gray-700">Avez-vous des personnes à charge?</span>
                  <p className="text-xs text-gray-500 mt-1">Enfants ou autres dépendants</p>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer ma prestation
            </button>
          </div>
        </div>

        {/* Ad Space */}
        <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500 font-medium">Espace Publicitaire</p>
          <p className="text-sm text-gray-400 mt-2">300x250</p>
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {result ? (
          <div className="space-y-6">
            {/* HERO RESULT - V2 Gold Standard */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-12 text-white text-center">
              <h2 className="text-2xl font-medium mb-4 opacity-90">Votre Prestation Hebdomadaire</h2>
              <p className="text-6xl md:text-7xl font-bold mb-6">
                {formatCurrency(result.weeklyBenefitBeforeTax)}
              </p>
              <p className="text-3xl text-blue-100 mb-6">
                ≈ {formatCurrency(result.monthlyBenefitBeforeTax)} / mois
              </p>
              {result.isAtMaximum && (
                <div className="bg-white/20 rounded-lg p-4 mt-4 inline-block">
                  <p className="text-lg font-semibold">
                    ✓ Vous recevez le montant maximum d'assurance-emploi
                  </p>
                </div>
              )}
            </div>

            {/* Tax Warning */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900 mb-2">Attention : Ce montant est imposable</h3>
                  <p className="text-red-800 mb-3">
                    Les prestations d'assurance-emploi sont considérées comme un revenu imposable. 
                    Des retenues d'impôt d'environ <strong>10%</strong> seront effectuées.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-red-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Prestation brute (hebdomadaire)</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(result.weeklyBenefitBeforeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-red-200">
                      <span className="text-gray-700">Retenue d'impôt estimée (~10%)</span>
                      <span className="font-semibold text-red-600">-{formatCurrency(result.estimatedTaxWithholding)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold">Montant net estimé</span>
                      <span className="font-bold text-green-600 text-lg">{formatCurrency(result.weeklyBenefitAfterTax)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">Ceci est une estimation</h3>
                  <p className="text-yellow-800 text-sm leading-relaxed">
                    Le montant réel de vos prestations dépend de vos <strong>meilleures semaines de travail</strong> au cours 
                    des 52 dernières semaines. Service Canada calculera votre prestation exacte en fonction de votre 
                    historique d'emploi et de vos gains assurables.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Salaire annuel brut</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.annualGrossSalary)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Gains assurables (max 63 200 $)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.insurableEarnings)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Taux de prestation</span>
                  <span className="font-semibold text-gray-900">55%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Région</span>
                  <span className="font-semibold text-gray-900">{getRegionName(result.region)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Personnes à charge</span>
                  <span className="font-semibold text-gray-900">{result.hasDependents ? 'Oui' : 'Non'}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 mt-2">
                  <span className="text-gray-900 font-bold">Prestation hebdomadaire</span>
                  <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.weeklyBenefitBeforeTax)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 -mx-6 px-6">
                  <span className="text-gray-900 font-bold">Prestation mensuelle (approx.)</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(result.monthlyBenefitBeforeTax)}</span>
                </div>
              </div>
            </div>

            {/* Debt Consolidation CTA */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8 border-2 border-purple-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">Réduisez vos paiements mensuels</h3>
                  </div>
                  <p className="text-gray-700 text-lg mb-2">
                    Regroupez vos dettes et <strong>économisez sur les intérêts</strong>
                  </p>
                  <p className="text-gray-600">
                    Comparez les options de consolidation de dettes et cartes de crédit à faible taux
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap text-lg shadow-lg hover:shadow-xl">
                  Voir les options
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Calculez votre prestation d'assurance-emploi
            </h3>
            <p className="text-gray-500">
              Entrez vos informations pour estimer votre prestation hebdomadaire
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
