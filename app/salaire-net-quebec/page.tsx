'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SalaryLandingPage() {
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
    <><main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur d'Impôt Québec 2026
          </h1>
          <p className="text-xl text-gray-600">
            Calculez votre revenu net après impôts en quelques secondes
          </p>
        </header>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <div className="max-w-md mx-auto">
            <label htmlFor="salary" className="block text-lg font-semibold text-gray-700 mb-4 text-center">
              Entrez votre salaire annuel brut
            </label>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-2xl">$</span>
              </div>
              <input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="50000"
                className="w-full pl-10 pr-4 py-4 text-2xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
                autoFocus
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Calculer mon revenu net
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Appuyez sur Entrée pour calculer rapidement
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Exemples de salaires populaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000].map((amount) => (
              <button
                key={amount}
                onClick={() => router.push(`/salaire-net-quebec/${amount}`)}
                className="bg-white hover:bg-blue-600 hover:text-white text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-lg"
              >
                {amount.toLocaleString('fr-CA')} $
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
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
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur d'Impôt Québec. Les calculs sont fournis à titre indicatif seulement.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
