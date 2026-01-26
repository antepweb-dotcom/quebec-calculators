# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Login
```
Open: http://localhost:3000/login
Password: quebec2026
```

**That's it!** No database setup required. 🎉

---

## 📋 What You Get

✅ **Login Page** - Clean UI with password-only authentication  
✅ **Admin Dashboard** - Mock statistics and charts  
✅ **Protected Routes** - Middleware guards admin pages  
✅ **Cookie Sessions** - Secure HTTPOnly cookies (7 days)  
✅ **Error Handling** - Shows "Mot de passe incorrect" on wrong password  
✅ **Logout** - Full session management  

---

## 🎯 Key Features

### Login System
- **URL**: `/login`
- **Password**: `quebec2026`
- **No username required**
- **Error handling**: Shows red error message on wrong password
- **Auto-focus**: Password field focused on load
- **Loading state**: Button shows "Connexion..." while submitting

### Admin Dashboard
- **URL**: `/admin` (protected)
- **Mock data**: 49,820 total views, 38,640 recent views
- **Charts**: 30 days of traffic data
- **Top pages**: 5 most visited pages
- **Logout button**: Clears session and redirects

### Security
- **HTTPOnly cookies**: Can't be accessed by JavaScript
- **Secure flag**: HTTPS only in production
- **SameSite**: CSRF protection
- **Middleware**: Protects all `/admin/*` routes
- **7-day sessions**: Auto-expire after 7 days

---

## 🧪 Test It

### Test 1: Wrong Password
```
1. Go to http://localhost:3000/login
2. Enter "wrongpassword"
3. Click "Se connecter"
4. ✅ Should show "Mot de passe incorrect"
```

### Test 2: Correct Password
```
1. Go to http://localhost:3000/login
2. Enter "quebec2026"
3. Click "Se connecter"
4. ✅ Should redirect to /admin
5. ✅ Should show dashboard with stats
```

### Test 3: Protected Route
```
1. Open new incognito window
2. Go to http://localhost:3000/admin
3. ✅ Should redirect to /login
```

### Test 4: Logout
```
1. Login to admin
2. Click "Se déconnecter"
3. ✅ Should redirect to /login
4. Try to access /admin
5. ✅ Should redirect to /login again
```

---

## 📁 Project Structure

```
app/
├── actions/
│   ├── auth.ts              # Login/logout actions
│   └── adminActions.ts      # Mock data functions
├── login/
│   └── page.tsx             # Login UI (password only)
├── admin/
│   ├── page.tsx             # Dashboard (protected)
│   ├── AdminClient.tsx      # Client components
│   ├── LogoutButton.tsx     # Logout button
│   └── TrafficChart.tsx     # Chart component
└── layout.tsx               # Root layout

middleware.ts                # Route protection
public/
├── ads-config.json          # Ads configuration
└── alerts-config.json       # Alerts configuration
```

---

## 🔧 Customization

### Change Password
Edit `app/actions/auth.ts`:
```typescript
const ADMIN_PASSWORD = 'your-new-password'
```

### Change Page Title
Edit `app/login/page.tsx`:
```typescript
<h1>Your Custom Title</h1>
```

### Change Session Duration
Edit `app/actions/auth.ts`:
```typescript
maxAge: 60 * 60 * 24 * 30  // 30 days
```

### Change Mock Data
Edit `app/actions/adminActions.ts`:
```typescript
return {
  totalViews: 100000,  // Your number
  recentViews: 50000,  // Your number
  // ...
}
```

---

## 🚢 Deploy

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Connect repo on vercel.com
# Deploy automatically
```

### Other Platforms
```bash
npm run build
npm start
```

**No environment variables required!** (except optional Google Analytics)

---

## 📚 Documentation

- **[LOGIN-FLOW.md](./LOGIN-FLOW.md)** - Detailed login flow diagram
- **[NO-DATABASE-SETUP.md](./NO-DATABASE-SETUP.md)** - Complete setup guide
- **[ADMIN-CREDENTIALS.md](./ADMIN-CREDENTIALS.md)** - Quick reference
- **[DATABASE-REMOVAL-SUMMARY.md](./DATABASE-REMOVAL-SUMMARY.md)** - What changed

---

## ❓ FAQ

**Q: Do I need a database?**  
A: No! Everything uses mock data and cookies.

**Q: Where is the data stored?**  
A: Mock data is hardcoded. Config files are in `public/` folder.

**Q: Can I change the password?**  
A: Yes, edit `ADMIN_PASSWORD` in `app/actions/auth.ts`.

**Q: Is it secure?**  
A: Yes for development. For production, use environment variables and hash passwords.

**Q: Can I add a real database later?**  
A: Yes! The Prisma files are still there, just uncomment the imports.

---

## 🎉 You're Ready!

```bash
npm run dev
```

Open http://localhost:3000/login and enter `quebec2026` 🚀
