import { getSiteConfig } from '@/app/actions/adminActions';
import Script from 'next/script';

export default async function GlobalWrapper({ children }: { children: React.ReactNode }) {
  let config = null;
  
  try {
    config = await getSiteConfig();
  } catch (error) {
    console.error('Failed to load site config:', error);
    // Gracefully handle error - site will work without config
  }

  return (
    <>
      {/* Alert Banner */}
      {config?.isAlertActive && config?.alertMessage && (
        <div className="bg-blue-600 text-white px-4 py-3 text-center">
          <p className="text-sm font-medium">{config.alertMessage}</p>
        </div>
      )}

      {/* Google AdSense Script */}
      {config?.isAdsEnabled && config?.adSenseId && (
        <>
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adSenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      )}

      {children}
    </>
  );
}
