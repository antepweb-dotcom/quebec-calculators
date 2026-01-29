# Analytics Event Spam Fix - Implementation Guide

## Problem
Google Analytics is receiving 1.3k events for just 3 users because `sendGAEvent` (or similar tracking) fires on **every keystroke** in calculator input fields.

## Solution
Implement **debounced analytics tracking** that waits 800ms after user stops typing before firing events.

---

## ✅ Implementation Complete

### 1. Created Custom Hook: `hooks/useDebouncedAnalytics.ts`

This hook provides three tracking functions:

#### `useDebouncedAnalytics(delay)`
- Generic debounced event tracking
- Default delay: 800ms
- Use for any event that needs debouncing

#### `useCalculatorTracking(calculatorName)`
- Specialized for calculator input changes
- Automatically debounces with 800ms delay
- Tracks calculator name + custom params

#### `useButtonTracking(calculatorName)`
- For button clicks (NO debounce)
- Fires immediately
- Use for "Calculate", "Submit", etc.

---

## 📋 Refactoring Checklist

Apply this pattern to ALL calculator components:

### Components to Refactor:

- [x] `components/TaxCalculator.tsx` ✅ **DONE** (Example implementation)
- [ ] `components/MortgageCalculator.tsx`
- [ ] `app/calcul-hypotheque/MortgageCalculatorClient.tsx`
- [ ] `components/AffordabilityCalculator.tsx`
- [ ] `components/AutoLoanCalculator.tsx`
- [ ] `components/CompoundInterestCalculator.tsx`
- [ ] `components/DaycareCalculator.tsx`
- [ ] `components/DebtCalculator.tsx`
- [ ] `components/EICalculator.tsx`
- [ ] `components/EVSavingsCalculator.tsx`
- [ ] `components/FamilyBenefitsCalculator.tsx`
- [ ] `components/InflationCalculator.tsx`
- [ ] `components/RentCalculator.tsx`
- [ ] `components/RentVsBuyCalculator.tsx`
- [ ] `components/RetirementCalculator.tsx`
- [ ] `components/SalesTaxCalculator.tsx`
- [ ] `components/StudentLoanCalculator.tsx`
- [ ] `components/TransferTaxCalculator.tsx`
- [ ] `components/VacationPayCalculator.tsx`
- [ ] `components/WageConverter.tsx`

### Client Components in `/app`:
- [ ] `app/allocations-familiales/FamilyBenefitsClient.tsx`
- [ ] `app/assurance-emploi/EICalculatorClient.tsx`
- [ ] `app/augmentation-loyer-2026/RentIncreaseClient.tsx`
- [ ] `app/auto-electrique-vs-essence/EVComparisonClient.tsx`
- [ ] `app/capacite-emprunt/AffordabilityClient.tsx`
- [ ] `app/declaration-simplifiee/DeclarationSimplifieeClient.tsx`
- [ ] `app/dettes-credit/DebtClient.tsx`
- [ ] `app/epargne-retraite/RetirementClient.tsx`
- [ ] `app/frais-de-garde/DaycareClient.tsx`
- [ ] `app/interets-composes/CompoundInterestClient.tsx`
- [ ] `app/louer-ou-acheter/RentVsBuyClient.tsx`
- [ ] `app/paie-vacances/VacationPayClient.tsx`
- [ ] `app/pret-auto/AutoLoanClient.tsx`
- [ ] `app/pret-etudiant/StudentLoanClient.tsx`
- [ ] `app/salaire-net-quebec/SalaryLandingClient.tsx`
- [ ] `app/taux-horaire/WageConverterClient.tsx`
- [ ] `app/tps-tvq-quebec/SalesTaxClient.tsx`

---

## 🔧 Step-by-Step Refactoring Pattern

### Step 1: Import the hooks

```typescript
import { useCalculatorTracking, useButtonTracking } from '@/hooks/useDebouncedAnalytics'
```

### Step 2: Initialize hooks in component

