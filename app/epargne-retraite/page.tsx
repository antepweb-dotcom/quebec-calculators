import { Metadata } from 'next'
import RetirementCalculator from '@/components/RetirementCalculator'
import Navbar from '@/components/Navbar'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Calculateur Épargne Retraite Québec 2026 - REER et Intérêts Composés',
  description: 'Calculez votre épargne-retraite avec les intérêts composés. Planifiez votre REER, CELI et découvrez combien vous accumulerez pour la retraite. Gratuit.',
}

export default function RetirementPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Calculateur d'Épargne-Retraite
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez le pouvoir des intérêts composés pour votre retraite
          </p>
        </header>

        <div className="mb-8 flex justify-center"><AdSlot position="header" /></div>
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <RetirementCalculator />
            <div className="lg:hidden mt-8 flex justify-center"><AdSlot position="inArticle" /></div>
          </div>
          <div className="hidden lg:block lg:col-span-1"><div className="sticky top-6"><AdSlot position="sidebar" /></div></div>
        </div>
        <div className="hidden lg:flex mb-12 justify-center"><AdSlot position="inArticle" /></div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2026 Calculateur Épargne-Retraite. Les calculs sont fournis à titre indicatif seulement.</p>
          <p className="mt-2">Les rendements passés ne garantissent pas les rendements futurs. Consultez un conseiller financier.</p>
        </footer>
      </div>
    </main>
    </>
  )
}
