/**
 * Advanced Analytics Storage
 * Uses Vercel KV (Redis) for persistent storage
 * Falls back to in-memory if KV is not available
 */

let kv: any = null;

// Try to import Vercel KV
try {
  kv = require('@vercel/kv').kv;
} catch {
  console.warn('⚠️ @vercel/kv not installed, using in-memory storage');
}

// Keys for KV storage
const KEYS = {
  TOTAL_VIEWS: 'analytics:total_views',
  PAGE_VIEWS: 'analytics:page_views',
  UNIQUE_VISITORS: 'analytics:unique_visitors',
  DAILY_VIEWS: 'analytics:daily_views',
  AD_CLICKS: 'analytics:ad_clicks',
  AD_CLICKS_BY_SLOT: 'analytics:ad_clicks_by_slot',
  REFERRERS: 'analytics:referrers',
  DEVICES: 'analytics:devices',
  COUNTRIES: 'analytics:countries',
};

// In-memory fallback
let memoryStorage = {
  totalViews: 0,
  pageViews: new Map<string, number>(),
  uniqueVisitors: new Set<string>(),
  dailyViews: new Map<string, number>(),
  adClicks: 0,
  adClicksBySlot: new Map<string, number>(),
  referrers: new Map<string, number>(),
  devices: new Map<string, number>(),
  countries: new Map<string, number>(),
};

let useKV = true;

// Check if KV is available
async function isKVAvailable(): Promise<boolean> {
  if (!useKV || !kv) return false;
  
  try {
    await kv.ping();
    return true;
  } catch {
    useKV = false;
    console.warn('⚠️ Vercel KV not available, using in-memory storage');
    return false;
  }
}

/**
 * Track a page view
 */
export async function trackPageView(data: {
  path: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: string;
}): Promise<void> {
  const { path, userAgent, referrer, country, device } = data;
  const today = new Date().toISOString().split('T')[0];

  if (await isKVAvailable()) {
    try {
      // Increment total views
      await kv.incr(KEYS.TOTAL_VIEWS);

      // Increment page-specific views
      await kv.hincrby(KEYS.PAGE_VIEWS, path, 1);

      // Track unique visitors
      if (userAgent) {
        await kv.sadd(KEYS.UNIQUE_VISITORS, userAgent);
      }

      // Track daily views
      await kv.hincrby(KEYS.DAILY_VIEWS, today, 1);

      // Track referrers
      if (referrer && referrer !== 'direct') {
        await kv.hincrby(KEYS.REFERRERS, referrer, 1);
      }

      // Track devices
      if (device) {
        await kv.hincrby(KEYS.DEVICES, device, 1);
      }

      // Track countries
      if (country) {
        await kv.hincrby(KEYS.COUNTRIES, country, 1);
      }
    } catch (error) {
      console.error('KV tracking error:', error);
      // Fallback to memory
      trackPageViewMemory(data);
    }
  } else {
    trackPageViewMemory(data);
  }
}

function trackPageViewMemory(data: {
  path: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: string;
}): void {
  const { path, userAgent, referrer, country, device } = data;
  const today = new Date().toISOString().split('T')[0];

  memoryStorage.totalViews++;
  memoryStorage.pageViews.set(path, (memoryStorage.pageViews.get(path) || 0) + 1);
  
  if (userAgent) {
    memoryStorage.uniqueVisitors.add(userAgent);
  }
  
  memoryStorage.dailyViews.set(today, (memoryStorage.dailyViews.get(today) || 0) + 1);
  
  if (referrer && referrer !== 'direct') {
    memoryStorage.referrers.set(referrer, (memoryStorage.referrers.get(referrer) || 0) + 1);
  }
  
  if (device) {
    memoryStorage.devices.set(device, (memoryStorage.devices.get(device) || 0) + 1);
  }
  
  if (country) {
    memoryStorage.countries.set(country, (memoryStorage.countries.get(country) || 0) + 1);
  }
}

/**
 * Track an ad click
 */
export async function trackAdClick(slot: string, path: string): Promise<void> {
  if (await isKVAvailable()) {
    try {
      await kv.incr(KEYS.AD_CLICKS);
      await kv.hincrby(KEYS.AD_CLICKS_BY_SLOT, slot, 1);
    } catch (error) {
      console.error('KV ad click tracking error:', error);
      memoryStorage.adClicks++;
      memoryStorage.adClicksBySlot.set(slot, (memoryStorage.adClicksBySlot.get(slot) || 0) + 1);
    }
  } else {
    memoryStorage.adClicks++;
    memoryStorage.adClicksBySlot.set(slot, (memoryStorage.adClicksBySlot.get(slot) || 0) + 1);
  }
}

/**
 * Get analytics data
 */
