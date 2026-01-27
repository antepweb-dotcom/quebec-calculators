# SEO Content Component Usage Guide

## Overview
The `SEOContent` component is designed to add rich, text-heavy content to tool pages for better Google rankings. It includes FAQ accordions with semantic HTML and automatic Schema.org markup.

## Component Features

### ✅ SEO Benefits
- **Rich Content:** Text-heavy sections that Google loves
- **FAQ Schema:** Automatic Schema.org FAQPage markup for rich snippets
- **Semantic HTML:** Uses native `<details>` and `<summary>` tags
- **Keyword Optimization:** Space for naturally including target keywords
- **User Engagement:** Collapsible FAQs keep page clean while providing depth

### ✅ Design Features
- Clean, professional styling with Tailwind
- Responsive design (mobile-first)
- Smooth hover effects on FAQ items
- Animated chevron icons
- Prose typography for readability
- Accessible (keyboard navigation works)

## Component Props

```typescript
interface SEOContentProps {
  title: string                    // Main H2 title
  intro?: string                   // Optional intro paragraph
  faqs: FAQItem[]                  // Array of FAQ items
  additionalContent?: React.ReactNode  // Optional custom content
}

interface FAQItem {
  question: string                 // FAQ question
  answer: string                   // FAQ answer (supports \n for paragraphs)
}
```

## Basic Usage

### 1. Import the Component

```typescript
import SEOContent from '@/components/SEOContent'
```

### 2. Add to Your Page (Before Footer)

```typescript
<SEOContent
  title="Your SEO Title Here"
  intro="Optional introduction paragraph that sets context..."
  faqs={[
    {
      question: "First question?",
      answer: "Detailed answer here..."
    },
    {
      question: "Second question?",
      answer: "Another detailed answer..."
    }
  ]}
/>
```

## Example Implementation

### Allocations Familiales (Already Implemented)

```typescript
<SEOContent
  title="Comprendre vos allocations en 2026"
  intro="Les allocations familiales au Québec combinent deux programmes..."
  faqs={[
    {
      question: "Quand les versements sont-ils effectués?",
      answer: "Les paiements de l'ACE sont versés le 20 de chaque mois..."
    },
    {
      question: "Est-ce que c'est imposable?",
      answer: "Non, les allocations familiales ne sont pas imposables..."
    }
  ]}
/>
```

## Content Writing Best Practices

### Title Optimization
- **Format:** "Comprendre [Topic] en 2026"
- **Include:** Year, location (Québec), main keyword
- **Length:** 40-60 characters
- **Examples:**
  - ✅ "Comprendre vos allocations en 2026"
  - ✅ "Guide complet de l'hypothèque au Québec"
  - ✅ "Tout savoir sur le salaire net en 2026"

### Intro Paragraph
- **Length:** 2-3 sentences (150-200 words)
- **Purpose:** Set context, include keywords naturally
- **Structure:** What + Why + How
- **Example:**
  ```
  Les allocations familiales au Québec combinent deux programmes 
  gouvernementaux distincts : l'ACE et le Soutien aux enfants. 
  Ces prestations aident les familles à assumer les coûts liés 
  à l'éducation et aux soins des enfants.
  ```

### FAQ Questions
- **Format:** Natural questions users actually ask
- **Start with:** "Comment", "Quand", "Est-ce que", "Pourquoi"
- **Length:** 5-10 words
- **Examples:**
  - ✅ "Quand les versements sont-ils effectués?"
  - ✅ "Est-ce que c'est imposable?"
  - ✅ "Comment faire une demande?"
  - ✅ "Que se passe-t-il en cas de garde partagée?"

### FAQ Answers
- **Length:** 100-200 words per answer
- **Structure:** Direct answer first, then details
- **Include:** Specific numbers, dates, examples
- **Tone:** Helpful, clear, authoritative
- **Format:** Use `\n` for paragraph breaks

## Tool-Specific Content Ideas

### Salaire Net Québec
```typescript
title: "Comprendre votre salaire net au Québec"
faqs: [
  "Comment est calculé mon salaire net?",
  "Quelle est la différence entre brut et net?",
  "Quelles sont les déductions obligatoires?",
  "Comment réduire mes impôts légalement?",
  "Qu'est-ce que le taux d'imposition effectif?"
]
```

### Calculateur Hypothèque
```typescript
title: "Guide de l'hypothèque au Québec 2026"
faqs: [
  "Quel est le taux hypothécaire moyen en 2026?",
  "Combien de mise de fonds dois-je avoir?",
  "Qu'est-ce que le test de résistance?",
  "Quelle est la différence entre fixe et variable?",
  "Comment obtenir le meilleur taux?"
]
```

