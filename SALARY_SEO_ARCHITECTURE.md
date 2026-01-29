            # Main landing page
    │   └── Purpose: Search interface, popular salaries
    │
    ├── SalaryLandingClient.tsx           # Client component
    │   └── Purpose: Input handling, redirect to dynamic route
    │
    ├── layout.tsx                        # Layout wrapper
    │   └── Purpose: Shared layout for all salary pages
    │
    ├── opengraph-image.tsx               # Main OG image
    │   └── Purpose: Social sharing image for main page
    │
    └── [salary]/                         # 🎯 DYNAMIC ROUTE (171 pages)
        │
        ├── page.tsx                      # Dynamic page component
        │   ├── generateStaticParams()    → Generates 171 paths
        │   ├── generateMetadata()        → Unique SEO per page
        │   └── Component                 → Renders calculator + content
        │
        ├── opengraph-image.tsx           # Dynamic OG image
        │   └── Purpose: Custom image per salary amount
        │
        └── metadata.ts                   # Helper functions
            └── Purpose: Metadata utilities, salary ranges

components/
└── TaxCalculator.tsx                     # Calculator component
    └── Props: initialSalary?: number     → Pre-fills calculator

app/
└── sitemap.ts                            # Sitemap generator
    └── Includes: All 171 salary pages
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD TIME (SSG)                            │
└─────────────────────────────────────────────────────────────────┘

1. generateStaticParams() runs
   ↓
   for (let i = 30000; i <= 200000; i += 1000) {
     salaries.push({ salary: i.toString() })
   }
   ↓
   Returns: [
     { salary: '30000' },
     { salary: '31000' },
     { salary: '32000' },
     ...
     { salary: '200000' }
   ]
   ↓
2. Next.js generates 171 static HTML pages
   ↓
   /salaire-net-quebec/30000/index.html
   /salaire-net-quebec/31000/index.html
   /salaire-net-quebec/32000/index.html
   ...
   /salaire-net-quebec/200000/index.html
   ↓
3. Each page includes:
   - Unique metadata (title, description, OG tags)
   - Pre-rendered HTML with calculator
   - Custom OG image
   - Structured data (JSON-LD)

┌─────────────────────────────────────────────────────────────────┐
│                      RUNTIME (User Visit)                        │
└─────────────────────────────────────────────────────────────────┘

1. User visits: /salaire-net-quebec/60000
   ↓
2. Next.js serves pre-rendered HTML (instant load)
   ↓
3. React hydrates the page
   ↓
4. TaxCalculator component mounts
   ↓
5. useEffect runs with initialSalary={60000}
   ↓
   setIncome('60000')
   setFrequency('annual')
   calculateTaxes(60000)
   setResults(calculatedResults)
   ↓
6. Results displayed instantly (no user action needed)
   ↓
7. User can:
   - View breakdown
   - Download PDF
   - Try different amounts
   - Navigate to related tools
```

## 🎨 Component Hierarchy

```
Page Component (/salaire-net-quebec/[salary]/page.tsx)
│
├── StructuredData
│   └── JSON-LD schema for SEO
│
├── Breadcrumb
│   └── Home → Salaire Net → 60000$
│
├── Hero Section
│   ├── Badge: "✨ Taux 2026 à jour"
│   ├── H1: "Salaire net sur un revenu de 60 000 $"
│   └── Intro paragraph
│
├── TaxCalculator (initialSalary={60000})
│   ├── Input (pre-filled)
│   ├── Frequency selector
│   ├── Calculate button
│   ├── Results display
│   │   ├── Net income
│   │   ├── Quick stats
│   │   ├── Donut chart
│   │   └── Breakdown accordion
│   └── PDF download button
│
├── ToolCrossLink
│   └── Link to mortgage calculator
│
├── SEOContent
│   ├── Title: "Est-ce que 60 000 $ est un bon salaire?"
│   ├── Intro paragraph
│   └── FAQs (6-7 questions)
│       ├── "Quel est le salaire net sur 60000?"
│       ├── "Combien d'impôts je paie?"
│       ├── "Comment maximiser mon revenu net?"
│       ├── "Puis-je acheter une maison?"
│       ├── "Quelle est ma tranche d'imposition?"
│       └── "Comment se compare au salaire moyen?"
│
├── RelatedTools
│   └── Links to other calculators
│
└── DataSource
    └── Citation: Revenu Québec
