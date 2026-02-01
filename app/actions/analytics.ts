/**
 * Server Actions for Analytics
 * 
 * These functions handle all analytics tracking and data retrieval.
 */

'use server';

import { 
  trackPageView, 
  getTotalPageViews, 
  getPageViewsByPeriod,
  getTopPages,
  getDailyPageViews,
  getUniqueVisitors,
  trackAdClick,
  getTotalAdClicks,
  getAdClicksBySlot
} from '@/lib/db';
import { headers } from 'next/headers';

/**
 * Track a page visit
 * Called automatically on each page load
 */
export async function trackVisit(path: string): Promise<{ success: boolean }> {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || undefined;
    const referrer = headersList.get('referer') || undefined;
    const country = headersList.get('x-vercel-ip-country') || undefined;
    
    // Detect device type from user agent
    const device = userAgent?.includes('Mobile') ? 'mobile' : 'desktop';

    await trackPageView(path, userAgent, referrer, country, device);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to track visit:', error);
    return { success: false };
  }
}

/**
 * Track an ad click
 */
export async function trackAd(adSlot: string, path: string): Promise<{ success: boolean }> {
  try {
    await trackAdClick(adSlot, path);
    return { success: true };
  } catch (error) {
    console.error('Failed to track ad click:', error);
    return { success: false };
  }
}

/**
 * Get comprehensive dashboard statistics
 */
export async function getDashboardStats(days: number = 30) {
  try {
    const [
      totalViews,
      recentViews,
      uniqueVisitors,
      topPages,
      dailyViews,
      totalAdClicks,
      adClicksBySlot
    ] = await Promise.all([
      getTotalPageViews(),
      getPageViewsByPeriod(days),
      getUniqueVisitors(days),
      getTopPages(10),
      getDailyPageViews(days),
      getTotalAdClicks(days),
      getAdClicksBySlot(days)
    ]);

    // Calculate CTR (Click-Through Rate)
    const ctr = recentViews > 0 ? (totalAdClicks / recentViews) * 100 : 0;

    // Estimate revenue (assuming $0.50 per click average)
    const estimatedRevenue = totalAdClicks * 0.50;

    return {
      totalViews,
      recentViews,
      uniqueVisitors,
      topPages,
      dailyViews,
      totalAdClicks,
      adClicksBySlot,
      ctr: parseFloat(ctr.toFixed(2)),
      estimatedRevenue: parseFloat(estimatedRevenue.toFixed(2))
    };
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    // Return empty data on error
    return {
      totalViews: 0,
      recentViews: 0,
      uniqueVisitors: 0,
      topPages: [],
      dailyViews: [],
      totalAdClicks: 0,
      adClicksBySlot: [],
      ctr: 0,
      estimatedRevenue: 0
    };
  }
}

/**
 * Get real-time active users
 * This is a simplified version - for real-time data, integrate with GA4
 */
export async function getActiveUsers(): Promise<number> {
  try {
    // Get views in last 5 minutes as proxy for active users
    const result = await getPageViewsByPeriod(0.0035); // ~5 minutes in days
    return result;
  } catch (error) {
    console.error('Failed to get active users:', error);
    return 0;
  }
}
