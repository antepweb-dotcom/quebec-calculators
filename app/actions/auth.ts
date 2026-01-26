'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Hardcoded credentials (in production, use environment variables and hashed passwords)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'quebec2026'
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_TOKEN = 'authenticated'

interface LoginState {
  message?: string
}

/**
 * Login server action
 * Validates credentials and sets secure cookie
 */
export async function login(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  // Validate inputs
  if (!username || !password) {
    return { message: 'Veuillez remplir tous les champs' }
  }

  // Check credentials
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { message: 'Mot de passe incorrect' }
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
