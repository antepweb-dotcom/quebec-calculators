import { Metadata } from 'next'
import SalaryLandingClient from './SalaryLandingClient'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
import RelatedTools from '@/components/RelatedTools'
import Breadcrumb from '@/components/Breadcrumb'
import { ToolCrossLink } from '@/components/ToolCrossLink'

export const metadata: Metadata = {
  title: "Calcul Impôt Québec 2026 | Salaire Net après Impôts - Gratuit",
  description: "Calculateur d'impôt Québec 2026 : Calculez votre salaire net après impôts fédéral et provincial. Taux officiels 2026, RRQ, RQAP, AE inclus. Résultat instantané et précis.",
  keywords: [
    'calcul impôt québec',
    'calcul impôt québec 2026',
    'salaire net québec',
    'calculateur impôt québec',
    'revenu net après impôt',
    'taux imposition québec',
    'impôt fédéral provincial',
    'RRQ RQAP AE',
    'déductions salariales québec',
    'taux marginal effectif',
  ],
  alternates: {
    canonical: '/salaire-net-quebec',
  },
  openGraph: {
    title: "Calcul Impôt Québec 2026 - Calculateur Salaire Net Gratuit",
    description: "Calculez votre salaire net après impôts au Québec. Taux officiels 2026, impôts fédéral et provincial, RRQ, RQAP, AE. Résultat instantané.",
    url: '/salaire-net-quebec',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calcul Impôt Québec 2026 - Salaire Net",
    description: "Calculez votre salaire net après impôts au Québec avec les taux officiels 2026",
  },
}

export default function SalaryLandingPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Salaire Net Québec 2026"
        description="Calculateur gratuit pour estimer votre salaire net après impôts au Québec. Intègre tous les taux d'imposition 2026, RRQ, RQAP, AE et déductions fédérales et provinciales. Calcul instantané et précis."
        url="https://qcfinance.ca/salaire-net-quebec"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 2450,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb 
          items={[
            { label: 'Impôts & Revenus', href: '/#impots' },
            { label: 'Salaire Net Québec' }
          ]} 
        />
      </div>
      <SalaryLandingClient />
      
      {/* Smart Cross-Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolCrossLink variant="to-mortgage" />
      </div>
      
      {/* SEO Content and Related Tools */}
      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* SEO Content Section */}
          <SEOContent
            title="Comprendre votre salaire net au Québec"
            intro="Le calcul du salaire net au Québec est complexe car il implique plusieurs paliers d'imposition et déductions obligatoires. Notre calculateur intègre tous les taux 2026 pour vous donner une estimation précise de votre revenu réel après impôts, RRQ, RQAP et assurance-emploi."
            faqs={[
              {
                question: "Comment est calculé mon salaire net?",
                answer: "Votre salaire net est calculé en soustrayant plusieurs déductions de votre salaire brut. D'abord, l'impôt fédéral (15% à 33% selon votre revenu) et l'impôt provincial du Québec (14% à 25,75%). Ensuite, les cotisations au Régime de rentes du Québec (RRQ) à 6,4% jusqu'à 68 500$, le Régime québécois d'assurance parentale (RQAP) à 0,494%, et l'assurance-emploi fédérale (AE) à 1,63%. Le total de ces déductions représente généralement entre 25% et 40% de votre salaire brut, selon votre niveau de revenu."
              },
              {
                question: "Quelle est la différence entre brut et net?",
                answer: "Le salaire brut est le montant total que votre employeur paie avant toute déduction. C'est le chiffre qui apparaît dans votre contrat de travail. Le salaire net est ce qui reste après avoir soustrait tous les impôts et cotisations obligatoires. C'est le montant réel qui est déposé dans votre compte bancaire. Par exemple, un salaire brut de 60 000$ donnera environ 44 000$ net au Québec, soit une différence de 16 000$ (27% de déductions)."
              },
              {
                question: "Quelles sont les déductions obligatoires?",
                answer: "Au Québec, les déductions obligatoires incluent : l'impôt fédéral (taux progressifs de 15% à 33%), l'impôt provincial (14% à 25,75%), le RRQ (6,4% jusqu'à 68 500$), le RQAP (0,494% du salaire brut), et l'assurance-emploi fédérale (1,63% jusqu'à 63 200$). Ces déductions sont automatiquement retenues par votre employeur à chaque paie. Certains employeurs peuvent aussi déduire des cotisations syndicales, des assurances collectives ou des REER collectifs, mais celles-ci sont optionnelles ou négociées."
              },
              {
                question: "Comment réduire mes impôts légalement?",
                answer: "Plusieurs stratégies légales permettent de réduire vos impôts au Québec. Cotisez à un REER (jusqu'à 18% de votre revenu) pour réduire votre revenu imposable immédiatement. Utilisez un CELI pour faire croître vos épargnes à l'abri de l'impôt. Déduisez vos frais de garde d'enfants (jusqu'à 9 000$ par enfant de moins de 7 ans). Si vous travaillez de la maison, déduisez une partie de vos dépenses de bureau. Réclamez les crédits d'impôt pour transport en commun, dons de charité, et frais médicaux. Un planificateur financier peut vous aider à optimiser votre situation."
              },
              {
                question: "Qu'est-ce que le taux d'imposition effectif?",
                answer: "Le taux d'imposition effectif est le pourcentage réel d'impôt que vous payez sur votre revenu total, contrairement au taux marginal qui s'applique seulement à votre dernier dollar gagné. Par exemple, avec un salaire de 70 000$, votre taux marginal pourrait être de 37,12% (combiné fédéral-provincial), mais votre taux effectif sera d'environ 23% car les premiers dollars sont imposés à des taux plus bas. C'est le taux effectif qui détermine vraiment combien vous payez d'impôt au total."
              },
              {
                question: "Les déductions changent-elles chaque année?",
                answer: "Oui, les taux d'imposition et les seuils de cotisation sont ajustés annuellement par les gouvernements fédéral et provincial. En 2026, le maximum des gains admissibles au RRQ est de 68 500$, et le maximum assurable pour l'AE est de 63 200$. Les paliers d'imposition sont aussi indexés à l'inflation chaque année. C'est pourquoi il est important d'utiliser un calculateur à jour comme le nôtre, qui intègre tous les taux 2026 officiels publiés par l'Agence du revenu du Canada et Revenu Québec."
              }
            ]}
          />

          {/* Related Tools Section */}
          <RelatedTools 
            currentTool="/salaire-net-quebec"
            currentCategory="tax"
          />
        </div>
      </div>
    </>
  )
}

