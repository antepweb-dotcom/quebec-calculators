'use client'

import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import Link from 'next/link'

interface LegalDisclaimerProps {
  variant?: 'banner' | 'inline' | 'compact'
  dismissible?: boolean
}

export default function LegalDisclaimer({ variant = 'banner', dismissible = true }: LegalDisclaimerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible && dismissible) return null

  // Compact variant - minimal space
  if (variant === 'compact') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-gray-700">
        <p className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Avertissement :</strong> Les résultats sont des estimations à titre informatif seulement. 
            Consultez un professionnel pour des conseils personnalisés.{' '}
            <Link href="/avis-legal" className="text-blue-600 hover:underline">En savoir plus</Link>
          </span>
        </p>
      </div>
    )
  }

  // Inline variant - embedded in content
  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded-r-lg p-6 my-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              Avertissement Important
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Les calculs fournis sont des estimations à titre informatif et éducatif seulement.</strong>
              </p>
              <p>
                Ces résultats ne constituent pas des conseils financiers, fiscaux ou juridiques. Votre situation 
                personnelle peut différer et nécessiter une analyse professionnelle.
              </p>
              <p>
                Pour des décisions financières importantes, consultez un professionnel qualifié (comptable, 
                planificateur financier, conseiller fiscal).
              </p>
              <Link 
                href="/avis-legal" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-2"
              >
                Lire l'avis complet →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Banner variant - top of page (default)
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              <strong>Avertissement :</strong> Les résultats sont des estimations à titre informatif. 
              Ne constituent pas des conseils professionnels.{' '}
              <Link href="/avis-legal" className="underline hover:text-amber-100">
                En savoir plus
              </Link>
            </p>
          </div>
          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-amber-600 rounded transition-colors flex-shrink-0"
              aria-label="Fermer l'avertissement"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
