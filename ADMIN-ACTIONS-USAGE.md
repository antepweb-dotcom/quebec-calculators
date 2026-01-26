# Admin Actions Usage Guide

## Overview

The `app/actions/adminActions.ts` file provides server-side functions for managing the admin panel and site configuration.

## Functions

### 1. getDashboardStats()

Fetches analytics statistics from the database.

**Returns:**
```typescript
{
  totalViews: number                              // Total page views (all time)
  recentViews: number                             // Views in last 30 days
  topPaths: Array<{ path: string; count: number }> // Top 5 visited pages
  dailyViews: Array<{ date: Date; count: number }> // Daily views for last 30 days
}
```

**Usage Example:**
```typescript
import { getDashboardStats } from '@/app/actions/adminActions'

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  
  return (
    <div>
      <h1>Total Views: {stats.totalViews}</h1>
      <h2>Recent Views (30d): {stats.recentViews}</h2>
      
      <h3>Top Pages:</h3>
      <ul>
        {stats.topPaths.map((item, i) => (
          <li key={i}>{item.path}: {item.count} views</li>
        ))}
      </ul>
      
      <h3>Daily Trend:</h3>
      <ul>
        {stats.dailyViews.map((item, i) => (
          <li key={i}>{item.date.toLocaleDateString()}: {item.count} views</li>
        ))}
      </ul>
    </div>
  )
}
```

**Error Handling:**
- Returns empty arrays and zeros if database is empty or error occurs
- Logs errors to console

---

### 2. getSiteConfig()

Fetches site configuration (ads, alerts) from database.

**Returns:**
```typescript
{
  id: number
  isAdsEnabled: boolean
  adSenseId: string
  bannerSlotId: string
  alertMessage: string
  isAlertActive: boolean
}
```

**Usage Example:**
```typescript
import { getSiteConfig } from '@/app/actions/adminActions'

export default async function Layout({ children }) {
  const config = await getSiteConfig()
  
  return (
    <>
      {config.isAlertActive && (
        <div className="alert">{config.alertMessage}</div>
      )}
      {children}
    </>
  )
}
```

**Default Values:**
- If no config exists in database, returns default values
- `isAdsEnabled: true`
- `isAlertActive: false`
- All string fields: empty strings

---

### 3. updateSiteConfig(formData)

Updates site configuration in database and revalidates cache.

**Parameters:**
```typescript
formData: FormData containing:
  - adsEnabled: 'true' | 'false'
  - adSenseId: string
  - bannerSlotId: string
  - alertMessage: string
  - alertActive: 'true' | 'false'
```

**Returns:**
```typescript
{
  success: boolean
  error?: string  // Only present if success is false
}
```

**Usage Example (Client Component):**
```typescript
'use client'

import { updateSiteConfig } from '@/app/actions/adminActions'

export default function AdminForm() {
  async function handleSubmit(formData: FormData) {
    const result = await updateSiteConfig(formData)
    
    if (result.success) {
      alert('Settings saved!')
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  return (
    <form action={handleSubmit}>
      <label>
        <input type="checkbox" name="adsEnabled" value="true" />
        Enable Ads
      </label>
      
      <input 
        type="text" 
        name="adSenseId" 
        placeholder="ca-pub-xxxxxxxxxxxxxxxx" 
      />
      
      <input 
        type="text" 
        name="bannerSlotId" 
        placeholder="1234567890" 
      />
      
      <textarea 
        name="alertMessage" 
        placeholder="Alert message"
      />
      
      <label>
        <input type="checkbox" name="alertActive" value="true" />
        Show Alert
      </label>
      
      <button type="submit">Save</button>
    </form>
  )
}
```

**Validation:**
- Validates that AdSense ID is provided when ads are enabled
- Returns error if validation fails

**Cache Revalidation:**
- Automatically calls `revalidatePath('/', 'layout')` after successful update
- Changes reflect immediately on public site

---

### 4. trackVisit(path)

Records a page visit for analytics.

**Parameters:**
```typescript
path: string  // Page path (e.g., "/calcul-impot")
```

**Returns:**
```typescript
{
  success: boolean
}
```

**Usage Example (Client Component):**
```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVisit } from '@/app/actions/adminActions'

export default function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackVisit(pathname)
    }
  }, [pathname])

  return null
}
```

---

## Type Safety

All functions have explicit TypeScript return types:
- ✅ No `any` types
- ✅ Strict null checks
- ✅ Type-safe Prisma queries
- ✅ FormData type validation

## Error Handling

All functions include comprehensive error handling:
- ✅ Try-catch blocks
- ✅ Console error logging
- ✅ Graceful fallbacks
- ✅ User-friendly error messages

## Database Operations

### Prisma Methods Used

1. **`prisma.analytics.count()`**
   - Counts total records
   - Supports `where` clause for filtering

2. **`prisma.analytics.groupBy()`**
   - Groups records by field
   - Supports aggregation (`_count`)
   - Supports ordering and limiting

3. **`prisma.siteConfig.findFirst()`**
   - Finds first matching record
   - Returns `null` if not found

4. **`prisma.siteConfig.upsert()`**
   - Updates if record exists
   - Creates if record doesn't exist
   - Atomic operation

5. **`prisma.analytics.create()`**
   - Creates new record
   - Auto-generates UUID and timestamp

## Performance Considerations

- All queries are indexed (see `prisma/schema.prisma`)
- Count operations are optimized by PostgreSQL
- GroupBy uses database-level aggregation
- Upsert is atomic (no race conditions)

## Security Notes

⚠️ **Important**: These actions have NO authentication!

Before production:
1. Add authentication middleware
2. Validate user permissions
3. Sanitize all inputs
4. Add rate limiting
5. Implement CSRF protection

## Testing

```typescript
// Test getDashboardStats
const stats = await getDashboardStats()
console.log(stats) 
// {
//   totalViews: 0,
//   recentViews: 0,
//   topPaths: [],
//   dailyViews: []
// }

// Test getSiteConfig
const config = await getSiteConfig()
console.log(config) // { id: 1, isAdsEnabled: true, ... }

// Test updateSiteConfig
const formData = new FormData()
formData.append('adsEnabled', 'true')
formData.append('adSenseId', 'ca-pub-123')
formData.append('bannerSlotId', '456')
formData.append('alertMessage', 'Test alert')
formData.append('alertActive', 'false')

const result = await updateSiteConfig(formData)
console.log(result) // { success: true }

// Test trackVisit
const visitResult = await trackVisit('/test-page')
console.log(visitResult) // { success: true }
```

## Common Issues

### Issue: "Prisma Client not found"
**Solution:** Run `npm run db:generate`

### Issue: "Database connection failed"
**Solution:** Check DATABASE_URL in `.env`

### Issue: "Changes not reflecting"
**Solution:** Verify `revalidatePath()` is being called

### Issue: "FormData values are null"
**Solution:** Ensure form field names match exactly

## Next Steps

1. Add authentication to protect these actions
2. Implement input validation with Zod
3. Add rate limiting
4. Create audit logging
5. Add unit tests
