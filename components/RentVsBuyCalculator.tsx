'use client'

import { useState } from 'react'
import { calculateRentVsBuy, RentVsBuyInput } from '@/utils/rentVsBuyLogic'
import { Home, Building2, TrendingUp, TrendingDown } from 'lucide-react'

export default function RentVsBuyCalculator() {
  const [input, setInput] = useState<RentVsBuyInput>({
    homePrice: 500000,
    monthlyRent: 1800,
    downPaymentPercent: 20,
    investmentReturnRate: 5,
  })

  const result = calculateRentVsBuy(input)

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-600" />
          Paramètres de Comparaison
        </h3>
        
        <div className="space-y-6">
          {/* Home Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Prix de la maison
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.homePrice.toLocaleString('fr-CA')} $
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="1000000"
              step="10000"
              value={input.homePrice}
              onChange={(e) => setInput({ ...input, homePrice: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>200k $</span>
              <span>1M $</span>
            </div>
          </div>

          {/* Monthly Rent Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Loyer mensuel actuel
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.monthlyRent.toLocaleString('fr-CA')} $
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="4000"
              step="50"
              value={input.monthlyRent}
              onChange={(e) => setInput({ ...input, monthlyRent: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>800 $</span>
              <span>4000 $</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Mise de fonds
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.downPaymentPercent}% ({(input.homePrice * input.downPaymentPercent / 100).toLocaleString('fr-CA')} $)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="5"
              value={input.downPaymentPercent}
              onChange={(e) => setInput({ ...input, downPaymentPercent: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>35%</span>
            </div>
          </div>

          {/* Investment Return Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Rendement des placements (annuel)
              </label>
              <span className="text-lg font-bold text-blue-600">
                {input.investmentReturnRate}%
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.5"
              value={input.investmentReturnRate}
              onChange={(e) => setInput({ ...input, investmentReturnRate: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Verdict Card */}
      <div className={`rounded-xl shadow-2xl p-8 ${
        result.recommendation === 'buy' 
          ? 'bg-gradient-to-br from-green-50 to-emerald-100' 
          : 'bg-gradient-to-br from-blue-50 to-cyan-100'
      }`}>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {result.recommendation === 'buy' ? (
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Home className="w-10 h-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {result.recommendation === 'buy' ? (
              <>✅ Acheter est plus avantageux</>
            ) : (
              <>📉 Louer est plus avantageux</>
            )}
          </h3>
          
          <div className="text-5xl font-bold mb-2" style={{ color: result.recommendation === 'buy' ? '#10b981' : '#3b82f6' }}>
            {result.difference.toLocaleString('fr-CA')} $
          </div>
          
          <p className="text-lg text-gray-700">
            de différence sur 5 ans
          </p>
          
          {result.recommendation === 'rent' && (
            <p className="text-sm text-gray-600 mt-2 italic">
              (si vous investissez la différence)
            </p>
          )}
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h4 className="font-bold text-gray-900 mb-4 text-center">Valeur nette après 5 ans</h4>
          
          <div className="space-y-4">
            {/* Buy Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Acheter
                </span>
                <span className="font-bold text-green-600">
                  {result.buyNetWorth.toLocaleString('fr-CA')} $
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-500"
                  style={{ width: `${Math.max(10, (result.buyNetWorth / Math.max(result.buyNetWorth, result.rentNetWorth)) * 100)}%` }}
                >
                  {result.buyNetWorth > 0 && result.buyNetWorth.toLocaleString('fr-CA', { notation: 'compact' })}
                </div>
              </div>
            </div>

            {/* Rent Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Louer
                </span>
                <span className="font-bold text-blue-600">
                  {result.rentNetWorth.toLocaleString('fr-CA')} $
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-500"
                  style={{ width: `${Math.max(10, (result.rentNetWorth / Math.max(result.buyNetWorth, result.rentNetWorth)) * 100)}%` }}
                >
                  {result.rentNetWorth > 0 && result.rentNetWorth.toLocaleString('fr-CA', { notation: 'compact' })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Buy Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-green-600" />
            Scénario Achat
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Appréciation maison
              </span>
              <span className="font-semibold text-green-600">
                +{result.buyBreakdown.homeAppreciation.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Capital remboursé
              </span>
              <span className="font-semibold text-green-600">
                +{result.buyBreakdown.principalPaid.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Intérêts hypothèque
              </span>
              <span className="font-semibold text-red-600">
                -{result.buyBreakdown.mortgageInterest.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Taxes municipales
              </span>
              <span className="font-semibold text-red-600">
                -{result.buyBreakdown.propertyTax.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Taxe de bienvenue
              </span>
              <span className="font-semibold text-red-600">
                -{result.buyBreakdown.welcomeTax.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Entretien
              </span>
              <span className="font-semibold text-red-600">
                -{result.buyBreakdown.maintenance.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3 mt-2">
              <span className="font-bold text-gray-900">Valeur nette</span>
              <span className="font-bold text-green-600 text-lg">
                {result.buyNetWorth.toLocaleString('fr-CA')} $
              </span>
            </div>
          </div>
        </div>

        {/* Rent Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Scénario Location
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Mise de fonds investie
              </span>
              <span className="font-semibold text-green-600">
                +{result.rentBreakdown.downPaymentInvested.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Épargne investie
              </span>
              <span className="font-semibold text-green-600">
                +{result.rentBreakdown.investmentGrowth.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Loyers payés (5 ans)
              </span>
              <span className="font-semibold text-red-600">
                -{result.rentBreakdown.totalRentPaid.toLocaleString('fr-CA')} $
              </span>
            </div>
            <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-3 mt-2">
              <span className="font-bold text-gray-900">Valeur nette</span>
              <span className="font-bold text-blue-600 text-lg">
                {result.rentNetWorth.toLocaleString('fr-CA')} $
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note importante:</strong> Ce calculateur compare uniquement l'aspect financier sur 5 ans. 
          D'autres facteurs importants incluent: stabilité d'emploi, style de vie, mobilité, et préférences personnelles. 
          Le scénario location suppose que vous investissez la différence dans un portefeuille diversifié.
        </p>
      </div>
    </div>
  )
}
