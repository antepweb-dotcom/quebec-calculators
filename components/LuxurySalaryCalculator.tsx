'use client'

import { useState } from 'react'
import { calculateTaxes, formatCurrency } from '@/utils/taxLogic'
import InteractiveDonutChart from './ui/InteractiveDonutChart'

interface LuxurySalaryCalculatorProps {
  initialIncome: number
}

type PayPeriod = 'annual' | 'monthly' | 'biweekly'

export default function LuxurySalaryCalculator({ initialIncome }: LuxurySalaryCalculatorProps) {
  const [income, setIncome] = useState(initialIncome.toString())
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('annual')
  
  const numericIncome = parseFloat(income) || 0
  
  // Convert to annual based on pay period
  const annualIncome = 
    payPeriod === 'annual' ? numericIncome :
    payPeriod === 'monthly' ? numericIncome * 12 :
    numericIncome * 26 // biweekly

  const results = calculateTaxes(annualIncome)

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Calculateur Interactif
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Calculez Votre Salaire Net
        </h2>
        <p className="text-slate-600">
          Entrez votre revenu et découvrez instantanément votre salaire net après impôts
        </p>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Income Input */}
        <div>
          <label htmlFor="income-input" className="block text-sm font-semibold text-slate-700 mb-3">
            Votre Revenu Brut
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              id="income-input"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-2xl font-bold border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="50000"
            />
          </div>
        </div>

        {/* Pay Period Toggle */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Fréquence de Paie
          </label>
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setPayPeriod('annual')}
              className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'annual'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annuel
            </button>
            <button
              onClick={() => setPayPeriod('monthly')}
              className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'monthly'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPayPeriod('biweekly')}
              className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'biweekly'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bi-hebdo
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {numericIncome > 0 ? (
        <div className="space-y-8">
          {/* Big Result */}
          <div className="text-center py-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
            <div className="text-sm font-semibold text-emerald-700 mb-2">
              REVENU NET ANNUEL
            </div>
            <div className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
              {formatCurrency(results.netIncome)}
            </div>
            <div className="text-slate-600 text-lg">
              sur {formatCurrency(results.grossIncome)} brut
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <div className="text-xs text-slate-500 font-medium mb-1">Mensuel</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 12)}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <div className="text-xs text-slate-500 font-medium mb-1">Aux 2 sem.</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 26)}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
              <div className="text-xs text-slate-500 font-medium mb-1">Hebdo</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 52)}
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
              <div className="text-xs text-red-600 font-medium mb-1">Déductions</div>
              <div className="text-xl font-bold text-red-700">
                {formatCurrency(results.totalDeductions)}
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Répartition Interactive de Votre Revenu
            </h3>
            <InteractiveDonutChart
              netIncome={results.netIncome}
              federalTax={results.federalTax}
              provincialTax={results.provincialTax}
              qpp={results.qpp}
              qpip={results.qpip}
              ei={results.ei}
            />
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Détail des Déductions</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="font-semibold text-slate-900">Impôt Provincial (QC)</div>
                  <div className="text-xs text-slate-500">
                    {((results.provincialTax / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(results.provincialTax)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="font-semibold text-slate-900">Impôt Fédéral</div>
                  <div className="text-xs text-slate-500">
                    {((results.federalTax / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="text-lg font-bold text-indigo-600">
                  {formatCurrency(results.federalTax)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="font-semibold text-slate-900">RRQ (Régime de rentes)</div>
                  <div className="text-xs text-slate-500">
                    {((results.qpp / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="text-lg font-bold text-amber-600">
                  {formatCurrency(results.qpp)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="font-semibold text-slate-900">RQAP (Assurance parentale)</div>
                  <div className="text-xs text-slate-500">
                    {((results.qpip / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="text-lg font-bold text-pink-600">
                  {formatCurrency(results.qpip)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-900">AE (Assurance-emploi)</div>
                  <div className="text-xs text-slate-500">
                    {((results.ei / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(results.ei)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Entrez votre revenu
          </h3>
          <p className="text-slate-600 text-sm">
            Saisissez un montant ci-dessus pour voir votre salaire net et la répartition détaillée
          </p>
        </div>
      )}
    </div>
  )
}
