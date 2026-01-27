import { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import { Calculator, Shield, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: "À Propos - Outils Financiers Québec",
  description: "Découvrez notre mission d'aider les Québécois à prendre de meilleures décisions financières.",
}

export default function AProposPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">À Propos</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-gray-700 mb-4">
                Outils Financiers Québec a été créé pour aider les résidents du Québec à prendre des décisions 
                financières éclairées grâce à des calculateurs précis, gratuits et faciles à utiliser.
              </p>
              <p className="text-gray-700">
                Nous croyons que tout le monde devrait avoir accès à des outils financiers de qualité, 
                sans frais cachés ni inscription obligatoire.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Confidentialité</h3>
                  <p className="text-sm text-gray-600">
                    Vos données restent privées, toujours
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Précision</h3>
                  <p className="text-sm text-gray-600">
                    Basé sur les taux officiels 2026
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Simplicité</h3>
                  <p className="text-sm text-gray-600">
                    Des outils intuitifs et rapides
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Avertissement</h2>
              <p className="text-gray-700">
                Les calculs fournis par nos outils sont à titre indicatif seulement. 
                Pour des conseils financiers personnalisés, veuillez consulter un professionnel qualifié.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
