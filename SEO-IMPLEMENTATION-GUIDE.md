# SEO Implementation Guide - Calcul Impôt Québec

## 🎯 Objective
Dominate Google SERP for "Calcul impôt Québec" and specific queries like "Salaire net 50000 Québec" through programmatic SEO and structured data.

## ✅ Implementation Complete

### 1. **SalarySEOContent Component** (`components/SalarySEOContent.tsx`)

This is the core SEO engine that generates unique, contextual content for each salary page.

#### Features:
- **Dynamic Content Generation**: Adapts content based on salary bracket
  - Low income (<40k): Focus on tax credits, solidarity credit
  - Mid income (40k-90k): Focus on RRSP optimization, average deductions
  - High income (>90k): Focus on marginal rates, income splitting

- **Structured Data (JSON-LD)**: Three schema types injected per page
  - `SoftwareApplication`: Tells Google this is a tax calculator
  - `FAQPage`: Auto-generates 3 FAQs with calculated answers
  - `HowTo`: Step-by-step tax optimization guide

- **SEO-Rich Content Sections**:
  1. **Fiscal Analysis** - Personalized analysis with key metrics
  2. **Federal vs Provincial Breakdown** - Detailed tax distribution
  3. **Tax Optimization Strategies** - RRSP, CELI, deductions
  4. **Effective vs Marginal Rate** - Educational comparison
  5. **Budget Planning** - 50/30/20 rule with actual numbers
  6. **Salary Comparisons** - Internal linking to other salary pages

#### Keywords Injected:
- Taux marginal / Taux effectif
- Impôt provincial / Impôt fédéral
- Revenu disponible / Revenu net
- Cotisations sociales (RRQ, RQAP, AE)
- REER / CELI optimization
- Déductions fiscales
- Fractionnement de revenu

### 2. **Enhanced Metadata**

#### Main Landing Page (`app/salaire-net-quebec/page.tsx`)
- Updated title: "Calcul Impôt Québec 2026 | Salaire Net après Impôts - Gratuit"
- Enhanced description with primary keywords
- Expanded keyword list targeting "calcul impôt québec"

#### Dynamic Salary Pages
- Metadata helper created (`app/salaire-net-quebec/[salary]/metadata.ts`)
- Generates unique titles/descriptions per salary
- Example: "Salaire Net 50 000 $ au Québec 2026 | Calcul Impôt"
- Includes calculated net income in meta description

### 3. **Structured Data Strategy**

Each salary page now includes:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculateur Impôt Québec {salary}$",
      "applicationCategory": "FinanceApplication",
      "offers": { "price": "0" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "question": "Quel est le salaire net pour {salary}$ ?",
          "answer": "Calculated answer with exact numbers"
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "Comment réduire ses impôts avec {salary}$",
      "step": [...]
    }
  ]
}
```

### 4. **Content Density for Google**

Each salary page now has **2000+ words** of unique, keyword-rich content:
- H2: "Analyse fiscale complète pour un salaire de {salary}$"
- H2: "Répartition Fédéral vs Provincial"
- H2: "Comment payer moins d'impôt à ce niveau de salaire ?"
- H2: "Comprendre votre taux d'imposition : Effectif vs Marginal"
- H2: "Planification budgétaire avec {salary}$"
- H2: "Comparaison avec d'autres niveaux de salaire"

### 5. **Internal Linking Strategy**

- **Salary Comparison Grid**: Links to 8 other salary pages
- **Popular Salaries**: Quick links in sidebar
- **Breadcrumbs**: Proper hierarchy for crawlers
- **Related Tools**: Cross-linking to other calculators

## 🚀 SEO Benefits

### For Google:
1. **Rich Snippets**: FAQPage schema → FAQ boxes in SERP
2. **Knowledge Graph**: SoftwareApplication schema → App listing
3. **Featured Snippets**: HowTo schema → Step-by-step results
4. **Long-tail Keywords**: Each salary page targets specific queries
5. **Content Depth**: 2000+ words signals authority

### For Users:
1. **Comprehensive Information**: All tax questions answered on one page
2. **Actionable Advice**: Personalized optimization strategies
3. **Visual Learning**: Charts + text explanations
4. **Budget Planning**: Practical monthly breakdown
5. **Easy Navigation**: Internal links to explore other salaries

## 📊 Target Keywords Coverage

### Primary Keywords:
- ✅ Calcul impôt Québec
- ✅ Salaire net Québec
- ✅ Calculateur impôt Québec 2026
- ✅ Revenu net après impôt

### Long-tail Keywords (per salary page):
- ✅ Salaire net 50000 Québec
- ✅ Impôt sur 60000$ Québec
- ✅ Combien d'impôt pour 70000$
- ✅ Taux imposition 80000 Québec

### Semantic Keywords:
- ✅ Taux marginal / Taux effectif
- ✅ RRQ RQAP AE
- ✅ Déductions fiscales Québec
- ✅ REER CELI optimisation
- ✅ Impôt fédéral provincial

## 🔧 Technical Implementation

### File Structure:
```
components/
  └── SalarySEOContent.tsx          # Main SEO component

