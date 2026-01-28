import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Outils Financiers Québec",
  description: "Notre engagement envers la protection de vos données personnelles.",
}

export default function ConfidentialitePage() {
  return (
    <><main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection de vos données</h2>
              <p className="text-gray-700 mb-4">
                Chez Outils Financiers Québec, nous prenons la confidentialité de vos données très au sérieux. 
                Tous nos calculateurs fonctionnent localement dans votre navigateur.
              </p>
              <p className="text-gray-700">
                <strong>Aucune donnée personnelle n'est collectée, stockée ou transmise à nos serveurs.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des cookies</h2>
              <p className="text-gray-700">
                Nous utilisons uniquement des cookies essentiels pour le fonctionnement du site. 
                Aucun cookie de suivi ou de publicité n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits</h2>
              <p className="text-gray-700">
                Puisque nous ne collectons aucune donnée personnelle, il n'y a aucune information à supprimer ou à modifier. 
                Vos calculs restent privés et ne quittent jamais votre appareil.
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

