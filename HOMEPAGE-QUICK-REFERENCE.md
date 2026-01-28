# Homepage Quick Reference Card

## 🎨 Design System at a Glance

### Colors
```css
/* Hero Gradient */
from-emerald-600 via-teal-600 to-cyan-700

/* Hero Cards */
Salaire Net: from-blue-600 via-indigo-600 to-indigo-700
Hypothèque: from-emerald-600 via-teal-600 to-teal-700

/* Badges */
Popular: from-yellow-400 to-orange-400
New: from-orange-500 to-pink-500

/* Trust Icons */
Emerald-100/600, Teal-100/600, Cyan-100/600
```

### Typography
```css
/* Headings */
H1: text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter
H2: text-4xl md:text-5xl font-extrabold tracking-tight
H3: text-3xl md:text-4xl font-extrabold tracking-tight
H4 (Hero): text-3xl md:text-4xl font-extrabold tracking-tight
H4 (Standard): text-xl font-bold

/* Body */
Hero: text-xl md:text-2xl font-medium
Section: text-xl font-medium
Card: text-lg
Small: text-sm
```

### Spacing
```css
/* Sections */
Hero: py-24 lg:py-32
Standard: py-24
Trust Bar: py-8

/* Gaps */
Hero: gap-16
Trust: gap-10 md:gap-16
Tools: gap-6
Categories: mb-24
```

### Sizes
```css
/* Icons */
Hero Card: w-20 h-20 (icon: w-11 h-11)
Standard: w-12 h-12 (icon: w-7 h-7)
Trust: w-12 h-12 (icon: w-6 h-6)
Features: w-20 h-20 (icon: w-10 h-10)

/* Steps */
How It Works: w-24 h-24 (number: text-4xl)
```

## 🎯 Key Components

### Hero Section
- Split layout (text + image)
- 2 CTA buttons
- Floating stats cards
- Gradient orbs
- Dot pattern background

### Trust Bar
- 3 trust signals
- Card-based layout
- Hover animations

### How It Works
- 3 steps
- Connecting lines
- Hover effects

### Bento Grid
- 2 hero cards (2x2)
- Standard cards (1x1)
- 5 categories

### Trust & Features
- 3 feature cards
- Gradient backgrounds
- Hover animations

## 🔧 Quick Edits

### Change Hero Image
```tsx
// Line ~80 in app/page.tsx
<img 
  src="YOUR_IMAGE_URL"
  alt="Your Alt Text"
  className="w-full h-full object-cover"
/>
```

### Update Trust Signals
```tsx
// Lines ~105-135 in app/page.tsx
<div className="flex items-center gap-3 group">
  <div className="w-12 h-12 bg-emerald-100 rounded-xl...">
    <YourIcon className="w-6 h-6 text-emerald-600" />
  </div>
  <div>
    <div className="font-bold text-gray-900">Your Title</div>
    <div className="text-xs text-gray-600">Your Subtitle</div>
  </div>
</div>
```

### Add New Tool Card
```tsx
<Link href="/your-tool" className="group">
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-YOUR-COLOR h-full">
    <div className="w-12 h-12 bg-YOUR-COLOR-100 text-YOUR-COLOR-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <YourIcon className="w-7 h-7" />
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-YOUR-COLOR transition-colors">
      Your Tool Name
    </h4>
    <p className="text-sm text-gray-600 mb-4">
      Your description
    </p>
    <div className="flex items-center text-YOUR-COLOR font-semibold text-sm">
      <span>Calculer</span>
      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
</Link>
```

### Make Tool a Hero Card
```tsx
// Change className to:
className="group md:col-span-2 md:row-span-2"

// Use hero card styling:
<div className="relative bg-gradient-to-br from-YOUR-COLOR-600 via-YOUR-COLOR-600 to-YOUR-COLOR-700 rounded-3xl shadow-2xl p-10...">
  {/* Add animated background orbs */}
  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-700" />
  
  {/* Add popular badge */}
  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-extrabold px-4 py-2 rounded-full shadow-xl animate-pulse">
    ⭐ POPULAIRE
  </span>
</div>
```

## 📱 Responsive Classes

### Show/Hide Elements
```css
/* Hide on mobile, show on desktop */
hidden lg:block

/* Show on mobile, hide on desktop */
block lg:hidden

/* Different layouts */
grid md:grid-cols-2 lg:grid-cols-4
```

### Typography Scaling
```css
text-xl md:text-2xl lg:text-3xl
text-5xl md:text-6xl lg:text-7xl
```

### Spacing Scaling
```css
py-12 md:py-16 lg:py-24
gap-4 md:gap-6 lg:gap-8
```

## 🎭 Animation Classes

### Hover Effects
```css
/* Cards */
hover:-translate-y-2
hover:-translate-y-3
hover:scale-[1.02]
hover:scale-105

/* Icons */
hover:scale-110
hover:rotate-6

/* Arrows */
group-hover:translate-x-2
group-hover:translate-x-3

/* Shadows */
hover:shadow-2xl
hover:shadow-3xl
```

### Transitions
```css
transition-all duration-300
transition-all duration-500
transition-transform duration-700
```

## 🐛 Common Fixes

### Image Not Loading
1. Check URL is valid
2. Verify CORS settings
3. Try different image source

### Animation Laggy
1. Reduce animation complexity
2. Use `will-change: transform`
3. Test on different devices

### Layout Broken
1. Check grid classes
2. Verify responsive breakpoints
3. Clear Next.js cache

### Fonts Not Applied
1. Check layout.tsx has Plus Jakarta Sans
2. Verify Tailwind config
3. Rebuild project

## 📊 File Structure

```
app/
├── page.tsx (Main homepage - 700+ lines)
├── layout.tsx (Font config)
└── globals.css (Base styles)

tailwind.config.ts (Font family config)

Documentation/
├── HOMEPAGE-REFACTOR-COMPLETE.md
├── HOMEPAGE-VISUAL-GUIDE.md
├── HOMEPAGE-BEFORE-AFTER.md
├── HOMEPAGE-IMPLEMENTATION-CHECKLIST.md
└── HOMEPAGE-QUICK-REFERENCE.md (this file)
```

## 🚀 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Clear cache
rm -rf .next

# Check for errors
npm run lint
```

## 📞 Need Help?

1. Check documentation files
2. Review implementation checklist
3. Test in development mode
4. Check browser console
5. Verify all dependencies

---

**Quick Tip:** Use browser DevTools to inspect elements and see exact classes applied!
