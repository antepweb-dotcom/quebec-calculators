'use client'

import { useState } from 'react'
import { convertWage, formatCurrency, formatCurrencyRounded, WageConversionResult } from '@/utils/wageLogic'
import AffiliateCard from '@/components/AffiliateCard'

export default function WageConverter() {
  const [amount, setAmount] = useState<string>('25')
  const [frequency, setFrequency] = useState<'hourly' | 'weekly' | 'annual'>('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('37.5')
  const [vacationWeeks, setVacationWeeks] = useState<string>('2')
  const [results, setResults] = useState<WageConversionResult | null>(null)

  const handleCalculate = () => {
    const numericAmount = parseFloat(amount)
    const numericHours = parseFloat(hoursPerWeek)
    const numericVacation = parseFloat(vacationWeeks)

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Veuillez entrer un montant valide')
      return
    }

    if (isNaN(numericHours) || numericHours <= 0 || numericHours > 80) {
      alert('Veuillez entrer un nombre d\'heures valide (1-80)')
      return
    }

    if (isNaN(numericVacation) || numericVacation < 0 || numericVacation > 52) {
      alert('Veuillez entrer un nombre de semaines de vacances valide (0-52)')
      return
    }

    const calculatedResults = convertWage(numericAmount, frequency, numericHours, numericVacation)
    setResults(calculatedResults)
  }

  const getFrequencyLabel = () => {
    switch (frequency) {
      case 'hourly': return '$/heure'
      case 'weekly': return '$/semaine'
      case 'annual': return '$/année'
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Montant
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="25.00"
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-3 top-3 text-gray-500">$</span>
              </div>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
                Fréquence
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'hourly' | 'weekly' | 'annual')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              >
                <option value="hourly">Par heure</option>
                <option value="weekly">Par semaine</option>
                <option value="annual">Par année</option>
              </select>
            </div>

            <div>
              <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-2">
                Heures par semaine
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={() => setHoursPerWeek('37.5')}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                    hoursPerWeek === '37.5'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  37.5h
                </button>
                <button
                  onClick={() => setHoursPerWeek('40')}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                    hoursPerWeek === '40'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  40h
                </button>
              </div>
              <input
                id="hoursPerWeek"
                type="number"
                step="0.5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                placeholder="37.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              />
            </div>

            <div>
              <label htmlFor="vacationWeeks" className="block text-sm font-medium text-gray-700 mb-2">
                Semaines de vacances
              </label>
              <input
                id="vacationWeeks"
                type="number"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(e.target.value)}
                placeholder="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Standard: 2 semaines (moins de 3 ans de service)
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg"
            >
              Convertir le salaire
            </button>
          </div>
        </div>

        {/* Simple Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border-2 border-blue-200">
          <div className="text-4xl mb-3 text-center">💰</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
            Calculez votre salaire net
          </h3>
          <p className="text-sm text-gray-700 mb-4 text-center">
            Découvrez combien vous recevrez après impôts
          </p>
        </div>
      </div>

      {/* Right Column - Results Section */}
      <div className="lg:col-span-2">
        {results ? (
          <div className="space-y-6">
            {/* Main Result Card - Annual Salary Highlighted */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Votre salaire annuel
              </h2>
              <div className="text-center mb-6">
                <div className="text-6xl md:text-7xl font-bold text-green-600 mb-2">
                  {formatCurrencyRounded(results.annualSalary)}
                </div>
                <p className="text-gray-600 text-lg">
                  basé sur {results.workingWeeks} semaines travaillées
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>💡 Note :</strong> Ceci est votre salaire brut avant impôts et déductions.
                </p>
              </div>
            </div>

            {/* Conversion Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                📊 Toutes les conversions
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Hourly */}
                <div className={`rounded-lg p-6 border-2 transition-all ${
                  results.inputFrequency === 'hourly' 
                    ? 'bg-cyan-50 border-cyan-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Par heure</span>
                    {results.inputFrequency === 'hourly' && (
                      <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">Entrée</span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(results.hourlyRate)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Taux horaire</p>
                </div>

                {/* Weekly */}
                <div className={`rounded-lg p-6 border-2 transition-all ${
                  results.inputFrequency === 'weekly' 
                    ? 'bg-cyan-50 border-cyan-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Par semaine</span>
                    {results.inputFrequency === 'weekly' && (
                      <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">Entrée</span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(results.weeklyPay)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{results.hoursPerWeek}h par semaine</p>
                </div>

                {/* Biweekly */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <span className="text-sm font-medium text-gray-600">Aux 2 semaines</span>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {formatCurrency(results.biweeklyPay)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Paie bimensuelle</p>
                </div>

                {/* Monthly */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <span className="text-sm font-medium text-gray-600">Par mois</span>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {formatCurrency(results.monthlyPay)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Salaire mensuel moyen</p>
                </div>
              </div>

              {/* Annual - Highlighted */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Par année</span>
                  {results.inputFrequency === 'annual' && (
                    <span className="text-xs bg-white text-green-600 px-2 py-1 rounded">Entrée</span>
                  )}
                </div>
                <p className="text-4xl font-bold">
                  {formatCurrencyRounded(results.annualSalary)}
                </p>
                <p className="text-xs text-green-100 mt-1">
                  Salaire annuel brut ({results.workingWeeks} semaines)
                </p>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📋 Détails du calcul
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between pb-2 border-b">
                  <span>Heures par semaine</span>
                  <span className="font-semibold">{results.hoursPerWeek}h</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Semaines de vacances</span>
                  <span className="font-semibold">{results.vacationWeeks} semaines</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Semaines travaillées</span>
                  <span className="font-semibold">{results.workingWeeks} semaines</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>Heures travaillées par année</span>
                  <span className="font-semibold">{(results.hoursPerWeek * results.workingWeeks).toFixed(0)}h</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold">Taux horaire effectif</span>
                  <span className="font-bold text-cyan-600 text-xl">{formatCurrency(results.hourlyRate)}</span>
                </div>
              </div>
            </div>

            {/* Comparison Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                💡 Comparaison rapide
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Salaire minimum Québec (2026) :</strong> 16.50$/h = {formatCurrencyRounded(16.50 * 37.5 * 50)}/an
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Salaire médian Québec :</strong> ~28$/h = {formatCurrencyRounded(28 * 37.5 * 50)}/an
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    <strong>Votre salaire :</strong> {formatCurrency(results.hourlyRate)}/h = {formatCurrencyRounded(results.annualSalary)}/an
                  </span>
                </p>
              </div>
            </div>

            {/* Affiliate Card */}
            <AffiliateCard
              title="Comparez les offres d'emploi facilement"
              description="Utilisez Wealthsimple pour gérer votre budget et épargner automatiquement une partie de votre salaire. Obtenez 25$ de bonus."
              buttonText="Obtenir 25$ de bonus"
              link="https://wealthsimple.com/fr-ca"
              theme="blue"
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Convertissez votre salaire
            </h3>
            <p className="text-gray-500">
              Entrez votre taux horaire, hebdomadaire ou annuel pour voir toutes les conversions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
