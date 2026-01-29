# Analytics Refactoring - Quick Reference Card

**Print this or keep it open while refactoring!**

---

## 🎯 Goal
Stop GA event spam by debouncing input tracking (800ms delay)

---

## 📦 Import (Add to top of file)

```typescript
import { useCalculatorTracking, useButtonTracking } from '@/hooks/useDebouncedAnalytics'
```

---

## 🪝 Initialize Hooks (Add after state)

```typescript
const trackInputChange = useCalculatorTracking('calculator_name')
const trackButtonClick = useButtonTracking('calculator_name')
```

**Calculator Names:**
- `mortgage_calculator`
- `tax_calculator`
- `retirement_calculator`
- `loan_calculator`
- `rent_calculator`
- `affordability_calculator`
- etc. (use snake_case)

---

## 🔢 Input Tracking (Debounced - 800ms)

### Text/Number Input
```typescript
<input
  value={amount}
  onChange={(e) => {
    setAmount(e.target.value)
    trackInputChange({ field: 'amount', value: e.target.value })
  }}
/>
```

### Select/Dropdown
```typescript
<select
  value={option}
  onChange={(e) => {
    setOption(e.target.value)
    trackInputChange({ field: 'option', value: e.target.value })
  }}
>
```

### Range/Slider
```typescript
<input
  type="range"
  value={percent}
  onChange={(e) => {
    setPercent(Number(e.target.value))
    trackInputChange({ field: 'percent', value: e.target.value })
  }}
/>
```

---

## 🔘 Button Tracking (Immediate)

### Calculate Button
```typescript
const handleCalculate = () => {
  // ... calculation logic ...
  
  trackButtonClick('calculate_clicked', {
    param1: value1,
    param2: value2,
  })
}
```

### Quick Action Button
```typescript
<button onClick={() => {
  handleAction(value)
  trackButtonClick('action_name', { value })
}}>
```

---

## ⚡ Recommended: Button-Only Tracking

**Simplest approach - skip input tracking entirely:**

```typescript
// NO tracking on inputs
<input
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

// ONLY track calculate button
<button onClick={() => {
  handleCalculate()
  trackButtonClick('calculate_clicked', {
    amount: amount,
    rate: rate,
  })
}}>
  Calculate
</button>
```

**Benefits:** Fewer events, simpler code, cleaner data

---

## ✅ Testing Checklist

1. Component compiles ✓
2. Inputs update state ✓
3. Calculate button works ✓
4. Open DevTools → Network ✓
5. Type rapidly → No events ✓
6. Stop 1 sec → Event fires ✓
7. Click button → Event fires ✓

---

## ❌ Common Mistakes

### Mistake 1: No State Update
```typescript
// ❌ Wrong
onChange={(e) => trackInputChange({ field: 'x', value: e.target.value })}

// ✅ Correct
onChange={(e) => {
  setValue(e.target.value)
  trackInputChange({ field: 'x', value: e.target.value })
}}
```

### Mistake 2: Wrong Hook
```typescript
// ❌ Wrong - debounced for button
onClick={() => trackInputChange({ action: 'calc' })}

// ✅ Correct - immediate for button
onClick={() => trackButtonClick('calculate_clicked', {})}
```

### Mistake 3: Inconsistent Names
```typescript
// ❌ Wrong
useCalculatorTracking('Mortgage')
useCalculatorTracking('mortgage-calc')

// ✅ Correct
useCalculatorTracking('mortgage_calculator')
```

---

## 📊 Expected Results

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| Events/User | 433 | 15 | 96.5% |
| Total Events | 1,300 | 45 | 96.5% |

---

## 🛠️ Tools

**Scanner:**
```bash
node scripts/find-calculator-inputs.js
```

**Guides:**
- `ANALYTICS_REFACTORING_GUIDE.md` - Complete guide
- `scripts/refactor-template.md` - Copy-paste templates
- `scripts/batch-refactor-helper.md` - Batch refactoring
- `IMPLEMENTATION_SUMMARY.md` - Full summary

---

## 🎯 When to Use Which Hook

| User Action | Hook | Fires When |
|-------------|------|------------|
| Typing | `trackInputChange` | 800ms after last key |
| Slider | `trackInputChange` | 800ms after stopped |
| Dropdown | `trackInputChange` | 800ms after selection |
| Calculate | `trackButtonClick` | Immediately |
| Download | `trackButtonClick` | Immediately |

---

## 💡 Pro Tips

1. **Button-only tracking** is recommended (simplest)
2. **Test frequently** - catch issues early
3. **Use consistent naming** - snake_case for calculators
4. **Run scanner** - track your progress
5. **Take breaks** - avoid mistakes

---

## 📝 Quick Workflow

1. Open component file
2. Add import at top
3. Add hooks after state
4. Update button handler (add tracking)
5. (Optional) Update input handlers
6. Test component
7. Run scanner to verify
8. Move to next component

---

## 🚀 Estimated Time

- **Simple (1-2 inputs):** 5 min
- **Medium (3-4 inputs):** 10 min
- **Complex (5+ inputs):** 15 min

**Total for 36 components:** 8-11 hours

---

## ✨ Example (Complete)

```typescript
import { useCalculatorTracking, useButtonTracking } from '@/hooks/useDebouncedAnalytics'

export default function Calculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  
  // Analytics hooks
  const trackInputChange = useCalculatorTracking('my_calculator')
  const trackButtonClick = useButtonTracking('my_calculator')
  
  const handleCalculate = () => {
    // ... calculation logic ...
    
    trackButtonClick('calculate_clicked', {
      amount: amount,
      rate: rate,
    })
  }
  
  return (
    <div>
      <input
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value)
          trackInputChange({ field: 'amount', value: e.target.value })
        }}
      />
      
      <button onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  )
}
```

---

**Keep this reference handy while refactoring! 📌**

*Last Updated: January 29, 2026*
