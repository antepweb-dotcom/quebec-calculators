# 🗑️ Supabase Proje Silme Rehberi

## ⚠️ Dikkat!
Proje silme işlemi **geri alınamaz**! Tüm veriler kalıcı olarak silinir.

---

## 🔴 Proje Silme Adımları

### 1️⃣ Supabase Dashboard'a Git
```
https://supabase.com/dashboard/projects
```

### 2️⃣ Silinecek Projeyi Seç
- Projenizin üzerine tıklayın
- Sol alt köşede **"Settings"** (⚙️ dişli ikonu)

### 3️⃣ General Settings
- **"General"** sekmesinde kalın (varsayılan)
- En aşağı kaydırın

### 4️⃣ Danger Zone Bölümü
- Sayfanın en altında **"Danger Zone"** (kırmızı bölüm)
- **"Delete Project"** butonunu bulun

### 5️⃣ Silme İşlemini Onayla
1. **"Delete Project"** butonuna tıklayın
2. Açılan popup'ta:
   - Proje adını yazmanız istenecek
   - Örnek: `quebec-calculator` yazın
3. **"I understand, delete this project"** butonuna tıklayın

### 6️⃣ Tamamlandı ✅
- Proje 1-2 dakika içinde silinecek
- Dashboard'a geri döneceksiniz

---

## 🎯 Alternatif: Proje Duraklat (Pause)

Silmek yerine **durdurmak** isterseniz:

### Avantajlar:
- ✅ Veriler korunur
- ✅ İstediğiniz zaman tekrar başlatabilirsiniz
- ✅ Ücretsiz plan için kaynak tasarrufu

### Adımlar:
1. Dashboard → Projeniz
2. Settings → General
3. **"Pause Project"** butonu
4. Onayla

**Not**: 7 gün sonra otomatik olarak duraklatılır (free tier).

---

## 🆕 Yeni Proje Oluşturma

Eski projeyi sildikten sonra yeni proje:

### 1️⃣ Dashboard'a Git
```
https://supabase.com/dashboard/projects
```

### 2️⃣ New Project
- **"New Project"** butonuna tıklayın

### 3️⃣ Bilgileri Girin
```
Name: quebec-calculator-new
Database Password: [Güçlü bir şifre - KAYDET!]
Region: Canada (Central)
Pricing Plan: Free
```

### 4️⃣ Create Project
- **"Create new project"** butonuna tıklayın
- 2-3 dakika bekleyin

### 5️⃣ Connection String Al
1. Proje hazır olunca
2. Settings → Database
3. Connection Pooling → **URI**
4. **Copy** butonuna tıklayın

### 6️⃣ .env Dosyasını Güncelle
```env
DATABASE_URL="yeni_kopyaladiginiz_connection_string"
```

### 7️⃣ Veritabanını Oluştur
```bash
npx prisma db push
npm run db:init
npm run dev
```

---

## 🔄 Hızlı Yeniden Başlatma

Eski projeyi silip yenisini oluşturmak için:

```bash
# 1. Supabase'de eski projeyi sil (yukarıdaki adımlar)

# 2. Yeni proje oluştur (2-3 dakika)

# 3. Connection string'i .env'e yapıştır

# 4. Veritabanını kur
npx prisma db push

# 5. Başlangıç verilerini ekle
npm run db:init

# 6. Uygulamayı başlat
npm run dev
```

**Toplam süre**: ~5 dakika ⏱️

---

## 💡 İpuçları

### Silmeden Önce:
- [ ] Önemli veriler var mı? → Backup alın
- [ ] Connection string'i başka yerde kullanıyor musunuz?
- [ ] Production'da mı? → Dikkatli olun!

### Yeni Proje İçin:
- ✅ Güçlü şifre kullanın (en az 12 karakter)
- ✅ Şifreyi güvenli bir yere kaydedin
- ✅ Region'u yakın seçin (Canada/US)
- ✅ Free tier yeterli (500MB)

---

## 🆘 Sorun Giderme

### "Delete butonu görünmüyor"
**Sebep**: Sayfanın en altına kaydırmadınız
**Çözüm**: Danger Zone bölümüne kadar kaydırın

### "Proje adı eşleşmiyor"
**Sebep**: Proje adını yanlış yazdınız
**Çözüm**: Tam olarak aynısını yazın (büyük/küçük harf duyarlı)

### "Silme işlemi uzun sürüyor"
**Sebep**: Normal, 1-2 dakika sürebilir
**Çözüm**: Bekleyin, sayfa yenilenecek

---

## 🎯 Özet

**Proje Silme**:
1. Dashboard → Proje → Settings
2. En alta kaydır → Danger Zone
3. Delete Project → Proje adını yaz → Onayla

**Yeni Proje**:
1. New Project → Bilgileri gir
2. Create → Connection string kopyala
3. .env'e yapıştır → `npx prisma db push`

**Hepsi bu kadar!** 🚀

---

## ❓ Sık Sorulan Sorular

**S: Silinen proje geri getirilebilir mi?**
C: Hayır, kalıcı olarak silinir. Backup yoksa veri kurtarılamaz.

**S: Kaç proje oluşturabilirim?**
C: Free tier'da 2 aktif proje.

**S: Pause ve Delete farkı nedir?**
C: Pause → Veriler korunur, tekrar başlatılabilir
   Delete → Kalıcı silme, geri alınamaz

**S: Yeni proje oluşturma ücretsiz mi?**
C: Evet, Free tier sınırları dahilinde.

---

**Başka sorunuz varsa sorabilirsiniz!** 🤝
