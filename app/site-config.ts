/**
 * SITE CONFIGURATION - Stateless Architecture
 * 
 * This file acts as the central "database" for the application.
 * All site settings, ads configuration, alerts, and mock analytics data are stored here.
 * 
 * To update configuration:
 * 1. Edit this file directly
 * 2. Commit changes to version control
 * 3. Deploy to Vercel (automatic rebuild)
 */

export interface AdSlotConfig {
  enabled: boolean;
  type: 'adsense' | 'affiliate' | 'custom';
  adId?: string;
  html?: string;
  size?: string;
  description?: string;
}

export interface SiteConfig {
  // Global Ads Configuration
  ads: {
    isEnabled: boolean;
    googleAdSenseId: string;
    slots: {
      header: AdSlotConfig;
      sidebar: AdSlotConfig;
      inArticle: AdSlotConfig;
      footer: AdSlotConfig;
      affiliate1: AdSlotConfig;
      affiliate2: AdSlotConfig;
    };
  };

  // Global Alert Banner
  alert: {
    isActive: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
  };

  // Admin Dashboard Mock Analytics
  analytics: {
    totalVisitors: number;
    monthlyRevenue: number;
    topTool: string;
    totalViews: number;
    recentViews: number;
    topPaths: Array<{ path: string; count: number }>;
  };

  // Admin Authentication
  auth: {
    password: string; // In production, use environment variable
  };
}

/**
 * MAIN SITE CONFIGURATION
 * Edit values below to update site behavior
 */
export const siteConfig: SiteConfig = {
  // ==========================================
  // ADS CONFIGURATION
  // ==========================================
  ads: {
    isEnabled: true, // Master toggle for all ads
    googleAdSenseId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense ID

    slots: {
      // Header Banner (728x90 desktop, 320x50 mobile)
      header: {
        enabled: true,
        type: 'adsense',
        adId: 'ca-pub-XXXXXXXXXXXXXXXX',
        size: '728x90',
        description: 'Top banner ad'
      },

      // Sidebar Ad (300x600 desktop only)
      sidebar: {
        enabled: true,
        type: 'adsense',
        adId: 'ca-pub-XXXXXXXXXXXXXXXX',
        size: '300x600',
        description: 'Sidebar skyscraper ad'
      },

      // In-Article Ad (728x90 desktop, 320x50 mobile)
      inArticle: {
        enabled: true,
        type: 'adsense',
        adId: 'ca-pub-XXXXXXXXXXXXXXXX',
        size: '728x90',
        description: 'Mid-content ad'
      },

      // Footer Banner (728x90 desktop, 320x50 mobile)
      footer: {
        enabled: false,
        type: 'adsense',
        adId: 'ca-pub-XXXXXXXXXXXXXXXX',
        size: '728x90',
        description: 'Bottom banner ad'
      },

      // Affiliate Slot 1 (Custom HTML)
      affiliate1: {
        enabled: false,
        type: 'affiliate',
        html: '<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><p class="text-sm">Affiliate content here</p></div>',
        description: 'Custom affiliate promotion'
      },

      // Affiliate Slot 2 (Custom HTML)
      affiliate2: {
        enabled: false,
        type: 'custom',
        html: '<div class="p-4 bg-green-50 border border-green-200 rounded-lg"><p class="text-sm">Custom content here</p></div>',
        description: 'Custom promotional content'
      }
    }
  },

  // ==========================================
  // ALERT BANNER CONFIGURATION
  // ==========================================
  alert: {
    isActive: false, // Toggle alert banner on/off
    type: 'info', // 'info' | 'warning' | 'error' | 'success'
    message: 'Maintenance: Nous mettons à jour nos calculateurs pour 2026.'
  },

  // ==========================================
  // MOCK ANALYTICS DATA (Admin Dashboard)
  // ==========================================
  analytics: {
    totalVisitors: 1542,
    monthlyRevenue: 145.50,
    topTool: 'Calcul Impôt Québec',
    totalViews: 49820,
    recentViews: 38640,
    topPaths: [
      { path: '/salaire-net-quebec', count: 8420 },
      { path: '/calcul-hypotheque', count: 7850 },
      { path: '/tps-tvq-quebec', count: 5240 },
      { path: '/capacite-emprunt', count: 4680 },
      { path: '/pret-auto', count: 3920 }
    ]
  },

  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================
  auth: {
    password: process.env.ADMIN_PASSWORD || 'quebec2026' // Use env var in production
  }
};

/**
 * Helper function to get ad configuration for a specific slot
 */
export function getAdSlotConfig(position: keyof SiteConfig['ads']['slots']): AdSlotConfig | null {
  if (!siteConfig.ads.isEnabled) {
    return null;
  }

  const slot = siteConfig.ads.slots[position];
  if (!slot || !slot.enabled) {
    return null;
  }

  return slot;
}

/**
 * Helper function to check if ads are globally enabled
 */
export function areAdsEnabled(): boolean {
  return siteConfig.ads.isEnabled;
}

/**
 * Helper function to get alert configuration
 */
export function getAlertConfig() {
  return siteConfig.alert;
}

/**
 * Helper function to get analytics data
 */
export function getAnalyticsData() {
  return siteConfig.analytics;
}

/**
 * Helper function to validate admin password
 */
export function validateAdminPassword(password: string): boolean {
  return password === siteConfig.auth.password;
}
