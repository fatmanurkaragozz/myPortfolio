// Kariyer kaydı veri modeli ve yardımcıları.
// Hem Experience bileşeni hem de build sırasındaki SEO eklentisi kullanır,
// bu yüzden yalnızca saf fonksiyonlar içerir (React / DOM bağımlılığı yok).
import { pick, type Lang, type Localized } from "../i18n/localized";

export interface CareerLink {
  label: Localized;
  href: string;
}

// career.json'daki ham kayıt: düzyazı alanları { tr, en } olabilir.
export interface CareerEntry {
  id: string;
  role: Localized;
  organization: Localized;
  institution?: Localized;
  start: string; // "YYYY-MM"
  end: string | null; // null = devam ediyor
  summary: Localized;
  highlights: Localized<string[]>;
  tags: Localized<string[]>;
  links: CareerLink[];
}

// Aktif dile göre düzleştirilmiş kayıt (bileşenler bunu görür).
export interface CareerView {
  id: string;
  role: string;
  organization: string;
  institution?: string;
  start: string;
  end: string | null;
  summary: string;
  highlights: string[];
  tags: string[];
  links: { label: string; href: string }[];
}

export function localizeCareer(entry: CareerEntry, lang: Lang): CareerView {
  return {
    id: entry.id,
    role: pick(entry.role, lang),
    organization: pick(entry.organization, lang),
    institution: entry.institution === undefined ? undefined : pick(entry.institution, lang),
    start: entry.start,
    end: entry.end,
    summary: pick(entry.summary, lang),
    highlights: pick(entry.highlights, lang),
    tags: pick(entry.tags, lang),
    links: entry.links.map((link) => ({ label: pick(link.label, lang), href: link.href })),
  };
}

const MONTHS: Record<Lang, string[]> = {
  tr: [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

const PRESENT: Record<Lang, string> = { tr: "Devam ediyor", en: "Present" };

function parseMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month: month - 1 };
}

// tr: "2026-07", null -> "Temmuz 2026 – Devam ediyor" | "2026-07", "2026-09" -> "Temmuz – Eylül 2026"
// en: "July 2026 – Present" | "July – September 2026"
export function formatPeriod(start: string, end: string | null, lang: Lang = "tr"): string {
  const months = MONTHS[lang];
  const s = parseMonth(start);
  if (!end) return `${months[s.month]} ${s.year} – ${PRESENT[lang]}`;

  const e = parseMonth(end);
  if (s.year === e.year && s.month === e.month) return `${months[s.month]} ${s.year}`;
  if (s.year === e.year) return `${months[s.month]} – ${months[e.month]} ${e.year}`;
  return `${months[s.month]} ${s.year} – ${months[e.month]} ${e.year}`;
}

// Devam edenler önce, sonra başlangıç tarihine göre yeniden eskiye.
export function sortCareer(entries: CareerEntry[]): CareerEntry[] {
  return [...entries].sort((a, b) => {
    if ((a.end === null) !== (b.end === null)) return a.end === null ? -1 : 1;
    return b.start.localeCompare(a.start);
  });
}
