import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import TipCalculator from '@/components/TipCalculator'

export const metadata: Metadata = {
  title: "Calculateur de Pourboire Québec - Avant ou Après Taxes",
  description: "Calculez le pourboire parfait au restaurant. Comparez avant/après taxes et économisez. Guide des standards de pourboire au Québec (15%, 18%, 20%).",
}

export default function TipCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculateur de Pourboire
            </h1>
            <p className="text-xl text-gray-600">
              Calculez le montant parfait pour votre pourboire au Québec
            </p>
          </header>

          {/* Calculator */}
          <TipCalculator />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi utiliser ce calculateur ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Calcul rapide</h3>
                <p className="text-sm text-gray-600">
                  Obtenez instantanément le montant exact à laisser en pourboire
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Économisez</h3>
                <p className="text-sm text-gray-600">
                  Voyez combien vous économisez en calculant avant taxes
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Standards québécois</h3>
                <p className="text-sm text-gray-600">
                  Suivez les normes de pourboire acceptées au Québec
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour les pourboires
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💡</span>
                  Avant ou après taxes ?
                </h3>
                <p className="text-sm text-gray-600">
                  Au Québec, la norme est de calculer le pourboire sur le montant AVANT taxes. C'est parfaitement acceptable et vous permet d'économiser.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💡</span>
                  Service exceptionnel
                </h3>
                <p className="text-sm text-gray-600">
                  Pour un service vraiment exceptionnel, n'hésitez pas à laisser 20% ou plus. Les serveurs apprécient toujours la reconnaissance.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💡</span>
                  Groupes nombreux
                </h3>
                <p className="text-sm text-gray-600">
                  Pour les groupes de 6 personnes ou plus, certains restaurants ajoutent automatiquement 15-18% de pourboire. Vérifiez votre facture !
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💡</span>
                  Livraison à domicile
                </h3>
                <p className="text-sm text-gray-600">
                  Pour la livraison, 10-15% est standard, ou un minimum de 3-5$ selon la distance et les conditions météo.
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Calculateur de Pourboire. Les calculs sont fournis à titre indicatif seulement.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
