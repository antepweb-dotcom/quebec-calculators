import { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import RentVsBuyCalculator from '@/components/RentVsBuyCalculator'

export const metadata: Metadata = {
  title: "Louer ou Acheter au Québec? Calculateur et Comparatif 2026",
  description: "Est-il mieux d'acheter une maison ou de rester locataire? Faites le calcul mathématique précis avec notre comparateur. Analyse sur 5 ans incluant tous les coûts.",
}

export default function RentVsBuyPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Louer ou Acheter?
            </h1>
            <p className="text-xl text-gray-600">
              La question éternelle. Comparez financièrement l'achat vs la location sur 5 ans.
            </p>
          </header>

          {/* Header Ad */}
          <div className="mb-8 flex justify-center">
            <AdSlot position="header" />
          </div>

          {/* 2 Column Layout */}
          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <RentVsBuyCalculator />
              
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
              Comment fonctionne ce calculateur?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Scénario Achat</h3>
                <p className="text-sm text-gray-600">
                  Calcule l'appréciation de la maison, le capital remboursé, moins tous les coûts (intérêts, taxes, entretien)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Scénario Location</h3>
                <p className="text-sm text-gray-600">
                  Investit votre mise de fonds et la différence mensuelle dans un portefeuille, moins les loyers payés
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Comparaison 5 ans</h3>
                <p className="text-sm text-gray-600">
                  Compare votre valeur nette après 5 ans dans chaque scénario pour vous aider à décider
                </p>
              </div>
            </div>
          </section>

          {/* Assumptions Section */}
          <section className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Hypothèses du calculateur
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-green-600">🏠</span>
                  Coûts d'achat inclus
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Hypothèque à 5,5% (taux moyen 2026)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Taxes municipales: 1,2% de la valeur annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Taxe de bienvenue (droits de mutation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Entretien: 1% de la valeur annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Appréciation: 3% annuellement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🏢</span>
                  Coûts de location inclus
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Augmentation de loyer: 2,5% annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mise de fonds investie dans un portefeuille</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Différence mensuelle investie (si loyer &lt; hypothèque)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Rendement des placements ajustable (2-10%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Aucun frais de déménagement inclus</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Factors to Consider */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Autres facteurs à considérer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  ✅ Avantages d'acheter
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Accumulation de capital et patrimoine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Stabilité et contrôle de votre espace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Possibilité de rénovations et personnalisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Protection contre les hausses de loyer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Potentiel de revenu locatif (logement multiple)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-blue-600 mb-3 flex items-center gap-2">
                  ✅ Avantages de louer
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Flexibilité et mobilité géographique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Pas de responsabilité d'entretien majeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Liquidité: votre capital reste disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Diversification des investissements possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Pas de risque de baisse du marché immobilier</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour prendre votre décision
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Évaluez votre stabilité</h3>
                  <p className="text-sm text-gray-600">
                    Acheter est généralement plus avantageux si vous prévoyez rester au même endroit pendant au moins 5 ans. 
                    La mobilité professionnelle favorise la location.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Considérez le marché local</h3>
                  <p className="text-sm text-gray-600">
                    Dans certains quartiers de Montréal ou Québec, le ratio prix/loyer peut rendre la location plus avantageuse. 
                    Comparez les prix dans votre secteur spécifique.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Soyez réaliste sur les coûts</h3>
                  <p className="text-sm text-gray-600">
                    Les propriétaires sous-estiment souvent les coûts d'entretien. Prévoyez un fonds d'urgence de 1-2% de la valeur annuellement 
                    pour les réparations imprévues (toiture, plomberie, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">La discipline d'épargne est cruciale</h3>
                  <p className="text-sm text-gray-600">
                    Si vous louez, vous DEVEZ investir la différence pour que le scénario location soit avantageux. 
                    Sans discipline d'épargne, acheter force l'accumulation de capital.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>© 2026 Louer ou Acheter Québec. Les calculs sont fournis à titre indicatif seulement. Consultez un conseiller financier pour votre situation spécifique.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
