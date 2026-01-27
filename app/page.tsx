import Link from 'next/link'
import { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import { 
  Calculator, FileText, TrendingUp, Home as HomeIcon, Scale, Receipt, 
  Baby, Car, CreditCard, PiggyBank, Users, Clock, 
  DollarSign, Building2, HeartHandshake, Briefcase, Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Outils Financiers Québec 2026 - Calculatrices Gratuites (Impôt, Hypothèque, Auto)',
  description: 'Le site référence pour vos finances au Québec. Calculez votre salaire net, hypothèque, taxe de bienvenue, augmentation de loyer et plus. Simple et gratuit.',
}

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Prenez le contrôle de vos finances au Québec
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
                Des outils précis pour vos impôts, votre immobilier et votre famille. 100% Gratuit & Sécurisé.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  <span className="font-semibold">19 Outils Disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Mis à jour pour 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">100% Confidentiel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-7xl">

          {/* Category A: Impôts & Revenus */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Impôts & Revenus</h2>
                <p className="text-gray-600">Calculez vos impôts et optimisez votre revenu</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Salaire Net - Flagship */}
              <Link href="/salaire-net-quebec" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 h-full relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">POPULAIRE</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Salaire Net Québec
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez votre revenu net après impôts 2026
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Déclaration Simplifiée */}
              <Link href="/declaration-simplifiee" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500 h-full relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">NOUVEAU</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Déclaration Simplifiée
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Estimez votre remboursement et générez un PDF
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Assurance-Emploi */}
              <Link href="/assurance-emploi" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-cyan-500 h-full">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                    Assurance-Emploi
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez vos prestations d'assurance-emploi
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Taux Horaire */}
              <Link href="/taux-horaire" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-sky-500 h-full">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                    Taux Horaire
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Convertissez horaire, hebdo et annuel
                  </p>
                  <div className="flex items-center text-sky-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Paie de Vacances */}
              <Link href="/paie-vacances" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-500 h-full">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    Paie de Vacances
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez votre indemnité de vacances (4% ou 6%)
                  </p>
                  <div className="flex items-center text-yellow-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* TPS/TVQ */}
              <Link href="/tps-tvq-quebec" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-500 h-full">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Receipt className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    TPS/TVQ
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculateur de taxes de vente avec calcul inversé
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Category B: Immobilier */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Immobilier</h2>
                <p className="text-gray-600">Achat, location et gestion de propriété</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Louer ou Acheter */}
              <Link href="/louer-ou-acheter" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-500 h-full relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">NOUVEAU</span>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Scale className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    Louer ou Acheter?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comparez financièrement sur 5 ans
                  </p>
                  <div className="flex items-center text-amber-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Calcul Hypothécaire */}
              <Link href="/calcul-hypotheque" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-teal-500 h-full">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HomeIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Calcul Hypothécaire
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez vos paiements avec test de résistance
                  </p>
                  <div className="flex items-center text-teal-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Capacité d'Emprunt */}
              <Link href="/capacite-emprunt" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-violet-500 h-full">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    Capacité d'Emprunt
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Découvrez le prix maximum que vous pouvez payer
                  </p>
                  <div className="flex items-center text-violet-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Taxe de Bienvenue */}
              <Link href="/taxe-de-bienvenue" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-500 h-full">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Receipt className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Taxe de Bienvenue
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Droits de mutation pour votre achat immobilier
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Augmentation de Loyer */}
              <Link href="/augmentation-loyer-2026" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-500 h-full">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Augmentation de Loyer
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculateur TAL 2026 pour propriétaires et locataires
                  </p>
                  <div className="flex items-center text-green-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Category C: Famille & Quotidien */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="w-7 h-7 text-pink-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Famille & Quotidien</h2>
                <p className="text-gray-600">Allocations, garde d'enfants et véhicules</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Allocations Familiales */}
              <Link href="/allocations-familiales" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-pink-500 h-full relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">NOUVEAU</span>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    Allocations Familiales
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Estimez vos allocations pour enfants (ACE + Soutien)
                  </p>
                  <div className="flex items-center text-pink-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Frais de Garde */}
              <Link href="/frais-de-garde" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-rose-500 h-full">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Baby className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    Frais de Garde
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comparez CPE vs garderie privée avec crédit d'impôt
                  </p>
                  <div className="flex items-center text-rose-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Prêt Auto */}
              <Link href="/pret-auto" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500 h-full">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Prêt Auto
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez vos paiements de financement automobile
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Prêt Étudiant */}
              <Link href="/pret-etudiant" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-500 h-full">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Prêt Étudiant
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculez vos paiements avec crédit d'impôt
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Category D: Dettes & Planification */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dettes & Planification</h2>
                <p className="text-gray-600">Remboursement et épargne à long terme</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Remboursement de Dettes */}
              <Link href="/dettes-credit" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-red-500 h-full">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    Remboursement de Dettes
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Planifiez votre liberté financière
                  </p>
                  <div className="flex items-center text-red-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>

              {/* Épargne-Retraite */}
              <Link href="/epargne-retraite" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-500 h-full">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <PiggyBank className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    Épargne-Retraite
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Planifiez votre retraite avec les intérêts composés
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Category E: Investissement & Retraite */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Investissement & Retraite</h2>
                <p className="text-gray-600">Faites fructifier votre argent</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Intérêts Composés */}
              <Link href="/interets-composes" className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500 h-full relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">NOUVEAU</span>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Intérêts Composés
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Découvrez la puissance des intérêts composés
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold text-sm">
                    <span>Calculer →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Trust & Features Section */}
          <section className="bg-white rounded-2xl shadow-xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pourquoi choisir nos outils?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Confidentiel</h3>
                <p className="text-gray-600">
                  Vos données restent privées. Aucune information n'est sauvegardée ou partagée.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Précis et à jour</h3>
                <p className="text-gray-600">
                  Basé sur les taux officiels 2026 du gouvernement du Québec et du Canada.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rapide et gratuit</h3>
                <p className="text-gray-600">
                  Obtenez vos résultats en quelques secondes, sans inscription requise.
                </p>
              </div>
            </div>
          </section>

          {/* SEO Content */}
          <section className="prose prose-lg max-w-4xl mx-auto text-gray-700 mb-16">
            <p className="text-center text-lg">
              Nos outils financiers sont conçus spécifiquement pour les résidents du Québec. 
              Que vous soyez employé, travailleur autonome, propriétaire ou locataire, 
              nos calculateurs vous aident à prendre des décisions financières éclairées 
              en vous fournissant des estimations précises basées sur la législation québécoise actuelle.
            </p>
          </section>

          {/* Contact Form Section */}
          <ContactSection accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'} />
        </div>
      </div>
  )
}
