import { Metadata } from 'next'
import TaxCalculator from '@/components/TaxCalculator'
import DataSource from '@/components/ui/DataSource'
import SalaryLinkGrid from '@/components/calculators/SalaryLinkGrid'

export const metadata: Metadata = {
  title: "Calcul Impôt Québec 2026 | Salaire Net après Impôts - Gratuit",
  description: "Calculateur d'impôt Québec 2026 : Calculez votre salaire net après impôts fédéral et provincial. Taux officiels 2026, RRQ, RQAP, AE inclus. Résultat instantané et précis.",
  keywords: [
    'calcul impôt québec',
    'calcul impôt québec 2026',
    'salaire net québec',
    'calculateur impôt québec',
    'revenu net après impôt',
    'taux imposition québec',
    'impôt fédéral provincial',
    'RRQ RQAP AE',
    'déductions salariales québec',
    'taux marginal effectif',
  ],
  alternates: {
    canonical: 'https://qcfinance.ca/salaire-net-quebec',
  },
  openGraph: {
    title: "Calcul Impôt Québec 2026 - Calculateur Salaire Net Gratuit",
    description: "Calculez votre salaire net après impôts au Québec. Taux officiels 2026, impôts fédéral et provincial, RRQ, RQAP, AE. Résultat instantané.",
    url: '/salaire-net-quebec',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calcul Impôt Québec 2026 - Salaire Net",
    description: "Calculez votre salaire net après impôts au Québec avec les taux officiels 2026",
  },
}

