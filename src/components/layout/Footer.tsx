/**
 * LAB-6 | Uygulama-7 — Footer (layout) — Profesyonel Versiyon
 * Site alt bilgi — Sosyal Medya + Hızlı Bağlantılar + Yukarı Çık (Back to Top).
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/useLanguage';

const SOCIAL_LINKS = [
  { name: 'GitHub',    emoji: '🐙', url: 'https://github.com/fatmanurkaragozz' },
  { name: 'LinkedIn',  emoji: '💼', url: 'https://www.linkedin.com/in/fatma-nur-karag%C3%B6z-78678a294/' },
  { name: 'Instagram', emoji: '📸', url: 'https://www.instagram.com/mind_of_dev1/' },
];

const QUICK_LINKS = [
  { href: '#hero',     labelKey: 'nav.home' },
  { href: '#about',    labelKey: 'nav.about' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contact',  labelKey: 'nav.contact' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  // ── "Yukarı Çık" Butonu Görünürlük Kontrolü ────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-slate-950 text-slate-300 py-24 px-4 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Dekoratif Arka Plan Parıltıları */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Marka & Logo */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black italic uppercase text-white mb-6 tracking-tighter">
              FATMA NUR
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {t('footer.bio')}
            </p>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[140px]">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500/30 rounded-full group-hover:bg-blue-500" />
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[140px]">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
                {t('footer.social')}
              </h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform">{s.emoji}</span>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Ekstra Bilgi / Küçük Form Notu */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6">
              {t('footer.location')}
            </h3>
            <p className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
              📍 Ankara, Türkiye
            </p>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-[11px] text-slate-500 leading-normal italic">
              {t('footer.quote')}
              <br />— Alan Kay
            </div>
          </div>
        </div>

        {/* Alt Satır & Telif Hakları */}
        <div
          className="border-t border-slate-800/80 pt-10 flex flex-col sm:flex-row
                     items-center justify-between gap-6"
        >
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600">
              {t('footer.copyright', { year })}
            </p>
          </div>
          
          <p className="text-[10px] font-black tracking-widest text-slate-700 uppercase flex items-center gap-2">
            {t('footer.madeIn')} 
            <span className="text-red-600 animate-pulse">❤️</span>
          </p>
        </div>
      </div>

      {/* ── YUKARI ÇIK BUTONU ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-50 p-4 rounded-2xl bg-white text-slate-900 
                       shadow-2xl shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all
                       flex items-center justify-center font-black"
            aria-label={t('footer.top')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