```typescript
export default function YourCalculator() {
  // ... existing state ...
  
  // Add these hooks
  const trackInputChange = useCalculatorTracking('your_calculator_name')
  const trackButtonClick = useButtonTracking('your_calculator_name')
  
  // ... rest of component ...
}
```

### Step 3: Update input handlers (DEBOUNCED)

**BEFORE:**
```typescript
<input
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>
```

**AFTER:**
```typescript
<input
  value={amount}
  onChange={(e) => {
    setAmount(e.target.value)
    // Only fires after 800ms of inactivity
    trackInputChange({ field: 'amount', value: e.target.value })
  }}
/>
```

### Step 4: Update button handlers (IMMEDIATE)

**BEFORE:**
```typescript
<button onClick={handleCalculate}>
  Calculer
</button>
```

**AFTER:**
```typescript
const handleCalculate = () => {
  // ... existing calculation logic ...
  
  // Track button click immediately (no debounce)
  trackButtonClick('calculate_clicked', {
    amount: amount,
    rate: rate,
    // ... other relevant params
  })
}
```

### Step 5: Update slider/range inputs (DEBOUNCED)

```typescript
<input
  type="range"
  value={percentage}
  onChange={(e) => {
    setPercentage(Number(e.target.value))
    // Debounced - only fires when user stops dragging
    trackInputChange({ field: 'percentage', value: e.target.value })
  }}
/>
```

---

## 🎯 Best Practices

### ✅ DO:
- Use `trackInputChange` for text inputs, number inputs, sliders
- Use `trackButtonClick` for "Calculate", "Submit", "Download PDF" buttons
- Use descriptive field names in tracking params
- Include relevant calculation parameters in button tracking

### ❌ DON'T:
- Don't track on every keystroke without debouncing
- Don't use debounced tracking for button clicks
- Don't track sensitive user data (PII)
- Don't track if user hasn't interacted meaningfully

---

## 📊 Expected Results

### Before:
- 1,300 events for 3 users
- ~433 events per user
- Event spam on every keystroke

### After:
- ~10-20 events per user
- Events only fire after 800ms inactivity
- Button clicks tracked immediately
- **95% reduction in event volume**

---

## 🧪 Testing

1. Open a calculator page
2. Type rapidly in an input field
3. **Verify**: No GA events fire during typing
4. Stop typing for 800ms
5. **Verify**: Single GA event fires with latest value
6. Click "Calculate" button
7. **Verify**: Button event fires immediately

---

## 🚀 Alternative Approach (Even Better)

If calculators have a distinct "Calculate" button:

### Option A: Remove ALL input tracking
```typescript
// Remove tracking from inputs entirely
<input
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  // No tracking here!
/>

// Only track the final calculation
<button onClick={() => {
  handleCalculate()
  trackButtonClick('calculate_clicked', {
    amount: amount,
    rate: rate,
    term: term,
  })
}}>
  Calculer
</button>
```

**Benefits:**
- Even fewer events
- Only tracks meaningful user actions
- Simpler implementation
- Better data quality

---

## 📝 Calculator Name Convention

Use consistent naming for tracking:

```typescript
// Good examples:
useCalculatorTracking('mortgage_calculator')
useCalculatorTracking('tax_calculator')
useCalculatorTracking('retirement_calculator')
useCalculatorTracking('loan_calculator')

// Bad examples:
useCalculatorTracking('calc') // Too vague
useCalculatorTracking('MortgageCalculator') // Use snake_case
useCalculatorTracking('mortgage-calculator') // Use underscores, not dashes
```

---

## 🔍 Monitoring

After deployment, monitor GA to verify:

1. Event volume decreased by ~95%
2. Events still capture user interactions
3. No duplicate events
4. Button clicks tracked correctly
5. Input changes tracked after inactivity

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify `window.gtag` is available
3. Test with GA Debug View
4. Ensure hooks are imported correctly
5. Check that calculator names are consistent

---

## ✨ Example: Complete Refactored Component

See `components/TaxCalculator.tsx` for a complete working example.
