import { createContext } from 'react';
import { DEFAULT_LANG, type Lang } from './localized';
import { makeT, type TFunction } from './translate';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFunction;
}

// Provider dışında (ör. testlerde) da çalışsın diye Türkçe varsayılan değer.
export const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: makeT(DEFAULT_LANG),
});
