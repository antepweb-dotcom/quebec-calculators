'use server'

import { revalidatePath } from 'next/cache'
import { siteConfig } from '@/app/site-config'

/**
 * Track a page visit for analytics
 */
export async function trackVisit(path: string): Promise<{ success: boolean }> {
  try {
    // Get user agent and referrer
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'server';
    const referrer = typeof window !== 'undefined' ? document.referrer : '';
    
    // Send to analytics API
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        path,
        userAgent,
        referrer: referrer || 'direct',
        timestamp: new Date().toISOString()
      })
    }).catch(() => {
      // Silently fail - don't break the page
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to track visit:', error);
    return { success: false };
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/analytics`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    // Return site-config data as fallback
    return {
      totalViews: siteConfig.analytics.totalViews,
      recentViews: siteConfig.analytics.recentViews,
      uniqueVisitors: siteConfig.analytics.totalVisitors,
      topPages: siteConfig.analytics.topPaths,
      dailyViews: [],
      totalAdClicks: 0,
      ctr: 0,
      estimatedRevenue: siteConfig.analytics.monthlyRevenue,
      adClicksBySlot: []
    };
  }
}

/**
 * Get site configuration
 */
export async function getSiteConfig() {
  return {
    id: 1,
    isAdsEnabled: siteConfig.ads.isEnabled,
    adSenseId: siteConfig.ads.googleAdSenseId,
    bannerSlotId: '',
    sidebarSlotId: '',
    alertMessage: siteConfig.alert.message,
    isAlertActive: siteConfig.alert.isActive
  };
}

/**
 * Update site configuration
 */
export async function updateSiteConfig(formData: FormData): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const isAdsEnabled = formData.get('adsEnabled') === 'true';
    const adSenseId = (formData.get('adSenseId') as string) || '';

    if (isAdsEnabled && !adSenseId) {
      return {
        success: false,
        error: 'AdSense ID is required when ads are enabled'
      };
    }

    // Update via API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'ads',
        data: { isEnabled: isAdsEnabled, googleAdSenseId: adSenseId }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update settings');
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Failed to update site config:', error);
    return {
      success: false,
      error: 'An error occurred while updating settings'
    };
  }
}

