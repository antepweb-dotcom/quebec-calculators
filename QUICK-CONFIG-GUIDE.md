# 🚀 Quick Configuration Guide

## How to Update Site Settings

All configuration is in **one file**: `app/site-config.ts`

---

## 🎯 Common Tasks

### 1. Enable/Disable Ads

```typescript
// In app/site-config.ts
ads: {
  isEnabled: true, // ← Change to false to disable all ads
  googleAdSenseId: 'ca-pub-XXXXXXXXXXXXXXXX',
  // ...
}
```

### 2. Update AdSense ID

```typescript
ads: {
  isEnabled: true,
  googleAdSenseId: 'ca-pub-YOUR-REAL-ID', // ← Replace with your ID
  slots: {
    header: {
      enabled: true,
      type: 'adsense',
      adId: 'ca-pub-YOUR-REAL-ID', // ← Also update here
      size: '728x90'
    }
  }
}
```

### 3. Show Alert Banner

```typescript
alert: {
  isActive: true, // ← Set to true
  type: 'warning', // ← Choose: 'info', 'warning', 'error', 'success'
  message: 'Maintenance prévue le 15 février.' // ← Your message
}
```

Alert colors:
- `info` = Blue
- `warning` = Yellow
- `error` = Red
- `success` = Green

### 4. Update Dashboard Stats

```typescript
analytics: {
  totalVisitors: 2000, // ← Update
  monthlyRevenue: 250.00, // ← Update
  topTool: 'Calcul Hypothèque', // ← Update
  totalViews: 60000,
  recentViews: 45000,
  topPaths: [
    { path: '/salaire-net-quebec', count: 12000 },
    { path: '/calcul-hypotheque', count: 10000 }
    // Add more...
  ]
}
```

### 5. Change Admin Password

**Option A: Edit config file**
```typescript
auth: {
  password: 'your-new-password' // ← Change here
}
```

**Option B: Use environment variable (recommended)**
```bash
# In .env.local or Vercel dashboard
ADMIN_PASSWORD=your-secure-password
```

---

## 🔄 Deployment Workflow

1. Edit `app/site-config.ts`
2. Save the file
3. Commit to Git:
   ```bash
   git add app/site-config.ts
   git commit -m "Update site configuration"
   git push
   ```
4. Vercel auto-deploys (or run `vercel --prod`)

---

## 📍 Admin URLs

- **Login:** `https://yoursite.com/login`
- **Dashboard:** `https://yoursite.com/admin`
- **Default Password:** `quebec2026`

---

## 🎨 Ad Slot Positions

Available ad slots in `site-config.ts`:

```typescript
slots: {
  header: { ... },      // Top banner (728x90 desktop, 320x50 mobile)
  sidebar: { ... },     // Right sidebar (300x600, desktop only)
  inArticle: { ... },   // Mid-content (728x90 desktop, 320x50 mobile)
  footer: { ... },      // Bottom banner (728x90 desktop, 320x50 mobile)
  affiliate1: { ... },  // Custom HTML slot 1
  affiliate2: { ... }   // Custom HTML slot 2
}
```

To enable/disable a slot:
```typescript
header: {
  enabled: false, // ← Set to false to hide
  // ...
}
```

---

## 🛠️ Helper Functions

Available in `app/site-config.ts`:

```typescript
// Get ad slot config
getAdSlotConfig('header')

// Check if ads are enabled
areAdsEnabled()

// Get alert config
getAlertConfig()

// Get analytics data
getAnalyticsData()

// Validate admin password
validateAdminPassword('password')
```

---

## ⚡ Pro Tips

1. **Test locally first:**
   ```bash
   npm run dev
   ```

2. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```

3. **Use environment variables for secrets:**
   - Never commit real passwords to Git
   - Use `ADMIN_PASSWORD` env var in production

4. **Version control everything:**
   - Config changes are tracked in Git
   - Easy to rollback if needed

5. **Update regularly:**
   - Keep analytics stats current
   - Adjust ad settings based on performance

---

## 📞 Need Help?

- Check `STATELESS-MIGRATION-COMPLETE.md` for full documentation
- Review `app/site-config.ts` for all available options
- Test changes locally before deploying

---

**That's it! Simple, stateless, and powerful.** 🎉
