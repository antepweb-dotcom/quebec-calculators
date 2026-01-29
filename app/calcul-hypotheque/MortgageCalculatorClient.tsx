'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'

// CMHC Insurance rates (when down payment < 20%)
const getCMHCInsurance = (price: number, downPayment: number): number => {
  const downPaymentPercent = (downPayment / price) * 100
  const loanAmount = price - downPayment
  
  if (downPaymentPercent >= 20) return 0
  if (downPaymentPercent >= 15) return loanAmount * 0.028
  if (downPaymentPercent >= 10) return loanAmount * 0.031
  return loanAmount * 0.04
}

// Mortgage payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12
  
  if (monthlyRate === 0) return principal / numberOfPayments
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
}

export default function MortgageCalculatorClient() {
  // State
  const [price, setPrice] = useState(400000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [rate, setRate] = useState(4.8)
  const [amortization, setAmortization] = useState(25)
  
  // Calculations
  const downPayment = (price * downPaymentPercent) / 100
  const cmhcInsurance = getCMHCInsurance(price, downPayment)
  const mortgageAmount = price - downPayment + cmhcInsurance
  const monthlyPayment = calculateMonthlyPayment(mortgageAmount, rate, amortization)
  const totalPaid = monthlyPayment * 12 * amortization
  const totalInterest = totalPaid - mortgageAmount
  
  // The "Shock" Badge Logic
  const showShockBadge = totalInterest > price * 0.5
  
  // Visual bar percentages
  const principalPercent = (mortgageAmount / totalPaid) * 100
  const interestPercent = (totalInterest / totalPaid) * 100
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du prêt</h2>
          
          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix de la propriété
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="10000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full mt-3 accent-indigo-600"
            />
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mise de fonds ({downPaymentPercent}% = {formatCurrency(downPayment)})
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>50%</span>
            </div>
            {downPaymentPercent < 20 && (
              <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Assurance SCHL requise: {formatCurrency(cmhcInsurance)}
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Taux d'intérêt annuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.01"
                min="0"
                max="15"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              <button
                type="button"
                onClick={() => setRate(4.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 4.5
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.5%
              </button>
              <button
                type="button"
                onClick={() => setRate(4.8)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 4.8
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.8%
              </button>
              <button
                type="button"
                onClick={() => setRate(5.25)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 5.25
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.25%
              </button>
              <button
                type="button"
                onClick={() => setRate(6.0)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 6.0
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                6.0%
              </button>
            </div>
          </div>

          {/* Amortization */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Période d'amortissement
            </label>
            <select
              value={amortization}
              onChange={(e) => setAmortization(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            >
              <option value={15}>15 ans</option>
              <option value={20}>20 ans</option>
              <option value={25}>25 ans</option>
              <option value={30}>30 ans</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Monthly Payment */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Votre paiement mensuel</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-indigo-100 text-sm">
              Sur {amortization} ans à {rate}%
            </p>
          </div>

          {/* THE "SHOCK" BADGE */}
          {showShockBadge && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Attention : Coût élevé des intérêts</p>
                  <p className="text-orange-50">
                    Vous paierez <span className="font-bold text-2xl">{formatCurrency(totalInterest)}</span> en intérêts sur {amortization} ans !
                  </p>
                  <p className="text-sm text-orange-100 mt-2">
                    💡 Réduisez votre amortissement ou augmentez votre mise de fonds pour économiser.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Résumé du prêt</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Prix de la propriété</span>
                <span className="font-semibold text-gray-900">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Mise de fonds ({downPaymentPercent}%)</span>
                <span className="font-semibold text-green-600">-{formatCurrency(downPayment)}</span>
              </div>
              {cmhcInsurance > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Assurance SCHL</span>
                  <span className="font-semibold text-orange-600">+{formatCurrency(cmhcInsurance)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b-2 border-indigo-200">
                <span className="text-gray-700 font-semibold">Montant hypothécaire</span>
                <span className="font-bold text-indigo-600">{formatCurrency(mortgageAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Total des paiements</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalPaid)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Total des intérêts</span>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            {/* VISUAL BAR - Principal vs Interest */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Répartition du coût total</p>
              <div className="flex h-8 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${principalPercent}%` }}
                >
                  {principalPercent > 15 && 'Principal'}
                </div>
                <div 
                  className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${interestPercent}%` }}
                >
                  {interestPercent > 15 && 'Intérêts'}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>💙 Principal: {principalPercent.toFixed(0)}%</span>
                <span>❤️ Intérêts: {interestPercent.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD - Inside Sticky Results */}
          <AffiliateCard variant="mortgage" />
        </div>
      </div>
    </div>
  )
}
