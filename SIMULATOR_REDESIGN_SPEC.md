# Simulateur de Vie au Québec - Redesign Specification
## Conditional Wizard Flow System

**Date:** 2026-02-04  
**Version:** 2.0  
**Status:** Design Phase

---

## 🎯 Objectif Principal

Créer un wizard conditionnel intelligent qui adapte les questions selon les réponses de l'utilisateur, avec un résultat final **non-éditable** et une expérience **one-shot** (recommencer pour un nouveau calcul).

---

## 📊 Problèmes Actuels

### ❌ Système Actuel
1. **Toutes les questions pour tous** - Pas de logique conditionnelle
2. **Résultat éditable** - Utilisateur peut modifier après (confusion)
3. **Pas de guidance claire** - Trop d'options simultanées
4. **Pas de validation contextuelle** - Questions non pertinentes apparaissent

### ✅ Nouveau Système
1. **Questions conditionnelles** - Seulement ce qui est pertinent
2. **Résultat final fixe** - Pas d'édition, recommencer pour nouveau calcul
3. **Flow guidé** - Une question à la fois, logique claire
4. **Validation intelligente** - Empêche les combinaisons impossibles

---

## 🔄 Nouveau Flow Conditionnel

### **Step 1: Revenu Annuel Brut**
```
Question: "Quel est votre revenu annuel brut?"
Input: Nombre (min: 1,000$, max: 500,000$)
Validation: Obligatoire
Next: → Step 2
```

---

### **Step 2: Situation Familiale** ⭐ DÉCISION PRINCIPALE
```
Question: "Quelle est votre situation familiale?"

Options:
┌─────────────────────────────────────────────────────────┐
│ 1. 👤 Célibataire sans enfants                          │
│    → Flow: Solo                                         │
├─────────────────────────────────────────────────────────┤
│ 2. 👥 Célibataire avec enfant(s)                        │
│    → Flow: Single Parent                                │
├─────────────────────────────────────────────────────────┤
│ 3. 💑 En couple sans enfants (2 revenus)                │
│    → Flow: Couple Dual Income                           │
├─────────────────────────────────────────────────────────┤
│ 4. 💑 En couple sans enfants (1 revenu)                 │
│    → Flow: Couple Single Income                         │
├─────────────────────────────────────────────────────────┤
│ 5. 👨‍👩‍👧 En couple avec enfant(s) (2 revenus)              │
│    → Flow: Family Dual Income                           │
├─────────────────────────────────────────────────────────┤
│ 6. 👨‍👩‍👧 En couple avec enfant(s) (1 revenu)              │
│    → Flow: Family Single Income                         │
└─────────────────────────────────────────────────────────┘

Next: → Conditional based on choice
```

---

## 🌳 Conditional Flow Tree

### **Flow A: Célibataire sans enfants (Solo)**
```
Step 1: Revenu ✓
Step 2: Situation Familiale → Célibataire sans enfants
Step 3: Logement
  ├─ Seul(e) dans un appartement
  ├─ En colocation (2 personnes)
  └─ En colocation (3+ personnes)
Step 4: Ville au Québec (dropdown)
Step 5: Transport
  ├─ Voiture personnelle
  ├─ Transport en commun
  └─ Vélo/Marche
Step 6: → RÉSULTATS
```

### **Flow B: Célibataire avec enfant(s) (Single Parent)**
```
Step 1: Revenu ✓
Step 2: Situation Familiale → Célibataire avec enfant(s)
Step 3: Nombre d'enfants (1, 2, 3, 4+)
Step 4: Âges des enfants
  ├─ Pour chaque enfant: 0-5, 6-12, 13-17
  └─ Validation: Total = nombre d'enfants
Step 5: Garde d'enfants (si 0-5 ans)
  ├─ Place en CPE (subventionné)
  ├─ Garderie privée
  └─ Garde à domicile/famille
Step 6: Ville au Québec
Step 7: Transport
  ├─ Voiture (nécessaire avec enfants)
  └─ Transport en commun
Step 8: → RÉSULTATS
```

