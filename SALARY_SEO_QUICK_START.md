# Salary Calculator - Programmatic SEO Quick Start

## 🎉 What's New

You now have **171 SEO-optimized landing pages** for specific salary amounts!

## 🔗 URL Structure

### Main Page
```
https://qcfinance.ca/salaire-net-quebec
```
- Landing page with search functionality
- Links to popular salary amounts
- General information about the calculator

### Dynamic Pages (171 pages)
```
https://qcfinance.ca/salaire-net-quebec/30000
https://qcfinance.ca/salaire-net-quebec/60000
https://qcfinance.ca/salaire-net-quebec/100000
...
https://qcfinance.ca/salaire-net-quebec/200000
```
- Range: $30,000 to $200,000
- Increment: $1,000
- Total: 171 unique pages

## 🚀 How Users Find These Pages

### 1. Google Search
Users search for:
- "salaire net 60000 quebec"
- "60000 net quebec"
- "impot 60000 quebec"

### 2. Direct URL
Users can type or share:
- `qcfinance.ca/salaire-net-quebec/60000`

### 3. Internal Navigation
From main page, users click:
- Popular salary buttons (40k, 50k, 60k, etc.)
- Or enter any amount and get redirected

## 📊 What Each Page Includes

### 1. Pre-filled Calculator
- Salary amount from URL is automatically entered
- Results are calculated immediately
- No need to click "Calculate"

### 2. Unique SEO Content
- Custom H1: "Salaire net sur un revenu de 60 000 $"
- Tailored intro paragraph
- 6-7 FAQs specific to that salary range
- Comparison to Quebec average
- Mortgage affordability estimate

### 3. Social Sharing
- Custom Open Graph image per salary
- Shows salary amount and estimated net
- Optimized for Facebook, LinkedIn, Twitter

### 4. Navigation
- Breadcrumbs: Home → Salaire Net → 60000$
- Links to related tools
- Back to main calculator page

## 🎯 Target Keywords

Each page targets multiple keywords:

| Salary | Primary Keyword | Secondary Keywords |
|--------|----------------|-------------------|
| 60000 | "salaire net 60000 quebec" | "60000 net quebec", "impot 60000" |
| 75000 | "salaire net 75000 quebec" | "75000 net quebec", "impot 75000" |
| 100000 | "salaire net 100000 quebec" | "100000 net quebec", "impot 100000" |

**Total Keywords**: 500+ long-tail variations

## 📈 Expected SEO Impact

### Timeline
- **Week 1-2**: Pages submitted to Google
- **Week 3-4**: Initial indexing begins
- **Month 2-3**: Rankings start appearing
- **Month 4-6**: Full SEO impact visible

### Traffic Projections
- **Indexed Pages**: 171
- **Monthly Impressions**: 10,000-50,000
- **Click-Through Rate**: 5-10%
- **Monthly Visitors**: 500-5,000 from organic search

## 🔧 Technical Details

### Build Process
```bash
npm run build
```
- Generates 171 static HTML pages
- Build time: ~60 seconds
- Pages are cached and served instantly

### File Structure
```
app/
└── salaire-net-quebec/
    ├── page.tsx                    # Main landing page
    ├── SalaryLandingClient.tsx     # Client component
    ├── layout.tsx                  # Layout wrapper
    ├── opengraph-image.tsx         # Main OG image
    └── [salary]/                   # Dynamic route
        ├── page.tsx                # Dynamic page component
        ├── opengraph-image.tsx     # Dynamic OG image
        └── metadata.ts             # Metadata helpers
```

### Key Components
1. **`generateStaticParams()`**: Generates 171 static paths
2. **`generateMetadata()`**: Creates unique SEO metadata per page
3. **`TaxCalculator`**: Accepts `initialSalary` prop
4. **`opengraph-image.tsx`**: Generates custom OG images

## 🎨 Customization

### Adding More Salary Pages
Edit `app/salaire-net-quebec/[salary]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const salaries = []
  // Change range here
  for (let i = 20000; i <= 250000; i += 1000) {
    salaries.push({ salary: i.toString() })
  }
  return salaries
}
```

### Updating SEO Content
Edit FAQ content in `page.tsx`:

```typescript
faqs={[
  {
    question: `Your custom question for ${formattedSalary}?`,
    answer: `Your custom answer...`
  }
]}
```

### Changing Salary Increments
Current: $1,000 increments
To change to $500 increments:

```typescript
for (let i = 30000; i <= 200000; i += 500) {
  // This would generate 341 pages
}
```

## 📊 Monitoring

### Google Search Console
1. Submit sitemap: `https://qcfinance.ca/sitemap.xml`
2. Monitor indexing: Coverage report
3. Track rankings: Performance report
4. Check for errors: Issues tab

### Analytics (GA4)
Track these metrics:
- Landing page views by salary amount
- Time on page
- Bounce rate
- Calculator usage
- PDF downloads
- Cross-tool navigation

### Key URLs to Monitor
```
/salaire-net-quebec/40000  # Entry-level
/salaire-net-quebec/60000  # Average
/salaire-net-quebec/80000  # Above average
/salaire-net-quebec/100000 # High earner
```

## 🐛 Troubleshooting

### Page Not Found (404)
**Issue**: `/salaire-net-quebec/65000` returns 404

**Solution**: 
1. Check if salary is in range (30k-200k)
2. Rebuild site: `npm run build`
3. Verify in `.next/server/app/salaire-net-quebec/`

### Calculator Not Pre-filled
**Issue**: Calculator shows empty input

**Solution**:
1. Check `TaxCalculator` receives `initialSalary` prop
2. Verify `useEffect` in `TaxCalculator.tsx`
3. Check browser console for errors

### SEO Metadata Not Showing
**Issue**: Google shows generic title/description

**Solution**:
1. Verify `generateMetadata()` function
2. Check canonical URL is correct
3. Wait 2-4 weeks for Google to re-crawl
4. Use Google Search Console to request indexing

## 🚀 Deployment Checklist

- [x] Build succeeds without errors
- [x] All 171 pages generated
- [x] Sitemap includes all pages
- [x] Metadata is unique per page
- [x] Calculator pre-fills correctly
- [x] OG images generate properly
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor indexing status
- [ ] Track rankings for target keywords
- [ ] Set up GA4 custom events

## 📚 Resources

- **Implementation Guide**: `PROGRAMMATIC_SEO_IMPLEMENTATION.md`
- **Next.js Docs**: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- **Google Search Console**: https://search.google.com/search-console
- **Sitemap**: https://qcfinance.ca/sitemap.xml

## 💡 Pro Tips

1. **Internal Linking**: Link to these pages from blog posts and other calculators
2. **Social Sharing**: Share specific salary pages on social media
3. **Email Marketing**: Include links to relevant salary pages in newsletters
4. **Paid Ads**: Use these pages as landing pages for PPC campaigns
5. **Content Updates**: Refresh FAQ content quarterly for freshness

## 🎯 Next Steps

1. **Submit to Google**: Add sitemap to Search Console
2. **Monitor Indexing**: Check coverage report weekly
3. **Track Rankings**: Set up rank tracking for top keywords
4. **Optimize CTR**: Test different meta descriptions
5. **Expand**: Consider adding more salary ranges or comparisons

---

**Status**: ✅ Live and Ready for SEO
**Last Updated**: January 29, 2026
**Pages Generated**: 171
**Build Time**: ~60 seconds
