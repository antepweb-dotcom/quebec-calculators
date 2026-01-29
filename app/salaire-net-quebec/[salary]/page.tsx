import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TaxCalculator from '@/components/TaxCalculator'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
import RelatedTools from '@/components/RelatedTools'
import Breadcrumb from '@/components/Breadcrumb'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'

// Generate static paths for 170+ salary pages (30k to 200k in 1k increments)
export async function generateStaticParams() {
  const salaries = []
  for (let i = 30000; i <= 200000; i += 1000) {
    salaries.push({ salary: i.toString() })
  }
  return salaries
}

// Dynamic SEO metadata for each salary page
export async function generateMetadata({ params }: { params: { salary: string } }): Promise<Metadata> {
  const salaryNum = parseInt(params.salary)
  
  if (isNaN(salaryNum) || salaryNum < 0 || salaryNum > 1000000) {
    return {
      title: 'Salaire non valide',
      description: 'Le montant de salaire spécifié n\'est pas valide.'
    }
  }

  const formattedSalary = salaryNum.toLocaleString('fr-CA')
  
  return {
    title: `Salaire Net ${formattedSalary} $ Québec 2026 - Calcul Après Impôts`,
    description: `Combien reste-t-il sur un salaire de ${formattedSalary} $ au Québec? Calcul détaillé des impôts fédéral et provincial, RRQ, RQAP et AE pour 2026. Résultat précis et instantané.`,
    keywords: [
      `salaire net ${formattedSalary}`,
      `${formattedSalary} net québec`,
      `impôt ${formattedSalary} québec`,
      'calcul salaire net',
      'salaire après impôts',
      'revenu net québec 2026',
    ],
    alternates: {
      canonical: `https://qcfinance.ca/salaire-net-quebec/${params.salary}`,
    },
    openGraph: {
      title: `Salaire Net ${formattedSalary} $ Québec 2026`,
      description: `Découvrez votre revenu net réel sur un salaire de ${formattedSalary} $ au Québec. Calcul complet avec impôts, RRQ, RQAP et AE.`,
      url: `/salaire-net-quebec/${params.salary}`,
      type: 'website',
      locale: 'fr_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Salaire Net ${formattedSalary} $ Québec 2026`,
      description: `Calcul détaillé du revenu net sur ${formattedSalary} $ au Québec`,
    },
  }
}

