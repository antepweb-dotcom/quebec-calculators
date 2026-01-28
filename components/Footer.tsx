import Link from 'next/link'
import { Calculator, Mail, Twitter, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Quebec<span className="text-emerald-400">Calculators</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Simplifiez vos finances au Québec.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1 flex-wrap">
              <span>Développé avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>à Montréal pour les Québécois</span>
            </p>
          </div>

          {/* Column 2: Outils (Tools) */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Outils Populaires</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/salaire-net-quebec" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Calculateur d'Impôt
                </Link>
              </li>
              <li>
                <Link 
                  href="/calcul-hypotheque" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Calcul Hypothécaire
                </Link>
              </li>
              <li>
                <Link 
                  href="/pret-auto" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Prêt Auto
                </Link>
              </li>
              <li>
                <Link 
                  href="/allocations-familiales" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Allocations Familiales
                </Link>
              </li>
              <li>
                <Link 
                  href="/louer-ou-acheter" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Louer ou Acheter?
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Légal (Legal) */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/confidentialite" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link 
                  href="/conditions" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link 
                  href="/avis-legal" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Avis de Non-Responsabilité
                </Link>
              </li>
              <li>
                <Link 
                  href="/a-propos" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a 
                  href="mailto:info@quebec-calculators.com?subject=Bug%20Report" 
                  className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Un bug? Contactez-nous
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div>
              <p className="text-white font-semibold text-sm mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 pt-8">
          {/* Bottom Copyright Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} QuebecCalculators. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                href="/confidentialite" 
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200"
              >
                Confidentialité
              </Link>
              <Link 
                href="/conditions" 
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200"
              >
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
