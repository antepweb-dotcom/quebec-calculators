# 📊 GA4 Dashboard Mapping Guide

## Demo'daki Her Metriğin GA4 ile Nasıl Çekileceği

Bu döküman `stats-dashboard-pro.html` demo'sundaki tüm metriklerin Google Analytics 4 API'si ile nasıl çekileceğini gösterir.

---

## ✅ **MEVCUT (Zaten Çalışıyor)**

### 1. **Toplam Hesaplama** (Total Calculations)
```typescript
// Mevcut: activeUsers metriği
// Demo'da: 24,567
const [data] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  metrics: [{ name: 'activeUsers' }]
});
```

### 2. **Aktif Kullanıcı** (Active Users)
```typescript
// Mevcut: activeUsers metriği
// Demo'da: 8,234
const [data] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  metrics: [{ name: 'activeUsers' }]
});
```

### 3. **Canlı Kullanıcılar** (Real-time Active)
```typescript
// Mevcut: runRealtimeReport
// Demo'da: 234
const [realtimeData] = await analyticsDataClient.runRealtimeReport({
  property: `properties/${propertyId}`,
  metrics: [{ name: 'activeUsers' }]
});
```

### 4. **Cihaz Dağılımı** (Device Distribution)
```typescript
// Mevcut: deviceCategory dimension
// Demo'da: Mobile, Desktop, Tablet
const [devicesData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'deviceCategory' }],
  metrics: [{ name: 'activeUsers' }]
});
```

### 5. **Yeni vs Dönen Kullanıcılar** (New vs Returning)
```typescript
// Mevcut: newVsReturning dimension
// Demo'da: Line chart comparison
const [returningData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'newVsReturning' }],
  metrics: [{ name: 'activeUsers' }]
});
```

---

## 🔧 **EKLENMESİ GEREKEN (Kolay)**

### 6. **Oturum Süresi** (Session Duration)
```typescript
// GA4 Metrik: averageSessionDuration
const [sessionData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  metrics: [
    { name: 'averageSessionDuration' },
    { name: 'sessions' }
  ]
});

// Süre aralıklarına göre gruplamak için:
const [durationData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'sessionDuration' }], // 0-10, 11-30, 31-60, etc.
  metrics: [{ name: 'sessions' }]
});
```

### 7. **Sayfa Başına Oturum** (Pages Per Session)
```typescript
// GA4 Metrik: screenPageViewsPerSession
const [pagesData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'date' }],
  metrics: [{ name: 'screenPageViewsPerSession' }],
  orderBys: [{ dimension: { dimensionName: 'date' } }]
});
```

### 8. **Bounce Rate** (Hemen Çıkma Oranı)
```typescript
// GA4 Metrik: bounceRate
const [bounceData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  metrics: [
    { name: 'bounceRate' },
    { name: 'engagementRate' }
  ]
});

// bounceRate: 0.32 = 32%
// engagementRate: 0.68 = 68%
```

### 9. **Trafik Kaynakları** (Traffic Sources)
```typescript
// GA4 Dimension: sessionSource veya sessionMedium
const [trafficData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [
    { name: 'sessionSource' },
    { name: 'sessionMedium' }
  ],
  metrics: [{ name: 'sessions' }],
  orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  limit: 10
});

// Sonuçlar:
// - google / organic (Organik Arama)
// - (direct) / (none) (Direkt)
// - facebook / social (Sosyal Medya)
// - example.com / referral (Referans)
```

### 10. **Kullanım Trendi** (Usage Trend)
```typescript
// Mevcut: last30Days zaten var
// Demo'da: 30 gün gerçek + 7 gün tahmin
const [trendData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'date' }],
  metrics: [
    { name: 'activeUsers' },
    { name: 'sessions' },
    { name: 'screenPageViews' }
  ],
  orderBys: [{ dimension: { dimensionName: 'date' } }]
});
```

---

## 🎯 **CUSTOM EVENT TRACKING GEREKLİ**

### 11. **Hesaplayıcı Kullanımı** (Calculator Usage)
```typescript
// Custom event: calculator_use
// STATS-ENHANCEMENT-PLAN.md'de tanımlı

// Frontend'de track et:
gtag('event', 'calculator_use', {
  calculator_name: 'Salaire Net',
  salary_range: 50000,
  province: 'quebec'
});

// GA4'ten çek:
const [calcData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'eventName' }],
  metrics: [{ name: 'eventCount' }],
  dimensionFilter: {
    filter: {
      fieldName: 'eventName',
      stringFilter: { value: 'calculator_use' }
    }
  }
});
```

### 12. **PDF Export** (PDF İndirme)
```typescript
// Custom event: pdf_export
gtag('event', 'pdf_export', {
  calculator_name: 'Salaire Net'
});

const [pdfData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'customEvent:calculator_name' }],
  metrics: [{ name: 'eventCount' }],
  dimensionFilter: {
    filter: {
      fieldName: 'eventName',
      stringFilter: { value: 'pdf_export' }
    }
  }
});
```

### 13. **Ortaklık Tıklaması** (Affiliate Clicks)
```typescript
// Custom event: affiliate_click
gtag('event', 'affiliate_click', {
  calculator_name: 'Hypothèque',
  partner_name: 'Desjardins'
});

const [affiliateData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'customEvent:calculator_name' }],
  metrics: [{ name: 'eventCount' }],
  dimensionFilter: {
    filter: {
      fieldName: 'eventName',
      stringFilter: { value: 'affiliate_click' }
    }
  }
});
```

