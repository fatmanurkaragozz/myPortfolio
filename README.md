# 🌟 Fatma Nur Karagöz - Kişisel Portföy Web Sitesi

Modern web teknolojileri, temiz kod mimarileri ve interaktif UI/UX tasarım standartları doğrultusunda geliştirilmiş, tamamen responsive (mobil uyumlu) kişisel portföy uygulaması.

Aydınlık (Light) ve Karanlık (Dark) mod desteği, akıcı sayfa içi geçiş animasyonları ve dinamik alt sayfalarla zenginleştirilmiş premium bir kullanıcı deneyimi sunar.

---

## 🚀 Özellikler

### 🎨 Görsel Tasarım ve Arayüz (UI/UX)
- **Dinamik Tema Sistemi**: Tek tıkla geçiş yapılabilen modern aydınlık ve karanlık mod desteği. Aydınlık modda havada yavaşça süzülen bulutlar, karanlık modda ise parıldayan yıldızlar yer alır.
- **İnteraktif Giriş Animasyonu (Intro)**: Sayfa ilk açıldığında kağıt uçak ve mektup taşıyan kuş animasyonunun yer aldığı, kullanıcının tıklamasıyla mektubun açılıp portföye yönlendirdiği interaktif karşılama ekranı.
- **Dinamik Sticky Navigasyon**: Scroll spy özellikli, kullanıcının sayfadaki konumuna göre otomatik aktifleşen ve aşağı kaydırıldığında yarı saydam cam (glassmorphism) efektine bürünen şık üst menü.

