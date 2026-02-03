# 📊 Analytics Tracking Guide

## ✅ Tamamlanan İyileştirmeler

### 1. Page View Tracking
- ✅ `GoogleAnalytics.tsx` component'i güncellendi
- ✅ Next.js router events dinleniyor
- ✅ Her sayfa değişiminde GA4'e bildirim gönderiliyor
- ✅ Dynamic routes track ediliyor (örn: `/salaire-net-quebec/70000`)

### 2. Event Tracking - Salary Calculator
**Tracked Events:**
- `salary_input_change` - Kullanıcı gelir girdisini değiştirdiğinde (debounced 800ms)
- `change_pay_period` - Ödeme periyodu değiştirildiğinde
- `calculate_salary` - "Calculer" butonuna basıldığında
  - Parametreler: salary, pay_period, net_income, total_deductions
- `toggle_ftq` - FTQ/Fondaction checkbox toggle
- `share` - Sonuç paylaşıldığında
- `download_pdf` - PDF indirildiğinde

### 3. Event Tracking - Mortgage Calculator
**Tracked Events:**
- `calculate_mortgage` - Hesaplama yapıldığında
  - Parametreler: loan_amount, interest_rate, amortization_years, payment_frequency, stress_test, monthly_payment
- `toggle_stress_test` - Stress test toggle
- `download_pdf` - PDF indirildiğinde

### 4. Environment Variables
✅ `.env.local` dosyasına eklendi:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-4E6L3DHKPJ
GA4_PROPERTY_ID=522075851
STATS_PASSWORD=145314
```

## 📈 GA4'te Göreceğin Metrikler

### Sayfa Görüntülemeleri
- Ana sayfa ziyaretleri
- Calculator sayfaları
- Dynamic salary pages (örn: /salaire-net-quebec/70000)
- Route değişimleri

### Engagement Events
- **Calculator Usage:**
  - Kaç kişi hesaplama yaptı
  - Hangi calculator'lar daha popüler
  - Ortalama gelir seviyeleri
  - Hangi pay period'lar kullanılıyor

- **User Actions:**
  - PDF download sayısı
  - Share button kullanımı
  - FTQ toggle kullanımı
  - Stress test kullanımı

### Conversion Tracking
- Calculate button clicks (conversion olarak sayılabilir)
- PDF downloads (lead generation)
- Affiliate link clicks (gelecekte eklenecek)

## 🎯 Sonraki Adımlar

### Kısa Vadeli (Yapılacak)
1. ✅ Salary calculator - TAMAMLANDI
2. ✅ Mortgage calculator - TAMAMLANDI
3. ⏳ Diğer calculator'lara event tracking ekle:
   - Family Benefits Calculator
   - EI Calculator
   - Rent vs Buy Calculator
   - Tax Calculator (TPS/TVQ)
   - Auto Loan Calculator
   - Student Loan Calculator
   - Retirement Calculator
   - Compound Interest Calculator
   - Daycare Calculator
   - Debt Calculator
   - Vacation Pay Calculator
   - Wage Converter
   - Transfer Tax Calculator
   - Rent Increase Calculator
   - EV Comparison Calculator

### Orta Vadeli
4. Affiliate link tracking ekle
5. Contact form submission tracking
6. Cross-sell CTA click tracking
7. Search functionality tracking (eğer varsa)

### Uzun Vadeli
8. Custom dimensions (user_type, calculator_category)
9. Enhanced ecommerce tracking
10. Funnel analysis setup
11. A/B testing infrastructure

## 🔧 Nasıl Kullanılır

### Yeni Bir Calculator'a Event Tracking Eklemek

1. **Import hook'u:**
```typescript
import { useDebouncedAnalytics } from '@/hooks/useDebouncedAnalytics'
```

2. **Hook'u initialize et:**
```typescript
const trackEvent = useDebouncedAnalytics(800)
```

3. **Input değişimlerinde track et:**
```typescript
onChange={(e) => {
  setValue(e.target.value)
  trackEvent('calculator_input_change', {
    calculator: 'calculator_name',
    field: 'field_name',
  })
}}
```

4. **Button click'lerinde track et:**
```typescript
onClick={() => {
  handleCalculate()
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'calculate_action', {
      event_category: 'Calculator',
      event_label: 'Calculator Name',
      value: someValue,
    })
  }
}}
```

## 📊 GA4 Dashboard'da Kontrol

### Real-time Reports
1. GA4'e git: https://analytics.google.com
2. Reports → Realtime
3. Siteni aç ve bir hesaplama yap
4. Event'lerin geldiğini gör

### Event Reports
1. Reports → Engagement → Events
2. Tüm event'leri görebilirsin:
   - `calculate_salary`
   - `calculate_mortgage`
   - `download_pdf`
   - `share`
   - vs.

### Custom Reports
1. Explore → Create new exploration
2. Event name dimension ekle
3. Event count metric ekle
4. Calculator usage analizi yap

## 🚀 Deployment

### Vercel'de Environment Variables Ekle
1. Vercel Dashboard → Settings → Environment Variables
2. Ekle:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-4E6L3DHKPJ`
   - `GA4_PROPERTY_ID` = `522075851`
   - `STATS_PASSWORD` = `145314`
   - `GA4_CREDENTIALS` = (Service account JSON - opsiyonel)

### Test Et
1. Production'a deploy et
2. Siteni aç
3. GA4 Realtime'da event'leri kontrol et

## 📝 Notlar

- **Debounced tracking:** Input değişimleri 800ms debounce ile track ediliyor (spam önlemek için)
- **Button clicks:** Anında track ediliyor (debounce yok)
- **Privacy:** Kişisel bilgi track edilmiyor, sadece aggregate data
- **Performance:** Tracking asenkron, sayfa performansını etkilemiyor

## 🎉 Sonuç

Analytics tracking artık aktif! Kullanıcıların:
- Hangi sayfaları ziyaret ettiğini
- Hangi calculator'ları kullandığını
- Ne kadar süre harcadığını
- Hangi aksiyonları aldığını

görebileceksin. Bu data ile:
- En popüler calculator'ları optimize edebilirsin
- Conversion rate'i artırabilirsin
- Kullanıcı deneyimini iyileştirebilirsin
- Monetization stratejini geliştirebilirsin
