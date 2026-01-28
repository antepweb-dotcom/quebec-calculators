'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';

const tools = [
  {
    href: "/salaire-net-quebec",
    title: "Salaire Net Après Impôts",
    description: "Découvrez votre véritable revenu net. Précision au dollar près pour 2026.",
    imageSrc: "/images/3d-salary.jpg",
    gradient: "from-emerald-50 to-teal-100/60",
    border: "border-emerald-100",
    text: "text-emerald-900",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    priority: true, // Above fold
  },
  {
    href: "/calcul-hypotheque",
    title: "Calculateur Hypothécaire",
    description: "Simulez vos versements mensuels et testez votre capacité d'emprunt.",
    imageSrc: "/images/3d-mortgage.jpg",
    gradient: "from-blue-50 to-indigo-100/60",
    border: "border-blue-100",
    text: "text-blue-900",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    priority: true, // Above fold
  },
  {
    href: "/declaration-simplifiee",
    title: "Retour d'Impôt",
    description: "Estimez rapidement votre remboursement provincial.",
    imageSrc: "/images/3d-tax-form.jpg",
    gradient: "from-orange-50 to-amber-100/60",
    border: "border-orange-100",
    text: "text-orange-900",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/assurance-emploi",
    title: "Chômage & AE",
    description: "Vos prestations hebdomadaires en cas de perte d'emploi.",
    imageSrc: "/images/3d-insurance.jpg",
    gradient: "from-sky-50 to-cyan-100/60",
    border: "border-sky-100",
    text: "text-sky-900",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/frais-de-garde",
    title: "Frais de Garde",
    description: "Comparateur CPE vs Privé : Optimisez vos allocations.",
    imageSrc: "/images/3d-childcare.jpg",
    gradient: "from-pink-50 to-rose-100/60",
    border: "border-pink-100",
    text: "text-pink-900",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/capacite-emprunt",
    title: "Capacité d'Emprunt",
    description: "Combien la banque peut-elle vous prêter ?",
    imageSrc: "/images/3d-credit.jpg",
    gradient: "from-violet-50 to-purple-100/60",
    border: "border-violet-100",
    text: "text-violet-900",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    priority: false,
  },
  {
    href: "/augmentation-loyer-2026",
    title: "Hausse de Loyer (TAL)",
    description: "Vérifiez si l'augmentation demandée est légale.",
    imageSrc: "/images/3d-rent.jpg",
    gradient: "from-gray-50 to-slate-200/60",
    border: "border-gray-200",
    text: "text-gray-900",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    priority: false,
  },
];