### 14. **Dönüşüm Oranı** (Conversion Rate)
```typescript
// Custom conversion event: calculator_complete
gtag('event', 'calculator_complete', {
  calculator_name: 'Salaire Net',
  value: 1
});

// GA4'te conversion olarak işaretle
// Admin > Events > Mark as conversion

const [conversionData] = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  metrics: [
    { name: 'sessions' },
    { name: 'conversions' }
  ]
});

// Conversion Rate = (conversions / sessions) * 100
```

---

## 🔮 **ADVANCED FEATURES (Tahmin & Anomali)**

### 15. **Tahmin (Prediction)**
```typescript
// GA4'te built-in prediction yok
// Kendi ML modelinizi kullanın:

// Option 1: Simple Linear Regression
function predictNext7Days(last30Days: number[]) {
  // Calculate trend
  const n = last30Days.length;
  const sumX = (n * (n + 1)) / 2;
  const sumY = last30Days.reduce((a, b) => a + b, 0);
  const sumXY = last30Days.reduce((sum, y, x) => sum + (x + 1) * y, 0);
  const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Predict next 7 days
  return Array.from({length: 7}, (_, i) => 
    Math.round(slope * (n + i + 1) + intercept)
  );
}

// Option 2: Use Prophet (Python)
// Option 3: Use TensorFlow.js
```

### 16. **Anomali Tespiti** (Anomaly Detection)
```typescript
// Simple statistical approach
function detectAnomalies(data: number[]) {
  const mean = data.reduce((a, b) => a + b) / data.length;
  const stdDev = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  );
  
  // Values beyond 2 standard deviations are anomalies
  return data.map((value, index) => ({
    index,
    value,
    isAnomaly: Math.abs(value - mean) > 2 * stdDev
  }));
}

// Advanced: Use Isolation Forest or LSTM
```

---

## 📋 **IMPLEMENTATION CHECKLIST**

### Phase 1: Mevcut GA4 Metriklerini Kullan (Hemen)
- [x] Active Users
- [x] Real-time Users
- [x] Device Distribution
- [x] New vs Returning
- [x] Top Pages
- [x] Countries
- [ ] Session Duration
- [ ] Pages Per Session
- [ ] Bounce Rate
- [ ] Traffic Sources

### Phase 2: Custom Events Ekle (1-2 Gün)
- [ ] calculator_use event
- [ ] pdf_export event
- [ ] affiliate_click event
- [ ] calculator_complete event (conversion)
- [ ] scenario_save event
- [ ] share_click event

### Phase 3: Advanced Analytics (1 Hafta)
- [ ] Prediction model (Linear Regression veya Prophet)
- [ ] Anomaly detection (Statistical veya ML)
- [ ] Cohort analysis
- [ ] Funnel analysis

---

## 🚀 **HIZLI BAŞLANGIÇ**

### 1. Mevcut Analytics'i Genişlet
```typescript
// lib/analytics.ts'e ekle:

export async function getSessionMetrics() {
  const [data] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'averageSessionDuration' },
      { name: 'screenPageViewsPerSession' },
      { name: 'bounceRate' },
      { name: 'engagementRate' }
    ]
  });

  return {
    avgSessionDuration: parseFloat(data.rows?.[0]?.metricValues?.[0]?.value || '0'),
    pagesPerSession: parseFloat(data.rows?.[0]?.metricValues?.[1]?.value || '0'),
    bounceRate: parseFloat(data.rows?.[0]?.metricValues?.[2]?.value || '0'),
    engagementRate: parseFloat(data.rows?.[0]?.metricValues?.[3]?.value || '0')
  };
}

export async function getTrafficSources() {
  const [data] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [
      { name: 'sessionSource' },
      { name: 'sessionMedium' }
    ],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10
  });

  return data.rows?.map(row => ({
    source: row.dimensionValues?.[0]?.value || '',
    medium: row.dimensionValues?.[1]?.value || '',
    sessions: parseInt(row.metricValues?.[0]?.value || '0')
  })) || [];
}
```

### 2. Custom Events Ekle
```typescript
// hooks/useDebouncedAnalytics.ts zaten var!
// Sadece kullan:

import { useCalculatorTracking } from '@/hooks/useDebouncedAnalytics';

function SalaryCalculator() {
  const trackEvent = useCalculatorTracking('salary_calculator');
  
  const handleCalculate = () => {
    // Hesaplama yap
    calculateResults();
    
    // Track et
    trackEvent({
      action: 'calculate',
      salary: grossSalary,
      province: 'quebec'
    });
  };
}
```

---

## 📊 **SONUÇ**

### Demo'daki Özellikler:
- ✅ **%70 GA4 ile Hazır** - Sadece API çağrıları ekle
- ⚠️ **%20 Custom Events Gerekli** - Frontend'e event tracking ekle
- 🔮 **%10 ML/Advanced** - Tahmin ve anomali için ekstra kod

### Tahmini Süre:
- **1 Gün**: Mevcut GA4 metriklerini dashboard'a entegre et
- **2 Gün**: Custom event tracking ekle
- **1 Hafta**: Advanced features (prediction, anomaly)

**Toplam: 1-2 hafta** tam çalışır halde! 🚀
