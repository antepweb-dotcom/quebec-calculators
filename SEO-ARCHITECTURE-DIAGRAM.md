# SEO Implementation Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER VISITS PAGE                         │
│              /salaire-net-quebec/50000                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    page.tsx (Client Component)                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. Parse salary from URL params                          │  │
│  │  2. Calculate taxes using taxLogic.ts                     │  │
│  │  3. Render calculator UI                                  │  │
│  │  4. Render FAQ section                                    │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              SalarySEOContent Component (NEW)                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Receives: salary (number), results (TaxCalculationResult)│  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  STEP 1: Determine Income Bracket                         │  │
│  │  ├─ isLowIncome = salary < 40000                          │  │
│  │  ├─ isMidIncome = salary 40000-90000                      │  │
│  │  └─ isHighIncome = salary > 90000                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  STEP 2: Generate Contextual Analysis                     │  │
│  │  ├─ Low: "Focus on tax credits, solidarity credit"        │  │
│  │  ├─ Mid: "Focus on RRSP optimization"                     │  │
│  │  └─ High: "Focus on marginal rates, income splitting"     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  STEP 3: Generate Structured Data (JSON-LD)               │  │
│  │  ├─ SoftwareApplication Schema                            │  │
│  │  ├─ FAQPage Schema (3 questions with calculated answers)  │  │
│  │  └─ HowTo Schema (tax optimization steps)                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  STEP 4: Render SEO Content Sections                      │  │
│  │  ├─ Fiscal Analysis (personalized)                        │  │
│  │  ├─ Federal vs Provincial Breakdown                       │  │
│  │  ├─ Tax Optimization Strategies                           │  │
│  │  ├─ Effective vs Marginal Rate Explanation                │  │
│  │  ├─ Budget Planning (50/30/20 rule)                       │  │
│  │  └─ Salary Comparison Links                               │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RENDERED HTML OUTPUT                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  <script type="application/ld+json">                      │  │
│  │    { "@context": "https://schema.org", ... }              │  │
│  │  </script>                                                 │  │
│  │                                                            │  │
│  │  <article>                                                 │  │
│  │    <h2>Analyse fiscale pour 50 000 $</h2>                 │  │
│  │    <p>Avec un revenu de 50 000 $, vous...</p>             │  │
│  │    ... 2000+ words of unique content ...                  │  │
│  │  </article>                                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GOOGLE CRAWLS PAGE                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. Reads HTML content (2000+ words)                      │  │
│  │  2. Parses JSON-LD structured data                        │  │
│  │  3. Validates schemas (SoftwareApp, FAQ, HowTo)           │  │
│  │  4. Indexes keywords and content                          │  │
│  │  5. Generates rich snippets                               │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE SEARCH RESULTS                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Salaire Net 50 000 $ au Québec 2026                      │  │
│  │  qcfinance.ca › salaire-net-quebec › 50000                │  │
│  │                                                            │  │
│  │  Net: 38 450 $/an (3 204 $/mois) | Taux: 23.1%            │  │
│  │                                                            │  │
│  │  ▼ Quel est le salaire net pour 50 000 $ ?                │  │
│  │  ▼ Combien d'impôt je paie ?                              │  │
│  │  ▼ Comment réduire mes impôts ?                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
URL Param (salary)
    ↓
taxLogic.ts (calculateTaxes)
    ↓
TaxCalculationResult {
    grossIncome: 50000
    netIncome: 38450
    federalTax: 5175
    provincialTax: 4875
    qpp: 3200
    qpip: 247
    ei: 635
    totalDeductions: 11550
}
    ↓
SalarySEOContent Component
    ↓
Dynamic Content Generation
    ├─ Income bracket analysis
    ├─ Personalized advice
    ├─ Calculated RRSP limits
    ├─ Budget breakdown
    └─ Structured data
    ↓
HTML + JSON-LD
    ↓
Google Crawler
    ↓
Rich Snippets in SERP
```

## 📊 Content Generation Logic

```
IF salary < 40000:
    bracket = "faible à modéré"
    focus = "crédit d'impôt solidarité, crédit TPS/TVQ"
    advice = "Vous bénéficiez de plusieurs crédits remboursables..."
    marginalRate = "~28%"

ELSE IF salary 40000-90000:
    bracket = "moyenne"
    focus = "cotisations RRQ, RQAP, optimisation REER"
    advice = "Chaque dollar cotisé à un REER économise 37%..."
    marginalRate = "~37%"

ELSE IF salary > 90000:
    bracket = "élevée"
    focus = "taux marginal élevé, fractionnement de revenu"
    advice = "Votre taux marginal peut atteindre 48-53%..."
    marginalRate = "48-53%"
```

## 🎯 SEO Keywords Injection Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT SECTION                             │
│                           ↓                                      │
│                    KEYWORDS INJECTED                             │
└─────────────────────────────────────────────────────────────────┘

Fiscal Analysis Section:
├─ "salaire net [amount] québec"
├─ "revenu net après impôts"
├─ "taux effectif"
└─ "tranche d'imposition"

Federal vs Provincial Section:
├─ "impôt fédéral"
├─ "impôt provincial québec"
├─ "répartition fiscale"
└─ "cotisations sociales RRQ RQAP AE"

Tax Optimization Section:
├─ "réduire impôts québec"
├─ "REER optimisation"
├─ "CELI maximiser"
├─ "déductions fiscales"
└─ "fractionnement de revenu"

Rate Explanation Section:
├─ "taux marginal"
├─ "taux effectif"
├─ "différence taux imposition"
└─ "calculer taux réel"

Budget Planning Section:
├─ "budget mensuel [amount]"
├─ "règle 50/30/20"
├─ "planification financière"
└─ "revenu disponible"
```

