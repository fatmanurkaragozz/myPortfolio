/**
 * LanguageToggle
 * "TR | EN" seçici. Bayrak kullanılmaz (dil ülke değildir).
 * variant='inline': Header içinde normal akış | variant='fixed': sağ üstte sabit (Blog, Proje Detay).
 */
import { useLanguage } from '../i18n/useLanguage';
import { LANGS, type Lang } from '../i18n/localized';

interface LanguageToggleProps {
  variant?: 'inline' | 'fixed';
}

// Dil adları kendi dilinde yazılır (autonym), çevrilmez.
const OPTIONS: Record<Lang, { short: string; name: string }> = {
  tr: { short: 'TR', name: 'Türkçe' },
  en: { short: 'EN', name: 'English' },
};

export default function LanguageToggle({ variant = 'inline' }: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage();
  const position = variant === 'fixed' ? 'fixed top-6 right-6 z-[100]' : 'relative';

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`${position} inline-flex items-center gap-0.5 p-1 rounded-full border shadow-lg backdrop-blur-xl
                  bg-white/40 border-white/50 dark:bg-slate-900/40 dark:border-slate-700/50`}
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={OPTIONS[code].name}
            onClick={() => setLang(code)}
            className={`h-8 px-3 rounded-full text-xs font-black tracking-wider transition-colors cursor-pointer
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                        ${active
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
          >
            {OPTIONS[code].short}
          </button>
        );
      })}
    </div>
  );
}
