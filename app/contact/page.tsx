import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Bug, Lightbulb, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Contact - Nous Joindre | QCFinance.ca",
  description: "Contactez l'équipe de QCFinance.ca pour vos questions, suggestions ou signaler un problème.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contactez-Nous</h1>
          <p className="text-lg text-gray-600">Nous sommes là pour vous aider</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informations de Contact</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Courriel Principal</h3>
                <a 
                  href="mailto:contact@qcfinance.ca" 
                  className="text-blue-600 hover:text-blue-700 underline text-lg"
                >
                  contact@qcfinance.ca
                </a>
                <p className="text-sm text-gray-600 mt-1">Pour toutes questions générales</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Support Technique</h3>
                <a 
                  href="mailto:support@qcfinance.ca" 
                  className="text-blue-600 hover:text-blue-700 underline text-lg"
                >
                  support@qcfinance.ca
                </a>
                <p className="text-sm text-gray-600 mt-1">Pour signaler un bug ou problème technique</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Protection des Données</h3>
                <a 
                  href="mailto:privacy@qcfinance.ca" 
                  className="text-blue-600 hover:text-blue-700 underline text-lg"
                >
                  privacy@qcfinance.ca
                </a>
                <p className="text-sm text-gray-600 mt-1">Questions sur la confidentialité</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Temps de Réponse</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nous nous efforçons de répondre à tous les courriels dans un délai de <strong>24 à 48 heures</strong> 
                  durant les jours ouvrables.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Avant de Nous Contacter</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Consultez notre FAQ pour trouver rapidement des réponses aux questions courantes.
              </p>
              <Link 
                href="/faq" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Voir la FAQ
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Liens Utiles</h3>
              <div className="space-y-3">
                <Link 
                  href="/a-propos" 
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>À Propos de QCFinance.ca</span>
                </Link>
                <Link 
                  href="/confidentialite" 
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>Politique de Confidentialité</span>
                </Link>
                <Link 
                  href="/conditions" 
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>Conditions d'Utilisation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Reasons */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment Pouvons-Nous Vous Aider?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Bug className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Signaler un Bug</h3>
              <p className="text-sm text-gray-600 mb-4">
                Un calculateur ne fonctionne pas correctement? Signalez-nous le problème.
              </p>
              <a 
                href="mailto:support@qcfinance.ca?subject=Signalement de Bug" 
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Signaler →
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Suggérer une Idée</h3>
              <p className="text-sm text-gray-600 mb-4">
                Vous avez une idée de nouveau calculateur ou d'amélioration?
              </p>
              <a 
                href="mailto:contact@qcfinance.ca?subject=Suggestion" 
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Suggérer →
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Question Générale</h3>
              <p className="text-sm text-gray-600 mb-4">
                Une question sur nos outils ou notre mission?
              </p>
              <a 
                href="mailto:contact@qcfinance.ca?subject=Question" 
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                Demander →
              </a>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-600 rounded-r-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Important à Noter
          </h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <strong>QCFinance.ca ne fournit pas de conseils financiers, fiscaux ou juridiques personnalisés.</strong>
            </p>
            <p>
              Nos outils sont conçus à des fins informatives et éducatives uniquement. Pour des conseils adaptés 
              à votre situation personnelle, veuillez consulter un professionnel qualifié (comptable, planificateur 
              financier, conseiller fiscal, etc.).
            </p>
            <p className="pt-2">
              Nous ne répondons pas aux questions nécessitant une expertise professionnelle en finance, fiscalité ou droit.
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Localisation</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Québec, Canada</h3>
              <p className="text-gray-700">
                QCFinance.ca est fièrement exploité depuis le Québec, pour les Québécois.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Tous nos calculateurs sont adaptés aux réalités fiscales et financières du Québec.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
