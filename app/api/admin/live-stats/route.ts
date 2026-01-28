import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA4_PROPERTY_ID;

// Initialize GA4 client
let analyticsDataClient: BetaAnalyticsDataClient | null = null;

if (process.env.GA4_CREDENTIALS) {
  try {
    const credentials = JSON.parse(process.env.GA4_CREDENTIALS);
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials
    });
  } catch (error) {
    console.error('Failed to initialize GA4 client:', error);
  }
}

/**
 * GET /api/admin/live-stats
 * Returns real-time active users from Google Analytics 4
 * Falls back to simulated data if GA4 is not configured
 */
export async function GET() {
  // Debug: Log environment variables
  console.log('🔍 GA4 Debug:');
  console.log('Property ID:', propertyId);
  console.log('Has Credentials:', !!process.env.GA4_CREDENTIALS);
  console.log('Client initialized:', !!analyticsDataClient);
  
  try {
    // If GA4 is configured, fetch real data
    if (analyticsDataClient && propertyId) {
      console.log('✅ Attempting to fetch real-time data...');
      const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }],
      });

      const activeUsers = parseInt(
        realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      );

      console.log('✅ Real data fetched:', activeUsers);
      return NextResponse.json({
        activeUsers,
        isRealData: true,
        timestamp: new Date().toISOString()
      });
    }

    console.log('⚠️ GA4 not configured, using simulated data');
    // Fallback: Simulated live data (random between 0-20)
    const simulatedActiveUsers = Math.floor(Math.random() * 20);
    
    return NextResponse.json({
      activeUsers: simulatedActiveUsers,
      isRealData: false,
      timestamp: new Date().toISOString(),
      message: 'GA4 not configured, using simulated data'
    });

  } catch (error) {
    console.error('❌ Error fetching live stats:', error);
    
    // Return simulated data on error
    return NextResponse.json({
      activeUsers: Math.floor(Math.random() * 15),
      isRealData: false,
      timestamp: new Date().toISOString(),
      error: 'Failed to fetch real-time data'
    });
  }
}

// Use Node.js runtime (required for GA4 client)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

