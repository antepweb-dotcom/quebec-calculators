'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Sparkles, Clock, Calculator, Car, GraduationCap, Building2, Wallet } from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';

// --- DATA: LIVE TICKER ---
const marketRates = [
  { label: "Taux Directeur", value: "4.50%", change: "-0.25%" },
  { label: "Hypothèque 5 ans", value: "4.99%", change: "stable" },
  { label: "Inflation QC", value: "2.3%", change: "+0.1%" },
  { label: "Chômage", value: "5.1%", change: "-0.2%" },
];

// --- DATA: TIER 1 (FULL BLEED BENTO) ---
const mainTools = [
  {
    href: "/salaire-net-quebec",
    title: "Salaire Net",
    subtitle: "Après Impôts 2026",
    description: "Découvrez votre revenu réel précis au dollar près.",
    imageSrc: "/images/3d-salary.jpg",
    // Big 2x2 Card
    className: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px] md:min-h-[500px]",
    theme: "emerald"
  },
  {
    href: "/frais-de-garde",
    title: "Frais de Garde",
    subtitle: "CPE vs Privé",
    description: "Optimisez vos allocations.",
    imageSrc: "/images/3d-childcare.jpg",
    // Wide Card
    className: "col-span-1 md:col-span-2 min-h-[250px]",
    theme: "pink"
  },
  {
    href: "/calcul-hypotheque",
    title: "Hypothèque",
    subtitle: "Simulation",
    description: "Capacité d'emprunt.",
    imageSrc: "/images/3d-mortgage.jpg",
    className: "col-span-1 min-h-[250px]",
    theme: "blue"
  },
  {
    href: "/declaration-simplifiee",
    title: "Impôt Rapide",
    subtitle: "Retour 2026",
    description: "Estimez votre retour.",
    imageSrc: "/images/3d-tax-form.jpg",
    className: "col-span-1 min-h-[250px]",
    theme: "amber"
  }
];

// --- DATA: TIER 2 (COMPACT LIST) ---
const secondaryTools = [
  { label: "Prêt Auto", href: "/pret-auto", icon: <Car className="w-5 h-5"/> },
  { label: "Auto Électrique", href: "/auto-electrique-vs-essence", icon: <Sparkles className="w-5 h-5"/> },
  { label: "Taux Horaire", href: "/taux-horaire", icon: <Clock className="w-5 h-5"/> },
  { label: "Paie Vacances", href: "/paie-vacances", icon: <Wallet className="w-5 h-5"/> },
  { label: "TPS/TVQ", href: "/tps-tvq-quebec", icon: <Calculator className="w-5 h-5"/> },
  { label: "Prêt Étudiant", href: "/pret-etudiant", icon: <GraduationCap className="w-5 h-5"/> },
  { label: "Dettes & Crédit", href: "/dettes-credit", icon: <TrendingUp className="w-5 h-5"/> },
  { label: "Épargne Retraite", href: "/epargne-retraite", icon: <Building2 className="w-5 h-5"/> },
];

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. TICKER (Same as before) */}
      <div className="bg-slate-950 border-b border-white/5 py-2 overflow-hidden relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs font-medium text-slate-400">
            {marketRates.map((r, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="uppercase tracking-wider opacity-70">{r.label}</span>
                <span className="text-white font-bold">{r.value}</span>
                <span className={r.change.includes('+') ? "text-emerald-400" : "text-red-400"}>
                  {r.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION (Same as before) */}
      <div className="relative bg-slate-950 pt-24 pb-48 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Données officielles 2026
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            Vos finances québécoises, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              enfin claires.
            </span>
          </h1>

          <div className="max-w-xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
            <HeroSearch />
          </div>
        </div>
      </div>

      {/* 3. THE NEW "FULL BLEED" BENTO GRID */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {mainTools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out ${tool.className}`}
            >
              {/* A) BACKGROUND IMAGE (Full Bleed with Zoom Effect) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Image
                  src={tool.imageSrc}
                  alt={tool.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle Dark Overlay for contrast (Top-to-bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* B) FLOATING GLASS CARD (The Premium Touch) */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-20">
                <div className="backdrop-blur-md bg-white/95 border border-white/60 shadow-xl rounded-2xl p-5 transform transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:bg-white">
                  {/* Badge / Subtitle */}
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-3 ${
                    tool.theme === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    tool.theme === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    tool.theme === 'pink' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                    'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {tool.subtitle}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Animated CTA */}
                  <div className="mt-4 flex items-center text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Calculer <ArrowRight className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 4. SECONDARY TOOLS (Same as before) */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-8 opacity-60">
            <div className="h-px bg-slate-300 flex-1" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Outils Secondaires</span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {secondaryTools.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all group text-center gap-2"
              >
                <div className="p-2.5 bg-slate-50 rounded-full text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {tool.icon}
                </div>
                <span className="font-semibold text-slate-700 text-xs md:text-sm">{tool.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEO FOOTER SECTION (Same as before) */}
      <div className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 text-sm leading-relaxed max-w-4xl text-center space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            La référence en finances personnelles au Québec
          </h2>
          <p>
            QCFinance.ca est votre portail dédié pour naviguer dans la complexité du système fiscal québécois. 
            Contrairement aux calculateurs génériques canadiens, nos outils intègrent spécifiquement les paramètres provinciaux.
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