export async function getAnalytics(): Promise<{
  totalViews: number;
  uniqueVisitors: number;
  topPages: Array<{ path: string; count: number }>;
  dailyViews: Array<{ date: string; count: number }>;
  adClicks: number;
  adClicksBySlot: Array<{ slot: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
  countryBreakdown: Array<{ country: string; count: number }>;
  dataSource: 'kv' | 'memory';
}> {
  if (await isKVAvailable()) {
    try {
      const [
        totalViews,
        pageViewsData,
        uniqueVisitorsCount,
        dailyViewsData,
        adClicks,
        adClicksBySlotData,
        referrersData,
        devicesData,
        countriesData
      ] = await Promise.all([
        kv.get(KEYS.TOTAL_VIEWS),
        kv.hgetall(KEYS.PAGE_VIEWS),
        kv.scard(KEYS.UNIQUE_VISITORS),
        kv.hgetall(KEYS.DAILY_VIEWS),
        kv.get(KEYS.AD_CLICKS),
        kv.hgetall(KEYS.AD_CLICKS_BY_SLOT),
        kv.hgetall(KEYS.REFERRERS),
        kv.hgetall(KEYS.DEVICES),
        kv.hgetall(KEYS.COUNTRIES)
      ]);

      // Process top pages
      const topPages = Object.entries(pageViewsData || {})
        .map(([path, count]) => ({ path, count: Number(count) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Process daily views (last 30 days)
      const dailyViews: Array<{ date: string; count: number }> = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = (dailyViewsData && dailyViewsData[dateStr]) ? Number(dailyViewsData[dateStr]) : 0;
        dailyViews.push({ date: dateStr, count });
      }

      // Process ad clicks by slot
      const adClicksBySlot = Object.entries(adClicksBySlotData || {})
        .map(([slot, count]) => ({ slot, count: Number(count) }))
        .sort((a, b) => b.count - a.count);

      // Process referrers
      const topReferrers = Object.entries(referrersData || {})
        .map(([referrer, count]) => ({ referrer, count: Number(count) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Process devices
      const deviceBreakdown = Object.entries(devicesData || {})
        .map(([device, count]) => ({ device, count: Number(count) }))
        .sort((a, b) => b.count - a.count);

      // Process countries
      const countryBreakdown = Object.entries(countriesData || {})
        .map(([country, count]) => ({ country, count: Number(count) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        totalViews: totalViews || 0,
        uniqueVisitors: uniqueVisitorsCount || 0,
        topPages,
        dailyViews,
        adClicks: adClicks || 0,
        adClicksBySlot,
        topReferrers,
        deviceBreakdown,
        countryBreakdown,
        dataSource: 'kv'
      };
    } catch (error) {
      console.error('KV get analytics error:', error);
      return getAnalyticsMemory();
    }
  } else {
    return getAnalyticsMemory();
  }
}

function getAnalyticsMemory() {
  // Process top pages
  const topPages = Array.from(memoryStorage.pageViews.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Process daily views
  const dailyViews: Array<{ date: string; count: number }> = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = memoryStorage.dailyViews.get(dateStr) || 0;
    dailyViews.push({ date: dateStr, count });
  }

  // Process ad clicks by slot
  const adClicksBySlot = Array.from(memoryStorage.adClicksBySlot.entries())
    .map(([slot, count]) => ({ slot, count }))
    .sort((a, b) => b.count - a.count);

  // Process referrers
  const topReferrers = Array.from(memoryStorage.referrers.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Process devices
  const deviceBreakdown = Array.from(memoryStorage.devices.entries())
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  // Process countries
  const countryBreakdown = Array.from(memoryStorage.countries.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalViews: memoryStorage.totalViews,
    uniqueVisitors: memoryStorage.uniqueVisitors.size,
    topPages,
    dailyViews,
    adClicks: memoryStorage.adClicks,
    adClicksBySlot,
    topReferrers,
    deviceBreakdown,
    countryBreakdown,
    dataSource: 'memory' as const
  };
}

/**
 * Reset all analytics data
 */
export async function resetAnalytics(): Promise<void> {
  if (await isKVAvailable()) {
    try {
      await Promise.all([
        kv.del(KEYS.TOTAL_VIEWS),
        kv.del(KEYS.PAGE_VIEWS),
        kv.del(KEYS.UNIQUE_VISITORS),
        kv.del(KEYS.DAILY_VIEWS),
        kv.del(KEYS.AD_CLICKS),
        kv.del(KEYS.AD_CLICKS_BY_SLOT),
        kv.del(KEYS.REFERRERS),
        kv.del(KEYS.DEVICES),
        kv.del(KEYS.COUNTRIES)
      ]);
    } catch (error) {
      console.error('KV reset error:', error);
    }
  }

  // Reset memory storage
  memoryStorage = {
    totalViews: 0,
    pageViews: new Map(),
    uniqueVisitors: new Set(),
    dailyViews: new Map(),
    adClicks: 0,
    adClicksBySlot: new Map(),
    referrers: new Map(),
    devices: new Map(),
    countries: new Map(),
  };
}
