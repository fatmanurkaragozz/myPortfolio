/**
 * LAB-6 | Uygulama-3 — Header (layout) — Profesyonel Versiyon
 * Sticky navigasyon — Scroll Spy + Dinamik Glassmorphism + Framer Motion.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';
import { useLanguage } from '../../i18n/useLanguage';

interface HeaderProps {
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NAV_LINKS = [
  { href: '#hero', labelKey: 'nav.home', sectionId: 'hero' },
  { href: '#about', labelKey: 'nav.about', sectionId: 'about' },
  { href: '#experience', labelKey: 'nav.experience', sectionId: 'experience' },
  { href: '#skills', labelKey: 'nav.skills', sectionId: 'skills' },
  { href: '#projects', labelKey: 'nav.projects', sectionId: 'projects' },
  { href: '#contact', labelKey: 'nav.contact', sectionId: 'contact' },
];

export default function Header({ onNavigate, isDarkMode, toggleDarkMode }: HeaderProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // ── Scroll Listener (Glassmorphism Geçişi) ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll Spy (Aktif Bölüm Tespiti) ──────────────────────────────────────
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Orta-üst kısma odaklan
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Tüm section'ları izle
    NAV_LINKS.forEach(link => {
      const element = document.getElementById(link.sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b
                 ${isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-900/5'
          : 'bg-transparent border-transparent'}`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4"
        aria-label={t('header.navAria')}
      >
        {/* Sol — ThemeToggle + Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            variant="inline"
          />

          <a
            href="#hero"
            className="font-black italic uppercase tracking-tight
                       text-blue-600 dark:text-blue-400
                       hover:opacity-80 transition-opacity leading-none"
            aria-label={t('header.homeAria')}
          >
            <span className="text-base md:text-lg">
              <span className="inline-block">Fatma Nur</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-1 items-center">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href} className="relative group">
                <a
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative
                             ${isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'}`}
                >
                  {t(link.labelKey)}
                  {/* Aktif Link Alt Çizgisi (Framer Motion) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Sağ Aksiyonlar */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => onNavigate('blog')}
            className="hidden lg:block px-4 py-2 rounded-xl text-sm font-black uppercase
                       tracking-widest bg-slate-100 dark:bg-slate-800
                       text-slate-600 dark:text-slate-300
                       hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                       transition-all duration-200"
          >
            {t('nav.blog')}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t('header.menuToggle')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 mb-1
                          transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 mb-1
                          transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-600 dark:bg-slate-300
                          transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobil Menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800
                       bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl absolute w-full left-0 shadow-2xl"
          >
            <ul className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-bold transition-colors
                               ${activeSection === link.sectionId
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { onNavigate('blog'); setMenuOpen(false); }}
                  className="w-full text-left py-3 px-4 rounded-xl text-sm font-bold
                             text-slate-600 dark:text-slate-300
                             hover:text-blue-600 dark:hover:text-blue-400
                             hover:bg-blue-50 dark:hover:bg-blue-900/20
                             transition-all duration-200"
                >
                  {t('nav.blog')}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