app/salaire-net-quebec/
  ├── page.tsx                       # Landing page (enhanced metadata)
  └── [salary]/
      ├── page.tsx                   # Salary detail (with SEO content)
      └── metadata.ts                # Dynamic metadata helper
```

### Integration:
```tsx
// In app/salaire-net-quebec/[salary]/page.tsx
import SalarySEOContent from '@/components/SalarySEOContent'

// After FAQ section:
<SalarySEOContent salary={salary} results={results} />
```

## 📈 Expected Results

### Short-term (1-2 weeks):
- Google indexes new structured data
- FAQ snippets appear in SERP
- Improved CTR from rich snippets

### Medium-term (1-2 months):
- Ranking improvements for long-tail keywords
- Featured snippets for "comment calculer impôt québec"
- Increased organic traffic from salary-specific queries

### Long-term (3-6 months):
- Top 3 positions for "calcul impôt québec"
- Dominate "salaire net [amount] québec" queries
- Authority site status for Quebec tax calculations

## 🎨 Content Differentiation

Each salary page is **truly unique** because:
1. All numbers are dynamically calculated
2. Advice changes based on income bracket
3. RRSP limits calculated per salary
4. Budget breakdown uses actual net income
5. Marginal rate explanations adapt to bracket
6. Comparison grid excludes current salary

## ✨ Next Steps (Optional Enhancements)

1. **Add more FAQs** based on search console queries
2. **Create comparison tables** (salary vs salary)
3. **Add regional variations** (Montreal vs Quebec City cost of living)
4. **Video content** embedded with VideoObject schema
5. **User testimonials** with Review schema
6. **Calculator widget** for embedding on other sites
7. **PDF download** with lead capture
8. **Email course** on tax optimization

## 🔍 Monitoring & Optimization

### Track These Metrics:
- Google Search Console: Impressions, clicks, CTR for target keywords
- Google Analytics: Organic traffic to salary pages
- SERP Features: FAQ boxes, featured snippets appearances
- Ranking positions: Track "calcul impôt québec" weekly
- Internal link clicks: Which salary comparisons are popular

### A/B Testing Ideas:
- Different H1 formats
- FAQ order and quantity
- Content section order
- CTA placement for affiliate cards
- Budget rule percentages (50/30/20 vs 60/20/20)

## 📝 Content Maintenance

### Annual Updates Required:
- Tax rates (federal & provincial)
- BPA amounts (basic personal amount)
- RRQ/RQAP/AE maximums
- RRSP contribution limits
- CELI annual limit

### Quarterly Reviews:
- Add new FAQs from user questions
- Update affiliate offers
- Refresh comparison salaries
- Add seasonal tax tips

---

**Implementation Date**: January 2026  
**Status**: ✅ Complete and Ready for Production  
**Estimated Impact**: 3-5x organic traffic within 6 months
