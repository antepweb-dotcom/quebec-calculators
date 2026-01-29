# Batch Refactoring Helper

This guide helps you refactor multiple calculators efficiently using find-and-replace patterns.

---

## 🚀 Quick Batch Refactoring Strategy

### Strategy 1: Button-Only Tracking (Recommended)

**Best for:** Calculators with a clear "Calculate" button

**Advantage:** Simplest implementation, cleanest data, fewest events

**Steps:**
1. Add import and hooks
2. Add tracking ONLY to Calculate button
3. Skip all input tracking

**Time per component:** ~5 minutes

---

### Strategy 2: Full Tracking (Comprehensive)

**Best for:** Calculators where you want to track user exploration

**Advantage:** More detailed analytics

**Steps:**
1. Add import and hooks
2. Add debounced tracking to all inputs
3. Add immediate tracking to buttons

**Time per component:** ~10-15 minutes

---

## 📝 Batch Refactoring Workflow

### Step 1: Prepare Your Editor

**VS Code Users:**
1. Open Find & Replace (Ctrl+H or Cmd+H)
2. Enable "Regex" mode (Alt+R or Cmd+Alt+R)
3. Set "Files to Include" to specific calculator file

**Other Editors:**
- Use similar find-and-replace with regex support

---

### Step 2: Add Imports (All Components)

**Find:**
```regex
^(import .* from 'react')$
```

**Replace:**
```typescript
$1
import { useCalculatorTracking, useButtonTracking } from '@/hooks/useDebouncedAnalytics'
```

**Note:** Adjust based on your import structure. May need manual adjustment.

---

### Step 3: Add Hooks After State (Manual)

**Find the state declarations section** (usually after `useState` calls)

**Add these lines:**
```typescript
  // Analytics tracking hooks
  const trackInputChange = useCalculatorTracking('CALCULATOR_NAME')
  const trackButtonClick = useButtonTracking('CALCULATOR_NAME')
```

**Replace `CALCULATOR_NAME` with:**
- File: `MortgageCalculator.tsx` → `mortgage_calculator`
- File: `TaxCalculator.tsx` → `tax_calculator`
- File: `RetirementCalculator.tsx` → `retirement_calculator`
- etc.

---

### Step 4A: Button-Only Tracking (Simple Approach)

**Find Calculate Button Pattern:**
```regex
const handleCalculate = \(\) => \{
```

**Replace with:**
```typescript
const handleCalculate = () => {
  // Track calculation
  trackButtonClick('calculate_clicked', {
    // TODO: Add relevant parameters
  })
```

**Then manually:**
1. Move tracking AFTER calculation logic
2. Add relevant parameters to tracking call
3. Test the component

---

### Step 4B: Full Input Tracking (Comprehensive Approach)

**Pattern 1: Simple onChange**
```regex
onChange=\{(\w+)\}
```

**Replace with:**
```typescript
onChange={(e) => {
  $1(e.target.value)
  trackInputChange({ field: 'FIELD_NAME', value: e.target.value })
}}
```

**Pattern 2: onChange with arrow function**
```regex
onChange=\{\(e\) => (\w+)\(e\.target\.value\)\}
```

**Replace with:**
```typescript
onChange={(e) => {
  $1(e.target.value)
  trackInputChange({ field: 'FIELD_NAME', value: e.target.value })
}}
```

**Note:** You'll need to manually replace `FIELD_NAME` with actual field names.

---

## 🎯 Component-Specific Patterns

### Mortgage Calculator Pattern

**Typical inputs:**
- `loanAmount` / `price`
- `interestRate` / `rate`
- `amortization` / `term`
- `downPayment`

**Tracking example:**
```typescript
trackButtonClick('calculate_clicked', {
  loan_amount: loanAmount,
  interest_rate: interestRate,
  amortization_years: amortization,
  down_payment: downPayment,
})
```

---

### Tax/Salary Calculator Pattern

**Typical inputs:**
- `income` / `salary`
- `frequency` (annual, monthly, etc.)

**Tracking example:**
```typescript
trackButtonClick('calculate_clicked', {
  income: income,
  frequency: frequency,
})
```

---

### Loan Calculator Pattern

**Typical inputs:**
- `principal` / `amount`
- `rate`
- `term`

**Tracking example:**
```typescript
trackButtonClick('calculate_clicked', {
  principal: principal,
  rate: rate,
  term: term,
})
```

---

## 🔄 Refactoring Order (Recommended)

### Batch 1: Simple Calculators (1-2 inputs)
**Time: 30-45 minutes total**

1. `app/salaire-net-quebec/SalaryLandingClient.tsx`
2. `app/tps-tvq-quebec/SalesTaxClient.tsx`
3. `app/allocations-familiales/FamilyBenefitsClient.tsx`
4. `components/FamilyBenefitsCalculator.tsx`

**Strategy:** Button-only tracking

---

### Batch 2: Medium Calculators (3-4 inputs)
**Time: 2-3 hours total**

5. `components/DaycareCalculator.tsx`
6. `components/DebtCalculator.tsx`
7. `components/EICalculator.tsx`
8. `components/EVSavingsCalculator.tsx`
9. `components/InflationCalculator.tsx`
10. `components/SalesTaxCalculator.tsx`
11. `components/StudentLoanCalculator.tsx`
12. `components/TransferTaxCalculator.tsx`
13. `components/VacationPayCalculator.tsx`
14. `app/auto-electrique-vs-essence/EVComparisonClient.tsx`
15. `app/dettes-credit/DebtClient.tsx`
16. `app/frais-de-garde/DaycareClient.tsx`
17. `app/paie-vacances/VacationPayClient.tsx`
18. `app/pret-etudiant/StudentLoanClient.tsx`
19. `app/taux-horaire/WageConverterClient.tsx`

