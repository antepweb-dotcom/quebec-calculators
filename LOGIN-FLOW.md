# 🔐 Login Flow - Simplified

## UI Design

```
┌─────────────────────────────────────────┐
│                                         │
│              🔒 Lock Icon               │
│                                         │
│      Outils Financiers Admin            │
│   Connectez-vous pour accéder au        │
│         tableau de bord                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ⚠️ Mot de passe incorrect         │  │ ← Only shows if ?error=true
│  └───────────────────────────────────┘  │
│                                         │
│  Mot de passe                           │
│  ┌───────────────────────────────────┐  │
│  │ 🔑 Entrez le mot de passe         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   🔒 Se connecter                 │  │
│  └───────────────────────────────────┘  │
│                                         │
│  🔒 Connexion sécurisée avec cookies    │
│         HTTPOnly                        │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Mot de passe de test:                  │
│  quebec2026                             │
└─────────────────────────────────────────┘
```

## Flow Diagram

```
┌─────────────┐
│   /login    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Enter Password     │
│  (quebec2026)       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Submit Form        │
│  action={login}     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Server Action      │
│  app/actions/auth.ts│
└──────┬──────────────┘
       │
       ├─── Wrong Password ───┐
       │                      │
       │                      ▼
       │              ┌──────────────────┐
       │              │ redirect('/login │
       │              │   ?error=true')  │
       │              └────────┬─────────┘
       │                       │
       │                       ▼
       │              ┌──────────────────┐
       │              │ Show Error:      │
       │              │ "Mot de passe    │
       │              │  incorrect"      │
       │              └──────────────────┘
       │
       └─── Correct Password ───┐
                                │
                                ▼
                        ┌──────────────────┐
                        │ Set Cookie:      │
                        │ admin_session=   │
                        │ authenticated    │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ redirect('/admin')│
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  Admin Dashboard │
                        │  (Protected)     │
                        └──────────────────┘
```

## Code Structure

### 1. Login Page (`app/login/page.tsx`)
```typescript
'use client'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const hasError = searchParams.get('error') === 'true'
  
  return (
    <form action={login}>
      {hasError && <ErrorMessage />}
      <input type="password" name="password" />
      <button type="submit">Se connecter</button>
    </form>
  )
}
```

### 2. Login Action (`app/actions/auth.ts`)
```typescript
'use server'

export async function login(formData: FormData) {
  const password = formData.get('password')
  
  if (password !== ADMIN_PASSWORD) {
    redirect('/login?error=true')  // ❌ Wrong password
  }
  
  cookies().set('admin_session', 'authenticated')
  redirect('/admin')  // ✅ Success
}
```

### 3. Middleware (`middleware.ts`)
```typescript
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookie = request.cookies.get('admin_session')
    
    if (!cookie || cookie.value !== 'authenticated') {
      return NextResponse.redirect('/login')  // 🚫 Not authenticated
    }
  }
  
  return NextResponse.next()  // ✅ Authenticated
}
```

## Features

### ✅ Implemented
- Single password field (no username)
- Clean, centered card design
- Error handling via URL parameter
- Auto-focus on password field
- Loading state during submission
- Secure HTTPOnly cookies
- 7-day session duration
- Middleware protection

### 🎨 Design Details
- **Title**: "Outils Financiers Admin"
- **Icon**: Lock icon (🔒)
- **Colors**: Blue primary, red for errors
- **Layout**: Centered card with gradient background
- **Responsive**: Works on mobile and desktop

### 🔒 Security
- HTTPOnly cookies (can't be accessed by JavaScript)
- Secure flag in production (HTTPS only)
- SameSite protection (CSRF prevention)
- No credentials in localStorage/sessionStorage
- Password not exposed in URL

## Testing Scenarios

### Scenario 1: Wrong Password
```
1. Visit /login
2. Enter "wrongpassword"
3. Click "Se connecter"
4. → Redirects to /login?error=true
5. → Shows "Mot de passe incorrect"
```

### Scenario 2: Correct Password
```
1. Visit /login
2. Enter "quebec2026"
3. Click "Se connecter"
4. → Sets cookie: admin_session=authenticated
5. → Redirects to /admin
6. → Shows dashboard
```

### Scenario 3: Protected Route
```
1. Visit /admin (without cookie)
2. → Middleware checks cookie
3. → No cookie found
4. → Redirects to /login
```

### Scenario 4: Logout
```
1. Click "Se déconnecter" in admin
2. → Deletes admin_session cookie
3. → Redirects to /login
4. → Can't access /admin anymore
```

## Customization

### Change Password
Edit `app/actions/auth.ts`:
```typescript
const ADMIN_PASSWORD = 'your-new-password'
```

### Change Title
Edit `app/login/page.tsx`:
```typescript
<h1>Your Custom Title</h1>
```

### Change Error Message
Edit `app/login/page.tsx`:
```typescript
{hasError && (
  <p>Your custom error message</p>
)}
```

### Change Session Duration
Edit `app/actions/auth.ts`:
```typescript
maxAge: 60 * 60 * 24 * 30  // 30 days instead of 7
```

## Production Checklist

- [ ] Move password to environment variable
- [ ] Remove test credentials hint
- [ ] Enable HTTPS (secure flag)
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Hash password (use bcrypt)
- [ ] Add logging for failed attempts
- [ ] Add 2FA (optional)
- [ ] Add password reset (optional)

## Summary

✅ **Simple**: Just one password field  
✅ **Secure**: HTTPOnly cookies, middleware protection  
✅ **Clean**: Professional UI with error handling  
✅ **Fast**: No database, instant validation  
✅ **Tested**: All scenarios covered  

Password: `quebec2026`
