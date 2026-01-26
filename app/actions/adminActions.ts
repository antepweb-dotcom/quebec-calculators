'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Get dashboard statistics
 * Returns total views, recent views, top paths, and daily views
 */
export async function getDashboardStats(): Promise<{
  totalViews: number
  recentViews: number
  topPaths: Array<{ path: string; count: number }>
  dailyViews: Array<{ date: Date; count: number }>
}> {
  try {
    // Total views (all time)
    const totalViews = await prisma.analytics.count()

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Recent views (last 30 days)
    const recentViews = await prisma.analytics.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    // Get top 5 visited paths
    const topPathsResult = await prisma.analytics.groupBy({
      by: ['path'],
      _count: {
        path: true
      },
      orderBy: {
        _count: {
          path: 'desc'
        }
      },
      take: 5
    })

    const topPaths = topPathsResult.map(item => ({
      path: item.path,
      count: item._count.path
    }))

    // Get daily views for last 30 days
    const dailyViewsResult = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM "Analytics"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `

    const dailyViews = dailyViewsResult.map(item => ({
      date: item.date,
      count: Number(item.count)
    }))

    return {
      totalViews,
      recentViews,
      topPaths,
      dailyViews
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Return empty data if database is empty or error occurs
    return {
      totalViews: 0,
      recentViews: 0,
      topPaths: [],
      dailyViews: []
    }
  }
}

/**
 * Get site configuration
 * Returns config from database or default values
 */
export async function getSiteConfig() {
  try {
    const config = await prisma.siteConfig.findFirst()

    // Return config if found
    if (config) {
      return config
    }

    // Return default values if no config exists
    return {
      id: 1,
      isAdsEnabled: true,
      adSenseId: 'ca-pub-XXXXXXXXXXXXXXXX',
      bannerSlotId: '',
      sidebarSlotId: '',
      alertMessage: '',
      isAlertActive: false
    }
  } catch (error) {
    console.error('Error fetching site config:', error)
    // Return default values on error
    return {
      id: 1,
      isAdsEnabled: true,
      adSenseId: 'ca-pub-XXXXXXXXXXXXXXXX',
      bannerSlotId: '',
      sidebarSlotId: '',
      alertMessage: '',
      isAlertActive: false
    }
  }
}

/**
 * Update site configuration
 * Saves changes to database and revalidates cache
 */
export async function updateSiteConfig(formData: FormData): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // Extract values from FormData
    const isAdsEnabled = formData.get('adsEnabled') === 'true'
    const adSenseId = (formData.get('adSenseId') as string) || ''
    const bannerSlotId = (formData.get('bannerSlotId') as string) || ''
    const sidebarSlotId = (formData.get('sidebarSlotId') as string) || ''
    const alertMessage = (formData.get('alertMessage') as string) || ''
    const isAlertActive = formData.get('alertActive') === 'true'

    // Validate required fields
    if (isAdsEnabled && !adSenseId) {
      return {
        success: false,
        error: 'AdSense ID is required when ads are enabled'
      }
    }

    // Upsert configuration (update if exists, create if not)
    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        isAdsEnabled,
        adSenseId,
        bannerSlotId,
        sidebarSlotId,
        alertMessage,
        isAlertActive
      },
      create: {
        id: 1,
        isAdsEnabled,
        adSenseId,
        bannerSlotId,
        sidebarSlotId,
        alertMessage,
        isAlertActive
      }
    })

    // Revalidate root path to update public site instantly
    revalidatePath('/', 'layout')

    return { success: true }
  } catch (error) {
    console.error('Error updating site config:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update configuration'
    }
  }
}

/**
 * Track a page visit for analytics
 */
export async function trackVisit(path: string): Promise<{
  success: boolean
}> {
  try {
    await prisma.analytics.create({
      data: { path }
    })
    return { success: true }
  } catch (error) {
    console.error('Error tracking visit:', error)
    return { success: false }
  }
}
