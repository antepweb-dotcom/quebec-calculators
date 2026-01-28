'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    title: 'Impôts & Revenus',
    icon: <Calculator className="w-5 h-5" />,
    items: [
      { name: 'Salaire Net Québec', href: '/salaire-net-quebec' },
      { name: 'Déclaration Simplifiée', href: '/declaration-simplifiee', badge: 'NOUVEAU' },
      { name: 'Assurance-Emploi', href: '/assurance-emploi' },
      { name: 'Taux Horaire', href: '/taux-horaire' },
      { name: 'Paie de Vacances', href: '/paie-vacances' },
      { name: 'TPS/TVQ', href: '/tps-tvq-quebec' },
    ]
  },
  {
    title: 'Immobilier',
    icon: <Home className="w-5 h-5" />,
    items: [
      { name: 'Louer ou Acheter?', href: '/louer-ou-acheter', badge: 'NOUVEAU' },
      { name: 'Calcul Hypothécaire', href: '/calcul-hypotheque' },
      { name: 'Capacité d\'Emprunt', href: '/capacite-emprunt' },
      { name: 'Taxe de Bienvenue', href: '/taxe-de-bienvenue' },
      { name: 'Augmentation de Loyer', href: '/augmentation-loyer-2026' },
    ]
  },
  {
    title: 'Famille & Quotidien',
    icon: <Users className="w-5 h-5" />,
    items: [
      { name: 'Allocations Familiales', href: '/allocations-familiales', badge: 'NOUVEAU' },
      { name: 'Frais de Garde', href: '/frais-de-garde' },
      { name: 'Prêt Auto', href: '/pret-auto' },
      { name: 'Prêt Étudiant', href: '/pret-etudiant' },
      { name: 'Auto Électrique vs Essence', href: '/auto-electrique-vs-essence', badge: 'NOUVEAU' },
    ]
  },
  {
    title: 'Dettes & Planification',
    icon: <TrendingDown className="w-5 h-5" />,
    items: [
      { name: 'Remboursement de Dettes', href: '/dettes-credit' },
      { name: 'Épargne-Retraite', href: '/epargne-retraite' },
    ]
  },
  {
    title: 'Investissement & Retraite',
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      { name: 'Intérêts Composés', href: '/interets-composes', badge: 'NOUVEAU' },
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
      <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                Quebec<span className="text-emerald-600">Calculators</span>
              </span>
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
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-medium">
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
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                            >
                              <span className="text-gray-700 group-hover:text-emerald-600 font-medium">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  {item.badge}
                                </span>
                              )}
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
            <div className="flex items-center gap-3">
              {/* Search Button (Desktop) */}
              <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
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
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900">
                  Quebec<span className="text-emerald-600">Calculators</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="p-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un outil..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                />
              </div>

              {/* Accordion Categories */}
              <div className="space-y-2">
                {NAV_ITEMS.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === index ? null : index)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-emerald-600">
                          {category.icon}
                        </div>
                        <span className="font-semibold text-gray-900">{category.title}</span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          mobileAccordion === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence>
                      {mobileAccordion === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-2 space-y-1 bg-white">
                            {category.items.map((item, itemIndex) => (
                              <Link
                                key={itemIndex}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                              >
                                <span className="text-gray-700 group-hover:text-emerald-600">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
