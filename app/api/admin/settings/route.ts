import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/app/site-config';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

// GET current settings
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        ads: siteConfig.ads,
        alert: siteConfig.alert,
        analytics: siteConfig.analytics
      }
    });
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get settings' },
      { status: 500 }
    );
  }
}

// POST update settings (writes to site-config.ts)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('📝 Updating settings:', type, data);

    // Read current site-config.ts
    const configPath = path.join(process.cwd(), 'app', 'site-config.ts');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    if (type === 'ads') {
      // Update ads configuration
      const { isEnabled, googleAdSenseId } = data;
      
      // Update isEnabled
      configContent = configContent.replace(
        /isEnabled:\s*(true|false)/,
        `isEnabled: ${isEnabled}`
      );
      
      // Update googleAdSenseId
      if (googleAdSenseId) {
        configContent = configContent.replace(
          /googleAdSenseId:\s*['"].*?['"]/,
          `googleAdSenseId: '${googleAdSenseId}'`
        );
      }
    } else if (type === 'alert') {
      // Update alert configuration
      const { isActive, message, alertType } = data;
      
      // Update isActive
      configContent = configContent.replace(
        /alert:\s*{\s*isActive:\s*(true|false)/,
        `alert: {\n    isActive: ${isActive}`
      );
      
      // Update type
      if (alertType) {
        configContent = configContent.replace(
          /type:\s*['"].*?['"],\s*\/\/ 'info'/,
          `type: '${alertType}', // 'info'`
        );
      }
      
      // Update message
      if (message !== undefined) {
        configContent = configContent.replace(
          /message:\s*['"].*?['"]/,
          `message: '${message.replace(/'/g, "\\'")}'`
        );
      }
    } else if (type === 'adSlot') {
      // Update individual ad slot
      const { slot, enabled } = data;
      
      // Find and update the specific slot
      const slotRegex = new RegExp(
        `${slot}:\\s*{[^}]*enabled:\\s*(true|false)`,
        'g'
      );
      configContent = configContent.replace(
        slotRegex,
        (match) => match.replace(/(enabled:\s*)(true|false)/, `$1${enabled}`)
      );
    }

    // Write updated config
    fs.writeFileSync(configPath, configContent, 'utf-8');

    console.log('✅ Settings updated successfully');

    // Revalidate all pages to reflect changes
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