### **Flow C: En couple sans enfants (2 revenus)**
```
Step 1: Revenu ✓ (votre revenu)
Step 2: Situation Familiale → Couple 2 revenus
Step 3: Revenu du conjoint
  Input: Nombre (peut être 0 si en recherche d'emploi)
Step 4: Ville au Québec
Step 5: Type de logement
  ├─ Appartement 1 chambre
  ├─ Appartement 2 chambres
  └─ Maison/Condo
Step 6: Transport
  ├─ 2 voitures
  ├─ 1 voiture
  └─ Transport en commun
Step 7: → RÉSULTATS
```

### **Flow D: En couple sans enfants (1 revenu)**
```
Step 1: Revenu ✓
Step 2: Situation Familiale → Couple 1 revenu
Step 3: Raison du revenu unique
  ├─ Conjoint aux études
  ├─ Conjoint en recherche d'emploi
  ├─ Conjoint au foyer (choix)
  └─ Autre
Step 4: Ville au Québec
Step 5: Type de logement
Step 6: Transport
Step 7: → RÉSULTATS
```

### **Flow E: En couple avec enfant(s) (2 revenus)**
```
Step 1: Revenu ✓
Step 2: Situation Familiale → Famille 2 revenus
Step 3: Revenu du conjoint
Step 4: Nombre d'enfants
Step 5: Âges des enfants
Step 6: Garde d'enfants (si 0-5 ans)
Step 7: Ville au Québec
Step 8: Type de logement
  ├─ Appartement 2 chambres (1 enfant)
  ├─ Appartement 3 chambres (2 enfants)
  └─ Maison (3+ enfants)
Step 9: Transport
  ├─ 2 voitures
  ├─ 1 voiture
  └─ Transport en commun
Step 10: → RÉSULTATS
```

### **Flow F: En couple avec enfant(s) (1 revenu)**
```
Step 1: Revenu ✓
Step 2: Situation Familiale → Famille 1 revenu
Step 3: Nombre d'enfants
Step 4: Âges des enfants
Step 5: Garde d'enfants
  Note: Si conjoint au foyer, pas de frais de garde
  ├─ Conjoint s'occupe des enfants (0$ garde)
  ├─ CPE à temps partiel
  └─ Garderie privée
Step 6: Ville au Québec
Step 7: Type de logement
Step 8: Transport (généralement 1 voiture nécessaire)
Step 9: → RÉSULTATS
```

---

## 🎨 UX/UI Specifications

### **Wizard Container**
```typescript
- Full screen immersive experience
- Dark gradient background (slate-900 → slate-950)
- Animated transitions between steps
- Progress bar at top (Step X of Y)
- Back button (except on Step 1)
- Continue button (disabled until valid)
- No skip functionality
```

### **Question Display**
```typescript
- Large, clear question text (text-4xl)
- Helpful subtitle/context (text-slate-400)
- Icon representing the question
- Single focus: One question at a time
- Smooth animations (framer-motion)
```

### **Input Types**

#### **1. Number Input (Revenu)**
```typescript
- Large input field
- Currency formatting ($ CAD)
- Real-time validation
- Min/Max indicators
- Example values shown
```

#### **2. Single Choice (Situation Familiale)**
```typescript
- Large cards (grid layout)
- Icon + Title + Description
- Hover effects
- Selected state (border + background)
- Checkmark on selected
```

#### **3. Multi-Select (Âges des enfants)**
```typescript
- Counter buttons (+/-)
- Visual count display
- Validation message if mismatch
- Disabled when limit reached
```

#### **4. Dropdown (Ville)**
```typescript
- Searchable dropdown
- City name + region
- Average rent preview
- Population indicator
```

---

## 📱 Results Page (Non-Editable)

