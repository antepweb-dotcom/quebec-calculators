# Admin Panel Quick Start

## 🚀 First Time Setup

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

## 📍 Access Points

- **Admin Panel**: `http://localhost:3000/admin`
- **Database GUI**: `npm run db:studio` → `http://localhost:5555`

## 🎛️ Admin Panel Sections

### Overview
- View total page views and revenue estimates
- Monitor traffic trends with interactive charts
- See real-time statistics

### Analytics
- Top 5 most visited pages
- View counts per page
- Track user engagement

### Ads Manager
- **Enable/Disable Ads**: Master toggle for all advertisements
- **AdSense Publisher ID**: Your `ca-pub-xxxxxxxxxxxxxxxx` ID
- **Banner Slot ID**: Specific ad slot identifier
- Click "Save Changes" to apply

### Alerts
- **Enable/Disable Alert**: Show/hide banner on public site
- **Message**: Text to display in alert banner
- **Preview**: See how alert will look before publishing
- Click "Save Changes" to apply

### Settings
- View database connection status
- Check total records count

## 💾 Database Tables

### SiteConfig (Singleton)
```typescript
{
  id: 1,                    // Always 1
  isAdsEnabled: boolean,    // Master ads toggle
  adSenseId: string,        // Google AdSense ID
  bannerSlotId: string,     // Ad slot ID
  alertMessage: string,     // Alert text
  isAlertActive: boolean    // Show alert banner
}
```

### Analytics
```typescript
{
  id: string,              // UUID
  path: string,            // Page path
  createdAt: DateTime      // Visit timestamp
}
```

## 🔧 Common Tasks

### Update AdSense Configuration
1. Go to Ads Manager section
2. Toggle "Enable All Ads" ON
3. Enter your AdSense Publisher ID
4. Enter Banner Slot ID
5. Click "Save Changes"
6. Verify on public site

### Create Site-Wide Alert
1. Go to Alerts section
2. Toggle "Show Alert Bar" ON
3. Type your message
4. Review preview
5. Click "Save Changes"
6. Check homepage for banner

### View Analytics
1. Go to Analytics section
2. See top visited pages
3. Check view counts
4. Monitor trends over time

### Check Database
```bash
npm run db:studio
```
- Browse all records
- Edit data manually
- Export/import data

## 🔄 Server Actions (API)

All admin operations use these server actions:

- `getSiteConfig()` - Fetch current configuration
- `updateSiteConfig(formData)` - Save configuration changes
- `trackVisit(path)` - Record page visit
- `getDashboardStats()` - Get analytics data

## 🌐 Public Site Integration

### Alert Banner
- Automatically shows when `isAlertActive = true`
- Displays at top of all pages
- Styled with blue background

### AdSense Script
- Automatically loads when `isAdsEnabled = true`
- Injects Google AdSense script with your publisher ID
- Ready for ad placement

### Page Tracking
- Every page visit automatically tracked
- No manual intervention needed
- Data appears in Analytics section

## 📊 Data Flow

```
User visits page
    ↓
PageTracker component calls trackVisit()
    ↓
Record saved to Analytics table
    ↓
Admin views stats in dashboard
    ↓
getDashboardStats() aggregates data
    ↓
Charts and tables display results
```

## ⚡ Quick Commands

```bash
# Database
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:studio      # Open database GUI
npm run db:init        # Initialize with defaults

# Development
npm run dev            # Start dev server
npm run build          # Build for production
npm run start          # Start production server
```

## 🛡️ Type Safety

All operations are fully typed with TypeScript:
- Form data validated
- Database queries type-checked
- No runtime type errors
- IntelliSense support

## 🔐 Security Notes

⚠️ **Important**: This admin panel has NO authentication!

Before production:
1. Add authentication (NextAuth, Clerk, etc.)
2. Protect `/admin` route
3. Validate user permissions
4. Add CSRF protection
5. Implement rate limiting

## 📝 Environment Variables

Required in `.env`:
```env
DATABASE_URL="postgresql://..."
```

Optional:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

## 🐛 Troubleshooting

**Admin panel won't load**
- Check DATABASE_URL is correct
- Run `npm run db:push`
- Restart dev server

**Changes not saving**
- Check browser console for errors
- Verify database connection
- Check server logs

**Analytics not tracking**
- Ensure PageTracker is in layout
- Check trackVisit is being called
- Verify database write permissions

**Charts not showing**
- Need at least 1 day of data
- Check dailyViews query
- Verify date calculations

## 📚 Additional Resources

- `DATABASE-SETUP.md` - Detailed setup guide
- `TESTING-GUIDE.md` - Comprehensive testing procedures
- `prisma/schema.prisma` - Database schema definition
- `app/actions/adminActions.ts` - Server action implementations
