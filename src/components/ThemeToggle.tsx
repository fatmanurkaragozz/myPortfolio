import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  /** 'fixed': sol üstte sabit (default) | 'inline': normal akış, header içi kullanım */
  variant?: 'fixed' | 'inline';
}

export default function ThemeToggle({ isDarkMode, toggleDarkMode, variant = 'fixed' }: ThemeToggleProps) {
  const { t } = useLanguage();
  const positionClass = variant === 'inline'
    ? 'relative z-auto'      // header içinde normal akış
    : 'fixed top-6 left-6 z-[100]'; // eski davranış — intro sayfasında

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        ${positionClass}
        w-11 h-11 rounded-full transition-all duration-500
        flex items-center justify-center shadow-lg border backdrop-blur-xl
        ${isDarkMode 
          ? 'bg-slate-900/40 border-slate-700/50 text-indigo-300' 
          : 'bg-white/40 border-amber-200/50 text-amber-500'
        }
        hover:scale-110 active:scale-90 group overflow-hidden
      `}
      aria-label={isDarkMode ? t('theme.toLight') : t('theme.toDark')}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="relative z-10"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.158 18.894a.75.75 0 101.06-1.06l-1.591-1.59a.75.75 0 00-1.061 1.06l1.591 1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.591-1.59z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modern Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-md opacity-30 transition-colors duration-1000 ${isDarkMode ? 'bg-indigo-500' : 'bg-amber-400'}`}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </button>
  );
}
