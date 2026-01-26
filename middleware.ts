import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    // Hardcoded credentials (no database yet)
    const validUser = 'admin';
    const validPassword = 'quebec-master-2026';
    
    if (!authHeader) {
      // No auth header - trigger browser login popup
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Panel"',
        },
      });
    }
    
    // Parse Basic Auth header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    // Validate credentials
    if (username === validUser && password === validPassword) {
      // Credentials valid - allow access
      return NextResponse.next();
    } else {
      // Invalid credentials - trigger login popup again
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Panel"',
        },
      });
    }
  }
  
  // Allow all other routes
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/admin/:path*',
};
