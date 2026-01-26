import { NextResponse } from 'next/server'
import { getAnalyticsData } from '@/lib/analytics'

export async function GET() {
  try {
    const stats = await getAnalyticsData()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
