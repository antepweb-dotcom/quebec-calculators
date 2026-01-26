# System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           BROWSER (Client)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────┐              ┌─────────────────────────┐   │
│  │   Public Pages     │              │    Admin Panel          │   │
│  │   (Server)         │              │    (Client)             │   │
│  ├────────────────────┤              ├─────────────────────────┤   │
│  │ - GlobalWrapper    │              │ - Dashboard             │   │
│  │ - PageTracker      │              │ - Analytics View        │   │
│  │ - Alert Banner     │              │ - Ads Manager           │   │
│  │ - AdSense Script   │              │ - Alerts Manager        │   │
│  └────────────────────┘              └─────────────────────────┘   │
│           │                                      │                  │
└───────────┼──────────────────────────────────────┼──────────────────┘
            │                                      │
            │ Server Actions                       │ Server Actions
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER (Edge/Node)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              Server Actions (app/actions/)                    │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  getSiteConfig()        - Fetch configuration                │  │
│  │  updateSiteConfig()     - Update configuration               │  │
│  │  trackVisit()           - Record page visit                  │  │
│  │  getDashboardStats()    - Aggregate analytics                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              │ Prisma Client                         │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Prisma ORM (lib/prisma.ts)                  │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  - Type-safe queries                                          │  │
│  │  - Connection pooling                                         │  │
│  │  - Singleton pattern                                          │  │
│  │  - Auto-generated types                                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │ SQL Queries
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL Database)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────┐         ┌──────────────────────────┐   │
│  │   SiteConfig Table     │         │   Analytics Table        │   │
│  ├────────────────────────┤         ├──────────────────────────┤   │
│  │ id (1)                 │         │ id (UUID)                │   │
│  │ isAdsEnabled           │         │ path (String)            │   │
│  │ adSenseId              │         │ createdAt (DateTime)     │   │
│  │ bannerSlotId           │         │                          │   │
│  │ alertMessage           │         │ Indexes:                 │   │
│  │ isAlertActive          │         │ - path                   │   │
│  └────────────────────────┘         │ - createdAt              │   │
│                                     └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

### 1. Page Visit Flow
```
User visits page
    ↓
PageTracker (Client Component)
    ↓
usePathname() hook gets current path
    ↓
trackVisit(path) Server Action
    ↓
Prisma Client
    ↓
INSERT INTO Analytics (path, createdAt)
    ↓
Database Record Created
```

### 2. Alert Banner Flow
```
Page Load
    ↓
GlobalWrapper (Server Component)
    ↓
getSiteConfig() Server Action
    ↓
Prisma Client
    ↓
SELECT * FROM SiteConfig WHERE id = 1
    ↓
Check isAlertActive && alertMessage
    ↓
Conditionally Render Alert Banner
```

### 3. Admin Update Flow
```
Admin changes settings
    ↓
Form submission
    ↓
updateSiteConfig(formData) Server Action
    ↓
Prisma Client
    ↓
UPSERT INTO SiteConfig
    ↓
revalidatePath('/') - Clear cache
    ↓
Success response
    ↓
Toast notification
    ↓
Reload data
```

### 4. Analytics Dashboard Flow
```
Admin opens dashboard
    ↓
getDashboardStats() Server Action
    ↓
Prisma Client (Multiple Queries)
    ├─ COUNT(*) FROM Analytics
    ├─ COUNT(*) WHERE createdAt >= 30 days ago
    ├─ GROUP BY path ORDER BY count DESC LIMIT 5
    └─ GROUP BY DATE(createdAt) for chart data
    ↓
Aggregate results
    ↓
Return formatted data
    ↓
Render charts and tables
```

## Data Models

### SiteConfig (Singleton)
```typescript
model SiteConfig {
  id             Int     @id @default(1)
  isAdsEnabled   Boolean @default(true)
  adSenseId      String  @default("")
  bannerSlotId   String  @default("")
  alertMessage   String  @default("")
  isAlertActive  Boolean @default(false)
}
```

**Purpose**: Store global site settings
**Access Pattern**: Single row, frequent reads, infrequent writes
**Caching**: Next.js automatic caching with revalidation

### Analytics
```typescript
model Analytics {
  id        String   @id @default(uuid())
  path      String
  createdAt DateTime @default(now())
}
```

**Purpose**: Track page visits
**Access Pattern**: High write volume, aggregated reads
**Indexes**: path, createdAt for fast queries
**Retention**: Consider archiving old data

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  - React Components                     │
│  - Tailwind CSS                         │
│  - Recharts                             │
│  - Lucide Icons                         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│  - Next.js 14 (App Router)              │
│  - Server Components                    │
│  - Client Components                    │
│  - Server Actions                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  - adminActions.ts                      │
│  - Type-safe operations                 │
│  - Error handling                       │
│  - Cache management                     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│  - Prisma ORM                           │
│  - Type generation                      │
│  - Query optimization                   │
│  - Connection pooling                   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Database Layer                  │
│  - Supabase (PostgreSQL)                │
│  - ACID transactions                    │
│  - Indexes                              │
│  - Backups                              │
└─────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ⚠️  MISSING: Authentication Layer                       │
│  ├─ TODO: Add NextAuth/Clerk                            │
│  ├─ TODO: Protect /admin route                          │
│  └─ TODO: Role-based access control                     │
│                                                          │
│  ✅  Input Validation                                    │
│  ├─ FormData type checking                              │
│  ├─ Prisma schema validation                            │
│  └─ TypeScript compile-time checks                      │
│                                                          │
│  ✅  SQL Injection Prevention                            │
│  ├─ Prisma parameterized queries                        │
│  └─ No raw SQL with user input                          │
│                                                          │
│  ✅  XSS Prevention                                      │
│  ├─ React automatic escaping                            │
│  └─ No dangerouslySetInnerHTML                          │
│                                                          │
│  ⚠️  MISSING: CSRF Protection                            │
│  └─ TODO: Add CSRF tokens                               │
│                                                          │
│  ⚠️  MISSING: Rate Limiting                              │
│  └─ TODO: Implement rate limits                         │
│                                                          │
│  ✅  Environment Variables                               │
│  ├─ DATABASE_URL in .env                                │
│  └─ Not committed to git                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Performance Optimization