### Louer ou Acheter
```typescript
title: "Louer ou acheter : faire le bon choix"
faqs: [
  "Quand est-il préférable d'acheter?",
  "Combien coûte vraiment l'achat d'une maison?",
  "Quels sont les avantages de la location?",
  "Comment calculer le coût réel de l'achat?",
  "Qu'est-ce que la taxe de bienvenue?"
]
```

### Auto Électrique vs Essence
```typescript
title: "Passer à l'électrique au Québec en 2026"
faqs: [
  "Combien puis-je économiser avec un VÉ?",
  "Quelles sont les subventions disponibles?",
  "Quelle est l'autonomie moyenne?",
  "Comment recharger en hiver?",
  "Les VÉ sont-ils vraiment écologiques?"
]
```

### Intérêts Composés
```typescript
title: "Maîtriser les intérêts composés"
faqs: [
  "Qu'est-ce que les intérêts composés?",
  "Comment maximiser mes rendements?",
  "Quel est un bon taux de rendement?",
  "CELI ou REER : lequel choisir?",
  "Combien devrais-je investir par mois?"
]
```

## Advanced Usage

### With Additional Custom Content

```typescript
<SEOContent
  title="Your Title"
  intro="Introduction..."
  additionalContent={
    <>
      <h3>Custom Section Title</h3>
      <p>Custom paragraph content...</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </>
  }
  faqs={[...]}
/>
```

### Multi-Paragraph Answers

Use `\n` to create paragraph breaks:

```typescript
{
  question: "Complex question?",
  answer: "First paragraph with initial answer.\n\nSecond paragraph with more details.\n\nThird paragraph with examples or additional context."
}
```

## SEO Impact

### Schema.org Markup
The component automatically generates FAQPage schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

### Expected Benefits
- **Rich Snippets:** FAQs may appear in Google search results
- **Featured Snippets:** Answers may be featured at top of search
- **Increased CTR:** Rich results get more clicks
- **Better Rankings:** More content = better topical authority
- **User Engagement:** Longer time on page, lower bounce rate

## Implementation Checklist

For each tool page:

- [ ] Import `SEOContent` component
- [ ] Write compelling title (include year and location)
- [ ] Write 150-200 word intro paragraph
- [ ] Create 5-8 FAQ items
- [ ] Each answer should be 100-200 words
- [ ] Include specific numbers, dates, examples
- [ ] Use natural language (how users actually search)
- [ ] Place before footer, after main content
- [ ] Test on mobile and desktop
- [ ] Verify Schema.org markup with Google Rich Results Test

## Testing Your Implementation

### 1. Visual Check
- Open page in browser
- Verify styling looks good
- Test FAQ accordion (click to expand/collapse)
- Check mobile responsiveness

### 2. Schema Validation
- URL: https://search.google.com/test/rich-results
- Paste your page URL
- Verify FAQPage schema is detected
- Check for errors or warnings

### 3. Accessibility
- Tab through FAQs with keyboard
- Verify screen reader compatibility
- Check color contrast

## Maintenance

### Update Frequency
- **Annually:** Update year references (2026 → 2027)
- **Quarterly:** Review and update answers with new info
- **Monthly:** Add new FAQs based on user questions
- **As Needed:** Fix typos, improve clarity

### Content Refresh
- Monitor Google Search Console for questions
- Add FAQs for queries that bring traffic
- Update answers when laws/rates change
- A/B test different question phrasings

## Pro Tips

1. **Use Real Questions:** Check "People Also Ask" in Google
2. **Be Specific:** Include exact numbers, dates, amounts
3. **Stay Current:** Update for 2026 rates and rules
4. **Local Focus:** Emphasize Quebec-specific information
5. **Link Internally:** Reference other calculators in answers
6. **Mobile First:** Most users are on mobile
7. **Scan-Friendly:** Use short paragraphs, bullet points
8. **Answer Directly:** Don't make users hunt for the answer

## Common Mistakes to Avoid

❌ **Too Short:** Answers under 50 words don't help SEO
❌ **Too Generic:** "It depends" isn't helpful
❌ **No Numbers:** Be specific with amounts and dates
❌ **Keyword Stuffing:** Write naturally for humans
❌ **Outdated Info:** Always use current year and rates
❌ **No Structure:** Use paragraphs, don't wall-of-text
❌ **Ignoring Mobile:** Test on small screens

## Success Metrics

Track these in Google Analytics:
- Time on page (should increase)
- Bounce rate (should decrease)
- Scroll depth (users reading to bottom)
- FAQ click rate (engagement)

Track these in Google Search Console:
- Impressions (should increase)
- CTR (should increase with rich snippets)
- Average position (should improve)
- Featured snippet appearances

---

**Next Steps:**
1. Add SEOContent to all 19 tool pages
2. Write unique, valuable content for each
3. Submit updated sitemap to Google
4. Monitor performance in Search Console
5. Iterate based on user questions and search data
