# 🗄️ Analytics Tablosunu Veritabanında Oluşturma

## ❌ Mevcut Durum

```bash
npx prisma db push
# Error: FATAL: Tenant or user not found
```

**Sorun**: `.env` dosyasındaki `DATABASE_URL` geçersiz.

## ✅ Çözüm Adımları

### 1️⃣ Supabase'den Doğru Connection String Al

#### Supabase Dashboard:
1. https://supabase.com → Projenize giriş yapın
2. Sol menü → **Settings** (⚙️)
3. **Database** sekmesi
4. **Connection Pooling** bölümü
5. Mode: **Transaction** seçin
6. Connection string: **URI** formatını seçin
7. **Kopyala** butonuna tıklayın

#### Örnek Connection String:
```
postgresql://postgres.abcdefghijk:ŞİFRENİZ@aws-0-ca-central-1.pooler.supabase.com:6543/postgres
```

### 2️⃣ .env Dosyasını Güncelle

`.env` dosyasını açın ve şu satırı değiştirin:

```env
# ESKI (Yanlış)
DATABASE_URL="postgresql://postgres.xysdfjkhsdfskdjfh:2299416@Qq.@aws-0-ca-central-1.pooler.supabase.com:6543/postgres"

# YENİ (Supabase'den kopyaladığınız)
DATABASE_URL="postgresql://postgres.PROJE_REF:ŞİFRENİZ@aws-0-ca-central-1.pooler.supabase.com:6543/postgres"
```

**ÖNEMLİ**: 
- Tırnak işaretlerini unutmayın
- Şifrenizde özel karakterler varsa URL encode edin
- Boşluk bırakmayın

### 3️⃣ Veritabanını Oluştur

```bash
# Adım 1: Prisma Client'ı yeniden oluştur
npm run db:generate

# Adım 2: Schema'yı veritabanına push et
npm run db:push

# Başarılı olursa göreceksiniz:
# ✔ Your database is now in sync with your Prisma schema.
```

### 4️⃣ Başlangıç Verilerini Ekle

```bash
npm run db:init
```

Bu komut:
- ✅ SiteConfig tablosuna default kayıt ekler
- ✅ Analytics tablosuna örnek veriler ekler

### 5️⃣ Kontrol Et

```bash
# Prisma Studio ile veritabanını görüntüle
npm run db:studio
```

Tarayıcıda `http://localhost:5555` açılacak ve şunları göreceksiniz:
- **SiteConfig** tablosu (1 kayıt)
- **Analytics** tablosu (örnek kayıtlar)

## 📊 Oluşturulacak Tablolar

### Analytics Tablosu
```sql
CREATE TABLE "Analytics" (
  id        TEXT PRIMARY KEY,      -- UUID
  path      TEXT NOT NULL,         -- Sayfa yolu
  createdAt TIMESTAMP DEFAULT NOW  -- Ziyaret zamanı
);

-- Indexler (Hızlı sorgular için)
CREATE INDEX ON "Analytics"(path);
CREATE INDEX ON "Analytics"(createdAt);
```

### SiteConfig Tablosu
```sql
CREATE TABLE "SiteConfig" (
  id             INTEGER PRIMARY KEY DEFAULT 1,
  isAdsEnabled   BOOLEAN DEFAULT true,
  adSenseId      TEXT DEFAULT 'ca-pub-XXXXXXXXXXXXXXXX',
  bannerSlotId   TEXT DEFAULT '',
  sidebarSlotId  TEXT DEFAULT '',
  alertMessage   TEXT DEFAULT '',
  isAlertActive  BOOLEAN DEFAULT false
);
```

## 🧪 Test Et

### 1. Uygulamayı Başlat
```bash
npm run dev
```

### 2. Sayfaları Ziyaret Et
```
http://localhost:3000/
http://localhost:3000/calcul-hypotheque
http://localhost:3000/salaire-net-quebec
```

### 3. Analytics Verilerini Kontrol Et
```bash
npm run db:studio
```

Analytics tablosunda yeni kayıtlar göreceksiniz:
```
id: "550e8400-e29b-41d4-a716-446655440000"
path: "/calcul-hypotheque"
createdAt: "2026-01-26 15:30:00"
```

### 4. Admin Paneli Kontrol Et
```
http://localhost:3000/admin
```

- **Overview**: Total views sayısını göreceksiniz
- **Analytics**: Top visited pages listesini göreceksiniz

## ⚠️ Yaygın Hatalar ve Çözümleri

### Hata 1: "Tenant or user not found"
```
Sebep: Yanlış connection string
Çözüm: Supabase'den tekrar kopyalayın
```

### Hata 2: "Password authentication failed"
```
Sebep: Yanlış şifre
Çözüm: Supabase → Settings → Database → Reset Password
```

### Hata 3: "Connection timeout"
```
Sebep: Network sorunu
Çözüm: 
- VPN'i kapatın
- Firewall ayarlarını kontrol edin
- İnternet bağlantınızı kontrol edin
```

### Hata 4: "SSL required"
```
Sebep: SSL ayarı eksik
Çözüm: Connection string sonuna ekleyin:
DATABASE_URL="postgresql://...?sslmode=require"
```

## 🎯 Başarı Kriterleri

Veritabanı başarıyla oluşturuldu mu?

- [ ] `npx prisma db push` hatasız çalıştı
- [ ] `npm run db:studio` veritabanını gösteriyor
- [ ] SiteConfig tablosu var
- [ ] Analytics tablosu var
- [ ] Indexler oluşturuldu
- [ ] `npm run db:init` başarılı
- [ ] Admin panel verileri gösteriyor

## 🚀 Hızlı Komutlar

```bash
# Tüm adımları sırayla çalıştır:

# 1. .env dosyasını düzenle (manuel)
# DATABASE_URL'i Supabase'den kopyala

# 2. Prisma Client oluştur
npm run db:generate

# 3. Veritabanını oluştur
npm run db:push

# 4. Başlangıç verilerini ekle
npm run db:init

# 5. Kontrol et
npm run db:studio

# 6. Uygulamayı başlat
npm run dev
```

## 📝 Sonraki Adımlar

Veritabanı oluşturulduktan sonra:

1. ✅ Analytics tracking otomatik çalışacak
2. ✅ Her sayfa ziyareti kaydedilecek
3. ✅ Admin panelde istatistikler görünecek
4. ✅ Gerçek zamanlı veri akışı başlayacak

## 💡 İpucu

Eğer hala sorun yaşıyorsanız:

1. **Supabase Dashboard'u kontrol edin**:
   - Database aktif mi?
   - Paused durumda değil mi?
   - Connection limit aşılmadı mı?

2. **Connection string'i test edin**:
   ```bash
   # PostgreSQL client ile test
   psql "postgresql://..."
   ```

3. **Logs'ları kontrol edin**:
   - Supabase Dashboard → Logs
   - Terminal'deki hata mesajları

---

**ÖNEMLİ**: `.env` dosyasını güncelledikten sonra mutlaka `npx prisma db push` komutunu tekrar çalıştırın!
