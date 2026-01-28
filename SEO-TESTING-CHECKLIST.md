# SEO Implementation - Testing & Deployment Checklist

## 🧪 Pre-Deployment Testing

### 1. Local Development Testing

#### Start Dev Server
```bash
npm run dev
```

#### Test These URLs:
- [ ] http://localhost:3000/salaire-net-quebec
- [ ] http://localhost:3000/salaire-net-quebec/40000 (Low income)
- [ ] http://localhost:3000/salaire-net-quebec/60000 (Mid income)
- [ ] http://localhost:3000/salaire-net-quebec/100000 (High income)

#### Verify Content Appears:
- [ ] SEO content section loads after FAQ
- [ ] Content adapts to salary bracket (check advice text)
- [ ] All numbers calculate correctly
- [ ] Internal links to other salaries work
- [ ] Budget breakdown shows correct amounts
- [ ] RRSP limit calculates (18% of salary)

### 2. Structured Data Validation

#### Test with Google's Rich Results Test:
1. Build production version: `npm run build`
2. Start production server: `npm start`
3. Visit: https://search.google.com/test/rich-results
4. Enter your URL: `http://localhost:3000/salaire-net-quebec/50000`

#### Verify These Schemas Pass:
- [ ] SoftwareApplication schema valid
- [ ] FAQPage schema valid (3 questions)
- [ ] HowTo schema valid (3+ steps)
- [ ] No errors or warnings

#### Alternative: Schema.org Validator
- Visit: https://validator.schema.org/
- Paste your page HTML
- [ ] All schemas validate

### 3. Metadata Verification

#### Check Page Source (View Source):
- [ ] `<title>` tag includes salary amount
- [ ] Meta description includes calculated net income
- [ ] OpenGraph tags present
- [ ] Twitter card tags present
- [ ] Canonical URL correct

#### Use Browser Extensions:
- **SEO Meta in 1 Click** (Chrome/Firefox)
- **META SEO Inspector** (Chrome)

Verify:
- [ ] Title length < 60 characters
- [ ] Description length 150-160 characters
- [ ] No duplicate meta tags

### 4. Content Quality Check

#### Read Through Content:
- [ ] No grammar/spelling errors
- [ ] Numbers format correctly (French Canadian)
- [ ] Currency displays as "50 000 $" not "$50,000"
- [ ] All calculations accurate
- [ ] Links work (no 404s)
- [ ] Content makes sense for salary level

#### Mobile Responsiveness:
- [ ] Content readable on mobile
- [ ] Tables/grids don't overflow
- [ ] Touch targets large enough
- [ ] No horizontal scrolling

### 5. Performance Testing

#### Lighthouse Audit (Chrome DevTools):
```
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "SEO" category
4. Run audit
```

Target Scores:
- [ ] SEO Score: 95+ / 100
- [ ] Performance: 90+ / 100
- [ ] Accessibility: 90+ / 100

#### Check These Specifically:
- [ ] Structured data valid (Lighthouse checks this)
- [ ] Meta description present
- [ ] Page has title
- [ ] Links are crawlable
- [ ] Images have alt text

### 6. TypeScript & Build Errors

#### Check for Errors:
```bash
npm run build
```

- [ ] No TypeScript errors
- [ ] No build warnings
- [ ] Build completes successfully

#### Run Type Check:
```bash
npx tsc --noEmit
```

- [ ] No type errors in SalarySEOContent.tsx
- [ ] No type errors in page.tsx files

## 🚀 Deployment Checklist

### Pre-Deploy:
- [ ] All tests pass
- [ ] Structured data validates
- [ ] Build succeeds
- [ ] Git commit with clear message

### Deploy:
```bash
git add .
git commit -m "feat: Add programmatic SEO content and structured data for salary pages"
git push origin main
```

### Post-Deploy Verification:

#### 1. Production URLs Work:
- [ ] https://qcfinance.ca/salaire-net-quebec
- [ ] https://qcfinance.ca/salaire-net-quebec/50000
- [ ] https://qcfinance.ca/salaire-net-quebec/75000
- [ ] https://qcfinance.ca/salaire-net-quebec/100000

