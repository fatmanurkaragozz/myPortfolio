// Dil türleri ve iki dilli veri alanları için saf yardımcılar.
// React/DOM içermez: Node tarafındaki Vite eklentisi de bu dosyayı kullanabilir.

export type Lang = 'tr' | 'en';

export const LANGS: readonly Lang[] = ['tr', 'en'];
export const DEFAULT_LANG: Lang = 'tr';

/** Düz değer ya da `{ tr, en }` biçiminde iki dilli değer. `en` yoksa Türkçe kullanılır. */
export type Localized<T = string> = T | { tr: T; en?: T };

export function isLang(value: unknown): value is Lang {
  return value === 'tr' || value === 'en';
}

function isLocalizedObject<T>(value: Localized<T>): value is { tr: T; en?: T } {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && 'tr' in value;
}

/** İki dilli alandan aktif dilin değerini seçer. */
export function pick<T>(value: Localized<T>, lang: Lang): T {
  if (isLocalizedObject(value)) return (value[lang] ?? value.tr) as T;
  return value as T;
}
