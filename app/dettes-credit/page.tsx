import { Metadata } from 'next'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import DebtCalculator from '@/components/DebtCalculator'

export const metadata: Metadata = {
  title: "Calculateur de Dette Québec - Plan de Remboursement Rapide",
  description: "Calculez quand vous serez libre de dettes. Voyez combien d'intérêts vous payez réellement sur vos cartes de crédit et prêts.",
}

export default function DebtPayoffPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculateur de Remboursement de Dette
            </h1>
            <p className="text-xl text-gray-600">
              Découvrez combien de temps il vous faudra pour être libre de dettes
            </p>
          </header>

          <div className="mb-8 flex justify-center"><AdSlot position="header" /></div>
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <DebtCalculator />
              <div className="lg:hidden mt-8 flex justify-center"><AdSlot position="inArticle" /></div>
            </div>
            <div className="hidden lg:block lg:col-span-1"><div className="sticky top-6"><AdSlot position="sidebar" /></div></div>
          </div>
          <div className="hidden lg:flex mb-12 justify-center"><AdSlot position="inArticle" /></div>

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
                <h3 className="font-bold text-gray-900 mb-2">Planifiez votre liberté</h3>
                <p className="text-sm text-gray-600">
                  Visualisez exactement quand vous serez libre de dettes et planifiez votre avenir financier
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Voyez le coût réel</h3>
                <p className="text-sm text-gray-600">
                  Découvrez combien vous payez vraiment en intérêts et prenez conscience de l'impact
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Trouvez des solutions</h3>
                <p className="text-sm text-gray-600">
                  Explorez des options comme les transferts de solde à 0% pour économiser des milliers de dollars
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour rembourser plus rapidement
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Augmentez vos paiements
                </h3>
                <p className="text-sm text-gray-600">
                  Même 50$ de plus par mois peut réduire considérablement le temps de remboursement et les intérêts payés.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Transférez votre solde
                </h3>
                <p className="text-sm text-gray-600">
                  Les cartes avec transfert de solde à 0% peuvent vous faire économiser des milliers en intérêts.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Méthode boule de neige
                </h3>
                <p className="text-sm text-gray-600">
                  Remboursez d'abord la plus petite dette, puis utilisez ce paiement pour la suivante.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Évitez les nouveaux achats
                </h3>
                <p className="text-sm text-gray-600">
                  Arrêtez d'utiliser la carte pendant le remboursement pour éviter d'augmenter votre dette.
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Calculateur de Remboursement de Dette. Les calculs sont fournis à titre indicatif seulement.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
