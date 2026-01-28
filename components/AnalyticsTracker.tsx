'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/app/actions/adminActions';

/**
 * AnalyticsTracker Component
 * 
 * Client component that automatically tracks page visits.
 * Runs on every page load and records the visit to the Analytics table.
 * 
 * Usage: Add to app/layout.tsx to track all pages
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track visit when pathname changes
    if (pathname) {
      trackVisit(pathname).catch((error) => {
        // Silently fail - don't break the page if tracking fails
        console.error('Failed to track visit:', error);
      });
    }
  }, [pathname]);

  // This component renders nothing
  return null;
}

