import { Metadata } from 'next'
import DeclarationSimplifieeClient from './DeclarationSimplifieeClient'

export const metadata: Metadata = {
  title: "Assistant Déclaration Impôt Québec 2026 - Estimateur Gratuit & PDF",
  description: "Estimez votre remboursement d'impôt rapidement. Saisissez vos cases T4 et Relevé 1, calculez votre retour et téléchargez votre rapport PDF. Simple et confidentiel.",
  alternates: {
    canonical: '/declaration-simplifiee',
  },
}

export default function DeclarationSimplifiee() {
  return <DeclarationSimplifieeClient />
}
