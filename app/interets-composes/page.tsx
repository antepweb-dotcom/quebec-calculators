import { Metadata } from 'next'
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator'
import { TrendingUp, Sparkles, DollarSign, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "Calculateur d'Intérêts Composés - Investissement Québec 2026",
  description: "Découvrez la puissance des intérêts composés! Calculez combien votre investissement pourrait valoir dans 10, 20 ou 30 ans avec des contributions régulières.",
}

export default function CompoundInterestPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculateur d'Intérêts Composés
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment votre argent peut croître de façon exponentielle grâce à la magie des intérêts composés
            </p>
          </header>

          <div className="mb-12">
            <CompoundInterestCalculator />
          </div>

          {/* Educational Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Qu'est-ce que les intérêts composés?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Les intérêts composés sont souvent appelés la <strong>"huitième merveille du monde"</strong>. 
                C'est le principe où vos intérêts génèrent eux-mêmes des intérêts, créant un effet boule de neige.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 1</h3>
                  <p className="text-sm text-gray-600">
                    Vous investissez 1 000 $ à 10%. Vous gagnez 100 $ d'intérêts.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 2</h3>
                  <p className="text-sm text-gray-600">
                    Vous avez maintenant 1 100 $. Vous gagnez 110 $ d'intérêts (sur 1 100 $, pas 1 000 $).
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 30</h3>
                  <p className="text-sm text-gray-600">
                    Votre 1 000 $ initial vaut maintenant 17 449 $ sans rien faire!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour maximiser vos intérêts composés
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Commencez tôt</h3>
                    <p className="text-sm text-gray-600">
                      Le temps est votre meilleur allié. Commencer à 25 ans vs 35 ans peut faire une différence 
                      de centaines de milliers de dollars à la retraite.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Investissez régulièrement</h3>
                    <p className="text-sm text-gray-600">
                      Même de petites contributions mensuelles (100-200 $) peuvent devenir une fortune 
                      grâce aux intérêts composés sur 20-30 ans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Réinvestissez les dividendes</h3>
                    <p className="text-sm text-gray-600">
                      Ne retirez pas vos gains! Laissez-les se réinvestir automatiquement pour 
                      maximiser l'effet des intérêts composés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Utilisez un CELI ou REER</h3>
                    <p className="text-sm text-gray-600">
                      Les comptes enregistrés vous permettent de faire croître votre argent sans payer 
                      d'impôts sur les gains, maximisant ainsi vos rendements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Quel est un bon taux de rendement?</h3>
                <p className="text-sm text-gray-600">
                  Historiquement, le marché boursier (S&P 500) a généré environ 10% par an sur le long terme. 
                  Les obligations offrent 3-5%, et les comptes d'épargne 1-2%. Un portefeuille diversifié 
                  pourrait viser 6-8% de rendement annuel.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">CELI ou REER: lequel choisir?</h3>
                <p className="text-sm text-gray-600">
                  Le CELI est idéal pour la flexibilité (retraits libres d'impôt). Le REER offre une déduction 
                  fiscale immédiate et est parfait pour la retraite. Beaucoup de Québécois utilisent les deux!
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Combien devrais-je investir par mois?</h3>
                <p className="text-sm text-gray-600">
                  Une règle générale est d'épargner 10-20% de votre revenu brut. Si vous gagnez 60 000 $/an, 
                  visez 500-1 000 $/mois. Commencez petit si nécessaire - l'important est de commencer!
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Est-ce que je peux perdre de l'argent?</h3>
                <p className="text-sm text-gray-600">
                  Oui, les investissements comportent des risques. Les marchés fluctuent à court terme, 
                  mais historiquement, ils ont toujours progressé sur le long terme (15-20 ans+). 
                  La diversification et la patience sont clés.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
