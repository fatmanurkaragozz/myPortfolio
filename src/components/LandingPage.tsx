/**
 * LAB-6 | Uygulama-7 — LandingPage (Orkestratör)
 * Header + Hero + About + Experience + Skills + ProjectList + ContactSection + Footer
 * hepsini tek scroll'luk landing page olarak bir araya getirir.
 */
import { motion } from 'framer-motion';
import Header        from './layout/Header';
import Footer        from './layout/Footer';
import Hero          from './sections/Hero';
import About         from './sections/About';
import Experience    from './sections/Experience';
import Skills        from './sections/Skills';
import ProjectList   from './sections/ProjectList';
import ContactSection from './sections/ContactSection';
import PageBackground from './PageBackground';

interface LandingPageProps {
  onNavigate:    (page: string) => void;
  onProjectSelect: (project: any) => void;
  isDarkMode:    boolean;
  toggleDarkMode: () => void;
}

export function LandingPage({ onNavigate, onProjectSelect, isDarkMode, toggleDarkMode }: LandingPageProps) {
  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sayfa genelinde hafif arka plan dokusu */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PageBackground isDarkMode={isDarkMode} />
      </div>

      {/* İçerik — z-10 ile arka planın üstünde */}
      <div className="relative z-10">
        {/* ── Layout ── */}
        <Header
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* ── Sections ── */}
        <main id="main-content">
          <Hero onNavigate={onNavigate} />
          <About />
          <Experience />
          <Skills />
          <ProjectList onProjectSelect={onProjectSelect} />
          <ContactSection />
        </main>

        {/* ── Footer ── */}
        <Footer />
      </div>
    </motion.div>
  );
}
