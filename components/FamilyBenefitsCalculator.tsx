'use client'

import { useState, useRef, useEffect } from 'react'
import { calculateFamilyBenefits, FamilyBenefitsInput } from '@/utils/familyBenefitsLogic'
import { Baby, Users, Minus, Plus } from 'lucide-react'
import AffiliateCard from '@/components/AffiliateCard'

export default function FamilyBenefitsCalculator() {
  const [input, setInput] = useState<FamilyBenefitsInput>({
    familyIncome: 60000,
    custody: 'full',
    childrenUnder6: 1,
    children6to17: 0,
  })

  const [hasCalculated, setHasCalculated] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const result = calculateFamilyBenefits(input)

  const updateChildren = (type: 'under6' | '6to17', delta: number) => {
    setInput(prev => ({
      ...prev,
      childrenUnder6: type === 'under6' ? Math.max(0, prev.childrenUnder6 + delta) : prev.childrenUnder6,
      children6to17: type === '6to17' ? Math.max(0, prev.children6to17 + delta) : prev.children6to17,
    }))
    
    // Mark as calculated and trigger scroll
    if (!hasCalculated) {
      setHasCalculated(true)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  // Trigger scroll when income or custody changes (if already calculated)
  useEffect(() => {
    if (hasCalculated) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [input.familyIncome, input.custody, hasCalculated])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Input Form (Span 5) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Situation Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Votre Situation
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revenu familial net (annuel)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={input.familyIncome}
                  onChange={(e) => setInput({ ...input, familyIncome: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
                <span className="absolute right-4 top-3 text-gray-500 font-medium">$</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de garde
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setInput({ ...input, custody: 'full' })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    input.custody === 'full'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Complète (100%)
                </button>
                <button
                  onClick={() => setInput({ ...input, custody: 'shared' })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    input.custody === 'shared'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Partagée (50%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Children Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Baby className="w-6 h-6 text-pink-600" />
            Vos Enfants
          </h3>
          
          <div className="space-y-4">
            {/* Under 6 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enfants de moins de 6 ans
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateChildren('under6', -1)}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  disabled={input.childrenUnder6 === 0}
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-12 text-center">
                  {input.childrenUnder6}
                </span>
                <button
                  onClick={() => updateChildren('under6', 1)}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* 6 to 17 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enfants de 6 à 17 ans
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateChildren('6to17', -1)}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                  disabled={input.children6to17 === 0}
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-12 text-center">
                  {input.children6to17}
                </span>
                <button
                  onClick={() => updateChildren('6to17', 1)}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Span 7, Sticky) */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-24 lg:h-fit" ref={resultsRef}>
          {/* Results Section - "The Paycheque" */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600 mb-2">Vos allocations familiales estimées</p>
              <div className="text-6xl font-bold text-green-600 mb-2">
                {result.totalMonthly.toLocaleString('fr-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $
              </div>
              <p className="text-2xl text-gray-700">par mois</p>
              <p className="text-sm text-gray-500 mt-2">
                ({result.totalYearly.toLocaleString('fr-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} $ par année)
              </p>
            </div>

            {/* Breakdown Table */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-4 text-center">Détails des allocations</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">Canada (ACE)</span>
                  <span className="font-bold text-blue-600">
                    {result.federalMonthly.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">Québec (Soutien aux enfants)</span>
                  <span className="font-bold text-blue-600">
                    {result.quebecMonthly.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
                  <span className="font-bold text-gray-900">Total mensuel</span>
                  <span className="font-bold text-green-600 text-xl">
                    {result.totalMonthly.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <p className="text-lg font-bold text-blue-900 mb-2">
                💡 Cet argent est non-imposable!
              </p>
              <p className="text-gray-700">
                Ouvrez un REEE (Régime enregistré d'épargne-études) pour vos enfants et profitez des subventions gouvernementales supplémentaires.
              </p>
            </div>
          </div>

          {/* Affiliate Card - REEE */}
          <div className="mt-6">
            <AffiliateCard
              title="Investissez vos allocations pour l'avenir de vos enfants"
              description="Ouvrez un REEE avec Wealthsimple et obtenez jusqu'à 30% de subventions gouvernementales gratuites (SCEE + IQEE). Investissement automatique, frais réduits, et croissance à l'abri de l'impôt."
              buttonText="Ouvrir un REEE gratuit"
              link="https://www.wealthsimple.com/fr-ca/product/resp"
              theme="green"
            />
          </div>

          {/* Info Note */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ces montants sont des estimations basées sur les taux 2026. Les montants réels peuvent varier selon votre situation familiale complète. 
              Consultez les sites officiels de l'Agence du revenu du Canada et de Retraite Québec pour plus de détails.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
