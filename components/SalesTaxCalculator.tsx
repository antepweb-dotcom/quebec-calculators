'use client'

import { useState } from 'react'
import { calculateSalesTax, CalculationMode, SalesTaxResult, formatCurrency, TPS_RATE, TVQ_RATE, TOTAL_TAX_RATE } from '@/utils/salesTaxLogic'
import AffiliateCard from '@/components/AffiliateCard'

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState<string>('')
  const [mode, setMode] = useState<CalculationMode>('add')
  const [result, setResult] = useState<SalesTaxResult | null>(null)

  const handleCalculate = () => {
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }

    const calculatedResult = calculateSalesTax(numericAmount, mode)
    setResult(calculatedResult)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculateur TPS/TVQ</h2>
          
          <div className="space-y-5">
            {/* Mode Toggle */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Mode de calcul
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={mode === 'add'}
                    onChange={() => setMode('add')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900 font-medium">Ajouter les taxes</span>
                </label>
                <p className="ml-7 text-xs text-gray-500">
                  Entrez le montant hors taxes
                </p>
                
                <label className="flex items-center cursor-pointer mt-3">
                  <input
                    type="radio"
                    checked={mode === 'reverse'}
                    onChange={() => setMode('reverse')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900 font-medium">Inverser le calcul</span>
                </label>
                <p className="ml-7 text-xs text-gray-500">
                  Entrez le montant avec taxes
                </p>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                {mode === 'add' ? 'Montant hors taxes' : 'Montant avec taxes'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Tax Rates Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Taux en vigueur</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">TPS (Fédéral)</span>
                  <span className="font-semibold text-gray-900">5,000%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">TVQ (Québec)</span>
                  <span className="font-semibold text-gray-900">9,975%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="font-bold text-blue-600">14,975%</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {result ? (
          <div className="space-y-6">
            {/* Receipt-Style Result Card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-200">
              {/* Receipt Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Détail des taxes</h2>
                    <p className="text-blue-100 mt-1">
                      {result.mode === 'add' ? 'Taxes ajoutées' : 'Taxes extraites'}
                    </p>
                  </div>
                  <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  </svg>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-8">
                <div className="space-y-4">
                  {/* Amount Before Tax */}
                  <div className="flex justify-between items-center pb-3 border-b-2 border-dashed border-gray-300">
                    <span className="text-lg text-gray-700 font-medium">Montant hors taxes</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(result.amountBeforeTax)}
                    </span>
                  </div>

                  {/* TPS */}
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <span className="text-gray-700 font-medium">TPS (Fédéral)</span>
                      <p className="text-sm text-gray-500">5,000%</p>
                    </div>
                    <span className="text-xl font-semibold text-red-600">
                      + {formatCurrency(result.tpsAmount)}
                    </span>
                  </div>

                  {/* TVQ */}
                  <div className="flex justify-between items-center py-3 pb-4 border-b-2 border-dashed border-gray-300">
                    <div>
                      <span className="text-gray-700 font-medium">TVQ (Québec)</span>
                      <p className="text-sm text-gray-500">9,975%</p>
                    </div>
                    <span className="text-xl font-semibold text-red-600">
                      + {formatCurrency(result.tvqAmount)}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 bg-gradient-to-r from-green-50 to-emerald-50 -mx-8 px-8 py-6 mt-4">
                    <span className="text-2xl font-bold text-gray-900">Total à payer</span>
                    <span className="text-4xl font-bold text-green-600">
                      {formatCurrency(result.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Taux total: 14,975% • Calcul effectué le {new Date().toLocaleDateString('fr-CA')}
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">À propos des taxes de vente au Québec</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Au Québec, deux taxes s'appliquent sur la plupart des achats : la TPS (Taxe sur les produits et services) 
                    de 5% perçue par le gouvernement fédéral, et la TVQ (Taxe de vente du Québec) de 9,975% perçue par 
                    le gouvernement provincial. Le taux combiné est de 14,975%.
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliate Card */}
            <AffiliateCard
              title="Gérez vos finances d'entreprise"
              description="Wealthsimple offre des solutions pour entrepreneurs et travailleurs autonomes. Simplifiez votre comptabilité et vos taxes."
              buttonText="En savoir plus"
              link="https://wealthsimple.com/fr-ca"
              theme="blue"
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez un montant pour calculer
            </h3>
            <p className="text-gray-500">
              Choisissez votre mode de calcul et entrez un montant
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