### **Layout**
```
┌─────────────────────────────────────────────────────────┐
│ [Nouvelle Simulation] Button (Top Right)                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📊 Votre Situation Financière                          │
│  ─────────────────────────────────                      │
│                                                          │
│  Revenu Net Mensuel: 4,800$                             │
│  Dépenses Totales: 3,200$                               │
│  Disponible: 1,600$ ✅                                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📈 Graphiques (Non-Interactive)                        │
│  - Donut chart (répartition)                            │
│  - Bar chart (dépenses)                                 │
├─────────────────────────────────────────────────────────┤
│  💡 Insights Personnalisés                              │
│  - Based on situation familiale                         │
│  - Specific recommendations                             │
├─────────────────────────────────────────────────────────┤
│  📄 Actions                                              │
│  - Télécharger PDF                                      │
│  - Partager résultats                                   │
│  - Sauvegarder scénario                                 │
├─────────────────────────────────────────────────────────┤
│  🔄 [Nouvelle Simulation] Button (Bottom)               │
└─────────────────────────────────────────────────────────┘
```

### **Key Features**
- ❌ **NO EDITING** - All inputs locked
- ✅ **Clear Summary** - All selections displayed
- ✅ **Download/Share** - Export functionality
- ✅ **Save Scenario** - For comparison later
- ✅ **New Simulation** - Restart wizard

---

## 🔧 Technical Implementation

### **Data Structure**
```typescript
interface WizardState {
  // Step 1
  grossIncome: number;
  
  // Step 2 - Determines flow
  familySituation: 
    | 'solo'
    | 'single-parent'
    | 'couple-dual-no-kids'
    | 'couple-single-no-kids'
    | 'couple-dual-kids'
    | 'couple-single-kids';
  
  // Conditional fields
  partnerIncome?: number;
  childrenCount?: number;
  childrenAges?: ('0-5' | '6-12' | '13-17')[];
  daycareType?: 'cpe' | 'private' | 'home' | 'partner-at-home';
  
  // Common fields
  cityId: string;
  housingType: 'studio' | '1br' | '2br' | '3br' | '4br' | 'house';
  transportType: 'no-car' | '1-car' | '2-cars' | 'public';
  
  // Colocation specific
  roommateCount?: number;
}
```

### **Flow Controller**
```typescript
function getNextStep(
  currentStep: number, 
  state: WizardState
): WizardStep {
  // Dynamic step calculation based on familySituation
  // Returns next relevant step
}

function getStepCount(familySituation: string): number {
  // Returns total steps for this flow
}

function validateStep(
  step: number, 
  state: WizardState
): boolean {
  // Validates current step data
}
```

### **Calculation Engine**
```typescript
function calculateResults(state: WizardState): SimulatorResult {
  // 1. Calculate taxes based on income(s)
  // 2. Calculate housing costs based on situation
  // 3. Calculate children costs if applicable
  // 4. Calculate benefits (CCB, Allocation Famille)
  // 5. Calculate disposable income
  // 6. Generate insights based on situation
  
  return {
    tax: TaxResult,
    housing: HousingResult,
    children: ChildrenResult,
    benefits: BenefitsResult,
    disposable: number,
    insights: Insight[]
  };
}
```

---

## 📊 Calculation Logic by Situation

### **Solo (Célibataire sans enfants)**
```typescript
Housing: 100% rent (studio/1br)
Food: 100% (450$/month)
Utilities: 100% (120$/month)
Transport: Based on choice
Benefits: None
Tax: Single filer
```

### **Roommate (Colocation)**
```typescript
Housing: Rent / roommateCount
Food: 100% (separate)
Utilities: Utilities / roommateCount
Transport: Based on choice
Benefits: None
Tax: Single filer
```

### **Single Parent**
```typescript
Housing: 100% rent (2br+ based on children)
Food: 100% + (children × 300$)
Utilities: 100%
Daycare: Based on type and children
Transport: Usually 1 car needed
Benefits: CCB + Allocation Famille (higher rates)
Tax: Single parent credits
```

### **Couple Dual Income**
```typescript
Housing: 50% each (shared)
Food: 150% total (economies of scale)
Utilities: 50% each
Children: If applicable, costs shared
Transport: Based on choice (1 or 2 cars)
Benefits: Combined income (lower benefits)
Tax: Combined household income
```

### **Couple Single Income**
```typescript
Housing: 100% from single income
Food: 150% (two people)
Utilities: 100%
Children: If applicable, no daycare if partner at home
Transport: Usually 1 car
Benefits: Lower income = higher benefits
Tax: Single income, dependent spouse credit
```

