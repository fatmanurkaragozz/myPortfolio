/**
 * SEO eklentisi (build + dev).
 *
 * 1. index.html içindeki `__SITE_URL__` jetonunu gerçek adresle değiştirir,
 *    böylece canonical / Open Graph / JSON-LD adresi tek yerden yönetilir.
 * 2. `#root` içine, ekrandaki React içeriğini yansıtan anlamsal bir HTML kabuğu
 *    basar (h1, kısa biyografi, kariyer, projeler, profil linkleri). Crawler'lar
 *    JS çalışmadan / geç çalışırken de tam metni görür. React `createRoot` ile
 *    mount olunca bu kabuk yerini uygulamaya bırakır.
 *    Veri src/data/career.json ve public/data/projects.json'dan okunur.
 * 3. Build çıktısına sitemap.xml ve robots.txt ekler.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { formatPeriod, sortCareer, type CareerEntry } from '../src/utils/career';
import { sortProjects } from '../src/utils/projectHelpers';
import type { Project } from '../src/types/project';

interface SeoShellOptions {
  /** Sitenin canonical adresi. Sonunda "/" olmalı. */
  siteUrl: string;
}

const OWNER_NAME = 'Fatma Nur Karagöz';

const PROFILE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/fatmanurkaragozz' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fatma-nur-karag%C3%B6z-78678a294/' },
  { label: 'Medium', href: 'https://medium.com/@fatmaNurK' },
  { label: 'Instagram', href: 'https://www.instagram.com/mind_of_dev1/' },
];

// Ekran okuyucular ve crawler'lar okur, görsel olarak yer kaplamaz (display:none değil).
const VISUALLY_HIDDEN =
  'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

const ROOT_MARKER = '<div id="root"></div>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

export function seoShell({ siteUrl }: SeoShellOptions): Plugin {
  let root = process.cwd();

  const buildShell = (): string => {
    const career = sortCareer(readJson<CareerEntry[]>(path.resolve(root, 'src/data/career.json')));
    // Ekrandaki varsayılan sıralamayla aynı fonksiyon (yıla göre azalan).
    const projects = sortProjects(
      readJson<Project[]>(path.resolve(root, 'public/data/projects.json')),
      'year',
      'desc',
    );

    const careerHtml = career
      .map((item) => {
        const place = [item.organization, item.institution].filter(Boolean).join(' · ');
        return `<li><h3>${escapeHtml(item.role)} — ${escapeHtml(place)}</h3>` +
          `<p>${escapeHtml(formatPeriod(item.start, item.end))}</p>` +
          `<p>${escapeHtml(item.summary)}</p></li>`;
      })
      .join('');

    const projectsHtml = projects
      .map((project) => {
        const href = project.demoUrl ?? project.sourceUrl;
        const title = href
          ? `<a href="${escapeHtml(href)}">${escapeHtml(project.title)}</a>`
          : escapeHtml(project.title);
        return `<li><h3>${title}</h3><p>${escapeHtml(project.description)}</p>` +
          `<p>Teknolojiler: ${escapeHtml(project.tech.join(', '))}</p></li>`;
      })
      .join('');

    const profilesHtml = PROFILE_LINKS
      .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
      .join('');

    return `<div style="${VISUALLY_HIDDEN}">` +
      `<h1>${OWNER_NAME}</h1>` +
      `<p>${OWNER_NAME} (Fatmanur Karagöz), Fırat Üniversitesi Yazılım Mühendisliği öğrencisi. ` +
      `React, TypeScript ve Node.js ile Full Stack uygulamalar geliştiriyor; ` +
      `makine öğrenimi üzerine akademik araştırma yürütüyor.</p>` +
      `<h2>Kariyer</h2><ol>${careerHtml}</ol>` +
      `<h2>Projeler</h2><ul>${projectsHtml}</ul>` +
      `<h2>Profiller</h2><ul>${profilesHtml}</ul>` +
      `</div>`;
  };

  return {
    name: 'seo-shell',

    configResolved(config) {
      root = config.root;
    },

    // 'pre': jetonlar, Vite'ın HTML içindeki URL'leri işlemesinden önce değişmeli.
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes(ROOT_MARKER)) {
          throw new Error(`seo-shell: index.html içinde ${ROOT_MARKER} bulunamadı.`);
        }
        return html
          .replaceAll('__SITE_URL__', siteUrl)
          .replace(ROOT_MARKER, `<div id="root">${buildShell()}</div>`);
      },
    },

    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n` +
          `    <loc>${siteUrl}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `  </url>\n` +
          `</urlset>\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        // CV PDF'leri telefon/adres gibi kişisel bilgi içerebilir, taranmasın.
        source: `User-agent: *\nAllow: /\nDisallow: /cv/\n\nSitemap: ${siteUrl}sitemap.xml\n`,
      });
    },
  };
}
