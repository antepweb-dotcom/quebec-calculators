import { Metadata } from 'next'
import MortgageCalculator from '@/components/MortgageCalculator'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import { Home, TrendingUp, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur Hypothèque Québec 2026 - Paiement Mensuel + Test de Résistance',
  description: 'Calculez vos paiements hypothécaires mensuels au Québec. Inclut le test de résistance (+2%), graphique d\'amortissement et simulation complète. Gratuit.',
}

export default function MortgagePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur Hypothécaire Québec 2026
          </h1>
          <p className="text-xl text-gray-600">
            Calculez vos paiements mensuels et testez votre capacité d'emprunt
          </p>
        </header>

        {/* Header Ad */}
        <div className="mb-8 flex justify-center">
          <AdSlot position="header" />
        </div>

        {/* 2 Column Layout: Calculator + Sidebar Ad */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <MortgageCalculator />
            
            {/* Mobile Ad - Only visible on mobile, replaces sidebar */}
            <div className="lg:hidden mt-8 flex justify-center">
              <AdSlot position="inArticle" />
            </div>
          </div>
          
          {/* Sidebar Ad - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <AdSlot position="sidebar" />
            </div>
          </div>
        </div>

        {/* In-Article Ad - Desktop only (mobile has one above) */}
        <div className="hidden lg:flex mb-12 justify-center">
          <AdSlot position="inArticle" />
        </div>

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Principal vs Intérêt</h3>
              <p className="text-sm text-gray-600">
                Au début, la majorité de votre paiement va vers les <strong>intérêts</strong>. 
                Avec le temps, une plus grande partie rembourse le <strong>capital</strong> (principal). 
                C'est pourquoi l'amortissement accéléré économise tant d'argent.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Test de résistance (+2%)</h3>
              <p className="text-sm text-gray-600">
                Les banques vérifient si vous pouvez payer avec un taux <strong>2% plus élevé</strong>. 
                Cela garantit que vous pourrez toujours payer si les taux augmentent lors du renouvellement.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Amortissement</h3>
              <p className="text-sm text-gray-600">
                La période d'amortissement est le temps total pour rembourser le prêt. 
                <strong>25 ans</strong> est standard, mais <strong>15-20 ans</strong> économise beaucoup d'intérêts.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour économiser sur votre hypothèque
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Payer aux 2 semaines accéléré réduit l'amortissement
              </h3>
              <p className="text-sm text-gray-600">
                En payant aux 2 semaines accéléré, vous faites <strong>26 paiements par an</strong> (équivalent à 13 mois). 
                Cela peut réduire votre amortissement de <strong>3-5 ans</strong> et économiser des dizaines de milliers en intérêts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Augmentez votre mise de fonds à 20%
              </h3>
              <p className="text-sm text-gray-600">
                Avec une mise de fonds de <strong>20% ou plus</strong>, vous évitez l'assurance prêt hypothécaire (SCHL) 
                qui peut coûter 2-4% du montant emprunté. Cela économise des milliers de dollars.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Magasinez votre taux d'intérêt
              </h3>
              <p className="text-sm text-gray-600">
                Une différence de <strong>0,25%</strong> sur le taux peut vous faire économiser des milliers sur 25 ans. 
                Comparez les offres de plusieurs prêteurs et négociez avec votre banque.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Profitez des paiements anticipés
              </h3>
              <p className="text-sm text-gray-600">
                La plupart des hypothèques permettent de payer jusqu'à <strong>15-20% du capital</strong> par année sans pénalité. 
                Utilisez vos bonus ou remboursements d'impôt pour réduire votre dette plus rapidement.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur Hypothécaire. Les calculs sont fournis à titre indicatif seulement.</p>
          <p className="mt-2">Consultez un conseiller financier pour des conseils personnalisés.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