---

## 🎯 Success Metrics

### **User Experience**
- ✅ Completion rate > 80%
- ✅ Average time < 3 minutes
- ✅ Bounce rate < 20%
- ✅ Return rate for new simulation > 30%

### **Accuracy**
- ✅ Tax calculations ±2% of actual
- ✅ Benefits calculations ±5% of actual
- ✅ Cost of living ±10% of actual

### **Engagement**
- ✅ PDF downloads > 40%
- ✅ Scenario saves > 25%
- ✅ Social shares > 15%

---

## 🚀 Implementation Phases

### **Phase 1: Core Wizard (Week 1)**
- ✅ Implement conditional flow logic
- ✅ Create 6 family situation flows
- ✅ Build step validation system
- ✅ Add progress tracking

### **Phase 2: Calculations (Week 2)**
- ✅ Update calculation engine for all situations
- ✅ Implement benefit calculations
- ✅ Add situation-specific insights
- ✅ Test accuracy against real data

### **Phase 3: Results Page (Week 3)**
- ✅ Build non-editable results display
- ✅ Add PDF export functionality
- ✅ Implement scenario saving
- ✅ Add social sharing

### **Phase 4: Polish & Testing (Week 4)**
- ✅ Animation refinements
- ✅ Mobile optimization
- ✅ User testing
- ✅ Bug fixes & optimization

---

## 📝 Example User Journey

### **Scenario: Marie, 32 ans, Montréal**
```
Step 1: Revenu → 65,000$
Step 2: Situation → Célibataire avec enfant(s)
Step 3: Enfants → 1 enfant
Step 4: Âge → 0-5 ans
Step 5: Garde → Place en CPE ✅
Step 6: Ville → Montréal
Step 7: Transport → Transport en commun

RÉSULTATS:
├─ Revenu net: 4,100$/mois
├─ Loyer (2br): 2,275$/mois
├─ CPE: 200$/mois
├─ Nourriture: 750$/mois
├─ Transport: 97$/mois
├─ Autres: 300$/mois
├─ TOTAL: 3,622$/mois
├─ Allocations: 915$/mois
├─ NET DÉPENSES: 2,707$/mois
└─ DISPONIBLE: 1,393$/mois ✅

INSIGHTS:
💰 Excellente nouvelle! Avec votre place en CPE, vous économisez 900$/mois
👶 Vos allocations familiales couvrent 65% des coûts de votre enfant
🏠 Votre loyer représente 55% de votre revenu net (recommandé: <30%)
💡 Conseil: Cherchez un logement moins cher pour améliorer votre situation
```

---

## 🔐 Data Privacy

- ❌ **NO DATA STORED** on server
- ✅ **LOCAL STORAGE ONLY** for saved scenarios
- ✅ **NO TRACKING** of personal information
- ✅ **ANONYMOUS ANALYTICS** only (page views, completion rate)
- ✅ **GDPR COMPLIANT**

---

## 📱 Mobile Considerations

- ✅ **Touch-optimized** buttons (min 44px)
- ✅ **Swipe gestures** for next/back
- ✅ **Responsive layouts** (mobile-first)
- ✅ **Reduced animations** on low-end devices
- ✅ **Offline capability** (PWA)

---

## 🎨 Branding & Tone

### **Visual Identity**
- Modern, professional, trustworthy
- Quebec-focused (fleur-de-lis, blue/white)
- Clean, minimalist design
- Accessible (WCAG AA compliant)

### **Copy Tone**
- Friendly but professional
- Clear, jargon-free French
- Encouraging and supportive
- Realistic but optimistic

---

## ✅ Ready to Implement

Cette spécification est complète et prête pour l'implémentation. Le système conditionnel rendra l'expérience beaucoup plus intuitive et personnalisée pour chaque utilisateur.

**Next Steps:**
1. Review & approve this spec
2. Start Phase 1 implementation
3. Create component structure
4. Build conditional flow engine

---

**Document Version:** 2.0  
**Last Updated:** 2026-02-04  
**Status:** ✅ Ready for Development
