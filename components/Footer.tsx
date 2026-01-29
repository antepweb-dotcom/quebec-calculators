'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  Calculator, 
  Twitter, 
  Linkedin, 
  Heart, 
  DollarSign, 
  Home, 
  CreditCard, 
  Baby, 
  Building2, 
  Shield, 
  FileText, 
  AlertTriangle, 
  Info, 
  HelpCircle, 
  MessageSquare,
  ArrowRight
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Mission (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              {/* Use the Logo Image if available, fallback to styled text */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-white tracking-tight">
                  QC<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Finance</span>
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              La référence québécoise pour vos calculs financiers. Des outils précis, gratuits et anonymes pour maitriser votre argent en 2026.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Linkedin className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Column 2: Outils (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Outils Populaires</h3>
            <ul className="space-y-4">
              <FooterLink href="/salaire-net-quebec" icon={<DollarSign className="w-4 h-4" />} text="Impôt Net" />
              <FooterLink href="/calcul-hypotheque" icon={<Home className="w-4 h-4" />} text="Hypothèque" />
              <FooterLink href="/pret-auto" icon={<CreditCard className="w-4 h-4" />} text="Prêt Auto" />
              <FooterLink href="/allocations-familiales" icon={<Baby className="w-4 h-4" />} text="Allocations" />
              <FooterLink href="/louer-ou-acheter" icon={<Building2 className="w-4 h-4" />} text="Louer vs Acheter" />
            </ul>
          </div>

          {/* Column 3: Ressources (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-4">
              <FooterLink href="/a-propos" icon={<Info className="w-4 h-4" />} text="À Propos" />
              <FooterLink href="/faq" icon={<HelpCircle className="w-4 h-4" />} text="FAQ" />
              <FooterLink href="/contact" icon={<MessageSquare className="w-4 h-4" />} text="Contact" />
              <FooterLink href="/confidentialite" icon={<Shield className="w-4 h-4" />} text="Confidentialité" />
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="text-white font-bold mb-2">Restez informé</h3>
              <p className="text-slate-400 text-xs mb-4">Recevez les dernières mises à jour fiscales du Québec.</p>
              
              <form 
                className="flex gap-2" 
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const email = formData.get('email')
                  console.log('Newsletter signup:', email)
                  // TODO: Implement newsletter signup
                }}
              >
                <input 
                  type="email" 
                  name="email"
                  placeholder="votre@email.com" 
                  required
                  className="bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                />
                <button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 py-2 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              
              <p className="text-slate-600 text-[10px] mt-3">Pas de spam. Désabonnement à tout moment.</p>
            </div>
          </div>
        </div>

        {/* Separator & Disclaimer */}
        <div className="border-t border-slate-900 pt-8 mt-8">
          <div className="bg-slate-900/50 rounded-xl p-4 mb-8 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500/80 shrink-0 mt-0.5" />
              <p className="text-slate-500 text-xs leading-relaxed">
                <strong className="text-slate-400">Avis de non-responsabilité :</strong> QCFinance.ca fournit des outils de simulation à titre informatif uniquement. Bien que nous visions la plus grande précision, ces résultats ne remplacent pas l'avis d'un professionnel financier. Certains liens peuvent être affiliés (ex: Wealthsimple), ce qui nous permet de maintenir ce service 100% gratuit.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>
              © {currentYear} QCFinance.ca • Fait avec <Heart className="w-3 h-3 inline text-red-500 mx-1" /> au Québec
            </p>
            <div className="flex gap-6">
              <Link href="/conditions" className="hover:text-slate-400 transition-colors">Conditions</Link>
              <Link href="/avis-legal" className="hover:text-slate-400 transition-colors">Avis Légal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Micro-Components for cleaner code
function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-400 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-800 hover:border-emerald-500/50"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, icon, text }: { href: string, icon: React.ReactNode, text: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
      >
        <span className="opacity-50 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
        <span>{text}</span>
      </Link>
    </li>
  )
}
