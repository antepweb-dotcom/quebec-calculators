# 🚀 Hızlı Test Database Kurulumu

## Seçenek 1: SQLite (En Kolay - Lokal)

### Avantajlar:
- ✅ Hiçbir hesap gerekmez
- ✅ Anında çalışır
- ✅ Lokal dosya olarak çalışır

### Kurulum:

1. **Schema'yı değiştir** (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. **.env dosyasını güncelle**:
```env
DATABASE_URL="file:./dev.db"
```

3. **Veritabanını oluştur**:
```bash
npx prisma db push
npm run db:init
npm run dev
```

**Dezavantaj**: Production'da kullanılamaz, sadece test için.

---

## Seçenek 2: Supabase Free Tier (Önerilen)

### Neden Supabase?
- ✅ Ücretsiz
- ✅ PostgreSQL (production-ready)
- ✅ 500MB storage
- ✅ Otomatik backup

### 5 Dakikada Kurulum:

1. **Hesap Oluştur**: https://supabase.com/dashboard/sign-up
2. **Yeni Proje**: "New Project" butonuna tıkla
3. **Bilgileri Gir**:
   - Name: `quebec-calculator`
   - Database Password: Güçlü bir şifre (kaydet!)
   - Region: `Canada (Central)`
4. **Bekle**: 2 dakika proje oluşturulacak
5. **Connection String Al**:
   - Settings → Database
   - Connection Pooling → URI
   - Copy

---

## Seçenek 3: Railway (Alternatif)

### Kurulum:
1. https://railway.app → Sign up with GitHub
2. "New Project" → "Provision PostgreSQL"
3. Database'e tıkla → "Connect" → "Postgres Connection URL"
4. Kopyala ve `.env`'e yapıştır

---

## Seçenek 4: Neon (Serverless PostgreSQL)

### Kurulum:
1. https://neon.tech → Sign up
2. "Create Project"
3. Connection string'i kopyala
4. `.env`'e yapıştır

---

## 🎯 Hangisini Seçmeliyim?

| Database | Kullanım | Önerilen |
|----------|----------|----------|
| **SQLite** | Sadece test | Hızlı denemek için |
| **Supabase** | Production | ✅ En iyi seçenek |
| **Railway** | Production | İyi alternatif |
| **Neon** | Production | Serverless için |

---

## 💡 Benim Önerim

**Supabase kullanın** çünkü:
1. Ücretsiz ve güvenilir
2. Admin panel var
3. Otomatik backup
4. Kolay kullanım
5. Bu proje için optimize

**Sadece 3 adım**:
1. Supabase'e kaydol (2 dk)
2. Proje oluştur (2 dk)
3. Connection string'i kopyala (30 sn)

Toplam: **5 dakika** ⏱️

---

## 🆘 Yardım İster misiniz?

Eğer Supabase'e kaydolmakta zorlanıyorsanız:

1. **Ekran görüntüsü gönderin**: Hangi adımda takıldınız?
2. **Hata mesajı paylaşın**: Ne diyor?
3. **Alternatif seçin**: SQLite ile test edin

Ben size her adımda yardımcı olabilirim! 🤝