```

## 🔍 SEO Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    KEYWORD TARGETING                             │
└─────────────────────────────────────────────────────────────────┘

Each page targets multiple keyword variations:

Primary Keywords (171 pages × 1 = 171 keywords)
├── "salaire net 30000 quebec"
├── "salaire net 31000 quebec"
├── "salaire net 32000 quebec"
└── ...

Secondary Keywords (171 pages × 2 = 342 keywords)
├── "30000 net quebec"
├── "impot 30000 quebec"
└── ...

Long-tail Keywords (171 pages × 3+ = 500+ keywords)
├── "combien reste salaire 30000"
├── "30000 après impôts quebec"
├── "revenu net 30000 quebec"
└── ...

TOTAL: 1000+ keyword variations

┌─────────────────────────────────────────────────────────────────┐
│                    INTERNAL LINKING                              │
└─────────────────────────────────────────────────────────────────┘

Main Page (/salaire-net-quebec)
    ↓
    ├─→ Popular Salary: 40000
    ├─→ Popular Salary: 50000
    ├─→ Popular Salary: 60000
    ├─→ Popular Salary: 70000
    ├─→ Popular Salary: 80000
    ├─→ Popular Salary: 90000
    ├─→ Popular Salary: 100000
    └─→ Popular Salary: 120000

Each Dynamic Page (/salaire-net-quebec/60000)
    ↓
    ├─→ Breadcrumb: Back to main page
    ├─→ Related Tools: Mortgage calculator
    ├─→ Related Tools: Affordability calculator
    └─→ Related Tools: Tax form calculator

┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT STRATEGY                              │
└─────────────────────────────────────────────────────────────────┘

Salary Range Segmentation:

$30k - $45k (Entry-level)
├── Target: Recent grads, first jobs
├── Content Focus: Budget tips, RRSP basics
└── FAQs: "Is this enough to live?", "How to save?"

$45k - $70k (Intermediate)
├── Target: Mid-career professionals
├── Content Focus: Tax optimization, savings
└── FAQs: "Can I buy a house?", "RRSP strategies"

$70k - $100k (Senior)
├── Target: Experienced workers
├── Content Focus: Investment strategies, RRSP max
└── FAQs: "Tax planning", "Mortgage affordability"

$100k - $200k (Executive)
├── Target: High earners
├── Content Focus: Advanced tax, incorporation
└── FAQs: "Optimize taxes", "Investment vehicles"
```

## 📊 Performance Metrics

```
┌─────────────────────────────────────────────────────────────────┐
│                    BUILD METRICS                                 │
└─────────────────────────────────────────────────────────────────┘

Total Pages Generated: 208
├── Static Pages: 37
└── Dynamic Salary Pages: 171

Build Time: ~60 seconds
Bundle Size: 341 kB (per salary page)
First Load JS: 87.7 kB (shared)

┌─────────────────────────────────────────────────────────────────┐
│                    RUNTIME METRICS                               │
└─────────────────────────────────────────────────────────────────┘

Page Load Time: <1 second (pre-rendered)
Time to Interactive: <2 seconds
Calculator Response: Instant (pre-calculated)
Lighthouse Score: 95+ (Performance)

┌─────────────────────────────────────────────────────────────────┐
│                    SEO METRICS (Projected)                       │
└─────────────────────────────────────────────────────────────────┘

Indexed Pages: 171 (target: 90%+ within 30 days)
Monthly Impressions: 10,000 - 50,000
Click-Through Rate: 5% - 10%
Monthly Organic Visitors: 500 - 5,000
Average Position: Top 10 for 50+ keywords
```

## 🚀 Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PIPELINE                           │
└─────────────────────────────────────────────────────────────────┘

1. Code Changes
   ↓
2. npm run build
   ├── Generates 171 static pages
   ├── Creates sitemap.xml
   └── Optimizes assets
   ↓
3. Deploy to Vercel/Netlify
   ├── Uploads static files
   └── Configures CDN
   ↓
4. Submit Sitemap to Google
   └── https://qcfinance.ca/sitemap.xml
   ↓
5. Monitor Indexing
   ├── Google Search Console
   └── Coverage report
   ↓
6. Track Rankings
   ├── Target keywords
   └── Performance report
   ↓
7. Optimize
   ├── Update meta descriptions
   ├── Improve CTR
   └── Add internal links
```

## 🎯 Success Criteria

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEEK 1-2: LAUNCH                              │
└─────────────────────────────────────────────────────────────────┘
✓ Build succeeds without errors
✓ All 171 pages generated
✓ Sitemap submitted to Google
✓ Analytics tracking configured

┌─────────────────────────────────────────────────────────────────┐
│                    WEEK 3-4: INDEXING                            │
└─────────────────────────────────────────────────────────────────┘
□ 50%+ pages indexed
□ No crawl errors
□ First impressions in Search Console

┌─────────────────────────────────────────────────────────────────┐
│                    MONTH 2-3: RANKING                            │
└─────────────────────────────────────────────────────────────────┘
□ 90%+ pages indexed
□ Top 20 rankings for 25+ keywords
□ 100+ monthly organic visitors

┌─────────────────────────────────────────────────────────────────┐
│                    MONTH 4-6: OPTIMIZATION                       │
└─────────────────────────────────────────────────────────────────┘
□ Top 10 rankings for 50+ keywords
□ 500+ monthly organic visitors
□ 5%+ CTR from search results
□ 20%+ increase in total organic traffic
```

## 🔧 Maintenance

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONTHLY TASKS                                 │
└─────────────────────────────────────────────────────────────────┘
□ Review Search Console for errors
□ Check indexing status
□ Monitor rankings for top keywords
□ Update FAQ content if needed
□ Add internal links from new content

┌─────────────────────────────────────────────────────────────────┐
│                    QUARTERLY TASKS                               │
└─────────────────────────────────────────────────────────────────┘
□ Update tax rates (if changed)
□ Refresh SEO content for freshness
□ Analyze top-performing pages
□ Optimize low-performing pages
□ Expand to new salary ranges if needed

┌─────────────────────────────────────────────────────────────────┐
│                    YEARLY TASKS                                  │
└─────────────────────────────────────────────────────────────────┘
□ Update for new tax year (2027, 2028, etc.)
□ Rebuild all pages with new rates
□ Update metadata with new year
□ Comprehensive SEO audit
□ Competitor analysis
```

---

**Architecture Version**: 1.0  
**Last Updated**: January 29, 2026  
**Status**: ✅ Production Ready  
**Pages**: 171 Static Pages  
**Build Time**: ~60 seconds  
**Performance**: Optimized for SEO & Speed
