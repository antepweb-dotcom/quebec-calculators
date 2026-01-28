import { Metadata } from 'next'
import RetirementCalculator from '@/components/RetirementCalculator'
import RelatedTools from '@/components/RelatedTools'

export const metadata: Metadata = {
  title: 'Calculateur Épargne Retraite Québec 2026 - REER et Intérêts Composés',
  description: 'Calculez votre épargne-retraite avec les intérêts composés. Planifiez votre REER, CELI et découvrez combien vous accumulerez pour la retraite. Gratuit.',
  keywords: [
    'épargne retraite québec',
    'calculateur reer',
    'calculateur celi',
    'intérêts composés',
    'planification retraite',
    'épargne retraite 2026',
  ],
  alternates: {
    canonical: '/epargne-retraite',
  },
  openGraph: {
    title: "Calculateur Épargne Retraite Québec 2026 - REER et CELI",
    description: "Calculez votre épargne-retraite avec les intérêts composés. Planifiez votre REER et CELI.",
    url: '/epargne-retraite',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Épargne Retraite Québec",
    description: "Planifiez votre retraite de rêve",
  },
}

export default function RetirementPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <span className="bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 text-sm font-semibold inline-block mb-4">
            🌴 Retraite Confortable
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Bâtissez Votre Retraite de Rêve
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculez combien vous accumulerez avec vos REER et CELI grâce aux intérêts composés
          </p>
        </header>

        <div className="mb-12">
          <RetirementCalculator />
        </div>

        {/* Related Tools */}
        <RelatedTools currentTool="/epargne-retraite" currentCategory="investment" />
      </div>
    </main>
    </>
  )
}

