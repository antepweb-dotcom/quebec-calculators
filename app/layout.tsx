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
  title: 'Calculateur d\'Impôt Québec 2026 | Calculez votre revenu net',
  description: 'Calculateur d\'impôt gratuit pour le Québec 2026. Calculez votre revenu net après impôts fédéral, provincial, RRQ, RQAP et AE.',
  keywords: 'calculateur impôt québec, impôt québec 2026, revenu net québec, calculateur salaire québec',
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