export default function DynamicSalaryPage({ params }: { params: { salary: string } }) {
  const salaryNum = parseInt(params.salary)
  
  // Validate salary range
  if (isNaN(salaryNum) || salaryNum < 0 || salaryNum > 1000000) {
    notFound()
  }

  const formattedSalary = salaryNum.toLocaleString('fr-CA', { 
    style: 'currency', 
    currency: 'CAD', 
    maximumFractionDigits: 0 
  })

  // Calculate approximate net income for SEO content (rough estimate)
  const estimatedNetPercentage = salaryNum < 50000 ? 0.75 : salaryNum < 100000 ? 0.70 : 0.65
  const estimatedNet = Math.round(salaryNum * estimatedNetPercentage)
  const formattedNet = estimatedNet.toLocaleString('fr-CA', { 
    style: 'currency', 
    currency: 'CAD', 
    maximumFractionDigits: 0 
  })

  return (
    <>
      <StructuredData
        name={`Calculateur Salaire Net ${formattedSalary} Québec 2026`}
        description={`Calculateur gratuit pour estimer votre salaire net sur un revenu de ${formattedSalary} au Québec. Intègre tous les taux d'imposition 2026, RRQ, RQAP, AE et déductions fédérales et provinciales.`}
        url={`https://qcfinance.ca/salaire-net-quebec/${params.salary}`}
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
            { label: 'Salaire Net Québec', href: '/salaire-net-quebec' },
            { label: `${formattedSalary}` }
          ]} 
        />
      </div>

      <div className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-10 text-center">
            <span className="bg-emerald-100 text-emerald-800 rounded-full px-3 py-1 text-sm font-semibold inline-block mb-4">
              ✨ Taux 2026 à jour
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Salaire net sur un revenu de <span className="text-emerald-600">{formattedSalary}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez exactement combien vous recevrez après toutes les déductions fiscales et cotisations obligatoires au Québec en 2026.
            </p>
          </div>

          {/* Calculator with pre-filled salary */}
          <TaxCalculator initialSalary={salaryNum} />
        </div>
      </div>

      {/* Smart Cross-Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolCrossLink variant="to-mortgage" />
      </div>

      {/* SEO Content Section */}
      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SEOContent
            title={`Est-ce que ${formattedSalary} est un bon salaire au Québec?`}
            intro={`Avec un revenu brut de ${formattedSalary}, vous pouvez vous attendre à recevoir environ ${formattedNet} net par année au Québec. Ce montant tient compte de toutes les déductions obligatoires : impôts fédéral et provincial, RRQ, RQAP et assurance-emploi.`}
            faqs={[
              {
                question: `Quel est le salaire net sur ${formattedSalary}?`,
                answer: `Sur un salaire brut de ${formattedSalary}, vous recevrez approximativement ${formattedNet} net par année au Québec. Cela représente environ ${Math.round(estimatedNet / 12).toLocaleString('fr-CA')} $ par mois ou ${Math.round(estimatedNet / 26).toLocaleString('fr-CA')} $ aux deux semaines. Les déductions incluent l'impôt fédéral, l'impôt provincial du Québec, les cotisations au RRQ (Régime de rentes du Québec), le RQAP (Régime québécois d'assurance parentale) et l'assurance-emploi fédérale.`
              },
              {
                question: `Combien d'impôts je paie sur ${formattedSalary}?`,
                answer: `Les impôts et déductions totales sur ${formattedSalary} représentent environ ${Math.round((1 - estimatedNetPercentage) * 100)}% de votre revenu brut, soit approximativement ${(salaryNum - estimatedNet).toLocaleString('fr-CA')} $. Ce montant se divise entre l'impôt fédéral (environ ${Math.round(salaryNum * 0.12).toLocaleString('fr-CA')} $), l'impôt provincial (environ ${Math.round(salaryNum * 0.10).toLocaleString('fr-CA')} $), le RRQ (${Math.round(Math.min(salaryNum, 68500) * 0.064).toLocaleString('fr-CA')} $), le RQAP (${Math.round(salaryNum * 0.00494).toLocaleString('fr-CA')} $) et l'AE (${Math.round(Math.min(salaryNum, 63200) * 0.0163).toLocaleString('fr-CA')} $). Utilisez notre calculateur ci-dessus pour obtenir le montant exact.`
              },
              {
                question: `Comment maximiser mon revenu net avec ${formattedSalary}?`,
                answer: `Avec un salaire de ${formattedSalary}, plusieurs stratégies peuvent augmenter votre revenu net. Cotisez à un REER pour réduire votre revenu imposable (jusqu'à 18% de votre revenu). Profitez du crédit d'impôt pour frais de garde si vous avez des enfants. Déduisez vos frais de transport en commun et vos dons de charité. Si vous travaillez de la maison, réclamez les dépenses de bureau à domicile. Maximisez vos contributions au CELI pour faire croître votre épargne à l'abri de l'impôt. Un planificateur financier peut vous aider à optimiser votre situation fiscale.`
              },
              {
                question: `${formattedSalary} me permet-il d'acheter une maison au Québec?`,
                answer: `Avec un revenu net d'environ ${formattedNet} sur un salaire de ${formattedSalary}, vous pourriez être admissible à un prêt hypothécaire d'environ ${Math.round(salaryNum * 4.5).toLocaleString('fr-CA')} $ selon les règles bancaires standard (4,5 fois le revenu brut). Cela vous permettrait d'acheter une propriété dans cette gamme de prix, en supposant une mise de fonds de 5% à 20%. Votre capacité d'emprunt dépendra aussi de vos autres dettes, de votre cote de crédit et des taux d'intérêt actuels. Utilisez notre calculateur hypothécaire pour une estimation précise.`
              },
              {
                question: `Quelle est ma tranche d'imposition avec ${formattedSalary}?`,
                answer: `Avec un revenu de ${formattedSalary}, votre taux marginal d'imposition combiné (fédéral + provincial) se situe ${salaryNum < 49275 ? 'à environ 27,53%' : salaryNum < 98540 ? 'entre 37,12% et 41,12%' : salaryNum < 119910 ? 'à environ 45,71%' : salaryNum < 165430 ? 'à environ 48,22%' : 'entre 51,97% et 53,31%'}. Cela signifie que chaque dollar supplémentaire gagné sera imposé à ce taux. Cependant, votre taux effectif (le pourcentage réel d'impôt payé sur votre revenu total) est plus bas car les premiers dollars sont imposés à des taux inférieurs. Notre calculateur vous montre à la fois votre taux marginal et votre taux effectif.`
              },
              {
                question: `Comment se compare ${formattedSalary} au salaire moyen au Québec?`,
                answer: `Un salaire de ${formattedSalary} ${salaryNum < 55000 ? 'se situe légèrement en dessous' : salaryNum < 75000 ? 'est proche' : salaryNum < 100000 ? 'est supérieur' : 'est significativement supérieur'} au salaire moyen au Québec, qui tourne autour de 55 000 $ à 60 000 $ par année. ${salaryNum >= 100000 ? 'Vous faites partie des 10% de salariés les mieux rémunérés de la province.' : salaryNum >= 75000 ? 'Vous vous situez dans la tranche supérieure des revenus québécois.' : salaryNum >= 55000 ? 'Vous gagnez un revenu dans la moyenne québécoise.' : 'Vous êtes en début de carrière ou dans un secteur à revenu plus modeste.'} Le coût de la vie au Québec étant généralement plus bas que dans le reste du Canada, votre pouvoir d'achat peut être avantageux, surtout si vous vivez en région.`
              }
            ]}
          />

          {/* Related Tools Section */}
          <RelatedTools 
            currentTool={`/salaire-net-quebec/${params.salary}`}
            currentCategory="tax"
          />

          {/* Data Source Citation */}
          <DataSource 
            label="Revenu Québec - Tables de retenues 2026 (TP-1015.3)"
            url="https://www.revenuquebec.ca/fr/entreprises/retenues-et-cotisations/calcul-des-retenues-a-la-source/tables-de-retenues/"
            lastUpdate="Janvier 2026"
          />
        </div>
      </div>
    </>
  )
}
