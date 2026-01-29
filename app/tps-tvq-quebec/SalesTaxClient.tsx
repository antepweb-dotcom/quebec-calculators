'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

type CalculationMode = 'add' | 'extract'

export default function SalesTaxClient() {
  const [amount, setAmount] = useState<number>(100)
  const [mode, setMode] = useState<CalculationMode>('add')

  // Tax rates for 2026
  const TPS_RATE = 0.05 // 5%
  const TVQ_RATE = 0.09975 // 9.975%
  const COMBINED_RATE = 0.14975 // 14.975%

  // Calculate based on mode
  let price: number, tps: number, tvq: number, total: number

  if (mode === 'add') {
    // Adding taxes to a pre-tax amount
    price = amount
    tps = price * TPS_RATE
    tvq = price * TVQ_RATE
    total = price + tps + tvq
  } else {
    // Extracting taxes from a total amount
    total = amount
    price = total / (1 + COMBINED_RATE)
    tps = price * TPS_RATE
    tvq = price * TVQ_RATE
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const taxPercentage = ((tps + tvq) / total) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border border-violet-200 p-8">
          <h2 className="text-2xl font-bold text-violet-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🧮</span>
            Configuration
          </h2>

          {/* Mode Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-4">
              Mode de calcul
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('add')}
                className={`py-4 px-4 rounded-xl font-bold text-sm transition-all ${
                  mode === 'add'
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105'
                    : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-2 border-violet-200'
                }`}
              >
                <div className="text-2xl mb-1">➕</div>
                Ajouter les taxes
              </button>
              <button
                onClick={() => setMode('extract')}
                className={`py-4 px-4 rounded-xl font-bold text-sm transition-all ${
                  mode === 'extract'
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105'
                    : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-2 border-violet-200'
                }`}
              >
                <div className="text-2xl mb-1">➖</div>
                Extraire les taxes
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              {mode === 'add' ? 'Montant avant taxes' : 'Montant après taxes'}
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-2xl font-bold">
                $
              </span>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-12 pr-6 py-5 text-3xl font-bold border-3 border-violet-300 rounded-xl focus:ring-4 focus:ring-violet-200 focus:border-violet-500 transition-all"
                placeholder="100.00"
                step="0.01"
              />
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="mt-6">
            <label className="block text-xs font-semibold text-slate-600 mb-3">
              Montants rapides
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount)}
                  className="py-2 px-3 bg-violet-100 hover:bg-violet-200 text-violet-900 rounded-lg text-sm font-semibold transition-colors"
                >
                  {quickAmount}$
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-violet-900 text-sm mb-1">
                  {mode === 'add' ? 'Mode Ajout' : 'Mode Extraction'}
                </h3>
                <p className="text-xs text-violet-800">
                  {mode === 'add'
                    ? 'Calculez le prix final avec taxes à partir du prix de base.'
                    : 'Extrayez le prix avant taxes à partir du montant total payé.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Receipt-Style Result Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-violet-200 overflow-hidden">
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-6 text-center">
              <div className="text-4xl mb-2">🧾</div>
              <h2 className="text-xl font-bold">Reçu de Taxes</h2>
              <p className="text-sm opacity-90">Québec, Canada</p>
            </div>

            {/* Receipt Body */}
            <div className="p-8 font-mono">
              <div className="border-b-2 border-dashed border-slate-300 pb-6 mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-slate-600 text-sm">Prix {mode === 'add' ? 'de base' : 'avant taxes'}</span>
                  <span className="text-2xl font-bold text-slate-900">{formatCurrency(price)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-slate-700 font-semibold">TPS (Fédérale)</span>
                    <span className="text-xs text-slate-500 ml-2">5.00%</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">{formatCurrency(tps)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-slate-700 font-semibold">TVQ (Québec)</span>
                    <span className="text-xs text-slate-500 ml-2">9.975%</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(tvq)}</span>
                </div>
              </div>

              <div className="border-t-4 border-double border-slate-400 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-bold text-slate-900">TOTAL</span>
                  <span className="text-4xl font-extrabold text-violet-900">{formatCurrency(total)}</span>
                </div>
                <div className="text-right mt-2">
                  <span className="text-xs text-slate-500">
                    Taxes totales : {formatCurrency(tps + tvq)} ({taxPercentage.toFixed(3)}%)
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center text-xs text-slate-400">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
              <div className="text-center text-xs text-slate-500 mt-2">
                Merci de votre visite !
              </div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Répartition visuelle</h3>
            
            {/* Bar Chart */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-700">Prix de base</span>
                  <span className="text-slate-600">{((price / total) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-end pr-3"
                    style={{ width: `${(price / total) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{formatCurrency(price)}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-red-700">TPS (5%)</span>
                  <span className="text-slate-600">{((tps / total) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-8 bg-red-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end pr-3"
                    style={{ width: `${(tps / total) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{formatCurrency(tps)}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-blue-700">TVQ (9.975%)</span>
                  <span className="text-slate-600">{((tvq / total) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-8 bg-blue-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-3"
                    style={{ width: `${(tvq / total) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{formatCurrency(tvq)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-violet-50 rounded-lg p-4 text-center">
                <div className="text-xs text-violet-600 font-semibold mb-1">Taxes totales</div>
                <div className="text-xl font-bold text-violet-900">{formatCurrency(tps + tvq)}</div>
              </div>
              <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                <div className="text-xs text-fuchsia-600 font-semibold mb-1">Taux combiné</div>
                <div className="text-xl font-bold text-fuchsia-900">14.975%</div>
              </div>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="savings" />
        </div>
      </div>
    </div>
  )
}
