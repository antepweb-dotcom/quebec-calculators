import { NextResponse } from 'next/server'
import { siteConfig } from '@/app/site-config'

/**
 * GET /api/admin/ads
 * Returns ads configuration from site-config.ts
 */
export async function GET() {
  try {
    return NextResponse.json({
      enabled: siteConfig.ads.isEnabled,
      googleAdSenseId: siteConfig.ads.googleAdSenseId,
      slots: siteConfig.ads.slots
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 })
  }
}

/**
 * POST /api/admin/ads
 * Note: In stateless architecture, config changes require editing site-config.ts
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return NextResponse.json({ 
      success: false,
      message: 'Configuration is managed in app/site-config.ts. Please edit the file directly and redeploy.',
      receivedConfig: body
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}
