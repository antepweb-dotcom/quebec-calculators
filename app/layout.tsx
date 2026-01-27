import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GlobalWrapper from '@/components/GlobalWrapper'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://quebec-calculators.vercel.app'),
  title: {
    template: '%s | Quebec Calculators',
    default: 'Outils Financiers Québec 2026 - Impôt, Immobilier, Auto & Famille',
  },
  description: 'Le site référence pour vos finances au Québec. 19 calculateurs gratuits pour impôts, hypothèque, salaire net, allocations familiales et plus. Mis à jour 2026.',
  keywords: [
    'calculateur impôt québec',
    'salaire net québec',
    'calculateur hypothèque',
    'allocations familiales',
    'outils financiers québec',
    'calculateur québec 2026',
    'impôt québec 2026',
    'taxe de bienvenue',
    'loyer québec',
  ],
  authors: [{ name: 'Quebec Calculators' }],
  creator: 'Quebec Calculators',
  publisher: 'Quebec Calculators',
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
    siteName: 'Quebec Calculators',
    title: 'Outils Financiers Québec 2026 - Impôt, Immobilier, Auto & Famille',
    description: 'Le site référence pour vos finances au Québec. 19 calculateurs gratuits pour impôts, hypothèque, salaire net, allocations familiales et plus.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outils Financiers Québec 2026',
    description: 'Le site référence pour vos finances au Québec. 19 calculateurs gratuits.',
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${plusJakartaSans.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white text-slate-900`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <GlobalWrapper>
          <Header />
          <main className="min-h-screen pt-4 pb-12">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </GlobalWrapper>
      </body>
    </html>
  )
}
