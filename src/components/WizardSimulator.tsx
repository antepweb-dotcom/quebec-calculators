'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, MapPin, Heart, Car, Users, 
  ArrowRight, ArrowLeft, Sparkles, Loader2,
  Home, TrendingUp, CheckCircle2, Zap
} from 'lucide-react';
import { QUEBEC_CITIES } from '@/src/data/quebecCosts';
import PremiumSimulator from './PremiumSimulator';

type WizardStep = 'income' | 'location' | 'lifestyle' | 'calculating' | 'results';

interface WizardData {
  income: string;
  cityId: string;
  hasPartner: boolean;
  hasCar: boolean;
}

// Fleur-de-lis SVG Component for Quebec branding
const FleurDeLis = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C11 2 10 3 10 4C10 5 11 6 12 6C13 6 14 5 14 4C14 3 13 2 12 2M12 7C10 7 8 8 8 10C8 11 9 12 10 12C9 13 8 14 8 15C8 17 10 19 12 19C14 19 16 17 16 15C16 14 15 13 14 12C15 12 16 11 16 10C16 8 14 7 12 7M7 10C6 10 5 11 5 12C5 13 6 14 7 14C8 14 9 13 9 12C9 11 8 10 7 10M17 10C16 10 15 11 15 12C15 13 16 14 17 14C18 14 19 13 19 12C19 11 18 10 17 10M12 20C11 20 10 21 10 22H14C14 21 13 20 12 20Z" />
  </svg>
);