export default function Home() {

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-600/20 bg-emerald-50 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2"></span>
                Mis à jour pour 2026
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Maitrisez vos finances <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  au Québec
                </span>
              </h1>

              <p className="text-lg leading-8 text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Des calculateurs précis et gratuits pour vos impôts, votre hypothèque et vos allocations familiales. 
                Conçu spécifiquement pour la fiscalité québécoise.
              </p>

              <HeroSearch />

              {/* Trust Bar */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Gratuit
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Données Sécurisées
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Anonyme
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block lg:col-span-5 relative">
              {/* Background Gradient Blob */}
              <div className="absolute top-0 -right-20 -z-10 w-[40rem] h-[40rem] bg-gradient-to-tr from-emerald-200 to-teal-200 opacity-20 rounded-full blur-3xl" />
              
              {/* Main Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
                <Image
                  src="/images/orta.jpg"
                  alt="Financial Dashboard - Modern Finance Technology"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent" />
                
                {/* Floating Stats Cards */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-3xl font-extrabold text-emerald-600">19</div>
                  <div className="text-xs font-semibold text-gray-600">Outils Gratuits</div>
                </div>
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 transform hover:scale-105 transition-transform">
                  <div className="text-3xl font-extrabold text-teal-600">2026</div>
                  <div className="text-xs font-semibold text-gray-600">Mis à jour</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Below Hero - Balanced Professional */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-b-2 border-emerald-700/20 relative z-0">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">10,000+</div>
                <div className="text-sm text-emerald-50 font-semibold">Utilisateurs actifs</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-14 bg-white/30" />
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <span className="text-2xl">🧮</span>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">500,000+</div>
                <div className="text-sm text-emerald-50 font-semibold">Calculs effectués</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-14 bg-white/30" />
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <span className="text-2xl">⚜️</span>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">100%</div>
                <div className="text-sm text-emerald-50 font-semibold">Québécois</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-14 bg-white/30" />
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">2026</div>
                <div className="text-sm text-emerald-50 font-semibold">Mis à jour</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - With Connecting Lines */}
      <div className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Comment ça marche?
            </h2>
            <p className="text-base text-gray-600">
              Obtenez vos résultats en 3 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-2xl font-extrabold text-white">1</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Choisissez votre outil
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sélectionnez le calculateur qui correspond à vos besoins
              </p>
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-7 left-[65%] w-[70%]">
                <svg className="w-full h-2 text-indigo-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-2xl font-extrabold text-white">2</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Entrez vos données
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Remplissez les champs. Vos données restent privées
              </p>
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-7 left-[65%] w-[70%]">
                <svg className="w-full h-2 text-emerald-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-2xl font-extrabold text-white">3</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Obtenez vos résultats
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Résultats instantanés avec explications détaillées
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOOLS GRID SECTION (Bento Box) */}
      <div id="outils" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nos Outils Populaires
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Sélectionnez un outil pour obtenir une estimation précise en quelques secondes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[200px]">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-200 border ${tool.border} bg-gradient-to-br ${tool.gradient} ${tool.colSpan}`}
              >
                {/* Horizontal Flex Container (Always Row) */}
                <div className="relative z-10 flex flex-row items-start sm:items-center gap-6 h-full">
                  {/* LEFT: 3D Image (Fixed Size) */}
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0">
                    <Image
                      src={tool.imageSrc}
                      alt={tool.title}
                      width={96}
                      height={96}
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 96px"
                      loading={tool.priority ? "eager" : "lazy"}
                      priority={tool.priority}
                      quality={70}
                    />
                  </div>

                  {/* RIGHT: Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-xl font-bold ${tool.text} mb-2 pr-4`}>
                        {tool.title}
                      </h3>
                      {/* Arrow on top right of the text area */}
                      <ArrowRight className={`w-5 h-5 ${tool.text} opacity-0 group-hover:opacity-100 transition-opacity shrink-0`} />
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Compact Grid for Remaining Tools */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Tous nos outils financiers
              </h3>
              <p className="text-gray-600">
                Explorez notre collection complète de calculateurs
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {/* Taux Horaire */}
              <Link href="/taux-horaire" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Taux Horaire
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Convertissez salaire annuel en taux horaire
                  </p>
                </div>
              </Link>

              {/* Paie de Vacances */}
              <Link href="/paie-vacances" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🏖️</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Paie de Vacances
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Calculez votre indemnité de vacances
                  </p>
                </div>
              </Link>

              {/* TPS/TVQ */}
              <Link href="/tps-tvq-quebec" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🧾</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    TPS/TVQ
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Calculateur de taxes de vente
                  </p>
                </div>
              </Link>

              {/* Allocations Familiales */}
              <Link href="/allocations-familiales" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Allocations Familiales
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Estimez vos allocations pour enfants
                  </p>
                </div>
              </Link>

              {/* Louer ou Acheter */}
              <Link href="/louer-ou-acheter" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Louer ou Acheter
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Comparez financièrement sur 5 ans
                  </p>
                </div>
              </Link>

              {/* Taxe de Bienvenue */}
              <Link href="/taxe-de-bienvenue" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Taxe de Bienvenue
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Droits de mutation immobilière
                  </p>
                </div>
              </Link>

              {/* Prêt Auto */}
              <Link href="/pret-auto" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Prêt Auto
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Calculez vos paiements mensuels
                  </p>
                </div>
              </Link>

              {/* Prêt Étudiant */}
              <Link href="/pret-etudiant" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Prêt Étudiant
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Remboursement avec crédit d'impôt
                  </p>
                </div>
              </Link>

              {/* Dettes-Crédit */}
              <Link href="/dettes-credit" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Remboursement Dettes
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Planifiez votre liberté financière
                  </p>
                </div>
              </Link>

              {/* Épargne-Retraite */}
              <Link href="/epargne-retraite" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Épargne-Retraite
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Planifiez avec intérêts composés
                  </p>
                </div>
              </Link>

              {/* Intérêts Composés */}
              <Link href="/interets-composes" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Intérêts Composés
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Découvrez la puissance de l'investissement
                  </p>
                </div>
              </Link>

              {/* Auto Électrique vs Essence */}
              <Link href="/auto-electrique-vs-essence" className="group">
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                    Électrique vs Essence
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Comparez les coûts réels
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section - Rich & Link-Heavy */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vos finances québécoises, simplifiées
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Que vous cherchiez à calculer votre <Link href="/salaire-net-quebec" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">salaire net après impôts au Québec</Link>, à estimer vos <Link href="/allocations-familiales" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">allocations familiales</Link>, ou à planifier l'achat d'une propriété avec notre <Link href="/calcul-hypotheque" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">calculateur hypothécaire</Link>, nos outils sont conçus spécifiquement pour la réalité fiscale québécoise de 2026.
              </p>

              <p>
                La fiscalité au Québec est unique au Canada. Entre les <Link href="/declaration-simplifiee" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">déclarations d'impôts provinciales</Link>, les <Link href="/frais-de-garde" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">crédits pour frais de garde</Link>, et les programmes comme l'<Link href="/assurance-emploi" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">assurance-emploi</Link>, il est facile de se perdre. Nos calculateurs utilisent les taux d'imposition fédéraux et provinciaux les plus récents pour vous donner des résultats précis au dollar près.
              </p>

              <p>
                Propriétaires ou futurs acheteurs? Explorez notre <Link href="/augmentation-loyer-2026" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">calculateur d'augmentation de loyer 2026</Link> conforme au TAL, notre outil <Link href="/louer-ou-acheter" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">louer ou acheter</Link> pour comparer les coûts réels, ou estimez la <Link href="/taxe-de-bienvenue" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">taxe de bienvenue</Link> (droits de mutation) pour votre future maison.
              </p>

              <p>
                Employés et travailleurs autonomes peuvent également bénéficier de nos outils comme le <Link href="/taux-horaire" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">convertisseur de taux horaire</Link>, le calculateur de <Link href="/paie-vacances" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">paie de vacances</Link>, et notre outil <Link href="/tps-tvq-quebec" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">TPS/TVQ</Link> pour les taxes de vente.
              </p>

              <p>
                Planifiez votre avenir financier avec nos calculateurs d'<Link href="/epargne-retraite" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">épargne-retraite</Link>, d'<Link href="/interets-composes" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">intérêts composés</Link>, et de <Link href="/capacite-emprunt" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">capacité d'emprunt</Link>. Comparez même les coûts réels entre une <Link href="/auto-electrique-vs-essence" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-400 transition-colors">auto électrique vs essence</Link> avec les rabais québécois inclus.
              </p>

              <p className="text-sm text-gray-600 pt-4 border-t border-gray-100">
                Tous nos calculateurs sont gratuits, anonymes, et mis à jour régulièrement pour refléter les changements fiscaux et législatifs du Québec. Aucune inscription requise, aucune donnée personnelle collectée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

