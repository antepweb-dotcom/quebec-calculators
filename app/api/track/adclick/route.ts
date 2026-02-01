import { NextRequest, NextResponse } from 'next/server';
import { trackAdClick } from '@/lib/analytics-storage';

/**
 * Track ad clicks
 * Called when user clicks on an ad
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slot, path } = body;

    if (!slot || !path) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await trackAdClick(slot, path);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ad click tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track ad click' },
      { status: 500 }
    );
  }
}
