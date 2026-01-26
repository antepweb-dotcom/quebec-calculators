# Database Setup Guide

## Overview
This application uses **Supabase (PostgreSQL)** with **Prisma ORM** for database management.

## Database Schema

### SiteConfig Table
Stores global site settings (singleton with id=1):
- `id` (Int) - Always 1
- `isAdsEnabled` (Boolean) - Master switch for ads
- `adSenseId` (String) - Google AdSense Publisher ID
- `bannerSlotId` (String) - Ad slot ID
- `alertMessage` (String) - Alert banner message
- `isAlertActive` (Boolean) - Show/hide alert banner

### Analytics Table
Tracks page visits:
- `id` (String, UUID) - Unique identifier
- `path` (String) - Page path (e.g., "/calcul-impot")
- `createdAt` (DateTime) - Timestamp

## Setup Instructions

### 1. Database Connection
Update your `.env` file with your Supabase connection string:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Push Schema to Database
```bash
npx prisma db push
```

### 4. Verify Connection
```bash
npx prisma studio
```

## Server Actions

### `getSiteConfig()`
Fetches site configuration. Creates default config if none exists.

### `updateSiteConfig(formData: FormData)`
Updates site configuration and revalidates cache.

### `trackVisit(path: string)`
Records a page visit for analytics.

### `getDashboardStats()`
Returns:
- Total views (all time)
- Recent views (last 30 days)
- Top 5 visited paths
- Daily views for chart

## Admin Panel

Access at `/admin` to:
- View analytics dashboard
- Configure Google AdSense
- Manage alert banners
- Monitor site statistics

## Public Site Integration

### Alert Banner
Automatically displays when `isAlertActive` is true in the database.

### Google AdSense
Automatically loads AdSense script when `isAdsEnabled` is true.

### Page Tracking
Every page visit is automatically tracked via the `PageTracker` component.

## Type Safety

All database operations are fully typed with TypeScript using Prisma's generated types.

## Error Handling

All server actions include try-catch blocks and return appropriate error messages.

## Cache Management

Changes to site config automatically trigger cache revalidation using Next.js `revalidatePath()`.
