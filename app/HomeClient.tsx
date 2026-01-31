'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Sparkles, Clock, Calculator, Car, GraduationCap, Building2, Wallet } from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';
import type { MarketRate } from '@/lib/marketData';

interface HomeClientProps {
  marketRates: MarketRate[];
}

const mainTools = [
  {
    href: "/salaire-net-quebec",
    title: "Salaire Net",
    subtitle: "Après Impôts 2026",
    description: "Découvrez votre revenu réel précis au dollar près.",
    imageSrc: "/images/3d-salary.jpg",
    className: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px] md:min-h-[500px]",
    theme: "emerald" as const
  },
  {
    href: "/frais-de-garde",
    title: "Frais de Garde",
    subtitle: "CPE vs Privé",
    description: "Optimisez vos allocations.",
    imageSrc: "/images/3d-childcare.jpg",
    className: "col-span-1 md:col-span-2 min-h-[250px]",
    theme: "pink" as const
  },
  {
    href: "/calcul-hypotheque",
    title: "Hypothèque",
    subtitle: "Simulation",
    description: "Capacité d'emprunt.",
    imageSrc: "/images/3d-mortgage.jpg",
    className: "col-span-1 min-h-[250px]",
    theme: "blue" as const
  },
  {
    href: "/declaration-simplifiee",
    title: "Impôt Rapide",
    subtitle: "Retour 2026",
    description: "Estimez votre retour.",
    imageSrc: "/images/3d-tax-form.jpg",
    className: "col-span-1 min-h-[250px]",
    theme: "amber" as const
  }
];

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

const themeClasses = {
  emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  blue: 'bg-blue-50 text-blue-700 border border-blue-100',
  pink: 'bg-pink-50 text-pink-700 border border-pink-100',
  amber: 'bg-amber-50 text-amber-700 border border-amber-100'
};

