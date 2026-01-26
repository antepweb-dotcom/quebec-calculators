'use client'

import { useState } from 'react'
import { calculateVacationPay, formatCurrency, VacationPayResult } from '@/utils/vacationPayLogic'

export default function VacationPayCalculator() {
  const [salary, setSalary] = useState<string>('45000')
  const [yearsOfService, setYearsOfService] = useState<number>(1)
  const [results, setResults] = useState<VacationPayResult | null>(null)

  const handleCalculate = () => {
    const numericSalary = parseFloat(salary)

    if (isNaN(numericSalary) || numericSalary <= 0) {
      alert('Veuillez entrer un salaire valide')
      return
    }

    const calculatedResults = calculateVacationPay(numericSalary, yearsOfService)
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
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salaire brut annuel
              </label>
              <div className="relative">
                <input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="45000"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Années de service
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: yearsOfService < 3 ? '#3b82f6' : '#d1d5db',
                    backgroundColor: yearsOfService < 3 ? '#eff6ff' : 'white'
                  }}>
                  <input
                    type="radio"
                    name="yearsOfService"
                    checked={yearsOfService < 3}
                    onChange={() => setYearsOfService(1)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    Moins de 3 ans (4%)
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: yearsOfService >= 3 ? '#3b82f6' : '#d1d5db',
                    backgroundColor: yearsOfService >= 3 ? '#eff6ff' : 'white'
                  }}>
                  <input
                    type="radio"
                    name="yearsOfService"
                    checked={yearsOfService >= 3}
                    onChange={() => setYearsOfService(3)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    3 ans et plus (6%)
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Calculer mon indemnité
            </button>
          </div>
        </div>

        {/* Affiliate Card */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg p-6 border-2 border-orange-200">
          <div className="text-4xl mb-3 text-center">✈️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
            Utilisez cet argent pour voyager
          </h3>
          <p className="text-sm text-gray-700 mb-4 text-center">
            Découvrez les meilleures offres de voyage pour vos vacances
          </p>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Voir les offres de voyage
          </button>
        </div>
      </div>

      {/* Right Column - Results Section */}
      <div className="lg:col-span-2">
        {results ? (
          <div className="space-y-6">
            {/* HERO RESULT - V2 Gold Standard */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-12 text-white text-center">
              <h2 className="text-2xl font-medium mb-4 opacity-90">Votre Indemnité de Vacances</h2>
              <p className="text-6xl md:text-7xl font-bold mb-6">
                {formatCurrency(results.vacationPay)}
              </p>
              <p className="text-2xl text-green-100">
                Basé sur {results.percentage}% de votre salaire annuel
              </p>
            </div>

            {/* 4% vs 6% Comparison - V2 Gold Standard */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Comparaison 4% vs 6%
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`rounded-lg p-6 border-2 ${results.yearsOfService < 3 ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'}`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Moins de 3 ans</p>
                    <p className="text-5xl font-bold text-blue-600 mb-2">4%</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(results.yearsOfService < 3 ? results.vacationPay : results.alternativeVacationPay)}
                    </p>
                    {results.yearsOfService < 3 && (
                      <div className="mt-4 bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold">
                        Votre taux actuel
                      </div>
                    )}
                  </div>
                </div>

                <div className={`rounded-lg p-6 border-2 ${results.yearsOfService >= 3 ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">3 ans et plus</p>
                    <p className="text-5xl font-bold text-green-600 mb-2">6%</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(results.yearsOfService >= 3 ? results.vacationPay : results.alternativeVacationPay)}
                    </p>
                    {results.yearsOfService >= 3 && (
                      <div className="mt-4 bg-green-600 text-white rounded-lg py-2 px-4 font-semibold">
                        Votre taux actuel
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-6 text-center">
                <p className="text-lg text-gray-700">
                  <strong>Différence:</strong> <span className="text-3xl font-bold text-green-600">{formatCurrency(results.difference)}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {results.yearsOfService < 3 
                    ? `Vous gagnerez ${formatCurrency(results.difference)} de plus par année après 3 ans de service!`
                    : `Vous gagnez ${formatCurrency(results.difference)} de plus grâce à votre ancienneté!`
                  }
                </p>
              </div>
            </div>

            {/* Info Card - Simplified */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                💡 Détails de votre indemnité
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Salaire annuel</span>
                  <span className="font-bold text-gray-900">{formatCurrency(results.annualSalary)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Taux d'indemnité</span>
                  <span className="font-bold text-gray-900">{results.percentage}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Années de service</span>
                  <span className="font-bold text-gray-900">{results.yearsOfService < 3 ? 'Moins de 3 ans' : '3 ans et plus'}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 -mx-8 px-8 mt-4">
                  <span className="font-bold text-gray-900">Indemnité totale</span>
                  <span className="font-bold text-green-600 text-2xl">{formatCurrency(results.vacationPay)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Calculez votre indemnité de vacances
            </h3>
            <p className="text-gray-500">
              Entrez votre salaire et vos années de service pour découvrir le montant
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
