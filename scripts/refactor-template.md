# Quick Refactoring Template

Copy and paste these snippets when refactoring calculator components.

---

## 1. Add Import (Top of file)

```typescript
import { useCalculatorTracking, useButtonTracking } from '@/hooks/useDebouncedAnalytics'
```

---

## 2. Initialize Hooks (Inside component, after state declarations)

```typescript
// Analytics tracking hooks
const trackInputChange = useCalculatorTracking('CALCULATOR_NAME_HERE')
const trackButtonClick = useButtonTracking('CALCULATOR_NAME_HERE')
```

**Replace `CALCULATOR_NAME_HERE` with:**
- `mortgage_calculator`
- `tax_calculator`
- `retirement_calculator`
- `loan_calculator`
- `rent_calculator`
- etc.

---

## 3. Text/Number Input Pattern

**Find:**
```typescript
<input
  value={fieldName}
  onChange={(e) => setFieldName(e.target.value)}
/>
```

**Replace with:**
```typescript
<input
  value={fieldName}
  onChange={(e) => {
    setFieldName(e.target.value)
    trackInputChange({ field: 'field_name', value: e.target.value })
  }}
/>
```

---

## 4. Select/Dropdown Pattern

**Find:**
```typescript
<select
  value={option}
  onChange={(e) => setOption(e.target.value)}
>
```

**Replace with:**
```typescript
<select
  value={option}
  onChange={(e) => {
    setOption(e.target.value)
    trackInputChange({ field: 'option_name', value: e.target.value })
  }}
>
```

---

## 5. Range/Slider Pattern

**Find:**
```typescript
<input
  type="range"
  value={percentage}
  onChange={(e) => setPercentage(Number(e.target.value))}
/>
```

**Replace with:**
```typescript
<input
  type="range"
  value={percentage}
  onChange={(e) => {
    setPercentage(Number(e.target.value))
    trackInputChange({ field: 'percentage', value: e.target.value })
  }}
/>
```

---

## 6. Calculate Button Pattern

**Find:**
```typescript
const handleCalculate = () => {
  // calculation logic
  setResults(calculatedResults)
}
```

**Replace with:**
```typescript
const handleCalculate = () => {
  // calculation logic
  setResults(calculatedResults)
  
  // Track calculation
  trackButtonClick('calculate_clicked', {
    param1: value1,
    param2: value2,
    // Add relevant calculation parameters
  })
}
```

---

## 7. Quick Action Button Pattern (Popular selections, presets, etc.)

**Find:**
```typescript
<button onClick={() => handlePreset(value)}>
  Preset
</button>
```

**Replace with:**
```typescript
<button onClick={() => {
  handlePreset(value)
  trackButtonClick('preset_selected', { value: value })
}}>
  Preset
</button>
```

---

## 8. Download/Export Button Pattern

**Find:**
```typescript
<button onClick={handleDownloadPDF}>
  Download PDF
</button>
```

**Replace with:**
```typescript
<button onClick={() => {
  handleDownloadPDF()
  trackButtonClick('pdf_downloaded', {
    // Add relevant context
  })
}}>
  Download PDF
</button>
```

---

## Alternative: Remove Input Tracking Entirely

If the calculator has a "Calculate" button, you can skip tracking inputs:

```typescript
// DON'T track inputs
<input
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  // No tracking!
/>

// ONLY track the calculate button
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

**This is the RECOMMENDED approach** - cleaner and fewer events!

---

## Calculator Name Reference

Use these standardized names:

| Component | Calculator Name |
|-----------|----------------|
| TaxCalculator | `tax_calculator` |
| MortgageCalculator | `mortgage_calculator` |
| AffordabilityCalculator | `affordability_calculator` |
| AutoLoanCalculator | `auto_loan_calculator` |
| CompoundInterestCalculator | `compound_interest_calculator` |
| DaycareCalculator | `daycare_calculator` |
| DebtCalculator | `debt_calculator` |
| EICalculator | `ei_calculator` |
| EVSavingsCalculator | `ev_savings_calculator` |
| FamilyBenefitsCalculator | `family_benefits_calculator` |
| InflationCalculator | `inflation_calculator` |
| RentCalculator | `rent_calculator` |
| RentVsBuyCalculator | `rent_vs_buy_calculator` |
| RetirementCalculator | `retirement_calculator` |
| SalesTaxCalculator | `sales_tax_calculator` |
| StudentLoanCalculator | `student_loan_calculator` |
| TransferTaxCalculator | `transfer_tax_calculator` |
| VacationPayCalculator | `vacation_pay_calculator` |
| WageConverter | `wage_converter` |

---

## Testing Checklist

After refactoring each component:

- [ ] Component compiles without errors
- [ ] Inputs still update state correctly
- [ ] Calculate button works
- [ ] Open browser DevTools → Network tab
- [ ] Type in inputs rapidly
- [ ] Verify: No GA events during typing
- [ ] Stop typing for 1 second
- [ ] Verify: Single GA event fires
- [ ] Click Calculate button
- [ ] Verify: Button event fires immediately

---

## Common Mistakes to Avoid

❌ **Don't do this:**
```typescript
// Missing the state update!
onChange={(e) => trackInputChange({ field: 'amount', value: e.target.value })}
```

✅ **Do this:**
```typescript
// Update state FIRST, then track
onChange={(e) => {
  setAmount(e.target.value)
  trackInputChange({ field: 'amount', value: e.target.value })
}}
```

---

❌ **Don't do this:**
```typescript
// Using debounced tracking for buttons
onClick={() => trackInputChange({ action: 'calculate' })}
```

✅ **Do this:**
```typescript
// Use button tracking for immediate events
onClick={() => trackButtonClick('calculate_clicked', { amount })}
```

---

## Quick Reference: When to Use Which Hook

| User Action | Hook to Use | Fires When |
|-------------|-------------|------------|
| Typing in input | `trackInputChange` | 800ms after last keystroke |
| Moving slider | `trackInputChange` | 800ms after stopped moving |
| Changing dropdown | `trackInputChange` | 800ms after selection |
| Clicking Calculate | `trackButtonClick` | Immediately |
| Clicking preset | `trackButtonClick` | Immediately |
| Downloading PDF | `trackButtonClick` | Immediately |

---

## Need Help?

See `ANALYTICS_REFACTORING_GUIDE.md` for detailed explanation and examples.
