'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Users, Calculator, Flag, Clock, Umbrella, Receipt, PiggyBank, Zap, Car, GraduationCap, CreditCard, TrendingUp, Home as HomeIcon, Scale } from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';

// Marquee Data - Real 2026 Data (Last Updated: January 2026)
const marketRates = [
  { label: "Taux Directeur", value: "2.25%", change: "stable" },
  { label: "Hypothèque 5 ans", value: "4.64%", change: "-0.35%" },
  { label: "Inflation Canada", value: "2.0%", change: "cible" },
  { label: "Chômage QC", value: "4.6%", change: "stable" },
  { label: "Hausse Loyer TAL", value: "3.1%", change: "2026" },
  { label: "Maximum CELI", value: "7 000 $", change: "2026" },
  { label: "Maximum REER", value: "32 490 $", change: "2026" },
  { label: "Salaire Minimum", value: "16.60 $/h", change: "mai 2026" },
];

const tools = [
  {
    href: "/salaire-net-quebec",
    title: "Salaire Net Après Impôts",
    description: "Découvrez votre véritable revenu net. Précision au dollar près pour 2026.",
    imageSrc: "/images/3d-salary.jpg",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    priority: true,
  },
  {
    href: "/calcul-hypotheque",
    title: "Calculateur Hypothécaire",
    description: "Simulez vos versements mensuels et testez votre capacité d'emprunt.",
    imageSrc: "/images/3d-mortgage.jpg",
    gradient: "from-blue-500/20 to-indigo-500/20",
    border: "group-hover:border-blue-500/50",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    priority: true,
  },
  {
    href: "/declaration-simplifiee",
    title: "Retour d'Impôt",
    description: "Estimez rapidement votre remboursement provincial.",
    imageSrc: "/images/3d-tax-form.jpg",
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-orange-500/50",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/assurance-emploi",
    title: "Chômage & AE",
    description: "Vos prestations hebdomadaires en cas de perte d'emploi.",
    imageSrc: "/images/3d-insurance.jpg",
    gradient: "from-sky-500/20 to-cyan-500/20",
    border: "group-hover:border-sky-500/50",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/frais-de-garde",
    title: "Frais de Garde",
    description: "Comparateur CPE vs Privé : Optimisez vos allocations.",
    imageSrc: "/images/3d-childcare.jpg",
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "group-hover:border-pink-500/50",
    colSpan: "col-span-1 lg:col-span-2",
    priority: false,
  },
  {
    href: "/capacite-emprunt",
    title: "Capacité d'Emprunt",
    description: "Combien la banque peut-elle vous prêter ?",
    imageSrc: "/images/3d-credit.jpg",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "group-hover:border-violet-500/50",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    priority: false,
  },
  {
    href: "/augmentation-loyer-2026",
    title: "Hausse de Loyer (TAL)",
    description: "Vérifiez si l'augmentation demandée est légale.",
    imageSrc: "/images/3d-rent.jpg",
    gradient: "from-gray-500/20 to-slate-500/20",
    border: "group-hover:border-gray-500/50",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    priority: false,
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. TOP TICKER */}
      <div className="bg-slate-950 border-b border-white/10 overflow-hidden py-2 relative z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          {[...marketRates, ...marketRates].map((rate, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-medium px-4 border-r border-white/10 last:border-0">
              <span className="text-slate-400 uppercase tracking-wider">{rate.label}</span>
              <span className="text-white font-bold">{rate.value}</span>
              <span className={rate.change.includes('+') ? "text-red-400" : "text-emerald-400"}>
                {rate.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PREMIUM DARK HERO */}
      <div className="relative bg-slate-950 pt-20 pb-12 overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mise à jour 2026
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Vos finances, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  simplifiées au Québec.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Des outils de précision pour calculer vos impôts, votre hypothèque et vos investissements. 
                <span className="text-white font-medium"> Gratuit. Anonyme. Sécurisé.</span>
              </p>

              <div className="max-w-xl mx-auto lg:mx-0 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
                <HeroSearch />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm rounded-full border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300 font-medium">100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm rounded-full border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300 font-medium">Sans inscription</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm rounded-full border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300 font-medium">Données privées</span>
                </div>
              </div>

              {/* Statistics Cards - Compact */}
              <div className="flex items-center justify-center lg:justify-start gap-3 max-w-xl">
                <div className="bg-slate-950/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-base font-bold text-white">10K+</div>
                    <div className="text-[8px] text-slate-400 whitespace-nowrap">Utilisateurs</div>
                  </div>
                </div>

                <div className="bg-slate-950/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-base font-bold text-white">500K+</div>
                    <div className="text-[8px] text-slate-400 whitespace-nowrap">Calculs</div>
                  </div>
                </div>

                <div className="bg-slate-950/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-base font-bold text-white">100%</div>
                    <div className="text-[8px] text-slate-400 whitespace-nowrap">Québécois</div>
                  </div>
                </div>

                <div className="bg-slate-950/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-base font-bold text-white">2026</div>
                    <div className="text-[8px] text-slate-400 whitespace-nowrap">Mis à jour</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - 3D Dashboard Mockup */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                {/* Glow Effect Behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
                
                {/* Main Dashboard Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800/50 transform hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/orta.jpg"
                    alt="QCFinance Dashboard - Calculateurs financiers pour le Québec"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Floating Mini Stats on Image */}
                  <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-emerald-500/30 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">500K+</div>
                        <div className="text-[9px] text-slate-400">Calculs ce mois</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-blue-500/30 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">10K+</div>
                        <div className="text-[9px] text-slate-400">Utilisateurs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* 3. THE TOOL GRID (WITH IMAGES) */}
      <div className="container mx-auto px-4 mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.href} 
              href={tool.href}
              className={`group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 ${tool.border} hover:-translate-y-1 ${tool.colSpan}`}
            >
              {/* Background Gradient Subtle */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10 flex flex-row items-start gap-6 h-full">
                {/* IMAGE */}
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-50 p-2 border border-slate-100 group-hover:border-transparent transition-colors">
                  <Image
                    src={tool.imageSrc}
                    alt={tool.title}
                    fill
                    className="object-contain"
                    priority={tool.priority}
                  />
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 pr-4 group-hover:text-emerald-700 transition-colors">
                      {tool.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 4. SECONDARY TOOLS (Compact List) */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-emerald-500 rounded-full"/>
            Autres calculateurs essentiels
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/allocations-familiales" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Users className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Allocations Familiales</span>
            </Link>
            
            <Link href="/louer-ou-acheter" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Scale className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Louer ou Acheter</span>
            </Link>
            
            <Link href="/taxe-de-bienvenue" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <HomeIcon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Taxe de Bienvenue</span>
            </Link>
            
            <Link href="/taux-horaire" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Clock className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Taux Horaire</span>
            </Link>
            
            <Link href="/paie-vacances" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Umbrella className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Paie Vacances</span>
            </Link>
            
            <Link href="/tps-tvq-quebec" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Receipt className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">TPS/TVQ</span>
            </Link>
            
            <Link href="/epargne-retraite" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <PiggyBank className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Épargne Retraite</span>
            </Link>
            
            <Link href="/auto-electrique-vs-essence" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Zap className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Auto Électrique</span>
            </Link>
            
            <Link href="/pret-auto" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <Car className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Prêt Auto</span>
            </Link>
            
            <Link href="/pret-etudiant" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <GraduationCap className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Prêt Étudiant</span>
            </Link>
            
            <Link href="/dettes-credit" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <CreditCard className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Dettes & Crédit</span>
            </Link>
            
            <Link href="/interets-composes" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-slate-200/50 hover:border-emerald-300 group transform hover:-translate-y-0.5">
              <TrendingUp className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-700 group-hover:text-slate-900">Intérêts Composés</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. SEO FOOTER */}
      <div className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 text-sm leading-relaxed max-w-4xl text-center space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">La référence en finances personnelles au Québec</h2>
          
          <p>
            QCFinance.ca est votre portail dédié pour naviguer dans la complexité du système fiscal québécois. 
            Contrairement aux calculateurs génériques canadiens, nos outils intègrent spécifiquement les paramètres provinciaux : 
            <Link href="/salaire-net-quebec" className="text-emerald-400 hover:underline"> impôts du Québec (TP-1)</Link>, 
            <Link href="/frais-de-garde" className="text-emerald-400 hover:underline"> crédit pour frais de garde</Link>, 
            et les règles du <Link href="/augmentation-loyer-2026" className="text-emerald-400 hover:underline"> TAL pour le logement</Link>.
          </p>
          
          <p>
            Que vous soyez salarié, propriétaire, parent ou étudiant, nos algorithmes mis à jour pour 2026 vous offrent 
            une précision inégalée pour prendre les meilleures décisions financières.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