**Strategy:** Button-only tracking (or full if needed)

---

### Batch 3: Complex Calculators (5+ inputs)
**Time: 3-4 hours total**

20. `components/RentCalculator.tsx` (9 inputs)
21. `app/capacite-emprunt/AffordabilityClient.tsx` (6 inputs)
22. `app/louer-ou-acheter/RentVsBuyClient.tsx` (6 inputs)
23. `components/MortgageCalculator.tsx` (5 inputs)
24. `components/RetirementCalculator.tsx` (5 inputs)
25. `app/augmentation-loyer-2026/RentIncreaseClient.tsx` (5 inputs)
26. `app/calcul-hypotheque/MortgageCalculatorClient.tsx` (5 inputs)
27. `app/declaration-simplifiee/DeclarationSimplifieeClient.tsx` (5 inputs)
28. `app/epargne-retraite/RetirementClient.tsx` (5 inputs)
29. `app/pret-auto/AutoLoanClient.tsx` (5 inputs)
30. `components/AffordabilityCalculator.tsx` (4 inputs)
31. `components/AutoLoanCalculator.tsx` (4 inputs)
32. `components/CompoundInterestCalculator.tsx` (4 inputs)
33. `components/RentVsBuyCalculator.tsx` (4 inputs)
34. `app/assurance-emploi/EICalculatorClient.tsx` (4 inputs)
35. `app/interets-composes/CompoundInterestClient.tsx` (4 inputs)

**Strategy:** Button-only tracking recommended

---

## ⚡ Speed Tips

### 1. Use Multi-Cursor Editing
- Select all `onChange` handlers
- Edit them simultaneously
- Saves tons of time

### 2. Create Snippets
**VS Code Snippet:**
```json
{
  "Calculator Tracking Hooks": {
    "prefix": "calc-hooks",
    "body": [
      "// Analytics tracking hooks",
      "const trackInputChange = useCalculatorTracking('${1:calculator_name}')",
      "const trackButtonClick = useButtonTracking('${1:calculator_name}')"
    ]
  }
}
```

### 3. Use Clipboard History
- Copy common patterns
- Paste with modifications
- Faster than typing

### 4. Test in Batches
- Refactor 5 components
- Test all 5 together
- Fix any issues
- Move to next batch

---

## 🧪 Batch Testing Script

Create a simple test checklist:

```markdown
## Testing Batch [X]

Components:
- [ ] Component 1 - Compiles ✓ / Works ✓ / Events ✓
- [ ] Component 2 - Compiles ✓ / Works ✓ / Events ✓
- [ ] Component 3 - Compiles ✓ / Works ✓ / Events ✓
- [ ] Component 4 - Compiles ✓ / Works ✓ / Events ✓
- [ ] Component 5 - Compiles ✓ / Works ✓ / Events ✓

Issues Found:
- None / [List issues]

Time Taken: [X] minutes
```

---

## 📊 Progress Tracking

After each batch, run:
```bash
node scripts/find-calculator-inputs.js
```

**Track your progress:**
```
Batch 1: 4/36 (11%) ✓
Batch 2: 19/36 (53%) ✓
Batch 3: 36/36 (100%) ✓
```

---

## 🎯 Daily Goals

**Day 1: Simple Calculators**
- Refactor Batch 1 (4 components)
- Time: 1 hour
- Progress: 11%

**Day 2: Medium Calculators**
- Refactor Batch 2 (15 components)
- Time: 3 hours
- Progress: 53%

**Day 3: Complex Calculators**
- Refactor Batch 3 (16 components)
- Time: 4 hours
- Progress: 100%

**Total Time: ~8 hours over 3 days**

---

## 🚨 Common Pitfalls

### Pitfall 1: Forgetting to Update State
```typescript
// ❌ Wrong - no state update
onChange={(e) => trackInputChange({ field: 'amount', value: e.target.value })}

// ✅ Correct - state update first
onChange={(e) => {
  setAmount(e.target.value)
  trackInputChange({ field: 'amount', value: e.target.value })
}}
```

### Pitfall 2: Using Wrong Hook
```typescript
// ❌ Wrong - debounced for button
onClick={() => trackInputChange({ action: 'calculate' })}

// ✅ Correct - immediate for button
onClick={() => trackButtonClick('calculate_clicked', { amount })}
```

### Pitfall 3: Inconsistent Naming
```typescript
// ❌ Wrong - inconsistent names
useCalculatorTracking('Mortgage')
useCalculatorTracking('mortgage-calc')
useCalculatorTracking('MortgageCalculator')

// ✅ Correct - consistent snake_case
useCalculatorTracking('mortgage_calculator')
```

---

## 🎉 Completion Checklist

After refactoring all components:

- [ ] All 36 components refactored
- [ ] All components compile without errors
- [ ] All components tested manually
- [ ] Scanner shows 100% completion
- [ ] No console errors in browser
- [ ] GA events reduced by ~95%
- [ ] Documentation updated
- [ ] Team notified of changes

---

## 📈 Expected Results

**Before:**
- 1,300 events / 3 users = 433 events/user

**After (Button-Only Tracking):**
- ~45 events / 3 users = 15 events/user
- **96.5% reduction** ✅

**After (Full Tracking):**
- ~60 events / 3 users = 20 events/user
- **95.4% reduction** ✅

---

## 💡 Pro Tips

1. **Start with button-only tracking** - simplest and most effective
2. **Refactor in batches** - easier to test and debug
3. **Use the scanner** - track progress and stay motivated
4. **Test frequently** - catch issues early
5. **Take breaks** - avoid fatigue and mistakes

---

**Good luck with your refactoring! 🚀**

*Remember: Button-only tracking is recommended for most calculators - it's simpler and provides cleaner analytics.*
