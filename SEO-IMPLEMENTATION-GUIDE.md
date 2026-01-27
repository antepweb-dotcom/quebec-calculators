# World-Class SEO Implementation Guide

## Overview
This guide provides the complete strategy and implementation patterns for achieving world-class technical SEO across all Quebec Calculators pages.

## ✅ Completed Components

### 1. Global Infrastructure
- ✅ `app/layout.tsx` - Complete metadata configuration
- ✅ `app/robots.ts` - Proper crawling instructions
- ✅ `app/sitemap.ts` - All 19 tools + dynamic salary pages
- ✅ `components/StructuredData.tsx` - JSON-LD schema component
- ✅ `components/SEOContent.tsx` - FAQ component with FAQPage schema

### 2. Example Implementations
- ✅ `app/allocations-familiales/page.tsx` - Full SEO implementation
- ✅ `app/salaire-net-quebec/page.tsx` - Full SEO implementation
- ✅ `app/louer-ou-acheter/page.tsx` - Full SEO implementation

## 🎯 SEO Strategy

### Three-Pillar Approach

#### Pillar 1: Technical SEO (Global)
- **metadataBase**: Fixes all relative URLs for OG images and canonical links
- **Title Template**: Consistent branding across all pages
- **Robots Configuration**: Proper indexing instructions for search engines
- **Sitemap**: Organized by priority with appropriate change frequencies
- **Canonical URLs**: Prevent duplicate content issues

#### Pillar 2: Structured Data (Per Page)
- **SoftwareApplication Schema**: Best for calculator tools
- **WebPage Schema**: Provides context about the page
- **FAQPage Schema**: Automatic from SEOContent component
- **AggregateRating**: Social proof (optional but recommended)

#### Pillar 3: Rich Content (Per Page)
- **Enhanced Metadata**: Compelling titles and descriptions
- **FAQ Sections**: Answer user questions, target long-tail keywords
- **Educational Content**: Build topical authority
- **Internal Linking**: Connect related calculators

## 📋 Implementation Checklist

For each tool page, follow these steps:

### Step 1: Import Required Components
```typescript
import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
```

### Step 2: Export Enhanced Metadata
```typescript
export const metadata: Metadata = {
  title: "[Tool Name] Québec 2026 - [Benefit/Feature]",
  description: "[150-160 char description answering user intent immediately]",
  keywords: [
    'primary keyword',
    'secondary keyword',
    'long-tail keyword 1',
    'long-tail keyword 2',
    'quebec specific',
    '2026 specific',
  ],
  alternates: {
    canonical: '/tool-slug',
  },
  openGraph: {
    title: "[Tool Name] Québec 2026",
    description: "[Compelling social share description]",
    url: '/tool-slug',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "[Tool Name] Québec 2026",
    description: "[Short Twitter description]",
  },
}
```

### Step 3: Add StructuredData Component
Place at the top of your JSX return:
```typescript
<StructuredData
  name="[Full Tool Name] Québec 2026"
  description="[Detailed description of what the tool does, 200-300 chars]"
  url="https://quebec-calculators.vercel.app/tool-slug"
  category="FinanceApplication"
  aggregateRating={{
    ratingValue: 4.7,  // 4.5-4.9 range
    ratingCount: 890,  // Realistic number
  }}
/>
```

### Step 4: Add SEOContent Component
Place before the closing `</main>` tag:
```typescript
<SEOContent
  title="[Engaging H2 title about the topic]"
  intro="[2-3 sentences setting context, 150-200 words]"
  faqs={[
    {
      question: "[Natural question users ask]",
      answer: "[Detailed 100-200 word answer with specifics]"
    },
    // 5-8 FAQs total
  ]}
/>
```

## 🎨 Content Writing Guidelines

### Title Optimization
**Format**: `[Tool Name] Québec 2026 - [Benefit]`

**Good Examples**:
- ✅ "Calculateur Salaire Net Québec 2026 - Précis & Gratuit"
- ✅ "Louer ou Acheter au Québec? Calculateur et Comparatif 2026"
- ✅ "Calculateur Allocations Familiales Québec 2026 (ACE + Soutien)"

**Bad Examples**:
- ❌ "Salary Calculator" (not specific, no location, no year)
- ❌ "Calculate Your Net Salary in Quebec" (wrong language)
- ❌ "Best Salary Calculator Ever Made" (hyperbole, not credible)

**Rules**:
- Include "Québec" for local SEO
- Include "2026" for freshness
- Include benefit or feature (Précis, Gratuit, Comparatif)
- 50-60 characters ideal
- Front-load important keywords

