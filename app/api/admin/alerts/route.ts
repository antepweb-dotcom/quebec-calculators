import { NextResponse } from 'next/server'
import { getAlertConfig } from '@/app/site-config'

/**
 * GET /api/admin/alerts
 * Returns alert configuration from site-config.ts
 */
export async function GET() {
  try {
    const alert = getAlertConfig()
    return NextResponse.json({
      enabled: alert.isActive,
      message: alert.message,
      color: alert.type,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read alerts config' }, { status: 500 })
  }
}

/**
 * POST /api/admin/alerts
 * Note: In stateless architecture, config changes require editing site-config.ts
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return NextResponse.json({ 
      success: false,
      message: 'Alert configuration is managed in app/site-config.ts. Please edit the file directly and redeploy.',
      receivedConfig: body
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update alerts config' }, { status: 500 })
  }
}
