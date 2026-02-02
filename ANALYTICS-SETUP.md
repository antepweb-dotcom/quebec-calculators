# 📊 Google Analytics 4 Dashboard

Şifreli analytics dashboard. Veriler **Google Analytics 4**'ten çekilir.

## 🎯 Özellikler

### 🔒 Güvenlik
- ✅ Şifre korumalı giriş
- ✅ Cookie-based authentication
- ✅ Güvenli logout

### 📈 Analytics (GA4'ten)
- ✅ Gerçek zamanlı veriler
- ✅ Ziyaretçi istatistikleri (bugün, dün, hafta, ay, yıl, tüm zamanlar)
- ✅ Görüntüleme istatistikleri
- ✅ Son 30 günlük trend grafiği
- ✅ Cihaz dağılımı (Mobil/Desktop/Tablet)
- ✅ Ülke bazında istatistikler
- ✅ En popüler 15 sayfa
- ✅ Returning visitor rate
- ✅ Ortalama sayfa/ziyaretçi

### 🎨 Modern UI
- ✅ Gradient glassmorphism tasarım
- ✅ Responsive (mobil uyumlu)
- ✅ Smooth animasyonlar
- ✅ Auto-refresh (10 saniye)

## 🚀 Kurulum

### 1. Google Analytics 4 Service Account

1. **Google Cloud Console**'a git: https://console.cloud.google.com
2. Projenizi seçin (veya yeni oluşturun)
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **Service Account**
5. Service account oluştur
6. **Keys** → **Add Key** → **Create New Key** → **JSON**
7. JSON dosyasını indir

### 2. GA4 Property ID

1. **Google Analytics**'e git: https://analytics.google.com
2. **Admin** → **Property Settings**
3. **Property ID**'yi kopyala (örn: `522075851`)

### 3. Service Account'a Erişim Ver

1. Google Analytics → **Admin** → **Property Access Management**
2. **Add Users** → Service account email'ini ekle
3. Role: **Viewer** yeterli

### 4. Environment Variables

`.env.local` dosyasına ekle:

```bash
# Stats Dashboard Password
STATS_PASSWORD=145314

# Google Analytics 4
GA4_PROPERTY_ID=522075851
GA4_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"..."}
```

**Not:** `GA4_CREDENTIALS` tek satırda olmalı (JSON string olarak).

### 5. Deploy

```bash
git add .
git commit -m "Add GA4 analytics dashboard"
git push
```

## 📊 Kullanım

### Giriş

1. `https://qcfinance.ca/stats/login` adresine git
2. Şifrenizi girin (varsayılan: `145314`)
3. Dashboard'a yönlendirileceksiniz

### Dashboard

**Ana Kartlar:**
- Bugün Ziyaretçi (büyüme oranı)
- Toplam Ziyaretçi (returning rate)
- Bugün Görüntüleme (sayfa/ziyaretçi)
- Bu Ay Ziyaretçi

**Periyot Kartları:**
- Dün, Bu Hafta, Bu Ay, Bu Yıl, Tüm Zamanlar

**30 Günlük Grafik:**
- Ziyaretçi (mavi) + Görüntüleme (mor)
- Çift bar chart

**Diğer:**
- Cihaz dağılımı
- Top 15 sayfa
- Top 15 ülke

### Auto-Refresh

Dashboard **her 10 saniyede** otomatik yenilenir.

## 🔧 Teknik Detaylar

### GA4 API Calls

```typescript
// Bugün ve dün
dateRanges: [
  { startDate: today, endDate: today },
  { startDate: yesterday, endDate: yesterday },
]

// Bu hafta
dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }]

// Bu ay
dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }]

// Bu yıl
dateRanges: [{ startDate: '365daysAgo', endDate: 'today' }]

// Tüm zamanlar (son 2 yıl)
dateRanges: [{ startDate: '730daysAgo', endDate: 'today' }]
```

### Metrics

- `activeUsers` - Unique visitors
- `screenPageViews` - Page views
- `totalUsers` - Total users (all time)

### Dimensions

- `date` - Günlük breakdown
- `pagePath` - Sayfa yolu
- `country` - Ülke
- `deviceCategory` - Cihaz tipi
- `newVsReturning` - Yeni vs returning

### Cache

API sonuçları **5 dakika** cache'lenir (Vercel'de).

## 🎯 Avantajlar

### vs File-Based System
- ✅ Gerçek veriler (GA4'ten)
- ✅ Tracking gerekmez (GA4 zaten track ediyor)
- ✅ Daha doğru (GA4'ün bot filtreleme vs.)
- ✅ Geçmiş veriler (GA4'te ne varsa)
- ✅ Bakım gerekmez

### vs Vercel KV
- ✅ Ücretsiz (GA4 ücretsiz)
- ✅ Setup basit
- ✅ Daha güvenilir

## 📝 Environment Variables

```bash
# Required
STATS_PASSWORD=145314              # Dashboard şifresi
GA4_PROPERTY_ID=123456789          # GA4 property ID
GA4_CREDENTIALS={"type":"..."}     # Service account JSON (tek satır)
```

## 🔒 Güvenlik

### Service Account
- Read-only erişim (Viewer role)
- Private key güvenli saklanmalı
- `.env.local` git'e commit edilmez

### Dashboard
- Şifre korumalı
- Cookie-based session
- 7 günlük session

## 🚀 Performans

- **API calls:** ~10 adet (her dashboard yüklemesinde)
- **Cache:** 5 dakika
- **Response time:** ~2-3 saniye (ilk yükleme)
- **Subsequent loads:** <500ms (cache'ten)

## 🎉 Özellikler

### Şu An Mevcut
- ✅ Şifreli giriş
- ✅ GA4 entegrasyonu
- ✅ Ziyaretçi istatistikleri
- ✅ 30 günlük trend
- ✅ Cihaz dağılımı
- ✅ Ülke istatistikleri
- ✅ Top sayfalar
- ✅ Modern UI
- ✅ Auto-refresh

### Eksik
- ❌ Real-time aktivite (GA4 Real-time API ayrı)
- ❌ Saatlik breakdown (eklenebilir)

## 🆚 Karşılaştırma

| Özellik | GA4 Dashboard | File-Based | Vercel KV |
|---------|---------------|------------|-----------|
| Kurulum | 15 dakika | 0 dakika | 5 dakika |
| Veri Kaynağı | GA4 | JSON dosyası | Redis |
| Doğruluk | Yüksek | Orta | Orta |
| Geçmiş Veri | ✅ | ❌ | ❌ |
| Maliyet | Ücretsiz | Ücretsiz | $20/ay |
| Bakım | Yok | Yok | Yok |

## 🎯 Kullanım Senaryoları

1. **Hızlı Bakış:** Dashboard'u aç, GA4 verilerini gör
2. **Trend Analizi:** 30 günlük grafiği incele
3. **Cihaz Optimizasyonu:** Mobil/desktop dağılımına bak
4. **Coğrafi Analiz:** Hangi ülkelerden ziyaret var
5. **Popüler İçerik:** En çok ziyaret edilen sayfalar

## 🎉 Tamamlandı!

GA4 analytics dashboard'unuz hazır!

**Giriş:** `https://qcfinance.ca/stats/login`  
**Şifre:** `145314` (veya kendi şifreniz)

**Avantajlar:**
- ✅ Gerçek GA4 verileri
- ✅ Tracking gerekmez
- ✅ Ücretsiz
- ✅ Doğru ve güvenilir
- ✅ Geçmiş veriler

Sorular için: [GA4 Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
