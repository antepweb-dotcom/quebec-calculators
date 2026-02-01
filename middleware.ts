import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'admin-auth'
const SESSION_TOKEN = 'authenticated'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for session cookie
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)
    
    // If no cookie or invalid token, redirect to login
    if (!sessionCookie || sessionCookie.value !== SESSION_TOKEN) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // Cookie valid - allow access
    return NextResponse.next()
  }
  
  // Allow all other routes
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/admin/:path*',
}
