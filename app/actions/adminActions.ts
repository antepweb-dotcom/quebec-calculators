'use server'

import { revalidatePath } from 'next/cache'
import { getAnalyticsData, siteConfig } from '@/app/site-config'

/**
 * Get dashboard statistics
 * Returns data from site-config.ts (stateless architecture)
 */
export async function getDashboardStats(): Promise<{
  totalViews: number
  recentViews: number
  topPaths: Array<{ path: string; count: number }>
  dailyViews: Array<{ date: Date; count: number }>
}> {
  const analytics = getAnalyticsData()

  // Generate mock daily views for last 30 days
  const mockDailyViews = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    count: Math.floor(1200 + Math.random() * 1500)
  }))

  return {
    totalViews: analytics.totalViews,
    recentViews: analytics.recentViews,
    topPaths: analytics.topPaths,
    dailyViews: mockDailyViews
  }
}

/**
 * Get site configuration
 * Returns config from site-config.ts (stateless architecture)
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
  }
}

/**
 * Update site configuration
 * Mock function - changes are not persisted (no database)
 */
export async function updateSiteConfig(formData: FormData): Promise<{
  success: boolean
  error?: string
}> {
  // Extract values from FormData for validation
  const isAdsEnabled = formData.get('adsEnabled') === 'true'
  const adSenseId = (formData.get('adSenseId') as string) || ''

  // Validate required fields
  if (isAdsEnabled && !adSenseId) {
    return {
      success: false,
      error: 'AdSense ID is required when ads are enabled'
    }
  }

  // Simulate successful save (no actual persistence)
  console.log('Config update simulated (no database):', Object.fromEntries(formData))

  // Revalidate root path
  revalidatePath('/', 'layout')

  return { success: true }
}

/**
 * Track a page visit for analytics
 * Mock function - visits are not tracked (no database)
 */
export async function trackVisit(path: string): Promise<{
  success: boolean
}> {
  // No-op: tracking disabled without database
  console.log('Visit tracking disabled (no database):', path)
  return { success: true }
}
