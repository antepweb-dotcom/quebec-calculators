'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AnnouncementBar from '@/components/ui/AnnouncementBar';
import PageTracker from '@/components/PageTracker';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages without header/footer
  const noLayoutPages = ['/admin', '/login'];
  const shouldShowLayout = !noLayoutPages.some(page => pathname?.startsWith(page));

  if (!shouldShowLayout) {
    // Admin and login pages - no header/footer
    return (
      <>
        <PageTracker />
        {children}
      </>
    );
  }

  // Regular pages - with header/footer
  return (
    <>
      <PageTracker />
      <AnnouncementBar />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
