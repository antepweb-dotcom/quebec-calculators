# 📊 Stats Dashboard Enhancement Plan

## 🎯 Problem
Stats sayfasında **kullanıcı hareketlerini** göremiyoruz. Şu an sadece sayfa görüntüleme ve ziyaretçi sayıları var.

## 🔍 Eksik Metrikler

### 1. **User Behavior Metrics (Kullanıcı Davranışları)**
- ❌ Bounce Rate (Hemen Çıkma Oranı) - **MOCK DATA**
- ❌ Average Session Duration (Ortalama Oturum Süresi) - **MOCK DATA**
- ❌ Pages per Session (Oturum Başına Sayfa) - **MOCK DATA**
- ❌ Traffic Sources (Trafik Kaynakları) - **MOCK DATA**
- ❌ User Flow (Kullanıcı Akışı) - **YOK**
- ❌ Event Tracking (Buton tıklamaları, form göndermeleri) - **YOK**

### 2. **Calculator-Specific Metrics (Hesaplayıcı Metrikleri)**
- ❌ Hangi hesaplayıcı kaç kez kullanıldı? - **YOK**
- ❌ Hesaplayıcı başına ortalama kullanım süresi - **YOK**
- ❌ Hangi input değerleri en çok kullanılıyor? - **YOK**
- ❌ PDF export kaç kez kullanıldı? - **YOK**
- ❌ Scenario save kaç kez kullanıldı? - **YOK**
- ❌ Share button kaç kez tıklandı? - **YOK**

### 3. **Conversion Metrics (Dönüşüm Metrikleri)**
- ❌ Kaç kullanıcı hesaplama yaptı? (vs sadece baktı) - **YOK**
- ❌ Kaç kullanıcı birden fazla hesaplayıcı kullandı? - **YOK**
- ❌ Kaç kullanıcı geri döndü? (returning visitors) - **VAR (GA4)**
- ❌ Ad click-through rate - **YOK**
- ❌ Contact form submission rate - **YOK**

### 4. **SEO & Traffic Quality (SEO & Trafik Kalitesi)**
- ❌ Hangi keyword'ler trafik getiriyor? - **YOK (Google Search Console gerekli)**
- ❌ Hangi sayfalar en çok organik trafik alıyor? - **VAR (GA4)**
- ❌ Average position in search results - **YOK (GSC gerekli)**
- ❌ Click-through rate from search - **YOK (GSC gerekli)**
- ❌ Impressions vs Clicks - **YOK (GSC gerekli)**

### 5. **Revenue Metrics (Gelir Metrikleri)**
- ❌ AdSense günlük/aylık gelir - **YOK (AdSense API gerekli)**
- ❌ RPM (Revenue per 1000 impressions) - **YOK**
- ❌ Ad viewability rate - **YOK**
- ❌ Best performing ad slots - **YOK**

---

## 🛠️ Çözüm: 3 Aşamalı Plan

### **PHASE 1: GA4 Event Tracking (Hemen Yapılabilir)**

#### A. Custom Events Ekle
```typescript
// lib/analytics-events.ts
export const trackCalculatorUse = (calculatorName: string, inputs: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_use', {
      calculator_name: calculatorName,
      salary_range: inputs.salary ? Math.floor(inputs.salary / 10000) * 10000 : null,
      province: inputs.province || 'quebec',
    });
  }
};

export const trackPDFExport = (calculatorName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pdf_export', {
      calculator_name: calculatorName,
    });
  }
};

export const trackScenarioSave = (calculatorName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scenario_save', {
      calculator_name: calculatorName,
    });
  }
};

export const trackShareClick = (calculatorName: string, method: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      calculator_name: calculatorName,
      method: method, // 'copy_link', 'facebook', 'twitter'
    });
  }
};

export const trackAdClick = (adSlot: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ad_click', {
      ad_slot: adSlot,
    });
  }
};
```

