# Troubleshooting Guide

## Common Issues and Solutions

### 1. Database Connection Issues

#### Error: "Database connection failed"
```
Error: Schema engine error: FATAL: Tenant or user not found
```

**Solutions:**
1. Verify DATABASE_URL in `.env` file
2. Check Supabase credentials are correct
3. Ensure database is not paused (Supabase free tier)
4. Test connection: `npx prisma db push`

**Check connection string format:**
```env
# Correct format
DATABASE_URL="postgresql://user:password@host:port/database"

# Common mistakes
DATABASE_URL=postgresql://...  # Missing quotes
DATABASE_URL="postgres://..."  # Wrong protocol (use postgresql)
```

#### Error: "Prisma Client not generated"
```
Error: Cannot find module '@prisma/client'
```

**Solution:**
```bash
npm run db:generate
# or
npx prisma generate
```

#### Error: "Connection pool timeout"
```
Error: Can't reach database server
```

**Solutions:**
1. Check if database is running
2. Verify firewall rules
3. Check connection pool settings
4. Restart Prisma: `npx prisma generate && npm run dev`

---

### 2. Admin Panel Issues

#### Admin panel shows "Loading..." forever

**Possible causes:**
1. Database connection failed
2. Server action error
3. JavaScript error

**Debug steps:**
```bash
# 1. Check browser console for errors
# Open DevTools → Console

# 2. Check server logs
# Terminal running `npm run dev`

# 3. Test server actions directly
# Add console.log in adminActions.ts

# 4. Verify database has data
npm run db:studio
```

#### Changes not saving

**Check:**
1. Browser console for errors
2. Network tab for failed requests
3. Database write permissions
4. FormData is being sent correctly

**Debug:**
```typescript
// Add to updateSiteConfig in adminActions.ts
console.log('Received formData:', {
  isAdsEnabled: formData.get('isAdsEnabled'),
  adSenseId: formData.get('adSenseId'),
  // ... other fields
})
```

#### Stats showing 0 views

**Possible causes:**
1. No analytics data in database
2. Query error
3. Date calculation issue

**Solutions:**
```bash
# 1. Check if Analytics table has data
npm run db:studio
# Navigate to Analytics table

# 2. Add sample data
npm run db:init

# 3. Visit some pages to generate data
# Then refresh admin panel
```

---

### 3. Public Site Issues

#### Alert banner not showing

**Checklist:**
- [ ] `isAlertActive` is `true` in database
- [ ] `alertMessage` is not empty
- [ ] GlobalWrapper is in layout.tsx
- [ ] No CSS hiding the banner
- [ ] Cache cleared (hard refresh: Ctrl+Shift+R)

**Debug:**
```typescript
// Add to GlobalWrapper.tsx
console.log('Config:', config)
console.log('Should show alert:', config.isAlertActive && config.alertMessage)
```

#### AdSense script not loading

**Checklist:**
- [ ] `isAdsEnabled` is `true` in database
- [ ] `adSenseId` is not empty
- [ ] AdSense ID format is correct: `ca-pub-xxxxxxxxxxxxxxxx`
- [ ] No ad blockers active
- [ ] Check page source for script tag

**Verify script:**
```html
<!-- Should see this in page source -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"></script>
```

#### Page visits not being tracked

**Checklist:**
- [ ] PageTracker component in layout.tsx
- [ ] No JavaScript errors in console
- [ ] Database write permissions
- [ ] trackVisit action working

**Debug:**
```typescript
// Add to PageTracker.tsx
useEffect(() => {
  console.log('Tracking visit:', pathname)
  if (pathname) {
    trackVisit(pathname).then(result => {
      console.log('Track result:', result)
    })
  }
}, [pathname])
```

---

### 4. TypeScript Errors

#### Error: "Type 'X' is not assignable to type 'Y'"

**Solution:**
```bash
# Regenerate Prisma types
npm run db:generate

# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### Error: "Cannot find module '@/...'

**Check:**
1. `tsconfig.json` has correct paths
2. File exists at specified path
3. Import path is correct

**tsconfig.json should have:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### 5. Build Errors

#### Error during `npm run build`

**Common causes:**
1. TypeScript errors
2. Missing environment variables
3. Database connection issues

**Solutions:**
```bash
# 1. Check for TypeScript errors
npm run lint

# 2. Ensure DATABASE_URL is set
echo $DATABASE_URL  # Linux/Mac
echo %DATABASE_URL%  # Windows

# 3. Generate Prisma Client
npm run db:generate

# 4. Try building again
npm run build
```

#### Error: "Module not found"

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

### 6. Performance Issues

#### Admin panel loading slowly

**Possible causes:**
1. Large Analytics table (millions of rows)
2. Missing database indexes
3. Slow queries

**Solutions:**
```sql
-- Add indexes
CREATE INDEX idx_analytics_path ON "Analytics"(path);
CREATE INDEX idx_analytics_created_at ON "Analytics"(created_at);

-- Check query performance
EXPLAIN ANALYZE SELECT path, COUNT(*) 
FROM "Analytics" 
GROUP BY path;
```

**Implement pagination:**
```typescript
// In getDashboardStats
const topPaths = await prisma.analytics.groupBy({
  by: ['path'],
  _count: { path: true },
  orderBy: { _count: { path: 'desc' } },
  take: 10,  // Limit results
  skip: 0    // For pagination
})
```

#### High database CPU usage

**Solutions:**
1. Add indexes on frequently queried columns
2. Implement caching (Redis)
3. Optimize queries
4. Archive old analytics data

---

### 7. Development Issues

#### Hot reload not working

**Solutions:**
```bash
# 1. Restart dev server
# Ctrl+C then npm run dev

