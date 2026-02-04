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
  badge?: string
  badgeColor?: string
  isFlagship?: boolean // Highlight flagship tools
  groupLabel?: string // For sub-grouping within categories
}

interface NavCategory {
  title: string
  icon: React.ReactNode
  items: NavItem[]
}

// NEW STRUCTURE: 3 Pillars Based on User Intent
const NAV_ITEMS: NavCategory[] = [
  {
    title: 'Impôts & Revenus',
    icon: <Calculator className="w-5 h-5 text-emerald-600" />,
    items: [
      { 
        name: 'Salaire Net Québec', 
        href: '/salaire-net-quebec', 
        badge: '2026', 
        badgeColor: 'bg-emerald-100 text-emerald-700',
        isFlagship: true
      },
      { 
        name: 'Déclaration Simplifiée', 
        href: '/declaration-simplifiee', 
        badge: 'NOUVEAU', 
        badgeColor: 'bg-blue-100 text-blue-700' 
      },
      { name: 'Taux Horaire', href: '/taux-horaire' },
      { name: 'Paie de Vacances', href: '/paie-vacances' },
      { name: 'Assurance-Emploi', href: '/assurance-emploi' },
      { name: 'TPS/TVQ', href: '/tps-tvq-quebec' },
    ]
  },
  {
    title: 'Immobilier',
    icon: <Home className="w-5 h-5 text-blue-600" />,
    items: [
      { 
        name: 'Calcul Hypothécaire', 
        href: '/calcul-hypotheque', 
        badge: 'POPULAIRE', 
        badgeColor: 'bg-amber-100 text-amber-700',
        isFlagship: true
      },
      { name: 'Capacité d\'Emprunt', href: '/capacite-emprunt' },
      { name: 'Taxe de Bienvenue', href: '/taxe-de-bienvenue' },
      { 
        name: 'Augmentation de Loyer', 
        href: '/augmentation-loyer-2026', 
        badge: 'TAL 2026', 
        badgeColor: 'bg-red-100 text-red-700' 
      },
      { name: 'Louer ou Acheter?', href: '/louer-ou-acheter' },
    ]
  },
  {
    title: 'Vie & Finances',
    icon: <Users className="w-5 h-5 text-purple-600" />,
    items: [
      // Group: Véhicules (High Priority)
      { name: 'Prêt Auto', href: '/pret-auto', groupLabel: 'Véhicules' },
      { 
        name: 'Auto Électrique vs Essence', 
        href: '/auto-electrique-vs-essence', 
        badge: 'ÉCO', 
        badgeColor: 'bg-green-100 text-green-700',
        groupLabel: 'Véhicules'
      },
      // Group: Famille
      { 
        name: 'Frais de Garde', 
        href: '/frais-de-garde', 
        badge: 'SUBVENTIONS', 
        badgeColor: 'bg-pink-100 text-pink-700',
        groupLabel: 'Famille'
      },
      { name: 'Allocations Familiales', href: '/allocations-familiales', groupLabel: 'Famille' },
      { name: 'Prêt Étudiant', href: '/pret-etudiant', groupLabel: 'Famille' },
      // Group: Futur & Dettes
      { name: 'Épargne Retraite', href: '/epargne-retraite', groupLabel: 'Futur & Dettes' },
      { name: 'Dettes & Crédit', href: '/dettes-credit', groupLabel: 'Futur & Dettes' },
      { name: 'Intérêts Composés', href: '/interets-composes', groupLabel: 'Futur & Dettes' },
    ]
  },
]

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  // Toggle accordion - only one open at a time
  const toggleAccordion = (index: number) => {
    setOpenAccordion(prev => prev === index ? null : index)
  }

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
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((category, index) => (
                <div
                  key={index}
                  className="nav-item relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                    className="nav-link flex items-center gap-2 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors relative"
                    aria-label={`Menu ${category.title}`}
                    aria-expanded={activeDropdown === index}
                  >
                    {category.icon}
                    {category.title}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Dropdown Animation - Elegant Design */}
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="dropdown-menu absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <div className="p-2">
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1 border-b border-gray-100">
                            {category.icon}
                            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                              {category.title}
                            </span>
                          </div>
                          
                          {(() => {
                            let lastGroup = ''
                            return category.items.map((item, itemIndex) => {
                              const showGroupLabel = item.groupLabel && item.groupLabel !== lastGroup
                              if (item.groupLabel) lastGroup = item.groupLabel
                              
                              return (
                                <div key={itemIndex}>
                                  {showGroupLabel && (
                                    <div className="px-2 pt-1 pb-0.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                      {item.groupLabel}
                                    </div>
                                  )}
                                  <Link
                                    href={item.href}
                                    className={`group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all hover-lift ${
                                      item.isFlagship ? 'bg-emerald-50 hover:bg-emerald-100' : ''
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className={`text-sm font-medium group-hover:text-gray-900 ${
                                        item.isFlagship ? 'text-emerald-900 font-bold' : 'text-gray-700'
                                      }`}>
                                        {item.name}
                                      </span>
                                    </div>
                                    {item.badge && (
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                                        item.badgeColor || 'bg-gray-100 text-gray-600'
                                      }`}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </Link>
                                </div>
                              )
                            })
                          })()}
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
                href="/simulateur-vie-quebec" 
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-full hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group"
              >
                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                Simulateur Premium
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Ouvrir le menu de navigation"
              >
                <Menu className="w-6 h-6 text-gray-700" aria-hidden="true" />
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
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Content - Collapsible Accordion with Sub-Groups */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
              
              {/* TOP 5 - Accès Rapide Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between px-3 py-2 mb-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-gray-900">Accès Rapide</span>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">TOP 5</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* 1. Simulateur Premium - MEGA CARD */}
                  <Link
                    href="/simulateur-vie-quebec"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group overflow-hidden col-span-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="relative p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50"></div>
                            <div className="relative w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                              <Sparkles className="w-8 h-8 text-purple-600" />
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-lg font-black text-white drop-shadow-2xl mb-1">Simulateur Premium</div>
                            <div className="text-xs text-white/90 font-semibold">Simulation complète de vie au Québec</div>
                            <div className="relative inline-flex items-center mt-2">
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300 rounded-full blur-md opacity-75 animate-pulse"></div>
                              <span className="relative inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-white via-yellow-50 to-white rounded-full shadow-2xl border-2 border-white">
                                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                                <span className="text-[11px] font-black text-purple-700 tracking-wider">NOUVEAU</span>
                                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* 2. Salaire Net */}
                  <Link
                    href="/salaire-net-quebec"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group overflow-hidden col-span-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-40"></div>
                          <div className="relative w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Calculator className="w-7 h-7 text-emerald-600" />
                          </div>
                        </div>
                        <div>
                          <div className="text-base font-black text-white drop-shadow-lg">Salaire Net Québec</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-white text-emerald-600 text-[9px] font-black rounded-full shadow-lg">2026</span>
                            <span className="px-2 py-0.5 bg-emerald-900/50 backdrop-blur-sm text-white text-[9px] font-bold rounded-full">Le plus utilisé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* 3. Taux Horaire */}
                  <Link
                    href="/taux-horaire"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="relative p-4">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-40"></div>
                          <div className="relative w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Calculator className="w-7 h-7 text-purple-600" />
                          </div>
                        </div>
                        <div className="text-sm font-black text-white drop-shadow-lg">Taux Horaire</div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* 4. Déclaration */}
                  <Link
                    href="/declaration-simplifiee"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-500 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="relative p-4">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-40"></div>
                          <div className="relative w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Calculator className="w-7 h-7 text-orange-600" />
                          </div>
                        </div>
                        <div className="text-sm font-black text-white drop-shadow-lg">Déclaration</div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* 5. Loyer 2026 */}
                  <Link
                    href="/augmentation-loyer-2026"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative group overflow-hidden col-span-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="relative p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-40"></div>
                          <div className="relative w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Home className="w-7 h-7 text-red-600" />
                          </div>
                        </div>
                        <div className="text-sm font-black text-white drop-shadow-lg">Augmentation Loyer 2026</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {NAV_ITEMS.map((category, idx) => (
                <div key={idx} className="space-y-2">
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{category.title}</span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        openAccordion === idx ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <div className={`space-y-1 pl-2 overflow-hidden transition-all duration-300 ${
                    openAccordion === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {(() => {
                      let lastGroup = ''
                      return category.items.slice(0, 4).map((item, itemIdx) => {
                        const showGroupLabel = item.groupLabel && item.groupLabel !== lastGroup
                        if (item.groupLabel) lastGroup = item.groupLabel
                        
                        return (
                          <div key={itemIdx}>
                            {showGroupLabel && (
                              <div className="px-2 pt-2 pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                {item.groupLabel}
                              </div>
                            )}
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-xs font-medium text-gray-700">{item.name}</span>
                              {item.badge && (
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                  item.badgeColor || 'bg-gray-100 text-gray-600'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