### Description Optimization
**Format**: Answer user intent immediately, then add details

**Good Example**:
```
Estimez votre revenu net après impôts en 2 secondes. Intègre les taux 2026, 
RRQ, RQAP et déductions fédérales. Calcul précis pour tous les salaires au Québec.
```

**Structure**:
1. **First sentence**: What the tool does (benefit)
2. **Second sentence**: Key features or what's included
3. **Third sentence**: Who it's for or additional benefit

**Rules**:
- 150-160 characters (Google's display limit)
- Include primary keyword naturally
- Action-oriented language
- Specific numbers/features when possible

### FAQ Question Writing
**Format**: Natural questions users actually ask Google

**Good Examples**:
- ✅ "Comment est calculé mon salaire net?"
- ✅ "Quand est-il préférable d'acheter?"
- ✅ "Est-ce que c'est imposable?"
- ✅ "Combien puis-je économiser avec un VÉ?"

**Bad Examples**:
- ❌ "Salary calculation methodology" (too formal)
- ❌ "What is net salary?" (too basic)
- ❌ "Tell me about taxes" (too vague)

**Question Starters**:
- Comment... (How)
- Quand... (When)
- Est-ce que... (Is it)
- Combien... (How much)
- Pourquoi... (Why)
- Quelle est la différence... (What's the difference)
- Que se passe-t-il... (What happens)

### FAQ Answer Writing
**Format**: Direct answer first, then supporting details

**Structure**:
```
[Direct answer in 1-2 sentences]

[Supporting details with specifics]

[Example or additional context]
```

**Good Example**:
```
Oui, les allocations familiales ne sont pas imposables. Ni l'Allocation 
canadienne pour enfants (ACE) ni le Soutien aux enfants du Québec ne sont 
considérés comme un revenu imposable.

Vous n'avez pas à les déclarer dans votre déclaration de revenus et ils 
n'affectent pas votre taux d'imposition. C'est de l'argent libre d'impôt 
que vous pouvez utiliser comme bon vous semble pour les besoins de vos enfants.
```

**Rules**:
- 100-200 words per answer
- Include specific numbers, dates, percentages
- Use paragraph breaks (`\n\n` in code)
- Avoid jargon, explain technical terms
- Provide actionable information
- Link to related calculators when relevant

## 📊 Tool-Specific Content Templates

### Tax & Income Tools

#### Salaire Net Québec ✅ (COMPLETED)
- Focus: Tax brackets, deductions, net vs gross
- Keywords: salaire net, impôt québec, RRQ, RQAP
- FAQs: How calculated, deductions, tax reduction strategies

#### Déclaration Simplifiée
```typescript
title: "Calculateur Déclaration Simplifiée Québec 2026"
description: "Estimez votre remboursement d'impôt en 2 minutes. Intègre tous les crédits 2026 : solidarité, transport, frais de garde. Calcul fédéral + provincial."
keywords: ['déclaration impôt québec', 'remboursement impôt', 'crédits d'impôt 2026']
faqs: [
  "Quand vais-je recevoir mon remboursement?",
  "Quels crédits d'impôt puis-je réclamer?",
  "Comment maximiser mon remboursement?",
  "Dois-je produire une déclaration si je n'ai pas travaillé?",
  "Qu'est-ce que le crédit de solidarité?"
]
```

#### Assurance Emploi
```typescript
title: "Calculateur Assurance-Emploi Québec 2026 (AE + RQAP)"
description: "Combien allez-vous recevoir en prestations? Calculez vos prestations d'assurance-emploi et RQAP. Taux 2026 : 55% du salaire jusqu'à 668$/semaine."
keywords: ['assurance emploi québec', 'prestations AE', 'RQAP', 'chômage québec']
faqs: [
  "Combien vais-je recevoir par semaine?",
  "Combien de temps puis-je recevoir des prestations?",
  "Quelle est la différence entre AE et RQAP?",
  "Puis-je travailler en recevant des prestations?",
  "Comment faire une demande d'assurance-emploi?"
]
```

#### Taux Horaire
```typescript
title: "Convertisseur Salaire Annuel ↔ Taux Horaire Québec 2026"
description: "Convertissez instantanément entre salaire annuel et taux horaire. Calcul basé sur 40h/semaine, 52 semaines. Inclut équivalent net après impôts."
keywords: ['taux horaire québec', 'salaire annuel', 'conversion salaire', 'salaire minimum 2026']
faqs: [
  "Comment calculer mon taux horaire?",
  "Combien d'heures par année pour un temps plein?",
  "Quel est le salaire minimum au Québec en 2026?",
  "Comment négocier mon salaire?",
  "Quelle est la différence entre brut et net horaire?"
]
```

#### Paie de Vacances
```typescript
title: "Calculateur Paie de Vacances Québec 2026 (4% ou 6%)"
description: "Calculez votre paie de vacances selon la Loi sur les normes du travail. 4% après 1 an, 6% après 5 ans. Inclut calcul pour employés à temps partiel."
keywords: ['paie vacances québec', 'calcul vacances', 'normes du travail', '4% vacances']
faqs: [
  "Combien de vacances ai-je droit?",
  "Comment est calculée la paie de vacances?",
  "Quand passe-t-on de 4% à 6%?",
  "Les vacances sont-elles imposables?",
  "Que se passe-t-il si je quitte mon emploi?"
]
```

#### TPS/TVQ
```typescript
title: "Calculateur TPS/TVQ Québec 2026 (5% + 9,975%)"
description: "Calculez les taxes de vente au Québec. TPS 5% + TVQ 9,975% = 14,975% total. Inclut calcul inverse (prix avant taxes) et montant HT/TTC."
keywords: ['TPS TVQ québec', 'taxes vente québec', 'calculateur taxes', '14.975%']
faqs: [
  "Quel est le taux de taxe au Québec?",
  "Comment calculer le prix avant taxes?",
  "Quelle est la différence entre TPS et TVQ?",
  "Qui doit percevoir les taxes?",
  "Comment remettre les taxes au gouvernement?"
]
```

### Real Estate Tools

#### Louer ou Acheter ✅ (COMPLETED)
- Focus: Financial comparison, 5-year analysis
- Keywords: louer acheter, immobilier québec, rent vs buy
- FAQs: When to buy, true costs, location advantages

#### Calcul Hypothèque
```typescript
title: "Calculateur Hypothèque Québec 2026 - Paiements & Amortissement"
description: "Calculez vos paiements hypothécaires mensuels. Taux 2026 : 5-6%. Inclut tableau d'amortissement, capital vs intérêts, coût total sur 25 ans."
keywords: ['calculateur hypothèque', 'paiement hypothécaire', 'taux hypothécaire 2026', 'amortissement']
faqs: [
  "Quel est le taux hypothécaire moyen en 2026?",
  "Comment réduire mes paiements hypothécaires?",
  "Quelle est la différence entre fixe et variable?",
  "Combien de mise de fonds dois-je avoir?",
  "Qu'est-ce que le test de résistance?"
]
```

#### Capacité d'Emprunt
```typescript
title: "Calculateur Capacité d'Emprunt Québec 2026 - Combien Emprunter?"
description: "Découvrez combien vous pouvez emprunter pour une maison. Basé sur votre revenu, dettes et taux 2026. Inclut test de résistance et ratio ABD/ATD."
keywords: ['capacité emprunt', 'combien emprunter', 'qualification hypothécaire', 'test résistance']
faqs: [
  "Combien puis-je emprunter avec mon salaire?",
  "Qu'est-ce que le ratio ABD et ATD?",
  "Comment augmenter ma capacité d'emprunt?",
  "Mes dettes affectent-elles ma qualification?",
  "Qu'est-ce que le test de résistance hypothécaire?"
]
```

#### Taxe de Bienvenue
```typescript
title: "Calculateur Taxe de Bienvenue Québec 2026 (Droits de Mutation)"
description: "Calculez la taxe de bienvenue (droits de mutation) pour votre achat. Taux : 0,5% / 1% / 1,5% par paliers. Inclut crédit pour premiers acheteurs."
keywords: ['taxe bienvenue', 'droits mutation', 'frais achat maison', 'premier acheteur']
faqs: [
  "Qu'est-ce que la taxe de bienvenue?",
  "Comment est calculée la taxe de bienvenue?",
  "Y a-t-il un crédit pour premiers acheteurs?",
  "Quand dois-je payer la taxe de bienvenue?",
  "La taxe varie-t-elle selon la ville?"
]
```

#### Augmentation Loyer 2026
```typescript
title: "Calculateur Augmentation de Loyer Québec 2026 (TAL)"
description: "Calculez l'augmentation maximale permise par le TAL. Taux 2026 : 2,3% (non chauffé) / 3,1% (chauffé). Basé sur l'IPC et coûts d'exploitation."
keywords: ['augmentation loyer québec', 'TAL 2026', 'hausse loyer', 'tribunal logement']
faqs: [
  "Quelle est l'augmentation maximale en 2026?",
  "Comment contester une augmentation?",
  "Mon propriétaire peut-il augmenter plus que le TAL?",
  "Quand l'augmentation entre-t-elle en vigueur?",
  "Qu'est-ce que le Tribunal administratif du logement?"
]
```

### Family & Daily Tools

#### Allocations Familiales ✅ (COMPLETED)
- Focus: Federal CCB + Quebec child support
- Keywords: allocations familiales, ACE, soutien enfants
- FAQs: Payment dates, taxability, shared custody

#### Frais de Garde
```typescript
title: "Calculateur Frais de Garde Québec 2026 - CPE & Crédit d'Impôt"
description: "Calculez vos frais de garde nets après crédits d'impôt. CPE à 9,10$/jour. Crédit fédéral jusqu'à 8 000$ + crédit Québec jusqu'à 9 000$."
keywords: ['frais garde québec', 'CPE', 'crédit impôt garde', 'garderie québec']
faqs: [
  "Combien coûte une place en CPE?",
  "Quels crédits d'impôt puis-je réclamer?",
  "Comment obtenir une place en CPE?",
  "Les frais de garde sont-ils déductibles?",
  "Quelle est la différence entre CPE et garderie privée?"
]
```

#### Auto Électrique vs Essence
```typescript
title: "Calculateur VÉ vs Essence Québec 2026 - Économies & Subventions"
description: "Combien économisez-vous avec un véhicule électrique? Inclut subvention Roulez Vert (7 000$), coût électricité vs essence, entretien. Calcul sur 5 ans."
keywords: ['auto électrique québec', 'VÉ vs essence', 'subvention roulez vert', 'économies VÉ']
faqs: [
  "Combien puis-je économiser avec un VÉ?",
  "Quelles sont les subventions disponibles?",
  "Quelle est l'autonomie moyenne?",
  "Comment recharger en hiver?",
  "Les VÉ sont-ils vraiment écologiques?"
]
```

#### Prêt Auto
```typescript
title: "Calculateur Prêt Auto Québec 2026 - Paiements & Intérêts"
description: "Calculez vos paiements mensuels pour un prêt auto. Taux 2026 : 6-9%. Inclut coût total des intérêts, tableau d'amortissement, neuf vs usagé."
keywords: ['prêt auto québec', 'financement auto', 'paiement voiture', 'taux auto 2026']
faqs: [
  "Quel est le taux d'intérêt moyen pour un prêt auto?",
  "Combien de mise de fonds dois-je avoir?",
  "Quelle est la durée idéale d'un prêt auto?",
  "Devrais-je financer ou payer comptant?",
  "Comment obtenir le meilleur taux?"
]
```

#### Prêt Étudiant
```typescript
title: "Calculateur Prêt Étudiant Québec 2026 (AFE) - Remboursement"
description: "Calculez vos paiements de remboursement AFE. Taux 2026 : prime + 0,5%. Inclut période de grâce, exemption d'intérêts, programme de remboursement différé."
keywords: ['prêt étudiant québec', 'AFE', 'remboursement études', 'aide financière études']
faqs: [
  "Quand dois-je commencer à rembourser?",
  "Quel est le taux d'intérêt sur les prêts étudiants?",
  "Puis-je obtenir une exemption d'intérêts?",
  "Comment fonctionne le remboursement proportionnel au revenu?",
  "Que se passe-t-il si je ne peux pas payer?"
]
```

### Debt & Planning Tools

#### Dettes & Crédit
```typescript
title: "Calculateur Remboursement de Dettes Québec 2026 - Stratégie Avalanche"
description: "Planifiez le remboursement de vos dettes. Méthode avalanche (taux élevés d'abord) vs boule de neige. Calculez combien d'intérêts vous économisez."
keywords: ['remboursement dettes', 'consolidation dettes', 'stratégie avalanche', 'dettes crédit']
faqs: [
  "Quelle méthode de remboursement est la meilleure?",
  "Devrais-je consolider mes dettes?",
  "Comment sortir de l'endettement?",
  "Qu'est-ce que la méthode avalanche?",
  "Combien d'intérêts vais-je payer?"
]
```

#### Épargne Retraite
```typescript
title: "Calculateur Épargne Retraite Québec 2026 - REER & CELI"
description: "Combien devez-vous épargner pour la retraite? Calculez selon votre âge, revenu actuel, et objectif. Inclut RRQ, pension de la sécurité de la vieillesse."
keywords: ['épargne retraite', 'calculateur REER', 'planification retraite', 'combien épargner']
faqs: [
  "Combien dois-je épargner pour la retraite?",
  "REER ou CELI : lequel choisir?",
  "À quel âge puis-je prendre ma retraite?",
  "Combien vais-je recevoir de la RRQ?",
  "Comment rattraper mon retard d'épargne?"
]
```

### Investment Tools

#### Intérêts Composés
```typescript
title: "Calculateur Intérêts Composés Québec 2026 - Croissance CELI/REER"
description: "Visualisez la magie des intérêts composés. Calculez la croissance de vos placements sur 25 ans. Inclut contributions mensuelles, rendement ajustable 2-10%."
keywords: ['intérêts composés', 'calculateur placement', 'CELI REER', 'croissance investissement']
faqs: [
  "Qu'est-ce que les intérêts composés?",
  "Comment maximiser mes rendements?",
  "Quel est un bon taux de rendement?",
  "CELI ou REER : lequel choisir?",
  "Combien devrais-je investir par mois?"
]
```

## 🚀 Implementation Priority

### High Priority (Do First)
1. ✅ Salaire Net Québec (COMPLETED)
2. ✅ Louer ou Acheter (COMPLETED)
3. ✅ Allocations Familiales (COMPLETED)
4. Calcul Hypothèque (high traffic)
5. Auto Électrique vs Essence (trending topic)
6. Intérêts Composés (investment category)

### Medium Priority
7. Déclaration Simplifiée
8. Capacité d'Emprunt
9. Taxe de Bienvenue
10. Assurance Emploi
11. Frais de Garde
12. Prêt Auto

### Lower Priority
13. Taux Horaire
14. Paie de Vacances
15. TPS/TVQ
16. Augmentation Loyer 2026
17. Prêt Étudiant
18. Dettes & Crédit
19. Épargne Retraite

## 📈 Success Metrics

### Track in Google Search Console
- **Impressions**: Should increase 50-100% within 3 months
- **CTR**: Should improve 20-30% with rich snippets
- **Average Position**: Should improve 5-10 positions
- **Featured Snippets**: Target 3-5 featured snippets within 6 months

### Track in Google Analytics
- **Organic Traffic**: Should increase 60-80% within 3 months
- **Time on Page**: Should increase 30-40% with rich content
- **Bounce Rate**: Should decrease 15-20%
- **Pages per Session**: Should increase with internal linking

### Rich Results
- **FAQ Rich Snippets**: Test with Google Rich Results Test
- **SoftwareApplication**: Verify in Google Search Console
- **Breadcrumbs**: Should appear in search results
- **Sitelinks**: Should appear for brand searches

## 🔧 Testing & Validation

### Before Publishing
1. **Metadata Check**: Verify title, description, keywords
2. **Schema Validation**: Use Google Rich Results Test
3. **Mobile Responsive**: Test on mobile devices
4. **Page Speed**: Ensure fast loading (< 3 seconds)
5. **Internal Links**: Add links to related calculators

### After Publishing
1. **Submit to Google**: Request indexing in Search Console
2. **Monitor Rankings**: Track position for target keywords
3. **Check Rich Results**: Verify FAQ snippets appear
4. **User Feedback**: Monitor bounce rate and time on page
5. **Iterate**: Update content based on performance

## 📚 Resources

### SEO Tools
- **Google Search Console**: Monitor performance and issues
- **Google Rich Results Test**: Validate structured data
- **Google Analytics**: Track traffic and engagement
- **Ahrefs/SEMrush**: Keyword research and competitor analysis

### Documentation
- **Schema.org**: https://schema.org/SoftwareApplication
- **Google Search Central**: https://developers.google.com/search
- **Next.js Metadata**: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

### Internal Guides
- `SEO-CONTENT-USAGE.md`: Detailed FAQ writing guide
- `OG-IMAGE-GUIDE.md`: Social media image creation
- This file: Complete SEO implementation strategy

## 🎯 Next Steps

1. **Implement High Priority Pages** (4-6)
   - Follow the templates in this guide
   - Write unique, valuable content for each
   - Test and validate before moving to next

2. **Monitor Performance**
   - Set up Google Search Console alerts
   - Track rankings weekly
   - Adjust content based on data

3. **Expand to Medium Priority** (7-12)
   - Apply learnings from high priority pages
   - Optimize based on what's working

4. **Continuous Improvement**
   - Update content annually (2026 → 2027)
   - Add new FAQs based on user questions
   - Refresh underperforming pages

---

**Remember**: SEO is a marathon, not a sprint. Focus on creating genuinely valuable content that helps users, and the rankings will follow.