### 📄 Bölümler ve Sayfalar
- **Hakkımda (About)**: Yazılım mühendisliği öğrencisi olarak akademik ve teknik vizyonumu, araştırma alanlarımı (Makine Öğrenmesi, LLM'ler) ve ilgi alanlarımı tanıtan dikey hizalı profil görselli şık biyografi bölümü.
- **CV**: Hero bölümündeki "CV'mi İncele" düğmesi, Türkçe ve İngilizce CV'yi yeni sekmede görüntüleme veya indirme seçeneklerini açar. PDF dosyaları `public/cv/` klasöründe durur (`Fatma-Nur-Karagoz-CV-TR.pdf`, `Fatma-Nur-Karagoz-CV-EN.pdf`), liste ve dosya adları `src/data/cv.json` içinde tanımlıdır. CV'yi güncellemek için aynı adla PDF'i değiştirmeniz yeterlidir. Türkçe CV Word'den dışa aktarılan PDF'tir, İngilizce CV'nin kaynağı `scripts/cv/Fatma-Nur-Karagoz-CV-EN.html` dosyasıdır (tarayıcıda açıp Yazdır → PDF olarak kaydet ile yeniden üretilir). CV'ler telefon/adres gibi kişisel bilgi içerebileceğinden `robots.txt` içinde `/cv/` taramaya kapalıdır.
- **Kariyer (Experience)**: TÜBİTAK STAR ve ÇAKÜ Bilgi İşlem Daire Başkanlığı yaz stajı gibi deneyimleri, devam edenler en üstte olacak şekilde dikey zaman çizelgesinde gösterir. Veri `src/data/career.json` dosyasından okunur, yeni kayıt eklemek için yalnızca bu dosyaya bir giriş eklemek yeterlidir.
- **Yetenekler (Skills)**: Frontend, Backend ve Araçlar olmak üzere 3 kategoride toplanmış, seviye göstergeli (1-5/5) ve animasyonlu yetenek barları (React, TS, Node, Colab vb.).
- **Projeler (Projects)**:
  - Projeleri kategorilere (Frontend, Full Stack, Backend, Makine Öğrenimi) göre anında filtreleyebilen dinamik grid yapısı.
  - Ekip projeleri için özel `👥 Ekip Projesi` rozetleri ve projedeki rol ve katkıları detaylandıran **"Ekipteki Rolüm & Katkılarım"** kartları.
  - Ekran görüntülerinin kesilmeden/kırpılmadan gösterilmesi için dinamik `contain/cover` görsel yerleşimi.
  - Proje görsellerini tam ekran olarak inceleyebilmeyi sağlayan **Lightbox Görsel Galerisi**.
- **İletişim (Contact)**: **Web3Forms API** ile tam entegre çalışan, anlık doğrulama kontrollü ve şık geri bildirim uyarılarına (Alert) sahip iletişim formu.
- **Blog**: Yazılım ve teknoloji odaklı içeriklerin listelendiği, 16:9 geniş görsel formatına uygun tasarlanmış blog alt sayfası.

---

## 🛠️ Teknoloji Yığını

- **Frontend Core**: React 18.3.1 (Modern Hooks & Functional Components), TypeScript
- **Derleyici & Araçlar**: Vite, npm
- **Stil & Tasarım**: Tailwind CSS (v4), Vanilla CSS
- **Animasyonlar**: Framer Motion
- **Entegrasyonlar**: Web3Forms (İletişim Formu E-posta Gönderimi)
- **SEO**: Canonical, Open Graph / Twitter Card, JSON-LD (`Person` + `WebSite`), build sırasında otomatik üretilen `sitemap.xml` ve `robots.txt` (bkz. [SEO ve Arama Motoru Görünürlüğü](#-seo-ve-arama-motoru-görünürlüğü))

---

## 📁 Proje Klasör Yapısı

```text
myPortfolio/
├── public/                 # Statik dosyalar (projeler verisi, görseller, favicon, sosyal önizleme)
│   ├── data/
│   │   └── projects.json   # Projelerin dinamik JSON veri tabanı
│   ├── cv/                 # CV PDF dosyaları (TR / EN)
│   ├── images/             # Proje ekran görüntüleri ve profil resmi
│   ├── og-image.jpg        # Sosyal paylaşım önizlemesi (1200x630)
│   └── favicon*.png, favicon.ico, apple-touch-icon.png
├── src/
│   ├── components/         # Ortak bileşenler
│   │   ├── forms/          # Formlar (İletişim, filtreleme)
│   │   ├── layout/         # Sayfa düzeni (Header, Footer)
│   │   ├── sections/       # Ana sayfa bölümleri (Hero, About, Experience, Skills, ProjectList)
│   │   ├── CvMenu.tsx      # Hero'daki CV görüntüle / indir menüsü
│   │   ├── BlogPage.tsx    # Blog sayfası bileşeni
│   │   ├── ProjectsPage.tsx # Tüm projeler listeleme sayfası
│   │   ├── ProjectDetailPage.tsx # Detaylı proje inceleme sayfası
│   │   └── PageBackground.tsx   # Dinamik gökyüzü arka planı (Bulutlar & Yıldızlar)
│   ├── data/
│   │   ├── career.json     # Kariyer zaman çizelgesi verisi
│   │   └── cv.json         # CV dosyaları (dil, yol, indirme adı)
│   ├── services/           # Servis katmanı (Veri çekme işlemleri)
│   ├── types/              # TypeScript tip tanımlamaları
│   ├── utils/              # Filtre/sıralama ve kariyer yardımcıları
│   ├── App.tsx             # Ana uygulama orkestratörü
│   ├── main.tsx            # Giriş noktası
│   └── index.css           # Global Tailwind & özel stil tanımlamaları
├── vite-plugins/
│   └── seoShell.ts         # SEO eklentisi (adres jetonu, crawler içeriği, sitemap, robots)
├── scripts/
│   ├── cv/                 # İngilizce CV kaynağı (HTML -> PDF)
│   └── legacy-redirect/    # Eski github.io/myPortfolio adresinden yönlendirme sayfası
├── index.html              # HTML şablonu (meta etiketleri, JSON-LD)
├── package.json            # Bağımlılık ve script tanımları
└── vite.config.ts          # Vite konfigürasyonu
```

---

## ⚙️ Kurulum ve Yerel Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/fatmanurkaragozz/myPortfolio.git
   cd myPortfolio
   ```

2. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatın**:
   ```bash
   npm run dev
   ```
   *Tarayıcınızda otomatik açılmazsa `http://localhost:5173` adresine giderek görüntüleyebilirsiniz.*

4. **Üretim Sürümünü Derleyin (Build)**:
   ```bash
   npm run build
   ```

---

## 🌐 Yayınlama (GitHub Pages)

Site, kullanıcı sitesi olarak **`https://fatmanurkaragozz.github.io/`** adresinde yayınlanır. Kaynak kod bu depoda (`myPortfolio`) durur, derlenen dosyalar ise `fatmanurkaragozz/fatmanurkaragozz.github.io` deposunun `main` dalına gönderilir. Kök adreste yayınlamak, alt dizinde (`/myPortfolio/`) yayınlamaya göre arama motorlarında daha güçlü bir adres sinyali verir.

**Tek seferlik kurulum**

1. GitHub'da `fatmanurkaragozz.github.io` adında boş, public bir depo oluşturun.
2. O depoda **Settings → Pages → Build and deployment** altında kaynak olarak **Deploy from a branch**, dal olarak **`main` / (root)** seçin.

**Her yayında**

```bash
npm run deploy          # önce build alır, sonra build/ klasörünü kullanıcı sitesi deposuna gönderir
```

**Eski adresten yönlendirme (bir kez)**

Eski `https://fatmanurkaragozz.github.io/myPortfolio/` adresinin yeni adrese yönlenmesi için:

```bash
npm run deploy:legacy   # scripts/legacy-redirect/ içeriğini bu deponun gh-pages dalına gönderir
```

> `deploy:legacy` bu deponun `gh-pages` dalındaki eski site dosyalarının yerine yönlendirme sayfasını koyar.

---

## 🔎 SEO ve Arama Motoru Görünürlüğü

- **`index.html`**: başlık, açıklama, canonical, Open Graph / Twitter Card ve `Person` + `WebSite` JSON-LD. Sitenin adresi tek yerde, `vite.config.ts` içindeki `seoShell({ siteUrl })` ayarında tutulur, HTML'deki `__SITE_URL__` jetonu build sırasında bununla değişir.
- **`vite-plugins/seoShell.ts`**: `#root` içine, ekrandaki içeriği (kariyer, projeler, profiller) yansıtan görsel olarak gizli anlamsal bir HTML kabuğu basar. JS çalışmadan önce ya da geç çalışırken de arama motorları tam metni görür, React yüklenince kabuk yerini uygulamaya bırakır. Kabuk `src/data/career.json` ve `public/data/projects.json` dosyalarından üretildiği için ayrıca elle güncellenmesi gerekmez. Aynı eklenti `sitemap.xml` ve `robots.txt` dosyalarını üretir.
- **Yeni proje veya kariyer kaydı** eklemek için ilgili JSON dosyasını düzenlemek yeterlidir, bir sonraki build'de SEO içeriği de güncellenir.
- **Proje sırası**: varsayılan sıralama "yıla göre azalan"dır ve `sortProjects` azalan sıralamada diziyi ters çevirdiği için aynı yıldaki projeler dosya sırasının **tersiyle** listelenir. Bir projenin en üstte görünmesi için `projects.json` içinde o yılın grubunun **sonuna** ekleyin.
- **Google Search Console** (elle yapılır): `https://fatmanurkaragozz.github.io/` için URL-prefix mülkü ekleyin, HTML etiketiyle doğrulayın (verilen `google-site-verification` etiketini `index.html` `<head>` bölümüne ekleyin), `sitemap.xml` dosyasını gönderin ve ana sayfa için "Dizine eklenmesini iste" deyin.
- **Bağlantılar**: sitenin adresini GitHub profilinize (Website alanı ve profil README'si), LinkedIn, Medium ve Instagram biyografinize ekleyin. Güçlü sitelerden gelen bağlantılar sıralamayı en çok etkileyen etkendir.

---

### Alternatif: GitHub Actions ile otomatik yayın
Herhangi bir yerel bağımlılık eklemeden, depoya push yaptığınızda otomatik derleme ve yayınlama yapmasını sağlar:

1. Proje ana dizininde `.github/workflows/deploy.yml` dosyasını oluşturun ve aşağıdaki kodları ekleyin:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main  # Hangi branch'e push yapıldığında tetikleneceği

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./build  # Vite build çıktı klasörü
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```
2. GitHub depo ayarlarınızdan (Settings -> Pages -> Build and deployment) kaynak olarak **"GitHub Actions"** seçeneğini işaretleyin.
3. Değişiklikleri push ettiğinizde portföyünüz `https://<kullanici-adiniz>.github.io/<repo-adiniz>/` (bu durumda `vite.config.ts` içindeki `base` ve `seoShell` adresi de buna göre güncellenmelidir) adresinde canlıya geçecektir.