export default function HomeClient({ marketRates }: HomeClientProps) {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* TICKER */}
      <div className="bg-slate-950 border-b border-white/5 py-2 overflow-hidden relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs font-medium text-slate-400">
            {marketRates.map((r, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="uppercase tracking-wider opacity-70">{r.label}</span>
                <span className="text-white font-bold">{r.value}</span>
                <span className={r.change.includes('+') ? "text-emerald-400" : r.change.includes('-') ? "text-red-400" : "text-slate-400"}>
                  {r.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="relative bg-slate-950 pt-16 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Données officielles 2026
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1]">
            Vos finances québécoises, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              enfin claires.
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Des outils de précision pour calculer vos impôts, votre hypothèque et vos investissements. <span className="text-emerald-400 font-semibold">Gratuit. Anonyme. Sécurisé.</span>
          </p>

          <div className="max-w-xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
            <HeroSearch />
          </div>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {mainTools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out ${tool.className}`}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Image
                  src={tool.imageSrc}
                  alt={tool.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  quality={idx === 0 ? 90 : 75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full z-20">
                <div className="backdrop-blur-lg bg-white/70 border border-white/50 shadow-2xl rounded-2xl p-3 md:p-4 transform transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group-hover:bg-white/80">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider mb-2 ${themeClasses[tool.theme]} shadow-sm`}>
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
                    {tool.subtitle}
                  </div>

                  <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-tight mb-1 group-hover:text-emerald-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-600 font-medium leading-snug line-clamp-1 mb-2.5">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] md:text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Calculer
                    </span>
                    <div className="w-7 h-7 rounded-full bg-emerald-500 group-hover:bg-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 text-white transform transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SECONDARY TOOLS */}
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

      {/* PREMIUM BRAND SECTION */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Spécialisé Québec
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Vos finances québécoises,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                calculées avec précision.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Précision Garantie</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Résultats précis au dollar près avec les taux officiels 2026.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Toujours à Jour</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Mis à jour avec les dernières tables d'imposition.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Gratuit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sans inscription ni limite d'utilisation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTICS SECTION - COMPACT */}
      <div className="bg-white py-8 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800 mb-0.5">50K+</div>
              <div className="text-[11px] md:text-xs text-slate-500">Utilisateurs</div>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-300"></div>

            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800 mb-0.5">500K+</div>
              <div className="text-[11px] md:text-xs text-slate-500">Calculs</div>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-300"></div>

            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800 mb-0.5">99.9%</div>
              <div className="text-[11px] md:text-xs text-slate-500">Précision</div>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-300"></div>

            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800 mb-0.5">19+</div>
              <div className="text-[11px] md:text-xs text-slate-500">Outils</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO-RICH CONTENT SECTION */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="prose prose-slate max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Calculateurs Financiers Spécialisés pour le Québec
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  <strong>QCFinance.ca</strong> est la référence en matière de <strong>calculateurs financiers québécois</strong>. Contrairement aux outils génériques canadiens, nos calculateurs intègrent tous les paramètres fiscaux spécifiques au Québec pour 2026.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Que vous cherchiez à calculer votre <Link href="/salaire-net-quebec" className="text-emerald-600 hover:text-emerald-700 font-semibold">salaire net après impôts</Link>, vos <Link href="/calcul-hypotheque" className="text-emerald-600 hover:text-emerald-700 font-semibold">paiements hypothécaires</Link>, ou vos <Link href="/frais-de-garde" className="text-emerald-600 hover:text-emerald-700 font-semibold">frais de garde nets</Link>, nos outils vous donnent des résultats précis au dollar près.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Tous nos calculateurs sont <strong>100% gratuits</strong>, sans inscription requise, et mis à jour régulièrement avec les derniers taux de <strong>Revenu Québec</strong> et de l'<strong>Agence du revenu du Canada</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                  Nos Calculateurs les Plus Populaires
                </h3>
                <div className="space-y-4">
                  <Link href="/salaire-net-quebec" className="block p-4 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all group">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">Calculateur de Salaire Net Québec 2026</h4>
                    <p className="text-sm text-slate-600">Calculez votre revenu net après impôts provincial et fédéral, RRQ, RQAP et assurance-emploi.</p>
                  </Link>

                  <Link href="/calcul-hypotheque" className="block p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all group">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">Calculateur Hypothécaire Québec</h4>
                    <p className="text-sm text-slate-600">Estimez vos versements mensuels, intérêts totaux et capacité d'emprunt pour votre propriété.</p>
                  </Link>

                  <Link href="/frais-de-garde" className="block p-4 bg-slate-50 hover:bg-pink-50 rounded-xl border border-slate-200 hover:border-pink-300 transition-all group">
                    <h4 className="font-bold text-slate-900 group-hover:text-pink-700 mb-1">Calculateur de Frais de Garde</h4>
                    <p className="text-sm text-slate-600">Comparez CPE vs garderie privée avec crédits d'impôt québécois et fédéral.</p>
                  </Link>

                  <Link href="/declaration-simplifiee" className="block p-4 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-all group">
                    <h4 className="font-bold text-slate-900 group-hover:text-amber-700 mb-1">Déclaration d'Impôt Simplifiée</h4>
                    <p className="text-sm text-slate-600">Estimez rapidement votre retour d'impôt provincial et fédéral pour 2026.</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Pourquoi Choisir QCFinance.ca?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Paramètres Québécois</h4>
                  <p>Impôt provincial du Québec, cotisations RRQ, RQAP, crédits d'impôt solidarité, bouclier fiscal, et tous les crédits spécifiques au Québec.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Données Officielles 2026</h4>
                  <p>Tables d'imposition, taux de cotisation, seuils de revenus, et crédits d'impôt mis à jour selon les budgets provincial et fédéral.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">19 Outils Complets</h4>
                  <p>Salaire net, hypothèque, capacité d'emprunt, louer ou acheter, taxe de bienvenue, augmentation loyer, frais de garde, allocations familiales, épargne-retraite, intérêts composés, prêts auto et étudiants, auto électrique, dettes & crédit, TPS/TVQ, assurance-emploi, paie de vacances, taux horaire, et déclaration simplifiée.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Questions Fréquentes</h2>
            <p className="text-slate-600">Tout ce que vous devez savoir sur nos calculateurs</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-colors shadow-sm">
              <summary className="cursor-pointer p-5 font-semibold text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors">
                <span>Les calculateurs sont-ils vraiment gratuits?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                Oui, tous nos calculateurs sont <strong>100% gratuits</strong> et le resteront toujours. Aucune inscription n'est requise et il n'y a aucune limite d'utilisation. Nous sommes financés par des liens affiliés discrets (comme Wealthsimple) qui nous permettent de maintenir ce service gratuit.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-colors shadow-sm">
              <summary className="cursor-pointer p-5 font-semibold text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors">
                <span>Comment sont calculés les impôts au Québec?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                Nos calculateurs utilisent les <strong>tables d'imposition officielles 2026</strong> de Revenu Québec et de l'Agence du revenu du Canada. Nous intégrons l'impôt provincial progressif, l'impôt fédéral, les cotisations RRQ, RQAP, assurance-emploi, ainsi que tous les crédits d'impôt applicables au Québec.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-colors shadow-sm">
              <summary className="cursor-pointer p-5 font-semibold text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors">
                <span>Les données sont-elles à jour pour 2026?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                Absolument! Tous nos calculateurs sont mis à jour dès la publication des <strong>budgets provincial et fédéral</strong>. Nous suivons les annonces de Revenu Québec et de l'ARC pour intégrer immédiatement les nouveaux taux d'imposition, seuils de revenus, et crédits d'impôt.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-colors shadow-sm">
              <summary className="cursor-pointer p-5 font-semibold text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors">
                <span>Puis-je faire confiance aux résultats?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                Nos calculateurs sont <strong>précis au dollar près</strong> pour la grande majorité des situations. Cependant, certains cas complexes (revenus multiples, déductions spéciales, crédits particuliers) peuvent nécessiter l'avis d'un comptable professionnel. Nos outils sont parfaits pour des estimations fiables et rapides.
              </div>
            </details>

            <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 transition-colors shadow-sm">
              <summary className="cursor-pointer p-5 font-semibold text-slate-900 flex items-center justify-between hover:text-emerald-700 transition-colors">
                <span>Mes données personnelles sont-elles protégées?</span>
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                Oui! Tous les calculs sont effectués <strong>localement dans votre navigateur</strong>. Nous ne stockons aucune donnée personnelle, aucun revenu, aucune information financière. Vos calculs restent 100% privés et anonymes. Consultez notre <Link href="/confidentialite" className="text-emerald-600 hover:text-emerald-700 font-semibold">politique de confidentialité</Link> pour plus de détails.
              </div>
            </details>
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
    </div>
  );
}
