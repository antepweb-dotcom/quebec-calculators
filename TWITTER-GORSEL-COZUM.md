# Twitter Görsel Sorunu - Çözüm ✅

## Sorun Neydi?
Twitter'da paylaştığınızda görsel çıkmıyordu çünkü:
- ❌ Görsel URL'leri **relative** idi (`/opengraph-image`)
- ❌ Twitter **mutlak URL** (absolute URL) gerektirir (`https://qcfinance.ca/opengraph-image`)

## Yapılan Düzeltmeler

### 1. Layout.tsx - Ana Sayfa Görseli
```typescript
// ÖNCESİ (YANLIŞ):
images: ['/opengraph-image']

// SONRASI (DOĞRU):
images: ['https://qcfinance.ca/opengraph-image']
```

### 2. Salary Pages - Dinamik Görseller
```typescript
// ÖNCESİ (YANLIŞ):
url: `/salaire-net-quebec/${params.salary}`
// Görsel URL'i eksikti!

// SONRASI (DOĞRU):
url: `https://qcfinance.ca/salaire-net-quebec/${params.salary}`,
images: [
  {
    url: `https://qcfinance.ca/salaire-net-quebec/${params.salary}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `Salaire Net ${formattedSalary} $ Québec 2026`,
  },
]
```

## Şimdi Ne Yapmalısınız?

### Adım 1: Deploy Edin
```bash
git add .
git commit -m "fix: Twitter OG image absolute URLs"
git push
```

### Adım 2: Deploy Tamamlanmasını Bekleyin
Vercel/hosting platformunuzda deploy tamamlanana kadar bekleyin (genellikle 2-5 dakika).

### Adım 3: Twitter Cache'i Temizleyin

#### Yöntem A: Twitter Card Validator (ÖNERİLEN)
1. **Şu siteye gidin:** https://cards-dev.twitter.com/validator
2. **URL'nizi girin:** `https://qcfinance.ca`
3. **"Preview card" butonuna tıklayın**
4. Görsel artık görünmeli! ✅

#### Yöntem B: Tweet'i Silin ve Yeniden Paylaşın
1. Eski tweet'i silin
2. 5 dakika bekleyin
3. Aynı URL'i tekrar paylaşın
4. Görsel artık çıkacak! ✅

### Adım 4: Test Edin - Farklı Sayfalar

#### Ana Sayfa
```
https://qcfinance.ca
```
**Beklenen Görsel:** Yeşil gradient, "QC Finance" logosu

#### Maaş Sayfaları
```
https://qcfinance.ca/salaire-net-quebec/75000
https://qcfinance.ca/salaire-net-quebec/100000
```
**Beklenen Görsel:** Mavi gradient, maaş miktarı, para ikonu

#### Hesap Makineleri
```
https://qcfinance.ca/calcul-hypotheque
https://qcfinance.ca/tps-tvq-quebec
```
**Beklenen Görsel:** Her hesap makinesinin özel görseli

## Twitter'da Görsel Çıkmazsa - Troubleshooting

### Kontrol 1: Görsel URL'i Çalışıyor mu?
Tarayıcınızda direkt görseli açın:
```
https://qcfinance.ca/opengraph-image
```
Görsel yüklenmeli (1200x630 PNG).

### Kontrol 2: Meta Tag'ler Doğru mu?
Sayfanın kaynak kodunu görüntüleyin (Sağ tık > "Kaynağı Görüntüle"):
```html
<!-- Bunlar OLMALI: -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://qcfinance.ca/opengraph-image" />
<meta property="og:image" content="https://qcfinance.ca/opengraph-image" />
```

### Kontrol 3: Twitter Validator Ne Diyor?
https://cards-dev.twitter.com/validator adresinde:
- ✅ **"INFO: Page fetched successfully"** → İyi!
- ✅ **"INFO: 7 metatags were found"** → İyi!
- ✅ **Görsel preview görünüyor** → Mükemmel!
- ❌ **"WARN: ..."** → Uyarıları okuyun
- ❌ **"ERROR: ..."** → Hataları düzeltin

### Kontrol 4: Cache Sorunu mu?
Twitter cache'i çok agresif. Çözümler:
1. **URL'e parametre ekleyin:** `https://qcfinance.ca?v=2`
2. **24 saat bekleyin** (cache otomatik temizlenir)
3. **Validator kullanın** (cache'i zorla yeniler)

## Diğer Sosyal Medya Platformları

### Facebook
**Test:** https://developers.facebook.com/tools/debug/
```
1. URL'nizi girin
2. "Scrape Again" tıklayın
3. Görsel görünmeli
```

### LinkedIn
**Test:** https://www.linkedin.com/post-inspector/
```
1. URL'nizi girin
2. "Inspect" tıklayın
3. Görsel görünmeli
```

### WhatsApp
WhatsApp otomatik olarak görseli çeker. Test:
```
1. Kendinize mesaj atın
2. URL'yi yapıştırın
3. Görsel preview otomatik çıkar
```

## Gelecekte Yeni Sayfa Eklerken

Yeni bir hesap makinesi veya sayfa eklerken, metadata'ya mutlaka şunları ekleyin:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sayfa Başlığı',
    description: 'Sayfa açıklaması',
    openGraph: {
      title: 'OG Başlık',
      description: 'OG Açıklama',
      url: 'https://qcfinance.ca/sayfa-url',  // ← MUTLAK URL
      images: [
        {
          url: 'https://qcfinance.ca/sayfa-url/opengraph-image',  // ← MUTLAK URL
          width: 1200,
          height: 630,
          alt: 'Görsel açıklaması',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://qcfinance.ca/sayfa-url/opengraph-image'],  // ← MUTLAK URL
    },
  }
}
```

## Hızlı Test Komutu

Deploy sonrası hızlıca test etmek için:

```bash
# Görsel yükleniyor mu?
curl -I https://qcfinance.ca/opengraph-image

# Beklenen: HTTP/2 200
```

## Başarı Kriterleri

Görsel sisteminiz çalışıyor demektir eğer:

- [x] Twitter Card Validator'da görsel görünüyor
- [x] Tweet'te görsel preview çıkıyor
- [x] Facebook Debugger'da görsel görünüyor
- [x] WhatsApp'ta link preview çalışıyor
- [x] LinkedIn'de görsel paylaşılıyor
- [x] Görsel URL'i direkt açılabiliyor
- [x] Meta tag'ler sayfa kaynağında var
- [x] Görsel boyutu 1200x630

## Önemli Notlar

### ⚠️ Cache Süresi
- **Twitter:** ~7 gün
- **Facebook:** ~30 gün
- **LinkedIn:** ~7 gün
- **WhatsApp:** Değişken

### 💡 İpucu
İlk paylaşımdan önce **mutlaka** validator'ları kullanın! Bu cache'i önceden doldurur ve ilk paylaşımda görsel çıkar.

### 🚀 Performans
- Edge Runtime sayesinde görseller < 100ms'de oluşur
- CDN üzerinden global olarak dağıtılır
- Otomatik cache ile tekrar oluşturulmaz

## Yardım Gerekirse

Hala sorun yaşıyorsanız:

1. **Twitter Validator çıktısını** kontrol edin
2. **Browser Console'da** hata var mı bakın
3. **Network tab'de** görsel isteği başarılı mı kontrol edin
4. **Sayfa kaynağında** meta tag'leri arayın

---

**Artık Twitter'da görseller mükemmel çıkacak! 🎉**

Deploy edin ve Twitter Card Validator ile test edin.
