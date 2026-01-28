import { Metadata } from 'next'
import TransferTaxCalculator from '@/components/TransferTaxCalculator'
import { Home, MapPin, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Taxe de Bienvenue Québec 2026 - Calculateur Droits de Mutation (Montréal)',
  description: 'Calculez la taxe de bienvenue (droits de mutation) pour votre achat de maison au Québec. Taux officiels 2026 pour Montréal et toutes les villes. Gratuit.',
}

export default function TransferTaxPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur de Taxe de Bienvenue 2026
          </h1>
          <p className="text-xl text-gray-600">
            Calculez les droits de mutation pour votre achat immobilier au Québec
          </p>
        </header>

        <div className="mb-12">
          <TransferTaxCalculator />
        </div>

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tranches progressives</h3>
              <p className="text-sm text-gray-600">
                La taxe est calculée par <strong>tranches progressives</strong> selon le prix d'achat. 
                Plus le prix est élevé, plus le taux augmente pour chaque tranche. 
                C'est similaire à l'impôt sur le revenu.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Montréal vs Québec</h3>
              <p className="text-sm text-gray-600">
                <strong>Montréal</strong> a des taux plus élevés (jusqu'à 3,5%) que le reste du Québec (max 1,5%). 
                Pour une maison de 500 000$, la différence peut atteindre <strong>10 000$</strong> de plus à Montréal.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Paiement unique</h3>
              <p className="text-sm text-gray-600">
                La taxe de bienvenue est payable <strong>une seule fois</strong> lors de l'achat. 
                Vous avez <strong>30 jours</strong> après la transaction pour payer à la municipalité. 
                Certaines villes offrent des exemptions pour premiers acheteurs.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer la taxe de bienvenue
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Incluez-la dans votre budget d'achat
              </h3>
              <p className="text-sm text-gray-600">
                Beaucoup d'acheteurs oublient cette taxe! Ajoutez <strong>1-3% du prix</strong> à votre budget total. 
                Pour une maison de 400 000$, prévoyez environ 5 000-7 000$ pour la taxe de bienvenue.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Vérifiez les exemptions disponibles
              </h3>
              <p className="text-sm text-gray-600">
                Certaines municipalités offrent des <strong>exemptions partielles ou totales</strong> pour les premiers acheteurs. 
                Contactez votre ville pour connaître les programmes disponibles et économiser des milliers de dollars.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Négociez avec le vendeur
              </h3>
              <p className="text-sm text-gray-600">
                Dans un marché d'acheteurs, vous pouvez parfois négocier pour que le vendeur paie une partie de la taxe de bienvenue. 
                Cela peut faire partie de votre <strong>offre d'achat</strong>.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Planifiez le paiement à l'avance
              </h3>
              <p className="text-sm text-gray-600">
                Vous avez 30 jours pour payer, mais planifiez dès maintenant. Certaines banques permettent d'inclure la taxe dans votre prêt hypothécaire 
                si vous avez une <strong>mise de fonds suffisante</strong>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}