## 🔗 Internal Linking Strategy

```
Current Page: /salaire-net-quebec/50000
                    ↓
        Generates Links To:
                    ↓
    ┌───────────────┴───────────────┐
    │                               │
    ▼                               ▼
/40000  /60000  /70000  /80000  /90000  /100000  /120000  /150000
    │       │       │       │       │        │        │        │
    └───────┴───────┴───────┴───────┴────────┴────────┴────────┘
                            ↓
                    Better Crawlability
                            ↓
                    Higher PageRank Distribution
                            ↓
                    All Pages Rank Better
```

## 📱 Component Hierarchy

```
app/salaire-net-quebec/[salary]/page.tsx
│
├─ Breadcrumb
├─ Header
├─ Calculator Input (Left Column)
│   ├─ Salary Slider
│   ├─ Input Field
│   └─ Popular Salaries
│
├─ Results Display (Right Column)
│   ├─ Net Income Card
│   ├─ Salary Chart
│   └─ Breakdown Details
│
├─ Educational Content
│   ├─ How It Works
│   ├─ Optimization Tips
│   └─ FAQ Accordion
│
└─ SalarySEOContent (NEW)
    ├─ <Script> JSON-LD Structured Data
    │   ├─ SoftwareApplication
    │   ├─ FAQPage
    │   └─ HowTo
    │
    └─ <article> SEO Content
        ├─ Fiscal Analysis
        ├─ Federal vs Provincial
        ├─ Tax Optimization
        ├─ Rate Explanation
        ├─ Budget Planning
        └─ Salary Comparisons
```

## 🎨 Styling Architecture

```
SalarySEOContent Component
│
├─ Gradient Backgrounds
│   ├─ from-blue-50 to-indigo-50 (Analysis)
│   ├─ from-red-50 (Federal Tax)
│   ├─ from-orange-50 (Provincial Tax)
│   └─ from-emerald-50 (Budget)
│
├─ Card Components
│   ├─ rounded-xl (Consistent radius)
│   ├─ p-6 (Consistent padding)
│   └─ border border-[color]-200
│
├─ Typography
│   ├─ text-3xl font-bold (H2)
│   ├─ text-xl font-bold (H3)
│   └─ text-lg text-gray-700 (Body)
│
└─ Responsive Grid
    ├─ grid md:grid-cols-2 (2 columns on desktop)
    └─ space-y-6 (Vertical spacing on mobile)
```

## 🔍 SEO Signal Flow

```
Page Content (2000+ words)
    ↓
Keyword Density (Natural, 2-3%)
    ↓
Structured Data (3 schemas)
    ↓
Internal Links (8 per page)
    ↓
Mobile Responsive
    ↓
Fast Load Time
    ↓
User Engagement (Time on page)
    ↓
Low Bounce Rate
    ↓
Google Ranking Algorithm
    ↓
Higher SERP Position
    ↓
More Impressions
    ↓
Rich Snippets (Higher CTR)
    ↓
More Clicks
    ↓
More User Signals
    ↓
Even Higher Rankings
    ↓
Virtuous Cycle ♻️
```

## 📈 Performance Optimization

```
Component Loading Strategy:
│
├─ Above Fold (Immediate)
│   ├─ Calculator
│   ├─ Results
│   └─ Chart
│
└─ Below Fold (Lazy)
    ├─ FAQ Section
    └─ SalarySEOContent
        ├─ Renders after user scrolls
        ├─ No impact on initial load
        └─ SEO content still crawled by Google
```

## 🛠️ Maintenance Flow

```
Annual Tax Rate Update (January)
    ↓
Update utils/taxConstants.ts
    ↓
Rebuild Application
    ↓
All Salary Pages Auto-Update
    ↓
SalarySEOContent Recalculates
    ↓
New Numbers in Content
    ↓
New Numbers in Structured Data
    ↓
Google Re-crawls
    ↓
Updated Rich Snippets
    ↓
Always Current ✅
```

## 🎯 Success Metrics Flow

```
Deploy → Week 1 → Month 1 → Month 3 → Month 6
   │        │         │         │         │
   │        │         │         │         └─ Top 3 Rankings
   │        │         │         └─ Featured Snippets
   │        │         └─ Rich Snippets Appearing
   │        └─ Pages Indexed
   └─ Code Deployed

Parallel Metrics:
├─ Impressions: 📈 Increasing
├─ CTR: 📈 Improving (3% → 15%)
├─ Traffic: 📈 Growing (500 → 8000)
└─ Rankings: 📈 Climbing (#15 → #1-3)
```

---

## 🎓 Key Architectural Decisions

### 1. **Client Component Choice**
- Salary pages are client components (interactive calculator)
- SEO content component also client-side
- Structured data injected via Script component
- Google crawls client-rendered content fine (2024+)

### 2. **Dynamic Content Generation**
- All content generated at runtime
- No static pre-rendering needed
- Truly unique per salary amount
- Scales to infinite salary values

### 3. **Structured Data Strategy**
- Three complementary schemas
- SoftwareApplication: App listing
- FAQPage: Rich snippets
- HowTo: Featured snippets
- Maximum SERP feature coverage

### 4. **Internal Linking Pattern**
- Each page links to 8 others
- Creates strong site graph
- Distributes PageRank
- Improves crawlability

### 5. **Content Positioning**
- SEO content below fold
- Doesn't interfere with UX
- Still fully crawled by Google
- Lazy loads for performance

---

**Architecture Status**: ✅ Optimized for SEO & Performance  
**Scalability**: ✅ Handles unlimited salary values  
**Maintainability**: ✅ Single source of truth (taxConstants.ts)
