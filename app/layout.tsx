import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GlobalWrapper from '@/components/GlobalWrapper'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="fr-CA">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <GlobalWrapper>
          {children}
        </GlobalWrapper>
      </body>
    </html>
  )
}
