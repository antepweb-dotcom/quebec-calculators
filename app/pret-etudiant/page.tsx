import { Metadata } from 'next'
import StudentLoanCalculator from '@/components/StudentLoanCalculator'

export const metadata: Metadata = {
  title: "Calculateur Prêt Étudiant Québec - Remboursement AFE",
  description: "Calculez vos paiements de prêt étudiant avec crédit d'impôt. Découvrez combien vous économisez grâce au crédit d'impôt québécois sur les intérêts (20%).",
}

export default function StudentLoanPage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculateur de Prêt Étudiant
            </h1>
            <p className="text-xl text-gray-600">
              Calculez vos paiements et découvrez vos économies d'impôt
            </p>
          </header>

          {/* Calculator */}
          <div className="mb-12">
            <StudentLoanCalculator />
          </div>

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne le remboursement ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Paiements mensuels</h3>
                <p className="text-sm text-gray-600">
                  Remboursez votre prêt en versements mensuels fixes sur la durée choisie
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Crédit d'impôt</h3>
                <p className="text-sm text-gray-600">
                  Récupérez environ 20% des intérêts payés grâce au crédit d'impôt québécois
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Flexibilité</h3>
                <p className="text-sm text-gray-600">
                  Possibilité de reporter les paiements en cas de difficultés financières
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour rembourser plus rapidement
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">💡</span>
                  Payez plus que le minimum
                </h3>
                <p className="text-sm text-gray-600">
                  Même 50$ de plus par mois peut réduire significativement la durée du prêt et les intérêts totaux.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">💡</span>
                  Profitez du crédit d'impôt
                </h3>
                <p className="text-sm text-gray-600">
                  N'oubliez pas de déclarer vos intérêts de prêt étudiant dans votre déclaration d'impôt pour récupérer le crédit.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">💡</span>
                  Utilisez vos remboursements d'impôt
                </h3>
                <p className="text-sm text-gray-600">
                  Appliquez vos remboursements d'impôt directement sur votre prêt pour réduire le capital plus rapidement.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">💡</span>
                  Programme d'aide au remboursement
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous avez des difficultés, le Programme d'aide au remboursement (PAR) peut réduire vos paiements mensuels.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
