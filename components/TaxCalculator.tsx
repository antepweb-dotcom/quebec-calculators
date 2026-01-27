'use client'

import { useState, useEffect } from 'react'
import { calculateTaxes, convertToAnnual, PayFrequency, TaxCalculationResult } from '@/utils/taxLogic'
import { generateSalaryPDF } from '@/utils/pdfGenerator'
import ResultsDisplay from './ResultsDisplay'

interface TaxCalculatorProps {
  initialSalary?: number
}

export default function TaxCalculator({ initialSalary }: TaxCalculatorProps) {
  const [income, setIncome] = useState<string>(initialSalary ? initialSalary.toString() : '')
  const [frequency, setFrequency] = useState<PayFrequency>('annual')
  const [results, setResults] = useState<TaxCalculationResult | null>(null)

  // Auto-calculate when initialSalary is provided
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

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
                Revenu Brut
              </label>
              <input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="50000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
                Fréquence de paie
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as PayFrequency)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              >
                <option value="annual">Annuel</option>
                <option value="monthly">Mensuel</option>
                <option value="biweekly">Aux deux semaines</option>
                <option value="weekly">Hebdomadaire</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer mon revenu net
            </button>
          </div>
        </div>

        {/* Ad Space */}
        <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500 font-medium">Espace Publicitaire</p>
          <p className="text-sm text-gray-400 mt-2">300x250</p>
        </div>
      </div>

      {/* Right Column - Results Section */}
      <div className="lg:col-span-2">
        {results ? (
          <div className="space-y-4">
            <ResultsDisplay results={results} />
            
            {/* PDF Download Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger en PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez votre revenu pour commencer
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
