'use client'

import { useState } from 'react'
import { calculateTaxes, formatCurrency } from '@/utils/taxLogic'
import InteractiveDonutChart from './ui/InteractiveDonutChart'

interface LuxurySalaryCalculatorProps {
  initialIncome: number
}

type PayPeriod = 'annual' | 'monthly' | 'biweekly' | 'weekly'

export default function LuxurySalaryCalculator({ initialIncome }: LuxurySalaryCalculatorProps) {
  const [income, setIncome] = useState(initialIncome.toString())
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('annual')
  const [useFTQ, setUseFTQ] = useState(false)
  
  const numericIncome = parseFloat(income) || 0
  
  // Convert to annual based on pay period
  const annualIncome = 
    payPeriod === 'annual' ? numericIncome :
    payPeriod === 'monthly' ? numericIncome * 12 :
    payPeriod === 'biweekly' ? numericIncome * 26 :
    numericIncome * 52 // weekly

  const results = calculateTaxes(annualIncome)
  
  // RRSP calculations
  const rrspLimit = Math.min(annualIncome * 0.18, 31560) // 2026 limit
  const rrspContribution = Math.min(5000, rrspLimit) // Max FTQ contribution
  
  // FTQ/Fondaction calculations
  const ftqTaxCredit = useFTQ ? rrspContribution * 0.30 : 0 // 30% tax credit
  const rrspTaxSavings = rrspContribution * (results.totalDeductions / results.grossIncome) // Approximate marginal rate
  const totalTaxSavings = rrspTaxSavings + ftqTaxCredit
  const realCost = rrspContribution - totalTaxSavings
  
  // Check if income is in highest tax bracket (2027 rule change warning)
  const isHighIncome = annualIncome >= 119910 // Approximate 2026 highest bracket threshold

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
          <div className="grid grid-cols-2 gap-2.5 p-1">
            <button
              onClick={() => setPayPeriod('annual')}
              className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'annual'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Annuel
            </button>
            <button
              onClick={() => setPayPeriod('monthly')}
              className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPayPeriod('biweekly')}
              className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'biweekly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Bi-hebdo
            </button>
            <button
              onClick={() => setPayPeriod('weekly')}
              className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                payPeriod === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Hebdo
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

          {/* RRSP/FTQ Optimization Card */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-lg mb-1">
                  💰 Optimisez avec un REER
                </h4>
                <p className="text-sm text-amber-800">
                  Réduisez vos impôts en cotisant à un REER. Limite annuelle : {formatCurrency(rrspLimit)}
                </p>
              </div>
            </div>

            {/* FTQ/Fondaction Toggle */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={useFTQ}
                  onChange={(e) => setUseFTQ(e.target.checked)}
                  className="mt-1 w-5 h-5 text-amber-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-amber-900 transition-colors">
                    Fonds FTQ / Fondaction (RRSP+)
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Obtenez 30% de crédit d'impôt supplémentaire (15% Québec + 15% Fédéral)
                  </div>
                </div>
                <div className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                  +30%
                </div>
              </label>
            </div>

            {/* Calculation Results */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700">Cotisation REER suggérée</span>
                <span className="font-bold text-slate-900">{formatCurrency(rrspContribution)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700">Économie d'impôt REER</span>
                <span className="font-semibold text-emerald-600">{formatCurrency(rrspTaxSavings)}</span>
              </div>

              {useFTQ && (
                <>
                  <div className="flex justify-between items-center text-sm bg-amber-100 -mx-4 px-4 py-2 rounded">
                    <span className="text-amber-900 font-medium">Crédit FTQ/Fondaction (30%)</span>
                    <span className="font-bold text-amber-900">{formatCurrency(ftqTaxCredit)}</span>
                  </div>
                  
                  <div className="h-px bg-amber-300"></div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-900">Coût réel après crédits</div>
                      <div className="text-xs text-slate-600">Sur {formatCurrency(rrspContribution)} investi</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-emerald-600">
                        {formatCurrency(realCost)}
                      </div>
                      <div className="text-xs text-emerald-700 font-semibold">
                        Économie : {formatCurrency(totalTaxSavings)}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!useFTQ && (
                <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                  <span className="font-bold text-slate-900">Coût réel</span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatCurrency(rrspContribution - rrspTaxSavings)}
                  </span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-800">
                  <strong>FTQ/Fondaction :</strong> Maximum 5 000$/an. Le crédit de 30% (max 1 500$) s'ajoute à votre déduction REER normale. 
                  Disponible via retenues salariales ou tirage au sort.
                </p>
              </div>
            </div>

            {/* 2027 Rule Change Warning for High Income */}
            {useFTQ && isHighIncome && (
              <div className="mt-4 bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-bold text-orange-900 mb-1">
                      ⚠️ Changement en 2027
                    </div>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      À partir de 2027, les contribuables dans la tranche d'imposition la plus élevée (≈120 000$+) 
                      perdront le crédit provincial de 15%. Vous conserverez seulement le crédit fédéral de 15%. 
                      <span className="font-semibold"> Profitez du crédit complet de 30% en 2026!</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
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
