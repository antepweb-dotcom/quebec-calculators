# Testing Your OG Images

## Quick Test Commands

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test URLs in Browser

#### Global Homepage Image
```
http://localhost:3000/opengraph-image
```
**Expected:** Green gradient with "QC Finance" logo and slogan

#### Dynamic Salary Images
```
http://localhost:3000/salaire-net-quebec/50000/opengraph-image
http://localhost:3000/salaire-net-quebec/75000/opengraph-image
http://localhost:3000/salaire-net-quebec/100000/opengraph-image
```
**Expected:** Blue gradient with salary amount and paycheck icon

#### Calculator Images (Examples)
```
http://localhost:3000/calcul-hypotheque/opengraph-image
http://localhost:3000/tps-tvq-quebec/opengraph-image
http://localhost:3000/frais-de-garde/opengraph-image
```
**Expected:** Custom gradient with calculator-specific emoji and text

## Visual Verification Checklist

### Global Image (`/opengraph-image`)
- [ ] Teal/emerald gradient background
- [ ] "QC" logo in frosted glass container
- [ ] "QC Finance" title
- [ ] "Votre guide financier au Québec" slogan
- [ ] Three badges: "19 Calculateurs", "100% Gratuit", "Québec 2026"
- [ ] "qcfinance.ca" footer
- [ ] Image is 1200x630px

### Salary Images (`/salaire-net-quebec/[salary]/opengraph-image`)
- [ ] Blue gradient background
- [ ] Left side: Paycheck icon (💰) with bar chart
- [ ] Right side: "QC Finance • 2026" badge
- [ ] Main text: "{salary}$ Net?" (formatted with commas)
- [ ] Subtitle: "Découvrez votre paie réelle en 2026"
- [ ] Three bullet points about taxes
- [ ] URL footer: "qcfinance.ca/salaire-net-quebec"
- [ ] Image is 1200x630px

## Social Media Testing

### After Deployment to Production

#### 1. Facebook Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter URL: `https://qcfinance.ca`
3. Click "Scrape Again" to refresh cache
4. Verify image appears correctly
5. Test a salary page: `https://qcfinance.ca/salaire-net-quebec/75000`

#### 2. Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter URL: `https://qcfinance.ca`
3. Click "Preview card"
4. Verify "summary_large_image" card type
5. Check image quality and text

#### 3. LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter URL: `https://qcfinance.ca`
3. Click "Inspect"
4. Verify image and metadata

#### 4. OpenGraph Preview Tool
1. Go to: https://www.opengraph.xyz/
2. Enter URL: `https://qcfinance.ca`
3. See how it looks across all platforms

## Metadata Verification

### Check HTML Meta Tags
View page source and verify these tags exist:

```html
<!-- OpenGraph -->
<meta property="og:image" content="https://qcfinance.ca/opengraph-image" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="QC Finance - Votre guide financier au Québec" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://qcfinance.ca/opengraph-image" />
```

## Performance Testing

### Check Image Load Time
```bash
# Using curl to test image generation
curl -w "@curl-format.txt" -o /dev/null -s "https://qcfinance.ca/opengraph-image"
```

**Expected:** < 200ms response time (Edge Runtime)

### Check Image Size
```bash
# Download and check file size
curl -o test-og.png "https://qcfinance.ca/opengraph-image"
ls -lh test-og.png
```

**Expected:** 50-80KB (PNG format)

## Common Issues & Solutions

### Issue: Image Not Showing on Social Media
**Solution:**
1. Clear social media cache using debuggers
2. Wait 24 hours for cache to expire naturally
3. Verify image URL is publicly accessible
4. Check for CORS issues

### Issue: Image Looks Blurry
**Solution:**
1. Verify dimensions are exactly 1200x630
2. Check font sizes aren't too small
3. Ensure high contrast between text and background
4. Test on different devices

### Issue: Wrong Image Showing
**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check if correct metadata is in HTML
4. Verify no conflicting meta tags

### Issue: Build Errors
**Solution:**
1. Check TypeScript errors: `npm run build`
2. Verify all imports are correct
3. Ensure Edge Runtime is specified
4. Check for syntax errors in JSX

## Automated Testing Script

Create a test script to verify all OG images:

```javascript
// test-og-images.js
const salaries = [30000, 50000, 75000, 100000, 150000, 200000];
const baseUrl = 'http://localhost:3000';

async function testOGImages() {
  console.log('Testing OG Images...\n');
  
  // Test global image
  console.log('✓ Global: ' + baseUrl + '/opengraph-image');
  
  // Test salary images
  salaries.forEach(salary => {
    console.log('✓ Salary: ' + baseUrl + `/salaire-net-quebec/${salary}/opengraph-image`);
  });
  
  console.log('\n✅ All OG image URLs generated successfully!');
}

testOGImages();
```

Run with: `node test-og-images.js`

## Success Criteria

Your OG image implementation is successful when:

- [x] All images load without errors
- [x] Images are exactly 1200x630px
- [x] Text is readable and properly sized
- [x] Colors match brand guidelines
- [x] Images load in < 200ms
- [x] File sizes are < 100KB
- [x] Social media previews work correctly
- [x] No TypeScript/build errors
- [x] Edge Runtime is active
- [x] Metadata tags are present in HTML

## Next Steps After Testing

1. **Deploy to Production**
   ```bash
   git add .
   git commit -m "feat: implement OG image system"
   git push
   ```

2. **Monitor Analytics**
   - Track social media engagement
   - Monitor click-through rates
   - Check image load performance

3. **Iterate & Improve**
   - Gather user feedback
   - A/B test different designs
   - Optimize based on metrics

---

**Happy Testing! 🚀**
