'use client'

import { useState } from 'react'
import { calculateTip, formatCurrency, TipCalculationResult } from '@/utils/tipLogic'

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('50')
  const [calculateBeforeTax, setCalculateBeforeTax] = useState<boolean>(true)
  const [tipPercentage, setTipPercentage] = useState<number>(15)
  const [results, setResults] = useState<TipCalculationResult | null>(null)

  const tipOptions = [10, 15, 18, 20, 25]

  const handleCalculate = () => {
    const numericAmount = parseFloat(billAmount)

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }

    const calculatedResults = calculateTip(numericAmount, tipPercentage, calculateBeforeTax)
    setResults(calculatedResults)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="billAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Montant de la facture
              </label>
              <div className="relative">
                <input
                  id="billAmount"
                  type="number"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="50.00"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calculer sur
              </label>
              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: calculateBeforeTax ? '#10b981' : '#d1d5db',
                    backgroundColor: calculateBeforeTax ? '#ecfdf5' : 'white'
                  }}>
                  <input
                    type="radio"
                    name="taxOption"
                    checked={calculateBeforeTax}
                    onChange={() => setCalculateBeforeTax(true)}
                    className="w-5 h-5 text-green-600 mt-0.5"
                  />
                  <div className="ml-3">
                    <span className="text-gray-900 font-medium block">
                      Montant AVANT taxes
                    </span>
                    <span className="text-xs text-green-700">
                      ✓ Recommandé - Économisez sur le pourboire
                    </span>
                  </div>
                </label>

                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: !calculateBeforeTax ? '#10b981' : '#d1d5db',
                    backgroundColor: !calculateBeforeTax ? '#ecfdf5' : 'white'
                  }}>
                  <input
                    type="radio"
                    name="taxOption"
                    checked={!calculateBeforeTax}
                    onChange={() => setCalculateBeforeTax(false)}
                    className="w-5 h-5 text-green-600 mt-0.5"
                  />
                  <div className="ml-3">
                    <span className="text-gray-900 font-medium block">
                      Montant APRÈS taxes
                    </span>
                    <span className="text-xs text-gray-600">
                      Plus généreux mais plus cher
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pourcentage de pourboire: {tipPercentage}%
              </label>
              
              {/* Quick Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {tipOptions.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => setTipPercentage(percentage)}
                    className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                      tipPercentage === percentage
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {percentage}%
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Calculer le pourboire
            </button>
          </div>
        </div>

        {/* Affiliate Card */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg p-6 border-2 border-orange-200">
          <div className="text-4xl mb-3 text-center">🍕</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
            Vous préférez manger à la maison ?
          </h3>
          <p className="text-sm text-gray-700 mb-4 text-center">
            Économisez avec nos codes promo livraison
          </p>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Voir les codes promo livraison
          </button>
        </div>
      </div>

      {/* Right Column - Results Section */}
      <div className="lg:col-span-2">
        {results ? (
          <div className="space-y-6">
            {/* Main Result Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Montant total à payer
              </h2>
              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl font-bold text-green-600 mb-2">
                  {formatCurrency(results.total)}
                </div>
                <p className="text-gray-600 text-lg">
                  incluant le pourboire de {results.tipPercentage}%
                </p>
              </div>

              {/* Receipt Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  📄 Détail de la facture
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-700">Sous-total</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-700">Taxes (14.975%)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.taxes)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b-2 border-gray-300">
                    <span className="text-gray-700">Pourboire ({results.tipPercentage}%)</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.tipAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900">TOTAL</span>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(results.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Insight Card */}
            {results.calculateBeforeTax ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">💰</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                      Excellent choix !
                    </h3>
                    <p className="text-lg text-green-800 mb-4">
                      En calculant avant taxes, vous économisez{' '}
                      <span className="text-2xl font-bold">{formatCurrency(results.savingsVsAfterTax)}</span>{' '}
                      sur le pourboire
                    </p>
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>💡 Le saviez-vous ?</strong> Au Québec, il est standard de calculer le pourboire 
                        sur le montant AVANT taxes. C'est la méthode recommandée et acceptée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">💡</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">
                      Conseil d'économie
                    </h3>
                    <p className="text-lg text-blue-800 mb-4">
                      Vous pourriez économiser{' '}
                      <span className="text-2xl font-bold">{formatCurrency(results.savingsVsAfterTax)}</span>{' '}
                      en calculant le pourboire AVANT taxes
                    </p>
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>💡 Astuce :</strong> La plupart des Québécois calculent le pourboire sur le montant 
                        avant taxes. C'est tout à fait acceptable et vous permet d'économiser !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📚 Guide des pourboires au Québec
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>15%</strong> est le standard pour un service normal au restaurant.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>18-20%</strong> pour un excellent service ou un restaurant haut de gamme.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>10%</strong> pour un service médiocre (mais toujours laisser quelque chose).</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Le pourboire se calcule traditionnellement sur le montant <strong>AVANT taxes</strong>.</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Calculez votre pourboire
            </h3>
            <p className="text-gray-500">
              Entrez le montant de votre facture pour commencer
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
