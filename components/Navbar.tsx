'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex items-center justify-between">
          
          {/* Logo/Site Name - Link to Homepage */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Outils Financiers</h1>
              <p className="text-xs text-gray-500">Québec 2026</p>
            </div>
          </Link>

          {/* Desktop Dropdown Menu */}
          <div className="hidden md:block relative group">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Autres outils</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Content - 2 Column Grid */}
            <div className="absolute right-0 mt-2 w-[560px] bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-3 grid grid-cols-2 gap-4">
                
                {/* Column 1 */}
                <div>
                  {/* Section 1: Revenu & Impôts */}
                  <div className="mb-3">
                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Revenu & Impôts</p>
                    <Link href="/salaire-net-quebec" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      💰 Calcul d'Impôt
                    </Link>
                    <Link href="/taux-horaire" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      ⏱️ Taux Horaire
                    </Link>
                    <Link href="/assurance-emploi" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🛡️ Assurance-Emploi
                    </Link>
                    <Link href="/paie-vacances" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      ✈️ Paie de Vacances
                    </Link>
                    <Link href="/pourboire" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🍽️ Pourboire
                    </Link>
                    <Link href="/tps-tvq-quebec" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🧾 TPS/TVQ
                    </Link>
                    <Link href="/declaration-simplifiee" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      📄 Déclaration Simplifiée
                    </Link>
                  </div>

                  {/* Section 2: Immobilier */}
                  <div>
                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Immobilier</p>
                    <Link href="/calcul-hypotheque" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🏠 Hypothèque
                    </Link>
                    <Link href="/capacite-emprunt" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      💰 Capacité d'Emprunt
                    </Link>
                    <Link href="/taxe-de-bienvenue" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      💵 Taxe de Bienvenue
                    </Link>
                    <Link href="/augmentation-loyer-2026" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      📈 Augmentation Loyer
                    </Link>
                  </div>
                </div>

                {/* Column 2 */}
                <div>
                  {/* Section 3: Famille & Futur */}
                  <div>
                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Famille & Futur</p>
                    <Link href="/pret-auto" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🚗 Prêt Auto
                    </Link>
                    <Link href="/pret-etudiant" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      🎓 Prêt Étudiant
                    </Link>
                    <Link href="/dettes-credit" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      💳 Remboursement Dette
                    </Link>
                    <Link href="/frais-de-garde" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      👶 Frais de Garde
                    </Link>
                    <Link href="/epargne-retraite" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      📊 Épargne-Retraite
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            {/* Section 1 */}
            <div className="mb-4">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Revenu & Impôts</p>
              <Link href="/salaire-net-quebec" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                💰 Calcul d'Impôt
              </Link>
              <Link href="/taux-horaire" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                ⏱️ Taux Horaire
              </Link>
              <Link href="/assurance-emploi" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🛡️ Assurance-Emploi
              </Link>
              <Link href="/paie-vacances" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                ✈️ Paie de Vacances
              </Link>
              <Link href="/pourboire" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🍽️ Pourboire
              </Link>
              <Link href="/tps-tvq-quebec" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🧾 TPS/TVQ
              </Link>
              <Link href="/declaration-simplifiee" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                📄 Déclaration Simplifiée
              </Link>
            </div>

            {/* Section 2 */}
            <div className="mb-4">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Immobilier</p>
              <Link href="/calcul-hypotheque" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🏠 Hypothèque
              </Link>
              <Link href="/capacite-emprunt" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                💰 Capacité d'Emprunt
              </Link>
              <Link href="/taxe-de-bienvenue" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                💵 Taxe de Bienvenue
              </Link>
              <Link href="/augmentation-loyer-2026" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                📈 Augmentation Loyer
              </Link>
            </div>

            {/* Section 3 */}
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Famille & Futur</p>
              <Link href="/pret-auto" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🚗 Prêt Auto
              </Link>
              <Link href="/pret-etudiant" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                🎓 Prêt Étudiant
              </Link>
              <Link href="/dettes-credit" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                💳 Remboursement Dette
              </Link>
              <Link href="/frais-de-garde" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                👶 Frais de Garde
              </Link>
              <Link href="/epargne-retraite" className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                📊 Épargne-Retraite
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
