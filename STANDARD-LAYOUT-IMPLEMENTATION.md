# Standard Calculator Layout Implementation Guide

## Completed Refactors ✅

The following calculators have been successfully refactored to use the standard layout:

1. **TaxCalculator.tsx** - Income Tax Calculator
2. **EICalculator.tsx** - Employment Insurance Calculator  
3. **DeclarationSimplifieeClient.tsx** - Simplified Declaration
4. **MortgageCalculator.tsx** - Mortgage Calculator
5. **FamilyBenefitsCalculator.tsx** - Family Benefits Calculator
6. **DebtCalculator.tsx** - Debt Calculator

## Standard Layout Pattern

### Grid Structure
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  {/* Left Column - Inputs (Span 4 or 5) */}
  <div className="lg:col-span-4 space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Input fields */}
    </div>
  </div>

  {/* Right Column - Results (Span 8 or 7, STICKY) */}
  <div className="lg:col-span-8">
    <div className="lg:sticky lg:top-24 lg:h-fit">
      {/* Results content */}
    </div>
  </div>
</div>
```

### Key Classes
- **Container**: `grid grid-cols-1 lg:grid-cols-12 gap-8`
- **Left Column**: `lg:col-span-4` or `lg:col-span-5`
- **Right Column**: `lg:col-span-8` or `lg:col-span-7`
- **Sticky Wrapper**: `lg:sticky lg:top-24 lg:h-fit`
- **Cards**: `bg-white rounded-2xl shadow-lg border border-gray-100 p-6` or `p-8`

## Remaining Calculators to Refactor

### High Priority (Common Use)
1. **AutoLoanCalculator.tsx** - Auto Loan Calculator
2. **RentVsBuyCalculator.tsx** - Rent vs Buy Calculator
3. **CompoundInterestCalculator.tsx** - Compound Interest Calculator
4. **AffordabilityCalculator.tsx** - Affordability Calculator
5. **RetirementCalculator.tsx** - Retirement Calculator

### Medium Priority
6. **StudentLoanCalculator.tsx** - Student Loan Calculator
7. **TransferTaxCalculator.tsx** - Transfer Tax Calculator
8. **DaycareCalculator.tsx** - Daycare Calculator
9. **EVSavingsCalculator.tsx** - EV Savings Calculator

### Lower Priority
10. **RentCalculator.tsx** - Rent Increase Calculator
11. **SalesTaxCalculator.tsx** - Sales Tax Calculator
12. **VacationPayCalculator.tsx** - Vacation Pay Calculator
13. **WageConverter.tsx** - Wage Converter
14. **InflationCalculator.tsx** - Inflation Calculator

## Refactoring Checklist

For each calculator, apply these changes:

### 1. Grid Structure
- [ ] Change from `grid lg:grid-cols-3` to `grid grid-cols-1 lg:grid-cols-12`
- [ ] Update left column from `lg:col-span-1` to `lg:col-span-4` (or 5)
- [ ] Update right column from `lg:col-span-2` to `lg:col-span-8` (or 7)
- [ ] Add `gap-8` to grid container

### 2. Sticky Results
- [ ] Wrap right column content in `<div className="lg:sticky lg:top-24 lg:h-fit">`
- [ ] Remove any `ref={resultsRef}` from inner divs (move to sticky wrapper if needed)

### 3. Card Styling
- [ ] Change `rounded-xl` to `rounded-2xl`
- [ ] Change `shadow-lg` to `shadow-lg border border-gray-100` for result cards
- [ ] Change `shadow-lg` to `shadow-sm border border-gray-100` for input cards
- [ ] Ensure consistent padding: `p-6` for inputs, `p-8` for hero results

### 4. Visual Consistency
- [ ] Hero result cards should use gradients: `bg-gradient-to-br from-{color}-500 to-{color}-600`
- [ ] Text sizes: Hero numbers should be `text-6xl md:text-7xl`
- [ ] Ensure proper spacing with `space-y-6` between cards

### 5. Mobile Responsiveness
- [ ] Verify stacked layout works on mobile
- [ ] Test auto-scroll behavior
- [ ] Ensure touch-friendly controls

## Testing Checklist

After refactoring each calculator:

1. **Desktop View**
   - [ ] 2-column layout displays correctly
   - [ ] Right column is sticky on scroll
   - [ ] Proper spacing between columns
   - [ ] Cards have consistent styling

2. **Mobile View**
   - [ ] Stacked layout (inputs → results)
   - [ ] Auto-scroll to results works
   - [ ] Touch controls are responsive
   - [ ] No horizontal overflow

3. **Functionality**
   - [ ] All calculations work correctly
   - [ ] State management intact
   - [ ] PDF downloads work (if applicable)
   - [ ] Affiliate cards display properly

4. **TypeScript**
   - [ ] No compilation errors
   - [ ] No diagnostic warnings
   - [ ] Proper type safety maintained

## Example Transformation

### Before (Old 3-Column Layout)
```tsx
<div className="grid lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1 space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Inputs */}
    </div>
  </div>
  
  <div className="lg:col-span-2">
    {result ? (
      <div ref={resultsRef} className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Results */}
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-lg p-12">
        {/* Empty state */}
      </div>
    )}
  </div>
</div>
```

### After (New 12-Column Sticky Layout)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <div className="lg:col-span-4 space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Inputs */}
    </div>
  </div>
  
  <div className="lg:col-span-8">
    <div className="lg:sticky lg:top-24 lg:h-fit">
      {result ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Results */}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
          {/* Empty state */}
        </div>
      )}
    </div>
  </div>
</div>
```

## Benefits of Standard Layout

1. **Consistent UX**: All calculators feel cohesive
2. **Better Visibility**: Sticky results stay visible while adjusting inputs
3. **Modern Design**: Rounded corners, proper shadows, clean spacing
4. **Mobile-First**: Responsive design that works on all devices
5. **Maintainability**: Easier to update and maintain consistent patterns

## Next Steps

1. Continue refactoring remaining calculators in priority order
2. Test each calculator thoroughly after refactoring
3. Update any page-level layouts that wrap these calculators
4. Document any calculator-specific edge cases or variations
5. Create visual regression tests to ensure consistency

---

**Status**: 6/17 calculators refactored (35% complete)
**Last Updated**: January 27, 2026
