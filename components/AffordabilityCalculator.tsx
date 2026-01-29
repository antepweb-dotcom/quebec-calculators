'use client'

import { useState, useRef } from 'react'
import { calculateAffordability, formatCurrency, formatPercent, AffordabilityResult } from '@/utils/affordabilityLogic'
import { generateAffordabilityPDF } from '@/utils/pdfGenerator'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>('80000')
  const [monthlyDebts, setMonthlyDebts] = useState<string>('500')
  const [downPayment, setDownPayment] = useState<string>('50000')
  const [interestRate, setInterestRate] = useState<string>('5.5')
  const [results, setResults] = useState<AffordabilityResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const numericIncome = parseFloat(annualIncome)
    const numericDebts = parseFloat(monthlyDebts)
    const numericDown = parseFloat(downPayment)
    const numericRate = parseFloat(interestRate)

    if (isNaN(numericIncome) || numericIncome <= 0) {
      alert('Veuillez entrer un revenu valide')
      return
    }

    if (isNaN(numericDebts) || numericDebts < 0) {
      alert('Veuillez entrer un montant de dettes valide')
      return
    }

    if (isNaN(numericDown) || numericDown < 0) {
      alert('Veuillez entrer une mise de fonds valide')
      return
    }

    if (isNaN(numericRate) || numericRate < 0 || numericRate > 20) {
      alert('Veuillez entrer un taux d\'intérêt valide (0-20%)')
      return
    }

    const calculatedResults = calculateAffordability(numericIncome, numericDebts, numericDown, numericRate)
    setResults(calculatedResults)

    // Auto-scroll to results on mobile
    if (window.innerWidth < 1024 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const handleDownloadPDF = () => {
    if (results) {
      generateAffordabilityPDF(results)
    }
  }

  // Calculate gauge position (0-100)
  const getGaugePosition = () => {
    if (!results) return 50
    // Map home price from 0 to 1M as 0-100
    return Math.min((results.maxHomePrice / 1000000) * 100, 100)
  }

  const getGaugeColor = () => {
    const position = getGaugePosition()
    if (position < 30) return '#ef4444' // red
    if (position < 60) return '#f59e0b' // orange
    return '#10b981' // green
  }

  return (
    <div className="space-y-6">
      {/* Header with PDF Download Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calculateur de Capacité d'Emprunt</h2>
          <p className="text-sm text-gray-600">Découvrez combien vous pouvez emprunter pour votre maison</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!results}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm group"
          title={!results ? "Calculez d'abord pour télécharger" : "Télécharger le rapport en PDF"}
        >
          <svg className="w-5 h-5 group-disabled:animate-none group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Télécharger PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Input Section */}
      <div className="lg:col-span-1 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Revenu annuel brut (vous + partenaire)
              </label>
              <div className="relative">
                <input
                  id="annualIncome"
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="80000"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label htmlFor="monthlyDebts" className="block text-sm font-medium text-gray-700 mb-2">
                Dettes mensuelles (cartes, prêts auto)
              </label>
              <div className="relative">
                <input
                  id="monthlyDebts"
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                  placeholder="500"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$/mois</span>
              </div>
            </div>

            <div>
              <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-2">
                Mise de fonds disponible
              </label>
              <div className="relative">
                <input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                Taux d'intérêt estimé
              </label>
              <div className="relative">
                <input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="5.5"
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Calculer ma capacité
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results Section */}
      <div className="lg:col-span-2 order-1 lg:order-none" ref={resultsRef}>
        {results ? (
          <div className="space-y-6">
            {/* Main Result Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Votre pouvoir d'achat immobilier
              </h2>
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600 mb-2">
                  Vous pouvez acheter une maison de
                </p>
                <div className="text-6xl md:text-7xl font-bold text-purple-600 mb-4">
                  {formatCurrency(results.maxHomePrice)}
                </div>
                <p className="text-gray-600">
                  avec une mise de fonds de {formatCurrency(results.downPayment)}
                </p>
              </div>

              {/* Gauge Chart */}
              <div className="mb-8">
                <div className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-500"
                    style={{ left: `${getGaugePosition()}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-lg">
                      <span className="text-sm font-bold" style={{ color: getGaugeColor() }}>
                        {formatCurrency(results.maxHomePrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0 $</span>
                  <span>500 000 $</span>
                  <span>1 000 000 $</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Prêt hypothécaire maximum</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(results.maxLoanAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Paiement mensuel maximum</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(results.maxMonthlyPayment)}
                  </p>
                </div>
              </div>
            </div>

            {/* Ratios Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Vos ratios d'endettement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* GDS Ratio */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Ratio ABD (GDS)</span>
                    <span className={`text-lg font-bold ${results.gdsRatio <= 39 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(results.gdsRatio)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${results.gdsRatio <= 39 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(results.gdsRatio / 39 * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum recommandé: 39%</p>
                </div>

                {/* TDS Ratio */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Ratio ATD (TDS)</span>
                    <span className={`text-lg font-bold ${results.tdsRatio <= 44 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(results.tdsRatio)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${results.tdsRatio <= 44 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(results.tdsRatio / 44 * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum recommandé: 44%</p>
                </div>
              </div>

              {results.isAffordable ? (
                <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Excellent ! Vos ratios respectent les normes bancaires.
                  </p>
                </div>
              ) : (
                <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Attention : Vos ratios dépassent les limites recommandées.
                  </p>
                </div>
              )}
            </div>

            {/* Breakdown Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                💡 Détails du calcul
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between pb-2 border-b">
                  <span>Revenu mensuel brut</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyIncome)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Dettes mensuelles</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyDebts)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Taux d'intérêt</span>
                  <span className="font-semibold">{results.interestRate}%</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Mise de fonds</span>
                  <span className="font-semibold">{formatCurrency(results.downPayment)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold">Prix maximum de la maison</span>
                  <span className="font-bold text-purple-600 text-xl">{formatCurrency(results.maxHomePrice)}</span>
                </div>
              </div>
            </div>

            {/* Affiliate Card - Mortgage Context */}
            <AffiliateCard variant="mortgage" />

            {/* Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📚 Bon à savoir
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Ce calcul est basé sur une amortissement de 25 ans.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Les banques utilisent le taux de qualification (stress test) qui peut être plus élevé.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Une mise de fonds de moins de 20% nécessite une assurance prêt hypothécaire (SCHL).</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Consultez un courtier hypothécaire pour une évaluation précise de votre situation.</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Découvrez votre capacité d'emprunt
            </h3>
            <p className="text-gray-500">
              Entrez vos informations pour voir combien vous pouvez emprunter
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

