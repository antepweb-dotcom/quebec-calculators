import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GlobalWrapper from '@/components/GlobalWrapper'
import OrganizationSchema from '@/components/OrganizationSchema'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://qcfinance.ca'),
  title: {
    template: '%s | QCFinance - Outils Financiers Québec',
    default: 'QCFinance | Calculatrices d\'Impôt, Hypothèque et Salaire Net Québec (2026)',
  },
  description: 'Le site de référence pour vos finances au Québec. Calculatrices gratuites et précises pour l\'impôt 2026, le salaire net, l\'assurance-emploi et l\'immobilier.',
  keywords: [
    'impôt québec 2026',
    'calcul salaire net québec',
    'calculatrice hypothécaire québec',
    'frais de garde',
    'rrq',
    'rqap',
    'calculateur impôt québec',
    'salaire net québec',
    'allocations familiales',
    'outils financiers québec',
    'taxe de bienvenue',
    'loyer québec',
    'assurance-emploi',
  ],
  authors: [{ name: 'QCFinance' }],
  creator: 'QCFinance',
  publisher: 'QCFinance',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: '/',
    siteName: 'QCFinance',
    title: 'Outils Financiers Québec 2026 - Impôt, Immobilier, Auto & Famille',
    description: 'Le site référence pour vos finances au Québec. 19 calculateurs gratuits pour impôts, hypothèque, salaire net, allocations familiales et plus.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outils Financiers Québec 2026',
    description: 'Le site référence pour vos finances au Québec. 19 calculateurs gratuits.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'theme-color': '#10b981',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-CA">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#10b981" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <style dangerouslySetInnerHTML={{__html: `
          body{margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif}
          .hero-gradient{background:linear-gradient(to bottom,rgb(236 253 245 / 0.5),transparent)}
        `}} />
        <OrganizationSchema />
      </head>
      <body className={`${plusJakartaSans.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white text-slate-900`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <GlobalWrapper>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </GlobalWrapper>
      </body>
    </html>
  )
}