#### B. Her Hesaplayıcıya Event Tracking Ekle
```typescript
// Örnek: components/SalaryCalculator.tsx
import { trackCalculatorUse, trackPDFExport } from '@/lib/analytics-events';

const handleCalculate = () => {
  // Hesaplama yap
  calculateResults();
  
  // Event track et
  trackCalculatorUse('salary_calculator', {
    salary: grossSalary,
    province: 'quebec',
  });
};

const handleExportPDF = () => {
  exportToPDF();
  trackPDFExport('salary_calculator');
};
```

#### C. GA4'ten Event Data Çek
```typescript
// lib/analytics.ts içine ekle
export async function getCalculatorEvents() {
  if (!analyticsDataClient || !propertyId) {
    return [];
  }

  const [eventsData] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [
      { name: 'eventName' },
      { name: 'customEvent:calculator_name' }
    ],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: {
          matchType: 'CONTAINS',
          value: 'calculator',
        },
      },
    },
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 50,
  });

  return eventsData.rows?.map(row => ({
    eventName: row.dimensionValues?.[0]?.value || '',
    calculatorName: row.dimensionValues?.[1]?.value || '',
    count: parseInt(row.metricValues?.[0]?.value || '0'),
  })) || [];
}
```

---

### **PHASE 2: Google Search Console Integration (1-2 Gün)**

#### A. GSC API Setup
```bash
npm install googleapis
```

#### B. GSC Data Çekme
```typescript
// lib/search-console.ts
import { google } from 'googleapis';

const searchconsole = google.searchconsole('v1');

export async function getSearchConsoleData() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_CREDENTIALS || '{}'),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const authClient = await auth.getClient();
  
  const response = await searchconsole.searchanalytics.query({
    auth: authClient,
    siteUrl: 'https://qcfinance.ca',
    requestBody: {
      startDate: '2024-01-01',
      endDate: new Date().toISOString().split('T')[0],
      dimensions: ['query', 'page'],
      rowLimit: 100,
    },
  });

  return response.data.rows?.map(row => ({
    query: row.keys?.[0] || '',
    page: row.keys?.[1] || '',
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  })) || [];
}
```

#### C. Stats Dashboard'a Ekle
```typescript
// app/stats/page.tsx
const [searchData, setSearchData] = useState([]);

useEffect(() => {
  fetch('/api/search-console')
    .then(res => res.json())
    .then(data => setSearchData(data));
}, []);

// Render
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-bold mb-4">Top Search Queries</h3>
  <table>
    <thead>
      <tr>
        <th>Query</th>
        <th>Clicks</th>
        <th>Impressions</th>
        <th>CTR</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      {searchData.map(row => (
        <tr key={row.query}>
          <td>{row.query}</td>
          <td>{row.clicks}</td>
          <td>{row.impressions}</td>
          <td>{(row.ctr * 100).toFixed(1)}%</td>
          <td>{row.position.toFixed(1)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

### **PHASE 3: AdSense Integration (Opsiyonel)**

#### A. AdSense Management API
```typescript
// lib/adsense.ts
import { google } from 'googleapis';

const adsense = google.adsense('v2');

