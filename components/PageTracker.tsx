'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track page view via API
    const trackPageView = async () => {
      try {
        await fetch('/api/admin/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'pageview',
            path: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        // Silently fail - don't break the page
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}

