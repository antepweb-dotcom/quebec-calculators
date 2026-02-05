# Ezoic Entegrasyon Rehberi

## ✅ Tamamlanan Adımlar

### 1. Script Entegrasyonu
- ✅ Privacy scripts eklendi (GDPR uyumluluğu)
- ✅ Ezoic header script eklendi
- ✅ `app/layout.tsx` güncellendi

### 2. Ads.txt Güncellemesi
- ✅ Ezoic publisher ID eklendi (19390)
- ✅ Reseller partners eklendi
- ✅ `public/ads.txt` güncellendi

### 3. Ad Placement Komponenti
- ✅ `components/EzoicAd.tsx` oluşturuldu
- ✅ Örnek sayfa güncellendi (`app/salaire-net-quebec/page.tsx`)

---

## 🎯 Şimdi Yapmanız Gerekenler

### Adım 1: Ezoic Dashboard'a Giriş Yapın
1. https://www.ezoic.com/ adresine gidin
2. Hesabınıza giriş yapın
3. Site'inizi seçin (qcfinance.ca)

### Adım 2: Site Bağlantısı (Connect Your Site)
1. Dashboard'da **"Connect Your Site"** kartındaki **"GET STARTED"** butonuna tıklayın
2. Integration yöntemi seçin: **"JavaScript Integration"** seçin
3. Site URL'inizi girin: `qcfinance.ca`
4. Ezoic otomatik olarak script'leri kontrol edecek
5. ✅ "Integration Successful" mesajını görmelisiniz

**Not:** Script'ler zaten kodda, sadece Ezoic'in doğrulamasını bekliyorsunuz.

### Adım 3: Ad Placement'ları Oluşturun

Ezoic Dashboard'da **"Ad Placements"** bölümüne gidin ve şu placement'ları oluşturun:

#### Placement 101 - Top Banner
- **Name:** Top Banner
- **Type:** Display Ad
- **Size:** Responsive (728x90 desktop, 320x50 mobile)
- **Position:** Above the fold

#### Placement 102 - Sidebar
- **Name:** Sidebar Ad
- **Type:** Display Ad
- **Size:** 300x600 (Desktop only)
- **Position:** Sticky sidebar

#### Placement 103 - Mid Content
- **Name:** Mid Content Ad
- **Type:** Display Ad
- **Size:** Responsive (728x90 desktop, 320x50 mobile)
- **Position:** Between content sections

#### Placement 104 - Footer
- **Name:** Footer Banner
- **Type:** Display Ad
- **Size:** Responsive (728x90 desktop, 320x50 mobile)
- **Position:** Bottom of page

### Adım 4: Test Modunu Aktif Edin
1. Dashboard'da "Settings" > "Ad Testing"
2. "Enable Ad Tester" seçeneğini aktif edin
3. Bu sayede reklamları görebilirsiniz (henüz onay almadan)

### Adım 5: Deploy Edin
```bash
git add .
git commit -m "Add Ezoic ad placements"
git push
```

### Adım 6: Doğrulama
Deploy sonrası şunları kontrol edin:

1. **ads.txt Kontrolü:**
   - https://qcfinance.ca/ads.txt adresine gidin
   - Ezoic satırlarını görmelisiniz

2. **Script Kontrolü:**
   - Sayfayı açın
   - F12 > Console
   - `ezstandalone` yazın
   - Obje dönmeli (undefined olmamalı)

3. **Ad Placeholder Kontrolü:**
   - F12 > Elements
   - `ezoic-pub-ad-placeholder-101` gibi div'leri görmelisiniz

---

## 📊 Beklenen Sonuçlar

### İlk 7 Gün
- Ezoic AI reklamları optimize edecek
- Düşük gelir (learning phase)
- Çeşitli reklam boyutları test edilecek

### 2-4 Hafta Sonra
- Optimizasyon tamamlanacak
- Gelir artmaya başlayacak
- En iyi performans gösteren yerleşimler belirlenecek

### Tahmini Gelir (Günlük 100 Ziyaretçi)
- İlk hafta: $0.50-1/gün
- 1 ay sonra: $2-5/gün
- 3 ay sonra: $5-15/gün (optimize edildiğinde)

---

## 🔧 Diğer Sayfalara Ekleme

Ezoic reklamlarını diğer sayfalara eklemek için:

```tsx
import EzoicAd from '@/components/EzoicAd'

// Sayfanın istediğiniz yerine ekleyin:
<EzoicAd placementId={101} />
<EzoicAd placementId={102} className="my-8" />
```

### Önerilen Yerleşim Stratejisi:

**Ana Sayfa:**
- Placement 101 (Top)
- Placement 103 (Mid)
- Placement 104 (Footer)

**Hesaplayıcı Sayfaları:**
- Placement 101 (Top)
- Placement 102 (Sidebar - desktop)
- Placement 103 (Sonuç sonrası)
- Placement 104 (Footer)

**Blog/İçerik Sayfaları:**
- Placement 101 (Top)
- Placement 103 (Her 2-3 paragrafta bir)
- Placement 104 (Footer)

---

## ⚠️ Önemli Notlar

1. **Placement ID'leri Ezoic Dashboard'dan alın**
   - Şu an kod 101, 102, 103, 104 kullanıyor
   - Ezoic'te oluşturduğunuz ID'lerle eşleşmeli

2. **AdSense'i Kaldırmayın (Henüz)**
   - Ezoic onaylanana kadar AdSense backup olarak kalabilir
   - Ezoic çalışmaya başladıktan sonra AdSense kodlarını kaldırın

3. **Mobil Optimizasyon**
   - Ezoic otomatik olarak mobil için optimize eder
   - Sidebar reklamlar mobilde gizlenir (responsive)

4. **GDPR Uyumluluğu**
   - Privacy scripts zaten eklendi
   - Ezoic otomatik consent management sağlıyor

---

## 🆘 Sorun Giderme

### Reklamlar Görünmüyor
1. Ezoic dashboard'da "Ad Tester" aktif mi?
2. Browser cache'i temizleyin
3. Incognito modda deneyin
4. Console'da hata var mı kontrol edin

### "ezstandalone is not defined" Hatası
1. Script'lerin doğru sırada yüklendiğinden emin olun
2. `app/layout.tsx` dosyasını kontrol edin
3. Deploy edildiğinden emin olun

### Düşük Gelir
1. İlk 2 hafta learning phase - normal
2. Trafik artırın (SEO, sosyal medya)
3. Ezoic'in AI optimizasyonunu bekleyin
4. Placement'ları test edin (A/B testing)

---

## 📞 Destek

Ezoic Support: https://support.ezoic.com/
Email: support@ezoic.com

---

**Son Güncelleme:** 5 Şubat 2026
**Durum:** ✅ Kod hazır, Ezoic dashboard kurulumu bekleniyor
