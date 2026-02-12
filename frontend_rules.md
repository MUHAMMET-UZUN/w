# İHH Web Sitesi Tasarım ve Geliştirme Rehberi

Bu doküman, İHH İnsani Yardım Vakfı için geliştirilecek web projelerinde görsel bütünlüğü ve kullanıcı deneyimini standartlaştırmak amacıyla hazırlanmıştır.

## 1. Görsel Kimlik ve Renk Paleti (Color Palette)
İHH tasarımı "Güven" ve "Aksiyon" üzerine kuruludur. Ana renkler markanın kurumsal kimliğini yansıtırken, vurgu renkleri bağışı teşvik eder.

- **Primary (Ana Renk):** `#009044` (İHH Yeşili) - Logodan gelen güven ve huzuru temsil eden ana renk. Navbar, ana butonlar ve ikonlarda kullanılır.
- **Secondary (Vurgu):** `#FFB800` veya Altın Sarısı tonları - Dikkat çekmek istenen "Bağış Yap" butonları ve acil durum uyarılarında kullanılır.
- **Nötr Renkler:** - Arka planlar için `#FFFFFF` (Beyaz) ve çok açık gri `#F8F9FA`.
    - Metinler için koyu gri/siyah `#212529`.

## 2. Tipografi (Typography)
Okunabilirlik ve modern görünüm ön plandadır.
- **Font Ailesi:** Sans-serif fontlar tercih edilmelidir (Örn: `Inter`, `Roboto` veya `Open Sans`).
- **Hiyerarşi:**
    - `h1`: 32px - 40px (Sayfa başlıkları)
    - `h2`: 24px - 30px (Bölüm başlıkları)
    - `Body`: 16px (Okunabilirlik için ideal)
    - `Small`: 14px (Meta veriler, tarihler)

## 3. UI Bileşenleri ve Tasarım Kuralları
### Butonlar
- **Bağış Butonları:** Her zaman görünür, genellikle sağ üstte veya ekranın altında yapışık (sticky) olarak konumlandırılır. Köşeler hafif yuvarlatılmış (`border-radius: 4px` veya `8px`) olmalıdır.
- **Ghost Butonlar:** "Detaylı Bilgi" gibi ikincil aksiyonlar için şeffaf arka planlı, ince çerçeveli butonlar kullanılır.

### Kart Yapıları (Card UI)
- Projeler (Su Kuyusu, Yetim vb.) kartlar içerisinde sunulur.
- **Görsel Kullanımı:** Kartın en üstünde yüksek kaliteli, duygusal bağı kuvvetlendiren gerçek fotoğraflar kullanılır.
- **İlerleme Çubuğu (Progress Bar):** Tamamlanma oranını gösteren yeşil renkli barlar, bağışçının motivasyonunu artırır.

### Formlar ve Bağış Süreci
- Form alanları sade, geniş ve dokunmatik cihazlara uygun (mobile-friendly) olmalıdır.
- Bağış miktarı seçimi için hazır "Hızlı Miktar" butonları (50₺, 100₺, 200₺) eklenmelidir.

## 4. Layout ve Grid Sistemi
- **Responsive Tasarım:** Site öncelikle mobil uyumlu (Mobile-First) olmalıdır. Bağış yapma butonu mobilde baş parmak erişimine uygun yerde olmalıdır.
- **Grid:** Standart 12'li grid sistemi kullanılmalıdır. İçerikler arasında geniş beyaz alanlar (white space) bırakılarak göz yorulmamalıdır.

## 5. İkonografi ve Medya
- **İkonlar:** Sade, ince çizgili (line-art) veya kurumsal yeşil dolgulu ikonlar kullanılmalıdır.
- **Fotoğraflar:** Stok görsel yerine sahadan gelen gerçek fotoğraflar kullanılmalıdır. Bu, vakfın şeffaflık ve güven ilkesini pekiştirir.

## 6. Erişilebilirlik (Accessibility)
- Görme engelli kullanıcılar için resimlerde `alt` text kullanımı zorunludur.
- Renk kontrastı (özellikle yeşil üzerindeki beyaz metinler) WCAG standartlarına uygun olmalıdır.