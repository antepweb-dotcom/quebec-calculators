import { Metadata } from 'next'
import DeclarationSimplifieeClient from './DeclarationSimplifieeClient'

export const metadata: Metadata = {
  title: "Déclaration Impôt Québec 2026 | Estimateur Gratuit PDF",
  description: "Estimez votre remboursement d'impôt rapidement. Téléchargez votre rapport PDF. Simple et confidentiel.",
  keywords: [
    'déclaration impôt québec',
    'remboursement impôt 2026',
    'calculateur impôt pdf',
    'estimateur impôt gratuit',
    'rapport impôt québec',
    'déclaration revenus',
  ],
  alternates: {
    canonical: '/declaration-simplifiee',
  },
  openGraph: {
    title: "Déclaration Impôt Québec 2026 - Estimateur Gratuit PDF",
    description: "Estimez votre remboursement d'impôt en 2 minutes. Téléchargez votre rapport PDF détaillé. Gratuit et confidentiel.",
    url: '/declaration-simplifiee',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Déclaration Impôt Québec 2026",
    description: "Estimez votre remboursement d'impôt rapidement",
  },
}

export default function DeclarationSimplifiee() {
  return <DeclarationSimplifieeClient />
}

