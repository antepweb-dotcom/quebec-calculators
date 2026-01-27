# Affiliate Card Component Guide

## Overview
The `AffiliateCard` component is a high-conversion recommendation card designed to look like a helpful tip rather than a spammy banner. It's perfect for monetizing calculator results with affiliate offers.

## Component Location
`components/AffiliateCard.tsx`

## Features
✅ **3 Theme Options**: Blue, Green, Dark  
✅ **Responsive Design**: Mobile-first with flex layout  
✅ **Partner Badge**: Transparent "Partenaire" badge for trust  
✅ **High-Contrast CTA**: Yellow/Green/White buttons with arrow icon  
✅ **Optional Logo**: Support for partner logos  
✅ **Gradient Background**: Professional gradient styling  
✅ **Hover Effects**: Scale animation on button hover  

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ | Main headline (e.g., "Ouvrez un compte CELI") |
| `description` | string | ✅ | Supporting text explaining the offer |
| `buttonText` | string | ✅ | CTA button text (e.g., "Profiter de l'offre") |
| `link` | string | ✅ | Affiliate URL (opens in new tab) |
| `image` | string | ❌ | Optional logo/icon URL |
| `theme` | 'blue' \| 'green' \| 'dark' | ❌ | Color theme (default: 'dark') |

## Theme Styles

### Dark Theme (Default)
- **Gradient**: Slate-800 → Slate-900
- **Button**: Bright Green (#10B981)
- **Best for**: General financial products, CELI, savings

### Blue Theme
- **Gradient**: Blue-600 → Blue-800
- **Button**: Yellow (#FBBF24)
- **Best for**: REER, retirement, investment products

### Green Theme
- **Gradient**: Emerald-600 → Emerald-800
- **Button**: White
- **Best for**: Savings accounts, eco-friendly products

## Usage Example

```tsx
import AffiliateCard from '@/components/AffiliateCard';

// In your page component
<AffiliateCard
  title="Ouvrez un compte CELI avec Wealthsimple"
  description="Obtenez 25$ de bonus en vous inscrivant et commencez à investir sans frais de commission."
  buttonText="Profiter de l'offre"
  link="https://wealthsimple.com/fr-ca"
  theme="dark"
/>
```

## Integration in Salary Calculator

The card is placed **immediately after the tax breakdown section** and **before the visual chart** in:
- `app/salaire-net-quebec/[salary]/page.tsx`

This position ensures:
1. User has seen their results (high engagement)
2. Card appears above the fold on most screens
3. Natural flow from "here's your net salary" → "here's how to grow it"

## Best Practices

### 1. Contextual Relevance
Match offers to calculator context:
- **Salary Calculator** → CELI, REER, savings accounts
- **Mortgage Calculator** → Mortgage brokers, insurance
- **Retirement Calculator** → Investment platforms, REER

### 2. Copy Guidelines
- **Title**: Action-oriented, benefit-focused (15-50 chars)
- **Description**: Specific value prop with numbers (50-150 chars)
- **Button**: Clear action verb (2-4 words)

### 3. A/B Testing Ideas
- Test different themes
- Vary button text ("Profiter" vs "Commencer" vs "Découvrir")
- Try with/without logo
- Test placement (after results vs after chart)

### 4. SEO & Compliance
- Always use `rel="noopener noreferrer sponsored"` on links
- Disclose partnership with "Partenaire" badge
- Ensure mobile responsiveness
- Test loading performance

## Design Specifications

### Desktop Layout
```
┌─────────────────────────────────────────────────────┐
│ ✨ Partenaire                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ [Logo]                              [Button]    │ │
│ │ Title (Bold, Large)                 with Arrow  │ │
│ │ Description text...                             │ │
│ └─────────────────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────── │
└─────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌───────────────────────┐
│ ✨ Partenaire         │
│ ┌───────────────────┐ │
│ │ [Logo]            │ │
│ │ Title             │ │
│ │ Description...    │ │
│ │                   │ │
│ │ [Full Width BTN]  │ │
│ └───────────────────┘ │
│ ───────────────────── │
└───────────────────────┘
```

## Performance Considerations

- Component is lightweight (~2KB)
- Uses Tailwind classes (no additional CSS)
- Lucide icon (ArrowRight) is tree-shakeable
- No external dependencies beyond React

## Future Enhancements

Potential improvements:
- [ ] Add click tracking/analytics
- [ ] Support for multiple CTAs
- [ ] Dismissible option
- [ ] Animation on scroll into view
- [ ] Dynamic offer rotation
- [ ] Personalization based on salary range

## Support

For questions or issues, refer to:
- `components/AffiliateCard.example.tsx` - More usage examples
- Tailwind docs for styling customization
- Lucide React for icon options