export default function WizardSimulator() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('income');
  const [direction, setDirection] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    income: '',
    cityId: 'montreal',
    hasPartner: false,
    hasCar: false,
  });

  const canContinue = () => {
    if (currentStep === 'income') {
      const salary = parseFloat(wizardData.income);
      return wizardData.income && salary >= 1000;
    }
    return true;
  };

  const steps: WizardStep[] = ['income', 'location', 'lifestyle'];
  const currentStepIndex = steps.indexOf(currentStep);
  
  // Calculate progress based on step completion
  const getProgress = () => {
    if (currentStep === 'calculating' || currentStep === 'results') return 100;
    
    if (currentStep === 'income') {
      // 0% if empty, 33% if valid income entered
      return canContinue() ? 33 : 0;
    }
    
    // Other steps: 33%, 66%, 100%
    return ((currentStepIndex + 1) / steps.length) * 100;
  };
  
  const progress = getProgress();

  const handleNext = () => {
    setDirection(1);
    if (currentStep === 'income' && wizardData.income) {
      setCurrentStep('location');
    } else if (currentStep === 'location') {
      setCurrentStep('lifestyle');
    } else if (currentStep === 'lifestyle') {
      setCurrentStep('calculating');
      // Simulate calculation delay - 2.5 seconds
      setTimeout(() => {
        setCurrentStep('results');
      }, 2500);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentStep === 'location') {
      setCurrentStep('income');
    } else if (currentStep === 'lifestyle') {
      setCurrentStep('location');
    }
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Store wizard data in localStorage for PremiumSimulator
  useEffect(() => {
    if (currentStep === 'results') {
      localStorage.setItem('wizardData', JSON.stringify(wizardData));
    }
  }, [currentStep, wizardData]);

  // Results view - show PremiumSimulator with dramatic reveal
  if (currentStep === 'results') {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <PremiumSimulator />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-radial from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        {currentStep !== 'calculating' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/5 backdrop-blur-sm border-b border-white/10"
          >
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Étape {currentStepIndex + 1} sur {steps.length}</span>
                <span className="text-sm text-blue-400 font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: Income */}
              {currentStep === 'income' && (
                <motion.div
                  key="income"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50"
                    >
                      <DollarSign className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                      Quel est votre revenu annuel?
                    </h2>
                    <p className="text-slate-400 text-lg">
                      Entrez votre salaire brut annuel pour commencer
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-bold text-slate-400 group-focus-within:text-blue-400 transition-colors">
                        $
                      </span>
                      <input
                        type="text"
                        value={wizardData.income}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setWizardData({ ...wizardData, income: value });
                        }}
                        className="w-full pl-16 pr-8 py-6 text-4xl font-bold text-center bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20 outline-none transition-all"
                        placeholder="75 000"
                        autoFocus
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                        $ CAD
                      </span>
                    </div>
                    {wizardData.income && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-slate-400 mt-4"
                      >
                        {parseInt(wizardData.income).toLocaleString('fr-CA')} $ par année
                      </motion.p>
                    )}
                    {wizardData.income && parseFloat(wizardData.income) < 1000 && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-orange-400 mt-2 text-sm"
                      >
                        ⚠️ Le salaire minimum doit être d'au moins 1 000$
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Location */}
              {currentStep === 'location' && (
                <motion.div
                  key="location"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50"
                    >
                      <MapPin className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                      Où souhaitez-vous vivre?
                    </h2>
                    <p className="text-slate-400 text-lg">
                      Choisissez votre ville au Québec
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {QUEBEC_CITIES.slice(0, 6).map((city, index) => (
                      <motion.button
                        key={city.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setWizardData({ ...wizardData, cityId: city.id })}
                        className={`relative p-6 rounded-2xl border-2 transition-all ${
                          wizardData.cityId === city.id
                            ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {wizardData.cityId === city.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 className="w-6 h-6 text-blue-400" />
                          </motion.div>
                        )}
                        <Home className={`w-8 h-8 mb-3 ${
                          wizardData.cityId === city.id ? 'text-blue-400' : 'text-slate-400'
                        }`} />
                        <h3 className="text-xl font-bold text-white mb-2">{city.name}</h3>
                        <p className="text-sm text-slate-400 mb-3">{city.region}</p>
                        <div className="text-left space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Loyer:</span>
                            <span className="text-white font-semibold">{city.avgRent}$</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Population:</span>
                            <span className="text-white font-semibold">
                              {(city.population / 1000).toFixed(0)}k
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Lifestyle */}
              {currentStep === 'lifestyle' && (
                <motion.div
                  key="lifestyle"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50"
                    >
                      <Heart className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                      Parlez-nous de votre mode de vie
                    </h2>
                    <p className="text-slate-400 text-lg">
                      Ces informations nous aident à personnaliser vos résultats
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-6">
                    {/* Has Partner */}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWizardData({ ...wizardData, hasPartner: !wizardData.hasPartner })}
                      className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        wizardData.hasPartner
                          ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        wizardData.hasPartner ? 'bg-blue-500' : 'bg-white/10'
                      }`}>
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-white mb-1">
                          Êtes-vous en couple?
                        </h3>
                        <p className="text-sm text-slate-400">
                          Cela affecte vos dépenses partagées
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        wizardData.hasPartner
                          ? 'border-blue-400 bg-blue-500'
                          : 'border-white/20'
                      }`}>
                        {wizardData.hasPartner && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>

                    {/* Has Car */}
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWizardData({ ...wizardData, hasCar: !wizardData.hasCar })}
                      className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        wizardData.hasCar
                          ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        wizardData.hasCar ? 'bg-purple-500' : 'bg-white/10'
                      }`}>
                        <Car className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-white mb-1">
                          Avez-vous une voiture?
                        </h3>
                        <p className="text-sm text-slate-400">
                          Essence, assurance et entretien inclus
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        wizardData.hasCar
                          ? 'border-purple-400 bg-purple-500'
                          : 'border-white/20'
                      }`}>
                        {wizardData.hasCar && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4 text-center"
                    >
                      <p className="text-sm text-blue-200">
                        💡 Ces options sont facultatives et peuvent être modifiées plus tard
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Calculating State */}
              {currentStep === 'calculating' && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-20"
                >
                  {/* Animated Fleur-de-lis Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50"
                  >
                    <FleurDeLis className="w-16 h-16 text-white" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    Analyse en cours...
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-blue-300 mb-8"
                  >
                    Analyse des données du marché québécois
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3 max-w-md mx-auto"
                  >
                    {[
                      { text: 'Calcul des impôts fédéraux et provinciaux', delay: 0.6 },
                      { text: 'Analyse du coût de la vie', delay: 0.8 },
                      { text: 'Génération des recommandations personnalisées', delay: 1.0 },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                        className="flex items-center justify-center gap-3 text-slate-300"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Loader2 className="w-4 h-4 text-blue-400" />
                        </motion.div>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-10"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">Données du marché québécois 2025</span>
                    </div>
                  </motion.div>

                  {/* Pulse animation overlay */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-blue-500/10 rounded-3xl pointer-events-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== 'calculating' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between mt-8 gap-4"
              >
                {/* Back Button */}
                {currentStep !== 'income' && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleBack();
                    }}
                    className="flex items-center gap-2 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Retour</span>
                  </motion.button>
                )}

                <div className="flex-1" />

                {/* Continue Button */}
                <motion.button
                  whileHover={{ scale: canContinue() ? 1.05 : 1, x: canContinue() ? 5 : 0 }}
                  whileTap={{ scale: canContinue() ? 0.95 : 1 }}
                  onClick={() => {
                    if (canContinue()) {
                      handleNext();
                    }
                  }}
                  disabled={!canContinue()}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all group ${
                    canContinue()
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
                  }`}
                >
                  <span>
                    {currentStep === 'lifestyle' ? 'Voir les résultats' : 'Continuer'}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${canContinue() ? 'group-hover:translate-x-1' : ''} transition-transform`} />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
