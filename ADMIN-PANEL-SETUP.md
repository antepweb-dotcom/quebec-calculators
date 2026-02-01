# 🎯 Admin Panel Setup Guide

Modern ve detaylı admin paneli başarıyla oluşturuldu! Bu rehber Vercel'de kurulum için gerekli adımları açıklıyor.

## 📦 Yeni Özellikler

### ✨ Modern Admin Dashboard
- **Real-time Analytics**: Gerçek zamanlı ziyaretçi ve sayfa görüntüleme istatistikleri
- **Interactive Charts**: 30 günlük trafik trendi grafiği
- **Top Pages Table**: En çok ziyaret edilen sayfalar tablosu
- **Ads Manager**: Reklam yapılandırmasını yönetme
- **Alert Manager**: Site genelinde uyarı banner'ı yönetimi
- **Quick Toggles**: Hızlı açma/kapama butonları

### 🗄️ Database Integration
- **Vercel Postgres**: Serverless PostgreSQL veritabanı
- **Real Data Tracking**: Gerçek ziyaretçi ve tıklama takibi
- **Persistent Settings**: Kalıcı ayar saklama

## 🚀 Vercel'de Kurulum Adımları

### 1️⃣ Vercel Postgres Oluştur

1. **Vercel Dashboard**'a git: https://vercel.com/dashboard
2. Projenizi seçin
3. **Storage** sekmesine tıklayın
4. **Create Database** → **Postgres** seçin
5. Database adı girin (örn: `qcfinance-db`)
6. **Create** butonuna tıklayın

### 2️⃣ Environment Variables Ekle

Vercel otomatik olarak şu environment variable'ları ekleyecek:
```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

Ek olarak admin şifresi ekleyin:
```
ADMIN_PASSWORD=145314
```

### 3️⃣ Dependencies Yükle

Lokal olarak:
```bash
npm install
```

Bu komut `@vercel/postgres` paketini yükleyecek.

### 4️⃣ Database'i Initialize Et

**ÖNEMLİ**: Bu adımı Vercel'de deploy ettikten SONRA yapın!

#### Seçenek A: Vercel CLI ile (Önerilen)
```bash
# Vercel CLI yükle (eğer yoksa)
npm i -g vercel

# Login ol
vercel login

# Database'i initialize et
vercel env pull .env.local
npx tsx scripts/init-db.ts
```

#### Seçenek B: Vercel Dashboard'dan
1. Vercel Dashboard → Projeniz → **Storage** → Database'iniz
2. **Query** sekmesine tıklayın
3. Aşağıdaki SQL'i çalıştırın:

```sql
-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path VARCHAR(500) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(2),
  device VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);

-- Create ad_clicks table
CREATE TABLE IF NOT EXISTS ad_clicks (
  id SERIAL PRIMARY KEY,
  ad_slot VARCHAR(100) NOT NULL,
  path VARCHAR(500) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ad_clicks_slot ON ad_clicks(ad_slot);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_timestamp ON ad_clicks(timestamp);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  ads_enabled BOOLEAN DEFAULT true,
  adsense_id VARCHAR(100),
  alert_active BOOLEAN DEFAULT false,
  alert_message TEXT,
  alert_type VARCHAR(20) DEFAULT 'info',
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT check_id CHECK (id = 1)
);

-- Insert default settings
INSERT INTO site_settings (id, ads_enabled, adsense_id, alert_active, alert_message, alert_type)
VALUES (1, true, 'ca-pub-XXXXXXXXXXXXXXXX', false, '', 'info')
ON CONFLICT (id) DO NOTHING;
```

### 5️⃣ Deploy

```bash
git add .
git commit -m "Add modern admin panel with database"
git push
```

Vercel otomatik olarak deploy edecek!

## 🔐 Admin Paneline Giriş

1. https://qcfinance.ca/login adresine git
2. Şifrenizi girin (ADMIN_PASSWORD environment variable)
3. Admin dashboard'a yönlendirileceksiniz

## 📊 Admin Panel Özellikleri

### Overview Tab
- **Estimated Revenue**: Son 30 günlük tahmini gelir
- **Total Page Views**: Toplam sayfa görüntüleme
- **Ad Clicks**: Reklam tıklama sayısı ve CTR
- **Unique Visitors**: Benzersiz ziyaretçi sayısı
- **Traffic Chart**: 30 günlük trafik trendi
- **Top Pages**: En çok ziyaret edilen sayfalar

### Analytics Tab
- Detaylı trafik analizi
- Mobil vs Desktop dağılımı
- Reklam performansı (slot bazında)
- Günlük trafik grafiği

### Ads Manager Tab
- **Master Switch**: Tüm reklamları hızlıca aç/kapa
- **AdSense ID**: Google AdSense publisher ID'nizi girin
- **Real-time Updates**: Değişiklikler anında yansır

### Alerts Tab
- **Quick Toggle**: Uyarı banner'ını hızlıca aç/kapa
- **Alert Types**: Info, Warning, Error, Success
- **Live Preview**: Değişiklikleri canlı önizle
- **Custom Message**: Özel mesaj yazın

### Settings Tab
- Sistem bilgileri
- Database bağlantı durumu
- Son güncelleme zamanı

## 🔄 Auto-Refresh

Dashboard her 60 saniyede bir otomatik olarak yenilenir. Manuel yenilemek için sağ üstteki **Refresh** butonuna tıklayın.

## 📈 Tracking

Tüm sayfa ziyaretleri otomatik olarak track edilir. Ek bir şey yapmanıza gerek yok!

## 🎨 Özelleştirme

### Renk Teması
`app/admin/AdminDashboard.tsx` dosyasında renkleri değiştirebilirsiniz.

### Grafik Ayarları
`app/admin/components/TrafficChart.tsx` dosyasında grafik görünümünü özelleştirebilirsiniz.

### Stats Cards
`app/admin/components/StatsCard.tsx` dosyasında kart tasarımını değiştirebilirsiniz.

## 🐛 Troubleshooting

### Database bağlanamıyor
- Environment variable'ların doğru olduğundan emin olun
- Vercel Dashboard'da database'in aktif olduğunu kontrol edin
- `vercel env pull` ile local environment'ı güncelleyin

### Admin paneline giriş yapamıyorum
- `ADMIN_PASSWORD` environment variable'ının ayarlandığından emin olun
- Vercel'de redeploy yapın
- Cookie'leri temizleyin ve tekrar deneyin

### Veriler görünmüyor
- Database'in initialize edildiğinden emin olun
- SQL query'lerini Vercel Dashboard'dan kontrol edin
- Browser console'da hata olup olmadığını kontrol edin

## 📝 Notlar

- **Free Plan Limits**: Vercel Postgres free plan 512 MB storage ve 60 concurrent connection sağlar
- **Data Retention**: Veriler kalıcıdır, silinmez (manuel temizlik gerekebilir)
- **Performance**: Serverless database, cold start'larda 1-2 saniye gecikme olabilir
- **Security**: Admin şifresini güçlü tutun ve düzenli değiştirin

## 🎉 Tamamlandı!

Admin paneliniz hazır! Artık gerçek zamanlı analytics, reklam yönetimi ve site ayarlarını tek bir yerden kontrol edebilirsiniz.

Sorularınız için: https://vercel.com/docs/storage/vercel-postgres
