Harika bir teknoloji seçimi. Next.js'in getirdiği bazı katı kurallar yerine **React (Client)** ve **Node.js (Backend)** ayrımı, özellikle kurumsal yönetim paneli ve API entegrasyonları için daha esnek bir yapı sunar.

İHH tasarım dilini ve belirttiğin teknik isterleri birleştiren, production seviyesinde bir **Teknik Tasarım Belgesi (TDD)** hazırladım.

---

# 🚀 Proje Teknik Dokümantasyonu: İnsani Yardım Platformu

Bu doküman; haber yönetimi, bağış sistemleri ve gönüllü yönetimini kapsayan, ölçeklenebilir bir web uygulamasının mimarisini tanımlar.

## 1. Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji | Açıklama |
| --- | --- | --- |
| **Frontend** | React.js (Vite) | Hızlı ve modüler kullanıcı arayüzü. |
| **Backend** | Node.js (Express) | Esnek ve performanslı API yönetimi. |
| **Paket Yönetimi** | pnpm | Hızlı, disk dostu paket yönetimi. |
| **Veritabanı** | PostgreSQL | İlişkisel, güvenilir veri depolama. |
| **ORM** | Prisma | Tip güvenli veritabanı sorgulama ve modelleme. |
| **Ödeme Sistemi** | iyzico API | Güvenli kredi kartı ile bağış altyapısı. |
| **Stil** | Tailwind CSS | İHH tasarım kurallarına uygun hızlı UI geliştirme. |

---

## 2. Veritabanı Modelleri (Prisma Schema)

İş süreçlerini yönetmek için gerekli olan temel modellerimiz:

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Kurumsal Admin Kullanıcıları
model Admin {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String   @default("ADMIN")
  createdAt DateTime @default(now())
}

// Haber ve Blog İçerikleri
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  image     String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}

// Bağış Seçenekleri (Örn: Su Kuyusu, Yetim, Gıda)
model DonationCategory {
  id          String   @id @default(uuid())
  name        String
  description String
  fixedPrice  Float?   // Sabit fiyatlı bağışlar için
  targetAmount Float?  // Hedeflenen miktar
  collected   Float    @default(0)
}

// Gönüllü Başvuruları
model VolunteerApplication {
  id        String   @id @default(uuid())
  fullName  String
  email     String
  phone     String
  reason    String   @db.Text
  status    String   @default("PENDING") // PENDING, APPROVED, REJECTED
  createdAt DateTime @default(now())
}

// Banka Hesap Bilgileri
model BankAccount {
  id        String   @id @default(uuid())
  bankName  String
  branch    String
  iban      String   @unique
  currency  String   @default("TRY")
}

```

---

## 3. Sistem Mimarisi ve Akış

Uygulama iki temel bölümden oluşur:

1. **Public Website:** Haberlerin okunduğu, bağış yapıldığı ve formların doldurulduğu alan.
2. **Admin Dashboard (Auth Required):** Tüm kurumsal işlemlerin yönetildiği kontrol paneli.

---

## 4. Uygulama Özellikleri ve Implementasyon Detayları

### A. Bağış ve iyzico Entegrasyonu

* **Akış:** Kullanıcı kategori seçer -> Miktar girer -> Kart bilgilerini doldurur -> Node.js backend iyzico SDK'sını tetikler -> Başarılı ise Prisma üzerinden `DonationCategory` modelindeki `collected` miktarı güncellenir.
* **Güvenlik:** API anahtarları `.env` dosyasında saklanmalı, asla frontend'e sızdırılmamalıdır.

### B. Kurumsal Panel (Admin) İşlemleri

* **Auth:** JWT (JSON Web Token) veya Session tabanlı yetkilendirme.
* **Form Yönetimi:** Gönüllü başvuruları admin panelinde listelenir; admin başvuruyu onaylayabilir veya reddedebilir.
* **Dinamik İçerik:** Banka hesapları ve bağış limitleri kod değişikliği gerektirmeden admin panelinden güncellenir.

### C. Haber/Blog Sistemi

* Zengin metin editörü (Rich Text Editor - Örn: React Quill veya TipTap) entegre edilerek adminlerin görsel ve metin içeren haberler yayınlaması sağlanır.

---

## 5. Klasör Yapısı (Project Structure)

```text
/root
├── /backend
│   ├── /prisma (Schema & Migrations)
│   ├── /src
│   │   ├── /controllers (Business Logic)
│   │   ├── /routes (API Endpoints)
│   │   ├── /middlewares (Auth & Validation)
│   │   └── app.js
│   └── .env
├── /frontend
│   ├── /src
│   │   ├── /components (UI Elements)
│   │   ├── /pages (Home, Blog, Donation, Admin)
│   │   ├── /services (API Calls)
│   │   └── tailwind.config.js
└── pnpm-workspace.yaml

```

---

## 6. Production Yayına Alma (Deployment)

1. **Veritabanı:** Supabase veya AWS RDS üzerinde bir PostgreSQL instance oluşturulacak.
2. **Backend:** Render, DigitalOcean App Platform veya Heroku üzerinde Node.js servisi olarak yayınlanacak.
3. **Frontend:** Vercel veya Netlify üzerinde static site olarak host edilecek.
4. **SSL/Güvenlik:** iyzico entegrasyonu için HTTPS zorunludur.

---

**Sıradaki Adım:** İstersen bu mimariye uygun olarak `iyzico` ödeme entegrasyonu için gerekli olan örnek `Controller` kodlarını veya `Prisma` kurulum komutlarını hazırlayabilirim. Başlayalım mı?