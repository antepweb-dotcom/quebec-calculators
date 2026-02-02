import { NextResponse } from 'next/server';
import { getAnalytics } from '@/lib/analytics';

export const revalidate = 300; // Cache 5 dakika

export async function GET() {
  try {
    const stats = await getAnalytics();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
