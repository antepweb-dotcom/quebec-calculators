'use client'

import { useState, useRef } from 'react'
import AdSlot from '@/components/AdSlot'
import AffiliateCard from '@/components/AffiliateCard'
import { calculateTaxForm, TaxFormInputs, TaxFormResult } from '@/utils/taxFormLogic'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function DeclarationSimplifieeClient() {
  const [inputs, setInputs] = useState<TaxFormInputs>({
    employmentIncome: 0,
    federalTaxPaid: 0,
    quebecTaxPaid: 0,
    rrspContributions: 0,
    unionDues: 0,
  })

  const [result, setResult] = useState<TaxFormResult | null>(null)
  const [showGuide, setShowGuide] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const calculatedResult = calculateTaxForm(inputs)
    setResult(calculatedResult)
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const downloadPDF = () => {
    if (!result) return

    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.setTextColor(37, 99, 235)
    doc.text('Rapport Fiscal Estimatif 2026', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text('QuebecCalculators', 105, 28, { align: 'center' })
    
    doc.setFontSize(10)
    const today = new Date().toLocaleDateString('fr-CA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    doc.text(`Généré le ${today}`, 105, 35, { align: 'center' })
    
    doc.setFillColor(result.isRefund ? 34 : 220, result.isRefund ? 197 : 38, result.isRefund ? 94 : 38)
    doc.rect(20, 45, 170, 25, 'F')
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.text(result.isRefund ? 'REMBOURSEMENT ESTIMÉ' : 'SOLDE À PAYER', 105, 53, { align: 'center' })
    doc.setFontSize(24)
    doc.text(formatCurrency(result.refundOrOwing), 105, 64, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('Revenu et Déductions', 20, 82)
    
    autoTable(doc, {
      startY: 86,
      head: [['Description', 'Montant']],
      body: [
        ['Revenu d\'emploi (Case 14)', formatCurrency(result.totalIncome)],
        ['Cotisations REER', formatCurrency(result.rrspDeduction)],
        ['Cotisations syndicales', formatCurrency(result.unionDuesDeduction)],
        ['Total des déductions', formatCurrency(result.totalDeductions)],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' }
      }
    })
    
    const finalY1 = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.text('Calcul de l\'impôt', 20, finalY1)
    
    autoTable(doc, {
      startY: finalY1 + 4,
      head: [['Description', 'Montant']],
      body: [
        ['Revenu imposable fédéral', formatCurrency(result.federalTaxableIncome)],
        ['Impôt fédéral dû', formatCurrency(result.federalTaxOwed)],
        ['Impôt fédéral payé (Case 22)', formatCurrency(result.federalTaxPaid)],
        ['', ''],
        ['Revenu imposable Québec', formatCurrency(result.quebecTaxableIncome)],
        ['Impôt Québec dû', formatCurrency(result.quebecTaxOwed)],
        ['Impôt Québec payé (Case E)', formatCurrency(result.quebecTaxPaid)],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' }
      }
    })
    
    const finalY2 = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.text('Résumé', 20, finalY2)
    
    autoTable(doc, {
      startY: finalY2 + 4,
      body: [
        ['Total impôt dû', formatCurrency(result.totalTaxOwed)],
        ['Total impôt payé', formatCurrency(result.totalTaxPaid)],
        [result.isRefund ? 'REMBOURSEMENT' : 'SOLDE À PAYER', formatCurrency(result.refundOrOwing)],
      ],
      theme: 'plain',
      styles: { 
        fontSize: 11,
        fontStyle: 'bold',
        fillColor: [243, 244, 246]
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right', textColor: result.isRefund ? [34, 197, 94] : [220, 38, 38] }
      }
    })
    
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    const disclaimerY = (doc as any).lastAutoTable.finalY + 15
    doc.text('Ce document est une estimation à des fins personnelles.', 105, disclaimerY, { align: 'center' })
    doc.text('Il ne remplace pas une déclaration officielle.', 105, disclaimerY + 5, { align: 'center' })
    
    doc.setFontSize(8)
    doc.text('Généré par QuebecCalculators.ca', 105, 285, { align: 'center' })
    
    doc.save('rapport-fiscal-2026.pdf')
  }

  return (
    <><main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Assistant Déclaration Simplifiée
            </h1>
            <p className="text-xl text-gray-600">
              Estimez votre remboursement d'impôt 2026 et générez un rapport PDF
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <AdSlot position="header" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
            {/* Left Column - Inputs (40%) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-blue-600">📋</span>
                  Saisie des données
                </h2>
                
                <div className="space-y-4">
                  {/* Revenus Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Revenus</h3>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Revenu d'emploi - Case 14 (T4)
                    </label>
                    <input
                      type="number"
                      value={inputs.employmentIncome || ''}
                      onChange={(e) => setInputs({ ...inputs, employmentIncome: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>

                  {/* Déductions Section */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Déductions</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Impôt fédéral retenu - Case 22 (T4)
                        </label>
                        <input
                          type="number"
                          value={inputs.federalTaxPaid || ''}
                          onChange={(e) => setInputs({ ...inputs, federalTaxPaid: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="5000"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Impôt Québec retenu - Case E (RL-1)
                        </label>
                        <input
                          type="number"
                          value={inputs.quebecTaxPaid || ''}
                          onChange={(e) => setInputs({ ...inputs, quebecTaxPaid: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="7000"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Cotisations REER
                        </label>
                        <input
                          type="number"
                          value={inputs.rrspContributions || ''}
                          onChange={(e) => setInputs({ ...inputs, rrspContributions: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="5000"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                          Cotisations syndicales
                        </label>
                        <input
                          type="number"
                          value={inputs.unionDues || ''}
                          onChange={(e) => setInputs({ ...inputs, unionDues: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-sm"
                  >
                    Calculer mon remboursement
                  </button>
                </div>
              </div>

              {/* Collapsible Guide */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-blue-600">📚</span>
                    Guide de remplissage
                  </h2>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transition-transform ${showGuide ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showGuide && (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="border-l-4 border-blue-600 pl-3">
                      <h3 className="font-bold text-gray-900 mb-1">Étape 1 : Feuillets</h3>
                      <p className="text-gray-700 text-xs">
                        Rassemblez vos T4 (fédéral) et RL-1 (Québec) fournis par votre employeur.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-600 pl-3">
                      <h3 className="font-bold text-gray-900 mb-1">Étape 2 : Déductions</h3>
                      <p className="text-gray-700 text-xs">
                        Les REER et cotisations syndicales sont déductibles. Ayez vos reçus.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-3">
                      <h3 className="font-bold text-gray-900 mb-1">Étape 3 : Date limite</h3>
                      <p className="text-gray-700 text-xs">
                        <strong>30 avril 2026</strong> (15 juin si travailleur autonome).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Results (60%, Sticky) */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24" ref={resultsRef}>
                {result ? (
                  <div className="space-y-6">
                    {/* Hero Result Card with Gradient */}
                    <div className={`${result.isRefund ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'} rounded-2xl shadow-lg p-8 text-white`}>
                      <h2 className="text-lg font-medium mb-2 opacity-90 text-center">
                        {result.isRefund ? 'Remboursement estimé' : 'Solde à payer'}
                      </h2>
                      <div className="text-center">
                        <div className="text-6xl md:text-7xl font-bold mb-2">
                          {formatCurrency(result.refundOrOwing)}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Cards */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Impôt Fédéral</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dû</span>
                            <span className="font-semibold">{formatCurrency(result.federalTaxOwed)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payé</span>
                            <span className="font-semibold">{formatCurrency(result.federalTaxPaid)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Impôt Québec</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dû</span>
                            <span className="font-semibold">{formatCurrency(result.quebecTaxOwed)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payé</span>
                            <span className="font-semibold">{formatCurrency(result.quebecTaxPaid)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Affiliate Card */}
                    <AffiliateCard
                      title="Maximisez votre remboursement avec TurboImpôt"
                      description="Produisez votre déclaration en ligne avec TurboImpôt et obtenez votre remboursement jusqu'à 8 jours plus vite. Interface simple, support expert inclus."
                      buttonText="Commencer ma déclaration"
                      link="https://turbotax.intuit.ca/personal-tax-software"
                      theme="blue"
                    />

                    {/* PDF Download Button */}
                    <button
                      onClick={downloadPDF}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 px-8 rounded-xl transition-all text-xl shadow-lg flex items-center justify-center gap-3"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger mon Rapport Fiscal (PDF)
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                    <div className="text-gray-300 mb-4">
                      <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Entrez vos données pour commencer
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Les résultats apparaîtront ici
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden lg:col-span-5 flex justify-center">
              <AdSlot position="inArticle" />
            </div>
          </div>

          <div className="hidden lg:flex mb-8 justify-center">
            <AdSlot position="inArticle" />
          </div>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi utiliser cet outil ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Estimation rapide</h3>
                <p className="text-sm text-gray-600">
                  Obtenez une estimation de votre remboursement d'impôt en quelques secondes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Rapport PDF professionnel</h3>
                <p className="text-sm text-gray-600">
                  Téléchargez un rapport détaillé pour vos dossiers personnels.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% confidentiel</h3>
                <p className="text-sm text-gray-600">
                  Calculs locaux. Aucune donnée envoyée ou sauvegardée.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