### Caching Strategy
```
┌─────────────────────────────────────────┐
│         Next.js Cache Layers            │
├─────────────────────────────────────────┤
│                                         │
│  1. Full Route Cache                    │
│     - Static pages cached               │
│     - Revalidated on demand             │
│                                         │
│  2. Data Cache                          │
│     - Server action results             │
│     - Automatic deduplication           │
│                                         │
│  3. Request Memoization                 │
│     - Same request in render            │
│     - Deduplicated automatically        │
│                                         │
│  4. Revalidation                        │
│     - revalidatePath('/') on update     │
│     - Clears all related caches         │
│                                         │
└─────────────────────────────────────────┘
```

### Database Optimization
```
┌─────────────────────────────────────────┐
│      Database Performance               │
├─────────────────────────────────────────┤
│                                         │
│  ✅  Indexes                             │
│     - path (for groupBy queries)        │
│     - createdAt (for date filters)      │
│                                         │
│  ✅  Connection Pooling                  │
│     - Prisma singleton pattern          │
│     - Supabase connection pooler        │
│                                         │
│  ⚠️  TODO: Query Optimization            │
│     - Add LIMIT to large queries        │
│     - Implement pagination              │
│     - Consider materialized views       │
│                                         │
│  ⚠️  TODO: Caching Layer                 │
│     - Add Redis for hot data            │
│     - Cache dashboard stats             │
│     - TTL-based invalidation            │
│                                         │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │              Vercel / Netlify                   │    │
│  │  - Next.js App                                  │    │
│  │  - Edge Functions                               │    │
│  │  - Automatic scaling                            │    │
│  │  - CDN                                          │    │
│  └────────────────────────────────────────────────┘    │
│                        │                                │
│                        │ DATABASE_URL                   │
│                        ▼                                │
│  ┌────────────────────────────────────────────────┐    │
│  │              Supabase                           │    │
│  │  - PostgreSQL Database                          │    │
│  │  - Connection pooling                           │    │
│  │  - Automatic backups                            │    │
│  │  - Point-in-time recovery                       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Monitoring & Observability

```
┌─────────────────────────────────────────┐
│         Monitoring Stack                │
├─────────────────────────────────────────┤
│                                         │
│  ⚠️  TODO: Error Tracking                │
│     - Sentry integration                │
│     - Error boundaries                  │
│     - Stack traces                      │
│                                         │
│  ⚠️  TODO: Performance Monitoring        │
│     - Vercel Analytics                  │
│     - Core Web Vitals                   │
│     - API response times                │
│                                         │
│  ⚠️  TODO: Database Monitoring           │
│     - Supabase dashboard                │
│     - Query performance                 │
│     - Connection pool stats             │
│                                         │
│  ✅  Logging                             │
│     - Console.error for errors          │
│     - Server action logs                │
│                                         │
└─────────────────────────────────────────┘
```

## Scalability Considerations

### Current Capacity
- **Reads**: ~1000 req/sec (Supabase pooler)
- **Writes**: ~500 req/sec (Analytics inserts)
- **Storage**: Unlimited (PostgreSQL)
- **Concurrent Users**: 100+ (Next.js)

### Scaling Strategy
1. **Horizontal**: Add more Next.js instances (Vercel auto-scales)
2. **Vertical**: Upgrade Supabase plan
3. **Caching**: Add Redis for hot data
4. **CDN**: Static assets via Vercel Edge
5. **Database**: Read replicas for analytics queries

### Bottlenecks to Watch
- Analytics table growth (millions of rows)
- Dashboard query performance
- Concurrent admin updates
- Database connection limits

## Future Architecture Enhancements

```
┌─────────────────────────────────────────┐
│         Future Improvements             │
├─────────────────────────────────────────┤
│                                         │
│  1. Add Redis Cache                     │
│     - Cache dashboard stats             │
│     - Reduce database load              │
│                                         │
│  2. Implement Queue System              │
│     - Background analytics processing   │
│     - Batch inserts                     │
│                                         │
│  3. Add WebSockets                      │
│     - Real-time dashboard updates       │
│     - Live visitor count                │
│                                         │
│  4. Microservices                       │
│     - Separate analytics service        │
│     - Dedicated admin API               │
│                                         │
│  5. Multi-Region                        │
│     - Edge functions globally           │
│     - Regional database replicas        │
│                                         │
└─────────────────────────────────────────┘
```