# 2. Clear Next.js cache
rm -rf .next

# 3. Check for file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Changes not reflecting

**Check:**
1. File saved correctly
2. No syntax errors
3. Server restarted
4. Browser cache cleared

**Force refresh:**
- Chrome/Edge: Ctrl+Shift+R
- Firefox: Ctrl+F5
- Safari: Cmd+Shift+R

---

### 8. Prisma Issues

#### Error: "Migration failed"

**Solution:**
```bash
# Use db push instead of migrate (for development)
npm run db:push

# If that fails, reset database (⚠️ deletes all data)
npx prisma db push --force-reset
```

#### Error: "Prisma schema validation failed"

**Check:**
1. Schema syntax is correct
2. All required fields present
3. No duplicate model names

**Validate schema:**
```bash
npx prisma validate
```

#### Error: "Multiple Prisma Client instances"

**Solution:**
Already handled with singleton pattern in `lib/prisma.ts`

If still occurring:
```typescript
// Ensure you're importing from lib/prisma.ts
import { prisma } from '@/lib/prisma'

// NOT creating new instances
// ❌ const prisma = new PrismaClient()
```

---

### 9. Environment Variable Issues

#### Error: "DATABASE_URL is not defined"

**Solutions:**
```bash
# 1. Check .env file exists
ls -la .env

# 2. Verify content
cat .env

# 3. Restart dev server (required after .env changes)
npm run dev

# 4. For production, set in hosting platform
# Vercel: Settings → Environment Variables
# Netlify: Site settings → Environment variables
```

#### Variables not loading

**Check:**
1. File named exactly `.env` (not `.env.txt`)
2. No spaces around `=`
3. Values in quotes if they contain special characters
4. Server restarted after changes

**Correct format:**
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

### 10. Deployment Issues

#### Build succeeds locally but fails on Vercel

**Common causes:**
1. Environment variables not set
2. Different Node.js version
3. Missing dependencies

**Solutions:**
```bash
# 1. Set environment variables in Vercel dashboard
# Settings → Environment Variables → Add

# 2. Specify Node.js version in package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}

# 3. Ensure all dependencies in package.json
npm install --save-exact
```

#### Database connection fails in production

**Check:**
1. DATABASE_URL set in production environment
2. Database allows connections from Vercel IPs
3. Connection string uses correct host (not localhost)
4. SSL mode configured if required

**Supabase connection string for production:**
```env
# Use connection pooler for serverless
DATABASE_URL="postgresql://user:pass@host.pooler.supabase.com:6543/postgres"
```

---

## Debugging Tools

### 1. Prisma Studio
```bash
npm run db:studio
```
- Visual database browser
- Edit records directly
- View relationships
- Export data

### 2. Browser DevTools
- **Console**: JavaScript errors
- **Network**: API requests
- **Application**: Local storage, cookies
- **Performance**: Load times

### 3. Server Logs
```bash
# Development
npm run dev
# Watch for console.log and errors

# Production (Vercel)
# Dashboard → Deployments → View Function Logs
```

### 4. Database Logs
```sql
-- Supabase Dashboard → Database → Logs
-- View slow queries, errors, connections
```

---

## Getting Help

### Before asking for help:

1. **Check error message carefully**
   - Read the full error
   - Note the file and line number
   - Check stack trace

2. **Search existing issues**
   - GitHub issues
   - Stack Overflow
   - Prisma discussions

3. **Gather information**
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version)
   - Relevant code snippets

4. **Try minimal reproduction**
   - Isolate the problem
   - Remove unrelated code
   - Test in clean environment

### Resources:

- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stack Overflow**: Tag questions with `prisma`, `nextjs`, `supabase`

---

## Prevention Tips

### 1. Always use version control
```bash
git init
git add .
git commit -m "Working state"
```

### 2. Test before deploying
```bash
npm run build
npm run start
# Test production build locally
```

### 3. Keep dependencies updated
```bash
npm outdated
npm update
```

### 4. Monitor production
- Set up error tracking (Sentry)
- Monitor database performance
- Check logs regularly

### 5. Backup database
```bash
# Supabase: Dashboard → Database → Backups
# Enable automatic backups
```

---

## Emergency Procedures

### If production is down:

1. **Immediate**: Revert to last working deployment
2. **Check**: Error logs and monitoring
3. **Identify**: Root cause
4. **Fix**: In development environment
5. **Test**: Thoroughly before redeploying
6. **Deploy**: With monitoring active
7. **Verify**: All functionality working

### If database is corrupted:

1. **Stop**: All write operations
2. **Backup**: Current state (even if corrupted)
3. **Restore**: From last known good backup
4. **Verify**: Data integrity
5. **Resume**: Operations
6. **Investigate**: Root cause

### If data is lost:

1. **Don't panic**: Check backups first
2. **Supabase**: Point-in-time recovery available
3. **Restore**: To specific timestamp
4. **Verify**: Restored data
5. **Document**: What happened and how to prevent
