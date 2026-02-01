# Calculator Metadata Güncelleme Rehberi

## Durum

Tüm calculator sayfalarınızda **OG image dosyaları var** ama **metadata'da image URL'leri eksik!**

## Sorun

Calculator sayfalarının `page.tsx` dosyalarında metadata şöyle:

```typescript
export const metadata: Metadata = {
  title: 'Başlık',
  description: 'Açıklama',
  alternates: {
    canonical: '/url',
  },
}
```

**Eksik olan:** `openGraph` ve `twitter` image bilgileri!

## Çözüm

Her calculator sayfasının metadata'sına şunları ekleyin:

```typescript
export const metadata: Metadata = {
  title: 'Başlık',
  description: 'Açıklama',
  alternates: {
    canonical: 'https://qcfinance.ca/url',  // ← MUTLAK URL
  },
  openGraph: {
    title: 'Başlık',
    description: 'Açıklama',
    url: 'https://qcfinance.ca/url',
    type: 'website',
    locale: 'fr_CA',
    siteName: 'QC Finance',
    images: [
      {
        url: 'https://qcfinance.ca/url/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Başlık',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Başlık',
    description: 'Açıklama',
    images: ['https://qcfinance.ca/url/opengraph-image'],
  },
}
```

## Güncellenecek Sayfalar

### 1. Calcul Hypothèque
**Dosya:** `app/calcul-hypotheque/page.tsx`
**URL:** `/calcul-hypotheque`

### 2. Auto Électrique vs Essence
**Dosya:** `app/auto-electrique-vs-essence/page.tsx`
**URL:** `/auto-electrique-vs-essence`

### 3. Capacité d'Emprunt
**Dosya:** `app/capacite-emprunt/page.tsx`
**URL:** `/capacite-emprunt`

### 4. Augmentation Loyer
**Dosya:** `app/augmentation-loyer-2026/page.tsx`
**URL:** `/augmentation-loyer-2026`

### 5. Assurance Emploi
**Dosya:** `app/assurance-emploi/page.tsx`
**URL:** `/assurance-emploi`

### 6. Frais de Garde
**Dosya:** `app/frais-de-garde/page.tsx`
**URL:** `/frais-de-garde`

### 7. TPS TVQ
**Dosya:** `app/tps-tvq-quebec/page.tsx`
**URL:** `/tps-tvq-quebec`

### 8. Taxe de Bienvenue
**Dosya:** `app/taxe-de-bienvenue/page.tsx`
**URL:** `/taxe-de-bienvenue`

### 9. Prêt Étudiant
**Dosya:** `app/pret-etudiant/page.tsx`
**URL:** `/pret-etudiant`

### 10. Paie Vacances
**Dosya:** `app/paie-vacances/page.tsx`
**URL:** `/paie-vacances`

### 11. Taux Horaire
**Dosya:** `app/taux-horaire/page.tsx`
**URL:** `/taux-horaire`

### 12. Prêt Auto
**Dosya:** `app/pret-auto/page.tsx`
**URL:** `/pret-auto`

### 13. Louer ou Acheter
**Dosya:** `app/louer-ou-acheter/page.tsx`
**URL:** `/louer-ou-acheter`

### 14. Intérêts Composés
**Dosya:** `app/interets-composes/page.tsx`
**URL:** `/interets-composes`

### 15. Salaire Net Québec (Ana Sayfa)
**Dosya:** `app/salaire-net-quebec/page.tsx`
**URL:** `/salaire-net-quebec`

### 16. Épargne Retraite
**Dosya:** `app/epargne-retraite/page.tsx`
**URL:** `/epargne-retraite`

### 17. Déclaration Simplifiée
**Dosya:** `app/declaration-simplifiee/page.tsx`
**URL:** `/declaration-simplifiee`

### 18. Dettes Crédit
**Dosya:** `app/dettes-credit/page.tsx`
**URL:** `/dettes-credit`

### 19. Allocations Familiales
**Dosya:** `app/allocations-familiales/page.tsx`
**URL:** `/allocations-familiales`

## Örnek: Calcul Hypothèque

### ÖNCESİ:
```typescript
export const metadata: Metadata = {
  title: 'Calculateur Hypothèque Québec 2026 | Paiement Mensuel',
  description: 'Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation. Gratuit.',
  alternates: {
    canonical: '/calcul-hypotheque',
  },
}
```

### SONRASI:
```typescript
export const metadata: Metadata = {
  title: 'Calculateur Hypothèque Québec 2026 | Paiement Mensuel',
  description: 'Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation. Gratuit.',
  alternates: {
    canonical: 'https://qcfinance.ca/calcul-hypotheque',
  },
  openGraph: {
    title: 'Calculateur Hypothèque Québec 2026',
    description: 'Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation. Gratuit.',
    url: 'https://qcfinance.ca/calcul-hypotheque',
    type: 'website',
    locale: 'fr_CA',
    siteName: 'QC Finance',
    images: [
      {
        url: 'https://qcfinance.ca/calcul-hypotheque/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Calculateur Hypothèque Québec 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Hypothèque Québec 2026',
    description: 'Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation.',
    images: ['https://qcfinance.ca/calcul-hypotheque/opengraph-image'],
  },
}
```

## Hızlı Güncelleme

Tüm sayfaları güncellemek ister misiniz? Bana söyleyin, hepsini otomatik güncelleyeyim!

## Öncelik

**ŞİMDİ:** Ana sayfa ve salary sayfaları düzeltildi ✅
**SONRA:** Diğer 19 calculator sayfasını güncelleyin

## Test

Her güncelleme sonrası:
1. Deploy edin
2. Twitter Card Validator'da test edin
3. Görselin çıktığını doğrulayın

---

**Tüm calculator sayfalarını güncellemek ister misiniz?**