export async function getAdSenseRevenue() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.ADSENSE_CREDENTIALS || '{}'),
    scopes: ['https://www.googleapis.com/auth/adsense.readonly'],
  });

  const authClient = await auth.getClient();
  
  const response = await adsense.accounts.reports.generate({
    auth: authClient,
    account: 'accounts/pub-2733523563879283',
    dateRange: 'LAST_30_DAYS',
    metrics: ['EARNINGS', 'PAGE_VIEWS', 'CLICKS'],
    dimensions: ['DATE'],
  });

  return response.data;
}
```

---

## 📈 Yeni Stats Dashboard Tasarımı

### **Section 1: Overview (Mevcut)**
- ✅ Bugün/Dün/Hafta/Ay/Yıl ziyaretçi
- ✅ Aktif kullanıcılar
- ✅ Returning rate

### **Section 2: User Behavior (YENİ)**
```
┌─────────────────────────────────────────┐
│ 📊 Kullanıcı Davranışları               │
├─────────────────────────────────────────┤
│ Bounce Rate: 45.2% ↓ 2.3%              │
│ Avg Session: 3m 24s ↑ 12s              │
│ Pages/Session: 2.8 ↑ 0.3               │
│ Avg Time on Page: 2m 15s               │
└─────────────────────────────────────────┘
```

### **Section 3: Calculator Usage (YENİ)**
```
┌─────────────────────────────────────────┐
│ 🧮 En Çok Kullanılan Hesaplayıcılar    │
├─────────────────────────────────────────┤
│ 1. Salaire Net        2,450 kullanım   │
│ 2. Hypothèque         1,230 kullanım   │
│ 3. Allocations        890 kullanım     │
│ 4. Louer/Acheter      670 kullanım     │
│ 5. Assurance Emploi   540 kullanım     │
└─────────────────────────────────────────┘
```

### **Section 4: SEO Performance (YENİ)**
```
┌─────────────────────────────────────────┐
│ 🔍 Top Search Queries (Son 30 Gün)     │
├─────────────────────────────────────────┤
│ Query                  Clicks  Position │
│ salaire net quebec     1,234   3.2      │
│ calcul hypotheque      890     5.1      │
│ impot quebec 2026      670     4.8      │
└─────────────────────────────────────────┘
```

### **Section 5: Revenue (YENİ - Opsiyonel)**
```
┌─────────────────────────────────────────┐
│ 💰 AdSense Gelir (Son 30 Gün)          │
├─────────────────────────────────────────┤
│ Toplam Gelir: $234.56                  │
│ RPM: $2.34                             │
│ Clicks: 456                            │
│ CTR: 1.2%                              │
└─────────────────────────────────────────┘
```

---

## ✅ Action Items (Öncelik Sırasına Göre)

### **Hemen Yap (Bu Hafta)**
1. [ ] GA4 custom events ekle (calculator_use, pdf_export, etc.)
2. [ ] Her hesaplayıcıya event tracking ekle
3. [ ] Stats dashboard'a calculator usage section ekle

### **Yakında Yap (Bu Ay)**
4. [ ] Google Search Console API entegrasyonu
5. [ ] Top queries ve keywords göster
6. [ ] Bounce rate ve session duration ekle

### **Sonra Yap (Gelecek Ay)**
7. [ ] AdSense API entegrasyonu (eğer gelir önemliyse)
8. [ ] User flow visualization
9. [ ] A/B testing infrastructure

---

## 🎯 Beklenen Sonuçlar

**Phase 1 Sonrası:**
- Hangi hesaplayıcılar popüler görebileceksin
- Kullanıcı engagement'ı ölçebileceksin
- Hangi özelliklerin kullanıldığını göreceksin

**Phase 2 Sonrası:**
- Hangi keyword'ler trafik getiriyor göreceksin
- SEO stratejini optimize edebileceksin
- Hangi sayfaların ranking'i iyi göreceksin

**Phase 3 Sonrası:**
- Gelir takibi yapabileceksin
- En karlı sayfaları göreceksin
- Ad placement'ı optimize edebileceksin

---

## 💡 Pro Tips

1. **Event tracking'i abartma** - Sadece önemli aksiyonları track et
2. **Privacy'e dikkat et** - Kişisel veri (gerçek maaş değerleri) track etme
3. **Performance'a dikkat et** - Her event GA4'e gitmemeli (debounce kullan)
4. **Data retention** - GA4'te 14 aylık data tutuluyor, önemli metrikleri kaydet

---

## 📚 Kaynaklar

- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original)
- [AdSense Management API](https://developers.google.com/adsense/management)

---

**Son Güncelleme:** 2026-02-03
**Durum:** 🟡 Planning Phase
