/**
 * LAB-6 | About Section
 * Hakkımda bölümü — fotoğraf, bio ve kişisel bilgi kartları.
 */
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const INFO_CARDS = [
  { emoji: '💼', label: 'Meslek', value: 'Öğrenci' },
  { emoji: '📍', label: 'Konum', value: 'Türkiye, Ankara' },
  { emoji: '⏳', label: 'Deneyim', value: '4. Sınıf Öğrencisi' },
  { emoji: '🎓', label: 'Eğitim', value: 'Fırat Üniversitesi, Yazılım Mühendisliği' },
];

const INTERESTS = [
  { emoji: '📚', label: 'Kitap Okumak' },
  { emoji: '🏔️', label: 'Doğa Yürüyüşü' },
  { emoji: '☕', label: 'Kahve Deneyleri' },
  { emoji: '🎬', label: 'Dizi & Film İzlemek' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-3">
            Hakkımda
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter">
            Kim Olduğumu Tanı
          </h2>
          <div className="w-16 h-1.5 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* İçerik Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol — Fotoğraf + Bilgi Kartları */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Fotoğraf */}
            <div className="relative">
              <div className="w-56 h-72 md:w-72 md:h-96 rounded-3xl overflow-hidden border-4
                              border-white dark:border-slate-800 shadow-2xl relative z-10">
                <ImageWithFallback
                  src="./ppp.jpeg"
                  alt="Fatma Nur Karagöz profil fotoğrafı"
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              {/* Dekoratif çerçeve */}
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-400 to-purple-500
                              rounded-3xl opacity-20 dark:opacity-30 blur-lg -z-10" />
              {/* Rozet */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white
                              rounded-2xl px-4 py-2 font-black text-sm shadow-lg shadow-blue-500/30 z-20">
                ✨ Yeni Fırsatlara Açık
              </div>
            </div>

            {/* Bilgi Kartları */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="flex items-center gap-3 p-4 rounded-xl
                             bg-white/60 dark:bg-slate-900/60 backdrop-blur-md
                             border border-white/30 dark:border-slate-700/30
                             hover:bg-white/80 dark:hover:bg-slate-800/80
                             transition-colors shadow-sm"
                >
                  <span className="text-2xl">{card.emoji}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider
                                  text-slate-400 dark:text-slate-500">
                      {card.label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sağ — Bio */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md
                          rounded-2xl p-8 border border-white/30 dark:border-slate-700/30 shadow-xl"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-500 rounded-full inline-block" />
                Benim Hikayem
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Yazılım Mühendisliği öğrencisi olarak modern teknolojileri kullanarak yüksek performanslı, 
                ölçeklenebilir altyapılar ve kullanıcı dostu uygulamalar geliştiriyorum. Geliştirme süreçlerimi 
                sadece pratik kod üretimiyle sınırlamıyor; algoritma analizi ve optimizasyon prensipleriyle temellendiriyorum. 
                Kod kalitesine, temiz kod (clean code) mimarilerine ve sürdürülebilirliğe en üst düzeyde önem veriyorum.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                React, TypeScript ve Node.js ekosistemlerindeki pratik geliştirme deneyimimi, bilgisayar biliminin teorik 
                gücüyle besliyorum. Makine öğrenmesi ve büyük dil modelleri (LLM) üzerine yürüttüğüm bilimsel/akademik 
                araştırmalarla Ar-Ge vizyonumu güçlendiriyorum.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Teknik derinliği, modern UI/UX tasarım prensipleriyle birleştirerek estetik, erişilebilir ve yüksek 
                mühendislik standartlarına sahip çözümler üretmek en büyük tutkum. Her çalışmamda performans, kullanıcı deneyimi 
                ve estetik dengesini titizlikle gözetiyorum.
              </p>
            </div>

            {/* İlgi Alanları */}
            <div
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md
                          rounded-2xl p-8 border border-white/30 dark:border-slate-700/30 shadow-xl"
            >
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-purple-500 rounded-full inline-block" />
                İlgi Alanlarım
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm font-semibold
                               text-slate-600 dark:text-slate-300"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
