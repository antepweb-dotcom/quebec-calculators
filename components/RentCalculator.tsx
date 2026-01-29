'use client'

import { useState } from 'react'
import { calculateRentIncrease, RentIncreaseInputs, RentIncreaseResult, HeatingType, formatCurrency, formatPercentage } from '@/utils/rentLogic'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function RentCalculator() {
  const [currentRent, setCurrentRent] = useState<string>('')
  const [isHeatedByLandlord, setIsHeatedByLandlord] = useState<boolean>(false)
  const [heatingType, setHeatingType] = useState<HeatingType>('none')
  const [municipalTaxIncrease, setMunicipalTaxIncrease] = useState<string>('0')
  const [schoolTaxIncrease, setSchoolTaxIncrease] = useState<string>('0')
  const [insuranceIncrease, setInsuranceIncrease] = useState<string>('0')
  const [majorRenovations, setMajorRenovations] = useState<string>('0')
  const [maintenanceIncrease, setMaintenanceIncrease] = useState<string>('0')
  const [result, setResult] = useState<RentIncreaseResult | null>(null)

  const handleCalculate = () => {
    const rent = parseFloat(currentRent)
    if (isNaN(rent) || rent <= 0) {
      alert('Veuillez entrer un loyer valide')
      return
    }

    const inputs: RentIncreaseInputs = {
      currentRent: rent,
      isHeatedByLandlord,
      heatingType: isHeatedByLandlord ? heatingType : 'none',
      municipalTaxIncrease: parseFloat(municipalTaxIncrease) || 0,
      schoolTaxIncrease: parseFloat(schoolTaxIncrease) || 0,
      insuranceIncrease: parseFloat(insuranceIncrease) || 0,
      majorRenovations: parseFloat(majorRenovations) || 0,
      maintenanceIncrease: parseFloat(maintenanceIncrease) || 0,
    }

    const calculatedResult = calculateRentIncrease(inputs)
    setResult(calculatedResult)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations du logement</h2>
          
          <div className="space-y-5">
            {/* Section A: Current Rent */}
            <div>
              <label htmlFor="currentRent" className="block text-sm font-semibold text-gray-700 mb-2">
                A. Loyer mensuel actuel
              </label>
              <input
                id="currentRent"
                type="number"
                value={currentRent}
                onChange={(e) => setCurrentRent(e.target.value)}
                placeholder="1200"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Section B: Heating */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                B. Le logement est-il chauffé par le propriétaire?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!isHeatedByLandlord}
                    onChange={() => setIsHeatedByLandlord(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Non</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={isHeatedByLandlord}
                    onChange={() => setIsHeatedByLandlord(true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Oui</span>
                </label>
              </div>

              {isHeatedByLandlord && (
                <div className="mt-3">
                  <label htmlFor="heatingType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type de chauffage
                  </label>
                  <select
                    id="heatingType"
                    value={heatingType}
                    onChange={(e) => setHeatingType(e.target.value as HeatingType)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="electricity">Électricité</option>
                    <option value="gas">Gaz</option>
                    <option value="oil">Mazout</option>
                  </select>
                </div>
              )}
            </div>

            {/* Section C: Cost Increases */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                C. Augmentation des dépenses (annuel)
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Taxes municipales ($)</label>
                  <input
                    type="number"
                    value={municipalTaxIncrease}
                    onChange={(e) => setMunicipalTaxIncrease(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Taxes scolaires ($)</label>
                  <input
                    type="number"
                    value={schoolTaxIncrease}
                    onChange={(e) => setSchoolTaxIncrease(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Assurances ($)</label>
                  <input
                    type="number"
                    value={insuranceIncrease}
                    onChange={(e) => setInsuranceIncrease(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Travaux majeurs ($)</label>
                  <input
                    type="number"
                    value={majorRenovations}
                    onChange={(e) => setMajorRenovations(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Entretien ($)</label>
                  <input
                    type="number"
                    value={maintenanceIncrease}
                    onChange={(e) => setMaintenanceIncrease(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Calculer l'augmentation
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {result ? (
          <div className="space-y-6">
            {/* HERO RESULT - V2 Gold Standard */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-medium mb-4 opacity-90">Augmentation Suggérée</h2>
              <p className="text-6xl md:text-7xl font-bold mb-6">
                {formatCurrency(result.totalIncrease)}
              </p>
              <p className="text-xl text-green-100 mb-2">
                par mois
              </p>
              <p className="text-lg text-green-100">
                Nouveau loyer: {formatCurrency(result.newRent)} ({formatPercentage(result.percentageIncrease)})
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Détails de l'augmentation</h3>
              <div className="space-y-3">
                {result.baseIndexIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Indice de base (4%)</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(result.baseIndexIncrease)}</span>
                  </div>
                )}
                {result.heatingAdjustment > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Ajustement chauffage</span>
                    <span className="font-semibold text-orange-600">{formatCurrency(result.heatingAdjustment)}</span>
                  </div>
                )}
                {result.municipalTaxIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Taxes municipales</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(result.municipalTaxIncrease)}</span>
                  </div>
                )}
                {result.schoolTaxIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Taxes scolaires</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(result.schoolTaxIncrease)}</span>
                  </div>
                )}
                {result.insuranceIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Assurances</span>
                    <span className="font-semibold text-yellow-600">{formatCurrency(result.insuranceIncrease)}</span>
                  </div>
                )}
                {result.renovationIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Travaux majeurs (4,8%/an)</span>
                    <span className="font-semibold text-red-600">{formatCurrency(result.renovationIncrease)}</span>
                  </div>
                )}
                {result.maintenanceIncrease > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Entretien</span>
                    <span className="font-semibold text-gray-600">{formatCurrency(result.maintenanceIncrease)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Affiliate Card */}
            <AffiliateCard variant="mortgage" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez les informations du logement
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

