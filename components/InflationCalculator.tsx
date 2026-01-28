'use client'

import { useState } from 'react'
import { calculateInflation, InflationResult, formatCurrency, formatPercentage, AVAILABLE_YEARS, MAX_YEAR } from '@/utils/inflationData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function InflationCalculator() {
  const [amount, setAmount] = useState<string>('100')
  const [startYear, setStartYear] = useState<number>(1990)
  const [endYear, setEndYear] = useState<number>(MAX_YEAR)
  const [result, setResult] = useState<InflationResult | null>(null)

  const handleCalculate = () => {
    const numericAmount = parseFloat(amount)
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }
    
    if (startYear >= endYear) {
      alert('L\'année de début doit être antérieure à l\'année de fin')
      return
    }

    try {
      const calculatedResult = calculateInflation(numericAmount, startYear, endYear)
      setResult(calculatedResult)
    } catch (error) {
      alert('Erreur lors du calcul. Veuillez vérifier vos données.')
    }
  }

  // Prepare chart data
  const chartData = result ? [
    {
      name: result.startYear.toString(),
      value: result.amount,
      label: 'Montant initial',
    },
    {
      name: result.endYear.toString(),
      value: result.adjustedAmount,
      label: 'Valeur ajustée',
    },
  ] : []

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>
          
          <div className="space-y-5">
            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                Montant
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Start Year */}
            <div>
              <label htmlFor="startYear" className="block text-sm font-semibold text-gray-700 mb-2">
                Année de début
              </label>
              <select
                id="startYear"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {AVAILABLE_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* End Year */}
            <div>
              <label htmlFor="endYear" className="block text-sm font-semibold text-gray-700 mb-2">
                Année de fin
              </label>
              <select
                id="endYear"
                value={endYear}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {AVAILABLE_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer l'inflation
            </button>
          </div>
        </div>


      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {result ? (
          <div className="space-y-6">
            {/* Story Result */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h2 className="text-2xl font-bold">Impact de l'inflation</h2>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <p className="text-xl leading-relaxed">
                  <strong className="text-2xl">{formatCurrency(result.amount)}</strong> en{' '}
                  <strong className="text-2xl">{result.startYear}</strong> vaut{' '}
                  <strong className="text-3xl text-yellow-300">{formatCurrency(result.adjustedAmount)}</strong>{' '}
                  en <strong className="text-2xl">{result.endYear}</strong>.
                </p>
                <p className="mt-4 text-blue-100 text-lg">
                  Une augmentation de <strong>{formatPercentage(result.percentageChange)}</strong> sur {result.yearsDifference} ans.
                </p>
              </div>
            </div>

            {/* Bar Chart Comparison */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comparaison visuelle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}$`} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Année ${label}`}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Montant initial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Valeur ajustée</span>
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Montant initial ({result.startYear})</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(result.amount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">IPC {result.startYear}</span>
                  <span className="font-semibold text-gray-900">{result.startCPI.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">IPC {result.endYear}</span>
                  <span className="font-semibold text-gray-900">{result.endCPI.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Période</span>
                  <span className="font-semibold text-gray-900">{result.yearsDifference} ans</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 -mx-6 px-6 mt-2">
                  <span className="text-gray-900 font-bold">Valeur ajustée ({result.endYear})</span>
                  <span className="font-bold text-green-600 text-lg">{formatCurrency(result.adjustedAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6">
                  <span className="text-gray-900 font-bold">Augmentation totale</span>
                  <span className="font-bold text-blue-600 text-lg">{formatPercentage(result.percentageChange)}</span>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-900 mb-2">L'inflation érode votre pouvoir d'achat</h3>
                  <p className="text-orange-800 leading-relaxed">
                    Votre argent perd de la valeur chaque année. Pour maintenir votre pouvoir d'achat, 
                    il est essentiel d'investir dans des actifs qui génèrent des rendements supérieurs à l'inflation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Calculez l'impact de l'inflation
            </h3>
            <p className="text-gray-500">
              Entrez un montant et sélectionnez les années pour voir l'effet de l'inflation
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
