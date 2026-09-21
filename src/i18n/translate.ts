// Sözlük araması ve {değişken} yerleştirme. React içermez.
import tr from './locales/tr.json';
import en from './locales/en.json';
import type { Lang } from './localized';

interface Dictionary {
  [key: string]: string | Dictionary;
}

export type Vars = Record<string, string | number>;
export type TFunction = (key: string, vars?: Vars) => string;

const DICTIONARIES: Record<Lang, Dictionary> = { tr, en };

function lookup(dictionary: Dictionary, key: string): string | undefined {
  let node: string | Dictionary | undefined = dictionary;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = node[part];
  }
  return typeof node === 'string' ? node : undefined;
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

/** Aktif dil için çeviri işlevi üretir. Anahtar aktif dilde yoksa Türkçeye, o da yoksa anahtarın kendisine düşer. */
export function makeT(lang: Lang): TFunction {
  return (key, vars) => {
    const text = lookup(DICTIONARIES[lang], key) ?? lookup(DICTIONARIES.tr, key);
    if (text === undefined) return key;
    return interpolate(text, vars);
  };
}
