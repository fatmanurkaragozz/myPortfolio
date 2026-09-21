import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/useLanguage';
import type { Lang } from '../i18n/localized';

interface BlogPageProps {
  onBack: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// "2025-03-14" -> "14 Mart 2025" (tr) | "March 14, 2025" (en). UTC: ISO tarihi bir gün kaymasın.
function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(iso));
}

export function BlogPage({ onBack, isDarkMode, toggleDarkMode }: BlogPageProps) {
  const { t, lang } = useLanguage();
  const articles = [
    {
      id: 1,
      title: "ŞAH MAT : YAPAY ZEKA VS İNSAN",
      excerpt: "Geçenlerde bir satranç turnuvasına katıldım ve gerçekten güçlü rakiplerle karşılaştım. Aklıma bir soru takıldı: “Acaba dünyanın en iyi satranç oyuncularından biriyle oynasaydım nasıl bir sonuç alırdım?” Ama bu kez rakibim bir insan değil, bir yapay zekâ olacaktı.",
      minutes: 4,
      date: "2025-03-14",
      tags: ["Chess", "Artifical Intelligence", "Machine Learning", "AlphaZero", "Deep Learning"],
      tagLang: "en",
      image: "./images/sahmat.png",
      url: "https://medium.com/@fatmaNurK/%C5%9Fah-mat-yapay-zeka-vs-i%CC%87nsan-63c841406ad9"
    },
    {
      id: 2,
      title: "Matrislerin Yazılım Dünyasındaki Evrimi ve Reginald Denny Olayı: Matematiğin Suç Tespitindeki Gücü",
      excerpt: "Matrisler, günümüzde birçok bilimsel ve teknolojik alanda kritik bir araç olarak kullanılmaktadır. Tarih boyunca bu matematiksel yapı, farklı alanlarda gelişerek bugünkü güçlü halini almıştır.",
      minutes: 3,
      date: "2025-02-20",
      tags: ["Matrisler", "Görüntü İşleme", "Matematik", "Yapay Zeka", "Algoritmalar"],
      tagLang: "tr",
      image: "./images/matrisler.png",
      url: "https://medium.com/@fatmaNurK/matrislerin-yaz%C4%B1l%C4%B1m-d%C3%BCnyas%C4%B1ndaki-evrimi-ve-reginald-denny-olay%C4%B1-matemati%C4%9Fin-su%C3%A7-tespitindeki-g%C3%BCc%C3%BC-edaf787fbc74"
    },
    {
      id: 3,
      title: "Yapay Zeka ve Veri Bilimi: Geleceği İnşa Eden Güçler",
      excerpt: "Bu yazıda, yapay zekanın farklı sektörlerdeki kullanım alanlarını, ilgili algoritmaları ve gerçek dünya örnekleriyle inceleyeceğiz. Ayrıca veri bilimi ve yapay zekaya ilgi duyanlar için temel kavramlara da değineceğiz.",
      minutes: 3,
      date: "2025-01-27",
      tags: ["Veri Bilimi", "Yapay Zeka", "Veri Manipülasyonu"],
      tagLang: "tr",
      image: "./images/ai.png",
      url: "https://medium.com/@fatmaNurK/yapay-zeka-ve-veri-bilimi-gelece%C4%9Fi-i%CC%87n%C5%9Fa-eden-g%C3%BC%C3%A7ler-5bd1611ab05f"
    },
    {
      id: 4,
      title: "Acıkmış Filozoflar, Chopstickler ve İşletim Sisteminin Kabusu (Deadlock)",
      excerpt: "İşletim Sistemleri dersinin o meşhur problemi: “Yemek Yiyen Filozoflar Problemi” (Dining Philosophers). Aslında bu konu, bilişim dünyasıyla hiç ilginiz olmasa bile, kafanızda bir işletim sisteminin temel mantığını oturtmanızı sağlayacak harika bir metafor.",
      minutes: 5,
      date: "2026-04-22",
      tags: ["Operating Systems", "Deadlock", "Concurrency", "Computer Science"],
      tagLang: "en",
      image: "./images/filozofi.png",
      url: "https://medium.com/@fatmaNurK/%C3%B6%C4%9Frenci-g%C3%B6z%C3%BCnden-1-ac%C4%B1km%C4%B1%C5%9F-filozoflar-chopstickler-ve-i%CC%87%C5%9Fletim-sisteminin-kabusu-deadlock-7b357782b4a7"
    },
  ];

  return (
    <motion.main
      className="relative min-h-screen p-4 md:p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <PageBackground isDarkMode={isDarkMode} />

      {/* Üst Navigasyon - Geri Dön Butonu */}
      <div className="fixed top-6 left-24 z-[110]">
        <Button
          variant="ghost"
          onClick={onBack}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md dark:text-white border border-white/20 px-6 h-14"
        >
          {t('blog.back')}
        </Button>
      </div>

      {/* Global Tema Butonu (Component içinde fixed top-6 left-6) */}
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <LanguageToggle variant="fixed" />

      <div className="relative max-w-7xl mx-auto z-10 pt-44">
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase mb-4 text-slate-900 dark:text-white tracking-widest">
              {t('blog.title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium max-w-2xl border-l-4 border-green-500 pl-4">
              {t('blog.subtitle')}
            </p>
          </div>
        </motion.header>

        {/* Articles Grid */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {articles.map((article, index) => (
            <Card
              key={article.id}
              title={article.title}
              image={article.image}
              imageAlt={article.title}
              variant="elevated"
              className="group cursor-pointer"
              imageClassName="w-full aspect-[16/9] object-cover object-center transition-transform duration-500 group-hover:scale-105"
              footer={
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-blue-600 hover:text-blue-700 justify-between group-hover:bg-blue-50 transition-colors"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  <span>{t('blog.readMore')}</span>
                  <span>→</span>
                </Button>
              }
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium tracking-wide">
                  <span>{formatDate(article.date, lang)}</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{t('blog.readTime', { minutes: article.minutes })}</span>
                </div>
                {/* Makaleler Medium'da Türkçe yayınlandı: başlık/özet çevrilmez, İngilizce modda rozetle belirtilir. */}
                {lang !== 'tr' && (
                  <span className="self-start px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
                    {t('blog.inTurkish')}
                  </span>
                )}
                <p lang="tr" className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      lang={article.tagLang}
                      className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100 dark:border-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </motion.section>

        {/* Medium Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            variant="primary"
            size="lg"
            className="shadow-xl px-12 py-6 rounded-2xl"
            onClick={() => window.open('https://medium.com/@fatmaNurK', '_blank')}
          >
            <span className="text-xl mr-3">📝</span>
            <span>{t('blog.visitMedium')}</span>
            <span className="ml-3">→</span>
          </Button>
        </motion.div>
      </div>
    </motion.main>
  );
}