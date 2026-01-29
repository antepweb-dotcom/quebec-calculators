'use client'

import { useState, useRef } from 'react'
import { calculateRetirementSavings, RetirementInputs, RetirementResult, formatCurrency, formatPercentage } from '@/utils/retirementLogic'
import { generateRetirementPDF } from '@/utils/pdfGenerator'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30')
  const [retirementAge, setRetirementAge] = useState<string>('65')
  const [currentSavings, setCurrentSavings] = useState<string>('10000')
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500')
  const [expectedReturn, setExpectedReturn] = useState<string>('7')
  const [result, setResult] = useState<RetirementResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const age = parseInt(currentAge)
    const retAge = parseInt(retirementAge)
    const savings = parseFloat(currentSavings)
    const contribution = parseFloat(monthlyContribution)
    const returnRate = parseFloat(expectedReturn)
    
    if (isNaN(age) || age < 18 || age > 100) {
      alert('Veuillez entrer un âge actuel valide (18-100)')
      return
    }
    
    if (isNaN(retAge) || retAge <= age) {
      alert('L\'âge de retraite doit être supérieur à votre âge actuel')
      return
    }
    
    if (isNaN(savings) || savings < 0) {
      alert('Veuillez entrer une épargne actuelle valide')
      return
    }
    
    if (isNaN(contribution) || contribution < 0) {
      alert('Veuillez entrer une contribution mensuelle valide')
      return
    }
    
    if (isNaN(returnRate) || returnRate < 0 || returnRate > 20) {
      alert('Veuillez entrer un rendement espéré valide (0-20%)')
      return
    }

    const inputs: RetirementInputs = {
      currentAge: age,
      retirementAge: retAge,
      currentSavings: savings,
      monthlyContribution: contribution,
      expectedReturn: returnRate,
    }

    const calculatedResult = calculateRetirementSavings(inputs)
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
      generateRetirementPDF(result)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with PDF Download Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calculateur d'Épargne Retraite</h2>
          <p className="text-sm text-gray-600">Planifiez votre retraite et voyez votre épargne croître</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!result}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm group"
          title={!result ? "Calculez d'abord pour télécharger" : "Télécharger le plan en PDF"}
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
            <h3 className="text-xl font-bold text-gray-900 mb-6">Vos paramètres</h3>
          
          <div className="space-y-5">
            {/* Current Age */}
            <div>
              <label htmlFor="currentAge" className="block text-sm font-semibold text-gray-700 mb-2">
                Âge actuel
              </label>
              <input
                id="currentAge"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Retirement Age */}
            <div>
              <label htmlFor="retirementAge" className="block text-sm font-semibold text-gray-700 mb-2">
                Âge de retraite
              </label>
              <input
                id="retirementAge"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                placeholder="65"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Current Savings */}
            <div>
              <label htmlFor="currentSavings" className="block text-sm font-semibold text-gray-700 mb-2">
                Épargne actuelle
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="10000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-semibold text-gray-700 mb-2">
                Contribution mensuelle
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="500"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Expected Return */}
            <div>
              <label htmlFor="expectedReturn" className="block text-sm font-semibold text-gray-700 mb-2">
                Rendement espéré (%)
              </label>
              <input
                id="expectedReturn"
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                placeholder="7"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Historiquement, les marchés boursiers retournent ~7% annuellement
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer ma retraite
            </button>
          </div>
        </div>


      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2 order-1 lg:order-none" ref={resultsRef}>
        {result ? (
          <div className="space-y-6">
            {/* Dream Number */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-10 text-white text-center">
              <h2 className="text-2xl font-medium mb-3 opacity-90">Votre épargne à la retraite</h2>
              <p className="text-7xl font-bold mb-4">
                {formatCurrency(result.totalAtRetirement)}
              </p>
              <p className="text-2xl text-green-100">
                À l'âge de {result.retirementAge} ans
              </p>
              <div className="mt-6 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-lg">
                  Dans <strong>{result.yearsUntilRetirement} ans</strong>, vous aurez accumulé cette somme!
                </p>
              </div>
            </div>

            {/* Power of Compound Interest */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Le pouvoir des intérêts composés</h3>
                  <p className="text-blue-800 text-lg leading-relaxed">
                    Vous aurez investi <strong className="text-2xl text-blue-600">{formatCurrency(result.totalContributions)}</strong>, 
                    mais les intérêts vous donneront <strong className="text-2xl text-green-600">{formatCurrency(result.totalInterestEarned)}</strong>!
                  </p>
                  <p className="text-blue-700 mt-2">
                    C'est {((result.totalInterestEarned / result.totalContributions) * 100).toFixed(0)}% de plus que ce que vous avez investi.
                  </p>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Croissance de votre épargne</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={result.growthOverTime}>
                  <defs>
                    <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="age" 
                    label={{ value: 'Âge', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Valeur ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Âge ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="totalContributions" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="url(#colorContributions)"
                    name="Capital investi"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalInterest" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="url(#colorInterest)"
                    name="Intérêts gagnés"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Épargne actuelle</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.currentSavings)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Contribution mensuelle</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.monthlyContribution)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Rendement annuel</span>
                  <span className="font-semibold text-gray-900">{formatPercentage(result.expectedReturn)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Années jusqu'à la retraite</span>
                  <span className="font-semibold text-gray-900">{result.yearsUntilRetirement} ans</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 mt-2">
                  <span className="text-gray-900 font-bold">Total investi</span>
                  <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.totalContributions)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 -mx-6 px-6">
                  <span className="text-gray-900 font-bold">Intérêts gagnés</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(result.totalInterestEarned)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-emerald-50 -mx-6 px-6 border-t-2 border-emerald-300">
                  <span className="text-gray-900 font-bold text-lg">Total à la retraite</span>
                  <span className="font-bold text-emerald-600 text-2xl">{formatCurrency(result.totalAtRetirement)}</span>
                </div>
              </div>
            </div>

            {/* Affiliate Card - Tax Context */}
            <AffiliateCard variant="tax" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Planifiez votre retraite
            </h3>
            <p className="text-gray-500">
              Entrez vos informations pour voir combien vous aurez à la retraite
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

