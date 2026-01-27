'use client'

import { useState, useRef } from 'react'
import AdSlot from '@/components/AdSlot'
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
    
    // Auto-scroll to results after state update
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

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-blue-600">📋</span>
                  Saisie des données
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Revenu d'emploi - Case 14 (T4)
                    </label>
                    <input
                      type="number"
                      value={inputs.employmentIncome || ''}
                      onChange={(e) => setInputs({ ...inputs, employmentIncome: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="50000"
                    />
                  </div>

                  <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Impôt fédéral retenu - Case 22 (T4)
                    </label>
                    <input
                      type="number"
                      value={inputs.federalTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, federalTaxPaid: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="5000"
                    />
                  </div>

                  <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Impôt Québec retenu - Case E (RL-1)
                    </label>
                    <input
                      type="number"
                      value={inputs.quebecTaxPaid || ''}
                      onChange={(e) => setInputs({ ...inputs, quebecTaxPaid: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="7000"
                    />
                  </div>

                  <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cotisations REER
                    </label>
                    <input
                      type="number"
                      value={inputs.rrspContributions || ''}
                      onChange={(e) => setInputs({ ...inputs, rrspContributions: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="5000"
                    />
                  </div>

                  <div className="border-2 border-yellow-200 rounded-lg p-4 bg-yellow-50 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cotisations syndicales
                    </label>
                    <input
                      type="number"
                      value={inputs.unionDues || ''}
                      onChange={(e) => setInputs({ ...inputs, unionDues: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
                >
                  Calculer mon remboursement
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-blue-600">📚</span>
                    Comment remplir ma déclaration ?
                  </h2>
                  <svg 
                    className={`w-6 h-6 text-gray-600 transition-transform ${showGuide ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showGuide && (
                  <div className="mt-6 space-y-6">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Étape 1 : Rassemblez vos feuillets</h3>
                      <p className="text-gray-700">
                        Vous aurez besoin de votre feuillet T4 (fédéral) et RL-1 (Québec) fournis par votre employeur. 
                        Ces documents contiennent toutes les informations nécessaires sur votre revenu et les impôts déjà payés.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-600 pl-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Étape 2 : Identifiez vos déductions</h3>
                      <p className="text-gray-700">
                        Les cotisations REER et les cotisations syndicales sont déductibles d'impôt. 
                        Assurez-vous d'avoir vos reçus de cotisations REER et vos relevés syndicaux.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Étape 3 : Date limite importante</h3>
                      <p className="text-gray-700">
                        La date limite pour produire votre déclaration de revenus est le <strong>30 avril 2026</strong>. 
                        Si vous ou votre conjoint êtes travailleur autonome, la date limite est le 15 juin 2026.
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Note :</strong> Cet outil fournit une estimation. Pour une déclaration officielle, 
                        utilisez les services de Revenu Québec et de l'Agence du revenu du Canada, ou consultez un fiscaliste.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {result && (
                <div ref={resultsRef} className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-blue-600">📊</span>
                    Résultat de votre déclaration
                  </h2>

                  <div className={`${result.isRefund ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-4 rounded-xl p-8 mb-6 text-center`}>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {result.isRefund ? 'Remboursement estimé' : 'Solde à payer'}
                    </p>
                    <p className={`text-5xl font-bold ${result.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(result.refundOrOwing)}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-3">Impôt Fédéral</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impôt dû :</span>
                          <span className="font-semibold">{formatCurrency(result.federalTaxOwed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impôt payé :</span>
                          <span className="font-semibold">{formatCurrency(result.federalTaxPaid)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-3">Impôt Québec</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impôt dû :</span>
                          <span className="font-semibold">{formatCurrency(result.quebecTaxOwed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Impôt payé :</span>
                          <span className="font-semibold">{formatCurrency(result.quebecTaxPaid)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadPDF}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-all text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Télécharger mon Rapport Fiscal (PDF)
                  </button>
                </div>
              )}

              <div className="lg:hidden flex justify-center">
                <AdSlot position="inArticle" />
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-6">
                <AdSlot position="sidebar" />
              </div>
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
                  Obtenez une estimation de votre remboursement d'impôt en quelques secondes, 
                  sans attendre la fin de votre déclaration complète.
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
                  Téléchargez un rapport détaillé avec tous les calculs pour vos dossiers personnels 
                  ou pour consultation avec un fiscaliste.
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
                  Tous les calculs sont effectués localement dans votre navigateur. 
                  Aucune donnée n'est envoyée ou sauvegardée sur nos serveurs.
                </p>
              </div>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500">
            <p>© 2026 Assistant Déclaration Simplifiée. Les calculs sont fournis à titre indicatif seulement.</p>
            <p className="mt-2">Consultez un fiscaliste pour des conseils personnalisés.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
