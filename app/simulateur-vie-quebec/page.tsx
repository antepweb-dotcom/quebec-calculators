import WizardSimulator from '@/src/components/WizardSimulator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulateur de Vie au Québec 2025-2026 | Calculateur Salaire Net & Budget',
  description: 'Simulateur gratuit et complet pour calculer votre salaire net, impôts, coût de la vie et épargne au Québec. Comparez Montréal, Québec, Laval et 7 autres villes. Résultats instantanés basés sur les taux 2025-2026.',
  keywords: [
    'simulateur vie québec',
    'calculateur salaire net québec',
    'coût de la vie québec 2026',
    'impôts québec 2025',
    'budget québec',
    'salaire net montréal',
    'calculateur budget québec',
    'pouvoir achat québec',
    'loyer montréal',
    'comparaison villes québec',
    'épargne québec',
    'calculateur financier québec'
  ],
  authors: [{ name: 'QCFinance.ca' }],
  creator: 'QCFinance.ca',
  publisher: 'QCFinance.ca',
  alternates: {
    canonical: 'https://qcfinance.ca/simulateur-vie-quebec',
  },
  openGraph: {
    title: 'Simulateur de Vie au Québec 2025-2026 | Calculateur Complet',
    description: 'Calculez votre salaire net, impôts et budget au Québec en 3 étapes. Comparez 10 villes québécoises. Gratuit et basé sur les taux officiels 2025-2026.',
    url: 'https://qcfinance.ca/simulateur-vie-quebec',
    siteName: 'QCFinance.ca',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur de Vie au Québec 2025-2026',
    description: 'Calculez votre salaire net et budget au Québec. Comparez 10 villes. Gratuit!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function SimulateurVieQuebecPage() {
  return <WizardSimulator />;
}
