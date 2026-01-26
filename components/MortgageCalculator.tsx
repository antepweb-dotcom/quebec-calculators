'use client'

import { useState } from 'react'
import { calculateMortgage, MortgageInputs, MortgageResult, PaymentFrequency, AmortizationYears, formatCurrency, getFrequencyLabel } from '@/utils/mortgageLogic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('400000')
  const [interestRate, setInterestRate] = useState<string>('4.79')
  const [amortizationYears, setAmortizationYears] = useState<AmortizationYears>(25)
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly')
  const [stressTestEnabled, setStressTestEnabled] = useState<boolean>(false)
  const [result, setResult] = useState<MortgageResult | null>(null)

  const handleCalculate = () => {
    const loan = parseFloat(loanAmount)
    const rate = parseFloat(interestRate)
    
    if (isNaN(loan) || loan <= 0) {
      alert('Veuillez entrer un montant de prêt valide')
      return
    }
    
    if (isNaN(rate) || rate < 0) {
      alert('Veuillez entrer un taux d\'intérêt valide')
      return
    }

    const inputs: MortgageInputs = {
      loanAmount: loan,
      interestRate: rate,
      amortizationYears,
      paymentFrequency,
    }

    const calculatedResult = calculateMortgage(inputs, stressTestEnabled)
    setResult(calculatedResult)
  }

  // Recalculate when stress test toggle changes
  const handleStressTestToggle = (enabled: boolean) => {
    setStressTestEnabled(enabled)
    
    // If we have existing results, recalculate with new stress test setting
    if (result) {
      const inputs: MortgageInputs = {
        loanAmount: result.loanAmount,
        interestRate: result.interestRate,
        amortizationYears: result.amortizationYears as AmortizationYears,
        paymentFrequency: result.paymentFrequency,
      }
      const recalculated = calculateMortgage(inputs, enabled)
      setResult(recalculated)
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du prêt</h2>
          
          <div className="space-y-5">
            {/* Loan Amount */}
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                Montant du prêt
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="400000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-700 mb-2">
                Taux d'intérêt annuel (%)
              </label>
              <input
                id="interestRate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="4.79"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Amortization */}
            <div>
              <label htmlFor="amortization" className="block text-sm font-semibold text-gray-700 mb-2">
                Période d'amortissement
              </label>
              <select
                id="amortization"
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(parseInt(e.target.value) as AmortizationYears)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={15}>15 ans</option>
                <option value={20}>20 ans</option>
                <option value={25}>25 ans</option>
                <option value={30}>30 ans</option>
              </select>
            </div>

            {/* Payment Frequency */}
            <div>
              <label htmlFor="frequency" className="block text-sm font-semibold text-gray-700 mb-2">
                Fréquence de paiement
              </label>
              <select
                id="frequency"
                value={paymentFrequency}
                onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">Mensuel</option>
                <option value="biweekly">Aux deux semaines</option>
              </select>
            </div>

            {/* Stress Test Toggle */}
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Simulation de hausse de taux</span>
                  <p className="text-xs text-gray-500 mt-1">Tester avec +2% de taux</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={stressTestEnabled}
                    onChange={(e) => handleStressTestToggle(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => handleStressTestToggle(!stressTestEnabled)}
                    className={`w-14 h-8 rounded-full transition-colors ${
                      stressTestEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        stressTestEnabled ? 'translate-x-7 ml-1' : 'translate-x-1'
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
              Calculer les paiements
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
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-medium mb-4 opacity-90">Votre Paiement Hypothécaire</h2>
              <p className="text-6xl md:text-7xl font-bold mb-6">
                {formatCurrency(result.paymentAmount)}
              </p>
              <p className="text-xl text-blue-100 mb-2">
                {getFrequencyLabel(result.paymentFrequency)}
              </p>
              <p className="text-lg text-blue-100">
                Sur {result.amortizationYears} ans à {result.interestRate}%
              </p>
              
              {/* Stress Test Result - Inline */}
              {stressTestEnabled && result.stressTestPayment && result.stressTestIncrease && (
                <div className="mt-6 pt-6 border-t border-blue-400">
                  <p className="text-sm text-blue-100 mb-2">Test de résistance (+2%)</p>
                  <p className="text-3xl font-bold text-red-300">
                    {formatCurrency(result.stressTestPayment)}
                  </p>
                  <p className="text-lg text-red-200 mt-1">
                    (+{formatCurrency(result.stressTestIncrease)})
                  </p>
                </div>
              )}
            </div>

            {/* Summary Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Résumé du prêt</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Montant emprunté</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Total des paiements</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.totalPayments)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Total des intérêts</span>
                  <span className="font-semibold text-red-600">{formatCurrency(result.totalInterest)}</span>
                </div>
              </div>
            </div>

            {/* Principal vs Interest Chart - Improved */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Principal vs Intérêts au fil du temps</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={result.balanceOverTime}>
                  <defs>
                    <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Années', position: 'insideBottom', offset: -5 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Solde ($)', angle: -90, position: 'insideLeft' }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Année ${label}`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#colorPrincipal)"
                    name="Solde restant"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Au début, la majorité de votre paiement va vers les intérêts. Avec le temps, plus d'argent rembourse le capital.
              </p>
            </div>

            {/* Mortgage Rate Comparison CTA */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">Comparez les taux hypothécaires du jour</h3>
                  </div>
                  <p className="text-gray-700 text-lg mb-2">
                    Trouvez le meilleur taux pour économiser des milliers de dollars
                  </p>
                  <p className="text-gray-600">
                    Comparez gratuitement les offres de plusieurs prêteurs en quelques minutes
                  </p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap text-lg shadow-lg hover:shadow-xl">
                  Voir les taux (Gratuit)
                </button>
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
              Entrez les paramètres de votre prêt
            </h3>
            <p className="text-gray-500">
              Les résultats apparaîtront ici après le calcul
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