#### 2. Structured Data in Production:
- Visit: https://search.google.com/test/rich-results
- Test production URLs
- [ ] All schemas valid in production

#### 3. View Source Check:
- Right-click → View Page Source
- [ ] JSON-LD script tags present
- [ ] Metadata correct
- [ ] No console errors

## 📊 Google Search Console Setup

### 1. Submit Sitemap (if not already done):
```
https://qcfinance.ca/sitemap.xml
```

### 2. Request Indexing:
For key pages, manually request indexing:
- [ ] /salaire-net-quebec
- [ ] /salaire-net-quebec/50000
- [ ] /salaire-net-quebec/75000
- [ ] /salaire-net-quebec/100000

### 3. Monitor Rich Results:
- Go to: Search Console → Enhancements → Rich Results
- [ ] Check for errors
- [ ] Verify FAQPage detected
- [ ] Verify HowTo detected

### 4. Set Up Monitoring:
- [ ] Enable email alerts for coverage issues
- [ ] Add team members to Search Console
- [ ] Set up weekly performance reports

## 🔍 Week 1 Monitoring

### Day 1-2 After Deploy:
- [ ] Check Google Search Console for crawl errors
- [ ] Verify pages are being indexed
- [ ] Check for any structured data errors

### Day 3-5:
- [ ] Monitor impressions in Search Console
- [ ] Check if rich snippets appearing
- [ ] Look for any 404 errors

### Day 7:
- [ ] Review first week analytics
- [ ] Check ranking changes for target keywords
- [ ] Identify any issues to fix

## 📈 Success Metrics to Track

### Week 1-2:
- [ ] Pages indexed by Google
- [ ] Structured data validated
- [ ] No errors in Search Console

### Month 1:
- [ ] Impressions increasing
- [ ] Rich snippets appearing in SERP
- [ ] CTR improving

### Month 2-3:
- [ ] Rankings improving for target keywords
- [ ] Organic traffic increasing
- [ ] Featured snippets captured

### Month 6:
- [ ] Top 3 for "calcul impôt québec"
- [ ] Dominating long-tail salary queries
- [ ] 3-5x organic traffic increase

## 🐛 Troubleshooting

### Issue: Content Not Showing
**Solution**: 
- Check browser console for errors
- Verify component imported correctly
- Clear Next.js cache: `rm -rf .next`

### Issue: Structured Data Not Validating
**Solution**:
- Check JSON syntax in SalarySEOContent.tsx
- Verify all required fields present
- Test with validator.schema.org

### Issue: Numbers Not Calculating
**Solution**:
- Check taxLogic.ts for errors
- Verify results prop passed correctly
- Console.log the results object

### Issue: Build Fails
**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Issue: Metadata Not Updating
**Solution**:
- Hard refresh browser (Ctrl+Shift+R)
- Check metadata.ts exports correctly
- Verify Next.js cache cleared

## 📝 Maintenance Schedule

### Weekly:
- [ ] Check Search Console for errors
- [ ] Monitor ranking positions
- [ ] Review top performing pages

### Monthly:
- [ ] Analyze organic traffic trends
- [ ] Add new FAQs based on user queries
- [ ] Update content based on performance

### Quarterly:
- [ ] Review and update tax tips
- [ ] Add seasonal content
- [ ] Refresh affiliate offers

### Annually (January):
- [ ] Update tax rates in taxConstants.ts
- [ ] Update BPA amounts
- [ ] Update RRQ/RQAP/AE maximums
- [ ] Update RRSP/CELI limits
- [ ] Regenerate all salary pages

## ✅ Final Checklist Before Going Live

- [ ] All local tests pass
- [ ] Structured data validates
- [ ] Build succeeds without errors
- [ ] Content reviewed for accuracy
- [ ] Mobile responsive
- [ ] Performance scores good
- [ ] Git committed and pushed
- [ ] Production URLs tested
- [ ] Search Console configured
- [ ] Monitoring set up
- [ ] Team notified of changes

---

**Ready to Deploy?** ✅  
**Estimated Setup Time**: 30 minutes  
**Expected Results**: Visible within 2-4 weeks
