# Open Graph Image Implementation Guide

## Overview
Dynamic OG images are now implemented for better social media sharing (Facebook, LinkedIn, Twitter, iMessage).

## Files Created

### 1. Homepage OG Image
- **File:** `app/opengraph-image.tsx`
- **Design:** Emerald/teal gradient with QC logo
- **Features:** Shows 19 tools, 100% Gratuit, Sécurisé badges

### 2. Tool-Specific OG Images
Created examples for:
- `app/salaire-net-quebec/opengraph-image.tsx` (Blue - Tax)
- `app/louer-ou-acheter/opengraph-image.tsx` (Green - Real Estate)
- `app/allocations-familiales/opengraph-image.tsx` (Purple - Family)
- `app/interets-composes/opengraph-image.tsx` (Indigo - Investment)

### 3. Reusable Template
- **File:** `app/_og-template.tsx`
- Copy this file to any tool folder and customize the variables

## How to Add OG Images to Other Tools

### Step 1: Copy the Template
```bash
cp app/_og-template.tsx app/your-tool-name/opengraph-image.tsx
```

### Step 2: Customize Variables
Open the file and update these constants:

```typescript
const TOOL_TITLE = 'Your Tool Name'
const TOOL_SUBTITLE = 'Short description'
const TOOL_CATEGORY = 'Category Name'
const TOOL_EMOJI = '🧮'
const GRADIENT_START = '#1e40af'
const GRADIENT_MIDDLE = '#3b82f6'
const GRADIENT_END = '#60a5fa'
```

## Color Schemes by Category

### 💰 Impôts & Revenus (Blue)
```typescript
GRADIENT_START = '#1e40af'
GRADIENT_MIDDLE = '#3b82f6'
GRADIENT_END = '#60a5fa'
```
**Emojis:** 💰, 📊, 🧮, 📄, 💵

### 🏠 Immobilier (Green)
```typescript
GRADIENT_START = '#047857'
GRADIENT_MIDDLE = '#10b981'
GRADIENT_END = '#34d399'
```
**Emojis:** 🏠, 🏡, 🏢, 🔑, 🏘️

### 👨‍👩‍👧 Famille & Quotidien (Purple)
```typescript
GRADIENT_START = '#7c3aed'
GRADIENT_MIDDLE = '#8b5cf6'
GRADIENT_END = '#a78bfa'
```
**Emojis:** 👨‍👩‍👧, 👶, 🍼, 💝, 🎓

### 🚗 Auto & Dettes (Orange)
```typescript
GRADIENT_START = '#ea580c'
GRADIENT_MIDDLE = '#f97316'
GRADIENT_END = '#fb923c'
```
**Emojis:** 🚗, 💳, 📉, 💸, ⚡

### 📈 Investissement & Retraite (Indigo)
```typescript
GRADIENT_START = '#4f46e5'
GRADIENT_MIDDLE = '#6366f1'
GRADIENT_END = '#818cf8'
```
**Emojis:** 📈, 💹, 🎯, 💎, 🚀

## Testing Your OG Images

### Local Testing
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/your-tool-name/opengraph-image`
3. You should see the PNG image directly

### Social Media Testing
Use these tools to preview how your links will appear:
- **Facebook:** https://developers.facebook.com/tools/debug/
- **LinkedIn:** https://www.linkedin.com/post-inspector/
- **Twitter:** https://cards-dev.twitter.com/validator

## Image Specifications
- **Dimensions:** 1200x630 pixels (optimal for all platforms)
- **Format:** PNG
- **Runtime:** Edge (fast generation)
- **File Size:** ~50-100KB (automatically optimized)

## How It Works

Next.js automatically:
1. Generates the image at build time
2. Serves it at `/your-route/opengraph-image`
3. Adds proper meta tags to your page:
   ```html
   <meta property="og:image" content="/your-route/opengraph-image" />
   <meta property="og:image:width" content="1200" />
   <meta property="og:image:height" content="630" />
   ```

## Best Practices

1. **Keep titles short:** Max 2 lines (64px font)
2. **Use clear emojis:** They show up well on all platforms
3. **Maintain brand consistency:** Use the same footer and style
4. **Test on mobile:** Most shares happen on mobile devices
5. **Update alt text:** Make it descriptive for accessibility

## Remaining Tools to Add

Copy the template to these folders:
- [ ] `app/calcul-hypotheque/opengraph-image.tsx`
- [ ] `app/taxe-de-bienvenue/opengraph-image.tsx`
- [ ] `app/augmentation-loyer-2026/opengraph-image.tsx`
- [ ] `app/declaration-simplifiee/opengraph-image.tsx`
- [ ] `app/assurance-emploi/opengraph-image.tsx`
- [ ] `app/epargne-retraite/opengraph-image.tsx`
- [ ] `app/dettes-credit/opengraph-image.tsx`
- [ ] `app/paie-vacances/opengraph-image.tsx`
- [ ] `app/taux-horaire/opengraph-image.tsx`
- [ ] `app/auto-electrique-vs-essence/opengraph-image.tsx`
- [ ] `app/pret-auto/opengraph-image.tsx`
- [ ] `app/pret-etudiant/opengraph-image.tsx`
- [ ] `app/frais-de-garde/opengraph-image.tsx`
- [ ] `app/capacite-emprunt/opengraph-image.tsx`
- [ ] `app/tps-tvq-quebec/opengraph-image.tsx`

## Expected Impact

- **CTR Increase:** 30-50% higher click-through rates on social media
- **Brand Recognition:** Consistent visual identity across all shares
- **Professional Appearance:** Builds trust and credibility
- **SEO Benefits:** Better engagement signals to search engines

## Troubleshooting

### Image not showing?
1. Clear your browser cache
2. Rebuild the project: `npm run build`
3. Check the image URL directly: `/your-route/opengraph-image`

### Wrong image on social media?
1. Social platforms cache images for 7-30 days
2. Use the debug tools above to force a refresh
3. Add a query parameter to bust cache: `?v=2`

### Image looks blurry?
1. Ensure you're using the exact dimensions (1200x630)
2. Use high-quality emojis (they're vector-based)
3. Avoid small text (minimum 20px font size)
