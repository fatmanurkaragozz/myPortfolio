import { motion } from 'framer-motion';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Button from './Button';

interface LetterProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
}

export function Letter({ isOpen, onAnimationComplete, onNavigate, isDarkMode }: LetterProps) {
  const [showContent, setShowContent] = useState(false);

  const handleNavigation = (page: string) => {
    onNavigate?.(page);
  };

  return (
    <motion.div
      className="absolute"
      initial={{ scale: 0.3, rotate: 15 }}
      animate={isOpen ? {
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0
      } : {
        scale: 0.3,
        rotate: 15
      }}
      transition={{
        duration: 1,
        ease: "easeOut"
      }}
      onAnimationComplete={() => {
        if (isOpen) {
          setTimeout(() => setShowContent(true), 800);
          onAnimationComplete?.();
        }
      }}
    >
      {!isOpen ? (
        // Kapalı mektup - çok daha büyük ve enlemesine
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="120" rx="8" fill="#F7FAFC" stroke="#CBD5E0" strokeWidth="4" />
          <polygon points="8,8 100,70 192,8" fill="none" stroke="#CBD5E0" strokeWidth="4" />

          {/* Mektup mührü */}
          <circle cx="100" cy="85" r="15" fill="#DC2626" />
          <circle cx="100" cy="85" r="12" fill="#EF4444" />
          <text x="100" y="93" textAnchor="middle" className="text-base fill-white">★</text>

          {/* Dekoratif kenarlık */}
          <rect x="4" y="4" width="192" height="112" rx="4" fill="none" stroke="#E2E8F0" strokeWidth="2" />
        </svg>
      ) : (
        // Açık mektup
        <div className="relative">
          {/* Ana mektup zarfı - çok büyük */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Mektup gövdesi */}
              <rect width="250" height="150" rx="12" fill="#F7FAFC" stroke="#CBD5E0" strokeWidth="4" />
              <rect x="8" y="8" width="234" height="134" rx="8" fill="#FEFEFE" stroke="#E2E8F0" strokeWidth="2" />

              {/* Açık zarf kapağı */}
              <motion.polygon
                points="8,8 125,90 242,8 242,60 8,60"
                fill="#E2E8F0"
                stroke="#CBD5E0"
                strokeWidth="3"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -60 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "125px 8px" }}
              />

              {/* Mektup iç kısmı */}
              <rect x="15" y="65" width="220" height="75" rx="6" fill="#FDFDFD" stroke="#F1F5F9" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Çıkan kağıt */}
          {isOpen && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 z-20 w-[90vw] max-w-5xl"
              initial={{
                y: 60,
                opacity: 0,
                scale: 0.6,
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
              }}
              animate={{
                y: -350, // Başlık ve arka planın daha iyi görünmesi için mesafe azaltıldı
                opacity: 1,
                scale: 1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              }}
              transition={{
                delay: 1,
                duration: 2.5,
                ease: "easeOut",
                clipPath: { delay: 1, duration: 2 }
              }}
            >
              <motion.div
                className="bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 relative letter-wrapper w-full mx-auto overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-gray-200"
                initial={{ rotateX: -20 }}
                animate={{ rotateX: 0 }}
                transition={{ delay: 1.8, duration: 1.2 }}
              >
                {/* Kağıt dokusu */}
                <div className={`absolute inset-0 opacity-20 ${isDarkMode ? 'hidden' : 'block'}`}>
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                  <div className="absolute top-8 left-8 w-full h-1 bg-gradient-to-r from-blue-100 to-transparent"></div>
                  <div className="absolute top-16 left-8 w-full h-1 bg-gradient-to-r from-blue-100 to-transparent"></div>
                  <div className="absolute top-24 left-8 w-full h-1 bg-gradient-to-r from-blue-100 to-transparent"></div>
                </div>

                {/* Profil fotoğrafı alanı - Sağ Üst Köşe (Tek Görsel) */}
                <motion.div
                  className="absolute top-8 right-8 z-30"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={showContent ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
                >
                  <figure className="relative m-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10">
                      <ImageWithFallback
                        src="./ppp.jpeg"
                        alt="Fatma Nur Karagöz'ün vesikalığı"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Fotoğraf çerçevesi efekti */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 dark:opacity-40 blur-md"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-400 rounded-2xl opacity-30 dark:opacity-50 blur-sm"></div>
                  </figure>
                </motion.div>

                <div className="relative z-10 letter-content-inner px-6 pb-16 pt-8 md:px-10 md:pb-20">
                  <motion.header
                    className="mb-8 pr-12 md:pr-40"
                    initial={{ y: 30, opacity: 0 }}
                    animate={showContent ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-3 text-gray-800 dark:text-white leading-tight">
                      Merhaba!<br />
                      <span className="text-blue-600 dark:text-blue-400">
                        <span className="inline-block">Ben Fatma Nur</span>{' '}
                        <span className="inline-block">Karagöz 👋</span>
                      </span>
                    </h1>
                    <div className="w-16 h-1.5 bg-blue-500 rounded-full"></div>
                  </motion.header>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={showContent ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 2.3, duration: 0.8 }}
                  >
                    {/* Bilgi Kartları */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100/50 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg shadow-sm">💼</div>
                        <div>
                          <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Mesleğim</p>
                          <p className="text-gray-900 dark:text-white font-medium">Öğrenci</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-green-50/50 dark:bg-slate-900/50 border border-green-100/50 dark:border-slate-800 hover:bg-green-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg shadow-sm">📍</div>
                        <div>
                          <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Konum</p>
                          <p className="text-gray-900 dark:text-white font-medium">Türkiye, Ankara</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-purple-50/50 dark:bg-slate-900/50 border border-purple-100/50 dark:border-slate-800 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg shadow-sm">⏳</div>
                        <div>
                          <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Deneyim</p>
                          <p className="text-gray-900 dark:text-white font-medium">4. Sınıf Öğrencisi</p>
                        </div>
                      </div>
                    </div>

                    {/* Uzmanlık Alanları */}
                    <section className="bg-gray-50/50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                      <h2 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                        Uzmanlık Alanlarım
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        {["React & Next.js", "TypeScript", "Node.js", "UI/UX Design", "PostgreSQL", "Tailwind CSS"].map((skill) => (
                          <div key={skill} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Hakkımda Kısa Özeti */}
                    <section className="bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl border border-blue-50 dark:border-slate-800 hover:from-blue-50/50 hover:to-purple-50/50 transition-all">
                      <h2 className="text-gray-900 dark:text-white font-bold mb-4">Hakkımda</h2>
                      <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                        Yazılım Mühendisliği öğrencisiyim. Bilgisayar biliminin teorik gücünü, yapay zeka/makine öğrenmesi araştırmaları ve modern web ekosistemiyle harmanlıyorum.
                      </p>
                      <ul className="mt-3 space-y-1">
                        <li className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">📚 Kitap Okumak</li>
                        <li className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">🏔️ Doğa Yürüyüşü</li>
                        <li className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">☕ Kahve Deneyleri</li>
                      </ul>
                    </section>
                  </motion.div>

                  <motion.div
                    className="my-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={showContent ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 2.6, duration: 0.8 }}
                  >
                    <div className="letter-header-line mb-6"></div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">Şimdi Göz At</p>
                  </motion.div>

                  {/* Navigasyon Butonları */}
                  <motion.nav
                    aria-label="Ana navigasyon"
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={showContent ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 3, duration: 0.8 }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handleNavigation('projects')}
                      className="group relative overflow-hidden !py-6 flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🚀</span>
                      <span className="font-bold tracking-tight">Projelerim</span>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => handleNavigation('blog')}
                      className="group relative overflow-hidden !py-6 flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">📝</span>
                      <span className="font-bold tracking-tight">Medium</span>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('contact')}
                      className="group relative overflow-hidden !py-6 flex flex-col items-center justify-center gap-2 border border-blue-100 hover:border-blue-200"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">💬</span>
                      <span className="font-bold tracking-tight">İletişim</span>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('uikit')}
                      className="group relative overflow-hidden !py-6 flex flex-col items-center justify-center gap-2 border border-purple-100 hover:border-purple-200"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🎨</span>
                      <span className="font-bold tracking-tight">UI Kit</span>
                    </Button>
                  </motion.nav>
                </div>

                {/* Kağıt kenar efektleri */}
                <div className="absolute -top-2 left-4 right-4 h-3 bg-white rounded-t-2xl opacity-90 blur-sm"></div>
                <div className="absolute -bottom-3 -left-3 -right-3 h-6 bg-gradient-to-t from-gray-400 to-transparent rounded-2xl blur-lg opacity-40"></div>
              </motion.div>
            </motion.div>
          )}

          {/* Mektuptan çıkış efekti */}
          {isOpen && (
            <motion.div
              className="absolute left-1/2 top-20 transform -translate-x-1/2 z-5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
              transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
            >
              <div className="flex space-x-2">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      y: [0, -30, -60],
                      opacity: [1, 0.5, 0],
                      scale: [1, 1.5, 0]
                    }}
                    transition={{
                      delay: i * 0.1,
                      duration: 2,
                      repeat: 3
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}