// Kariyer kaydı veri modeli ve yardımcıları.
// Hem Experience bileşeni hem de build sırasındaki SEO eklentisi kullanır,
// bu yüzden yalnızca saf fonksiyonlar içerir (React / DOM bağımlılığı yok).

export interface CareerLink {
  label: string;
  href: string;
}

export interface CareerEntry {
  id: string;
  role: string;
  organization: string;
  institution?: string;
  start: string; // "YYYY-MM"
  end: string | null; // null = devam ediyor
  summary: string;
  highlights: string[];
  tags: string[];
  links: CareerLink[];
}

const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function parseMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month: month - 1 };
}

// "2026-07", null -> "Temmuz 2026 – Devam ediyor"
// "2026-07", "2026-09" -> "Temmuz – Eylül 2026"
export function formatPeriod(start: string, end: string | null): string {
  const s = parseMonth(start);
  if (!end) return `${MONTHS_TR[s.month]} ${s.year} – Devam ediyor`;

  const e = parseMonth(end);
  if (s.year === e.year && s.month === e.month) return `${MONTHS_TR[s.month]} ${s.year}`;
  if (s.year === e.year) return `${MONTHS_TR[s.month]} – ${MONTHS_TR[e.month]} ${e.year}`;
  return `${MONTHS_TR[s.month]} ${s.year} – ${MONTHS_TR[e.month]} ${e.year}`;
}

// Devam edenler önce, sonra başlangıç tarihine göre yeniden eskiye.
export function sortCareer(entries: CareerEntry[]): CareerEntry[] {
  return [...entries].sort((a, b) => {
    if ((a.end === null) !== (b.end === null)) return a.end === null ? -1 : 1;
    return b.start.localeCompare(a.start);
  });
}
