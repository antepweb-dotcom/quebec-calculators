'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Menu, 
  X, 
  Search,
  Calculator,
  Home,
  Users,
  TrendingDown,
  TrendingUp
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  badge?: string
}

interface NavCategory {
  title: string
  icon: React.ReactNode
  items: NavItem[]
}

const NAV_ITEMS: NavCategory[] = [
  {
    title: 'Impôts & Salaire',
    icon: <Calculator className="w-5 h-5" />,
    items: [
      { name: 'Salaire Net Québec', href: '/salaire-net-quebec' },
      { name: 'Déclaration Simplifiée', href: '/declaration-simplifiee' },
      { name: 'Assurance-Emploi', href: '/assurance-emploi' },
      { name: 'Taux Horaire', href: '/taux-horaire' },
      { name: 'TPS/TVQ', href: '/tps-tvq-quebec' },
    ]
  },
  {
    title: 'Immobilier',
    icon: <Home className="w-5 h-5" />,
    items: [
      { name: 'Calcul Hypothécaire', href: '/calcul-hypotheque' },
      { name: 'Louer ou Acheter?', href: '/louer-ou-acheter' },
      { name: 'Capacité d\'Emprunt', href: '/capacite-emprunt' },
      { name: 'Taxe de Bienvenue', href: '/taxe-de-bienvenue' },
      { name: 'Augmentation de Loyer', href: '/augmentation-loyer-2026' },
    ]
  },
  {
    title: 'Famille & Finances',
    icon: <Users className="w-5 h-5" />,
    items: [
      { name: 'Allocations Familiales', href: '/allocations-familiales' },
      { name: 'Frais de Garde', href: '/frais-de-garde' },
      { name: 'Épargne-Retraite', href: '/epargne-retraite' },
      { name: 'Remboursement Dettes', href: '/dettes-credit' },
      { name: 'Prêt Auto', href: '/pret-auto' },
    ]
  },
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null)

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              {/* Desktop Logo */}
              <Image
                src="/images/logo.png"
                alt="QuebecCalc Logo"
                width={220}
                height={65}
                className="h-[52px] w-auto hidden sm:block"
                priority
              />
              {/* Mobile Logo - Centered & Bigger */}
              <Image
                src="/images/logo.png"
                alt="QuebecCalc Logo"
                width={200}
                height={60}
                className="h-[50px] w-auto sm:hidden absolute left-1/2 -translate-x-1/2"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((category, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    {category.icon}
                    <span>{category.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-1.5">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className="block px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Tous les outils link */}
              <Link 
                href="/#outils" 
                className="hidden lg:block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                Tous les outils
              </Link>

              {/* CTA Button (Desktop) */}
              <Link 
                href="/salaire-net-quebec" 
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-sm hover:shadow-md"
              >
                <Calculator className="w-4 h-4" />
                Calculer
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto"
          >
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-center relative">
              <Image
                src="/images/logo.png"
                alt="QuebecCalc Logo"
                width={220}
                height={65}
                className="h-[54px] w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-4 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Popular Tools (Pinned) */}
            <div className="p-4 bg-emerald-50 border-b border-emerald-100">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3">Outils Populaires</h3>
              <div className="space-y-1">
                <Link 
                  href="/salaire-net-quebec" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg text-gray-900 font-semibold text-sm hover:bg-emerald-100 transition-colors"
                >
                  💰 Salaire Net Québec
                </Link>
                <Link 
                  href="/calcul-hypotheque" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg text-gray-900 font-semibold text-sm hover:bg-emerald-100 transition-colors"
                >
                  🏠 Calcul Hypothécaire
                </Link>
                <Link 
                  href="/declaration-simplifiee" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg text-gray-900 font-semibold text-sm hover:bg-emerald-100 transition-colors"
                >
                  📋 Retour d&apos;Impôt
                </Link>
              </div>
            </div>

            {/* All Tools (Flat List) */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tous les Outils</h3>
              <div className="space-y-0.5">
                <Link href="/allocations-familiales" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Allocations Familiales</Link>
                <Link href="/assurance-emploi" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Assurance-Emploi</Link>
                <Link href="/augmentation-loyer-2026" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Augmentation de Loyer</Link>
                <Link href="/auto-electrique-vs-essence" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Auto Électrique vs Essence</Link>
                <Link href="/capacite-emprunt" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Capacité d&apos;Emprunt</Link>
                <Link href="/dettes-credit" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Dettes-Crédit</Link>
                <Link href="/epargne-retraite" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Épargne-Retraite</Link>
                <Link href="/frais-de-garde" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Frais de Garde</Link>
                <Link href="/interets-composes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Intérêts Composés</Link>
                <Link href="/louer-ou-acheter" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Louer ou Acheter</Link>
                <Link href="/paie-vacances" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Paie de Vacances</Link>
                <Link href="/pret-auto" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Prêt Auto</Link>
                <Link href="/pret-etudiant" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Prêt Étudiant</Link>
                <Link href="/taxe-de-bienvenue" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Taxe de Bienvenue</Link>
                <Link href="/taux-horaire" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">Taux Horaire</Link>
                <Link href="/tps-tvq-quebec" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-colors">TPS/TVQ</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
