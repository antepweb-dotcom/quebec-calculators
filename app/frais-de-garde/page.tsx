import { Metadata } from 'next'
import DaycareCalculator from '@/components/DaycareCalculator'
import AdSlot from '@/components/AdSlot'
import { Baby, DollarSign, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur Frais de Garde Québec 2026 - CPE vs Garderie Privée (Crédit d\'Impôt)',
  description: 'Comparez les coûts réels entre CPE subventionné (9,10$/jour) et garderie privée au Québec. Inclut le crédit d\'impôt provincial jusqu\'à 78%. Gratuit.',
}

export default function DaycarePage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur de Frais de Garde 2026
          </h1>
          <p className="text-xl text-gray-600">
            Comparez les coûts entre CPE (subventionné) et garderie privée
          </p>
        </header>

        <div className="mb-8 flex justify-center"><AdSlot position="header" /></div>
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <DaycareCalculator />
            <div className="lg:hidden mt-8 flex justify-center"><AdSlot position="inArticle" /></div>
          </div>
          <div className="hidden lg:block lg:col-span-1"><div className="sticky top-6"><AdSlot position="sidebar" /></div></div>
        </div>
        <div className="hidden lg:flex mb-12 justify-center"><AdSlot position="inArticle" /></div>

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le système de garde au Québec ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Baby className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">CPE (Subventionné)</h3>
              <p className="text-sm text-gray-600">
                Les <strong>Centres de la petite enfance</strong> sont subventionnés par le gouvernement. 
                Le tarif est fixe à <strong>9,10$/jour</strong> (2026), peu importe votre revenu. 
                Mais les places sont limitées et les listes d'attente sont longues.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Garderie Privée</h3>
              <p className="text-sm text-gray-600">
                Les garderies privées coûtent plus cher (40-60$/jour), mais offrent plus de flexibilité et de disponibilité. 
                Le gouvernement offre un <strong>crédit d'impôt remboursable</strong> pour compenser les coûts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Crédit d'Impôt Remboursable</h3>
              <p className="text-sm text-gray-600">
                Le Québec offre un <strong>crédit d'impôt de 26% à 78%</strong> des frais de garde en garderie privée, 
                selon votre revenu familial. Plus votre revenu est bas, plus le crédit est élevé. 
                C'est un <strong>remboursement direct</strong>, pas juste une déduction.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour optimiser vos frais de garde
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Inscrivez-vous sur les listes d'attente CPE dès maintenant
              </h3>
              <p className="text-sm text-gray-600">
                Les listes d'attente pour les CPE peuvent être de <strong>1-2 ans</strong>. 
                Inscrivez votre enfant dès la grossesse pour maximiser vos chances d'obtenir une place.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Conservez tous vos reçus
              </h3>
              <p className="text-sm text-gray-600">
                Pour réclamer le crédit d'impôt, vous devez avoir des <strong>reçus officiels</strong> de votre garderie. 
                Gardez-les précieusement et vérifiez qu'ils incluent le NAS de l'enfant et le numéro d'entreprise de la garderie.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Comparez plusieurs garderies privées
              </h3>
              <p className="text-sm text-gray-600">
                Les tarifs varient beaucoup (40-60$/jour). Avec le crédit d'impôt, une garderie à 50$/jour peut coûter 
                moins cher qu'une à 45$/jour si elle offre de meilleurs services. <strong>Faites le calcul net!</strong>
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Ouvrez un REEE pour votre enfant
              </h3>
              <p className="text-sm text-gray-600">
                Utilisez vos économies de frais de garde pour ouvrir un <strong>REEE</strong> (Régime d'épargne-études). 
                Le gouvernement ajoute 30% de subventions sur vos cotisations (SCEE + IQEE).
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur Frais de Garde. Les calculs sont fournis à titre indicatif seulement.</p>
          <p className="mt-2">Les crédits d'impôt varient selon votre situation fiscale. Consultez Revenu Québec pour plus de détails.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
