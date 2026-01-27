import { Metadata } from 'next'
import AutoLoanCalculator from '@/components/AutoLoanCalculator'
import AdSlot from '@/components/AdSlot'
import { Car, TrendingDown, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur Prêt Auto Québec 2026 - Financement Voiture (Mensuel + Bi-hebdo)',
  description: 'Calculez vos paiements de financement automobile au Québec. Inclut TPS/TVQ, échange, et paiements bi-hebdomadaires. Comparez les termes de 36 à 84 mois.',
}

export default function AutoLoanPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur de Prêt Auto Québec 2026
          </h1>
          <p className="text-xl text-gray-600">
            Calculez vos paiements mensuels et aux deux semaines pour votre véhicule
          </p>
        </header>

        <div className="mb-8 flex justify-center">
          <AdSlot position="header" />
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <AutoLoanCalculator />
            <div className="lg:hidden mt-8 flex justify-center">
              <AdSlot position="inArticle" />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <AdSlot position="sidebar" />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex mb-12 justify-center">
          <AdSlot position="inArticle" />
        </div>

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le financement auto ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bi-hebdomadaire vs Mensuel</h3>
              <p className="text-sm text-gray-600">
                Payer <strong>aux 2 semaines</strong> signifie 26 paiements par an (équivalent à 13 mois). 
                Cela réduit votre dette plus rapidement et économise des intérêts comparé aux paiements mensuels (12 par an).
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Coût des intérêts</h3>
              <p className="text-sm text-gray-600">
                Plus la durée du prêt est longue, plus vous payez d'intérêts. 
                Un prêt de <strong>84 mois</strong> peut coûter 50% de plus en intérêts qu'un prêt de <strong>48 mois</strong>, 
                même si les paiements sont plus bas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mise de fonds</h3>
              <p className="text-sm text-gray-600">
                Une mise de fonds de <strong>20% ou plus</strong> réduit votre montant financé, 
                vos paiements mensuels, et le total des intérêts payés. 
                Cela vous protège aussi contre la dépréciation rapide du véhicule.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour économiser sur votre prêt auto
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Financer sur 84 mois coûte cher en intérêts
              </h3>
              <p className="text-sm text-gray-600">
                Même si les paiements sont plus bas, un prêt de <strong>7 ans (84 mois)</strong> peut vous coûter 
                des milliers de dollars de plus en intérêts. Visez <strong>48-60 mois</strong> maximum si possible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Améliorez votre cote de crédit avant
              </h3>
              <p className="text-sm text-gray-600">
                Une cote de crédit de <strong>700+</strong> vous donne accès aux meilleurs taux (4-6%). 
                Une cote sous 600 peut vous coûter 10-15% d'intérêt, soit des milliers de dollars de plus.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Négociez le prix, pas le paiement
              </h3>
              <p className="text-sm text-gray-600">
                Les concessionnaires aiment négocier sur le paiement mensuel. Concentrez-vous plutôt sur le <strong>prix total du véhicule</strong> 
                et le <strong>taux d'intérêt</strong>. C'est là que vous économisez vraiment.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Considérez l'achat d'un véhicule d'occasion
              </h3>
              <p className="text-sm text-gray-600">
                Un véhicule neuf perd <strong>20-30% de sa valeur</strong> dans les 2 premières années. 
                Acheter un véhicule de 2-3 ans vous fait économiser énormément tout en ayant un véhicule quasi-neuf.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur Prêt Auto. Les calculs sont fournis à titre indicatif seulement.</p>
          <p className="mt-2">Les taux d'intérêt varient selon votre cote de crédit et le prêteur.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
