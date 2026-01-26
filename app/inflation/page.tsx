import { Metadata } from 'next'
import InflationCalculator from '@/components/InflationCalculator'
import Navbar from '@/components/Navbar'
import AdSlot from '@/components/AdSlot'
import { TrendingDown, TrendingUp, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur Inflation Québec 2026 - Pouvoir d\'Achat depuis 1980 (IPC)',
  description: 'Calculez l\'impact de l\'inflation sur votre argent depuis 1980. Basé sur l\'Indice des Prix à la Consommation (IPC) de la Banque du Canada. Gratuit.',
}

export default function InflationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur d'Inflation
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez comment l'inflation affecte votre pouvoir d'achat
          </p>
        </header>

        <div className="mb-8 flex justify-center"><AdSlot position="header" /></div>
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <InflationCalculator />
            <div className="lg:hidden mt-8 flex justify-center"><AdSlot position="inArticle" /></div>
          </div>
          <div className="hidden lg:block lg:col-span-1"><div className="sticky top-6"><AdSlot position="sidebar" /></div></div>
        </div>
        <div className="hidden lg:flex mb-12 justify-center"><AdSlot position="inArticle" /></div>

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne l'inflation ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Perte de valeur</h3>
              <p className="text-sm text-gray-600">
                L'inflation fait <strong>perdre de la valeur</strong> à votre argent chaque année. 
                100$ en 1990 valent environ 180$ aujourd'hui. Si vous gardez votre argent sous le matelas, 
                vous perdez du pouvoir d'achat.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Indice des Prix (IPC)</h3>
              <p className="text-sm text-gray-600">
                L'<strong>Indice des Prix à la Consommation</strong> mesure l'évolution du coût de la vie. 
                La Banque du Canada vise une inflation de <strong>2% par année</strong>. 
                En 2022-2023, elle a atteint 6-7%, un sommet en 40 ans.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Protection par l'investissement</h3>
              <p className="text-sm text-gray-600">
                Pour protéger votre argent, vous devez <strong>investir</strong> dans des actifs qui génèrent des rendements 
                supérieurs à l'inflation : actions, immobilier, obligations. 
                Un compte d'épargne à 2% ne suffit pas si l'inflation est à 3%.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour protéger votre argent de l'inflation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-orange-600">💡</span>
                Investir est la seule protection contre l'inflation
              </h3>
              <p className="text-sm text-gray-600">
                Garder votre argent dans un compte d'épargne à 2% alors que l'inflation est à 3% signifie que vous <strong>perdez 1% par an</strong>. 
                Investissez dans des actions, des FNB ou de l'immobilier pour battre l'inflation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-orange-600">💡</span>
                Diversifiez vos placements
              </h3>
              <p className="text-sm text-gray-600">
                Ne mettez pas tous vos œufs dans le même panier. Répartissez entre <strong>actions, obligations, immobilier</strong>. 
                Les actions ont historiquement généré 7-10% par an, bien au-dessus de l'inflation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-orange-600">💡</span>
                Maximisez vos REER et CELI
              </h3>
              <p className="text-sm text-gray-600">
                Utilisez vos <strong>comptes enregistrés</strong> (REER, CELI) pour investir à l'abri de l'impôt. 
                Cela maximise vos rendements et vous aide à battre l'inflation plus facilement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-orange-600">💡</span>
                Négociez des augmentations de salaire
              </h3>
              <p className="text-sm text-gray-600">
                Si votre salaire n'augmente pas au rythme de l'inflation, vous perdez du pouvoir d'achat. 
                Négociez des augmentations d'au moins <strong>3-4% par an</strong> pour maintenir votre niveau de vie.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur d'Inflation. Données basées sur l'IPC de la Banque du Canada.</p>
          <p className="mt-2">Les calculs sont fournis à titre indicatif seulement.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
