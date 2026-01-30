'use client'

import Script from 'next/script'
import { TaxCalculationResult } from '@/utils/taxLogic'

interface SalarySEOContentProps {
  salary: number
  results: TaxCalculationResult
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(amount)
}

export default function SalarySEOContent({ salary, results }: SalarySEOContentProps) {
  // Determine income bracket for contextual content
  const isLowIncome = salary < 40000
  const isMidIncome = salary >= 40000 && salary <= 90000
  const isHighIncome = salary > 90000

  // Calculate key metrics
  const effectiveRate = ((results.totalDeductions / results.grossIncome) * 100).toFixed(1)
  const netPercentage = ((results.netIncome / results.grossIncome) * 100).toFixed(1)
  const monthlyNet = results.netIncome / 12
  const biweeklyNet = results.netIncome / 26

  // Contextual analysis based on income bracket
  const getIncomeAnalysis = () => {
    if (isLowIncome) {
      return {
        bracket: 'faible à modéré',
        focus: 'crédit d\'impôt solidarité, crédit TPS/TVQ, et allocations familiales',
        advice: 'À ce niveau de revenu, vous bénéficiez de plusieurs crédits d\'impôt remboursables qui peuvent augmenter significativement votre revenu disponible. Le crédit d\'impôt solidarité du Québec peut vous verser jusqu\'à 1 500 $ par année.'
      }
    } else if (isMidIncome) {
      return {
        bracket: 'moyenne',
        focus: 'cotisations RRQ, RQAP, et optimisation REER',
        advice: 'Vous êtes dans la tranche d\'imposition moyenne. Chaque dollar cotisé à un REER vous fera économiser environ 37 % en impôts. C\'est le moment idéal pour maximiser vos cotisations REER et CELI.'
      }
    } else {
      return {
        bracket: 'élevée',
        focus: 'taux marginal élevé, optimisation REER, et fractionnement de revenu',
        advice: 'Avec ce revenu, vous entrez dans une tranche d\'imposition supérieure. Votre taux marginal combiné peut atteindre 48 % à 53 %. Il est crucial d\'optimiser vos REER (jusqu\'à ' + formatCurrency(salary * 0.18) + ') et d\'explorer le fractionnement de revenu avec votre conjoint.'
      }
    }
  }

  const analysis = getIncomeAnalysis()

  // Generate structured data (JSON-LD) for SEO
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        // SoftwareApplication Schema
        {
          '@type': 'SoftwareApplication',
          'name': `Calculateur Impôt Québec ${salary.toLocaleString('fr-CA')} $`,
          'applicationCategory': 'FinanceApplication',
          'operatingSystem': 'Web',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'CAD'
          },
          'description': `Calculateur d'impôt gratuit pour un salaire de ${formatCurrency(salary)} au Québec. Calcul précis du revenu net après impôts fédéral, provincial, RRQ, RQAP et AE.`
        },
        // FAQPage Schema
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': `Quel est le salaire net pour ${formatCurrency(salary)} au Québec en 2026 ?`,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': `Pour un salaire brut de ${formatCurrency(salary)}, votre salaire net annuel est de ${formatCurrency(results.netIncome)}, soit ${formatCurrency(monthlyNet)} par mois ou ${formatCurrency(biweeklyNet)} aux deux semaines. Cela représente un taux de déduction de ${effectiveRate}% incluant les impôts fédéral (${formatCurrency(results.federalTax)}), provincial (${formatCurrency(results.provincialTax)}), et les cotisations sociales (RRQ, RQAP, AE).`
              }
            },
            {
              '@type': 'Question',
              'name': `Combien d'impôt je paie sur un revenu de ${formatCurrency(salary)} ?`,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': `Sur un revenu de ${formatCurrency(salary)}, vous payez ${formatCurrency(results.federalTax)} d'impôt fédéral et ${formatCurrency(results.provincialTax)} d'impôt provincial, pour un total de ${formatCurrency(results.federalTax + results.provincialTax)} en impôts. Avec les cotisations sociales (${formatCurrency(results.qpp + results.qpip + results.ei)}), vos déductions totales sont de ${formatCurrency(results.totalDeductions)}.`
              }
            },
            {
              '@type': 'Question',
              'name': `Quel est mon taux d'imposition effectif avec ${formatCurrency(salary)} ?`,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': `Votre taux d'imposition effectif est de ${effectiveRate}%, ce qui signifie que vous conservez ${netPercentage}% de votre revenu brut. Ce taux inclut tous les impôts et cotisations obligatoires au Québec.`
              }
            }
          ]
        },
        // HowTo Schema for tax optimization
        {
          '@type': 'HowTo',
          'name': `Comment réduire ses impôts avec un salaire de ${formatCurrency(salary)}`,
          'description': 'Guide pour optimiser votre situation fiscale au Québec',
          'step': [
            {
              '@type': 'HowToStep',
              'name': 'Maximiser les cotisations REER',
              'text': `Cotisez jusqu'à ${formatCurrency(salary * 0.18)} (18% de votre revenu) à un REER pour réduire votre revenu imposable et récupérer des remboursements d'impôt.`
            },
            {
              '@type': 'HowToStep',
              'name': 'Utiliser le CELI',
              'text': 'Investissez jusqu\'à 7 000 $ par année dans un CELI pour faire croître votre épargne à l\'abri de l\'impôt.'
            },
            {
              '@type': 'HowToStep',
              'name': 'Déduire les frais admissibles',
              'text': 'Réclamez vos frais de garde d\'enfants, frais médicaux, dons de charité, et frais de bureau à domicile si applicable.'
            }
          ]
        }
      ]
    }
  }

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <Script
        id={`salary-seo-${salary}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none">
          
          {/* Main Analysis Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Analyse fiscale complète pour un salaire de {formatCurrency(salary)}
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Avec un <strong>revenu brut annuel de {formatCurrency(salary)}</strong>, vous vous situez dans la tranche d'imposition <strong>{analysis.bracket}</strong> au Québec. 
                Votre <strong>revenu net après impôts est de {formatCurrency(results.netIncome)}</strong>, ce qui représente <strong>{netPercentage}% de votre salaire brut</strong>.
              </p>
              
              <p>
                {analysis.advice}
              </p>

              <div className="bg-white rounded-xl p-6 mt-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Votre situation en chiffres</h3>
                <div className="grid md:grid-cols-2 gap-4 text-base">
                  <div>
                    <span className="text-gray-600">Taux effectif global:</span>
                    <span className="font-bold text-red-600 ml-2">{effectiveRate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Revenu disponible:</span>
                    <span className="font-bold text-emerald-600 ml-2">{netPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Impôt fédéral:</span>
                    <span className="font-bold ml-2">{formatCurrency(results.federalTax)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Impôt provincial:</span>
                    <span className="font-bold ml-2">{formatCurrency(results.provincialTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Federal vs Provincial Breakdown */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Répartition Fédéral vs Provincial
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Au Québec, vous payez des impôts à deux paliers de gouvernement. Voici comment se répartissent vos déductions fiscales sur un revenu de {formatCurrency(salary)} :
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-3">Impôt Fédéral</h3>
                <p className="text-3xl font-bold text-red-600 mb-3">{formatCurrency(results.federalTax)}</p>
                <p className="text-sm text-gray-700">
                  Taux progressifs de <strong>15% à 33%</strong> appliqués après la déduction du montant personnel de base de 15 705 $.
                  L'impôt fédéral représente <strong>{((results.federalTax / results.totalDeductions) * 100).toFixed(0)}%</strong> de vos déductions totales.
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-3">Impôt Provincial (Québec)</h3>
                <p className="text-3xl font-bold text-orange-600 mb-3">{formatCurrency(results.provincialTax)}</p>
                <p className="text-sm text-gray-700">
                  Taux progressifs de <strong>14% à 25,75%</strong> appliqués après la déduction du montant personnel de base de 18 056 $.
                  L'impôt provincial représente <strong>{((results.provincialTax / results.totalDeductions) * 100).toFixed(0)}%</strong> de vos déductions totales.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Cotisations Sociales</h3>
              <p className="text-gray-700 mb-4">
                En plus des impôts, vous cotisez obligatoirement à trois régimes sociaux :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>RRQ (Régime de rentes du Québec):</strong> {formatCurrency(results.qpp)} 
                  <span className="text-sm text-gray-600 ml-2">(6,4% jusqu'à 68 500 $)</span>
                </li>
                <li>
                  <strong>RQAP (Régime québécois d'assurance parentale):</strong> {formatCurrency(results.qpip)}
                  <span className="text-sm text-gray-600 ml-2">(0,494% du salaire brut)</span>
                </li>
                <li>
                  <strong>AE (Assurance-emploi fédérale):</strong> {formatCurrency(results.ei)}
                  <span className="text-sm text-gray-600 ml-2">(1,27% jusqu'à 63 200 $)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Tax Optimization Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comment payer moins d'impôt à ce niveau de salaire ?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Avec un revenu de {formatCurrency(salary)}, plusieurs stratégies fiscales s'offrent à vous pour réduire votre fardeau fiscal et maximiser votre revenu disponible.
            </p>

            <div className="space-y-6">
              {/* REER Strategy */}
              <div className="bg-white rounded-xl p-6 border-l-4 border-emerald-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Maximisez vos cotisations REER
                </h3>
                <p className="text-gray-700 mb-3">
                  Le <strong>Régime enregistré d'épargne-retraite (REER)</strong> est l'outil le plus puissant pour réduire vos impôts. 
                  Chaque dollar cotisé réduit votre revenu imposable.
                </p>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="font-semibold text-emerald-900 mb-2">Votre limite REER 2026 :</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(salary * 0.18)}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    (18% de votre revenu, maximum 32 490 $)
                  </p>
                  {isMidIncome && (
                    <p className="text-sm text-emerald-800 mt-3">
                      💡 À votre niveau de revenu, chaque 1 000 $ cotisé vous fait économiser environ <strong>370 $ en impôts</strong> (taux marginal ~37%).
                    </p>
                  )}
                  {isHighIncome && (
                    <p className="text-sm text-emerald-800 mt-3">
                      💡 À votre niveau de revenu, chaque 1 000 $ cotisé vous fait économiser environ <strong>480 $ à 530 $ en impôts</strong> (taux marginal 48-53%).
                    </p>
                  )}
                </div>
              </div>

              {/* CELI Strategy */}
              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Utilisez votre CELI au maximum
                </h3>
                <p className="text-gray-700 mb-3">
                  Le <strong>Compte d'épargne libre d'impôt (CELI)</strong> permet de faire fructifier votre épargne sans jamais payer d'impôt sur les gains, 
                  même au retrait. Contrairement au REER, les cotisations ne sont pas déductibles, mais tous les revenus de placement sont libres d'impôt à vie.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-2">Limite annuelle 2026 :</p>
                  <p className="text-2xl font-bold text-blue-600">7 000 $</p>
                  <p className="text-sm text-gray-600 mt-2">
                    + droits de cotisation inutilisés des années précédentes
                  </p>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Réclamez toutes vos déductions admissibles
                </h3>
                <p className="text-gray-700 mb-4">
                  Ne laissez pas d'argent sur la table. Voici les déductions souvent oubliées :
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <div>
                      <strong>Frais de garde d'enfants :</strong> Jusqu'à 9 000 $ par enfant de moins de 7 ans, 5 000 $ pour les 7-16 ans
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <div>
                      <strong>Frais médicaux :</strong> Déductibles si supérieurs à 3% de votre revenu net (environ {formatCurrency(results.netIncome * 0.03)} dans votre cas)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <div>
                      <strong>Dons de charité :</strong> Crédit d'impôt de 15% (fédéral) + 20% (provincial) sur les premiers 200 $, puis jusqu'à 53% sur le reste
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <div>
                      <strong>Frais de bureau à domicile :</strong> Si vous travaillez de la maison, déduisez une portion de votre loyer, électricité, internet
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-3">•</span>
                    <div>
                      <strong>Cotisations syndicales et professionnelles :</strong> Entièrement déductibles
                    </div>
                  </li>
                </ul>
              </div>

              {/* Income Splitting */}
              {isHighIncome && (
                <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    4. Fractionnement de revenu avec votre conjoint
                  </h3>
                  <p className="text-gray-700 mb-3">
                    À votre niveau de revenu, le <strong>fractionnement de revenu</strong> peut générer des économies d'impôt substantielles si votre conjoint 
                    gagne moins que vous. Stratégies possibles :
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc pl-6">
                    <li>Cotiser au REER de conjoint pour équilibrer les revenus à la retraite</li>
                    <li>Fractionner jusqu'à 50% du revenu de pension admissible</li>
                    <li>Attribuer les revenus de placement au conjoint à revenu inférieur</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Understanding Tax Rates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprendre votre taux d'imposition : Effectif vs Marginal
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Il existe deux concepts importants à comprendre pour optimiser votre situation fiscale :
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-3">Taux Effectif</h3>
                <p className="text-4xl font-bold text-red-600 mb-3">{effectiveRate}%</p>
                <p className="text-gray-700 text-sm">
                  C'est le <strong>pourcentage réel d'impôt</strong> que vous payez sur votre revenu total. 
                  Il est calculé en divisant vos déductions totales ({formatCurrency(results.totalDeductions)}) par votre revenu brut ({formatCurrency(salary)}).
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  ✓ Utilisez ce taux pour comprendre votre fardeau fiscal global
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Taux Marginal</h3>
                <p className="text-4xl font-bold text-purple-600 mb-3">
                  {isMidIncome ? '~37%' : isHighIncome ? '48-53%' : '~28%'}
                </p>
                <p className="text-gray-700 text-sm">
                  C'est le <strong>taux appliqué sur votre dernier dollar gagné</strong>. 
                  Il détermine combien d'impôt vous paierez sur une augmentation de salaire ou combien vous économiserez avec une déduction REER.
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  ✓ Utilisez ce taux pour évaluer l'impact fiscal de vos décisions financières
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 mt-6 border border-yellow-200">
              <p className="text-gray-800">
                <strong>💡 Exemple pratique :</strong> Si vous recevez une augmentation de 5 000 $, vous ne garderez qu'environ {formatCurrency(5000 * (1 - (isMidIncome ? 0.37 : isHighIncome ? 0.50 : 0.28)))} 
                après impôts (taux marginal). Mais si vous cotisez 5 000 $ à un REER, vous récupérerez environ {formatCurrency(5000 * (isMidIncome ? 0.37 : isHighIncome ? 0.50 : 0.28))} en remboursement d'impôt.
              </p>
            </div>
          </section>

          {/* Monthly Budget Planning */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Planification budgétaire avec {formatCurrency(salary)}
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Avec un revenu net mensuel de <strong>{formatCurrency(monthlyNet)}</strong>, voici comment structurer votre budget selon la règle 50/30/20 :
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-2">50% - Besoins</h3>
                <p className="text-3xl font-bold text-blue-600 mb-3">{formatCurrency(monthlyNet * 0.5)}</p>
                <p className="text-sm text-gray-700">
                  Loyer/hypothèque, épicerie, transport, assurances, services publics
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-2">30% - Désirs</h3>
                <p className="text-3xl font-bold text-purple-600 mb-3">{formatCurrency(monthlyNet * 0.3)}</p>
                <p className="text-sm text-gray-700">
                  Restaurants, loisirs, voyages, abonnements, shopping
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-900 mb-2">20% - Épargne</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-3">{formatCurrency(monthlyNet * 0.2)}</p>
                <p className="text-sm text-gray-700">
                  REER, CELI, fonds d'urgence, remboursement de dettes
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mt-6 border border-gray-200">
              <p className="text-gray-700">
                <strong>Note :</strong> Cette règle est un guide général. Ajustez selon votre situation personnelle, vos objectifs financiers, 
                et le coût de la vie dans votre région (Montréal, Québec, régions).
              </p>
            </div>
          </section>

          {/* Comparison with Other Salaries */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comparaison avec d'autres niveaux de salaire
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Découvrez comment votre situation fiscale évolue avec différents niveaux de revenu au Québec :
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000]
                .filter(s => s !== salary)
                .slice(0, 8)
                .map((amount) => (
                  <a
                    key={amount}
                    href={`/salaire-net-quebec/${amount}`}
                    className="block bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-center"
                  >
                    {formatCurrency(amount)}
                  </a>
                ))}
            </div>
          </section>

        </article>
      </div>
    </>
  )
}
