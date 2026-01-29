'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Menu, 
  X, 
  Calculator,
  Home,
  Users,
  Sparkles
} from 'lucide-react'

// Enhanced Type Definition
interface NavItem {
  name: string
  href: string
  badge?: string // New: For "2026" or "New" tags
  badgeColor?: string // Optional color override
}

interface NavCategory {
  title: string
  icon: React.ReactNode
  items: NavItem[]
}

// Data Structure with Badges
const NAV_ITEMS: NavCategory[] = [
  {
    title: 'Impôts & Salaire',
    icon: <Calculator className="w-5 h-5 text-emerald-600" />,
    items: [
      { name: 'Salaire Net Québec', href: '/salaire-net-quebec', badge: '2026', badgeColor: 'bg-emerald-100 text-emerald-700' },
      { name: 'Déclaration Simplifiée', href: '/declaration-simplifiee', badge: 'Nouveau', badgeColor: 'bg-blue-100 text-blue-700' },
      { name: 'Taux Horaire', href: '/taux-horaire' },
      { name: 'TPS/TVQ', href: '/tps-tvq-quebec' },
      { name: 'Assurance-Emploi', href: '/assurance-emploi' },
    ]
  },
  {
    title: 'Immobilier',
    icon: <Home className="w-5 h-5 text-blue-600" />,
    items: [
      { name: 'Calcul Hypothécaire', href: '/calcul-hypotheque', badge: 'Populaire', badgeColor: 'bg-amber-100 text-amber-700' },
      { name: 'Capacité d\'Emprunt', href: '/capacite-emprunt' },
      { name: 'Louer ou Acheter?', href: '/louer-ou-acheter' },
      { name: 'Taxe de Bienvenue', href: '/taxe-de-bienvenue' },
      { name: 'Augmentation Loyer', href: '/augmentation-loyer-2026', badge: 'TAL 2026', badgeColor: 'bg-red-100 text-red-700' },
    ]
  },
  {
    title: 'Famille & Finances',
    icon: <Users className="w-5 h-5 text-purple-600" />,
    items: [
      { name: 'Frais de Garde', href: '/frais-de-garde', badge: 'Subventions', badgeColor: 'bg-pink-100 text-pink-700' },
      { name: 'Allocations Familiales', href: '/allocations-familiales' },
      { name: 'Épargne-Retraite', href: '/epargne-retraite' },
      { name: 'Intérêts Composés', href: '/interets-composes' },
      { name: 'Prêt Auto', href: '/pret-auto' },
    ]
  },
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="w-full sticky top-0 z-[100] backdrop-blur-xl bg-white/80 border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* 1. LOGO SECTION */}
            <Link href="/" className="flex items-center gap-2 group relative z-50">
              {/* Desktop Logo */}
              <div className="hidden sm:block transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="QCFinance Logo"
                  width={620}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
              {/* Mobile Logo */}
              <div className="sm:hidden">
                <Image
                  src="/images/logo.png"
                  alt="QCFinance Logo"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* 2. DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((category, index) => (
                <div
                  key={index}
                  className="relative group/menu"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeDropdown === index 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                    {category.title}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Animation */}
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden ring-1 ring-black/5 z-50"
                      >
                        <div className="p-2">
                          <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                            {category.icon}
                            {category.title}
                          </div>
                          {category.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                                  item.badgeColor || 'bg-gray-100 text-gray-600'
                                }`}>
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

            {/* 3. ACTIONS & MOBILE TOGGLE */}
            <div className="flex items-center gap-3">
              <Link 
                href="/salaire-net-quebec" 
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Outil #1
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 4. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white lg:hidden flex flex-col"
          >
            {/* Mobile Header */}
            <div className="px-4 h-16 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <span className="text-lg font-bold text-slate-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-20">
              {NAV_ITEMS.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 uppercase tracking-wider px-2">
                    {category.icon}
                    {category.title}
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {category.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 active:scale-[0.98] transition-all border border-transparent hover:border-emerald-100"
                      >
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        {item.badge && (
                          <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${
                            item.badgeColor || 'bg-white shadow-sm'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Footer CTA */}
            <div className="p-4 border-t border-gray-100 bg-white safe-area-bottom">
              <Link 
                href="/salaire-net-quebec"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl active:scale-[0.98] transition-transform"
              >
                <Calculator className="w-5 h-5" />
                Calculer mon salaire net
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

