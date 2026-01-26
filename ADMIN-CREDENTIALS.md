# Admin Panel Access

## Login Credentials

```
URL: http://localhost:3000/login

Password: quebec2026
```

**Note:** No username required - just enter the password!

## Features

### ✅ Working
- Cookie-based authentication (HTTPOnly, secure)
- Protected admin routes via middleware
- Mock dashboard statistics
- Traffic charts with realistic data
- Top pages analytics
- Logout functionality
- Error handling with URL parameter (?error=true)

### ⚠️ Limited (No Database)
- Config changes are NOT saved (only logged to console)
- Visit tracking is disabled
- Statistics are mock data (not real-time)

### 🔄 Still Working
- Google Analytics (client-side)
- Ads config via JSON files (`public/ads-config.json`)
- Alerts config via JSON files (`public/alerts-config.json`)

## Security Notes

- Session cookie expires after 7 days
- Middleware protects all `/admin/*` routes
- Password is hardcoded in `app/actions/auth.ts`
- For production: use environment variables and hashed passwords

## Customization

To change the password, edit `app/actions/auth.ts`:

```typescript
const ADMIN_PASSWORD = 'quebec2026'
```

## Testing

1. Visit `/login`
2. Enter wrong password → Should show "Mot de passe incorrect"
3. Enter correct password (`quebec2026`) → Should redirect to `/admin`
4. Try accessing `/admin` without login → Should redirect to `/login`
5. Click logout → Should redirect to `/login`
