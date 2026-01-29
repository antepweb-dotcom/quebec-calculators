'use client'

import { useState, useRef } from 'react'
import { calculateStudentLoan, formatCurrency, formatCurrencyDetailed, formatYearsMonths, StudentLoanResult } from '@/utils/studentLoanLogic'
import { generateStudentLoanPDF } from '@/utils/pdfGenerator'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function StudentLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('15000')
  const [interestRate, setInterestRate] = useState<string>('7.2')
  const [termMonths, setTermMonths] = useState<string>('114')
  const [results, setResults] = useState<StudentLoanResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const numericLoan = parseFloat(loanAmount)
    const numericRate = parseFloat(interestRate)
    const numericTerm = parseInt(termMonths)

    if (isNaN(numericLoan) || numericLoan <= 0) {
      alert('Veuillez entrer un montant de prêt valide')
      return
    }

    if (isNaN(numericRate) || numericRate < 0 || numericRate > 30) {
      alert('Veuillez entrer un taux d\'intérêt valide (0-30%)')
      return
    }

    if (isNaN(numericTerm) || numericTerm <= 0 || numericTerm > 360) {
      alert('Veuillez entrer une durée valide (1-360 mois)')
      return
    }

    const calculatedResults = calculateStudentLoan(numericLoan, numericRate, numericTerm)
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
      generateStudentLoanPDF(results)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with PDF Download Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calculateur de Prêt Étudiant</h2>
          <p className="text-sm text-gray-600">Planifiez le remboursement de votre prêt étudiant</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!results}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm group"
          title={!results ? "Calculez d'abord pour télécharger" : "Télécharger le plan en PDF"}
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
            <h3 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Dette totale
              </label>
              <div className="relative">
                <input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="15000"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                Taux d'intérêt annuel
              </label>
              <div className="relative">
                <input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="7.2"
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Taux standard AFE Québec : ~7.2%
              </p>
            </div>

            <div>
              <label htmlFor="termMonths" className="block text-sm font-medium text-gray-700 mb-2">
                Durée de remboursement (mois)
              </label>
              <input
                id="termMonths"
                type="number"
                value={termMonths}
                onChange={(e) => setTermMonths(e.target.value)}
                placeholder="114"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Standard : 114 mois (9.5 ans)
              </p>
              
              {/* Quick buttons */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  onClick={() => setTermMonths('60')}
                  className={`py-2 px-2 text-sm rounded-lg font-semibold transition-all ${
                    termMonths === '60'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  5 ans
                </button>
                <button
                  onClick={() => setTermMonths('114')}
                  className={`py-2 px-2 text-sm rounded-lg font-semibold transition-all ${
                    termMonths === '114'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  9.5 ans
                </button>
                <button
                  onClick={() => setTermMonths('180')}
                  className={`py-2 px-2 text-sm rounded-lg font-semibold transition-all ${
                    termMonths === '180'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  15 ans
                </button>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Calculer mes paiements
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
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-5xl">🎓</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  Votre paiement mensuel
                </h2>
              </div>
              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl font-bold text-indigo-600 mb-2">
                  {formatCurrency(results.monthlyPayment)}
                </div>
                <p className="text-gray-600 text-lg">
                  par mois pendant {formatYearsMonths(results.termMonths)}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Montant du prêt</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(results.loanAmount)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Taux d'intérêt</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.interestRate}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Durée</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatYearsMonths(results.termMonths)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total à payer</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(results.totalAmountPaid)}
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Credit Card - Highlighted */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Bonne nouvelle : Crédit d'impôt !
                  </h3>
                  <p className="text-lg text-green-800 mb-4">
                    Grâce au crédit d'impôt québécois, vous récupérerez environ{' '}
                    <span className="text-3xl font-bold">{formatCurrency(results.taxCreditOnInterest)}</span>{' '}
                    sur les intérêts payés
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>💡 Comment ça marche ?</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Le crédit d'impôt sur les intérêts de prêt étudiant vous permet de récupérer environ{' '}
                      <strong>{results.taxCreditPercentage}%</strong> des intérêts payés. Cela réduit le coût réel 
                      de vos intérêts de {formatCurrency(results.totalInterestPaid)} à{' '}
                      <strong>{formatCurrency(results.effectiveInterestCost)}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Breakdown Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                📊 Répartition des coûts
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b-2">
                  <span className="text-gray-700">Capital (prêt initial)</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(results.loanAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b-2">
                  <span className="text-gray-700">Intérêts totaux</span>
                  <span className="text-xl font-bold text-red-600">{formatCurrency(results.totalInterestPaid)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b-2 bg-green-50 -mx-4 px-4 py-2 rounded">
                  <span className="text-gray-700">Crédit d'impôt (~{results.taxCreditPercentage}%)</span>
                  <span className="text-xl font-bold text-green-600">-{formatCurrency(results.taxCreditOnInterest)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b-2">
                  <span className="text-gray-700 font-semibold">Coût réel des intérêts</span>
                  <span className="text-xl font-bold text-orange-600">{formatCurrency(results.effectiveInterestCost)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-3">
                  <span className="text-lg font-bold text-gray-900">Total à payer</span>
                  <span className="text-2xl font-bold text-indigo-600">{formatCurrency(results.totalAmountPaid)}</span>
                </div>
              </div>

              <div className="mt-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-800 text-center">
                  <strong>💡 Astuce :</strong> Le coût réel de votre prêt est de{' '}
                  {formatCurrency(results.loanAmount + results.effectiveInterestCost)} après crédit d'impôt
                </p>
              </div>
            </div>

            {/* Payment Schedule Preview */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📅 Aperçu du calendrier
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between pb-2 border-b">
                  <span>Paiement mensuel</span>
                  <span className="font-semibold">{formatCurrencyDetailed(results.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Nombre de paiements</span>
                  <span className="font-semibold">{results.termMonths} mois</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Durée totale</span>
                  <span className="font-semibold">{formatYearsMonths(results.termMonths)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Premier paiement</span>
                  <span className="font-semibold">6 mois après la fin des études</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold">Dernier paiement</span>
                  <span className="font-bold text-indigo-600">
                    {new Date(Date.now() + results.termMonths * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📚 Bon à savoir
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Le remboursement commence 6 mois après la fin de vos études.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Vous pouvez demander une révision de vos paiements si votre situation financière change.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Le Programme d'aide au remboursement (PAR) peut réduire vos paiements mensuels.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Aucune pénalité pour remboursement anticipé - payez plus quand vous le pouvez !</span>
                </p>
              </div>
            </div>

            {/* Affiliate Card - Student Savings (Only shown after calculation) */}
            <AffiliateCard variant="education" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <div className="text-6xl mb-4">🎓</div>
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Calculez votre prêt étudiant
            </h3>
            <p className="text-gray-500">
              Entrez le montant de votre prêt pour voir vos paiements mensuels et vos économies d'impôt
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

