'use client'

import { useState, useEffect, useRef } from 'react'
import { calculateTaxes, convertToAnnual, PayFrequency, TaxCalculationResult, formatCurrency } from '@/utils/taxLogic'
import { generateSalaryPDF } from '@/utils/pdfGenerator'
import DonutChart from './DonutChart'

interface TaxCalculatorProps {
  initialSalary?: number
}

const POPULAR_SALARIES = [
  { label: '35k', value: 35000 },
  { label: '45k', value: 45000 },
  { label: '55k', value: 55000 },
  { label: '65k', value: 65000 },
  { label: '75k', value: 75000 },
  { label: '85k', value: 85000 },
  { label: '100k', value: 100000 },
  { label: '125k', value: 125000 },
]

export default function TaxCalculator({ initialSalary }: TaxCalculatorProps) {
  const [income, setIncome] = useState<string>(initialSalary ? initialSalary.toString() : '')
  const [frequency, setFrequency] = useState<PayFrequency>('annual')
  const [results, setResults] = useState<TaxCalculationResult | null>(null)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialSalary && initialSalary > 0) {
      const calculatedResults = calculateTaxes(initialSalary)
      setResults(calculatedResults)
    }
  }, [initialSalary])

  const handleCalculate = () => {
    const numericIncome = parseFloat(income)
    if (isNaN(numericIncome) || numericIncome <= 0) {
      alert('Veuillez entrer un revenu valide')
      return
    }

    const annualIncome = convertToAnnual(numericIncome, frequency)
    const calculatedResults = calculateTaxes(annualIncome)
    setResults(calculatedResults)
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handlePopularSalary = (salary: number) => {
    setIncome(salary.toString())
    setFrequency('annual')
    const calculatedResults = calculateTaxes(salary)
    setResults(calculatedResults)
  }

  const handleDownloadPDF = () => {
    if (results) {
      const frequencyLabels: Record<PayFrequency, string> = {
        annual: 'annuel',
        monthly: 'mensuel',
        biweekly: 'aux deux semaines',
        weekly: 'hebdomadaire'
      }
      generateSalaryPDF(results, frequencyLabels[frequency])
    }
  }

  const breakdownItems = results ? [
    { label: 'Impôt Fédéral', amount: results.federalTax, color: 'text-red-600' },
    { label: 'Impôt Provincial', amount: results.provincialTax, color: 'text-orange-600' },
    { label: 'RRQ', amount: results.qpp, color: 'text-yellow-600' },
    { label: 'RQAP', amount: results.qpip, color: 'text-blue-600' },
    { label: 'AE', amount: results.ei, color: 'text-purple-600' },
  ] : []

  return (
    <div className="space-y-6">
      {/* Header with PDF Download Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Calculateur de Salaire Net</h2>
          <p className="text-sm text-gray-600">Calculez votre revenu net après impôts et déductions</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={!results}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm group"
          title={!results ? "Calculez d'abord pour télécharger" : "Télécharger le rapport en PDF"}
        >
          <svg className="w-5 h-5 group-disabled:animate-none group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Télécharger PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - Inputs (40% width) */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h3>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="income" className="block text-sm font-semibold text-gray-700 mb-2">
                Revenu Brut
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  id="income"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-semibold text-gray-700 mb-2">
                Fréquence de paie
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as PayFrequency)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              >
                <option value="annual">Annuel</option>
                <option value="monthly">Mensuel</option>
                <option value="biweekly">Aux deux semaines</option>
                <option value="weekly">Hebdomadaire</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-sm"
            >
              Calculer mon revenu net
            </button>
          </div>
        </div>

        {/* Popular Salaries - Horizontal Scrollable Pills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Salaires populaires</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {POPULAR_SALARIES.map((salary) => (
              <button
                key={salary.value}
                onClick={() => handlePopularSalary(salary.value)}
                className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 text-gray-700 rounded-full text-sm font-medium transition-colors"
              >
                {salary.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Results (60% width, Sticky) */}
      <div className="lg:col-span-3 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24" ref={resultsRef}>
          {results ? (
            <div className="space-y-6">
              {/* Hero Result Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-lg font-medium text-gray-600 mb-2 text-center">
                  Votre revenu net annuel
                </h3>
                <div className="text-center mb-6">
                  <div className="text-6xl md:text-7xl font-bold text-emerald-600 mb-2">
                    {formatCurrency(results.netIncome)}
                  </div>
                  <p className="text-gray-500 text-base">
                    sur {formatCurrency(results.grossIncome)} brut
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Mensuel</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(results.netIncome / 12)}
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Aux 2 sem.</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(results.netIncome / 26)}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Déductions</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(results.totalDeductions)}
                    </p>
                  </div>
                </div>

                {/* Integrated Donut Chart */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Répartition de votre revenu</h3>
                  <DonutChart 
                    netIncome={results.netIncome}
                    totalTax={results.totalDeductions}
                  />
                </div>

                {/* Collapsible Breakdown Accordion */}
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between text-left py-2"
                  >
                    <span className="text-base font-semibold text-gray-900">Détails des déductions</span>
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showBreakdown && (
                    <div className="mt-3 space-y-2 animate-in slide-in-from-top">
                      {breakdownItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <span className={`text-sm font-semibold ${item.color}`}>
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center py-2 pt-3 border-t border-gray-200">
                        <span className="text-sm font-bold text-gray-900">Total</span>
                        <span className="font-bold text-red-600">
                          {formatCurrency(results.totalDeductions)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="text-gray-300 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Entrez votre revenu pour commencer
              </h3>
              <p className="text-gray-500 text-sm">
                Les résultats apparaîtront ici
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

