/**
 * i18n anahtar denetimi.
 * src/i18n/locales/tr.json ile en.json'ın anahtar kümesi ve {değişken} yer tutucuları aynı olmalı.
 * Projede `tsc` olmadığı için eksik çeviriyi yakalayan tek güvence budur:
 * `vite build` sırasında hata verir, geliştirme sunucusunda yalnızca uyarır.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

type Tree = { [key: string]: string | Tree };

function flatten(tree: Tree, prefix = ''): Map<string, string> {
  const result = new Map<string, string>();
  for (const [key, value] of Object.entries(tree)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result.set(fullKey, value);
    } else {
      for (const [k, v] of flatten(value, fullKey)) result.set(k, v);
    }
  }
  return result;
}

function placeholders(text: string): string {
  return [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
}

export function i18nCheck(): Plugin {
  let root = process.cwd();
  let isBuild = false;

  return {
    name: 'i18n-check',

    configResolved(config) {
      root = config.root;
      isBuild = config.command === 'build';
    },

    buildStart() {
      const dir = path.resolve(root, 'src/i18n/locales');
      const tr = flatten(JSON.parse(readFileSync(path.join(dir, 'tr.json'), 'utf-8')));
      const en = flatten(JSON.parse(readFileSync(path.join(dir, 'en.json'), 'utf-8')));
      const problems: string[] = [];

      for (const key of tr.keys()) if (!en.has(key)) problems.push(`en.json içinde eksik anahtar: ${key}`);
      for (const key of en.keys()) if (!tr.has(key)) problems.push(`tr.json içinde eksik anahtar: ${key}`);

      for (const [key, trText] of tr) {
        const enText = en.get(key);
        if (enText === undefined) continue;
        if (enText.trim() === '') problems.push(`en.json içinde boş metin: ${key}`);
        if (placeholders(trText) !== placeholders(enText)) problems.push(`{değişken} uyuşmuyor: ${key}`);
      }

      if (problems.length > 0) {
        const message = `i18n denetimi başarısız (${problems.length} sorun):\n  - ${problems.join('\n  - ')}`;
        if (isBuild) this.error(message);
        else this.warn(message);
      }
    },
  };
}
