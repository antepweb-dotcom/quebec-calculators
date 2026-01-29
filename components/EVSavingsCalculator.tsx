'use client'

import { useState, useRef } from 'react'
import { calculateCarSavings, CarSavingsInput } from '@/utils/carSavingsLogic'
import { Zap, Fuel, TrendingDown, Leaf, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function EVSavingsCalculator() {
  const [input, setInput] = useState<CarSavingsInput>({
    annualKm: 20000,
    gasPrice: 1.60,
    consumptionGas: 8,
    electricityPrice: 0.10, // Quebec rate
    consumptionEV: 18,
  })

  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const result = calculateCarSavings(input)

  const handleCalculate = () => {
    setShowResults(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-7 h-7 text-green-600" />
          Vos Paramètres
        </h3>
        
        <div className="space-y-6">
          {/* Annual KM */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Kilométrage annuel
              </label>
              <span className="text-lg font-bold text-green-600">
                {input.annualKm.toLocaleString('fr-CA')} km
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="40000"
              step="1000"
              value={input.annualKm}
              onChange={(e) => setInput({ ...input, annualKm: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5k km</span>
              <span>40k km</span>
            </div>
          </div>

          {/* Gas Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Prix de l'essence
              </label>
              <span className="text-lg font-bold text-green-600">
                {input.gasPrice.toFixed(2)} $/L
              </span>
            </div>
            <input
              type="range"
              min="1.20"
              max="2.50"
              step="0.05"
              value={input.gasPrice}
              onChange={(e) => setInput({ ...input, gasPrice: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1.20 $/L</span>
              <span>2.50 $/L</span>
            </div>
          </div>

          {/* Gas Consumption */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Consommation essence
              </label>
              <span className="text-lg font-bold text-green-600">
                {input.consumptionGas} L/100km
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="0.5"
              value={input.consumptionGas}
              onChange={(e) => setInput({ ...input, consumptionGas: Number(e.target.value) })}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5 L/100km</span>
              <span>15 L/100km</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Zap className="w-6 h-6" />
            Calculer mes économies
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Main Savings Card - "The Wow" */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-2xl p-8 border-2 border-green-200">
            <div className="text-center mb-6">
              <p className="text-xl text-gray-700 mb-4">
                En passant à l'électrique, vous économiserez :
              </p>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-7xl font-bold text-green-600 mb-2"
              >
                {result.annualSavings.toLocaleString('fr-CA')} $
              </motion.div>
              <p className="text-2xl text-gray-700 mb-4">par année</p>
              <p className="text-lg text-gray-600 italic">
                C'est comme si l'essence était à <span className="font-bold text-green-600">{result.equivalentGasPrice.toFixed(2)} $/L</span> !
              </p>
            </div>

            {/* Government Rebate Badge */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-300">
              <div className="flex items-center gap-3 justify-center">
                <Award className="w-8 h-8 text-green-600" />
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">Subvention Roulez Vert</p>
                  <p className="text-green-600 font-bold text-xl">Jusqu'à 7 000 $</p>
                  <p className="text-sm text-gray-600">Gouvernement du Québec</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gas Car */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Voiture à Essence</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Coût annuel</span>
                  <span className="font-bold text-red-600">{result.annualCostGas.toLocaleString('fr-CA')} $</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Coût mensuel</span>
                  <span className="font-bold text-red-600">{Math.round(result.annualCostGas / 12).toLocaleString('fr-CA')} $</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Litres utilisés</span>
                  <span className="font-bold text-gray-900">{result.breakdown.gasLitersUsed.toLocaleString('fr-CA')} L</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">CO₂ émis</span>
                  <span className="font-bold text-red-600">{result.co2SavedTons} tonnes</span>
                </div>
              </div>
            </div>

            {/* EV */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Voiture Électrique</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Coût annuel</span>
                  <span className="font-bold text-green-600">{result.annualCostEV.toLocaleString('fr-CA')} $</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Coût mensuel</span>
                  <span className="font-bold text-green-600">{Math.round(result.annualCostEV / 12).toLocaleString('fr-CA')} $</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">kWh utilisés</span>
                  <span className="font-bold text-gray-900">{result.breakdown.evKwhUsed.toLocaleString('fr-CA')} kWh</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">CO₂ émis</span>
                  <span className="font-bold text-green-600">0 tonne</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8" />
              <h4 className="font-bold text-2xl">Impact Environnemental</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{result.co2SavedTons}</div>
                <div className="text-green-100">tonnes de CO₂ évitées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{result.breakdown.treesEquivalent}</div>
                <div className="text-green-100">arbres équivalents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{result.fiveYearSavings.toLocaleString('fr-CA')} $</div>
                <div className="text-green-100">économies sur 5 ans</div>
              </div>
            </div>
          </div>

          {/* Affiliate Card - EV Savings Investment (Only shown after calculation) */}
          <AffiliateCard variant="savings" />

          {/* Additional Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ces calculs sont basés sur le tarif résidentiel d'Hydro-Québec (0.10 $/kWh) et une consommation moyenne de 18 kWh/100km pour un VÉ. 
              Les économies réelles peuvent varier selon votre véhicule et vos habitudes de conduite.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

