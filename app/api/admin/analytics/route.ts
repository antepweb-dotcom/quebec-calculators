import { NextRequest, NextResponse } from 'next/server';
import { trackPageView, trackAdClick, getAnalytics, resetAnalytics } from '@/lib/analytics-storage';

// Track a page view or ad click
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, path, slot, userAgent, referrer, timestamp } = body;

    if (type === 'pageview') {
      // Get additional data from headers
      const country = request.headers.get('x-vercel-ip-country') || undefined;
      const device = userAgent?.includes('Mobile') ? 'mobile' : 'desktop';

      await trackPageView({
        path,
        userAgent,
        referrer: referrer || 'direct',
        country,
        device
      });

      return NextResponse.json({ success: true });
    } else if (type === 'adclick') {
      await trackAdClick(slot, path);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Get analytics data
export async function GET() {
  try {
    const analytics = await getAnalytics();

    // Calculate metrics from REAL data only (no mock data added)
    const totalViews = analytics.totalViews;
    const recentViews = analytics.totalViews;
    const uniqueVisitors = analytics.uniqueVisitors;
    
    // Calculate CTR and revenue from real data
    const ctr = totalViews > 0 ? (analytics.adClicks / totalViews) * 100 : 0;
    const estimatedRevenue = analytics.adClicks * 0.50;

    // Use real top pages data
    const topPages = analytics.topPages;

    return NextResponse.json({
      success: true,
      data: {
        // Core metrics (REAL DATA ONLY)
        totalViews,
        recentViews,
        uniqueVisitors,
        topPages,
        dailyViews: analytics.dailyViews,
        
        // Ad metrics
        totalAdClicks: analytics.adClicks,
        ctr: parseFloat(ctr.toFixed(2)),
        estimatedRevenue: parseFloat(estimatedRevenue.toFixed(2)),
        adClicksBySlot: analytics.adClicksBySlot,
        
        // Advanced metrics
        topReferrers: analytics.topReferrers,
        deviceBreakdown: analytics.deviceBreakdown,
        countryBreakdown: analytics.countryBreakdown,
        
        // Metadata
        dataSource: analytics.dataSource,
        lastUpdate: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}

// Reset analytics (admin only)
export async function DELETE() {
  try {
    await resetAnalytics();
    return NextResponse.json({ 
      success: true, 
      message: 'Analytics reset successfully' 
    });
  } catch (error) {
    console.error('Failed to reset analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset analytics' },
      { status: 500 }
    );
  }
}
