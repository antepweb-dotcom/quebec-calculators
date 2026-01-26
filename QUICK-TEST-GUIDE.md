# Quick Test Guide - Admin Panel

## Prerequisites

1. **Valid DATABASE_URL** in `.env`
2. **Prisma Client generated**
3. **Database schema pushed**

## Setup (One-Time)

```bash
# 1. Generate Prisma Client
npm run db:generate

# 2. Push schema to database
npm run db:push

# 3. Initialize with default data
npm run db:init

# 4. Start development server
npm run dev
```

## Test Scenarios

### Scenario 1: Empty Database

**Expected Behavior:**
1. Visit `http://localhost:3000/admin`
2. Should see:
   - ✅ Total Views: 0
   - ✅ Recent Views: 0
   - ✅ Estimated Revenue: $0.00
   - ✅ Estimated Clicks: 0
   - ✅ "No Data Yet" message
   - ✅ No chart displayed
   - ✅ No table displayed
   - ✅ Forms are visible and functional

**Test:**
```bash
# Clear database (optional)
npx prisma db push --force-reset

# Visit admin panel
# Should show empty state
```

### Scenario 2: Configure Ads

**Steps:**
1. Visit admin panel
2. Toggle "Enable All Ads" ON
3. Enter AdSense ID: `ca-pub-1234567890123456`
4. Enter Banner Slot ID: `9876543210`
5. Click "Save All Changes"

**Expected:**
- ✅ Button shows "Saving..."
- ✅ Toast notification appears: "Changes saved successfully!"
- ✅ Page refreshes automatically
- ✅ Form fields retain values

**Verify in Database:**
```bash
npm run db:studio
# Check SiteConfig table
# isAdsEnabled should be true
# adSenseId should be saved
```

**Verify on Public Site:**
```bash
# Visit homepage
# View page source (Ctrl+U)
# Search for "adsbygoogle"
# Should see script tag with your AdSense ID
```

### Scenario 3: Create Alert

**Steps:**
1. Visit admin panel
2. Toggle "Show Alert Bar" ON
3. Enter message: "Welcome to our site!"
4. See preview appear
5. Click "Save All Changes"

**Expected:**
- ✅ Preview shows immediately
- ✅ Toast notification on save
- ✅ Changes persist

**Verify on Public Site:**
```bash
# Visit homepage
# Should see blue alert banner at top
# Message should display correctly
```

### Scenario 4: Generate Analytics Data

**Steps:**
1. Visit various pages:
   ```
   http://localhost:3000/
   http://localhost:3000/calcul-hypotheque
   http://localhost:3000/salaire-net-quebec
   http://localhost:3000/tps-tvq-quebec
   http://localhost:3000/capacite-emprunt
   ```

2. Refresh admin panel

**Expected:**
- ✅ Total Views increases
- ✅ Recent Views increases
- ✅ Chart appears with data
- ✅ Table shows top pages
- ✅ "No Data Yet" message disappears

**Verify in Database:**
```bash
npm run db:studio
# Check Analytics table
# Should see records for each visit
```

### Scenario 5: View Statistics

**After generating data:**

**Expected to see:**
- ✅ Total Views: 5 (or more)
- ✅ Recent Views: 5 (or more)
- ✅ Estimated Revenue: $0.13 (5 * $0.025)
- ✅ Estimated Clicks: 0 (5 * 0.024 = 0.12, rounded down)
- ✅ Chart with daily breakdown
- ✅ Table with top 5 pages

### Scenario 6: Update Configuration

**Steps:**
1. Change AdSense ID
2. Toggle ads OFF
3. Change alert message
4. Toggle alert OFF
5. Click "Save All Changes"

**Expected:**
- ✅ All changes save
- ✅ Toast notification
- ✅ Public site updates immediately

**Verify:**
```bash
# Visit homepage
# Alert should be gone
# AdSense script should be gone (view source)
```

### Scenario 7: Form Validation

**Steps:**
1. Toggle "Enable All Ads" ON
2. Leave AdSense ID empty
3. Click "Save All Changes"

**Expected:**
- ✅ Error message appears
- ✅ "AdSense ID is required when ads are enabled"
- ✅ Changes not saved

### Scenario 8: Multiple Visits Same Page

**Steps:**
1. Visit `/calcul-hypotheque` 10 times
2. Refresh admin panel

**Expected:**
- ✅ Total Views: +10
- ✅ `/calcul-hypotheque` at top of table
- ✅ Count shows 10+ views

## Quick Checks

### ✅ Database Connection
```bash
npx prisma db push
# Should succeed without errors
```

### ✅ Server Actions Working
```bash
# Check browser console
# Should see no errors
# Network tab should show no failed requests
```

### ✅ Cache Revalidation
```bash
# Save changes in admin
# Visit public site
# Changes should appear immediately (no hard refresh needed)
```

### ✅ TypeScript Errors
```bash
npx tsc --noEmit
# Should show no errors
```

## Common Issues

### Issue: "No Data Yet" persists after visiting pages

**Solution:**
1. Check PageTracker is in layout.tsx
2. Check browser console for errors
3. Verify trackVisit() is being called
4. Check database for Analytics records

### Issue: Changes not saving

**Solution:**
1. Check browser console for errors
2. Verify DATABASE_URL is correct
3. Check server logs
4. Verify FormData field names match

### Issue: Stats show 0 despite data

**Solution:**
1. Check getDashboardStats() return value
2. Verify Analytics table has records
3. Check date calculations (30 days ago)
4. Refresh page (hard refresh: Ctrl+Shift+R)

### Issue: Chart not displaying

**Solution:**
1. Verify dailyViews has data
2. Check chartData.length > 0
3. Verify Recharts is installed
4. Check browser console for errors

## Performance Tests

### Load Time
```bash
# Admin panel should load in < 2 seconds
# Even with 1000+ analytics records
```

### Form Submission
```bash
# Should complete in < 1 second
# Toast should appear immediately
```

### Database Queries
```bash
# Check Prisma logs
# All queries should be < 100ms
```

## Success Criteria

- ✅ Empty state displays correctly
- ✅ Stats update after page visits
- ✅ Chart renders with data
- ✅ Table shows top pages
- ✅ Forms save to database
- ✅ Toast notifications work
- ✅ Error handling works
- ✅ Public site reflects changes
- ✅ No console errors
- ✅ No TypeScript errors

## Next Steps After Testing

1. **Add Authentication**
   - Install NextAuth or Clerk
   - Protect /admin route
   - Add login page

2. **Add More Features**
   - Pagination for analytics
   - Date range filters
   - Export data to CSV
   - More chart types

3. **Optimize Performance**
   - Add Redis caching
   - Implement pagination
   - Add database indexes

4. **Deploy to Production**
   - Set environment variables
   - Run migrations
   - Test in production
   - Monitor errors

## Troubleshooting Commands

```bash
# View database
npm run db:studio

# Check Prisma schema
npx prisma validate

# Reset database (⚠️ deletes all data)
npx prisma db push --force-reset

# View server logs
# Check terminal running `npm run dev`

# Check build
npm run build

# Test production build
npm run build && npm run start
```

## Contact Points

If issues persist:
1. Check TROUBLESHOOTING.md
2. Review ADMIN-PAGE-REFACTOR.md
3. Check FIX-SUMMARY.md
4. Verify DATABASE-SETUP.md steps

---

**Happy Testing! 🚀**