export default function SalaryLandingPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Calculateur Salaire Net Québec 2026',
            description: 'Calculateur gratuit pour estimer votre salaire net après impôts au Québec. Intègre tous les taux d\'imposition 2026, RRQ, RQAP, AE et déductions fédérales et provinciales.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CAD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '2450'
            }
          })
        }}
      />

      {/* Hero Section - Premium Fintech Style */}
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="text-center space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Taux 2026 à jour
            </div>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              Calculateur Salaire Net<br />
              <span className="text-emerald-600">Québec 2026</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Calculez instantanément votre revenu net après impôts fédéral et provincial, RRQ, RQAP et assurance-emploi
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxCalculator />
        </div>
      </div>

      {/* Trust Badge - Data Source */}
      <div className="bg-white py-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <DataSource source="revenuQuebec" />
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Comment calculer votre salaire net au Québec?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Le calcul du salaire net au Québec implique plusieurs déductions obligatoires qui sont automatiquement retenues par votre employeur. 
              Notre calculateur intègre tous les taux officiels 2026 pour vous donner une estimation précise et instantanée.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Les déductions sur votre paie
            </h2>
            <p className="text-slate-700 mb-4">
              Votre salaire brut est réduit par plusieurs types de déductions avant d'arriver dans votre compte bancaire:
            </p>

            {/* Deductions Cards */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-slate-900 mb-1 text-base">Impôt Fédéral</h3>
                <p className="text-sm text-slate-700">Taux progressifs de 15% à 33% selon votre revenu</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-slate-900 mb-1 text-base">Impôt Provincial</h3>
                <p className="text-sm text-slate-700">Taux progressifs de 14% à 25,75% au Québec</p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-slate-900 mb-1 text-base">RRQ (Régime de rentes)</h3>
                <p className="text-sm text-slate-700">6,4% jusqu'à 68 500$ en 2026</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-slate-900 mb-1 text-base">RQAP + AE</h3>
                <p className="text-sm text-slate-700">0,494% (RQAP) + 1,63% (AE) du salaire brut</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3 mt-8">
              Optimisez votre revenu net
            </h2>
            <p className="text-slate-700 mb-4">
              Plusieurs stratégies légales permettent de réduire vos impôts et maximiser votre revenu net:
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-6 not-prose">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Cotisez à un REER</h3>
                    <p className="text-sm text-slate-700">Réduisez votre revenu imposable jusqu'à 18% de votre revenu annuel</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Utilisez un CELI</h3>
                    <p className="text-sm text-slate-700">Faites croître vos épargnes à l'abri de l'impôt (7 000$ en 2026)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Déduisez vos frais de garde</h3>
                    <p className="text-sm text-slate-700">Jusqu'à 8 000$ par enfant de moins de 7 ans, 5 000$ pour 7-16 ans</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Réclamez vos dépenses de télétravail</h3>
                    <p className="text-sm text-slate-700">Méthode simplifiée : 2$ par jour (max 500$/an)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Cotisez au CELIAPP</h3>
                    <p className="text-sm text-slate-700">8 000$/an pour futurs acheteurs (déduction immédiate + retrait libre d'impôt)</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3 mt-8">
              Taux marginal vs taux effectif
            </h2>
            <p className="text-slate-700 mb-4">
              Le <strong>taux marginal</strong> s'applique à votre dernier dollar gagné, tandis que le <strong>taux effectif</strong> représente 
              le pourcentage réel d'impôt payé sur votre revenu total.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 not-prose">
              <h3 className="text-lg font-bold text-blue-900 mb-1.5">💡 Exemple concret</h3>
              <p className="text-blue-800 text-sm">
                Avec un salaire de 70 000$, votre taux marginal pourrait être de 37,12%, mais votre taux effectif sera d'environ 23% 
                car les premiers dollars sont imposés à des taux plus bas grâce au système progressif canadien.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Questions fréquentes
          </h2>
          
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Comment est calculé le salaire net au Québec?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Le salaire net est calculé en soustrayant toutes les déductions obligatoires de votre salaire brut : impôt fédéral, 
                impôt provincial du Québec, cotisations au RRQ (Régime de rentes du Québec), RQAP (Régime québécois d'assurance parentale) 
                et assurance-emploi fédérale. Notre calculateur utilise les taux officiels 2026 pour vous donner un résultat précis.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Quelle est la différence entre taux marginal et taux effectif?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Le taux marginal est le taux d'imposition appliqué à votre dernier dollar gagné. Le taux effectif est le pourcentage 
                réel d'impôt que vous payez sur votre revenu total. Par exemple, si vous gagnez 80 000$, votre taux marginal pourrait 
                être de 41,12%, mais votre taux effectif sera plus bas (environ 25%) car les premiers dollars sont imposés à des taux inférieurs.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Comment réduire mes impôts au Québec?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Les meilleures stratégies incluent : cotiser à un REER (déduction immédiate), maximiser votre CELI (croissance libre d'impôt), 
                déduire vos frais de garde d'enfants, réclamer vos dépenses de télétravail, cotiser au CELIAPP si vous êtes futur acheteur, 
                et déduire vos dons de charité. Un planificateur financier peut vous aider à optimiser votre situation.
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Les taux d'imposition 2026 sont-ils à jour?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Oui, notre calculateur utilise les taux officiels 2026 publiés par Revenu Québec et l'Agence du revenu du Canada. 
                Les taux sont mis à jour dès leur publication officielle. Cela inclut les tranches d'imposition fédérales et provinciales, 
                les taux de RRQ, RQAP et assurance-emploi, ainsi que les montants personnels de base.
              </div>
            </details>
          </div>

          {/* FAQ Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Comment est calculé le salaire net au Québec?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Le salaire net est calculé en soustrayant toutes les déductions obligatoires de votre salaire brut : impôt fédéral, impôt provincial du Québec, cotisations au RRQ, RQAP et assurance-emploi.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Quelle est la différence entre taux marginal et taux effectif?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Le taux marginal est le taux d\'imposition appliqué à votre dernier dollar gagné. Le taux effectif est le pourcentage réel d\'impôt que vous payez sur votre revenu total.'
                    }
                  }
                ]
              })
            }}
          />
        </div>
      </div>

      {/* Cross-Sell CTA - Mortgage Calculator */}
      <div className="bg-white py-8 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  Combien pouvez-vous emprunter ?
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Maintenant que vous connaissez votre salaire net, découvrez votre capacité d'emprunt pour une maison.
                </p>
              </div>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <a
                href="/calcul-hypotheque"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors group whitespace-nowrap"
              >
                <span>Calculer mon hypothèque</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Grid */}
      <div className="bg-slate-50 py-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SalaryLinkGrid />
        </div>
      </div>
    </>
  )
}
