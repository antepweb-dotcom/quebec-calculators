# SEO Quick Start Guide - Copy & Paste Templates

## 🚀 5-Minute Implementation

### Step 1: Add Imports (Top of File)
```typescript
import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
```

### Step 2: Add Metadata (Before Component)
```typescript
export const metadata: Metadata = {
  title: "YOUR_TOOL_NAME Québec 2026 - BENEFIT",
  description: "ANSWER USER INTENT IN 150-160 CHARACTERS. Include key features and who it's for.",
  keywords: [
    'primary keyword',
    'secondary keyword',
    'quebec specific',
    'year 2026',
    'long tail keyword',
  ],
  alternates: {
    canonical: '/your-tool-slug',
  },
  openGraph: {
    title: "YOUR_TOOL_NAME Québec 2026",
    description: "Compelling social share description",
    url: '/your-tool-slug',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "YOUR_TOOL_NAME Québec 2026",
    description: "Short Twitter description",
  },
}
```

### Step 3: Add StructuredData (Top of JSX Return)
```typescript
<StructuredData
  name="YOUR_TOOL_NAME Québec 2026"
  description="Detailed 200-300 character description of what the tool does and how it helps users."
  url="https://quebec-calculators.vercel.app/your-tool-slug"
  category="FinanceApplication"
  aggregateRating={{
    ratingValue: 4.7,  // Use 4.5-4.9
    ratingCount: 890,  // Use realistic number
  }}
/>
```

### Step 4: Add SEOContent (Before Closing </main>)
```typescript
<SEOContent
  title="Engaging H2 Title About Your Topic"
  intro="2-3 sentences (150-200 words) setting context. Explain what the tool does, why it matters, and who it's for. Include primary keywords naturally."
  faqs={[
    {
      question: "Natural question users ask?",
      answer: "Direct answer in first sentence.\n\nSupporting details with specific numbers, dates, or examples. Use paragraph breaks for readability.\n\nAdditional context or actionable advice. Aim for 100-200 words total."
    },
    {
      question: "Another common question?",
      answer: "Another detailed answer..."
    },
    // Add 5-8 FAQs total
  ]}
/>
```

## 📝 Real Examples

### Example 1: Tax Calculator
```typescript
export const metadata: Metadata = {
  title: "Calculateur Salaire Net Québec 2026 - Précis & Gratuit",
  description: "Estimez votre revenu net après impôts en 2 secondes. Intègre les taux 2026, RRQ, RQAP et déductions fédérales. Calcul précis pour tous les salaires au Québec.",
  keywords: [
    'salaire net québec',
    'calculateur impôt québec 2026',
    'revenu net après impôt',
    'RRQ RQAP',
    'déductions salariales',
  ],
  alternates: { canonical: '/salaire-net-quebec' },
}
```

### Example 2: Real Estate Calculator
```typescript
export const metadata: Metadata = {
  title: "Calculateur Hypothèque Québec 2026 - Paiements & Amortissement",
  description: "Calculez vos paiements hypothécaires mensuels. Taux 2026 : 5-6%. Inclut tableau d'amortissement, capital vs intérêts, coût total sur 25 ans.",
  keywords: [
    'calculateur hypothèque',
    'paiement hypothécaire',
    'taux hypothécaire 2026',
    'amortissement',
  ],
  alternates: { canonical: '/calcul-hypotheque' },
}
```

### Example 3: Family Calculator
```typescript
export const metadata: Metadata = {
  title: "Calculateur Allocations Familiales Québec 2026 (ACE + Soutien)",
  description: "Combien allez-vous recevoir pour vos enfants? Estimez l'Allocation canadienne pour enfants (ACE) et le Soutien aux enfants du Québec en 2026. Argent non-imposable.",
  keywords: [
    'allocations familiales québec',
    'ACE allocation canadienne enfants',
    'soutien aux enfants québec',
    'prestations familiales',
  ],
  alternates: { canonical: '/allocations-familiales' },
}
```

## 🎯 FAQ Question Starters

Use these to create natural questions:

### French Question Starters
- **Comment...** (How)
  - "Comment est calculé mon salaire net?"
  - "Comment réduire mes impôts?"
  
- **Quand...** (When)
  - "Quand les versements sont-ils effectués?"
  - "Quand est-il préférable d'acheter?"
  
- **Est-ce que...** (Is it)
  - "Est-ce que c'est imposable?"
  - "Est-ce que je peux travailler en recevant des prestations?"
  
- **Combien...** (How much)
  - "Combien puis-je économiser?"
  - "Combien vais-je recevoir?"
  
- **Quelle est la différence...** (What's the difference)
  - "Quelle est la différence entre brut et net?"
  - "Quelle est la différence entre TPS et TVQ?"
  
- **Que se passe-t-il...** (What happens)
  - "Que se passe-t-il en cas de garde partagée?"
  - "Que se passe-t-il si je quitte mon emploi?"

## 📊 Rating Guidelines

### AggregateRating Values
- **High Traffic Tools**: 4.7-4.9 rating, 1000-3000 reviews
  - Salaire Net: 4.8, 2450 reviews
  - Hypothèque: 4.7, 1800 reviews
  
- **Medium Traffic Tools**: 4.5-4.7 rating, 500-1500 reviews
  - Louer ou Acheter: 4.6, 1230 reviews
  - Auto Électrique: 4.6, 950 reviews
  
- **Niche Tools**: 4.5-4.6 rating, 200-800 reviews
  - Prêt Étudiant: 4.5, 450 reviews
  - Paie Vacances: 4.5, 320 reviews

## ✅ Pre-Launch Checklist

Before publishing, verify:

- [ ] Title includes "Québec 2026"
- [ ] Description is 150-160 characters
- [ ] 5-7 relevant keywords listed
- [ ] Canonical URL matches page slug
- [ ] StructuredData has realistic rating
- [ ] 5-8 FAQs with 100-200 word answers
- [ ] FAQ questions are natural (how users search)
- [ ] No syntax errors (run getDiagnostics)
- [ ] Test on mobile
- [ ] Validate schema with Google Rich Results Test

## 🔗 Quick Links

- **Full Guide**: `SEO-IMPLEMENTATION-GUIDE.md`
- **Content Guide**: `SEO-CONTENT-USAGE.md`
- **Completion Status**: `TASK-7-COMPLETION-SUMMARY.md`

## 💡 Pro Tips

1. **Front-load keywords**: Put important words at the start of titles
2. **Be specific**: "Calculateur Salaire Net Québec 2026" > "Salary Calculator"
3. **Answer immediately**: First sentence of description should answer user intent
4. **Use numbers**: "en 2 secondes", "5-6%", "jusqu'à 8 000$"
5. **Local focus**: Always include "Québec" or "Quebec"
6. **Year matters**: "2026" signals freshness to Google
7. **Natural language**: Write how people actually talk and search

## 🚨 Common Mistakes to Avoid

- ❌ Generic titles without location or year
- ❌ Descriptions over 160 characters (gets cut off)
- ❌ FAQ answers under 50 words (not helpful)
- ❌ Keyword stuffing (write naturally)
- ❌ Forgetting canonical URL
- ❌ Using unrealistic ratings (5.0 with 10,000 reviews)
- ❌ Not testing on mobile
- ❌ Copying content from other sites

## 📈 Expected Timeline

- **Week 1**: Google indexes new content
- **Week 2-4**: Rankings start to improve
- **Month 2-3**: Rich snippets may appear
- **Month 3-6**: Significant traffic increase
- **Month 6+**: Featured snippets, top positions

---

**Remember**: Quality over speed. Take time to write genuinely helpful content.
