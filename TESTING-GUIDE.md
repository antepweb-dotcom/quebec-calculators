# Testing Guide - Admin Panel & Database Integration

## Prerequisites

1. Valid Supabase PostgreSQL connection string in `.env`
2. Prisma client generated: `npm run db:generate`
3. Database schema pushed: `npm run db:push`

## Step 1: Initialize Database

Run the initialization script to create default config and sample data:

```bash
npm run db:init
```

This will:
- Create a default SiteConfig record (id=1)
- Add sample analytics data
- Verify database connection

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Test Admin Panel

### Access Admin Panel
Navigate to: `http://localhost:3000/admin`

### Test Overview Section
- Should display total page views
- Should show estimated revenue
- Should render traffic chart (if data exists)
- All stats should load from database

### Test Analytics Section
- Should display top 5 visited pages
- Should show view counts from database
- Table should be sortable and responsive

### Test Ads Manager
1. Toggle "Enable All Ads" switch
2. Enter AdSense Publisher ID (e.g., `ca-pub-1234567890123456`)
3. Enter Banner Slot ID (e.g., `1234567890`)
4. Click "Save Changes"
5. Verify success toast appears
6. Refresh page - settings should persist

### Test Alerts Section
1. Toggle "Show Alert Bar" switch
2. Enter a message (e.g., "Maintenance scheduled tonight")
3. Click "Save Changes"
4. Verify success toast appears
5. Check preview appears below form

## Step 4: Test Public Site Integration

### Test Alert Banner
1. In admin panel, enable alert and save
2. Navigate to homepage: `http://localhost:3000`
3. Alert banner should appear at top of page
4. Disable alert in admin panel
5. Refresh homepage - banner should disappear

### Test AdSense Integration
1. In admin panel, enable ads and add valid AdSense ID
2. Save changes
3. Navigate to any public page
4. Check page source - AdSense script should be present
5. Verify script URL contains your publisher ID

### Test Page Tracking
1. Visit several different pages on the site
2. Return to admin panel analytics section
3. Verify new visits appear in the database
4. Check that page paths are recorded correctly

## Step 5: Database Verification

### Using Prisma Studio
```bash
npm run db:studio
```

This opens a GUI at `http://localhost:5555` where you can:
- View all SiteConfig records
- Browse Analytics data
- Manually edit records
- Verify data integrity

### Using SQL Queries
Connect to your Supabase database and run:

```sql
-- Check site config
SELECT * FROM "SiteConfig";

-- Count total analytics records
SELECT COUNT(*) FROM "Analytics";

-- Top 5 visited pages
SELECT path, COUNT(*) as visits 
FROM "Analytics" 
GROUP BY path 
ORDER BY visits DESC 
LIMIT 5;

-- Views in last 30 days
SELECT COUNT(*) 
FROM "Analytics" 
WHERE created_at >= NOW() - INTERVAL '30 days';
```

## Step 6: Error Handling Tests

### Test Database Connection Failure
1. Temporarily change DATABASE_URL to invalid connection
2. Try accessing admin panel
3. Should show error message gracefully
4. Restore correct DATABASE_URL

### Test Empty Database
1. Delete all Analytics records
2. Admin panel should still load
3. Should show 0 views
4. Charts should handle empty data

### Test Invalid Form Data
1. Try saving ads config with empty fields
2. Try saving very long alert messages
3. Verify validation and error handling

## Step 7: Performance Tests

### Load Testing
1. Create 1000+ analytics records
2. Check admin panel load time
3. Verify pagination/limits work correctly

### Concurrent Updates
1. Open admin panel in two browser tabs
2. Make changes in both tabs
3. Verify last save wins
4. Check for race conditions

## Expected Results

✅ All database operations should complete successfully
✅ Admin panel should load within 2 seconds
✅ Changes should reflect immediately after save
✅ Public site should show/hide elements based on config
✅ Page tracking should work on all routes
✅ No TypeScript errors
✅ No console errors in browser
✅ Responsive design works on mobile

## Troubleshooting

### "Database connection failed"
- Check DATABASE_URL in .env
- Verify Supabase credentials
- Test connection with `npx prisma db push`

### "Prisma Client not generated"
- Run `npm run db:generate`
- Restart development server

### "Changes not reflecting"
- Check browser cache
- Verify revalidatePath is working
- Check server logs for errors

### "Analytics not tracking"
- Verify PageTracker component is mounted
- Check browser console for errors
- Ensure trackVisit action is being called

## Next Steps

After successful testing:
1. Add authentication to admin panel
2. Implement role-based access control
3. Add more analytics metrics
4. Create backup/restore functionality
5. Set up monitoring and alerts
