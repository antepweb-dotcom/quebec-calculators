'use client'

import { useState } from 'react'
import { calculateDebtPayoff, formatCurrency, formatTimeToPayoff, DebtCalculationResult } from '@/utils/debtLogic'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import AffiliateCard from '@/components/AffiliateCard'

export default function DebtCalculator() {
  const [balance, setBalance] = useState<string>('5000')
  const [interestRate, setInterestRate] = useState<string>('19.99')
  const [monthlyPayment, setMonthlyPayment] = useState<string>('250')
  const [results, setResults] = useState<DebtCalculationResult | null>(null)

  const handleCalculate = () => {
    const numericBalance = parseFloat(balance)
    const numericRate = parseFloat(interestRate)
    const numericPayment = parseFloat(monthlyPayment)

    if (isNaN(numericBalance) || numericBalance <= 0) {
      alert('Veuillez entrer un solde valide')
      return
    }

    if (isNaN(numericRate) || numericRate < 0 || numericRate > 100) {
      alert('Veuillez entrer un taux d\'intérêt valide (0-100%)')
      return
    }

    if (isNaN(numericPayment) || numericPayment <= 0) {
      alert('Veuillez entrer un paiement mensuel valide')
      return
    }

    const calculatedResults = calculateDebtPayoff(numericBalance, numericRate, numericPayment)
    setResults(calculatedResults)
  }

  const years = results ? Math.floor(results.monthsToPayoff / 12) : 0
  const months = results ? results.monthsToPayoff % 12 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Input Section (Span 4) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-2">
                Solde actuel
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  id="balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
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
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="19.99"
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700 mb-2">
                Paiement mensuel
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  id="monthlyPayment"
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="250"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Calculer le remboursement
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results Section (Span 8, Sticky) */}
      <div className="lg:col-span-8">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          {results ? (
            results.isPayoffPossible ? (
              <div className="space-y-6">
                {/* Main Result Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Temps pour être libre de dettes
                </h2>
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                    {formatTimeToPayoff(years, months)}
                  </div>
                  <p className="text-gray-600 text-lg">
                    pour rembourser {formatCurrency(results.balance)}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Paiement mensuel</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Nombre de paiements</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.monthsToPayoff} mois
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Montant total payé</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(results.totalAmountPaid)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Taux d'intérêt</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.interestRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

                {/* The "Ouch" Box */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-red-900 mb-2">
                      Coût réel de votre dette
                    </h3>
                    <p className="text-lg text-red-800 mb-4">
                      Vous paierez <span className="text-3xl font-bold">{formatCurrency(results.totalInterestPaid)}</span> en intérêts inutiles !
                    </p>
                    <p className="text-sm text-red-700">
                      C'est {((results.totalInterestPaid / results.balance) * 100).toFixed(0)}% de plus que votre solde initial.
                    </p>
                  </div>
                </div>
              </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Répartition du remboursement
                </h3>
                <div className="max-w-md mx-auto">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: results.balance, color: '#3b82f6' },
                          { name: 'Intérêts', value: results.totalInterestPaid, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-700">Principal</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(results.balance)}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-700">Intérêts</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(results.totalInterestPaid)}</p>
                  </div>
                </div>
                </div>
              </div>
            ) : (
              // Warning when payment is too low
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-red-900 mb-4">
                  ⚠️ Paiement insuffisant
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  {results.warningMessage}
                </p>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-left">
                  <p className="text-gray-800 mb-4">
                    Avec un taux d'intérêt de <strong>{results.interestRate}%</strong>, 
                    les intérêts mensuels sur {formatCurrency(results.balance)} sont d'environ{' '}
                    <strong>{formatCurrency(results.balance * (results.interestRate / 100 / 12))}</strong>.
                  </p>
                  <p className="text-gray-800">
                    Votre paiement de <strong>{formatCurrency(results.monthlyPayment)}</strong> ne couvre même pas les intérêts. 
                    Augmentez votre paiement mensuel pour commencer à réduire votre dette.
                  </p>
                </div>
              </div>
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez vos informations pour commencer
            </h3>
            <p className="text-gray-500">
              Découvrez combien de temps il vous faudra pour rembourser votre dette
            </p>
            </div>
          )}

          {/* Affiliate Card - Balance Transfer (Only shown after calculation) */}
          {results && (
            <div className="mt-6">
              <AffiliateCard
                title="Économisez des milliers en intérêts"
                description="Transférez votre solde vers une carte de crédit à 0% d'intérêt pendant 12-18 mois. Remboursez votre dette plus rapidement sans payer d'intérêts supplémentaires."
                buttonText="Comparer les cartes 0% APR"
                link="https://www.ratehub.ca/credit-cards/balance-transfer"
                theme="blue"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
