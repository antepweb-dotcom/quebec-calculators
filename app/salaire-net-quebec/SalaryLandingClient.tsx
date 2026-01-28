'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SalaryLandingClient() {
  const [salary, setSalary] = useState<string>('')
  const router = useRouter()

  const handleCalculate = () => {
    const numericSalary = parseFloat(salary)
    
    if (isNaN(numericSalary) || numericSalary <= 0) {
      alert('Veuillez entrer un salaire valide')
      return
    }

    // Redirect to dynamic route
    router.push(`/salaire-net-quebec/${Math.round(numericSalary)}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate()
    }
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Title Area */}
        <div className="mb-10 text-center lg:text-left">
          <span className="bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 text-sm font-semibold inline-block mb-4">
            ✨ Mis à jour pour 2026
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Estimez Votre Revenu Net Réel
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            Découvrez exactement ce qui reste dans vos poches après impôts et déductions
          </p>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Input Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Votre salaire</h2>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                    Revenu annuel brut
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      id="salary"
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="50000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Calculer mon revenu net
                </button>

                <p className="text-center text-xs text-gray-500">
                  Appuyez sur Entrée pour calculer rapidement
                </p>
              </div>
            </div>

            {/* Popular Salaries Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Salaires populaires</h3>
              <div className="grid grid-cols-2 gap-2">
                {[40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => router.push(`/salaire-net-quebec/${amount}`)}
                    className="px-3 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {amount.toLocaleString('fr-CA')} $
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info (Span 7) - STICKY */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 lg:h-fit space-y-6">
              {/* What's Included Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ce qui est inclus dans le calcul
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Impôt Fédéral</h3>
                      <p className="text-sm text-gray-600">Taux progressifs de 15% à 33%</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Impôt Provincial</h3>
                      <p className="text-sm text-gray-600">Taux du Québec de 14% à 25,75%</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">RRQ (Régie des rentes)</h3>
                      <p className="text-sm text-gray-600">6,4% jusqu'à 68 500 $</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">RQAP + AE</h3>
                      <p className="text-sm text-gray-600">Assurance parentale et emploi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Use This Calculator Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Pourquoi utiliser ce calculateur?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Taux 2026 à jour</strong> - Intègre tous les derniers taux d'imposition fédéraux et provinciaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Calcul instantané</strong> - Obtenez votre salaire net en moins de 2 secondes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Détails complets</strong> - Visualisez toutes les déductions (RRQ, RQAP, AE)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>100% gratuit</strong> - Aucune inscription requise, utilisez-le autant que vous voulez</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

