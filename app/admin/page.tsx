import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Check authentication
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin-auth');

  if (!authCookie || authCookie.value !== 'authenticated') {
    redirect('/login');
  }

  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  );
}

