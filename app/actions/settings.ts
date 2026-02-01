/**
 * Server Actions for Site Settings
 * 
 * These functions handle all site configuration updates.
 */

'use server';

import { getSiteSettings, updateSiteSettings, type SiteSettings } from '@/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Get current site settings
 */
export async function getSettings(): Promise<SiteSettings | null> {
  try {
    return await getSiteSettings();
  } catch (error) {
    console.error('Failed to get settings:', error);
    return null;
  }
}

/**
 * Update ads configuration
 */
export async function updateAdsConfig(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const adsEnabled = formData.get('adsEnabled') === 'true';
    const adSenseId = formData.get('adSenseId') as string;

    // Validate
    if (adsEnabled && !adSenseId) {
      return {
        success: false,
        error: 'AdSense ID is required when ads are enabled'
      };
    }

    // Update database
    const success = await updateSiteSettings({
      adsEnabled,
      adSenseId
    });

    if (!success) {
      return {
        success: false,
        error: 'Failed to update settings'
      };
    }

    // Revalidate all pages to reflect changes
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error) {
    console.error('Failed to update ads config:', error);
    return {
      success: false,
      error: 'An error occurred while updating settings'
    };
  }
}

/**
 * Update alert banner configuration
 */
export async function updateAlertConfig(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const alertActive = formData.get('alertActive') === 'true';
    const alertMessage = formData.get('alertMessage') as string;
    const alertType = formData.get('alertType') as 'info' | 'warning' | 'error' | 'success';

    // Validate
    if (alertActive && !alertMessage) {
      return {
        success: false,
        error: 'Alert message is required when alert is active'
      };
    }

    // Update database
    const success = await updateSiteSettings({
      alertActive,
      alertMessage,
      alertType
    });

    if (!success) {
      return {
        success: false,
        error: 'Failed to update alert settings'
      };
    }

    // Revalidate all pages to reflect changes
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error) {
    console.error('Failed to update alert config:', error);
    return {
      success: false,
      error: 'An error occurred while updating alert settings'
    };
  }
}

/**
 * Toggle ads on/off quickly
 */
export async function toggleAds(): Promise<{ success: boolean; newState: boolean }> {
  try {
    const settings = await getSiteSettings();
    if (!settings) {
      return { success: false, newState: false };
    }

    const newState = !settings.adsEnabled;
    const success = await updateSiteSettings({ adsEnabled: newState });

    if (success) {
      revalidatePath('/', 'layout');
    }

    return { success, newState };
  } catch (error) {
    console.error('Failed to toggle ads:', error);
    return { success: false, newState: false };
  }
}

/**
 * Toggle alert on/off quickly
 */
export async function toggleAlert(): Promise<{ success: boolean; newState: boolean }> {
  try {
    const settings = await getSiteSettings();
    if (!settings) {
      return { success: false, newState: false };
    }

    const newState = !settings.alertActive;
    const success = await updateSiteSettings({ alertActive: newState });

    if (success) {
      revalidatePath('/', 'layout');
    }

    return { success, newState };
  } catch (error) {
    console.error('Failed to toggle alert:', error);
    return { success: false, newState: false };
  }
}
