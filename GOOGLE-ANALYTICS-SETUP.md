# Google Analytics 4 Kurulum Rehberi

Bu rehber, admin panelinde gerçek verileri görmek için Google Analytics 4'ü nasıl kuracağınızı anlatır.

## 📋 Gereksinimler

1. Google Analytics 4 hesabı
2. Google Cloud Platform hesabı (ücretsiz)
3. Vercel hesabı (environment variables için)

---

## 🚀 Adım 1: Google Analytics 4 Kurulumu

### 1.1 GA4 Property Oluşturma

1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. **Admin** (sol alt köşe) > **Create Property** tıklayın
3. Property adı girin: `Quebec Calculators`
4. Timezone: `Canada/Eastern`
5. Currency: `Canadian Dollar (CAD)`
6. **Next** > **Create** tıklayın

### 1.2 Data Stream Oluşturma

1. Property oluşturduktan sonra **Data Streams** > **Add stream** > **Web**
2. Website URL'nizi girin: `https://your-site.vercel.app`
3. Stream adı: `Quebec Calculators Website`
4. **Create stream** tıklayın
5. **Measurement ID**'yi kopyalayın (örnek: `G-XXXXXXXXXX`)
   - Bu ID'yi `.env` dosyanıza `NEXT_PUBLIC_GA_MEASUREMENT_ID` olarak ekleyin

### 1.3 Property ID'yi Bulma

1. GA4 Admin > **Property Settings**
2. Sayfanın üst kısmında **Property ID** göreceksiniz (örnek: `123456789`)
3. Bu ID'yi kopyalayın, sonra kullanacağız

---

## 🔑 Adım 2: Google Cloud Service Account Oluşturma

Admin panelinin GA4'ten veri çekmesi için bir Service Account gerekli.

### 2.1 Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni proje oluşturun: **Select a project** > **New Project**
   - Proje adı: `Quebec Calculators Analytics`
   - **Create** tıklayın

### 2.2 Analytics Data API'yi Etkinleştirme

1. Sol menüden **APIs & Services** > **Library**
2. Arama kutusuna `Google Analytics Data API` yazın
3. **Google Analytics Data API** seçin
4. **Enable** tıklayın

### 2.3 Service Account Oluşturma

1. **APIs & Services** > **Credentials**
2. **Create Credentials** > **Service Account**
3. Service account adı: `analytics-reader`
4. **Create and Continue** tıklayın
5. Role seçin: **Viewer** (veya daha spesifik: **Analytics Viewer**)
6. **Continue** > **Done** tıklayın

### 2.4 Service Account Key Oluşturma

1. Oluşturduğunuz service account'a tıklayın
2. **Keys** tab'ına gidin
3. **Add Key** > **Create new key**
4. **JSON** seçin > **Create**
5. JSON dosyası indirilecek - **BU DOSYAYI GÜVENLİ TUTUN!**

### 2.5 Service Account Email'i Kopyalama

1. Service account detaylarında **Email** adresini kopyalayın
   - Örnek: `analytics-reader@quebec-calculators.iam.gserviceaccount.com`

---

## 🔗 Adım 3: GA4'e Service Account Erişimi Verme

1. [Google Analytics](https://analytics.google.com/) > **Admin**
2. **Property Access Management** tıklayın
3. **+** (Add users) tıklayın
4. Service account email'ini yapıştırın
5. Role: **Viewer** seçin
6. **Add** tıklayın

---

## ⚙️ Adım 4: Vercel Environment Variables

### 4.1 Vercel Dashboard

1. [Vercel Dashboard](https://vercel.com/dashboard) > Projenizi seçin
2. **Settings** > **Environment Variables**

### 4.2 Variables Ekleme

Aşağıdaki 3 değişkeni ekleyin:

#### 1. NEXT_PUBLIC_GA_MEASUREMENT_ID
- **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Value:** `G-XXXXXXXXXX` (Adım 1.2'den)
- **Environment:** Production, Preview, Development (hepsini seç)

#### 2. GA4_PROPERTY_ID
- **Name:** `GA4_PROPERTY_ID`
- **Value:** `123456789` (Adım 1.3'ten)
- **Environment:** Production, Preview, Development

#### 3. GA4_CREDENTIALS
- **Name:** `GA4_CREDENTIALS`
- **Value:** İndirdiğiniz JSON dosyasının **tüm içeriğini** tek satır olarak yapıştırın
  - JSON dosyasını text editor'de açın
  - Tüm içeriği kopyalayın (satır sonları dahil)
  - Vercel'e yapıştırın
- **Environment:** Production, Preview, Development

### 4.3 Redeploy

1. **Deployments** tab'ına gidin
2. En son deployment'ın yanındaki **...** > **Redeploy**
3. **Redeploy** tıklayın

---

## ✅ Adım 5: Test Etme

### 5.1 Tracking Test

1. Sitenizi ziyaret edin: `https://your-site.vercel.app`
2. Birkaç sayfayı gezin
3. GA4'e geri dönün: **Reports** > **Realtime**
4. Aktif kullanıcıları görmelisiniz (kendiniz)

### 5.2 Admin Panel Test

1. Admin paneline gidin: `https://your-site.vercel.app/admin`
2. **Overview** sekmesinde gerçek verileri görmelisiniz
3. İlk başta veriler az olabilir, 24 saat sonra daha fazla veri birikir

---

## 🎯 Önemli Notlar

### Veri Gecikmesi
- **Realtime data:** Anında görünür
- **Standard reports:** 24-48 saat gecikme olabilir
- Admin paneli her yenilendiğinde GA4'ten veri çeker

### Güvenlik
- `GA4_CREDENTIALS` JSON'unu **asla** GitHub'a commit etmeyin
- `.env` dosyası `.gitignore`'da olmalı
- Sadece Vercel environment variables'da saklayın

### Maliyet
- Google Analytics 4: **Tamamen ücretsiz**
- Google Cloud: **Ücretsiz** (aylık 10M API çağrısı dahil)
- Bu proje için hiç ücret ödemezsiniz

### Sorun Giderme

**"GA4 not configured" hatası:**
- Environment variables'ları kontrol edin
- Vercel'de redeploy yapın
- Service account'a GA4 erişimi verdiğinizden emin olun

**"Permission denied" hatası:**
- Service account email'ini GA4 Property Access Management'a ekleyin
- Role'ün en az "Viewer" olduğundan emin olun

**Veri görünmüyor:**
- 24 saat bekleyin (ilk veri birikimi için)
- GA4 Realtime'da veri var mı kontrol edin
- Browser console'da hata var mı bakın

---

## 📊 Sonuç

Kurulum tamamlandıktan sonra:

✅ Sitenizde her sayfa görüntüleme otomatik track edilir
✅ Admin panelinde gerçek veriler görünür
✅ Hangi araçların popüler olduğunu görebilirsiniz
✅ Trafik ve gelir tahminlerini takip edebilirsiniz

Herhangi bir sorun yaşarsanız, Vercel logs'larını kontrol edin:
```bash
vercel logs
```

İyi çalışmalar! 🚀
