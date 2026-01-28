'use client'

import { useState } from 'react'
import { calculateAutoLoan, AutoLoanInputs, AutoLoanResult, LoanTermMonths, formatCurrency, formatPercentage } from '@/utils/autoLoanLogic'
import AffiliateCard from '@/components/AffiliateCard'

const LOAN_TERMS: LoanTermMonths[] = [36, 48, 60, 72, 84];

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<string>('35000')
  const [downPayment, setDownPayment] = useState<string>('5000')
  const [includeTaxes, setIncludeTaxes] = useState<boolean>(true)
  const [loanTermMonths, setLoanTermMonths] = useState<LoanTermMonths>(60)
  const [interestRate, setInterestRate] = useState<string>('6.99')
  const [result, setResult] = useState<AutoLoanResult | null>(null)

  const handleCalculate = () => {
    const price = parseFloat(vehiclePrice)
    const down = parseFloat(downPayment)
    const rate = parseFloat(interestRate)
    
    if (isNaN(price) || price <= 0) {
      alert('Veuillez entrer un prix de véhicule valide')
      return
    }
    
    if (isNaN(down) || down < 0) {
      alert('Veuillez entrer une mise de fonds valide')
      return
    }
    
    if (isNaN(rate) || rate < 0) {
      alert('Veuillez entrer un taux d\'intérêt valide')
      return
    }

    const inputs: AutoLoanInputs = {
      vehiclePrice: price,
      downPayment: down,
      includeTaxes,
      loanTermMonths,
      interestRate: rate,
    }

    const calculatedResult = calculateAutoLoan(inputs)
    setResult(calculatedResult)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du prêt</h2>
          
          <div className="space-y-5">
            {/* Vehicle Price */}
            <div>
              <label htmlFor="vehiclePrice" className="block text-sm font-semibold text-gray-700 mb-2">
                Prix du véhicule
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="vehiclePrice"
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value)}
                  placeholder="35000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <label htmlFor="downPayment" className="block text-sm font-semibold text-gray-700 mb-2">
                Valeur d'échange / Mise de fonds
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sales Tax Toggle */}
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Inclure les taxes (TPS + TVQ)</span>
                  <p className="text-xs text-gray-500 mt-1">14,975% de taxes de vente</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={includeTaxes}
                    onChange={(e) => setIncludeTaxes(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setIncludeTaxes(!includeTaxes)}
                    className={`w-14 h-8 rounded-full transition-colors ${
                      includeTaxes ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        includeTaxes ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>
            </div>

            {/* Loan Term - Clickable Chips */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Durée du prêt
              </label>
              <div className="flex flex-wrap gap-2">
                {LOAN_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTermMonths(term)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      loanTermMonths === term
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {term} mois
                  </button>
                ))}
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
                placeholder="6.99"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer les paiements
            </button>
          </div>
        </div>


      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {result ? (
          <div className="space-y-6">
            {/* Primary Result - Bi-weekly Payment */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-lg font-medium mb-2 opacity-90">Paiement aux deux semaines</h2>
              <p className="text-5xl font-bold">
                {formatCurrency(result.biweeklyPayment)}
              </p>
              <p className="mt-4 text-blue-100 text-lg">
                Paiement mensuel : {formatCurrency(result.monthlyPayment)}
              </p>
              <p className="mt-2 text-blue-100 text-sm">
                Sur {result.loanTermMonths} mois à {formatPercentage(result.interestRate)}
              </p>
            </div>

            {/* Shock Factor - Total Interest */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Coût total des intérêts</h3>
                  <p className="text-3xl font-bold text-red-600 mb-2">
                    {formatCurrency(result.totalInterest)}
                  </p>
                  <p className="text-sm text-orange-800">
                    C'est le montant supplémentaire que vous paierez en intérêts sur la durée du prêt.
                    {result.loanTermMonths >= 72 && (
                      <span className="block mt-2 font-semibold">
                        ⚠️ Un prêt de {result.loanTermMonths} mois coûte plus cher en intérêts. 
                        Considérez une durée plus courte si possible.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Résumé du financement</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Prix du véhicule</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.vehiclePrice)}</span>
                </div>
                {result.salesTax > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Taxes (TPS + TVQ)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.salesTax)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Coût total du véhicule</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.totalVehicleCost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Mise de fonds</span>
                  <span className="font-semibold text-green-600">-{formatCurrency(result.downPayment)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 mt-2">
                  <span className="text-gray-900 font-bold">Montant financé</span>
                  <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-300 mt-2">
                  <span className="text-gray-700">Total à rembourser</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.totalPayments)}</span>
                </div>
              </div>
            </div>

            {/* Affiliate Card - Auto Loan (Only shown after calculation) */}
            <AffiliateCard
              title="Obtenez un meilleur taux de financement"
              description="Comparez les taux de financement auto de plusieurs institutions financières. Économisez des centaines de dollars par mois en trouvant le meilleur taux pour votre véhicule."
              buttonText="Comparer les taux auto"
              link="https://www.ratehub.ca/auto-loans"
              theme="blue"
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez les détails de votre prêt auto
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

