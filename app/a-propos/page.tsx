import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Shield, TrendingUp, Users, Target, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: "À Propos - QCFinance.ca | Outils Financiers pour le Québec",
  description: "Découvrez QCFinance.ca, votre plateforme d'outils financiers gratuits conçue pour aider les Québécois à prendre de meilleures décisions financières.",
}

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">À Propos de QCFinance.ca</h1>
          <p className="text-lg text-gray-600">Votre partenaire financier au Québec</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-10">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>QCFinance.ca</strong> a été créé pour démocratiser l'accès aux outils financiers au Québec. 
                Notre mission est d'aider les résidents du Québec à prendre des décisions financières éclairées grâce 
                à des calculateurs précis, gratuits et faciles à utiliser.
              </p>
              <p>
                Nous croyons fermement que tout le monde devrait avoir accès à des outils financiers de qualité 
                professionnelle, sans frais cachés, sans inscription obligatoire et sans compromis sur la confidentialité.
              </p>
              <p>
                Nos calculateurs sont spécifiquement adaptés aux réalités fiscales et financières du Québec, 
                en tenant compte des taux d'imposition provinciaux et fédéraux, des crédits d'impôt disponibles 
                et des programmes sociaux québécois.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Nos Valeurs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">Confidentialité Absolue</h3>
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  Vos données financières restent 100% privées. Tous les calculs sont effectués localement 
                  dans votre navigateur. Aucune information n'est transmise à nos serveurs.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">Précision Maximale</h3>
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  Nos calculateurs utilisent les taux officiels 2026 de Revenu Québec et de l'ARC. 
                  Nous mettons à jour nos algorithmes régulièrement pour garantir l'exactitude.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-center text-lg">Simplicité d'Usage</h3>
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  Des interfaces intuitives et épurées. Obtenez vos résultats en quelques secondes, 
                  sans jargon compliqué ni processus fastidieux.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Pour Qui?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Particuliers</h3>
                <p className="text-gray-700 text-sm">
                  Planifiez votre budget, calculez vos impôts, évaluez vos prêts et prenez des décisions 
                  financières éclairées pour votre famille.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Travailleurs Autonomes</h3>
                <p className="text-gray-700 text-sm">
                  Estimez vos revenus nets, planifiez vos impôts et gérez votre trésorerie avec nos outils 
                  adaptés aux réalités du travail autonome.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Futurs Propriétaires</h3>
                <p className="text-gray-700 text-sm">
                  Calculez votre capacité d'emprunt, comparez louer vs acheter, et planifiez votre achat 
                  immobilier avec confiance.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Étudiants</h3>
                <p className="text-gray-700 text-sm">
                  Évaluez vos prêts étudiants, planifiez votre budget et comprenez l'impact fiscal de vos 
                  revenus d'été ou de stage.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Outils</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                QCFinance.ca offre une suite complète de calculateurs financiers adaptés au Québec :
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Calculateur d'impôt et salaire net</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Calculateur hypothécaire et capacité d'emprunt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Prêt auto et prêt étudiant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Allocations familiales et frais de garde</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Louer ou acheter - comparateur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Épargne retraite et intérêts composés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>TPS/TVQ et taxe de bienvenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Et bien plus encore...</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Avertissement Important</h2>
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <p className="text-gray-800 mb-3">
                <strong>Les calculs fournis par QCFinance.ca sont à titre informatif et éducatif seulement.</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Bien que nous nous efforcions de maintenir l'exactitude de nos calculateurs, les résultats sont 
                des estimations qui peuvent varier selon votre situation personnelle spécifique.
              </p>
              <p className="text-gray-700">
                Pour des conseils financiers, fiscaux ou juridiques personnalisés, veuillez consulter un 
                professionnel qualifié (comptable, planificateur financier, conseiller fiscal, etc.).
              </p>
            </div>
          </section>

          <section className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Une Question? Un Problème?</h2>
            <p className="text-gray-700 text-center mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Nous Contacter
              </Link>
              <Link 
                href="/faq" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Voir la FAQ
              </Link>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

