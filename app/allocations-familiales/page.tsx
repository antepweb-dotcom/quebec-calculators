import { Metadata } from 'next'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import FamilyBenefitsCalculator from '@/components/FamilyBenefitsCalculator'

export const metadata: Metadata = {
  title: "Calculateur Allocations Familiales Québec 2026 (ACE + Soutien)",
  description: "Combien allez-vous recevoir pour vos enfants? Estimez l'Allocation canadienne pour enfants (ACE) et le Soutien aux enfants du Québec. Argent non-imposable.",
}

export default function FamilyBenefitsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Allocations Familiales Québec 2026
            </h1>
            <p className="text-xl text-gray-600">
              Estimez vos allocations pour enfants (ACE + Soutien Québec)
            </p>
          </header>

          {/* Header Ad */}
          <div className="mb-8 flex justify-center">
            <AdSlot position="header" />
          </div>

          {/* 2 Column Layout */}
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <FamilyBenefitsCalculator />
              
              {/* Mobile Ad */}
              <div className="lg:hidden mt-8 flex justify-center">
                <AdSlot position="inArticle" />
              </div>
            </div>
            
            {/* Sidebar Ad - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-6">
                <AdSlot position="sidebar" />
              </div>
            </div>
          </div>

          {/* In-Article Ad - Desktop only */}
          <div className="hidden lg:flex mb-12 justify-center">
            <AdSlot position="inArticle" />
          </div>

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi utiliser ce calculateur ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Estimation rapide</h3>
                <p className="text-sm text-gray-600">
                  Découvrez instantanément combien vous recevrez pour vos enfants
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Non-imposable</h3>
                <p className="text-sm text-gray-600">
                  Ces allocations ne sont pas imposables et n'affectent pas votre déclaration
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Deux programmes</h3>
                <p className="text-sm text-gray-600">
                  Combine l'ACE fédérale et le Soutien aux enfants du Québec
                </p>
              </div>
            </div>
          </section>

          {/* Guide Section */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Guide des allocations familiales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">🇨🇦</span>
                  Allocation canadienne pour enfants (ACE)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Programme fédéral qui verse jusqu'à 648$/mois par enfant de moins de 6 ans et 547$/mois pour les 6-17 ans.
                </p>
                <p className="text-sm text-gray-600">
                  Le montant diminue progressivement si votre revenu familial dépasse 36 502$.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">⚜️</span>
                  Soutien aux enfants du Québec
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Programme provincial qui verse jusqu'à 240$/mois par enfant, peu importe l'âge.
                </p>
                <p className="text-sm text-gray-600">
                  Le montant diminue si votre revenu familial dépasse 57 000$.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">👨‍👩‍👧</span>
                  Garde partagée
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous avez la garde partagée (50%), chaque parent reçoit 50% des allocations. Notre calculateur ajuste automatiquement les montants.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">🎓</span>
                  REEE et subventions
                </h3>
                <p className="text-sm text-gray-600">
                  Utilisez vos allocations pour cotiser à un REEE et obtenez 30% de subventions gouvernementales supplémentaires (SCEE + IQEE).
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour maximiser vos allocations
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Inscrivez-vous dès la naissance</h3>
                  <p className="text-sm text-gray-600">
                    Inscrivez votre enfant à l'ACE et au Soutien aux enfants dès sa naissance pour ne rien manquer. Les paiements commencent automatiquement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Produisez vos déclarations à temps</h3>
                  <p className="text-sm text-gray-600">
                    Vous devez produire vos déclarations de revenus chaque année pour continuer à recevoir vos allocations, même si vous n'avez aucun revenu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Signalez les changements</h3>
                  <p className="text-sm text-gray-600">
                    Informez l'ARC et Retraite Québec de tout changement dans votre situation familiale (naissance, séparation, garde partagée, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Ouvrez un REEE</h3>
                  <p className="text-sm text-gray-600">
                    Investissez vos allocations dans un REEE pour profiter de 30% de subventions additionnelles (jusqu'à 1 200$/an par enfant).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Allocations Familiales Québec. Les calculs sont fournis à titre indicatif seulement.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
