# 🔧 GA4 Service Account Kurulum Rehberi

## Adım 1: Google Cloud Console

1. https://console.cloud.google.com adresine git
2. Yeni proje oluştur veya mevcut projeyi seç
3. **APIs & Services** → **Library**
4. "Google Analytics Data API" ara ve **Enable** et

## Adım 2: Service Account Oluştur

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service Account**
3. Service account detayları:
   - Name: `qcfinance-analytics`
   - ID: `qcfinance-analytics`
   - Description: "Analytics dashboard access"
4. **Create and Continue**
5. Role seçme (şimdilik skip edebilirsin)
6. **Done**

## Adım 3: JSON Key Oluştur

1. Oluşturduğun service account'a tıkla
2. **Keys** sekmesine git
3. **Add Key** → **Create New Key**
4. **JSON** seç
5. **Create** - JSON dosyası indirilecek

## Adım 4: Service Account Email'i Kopyala

JSON dosyasını aç ve `client_email` değerini kopyala:
```
qcfinance-analytics@PROJECT_ID.iam.gserviceaccount.com
```

## Adım 5: GA4'te Erişim Ver

1. https://analytics.google.com adresine git
2. **Admin** (sol alt köşe)
3. **Property** → **Property Access Management**
4. **Add Users** (sağ üst)
5. Service account email'ini yapıştır
6. Role: **Viewer** seç
7. **Add**

## Adım 6: .env.local Dosyasını Güncelle

İndirdiğin JSON dosyasını aç ve içeriğini **tek satıra** çevir:

### Örnek JSON:
```json
{
  "type": "service_account",
  "project_id": "qcfinance-analytics-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "qcfinance-analytics@qcfinance-analytics-123456.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### Tek satıra çevir (boşlukları kaldır):
```
{"type":"service_account","project_id":"qcfinance-analytics-123456",...}
```

### .env.local'e ekle:
```bash
GA4_PROPERTY_ID=522075851
GA4_CREDENTIALS={"type":"service_account","project_id":"qcfinance-analytics-123456",...}
```

## Adım 7: Test Et

```bash
npm run dev
```

http://localhost:3000/stats/login adresine git ve giriş yap.

## ✅ Kontrol Listesi

- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] Google Analytics Data API enable edildi
- [ ] Service Account oluşturuldu
- [ ] JSON key indirildi
- [ ] Service account email GA4'te Viewer olarak eklendi
- [ ] .env.local dosyası güncellendi
- [ ] GA4_PROPERTY_ID = 522075851
- [ ] GA4_CREDENTIALS JSON tek satırda
- [ ] Dev server başlatıldı
- [ ] /stats/login sayfası açıldı
- [ ] Dashboard veriler gösteriyor

## 🐛 Sorun Giderme

### "GA4 not configured" hatası
- .env.local dosyasını kontrol et
- GA4_CREDENTIALS tek satırda mı?
- JSON geçerli mi? (online JSON validator kullan)

### "Permission denied" hatası
- Service account GA4'te Viewer olarak eklendi mi?
- Property ID doğru mu? (522075851)

### "API not enabled" hatası
- Google Analytics Data API enable edildi mi?
- Doğru projede mi?

## 📝 Notlar

- Service account email'i kimseyle paylaşma
- JSON key'i git'e commit etme (.env.local zaten .gitignore'da)
- Vercel'de deploy ederken environment variables'ı Vercel dashboard'dan ekle
