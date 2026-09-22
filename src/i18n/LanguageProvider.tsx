/**
 * LanguageProvider
 * Aktif dili (tr | en) tutar. Başlangıç sırası: ?lang= parametresi -> localStorage -> Türkçe.
 * Tarayıcı dili KASITLI olarak okunmaz: Google'ın botu İngilizce bildirir ve aynı adreste
 * İngilizce sayfayı kaydedip Türkçe sıralamaya zarar verebilir.
 */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext } from './LanguageContext';
import { DEFAULT_LANG, isLang, type Lang } from './localized';
import { makeT } from './translate';

const STORAGE_KEY = 'portfolio-lang';

function readQueryLang(): Lang | null {
  try {
    const value = new URLSearchParams(window.location.search).get('lang');
    return isLang(value) ? value : null;
  } catch {
    return null;
  }
}

function readStoredLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : null;
  } catch {
    return null;
  }
}

function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Gizli pencere / engelli depolama: seçim yalnızca bu oturumda geçerli olur.
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readQueryLang() ?? readStoredLang() ?? DEFAULT_LANG);

  // Adres çubuğundaki ?lang= ile gelindiyse seçimi hatırla.
  useEffect(() => {
    const fromQuery = readQueryLang();
    if (fromQuery) storeLang(fromQuery);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    storeLang(next);
  }, []);

  const t = useMemo(() => makeT(lang), [lang]);

  // <html lang> CSS `uppercase` için şart: lang="tr" iken İngilizce "i" harfi "İ"ye dönüşür.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
