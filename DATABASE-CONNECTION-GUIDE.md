# 🔌 Veritabanı Bağlantı Rehberi

## ❌ Mevcut Sorun

```
Error: FATAL: Tenant or user not found
```

Bu hata, `.env` dosyasındaki `DATABASE_URL` geçersiz veya yanlış olduğu anlamına gelir.

## ✅ Çözüm: Supabase Connection String Alma

### Adım 1: Supabase Dashboard'a Git
1. https://supabase.com adresine git
2. Projenize giriş yapın
3. Sol menüden **"Project Settings"** (⚙️) seçin
4. **"Database"** sekmesine tıklayın

### Adım 2: Connection String'i Kopyala

**Connection Pooling** bölümünde:
- **Mode**: `Transaction` seçin
- **Connection string** kısmında **"URI"** seçin
- Connection string'i kopyalayın

Örnek format:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres
```

### Adım 3: .env Dosyasını Güncelle

`.env` dosyasını açın ve `DATABASE_URL` satırını güncelleyin:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres"
```

**ÖNEMLİ**: 
- `[PROJECT-REF]` kısmını projenizin referansı ile değiştirin
- `[YOUR-PASSWORD]` kısmını veritabanı şifreniz ile değiştirin
- Şifrenizi unuttuysanız Supabase'de reset edebilirsiniz

### Adım 4: Bağlantıyı Test Et

```bash
# Prisma ile bağlantıyı test et
npx prisma db push
```

Başarılı olursa şunu göreceksiniz:
```
✔ Your database is now in sync with your Prisma schema.
```

## 🗄️ Analytics Tablosunu Oluşturma

Bağlantı başarılı olduktan sonra:

```bash
# 1. Prisma Client'ı yeniden oluştur
npm run db:generate

# 2. Schema'yı veritabanına push et
npm run db:push

# 3. Başlangıç verilerini ekle
npm run db:init
```

## 📊 Veritabanı Yapısı

Push işlemi şu tabloları oluşturacak:

### SiteConfig Tablosu
```sql
CREATE TABLE "SiteConfig" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "isAdsEnabled" BOOLEAN NOT NULL DEFAULT true,
  "adSenseId" TEXT NOT NULL DEFAULT 'ca-pub-XXXXXXXXXXXXXXXX',
  "bannerSlotId" TEXT NOT NULL DEFAULT '',
  "sidebarSlotId" TEXT NOT NULL DEFAULT '',
  "alertMessage" TEXT NOT NULL DEFAULT '',
  "isAlertActive" BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY ("id")
);
```

### Analytics Tablosu
```sql
CREATE TABLE "Analytics" (
  "id" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE INDEX "Analytics_path_idx" ON "Analytics"("path");
CREATE INDEX "Analytics_createdAt_idx" ON "Analytics"("createdAt");
```

## 🔍 Veritabanını Görüntüleme

### Prisma Studio ile
```bash
npm run db:studio
```
Tarayıcıda `http://localhost:5555` açılacak.

### Supabase Dashboard ile
1. Supabase Dashboard'a git
2. Sol menüden **"Table Editor"** seçin
3. `SiteConfig` ve `Analytics` tablolarını göreceksiniz

## ⚠️ Yaygın Hatalar

### 1. "Tenant or user not found"
**Sebep**: Yanlış connection string
**Çözüm**: Supabase'den doğru string'i kopyalayın

### 2. "Password authentication failed"
**Sebep**: Yanlış şifre
**Çözüm**: Supabase'de şifreyi reset edin

### 3. "Connection timeout"
**Sebep**: Firewall veya network sorunu
**Çözüm**: VPN kapatın, internet bağlantısını kontrol edin

### 4. "SSL connection required"
**Sebep**: SSL ayarı eksik
**Çözüm**: Connection string sonuna `?sslmode=require` ekleyin

## 🎯 Doğru Connection String Formatı

```env
# Genel format
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Supabase Pooler (Önerilen)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres"

# Supabase Direct (Alternatif)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

## 📝 Kontrol Listesi

Veritabanı bağlantısı için:
- [ ] Supabase projesine erişim var
- [ ] Database şifresi biliniyor
- [ ] Connection string kopyalandı
- [ ] `.env` dosyası güncellendi
- [ ] `npx prisma db push` çalıştırıldı
- [ ] Tablolar oluşturuldu
- [ ] `npm run db:studio` ile kontrol edildi

## 🚀 Hızlı Başlangıç

```bash
# 1. .env dosyasını düzenle
# DATABASE_URL'i Supabase'den kopyala

# 2. Veritabanını oluştur
npx prisma db push

# 3. Başlangıç verilerini ekle
npm run db:init

# 4. Kontrol et
npm run db:studio

# 5. Uygulamayı başlat
npm run dev

# 6. Admin paneli aç
# http://localhost:3000/admin
```

## 💡 İpuçları

1. **Connection Pooler Kullanın**: Serverless ortamlar için daha iyi
2. **Şifreyi Güvenli Tutun**: `.env` dosyasını git'e eklemeyin
3. **SSL Kullanın**: Production'da mutlaka `sslmode=require` ekleyin
4. **Yedek Alın**: Supabase otomatik yedek alır ama manuel de alabilirsiniz

## 📞 Yardım

Hala sorun yaşıyorsanız:
1. Supabase Dashboard'da "Database Health" kontrol edin
2. Supabase logs'ları inceleyin
3. `.env` dosyasında boşluk veya özel karakter olmadığından emin olun
4. Connection string'i tırnak içine aldığınızdan emin olun

---

**Sonraki Adım**: `.env` dosyasını güncelledikten sonra `npx prisma db push` komutunu tekrar çalıştırın.
