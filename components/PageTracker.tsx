'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/app/actions/adminActions';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackVisit(pathname);
    }
  }, [pathname]);

  return null;
}
