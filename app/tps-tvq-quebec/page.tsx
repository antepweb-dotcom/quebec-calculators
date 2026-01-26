import { Metadata } from 'next'
import SalesTaxCalculator from '@/components/SalesTaxCalculator'
import Navbar from '@/components/Navbar'
import AdSlot from '@/components/AdSlot'
import { ShoppingCart, FileText, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur TPS TVQ Québec 2026 - Taxes de Vente (5% + 9.975%)',
  description: 'Calculez les taxes de vente au Québec (TPS 5% + TVQ 9.975% = 14.975%). Mode inversé pour extraire les taxes d\'un montant TTC. Simple et rapide.',
}

export default function SalesTaxPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur TPS/TVQ Québec 2026
          </h1>
          <p className="text-xl text-gray-600">
            Calculez les taxes de vente (TPS 5% + TVQ 9,975%) avec calcul inversé
          </p>
        </header>

        {/* Header Ad */}
        <div className="mb-8 flex justify-center">
          <AdSlot position="header" />
        </div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <SalesTaxCalculator />
            
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

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionnent les taxes de vente ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">TPS (Fédérale) - 5%</h3>
              <p className="text-sm text-gray-600">
                La <strong>Taxe sur les produits et services</strong> est perçue par le gouvernement fédéral. 
                Elle s'applique sur la plupart des biens et services au Canada, sauf les produits de base.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">TVQ (Provinciale) - 9,975%</h3>
              <p className="text-sm text-gray-600">
                La <strong>Taxe de vente du Québec</strong> est perçue par le gouvernement provincial. 
                Elle s'applique sur le prix incluant la TPS, ce qui donne un taux combiné de 14,975%.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Produits détaxés (0%)</h3>
              <p className="text-sm text-gray-600">
                Certains biens sont <strong>exonérés de taxes</strong> : produits alimentaires de base, médicaments sur ordonnance, 
                services médicaux, loyers résidentiels, et services de garde d'enfants.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer les taxes de vente
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Réclamez vos crédits de TPS/TVQ
              </h3>
              <p className="text-sm text-gray-600">
                Si votre revenu est faible ou modeste, vous pourriez avoir droit au <strong>crédit de TPS/TVQ</strong> 
                (jusqu'à 467$ par année). Remplissez votre déclaration de revenus pour en bénéficier automatiquement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Achetez des produits de base
              </h3>
              <p className="text-sm text-gray-600">
                Les <strong>aliments de base</strong> (fruits, légumes, viande, pain, lait) ne sont pas taxés. 
                Privilégiez ces produits pour économiser sur vos achats d'épicerie.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Utilisez une carte avec cashback
              </h3>
              <p className="text-sm text-gray-600">
                Récupérez jusqu'à <strong>5% de remise en argent</strong> sur vos achats avec une bonne carte de crédit. 
                Cela compense partiellement les taxes payées.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Gardez vos reçus pour les entreprises
              </h3>
              <p className="text-sm text-gray-600">
                Si vous êtes travailleur autonome ou propriétaire d'entreprise, vous pouvez <strong>récupérer la TPS/TVQ</strong> 
                sur vos achats professionnels. Conservez tous vos reçus!
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur TPS/TVQ Québec. Les calculs sont fournis à titre indicatif seulement.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
