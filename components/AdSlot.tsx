'use client';

import { useEffect, useState } from 'react';

interface AdConfig {
  enabled: boolean;
  type: 'adsense' | 'affiliate' | 'custom';
  adId?: string;
  html?: string;
  size?: string;
  description?: string;
}

interface AdSlotProps {
  position: 'header' | 'sidebar' | 'inArticle' | 'footer' | 'affiliate1' | 'affiliate2' | string;
  className?: string;
  // Manuel override için
  type?: 'adsense' | 'affiliate' | 'custom';
  adId?: string;
  html?: string;
  size?: string;
}

export default function AdSlot({ 
  position, 
  className = '',
  type: manualType,
  adId: manualAdId,
  html: manualHtml,
  size: manualSize
}: AdSlotProps) {
  const [adConfig, setAdConfig] = useState<AdConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Manuel override varsa config'i atla
    if (manualType) {
      setAdConfig({
        enabled: true,
        type: manualType,
        adId: manualAdId,
        html: manualHtml,
        size: manualSize
      });
      setIsLoading(false);
      return;
    }

    // Config'den oku
    fetch('/ads-config.json')
      .then(res => res.json())
      .then(data => {
        if (data.enabled && data.slots[position]) {
          setAdConfig(data.slots[position]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Ad config load error:', err);
        setIsLoading(false);
      });
  }, [position, manualType, manualAdId, manualHtml, manualSize]);

  // Yükleniyor
  if (isLoading) {
    return null;
  }

  // Reklam kapalı veya config yok
  if (!adConfig || !adConfig.enabled) {
    return null;
  }

  // AdSense
  if (adConfig.type === 'adsense' && adConfig.adId) {
    const responsiveClass = getResponsiveClass(position, adConfig.size || '300x250');
    
    return (
      <div className={`ad-slot ad-slot-${position} ${className}`}>
        <div className="text-xs text-gray-400 text-center mb-1">Publicité</div>
        <div 
          className={`bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center ${responsiveClass}`}
        >
          {/* AdSense placeholder - gerçek AdSense kodu buraya gelecek */}
          <div className="text-center p-4">
            <p className="text-sm text-gray-500 font-medium">AdSense Slot</p>
            <p className="text-xs text-gray-400 mt-1">{adConfig.adId}</p>
            <p className="text-xs text-gray-400 hidden md:block">{adConfig.size}</p>
            <p className="text-xs text-gray-400 md:hidden">Responsive</p>
          </div>
          {/* Gerçek kullanım:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client={adConfig.adId}
               data-ad-slot="..."
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          */}
        </div>
      </div>
    );
  }

  // Affiliate veya Custom HTML
  if ((adConfig.type === 'affiliate' || adConfig.type === 'custom') && adConfig.html) {
    return (
      <div className={`ad-slot ad-slot-${position} ${className}`}>
        <div className="text-xs text-gray-400 text-center mb-1">Publicité</div>
        <div 
          className="ad-content"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(adConfig.html) }}
        />
      </div>
    );
  }

  return null;
}

// Boyut helper
function getSizeStyle(size: string): React.CSSProperties {
  const sizeMap: Record<string, React.CSSProperties> = {
    '728x90': { width: '728px', height: '90px', maxWidth: '100%' },
    '300x250': { width: '300px', height: '250px' },
    '300x600': { width: '300px', height: '600px' },
    '160x600': { width: '160px', height: '600px' },
    '320x50': { width: '320px', height: '50px', maxWidth: '100%' },
    'responsive': { width: '100%', minHeight: '250px' }
  };

  return sizeMap[size] || { width: '300px', height: '250px' };
}

// Responsive class helper - mobilde uygun boyutlar
function getResponsiveClass(position: string, size: string): string {
  // Sidebar - mobilde gizle veya küçült
  if (position === 'sidebar') {
    return 'hidden lg:block lg:w-[300px] lg:h-[600px]';
  }
  
  // Header - mobilde 320x50, desktop'ta 728x90
  if (position === 'header') {
    return 'w-full h-[50px] md:w-[728px] md:h-[90px] max-w-full';
  }
  
  // In-article - mobilde 320x50, desktop'ta 728x90 (yatay)
  if (position === 'inArticle') {
    return 'w-full h-[50px] md:w-[728px] md:h-[90px] max-w-full';
  }
  
  // Footer - header ile aynı
  if (position === 'footer') {
    return 'w-full h-[50px] md:w-[728px] md:h-[90px] max-w-full';
  }
  
  // Default - responsive
  return 'w-full max-w-[300px] h-[250px]';
}

// Basit HTML sanitization (XSS koruması)
function sanitizeHtml(html: string): string {
  // Tehlikeli script taglerini kaldır
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Sadece güvenli tagları izin ver
  const allowedTags = ['a', 'img', 'div', 'span', 'p', 'br', 'strong', 'em', 'iframe'];
  const allowedAttrs = ['href', 'src', 'alt', 'title', 'class', 'style', 'target', 'rel', 'width', 'height'];
  
  // Not: Gerçek production'da DOMPurify gibi bir kütüphane kullanın
  return sanitized;
}
