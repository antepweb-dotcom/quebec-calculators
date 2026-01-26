# 🎯 Reklam Yönetim Sistemi - Kullanım Kılavuzu

## ✅ Kurulum Tamamlandı!

Reklam yönetim sistemi başarıyla kuruldu. Artık admin panelinden tüm reklamları yönetebilirsiniz.

---

## 📋 Neler Eklendi?

### 1. **AdSlot Komponenti** (`components/AdSlot.tsx`)
Akıllı reklam komponenti - 3 tip reklamı destekler:
- ✅ Google AdSense
- ✅ Affiliate HTML
- ✅ Custom HTML/JavaScript

### 2. **Config Dosyası** (`public/ads-config.json`)
Tüm reklam ayarları burada saklanır

### 3. **API Endpoint** (`app/api/ads/config/route.ts`)
- GET: Ayarları oku
- POST: Ayarları güncelle

### 4. **Admin Panel Güncellemesi**
- Gerçek kaydetme özelliği eklendi
- Affiliate/Custom HTML desteği
- Config otomatik yüklenir

---

## 🚀 Kullanım

### **Admin Panelinden Yönetim:**

1. **Admin paneline git:** http://localhost:3001/admin
2. **"Reklam Yönetimi"** sekmesine tıkla
3. Reklam ayarlarını düzenle:
   - AdSense ID'lerini gir
   - Affiliate HTML kodlarını yapıştır
   - Açık/Kapalı toggle'ları kullan
4. **"Değişiklikleri Kaydet"** butonuna tıkla

### **Sayfalara Ekleme:**

#### **Otomatik Pozisyonlar (Config'den):**
\`\`\`tsx
import AdSlot from '@/components/AdSlot'

// Header
<AdSlot position="header" />

// Sidebar
<AdSlot position="sidebar" />

// İçerik arası
<AdSlot position="inArticle" />

// Footer
<AdSlot position="footer" />

// Affiliate 1
<AdSlot position="affiliate1" />

// Custom 2
<AdSlot position="affiliate2" />
\`\`\`

#### **Manuel Override:**
\`\`\`tsx
// AdSense manuel
<AdSlot 
  position="custom"
  type="adsense"
  adId="ca-pub-123456"
  size="300x250"
/>

// Affiliate manuel
<AdSlot 
  position="custom"
  type="affiliate"
  html="<a href='...'><img src='banner.jpg'/></a>"
/>
\`\`\`

---

## 📐 Örnek Layout

### **Standart Hesaplayıcı Sayfası:**
\`\`\`tsx
import AdSlot from '@/components/AdSlot'

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header Ad */}
        <div className="mb-8 flex justify-center">
          <AdSlot position="header" />
        </div>

        {/* 2 Column: Calculator + Sidebar */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Calculator />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AdSlot position="sidebar" />
            </div>
          </div>
        </div>

        {/* In-Article Ad */}
        <div className="my-12 flex justify-center">
          <AdSlot position="inArticle" />
        </div>

        {/* Educational Content */}
        <section>...</section>
      </main>
    </>
  )
}
\`\`\`

---

## 🎨 Reklam Boyutları

| Pozisyon | Boyut | Kullanım |
|----------|-------|----------|
| Header | 728x90 | Sayfa üstü banner |
| Sidebar | 300x600 | Yan kolon (sticky) |
| In-Article | 300x250 | İçerik arası |
| Footer | 728x90 | Sayfa altı |
| Custom | Responsive | Özel boyut |

---

## 🔧 Config Yapısı

\`\`\`json
{
  "enabled": true,
  "slots": {
    "header": {
      "enabled": true,
      "type": "adsense",
      "adId": "ca-pub-1234567890",
      "size": "728x90"
    },
    "sidebar": {
      "enabled": true,
      "type": "affiliate",
      "html": "<a href='...'><img src='...'/></a>",
      "size": "300x600"
    }
  },
  "pages": {
    "all": true,
    "exclude": ["admin"]
  },
  "frequency": "medium"
}
\`\`\`

---

## ✅ Hangi Sayfalara Eklendi?

- ✅ `/calcul-hypotheque` - Örnek olarak eklendi

### 📝 Eklenmesi Gerekenler:

Aşağıdaki sayfalara aynı şekilde eklenebilir:

- [ ] `/salaire-net-quebec`
- [ ] `/salaire-net-quebec/[salary]`
- [ ] `/tps-tvq-quebec`
- [ ] `/pourboire`
- [ ] `/augmentation-loyer-2026`
- [ ] `/capacite-emprunt`
- [ ] `/pret-auto`
- [ ] `/pret-etudiant`
- [ ] `/dettes-credit`
- [ ] `/frais-de-garde`
- [ ] `/epargne-retraite`
- [ ] `/assurance-emploi`
- [ ] `/paie-vacances`
- [ ] `/taux-horaire`
- [ ] `/taxe-de-bienvenue`
- [ ] `/inflation`

---

## 🎯 Sonraki Adımlar

### **1. Tüm Sayfalara Ekle**
Her sayfaya AdSlot komponentlerini ekle (yukarıdaki örneği kullan)

### **2. Gerçek AdSense Kodunu Ekle**
\`components/AdSlot.tsx\` dosyasında yorum satırındaki gerçek AdSense kodunu aktif et:

\`\`\`tsx
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client={adConfig.adId}
     data-ad-slot="..."
     data-ad-format="auto"></ins>
\`\`\`

### **3. AdSense Script Ekle**
\`app/layout.tsx\` dosyasına AdSense script'ini ekle:

\`\`\`tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
  crossOrigin="anonymous"
/>
\`\`\`

### **4. Güvenlik (Opsiyonel)**
Admin paneline authentication ekle (şu anda herkes erişebilir)

### **5. Analitik (Opsiyonel)**
Reklam tıklama/gösterim takibi için API endpoint ekle

---

## 🐛 Sorun Giderme

### **Reklamlar görünmüyor:**
1. Admin panelinde "Tüm Reklamları Etkinleştir" açık mı?
2. Config dosyası doğru mu? `/ads-config.json` kontrol et
3. Browser console'da hata var mı?

### **Kaydetme çalışmıyor:**
1. API endpoint çalışıyor mu? `/api/ads/config` test et
2. Dosya yazma izni var mı? `public/ads-config.json`

### **Affiliate HTML çalışmıyor:**
1. HTML kodu doğru mu? Syntax hatası var mı?
2. XSS koruması engelliyor olabilir (sanitizeHtml fonksiyonu)

---

## 📞 Destek

Herhangi bir sorun olursa:
1. Browser console'u kontrol et
2. Server loglarını kontrol et
3. Config dosyasını kontrol et

---

**🎉 Başarılar! Reklam sisteminiz hazır!**
