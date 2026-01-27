import { Metadata } from 'next'
import RentCalculator from '@/components/RentCalculator'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import { Scale, FileText, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculateur Augmentation de Loyer Québec 2026 - TAL (Tribunal Logement)',
  description: 'Calculez l\'augmentation de loyer permise selon le TAL. Outil officiel basé sur les règles du Tribunal administratif du logement du Québec. Gratuit et précis.',
}

export default function RentIncreasePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculateur d'Augmentation de Loyer 2026
          </h1>
          <p className="text-xl text-gray-600">
            Basé sur les règles du Tribunal administratif du logement (TAL)
          </p>
        </header>

        {/* Header Ad */}
        <div className="mb-8 flex justify-center">
          <AdSlot position="header" />
        </div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <RentCalculator />
            
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
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Indice de base (4%)</h3>
              <p className="text-sm text-gray-600">
                Le TAL publie un <strong>indice de base annuel</strong> (environ 4% en 2026) qui reflète l'inflation. 
                C'est le point de départ pour toute augmentation de loyer au Québec.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Scale className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Rôle du TAL (Tribunal)</h3>
              <p className="text-sm text-gray-600">
                Le <strong>Tribunal administratif du logement</strong> (anciennement Régie du logement) fixe les règles d'augmentation. 
                Si vous contestez, le TAL peut réviser l'augmentation proposée par le propriétaire.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dépenses justifiées</h3>
              <p className="text-sm text-gray-600">
                Le propriétaire peut ajouter des augmentations pour <strong>taxes, assurances, travaux majeurs</strong>. 
                Mais il doit fournir des preuves (factures, relevés) si vous contestez.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer une augmentation de loyer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Gardez vos factures de rénovations
              </h3>
              <p className="text-sm text-gray-600">
                Si le propriétaire justifie l'augmentation par des travaux, demandez les <strong>factures détaillées</strong>. 
                Vous avez le droit de contester si les montants semblent exagérés ou si les travaux n'ont pas été faits.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Vous avez 21 jours pour refuser
              </h3>
              <p className="text-sm text-gray-600">
                Après avoir reçu l'avis d'augmentation, vous avez <strong>21 jours</strong> pour refuser par écrit. 
                Si vous ne répondez pas, l'augmentation est automatiquement acceptée.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Utilisez le formulaire officiel du TAL
              </h3>
              <p className="text-sm text-gray-600">
                Pour contester, remplissez le <strong>formulaire de refus du TAL</strong> et envoyez-le au propriétaire ET au Tribunal. 
                Téléchargez-le gratuitement sur le site du TAL.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Négociez avant d'aller au TAL
              </h3>
              <p className="text-sm text-gray-600">
                Discutez avec votre propriétaire avant de contester officiellement. 
                Souvent, un <strong>compromis</strong> peut être trouvé sans passer par le Tribunal, ce qui économise du temps et de l'argent.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur d'Augmentation de Loyer. Les calculs sont fournis à titre indicatif seulement.</p>
          <p className="mt-2">Consultez le TAL pour les règles officielles et les taux exacts.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
