'use client'

import { useState, useRef } from 'react'
import { calculateDaycareCosts, DaycareInputs, DaycareResult, formatCurrency, formatPercentage, DEFAULT_DAYS_PER_YEAR } from '@/utils/daycareLogic'
import { generateDaycarePDF } from '@/utils/pdfGenerator'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function DaycareCalculator() {
  const [familyIncome, setFamilyIncome] = useState<string>('100000')
  const [privateDailyRate, setPrivateDailyRate] = useState<string>('50')
  const [daysPerYear, setDaysPerYear] = useState<string>(DEFAULT_DAYS_PER_YEAR.toString())
  const [result, setResult] = useState<DaycareResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const income = parseFloat(familyIncome)
    const rate = parseFloat(privateDailyRate)
    const days = parseInt(daysPerYear)
    
    if (isNaN(income) || income <= 0) {
      alert('Veuillez entrer un revenu familial valide')
      return
    }
    
    if (isNaN(rate) || rate <= 0) {
      alert('Veuillez entrer un tarif journalier valide')
      return
    }
    
    if (isNaN(days) || days <= 0) {
      alert('Veuillez entrer un nombre de jours valide')
      return
    }

    const inputs: DaycareInputs = {
      familyIncome: income,
      privateDailyRate: rate,
      daysPerYear: days,
    }

    const calculatedResult = calculateDaycareCosts(inputs)
    setResult(calculatedResult)

    // Auto-scroll to results on mobile
    if (window.innerWidth < 1024 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const handleDownloadPDF = () => {
    if (result) {
      generateDaycarePDF(result)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with PDF Download Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calculateur de Frais de Garde</h2>
          <p className="text-sm text-gray-600">Comparez les coûts CPE vs garderie privée avec crédit d'impôt</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!result}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm group"
          title={!result ? "Calculez d'abord pour télécharger" : "Télécharger le rapport en PDF"}
        >
          <svg className="w-5 h-5 group-disabled:animate-none group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Télécharger PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Input Form */}
        <div className="lg:col-span-1 space-y-6 order-2 lg:order-none">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h3>
          
          <div className="space-y-5">
            {/* Family Income */}
            <div>
              <label htmlFor="familyIncome" className="block text-sm font-semibold text-gray-700 mb-2">
                Revenu familial annuel
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="familyIncome"
                  type="number"
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(e.target.value)}
                  placeholder="100000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Utilisé pour calculer le crédit d'impôt
              </p>
            </div>

            {/* Private Daily Rate */}
            <div>
              <label htmlFor="privateDailyRate" className="block text-sm font-semibold text-gray-700 mb-2">
                Tarif journalier (Garderie privée)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="privateDailyRate"
                  type="number"
                  step="0.01"
                  value={privateDailyRate}
                  onChange={(e) => setPrivateDailyRate(e.target.value)}
                  placeholder="50.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Days Per Year */}
            <div>
              <label htmlFor="daysPerYear" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de jours par année
              </label>
              <input
                id="daysPerYear"
                type="number"
                value={daysPerYear}
                onChange={(e) => setDaysPerYear(e.target.value)}
                placeholder="260"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Typiquement 260 jours (52 semaines × 5 jours)
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Comparer les coûts
            </button>
          </div>
        </div>


      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2 order-1 lg:order-none" ref={resultsRef}>
        {result ? (
          <div className="space-y-6">
            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* CPE Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-bold">CPE (Subventionné)</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-blue-100 mb-1">Coût net par jour</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.cpeDailyRate)}</p>
                </div>
                <div className="pt-4 border-t border-blue-400">
                  <p className="text-sm text-blue-100">Coût annuel</p>
                  <p className="text-2xl font-semibold">{formatCurrency(result.cpeAnnualCost)}</p>
                </div>
              </div>

              {/* Private Card */}
              <div className={`rounded-xl shadow-lg p-6 text-white ${
                result.isPrivateCompetitive 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <h3 className="text-xl font-bold">Garderie Privée</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm opacity-90 mb-1">Coût net par jour (après crédit)</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.privateNetDailyCost)}</p>
                </div>
                <div className="pt-4 border-t border-white/30">
                  <p className="text-sm opacity-90">Coût annuel net</p>
                  <p className="text-2xl font-semibold">{formatCurrency(result.privateNetAnnualCost)}</p>
                </div>
                {result.isPrivateCompetitive && (
                  <div className="mt-3 bg-white/20 rounded-lg p-2 text-center">
                    <p className="text-sm font-semibold">✓ Compétitif avec CPE</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tax Credit Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Retour d'impôt anticipé</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {formatCurrency(result.taxCreditAmount)}
                  </p>
                  <p className="text-sm text-gray-700">
                    Avec un revenu familial de {formatCurrency(result.familyIncome)}, 
                    vous recevrez un crédit d'impôt de <strong>{formatPercentage(result.taxCreditPercentage)}</strong> sur 
                    vos frais de garde en garderie privée.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails de la comparaison</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Tarif journalier privé (avant crédit)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.privateDailyRate)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Coût annuel privé (avant crédit)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.privateAnnualCostBeforeCredit)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Crédit d'impôt ({formatPercentage(result.taxCreditPercentage)})</span>
                  <span className="font-semibold text-green-600">-{formatCurrency(result.taxCreditAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-purple-50 -mx-6 px-6 mt-2">
                  <span className="text-gray-900 font-bold">Coût net privé (après crédit)</span>
                  <span className="font-bold text-purple-600 text-lg">{formatCurrency(result.privateNetAnnualCost)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6">
                  <span className="text-gray-900 font-bold">Coût CPE</span>
                  <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.cpeAnnualCost)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                  <span className="text-gray-900 font-bold">Différence annuelle</span>
                  <span className={`font-bold text-lg ${
                    result.annualDifference > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {result.annualDifference > 0 ? '+' : ''}{formatCurrency(result.annualDifference)}
                  </span>
                </div>
              </div>
            </div>

            {/* Affiliate Card - REEE (Only shown after calculation) */}
            <AffiliateCard variant="education" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez vos informations
            </h3>
            <p className="text-gray-500">
              Comparez les coûts entre CPE et garderie privée
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

