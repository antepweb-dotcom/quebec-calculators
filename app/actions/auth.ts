'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminPassword } from '@/app/site-config'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_TOKEN = 'authenticated'

/**
 * Login server action
 * Validates password and sets secure cookie
 */
export async function login(formData: FormData) {
  const password = formData.get('password') as string

  // Check password using centralized config
  if (!validateAdminPassword(password)) {
    redirect('/login?error=true')
  }

  // Set secure HTTPOnly cookie
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: SESSION_TOKEN,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  // Redirect to admin panel
  redirect('/admin')
}

/**
 * Logout server action
 * Deletes session cookie and redirects to login
 */
export async function logout() {
  // Delete the session cookie
  cookies().delete(SESSION_COOKIE_NAME)

  // Redirect to login page
  redirect('/login')
}

/**
 * Check if user is authenticated
 * Used by middleware and server components
 */
export async function isAuthenticated(): Promise<boolean> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)
  return sessionCookie?.value === SESSION_TOKEN
}
