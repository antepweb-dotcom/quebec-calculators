'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  Calculator, 
  Twitter, 
  Linkedin, 
  Facebook,
  Youtube,
  Instagram,
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
  ArrowRight,
  Check
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
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo2.png"
                alt="QCFinance Logo"
                width={180}
                height={50}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              La référence québécoise pour vos calculs financiers. Des outils précis, gratuits et anonymes pour maitriser votre argent en 2026.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <SocialLink 
                icon={<Facebook className="w-5 h-5" />} 
                href="https://www.facebook.com/qcfinance" 
                label="Facebook"
              />
              <SocialLink 
                icon={<Twitter className="w-5 h-5" />} 
                href="https://twitter.com/qcfinance" 
                label="Twitter/X"
              />
              <SocialLink 
                icon={<Instagram className="w-5 h-5" />} 
                href="https://www.instagram.com/qcfinance" 
                label="Instagram"
              />
              <SocialLink 
                icon={<Youtube className="w-5 h-5" />} 
                href="https://www.youtube.com/@qcfinance" 
                label="YouTube"
              />
              <SocialLink 
                icon={<Linkedin className="w-5 h-5" />} 
                href="https://linkedin.com/company/qcfinance" 
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Column 2: Outils (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Outils Populaires</h3>
            <ul className="space-y-4">
              <FooterLink href="/salaire-net-quebec" icon={<DollarSign className="w-4 h-4" />} text="Impôt Net" />
              <FooterLink href="/calcul-hypotheque" icon={<Home className="w-4 h-4" />} text="Hypothèque" />
              <FooterLink href="/frais-de-garde" icon={<Baby className="w-4 h-4" />} text="Frais de Garde" />
              <FooterLink href="/pret-auto" icon={<CreditCard className="w-4 h-4" />} text="Prêt Auto" />
              <FooterLink href="/declaration-simplifiee" icon={<FileText className="w-4 h-4" />} text="Déclaration" />
              <FooterLink href="/louer-ou-acheter" icon={<Building2 className="w-4 h-4" />} text="Louer vs Acheter" />
              <FooterLink href="/allocations-familiales" icon={<Baby className="w-4 h-4" />} text="Allocations" />
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
            <NewsletterForm />
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
function SocialLink({ icon, href, label }: { icon: React.ReactNode, href: string, label?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
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

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Formspree endpoint - replace with your actual Formspree form ID
      // Get free form at: https://formspree.io/
      const response = await fetch('https://formspree.io/f/xnjvwyrq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          _subject: 'Nouvelle inscription newsletter QCFinance'
        }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Merci! Vous êtes inscrit.')
        setEmail('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Erreur lors de l\'inscription')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erreur. Réessayez plus tard.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h3 className="text-white font-bold mb-2">Restez informé</h3>
      <p className="text-slate-400 text-xs mb-4">Recevez les dernières mises à jour fiscales du Québec.</p>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/50 rounded-lg px-4 py-3 text-emerald-400 text-sm">
          <Check className="w-5 h-5" />
          <span>{message}</span>
        </div>
      ) : (
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com" 
            required
            disabled={status === 'loading'}
            className="bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{message}</p>
      )}
      
      <p className="text-slate-600 text-[10px] mt-3">Pas de spam. Désabonnement à tout moment.</p>
    </div>
  )
}
