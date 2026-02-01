import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin password - hardcoded for simplicity
const ADMIN_PASSWORD = '145314';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    console.log('🔐 Login attempt');
    console.log('  Password received:', password);
    console.log('  Expected:', ADMIN_PASSWORD);
    console.log('  Match:', password === ADMIN_PASSWORD);

    // Check password
    if (password !== ADMIN_PASSWORD) {
      console.log('❌ Login failed');
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    console.log('✅ Login successful');

    // Set cookie
    cookies().set({
      name: 'admin-auth',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
