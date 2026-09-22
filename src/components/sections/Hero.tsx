/**
 * LAB-6 | Uygulama-4 — Hero Section — Profesyonel Versiyon
 * Karakter bazlı yazma efekti + Dinamik arka plan + Akıllı responsive isim wrap.
 */
import { motion } from 'framer-motion';
import Button from '../Button';
import CvMenu from '../CvMenu';
import { useLanguage } from '../../i18n/useLanguage';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* ── Dinamik Arka Plan Blob'ları ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Karşılama etiketi */}
        <motion.p
          className="text-blue-600 dark:text-blue-400 font-bold text-sm md:text-base
                     uppercase tracking-[0.4em] mb-6"
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1 }}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* ── Akıllı Responsive İsim (Wrap Özelliği) ─────────────────────────── */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black
                     text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]
                     flex flex-wrap justify-center gap-x-[0.3em] font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-blue-600 dark:text-blue-400">Fatma Nur</span>
          {' '}
          <span className="inline-block">Karagöz</span>
        </motion.h1>

        {/* ── Subtitle (Unvan & Öğrenci Durumu) ────────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          {/* Unvan: Full Stack Developer | Machine Learning · Data Science */}
          <motion.div
            className="text-2xl md:text-3xl font-semibold tracking-wide text-center
                       text-slate-800 dark:text-slate-200 select-none font-display"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="block md:inline whitespace-nowrap">Full Stack Developer</span>
            <span className="hidden md:inline mx-3 text-slate-400 dark:text-slate-500" aria-hidden="true">|</span>
            <span className="block md:inline whitespace-nowrap text-xl md:text-3xl text-blue-600 dark:text-blue-400">
              Machine Learning · Data Science
            </span>
          </motion.div>

          {/* Elegant Sub-text - Yazılım Mühendisliği Öğrencisi */}
          <motion.div
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium tracking-wide font-sans flex items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 dark:bg-blue-400/50 animate-pulse" />
            <span>{t('hero.student')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 dark:bg-purple-400/50 animate-pulse" />
          </motion.div>
        </div>

        {/* CTA Butonları */}
        <motion.div
          className="flex flex-wrap gap-5 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <a href="#projects">
            <Button
              variant="primary"
              className="px-10 py-5 text-sm md:text-base font-black uppercase tracking-widest
                         shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40
                         transition-all duration-300 group overflow-hidden relative"
            >
              <span className="relative z-10">{t('hero.viewProjects')}</span>
              <motion.div
                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              />
            </Button>
          </a>

          <a href="#contact">
            <Button
              variant="ghost"
              className="px-10 py-5 text-sm md:text-base font-black uppercase tracking-widest
                         border-2 border-slate-200 dark:border-slate-800 
                         hover:border-blue-500 dark:hover:border-blue-400
                         backdrop-blur-sm transition-all duration-300
                         dark:text-white"
            >
              {t('hero.contact')}
            </Button>
          </a>

          <CvMenu />
        </motion.div>

        {/* Keşfet Oku */}
        <motion.div
          className="mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <motion.a
            href="#about"
            className="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-3
                       hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] group-hover:tracking-[0.7em] transition-all">{t('hero.discover')}</span>
            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
