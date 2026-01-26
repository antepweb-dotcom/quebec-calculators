import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import WageConverter from '@/components/WageConverter'

export const metadata: Metadata = {
  title: "Convertisseur Taux Horaire Québec - Salaire Annuel, Hebdo",
  description: "Convertissez instantanément votre salaire horaire en hebdomadaire, bimensuel et annuel. Calculateur gratuit pour comparer les offres d'emploi au Québec.",
}

export default function WageConverterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Convertisseur de Taux Horaire
            </h1>
            <p className="text-xl text-gray-600">
              Convertissez votre salaire entre taux horaire, hebdomadaire et annuel
            </p>
          </header>

          {/* Calculator */}
          <WageConverter />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi utiliser ce convertisseur ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Comparez les offres</h3>
                <p className="text-sm text-gray-600">
                  Comparez facilement les offres d'emploi qui affichent des salaires différents (horaire vs annuel)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Planifiez votre budget</h3>
                <p className="text-sm text-gray-600">
                  Voyez exactement combien vous gagnerez par semaine, par mois et par année
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Négociez mieux</h3>
                <p className="text-sm text-gray-600">
                  Comprenez votre valeur et négociez votre salaire avec confiance
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour évaluer une offre d'emploi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-cyan-600">💡</span>
                  Considérez les avantages
                </h3>
                <p className="text-sm text-gray-600">
                  Un salaire plus bas peut être compensé par de bons avantages : assurances, REER, vacances supplémentaires, télétravail.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-cyan-600">💡</span>
                  Calculez le salaire net
                </h3>
                <p className="text-sm text-gray-600">
                  N'oubliez pas que le salaire brut n'est pas ce que vous recevrez. Utilisez notre calculateur d'impôt pour voir le net.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-cyan-600">💡</span>
                  Temps partiel vs temps plein
                </h3>
                <p className="text-sm text-gray-600">
                  Ajustez les heures par semaine selon votre situation. 37.5h ou 40h sont standards pour le temps plein.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-cyan-600">💡</span>
                  Heures supplémentaires
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous faites souvent des heures sup, votre revenu réel sera plus élevé (temps et demi après 40h).
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Convertisseur de Taux Horaire. Les calculs sont fournis à titre indicatif seulement.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
