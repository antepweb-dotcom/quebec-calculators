/**
 * Database Configuration - Vercel Postgres
 * 
 * This module handles all database connections and queries.
 * Uses Vercel Postgres (Neon) for serverless PostgreSQL.
 */

import { sql } from '@vercel/postgres';

// ==========================================
// ANALYTICS TRACKING
// ==========================================

export interface PageView {
  id: number;
  path: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: string;
}

/**
 * Track a page view
 */
export async function trackPageView(
  path: string,
  userAgent?: string,
  referrer?: string,
  country?: string,
  device?: string
): Promise<void> {
  try {
    await sql`
      INSERT INTO page_views (path, user_agent, referrer, country, device)
      VALUES (${path}, ${userAgent}, ${referrer}, ${country}, ${device})
    `;
  } catch (error) {
    console.error('Failed to track page view:', error);
    // Don't throw - tracking failures shouldn't break the app
  }
}

/**
 * Get total page views
 */
export async function getTotalPageViews(): Promise<number> {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM page_views`;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Failed to get total page views:', error);
    return 0;
  }
}

/**
 * Get page views for a specific time period
 */
export async function getPageViewsByPeriod(days: number = 30): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM page_views 
      WHERE timestamp >= NOW() - INTERVAL '1 day' * ${days}
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Failed to get page views by period:', error);
    return 0;
  }
}

/**
 * Get top visited pages
 */
export async function getTopPages(limit: number = 10): Promise<Array<{ path: string; count: number }>> {
  try {
    const result = await sql`
      SELECT path, COUNT(*) as count
      FROM page_views
      GROUP BY path
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return result.rows.map(row => ({
      path: row.path,
      count: parseInt(row.count)
    }));
  } catch (error) {
    console.error('Failed to get top pages:', error);
    return [];
  }
}

/**
 * Get daily page views for chart
 */
export async function getDailyPageViews(days: number = 30): Promise<Array<{ date: string; count: number }>> {
  try {
    const result = await sql`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as count
      FROM page_views
      WHERE timestamp >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `;
    return result.rows.map(row => ({
      date: row.date,
      count: parseInt(row.count)
    }));
  } catch (error) {
    console.error('Failed to get daily page views:', error);
    return [];
  }
}

/**
 * Get unique visitors count
 */
export async function getUniqueVisitors(days: number = 30): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(DISTINCT user_agent) as count
      FROM page_views
      WHERE timestamp >= NOW() - INTERVAL '1 day' * ${days}
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Failed to get unique visitors:', error);
    return 0;
  }
}

// ==========================================
// AD CLICKS TRACKING
// ==========================================

export interface AdClick {
  id: number;
  adSlot: string;
  timestamp: Date;
  path: string;
}

/**
 * Track an ad click
 */
export async function trackAdClick(adSlot: string, path: string): Promise<void> {
  try {
    await sql`
      INSERT INTO ad_clicks (ad_slot, path)
      VALUES (${adSlot}, ${path})
    `;
  } catch (error) {
    console.error('Failed to track ad click:', error);
  }
}

/**
 * Get total ad clicks
 */
export async function getTotalAdClicks(days: number = 30): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM ad_clicks 
      WHERE timestamp >= NOW() - INTERVAL '1 day' * ${days}
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Failed to get ad clicks:', error);
    return 0;
  }
}

/**
 * Get ad clicks by slot
 */
export async function getAdClicksBySlot(days: number = 30): Promise<Array<{ slot: string; count: number }>> {
  try {
    const result = await sql`
      SELECT ad_slot as slot, COUNT(*) as count
      FROM ad_clicks
      WHERE timestamp >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY ad_slot
      ORDER BY count DESC
    `;
    return result.rows.map(row => ({
      slot: row.slot,
      count: parseInt(row.count)
    }));
  } catch (error) {
    console.error('Failed to get ad clicks by slot:', error);
    return [];
  }
}

// ==========================================
// SITE CONFIGURATION
// ==========================================

export interface SiteSettings {
  id: number;
  adsEnabled: boolean;
  adSenseId: string;
  alertActive: boolean;
  alertMessage: string;
  alertType: 'info' | 'warning' | 'error' | 'success';
  updatedAt: Date;
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const result = await sql`SELECT * FROM site_settings WHERE id = 1`;
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id,
      adsEnabled: row.ads_enabled,
      adSenseId: row.adsense_id,
      alertActive: row.alert_active,
      alertMessage: row.alert_message,
      alertType: row.alert_type,
      updatedAt: row.updated_at
    };
  } catch (error) {
    console.error('Failed to get site settings:', error);
    return null;
  }
}

/**
 * Update site settings
 */
export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<boolean> {
  try {
    await sql`
      UPDATE site_settings
      SET 
        ads_enabled = COALESCE(${settings.adsEnabled}, ads_enabled),
        adsense_id = COALESCE(${settings.adSenseId}, adsense_id),
        alert_active = COALESCE(${settings.alertActive}, alert_active),
        alert_message = COALESCE(${settings.alertMessage}, alert_message),
        alert_type = COALESCE(${settings.alertType}, alert_type),
        updated_at = NOW()
      WHERE id = 1
    `;
    return true;
  } catch (error) {
    console.error('Failed to update site settings:', error);
    return false;
  }
}

// ==========================================
// DATABASE INITIALIZATION
// ==========================================

/**
 * Initialize database tables
 * Run this once to set up the database schema
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Create page_views table
    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        path VARCHAR(500) NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW(),
        user_agent TEXT,
        referrer TEXT,
        country VARCHAR(2),
        device VARCHAR(50)
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp)`;

    // Create ad_clicks table
    await sql`
      CREATE TABLE IF NOT EXISTS ad_clicks (
        id SERIAL PRIMARY KEY,
        ad_slot VARCHAR(100) NOT NULL,
        path VARCHAR(500) NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_ad_clicks_slot ON ad_clicks(ad_slot)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ad_clicks_timestamp ON ad_clicks(timestamp)`;

    // Create site_settings table
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        ads_enabled BOOLEAN DEFAULT true,
        adsense_id VARCHAR(100),
        alert_active BOOLEAN DEFAULT false,
        alert_message TEXT,
        alert_type VARCHAR(20) DEFAULT 'info',
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT check_id CHECK (id = 1)
      )
    `;

    // Insert default settings if not exists
    await sql`
      INSERT INTO site_settings (id, ads_enabled, adsense_id, alert_active, alert_message, alert_type)
      VALUES (1, true, 'ca-pub-XXXXXXXXXXXXXXXX', false, '', 'info')
      ON CONFLICT (id) DO NOTHING
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
