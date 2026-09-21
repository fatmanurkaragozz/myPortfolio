import type { Project, ProjectData, Category, SortField, SortOrder } from "../types/project";
import { pick, type Lang } from "../i18n/localized";

// --- Ham proje kaydını aktif dile göre düz Project'e çevirir ---
export function localizeProject(data: ProjectData | Project, lang: Lang): Project {
  return {
    ...data,
    title: pick(data.title, lang),
    description: pick(data.description, lang),
    ...(data.teamRole !== undefined ? { teamRole: pick(data.teamRole, lang) } : {}),
  } as Project;
}

// Arama için katlama: hem sorgu hem metin aynı kuraldan geçer.
// "İ".toLowerCase() = "i" + birleşik nokta (U+0307) ve "ı" -> "i" katlanır. Böylece "istanbul"
// "İstanbul"u bulur ve İngilizce teknoloji adları ("FastAPI") Türkçe yerel ayar tuzağına düşmez.
function fold(text: string): string {
  return text.toLowerCase().replace(/\u0307/g, "").replace(/ı/g, "i");
}

// --- Kategori görünen adları (Türkçe; ziyaretçi sayfaları sözlükteki categories.* anahtarlarını kullanır) ---
export const CATEGORY_LABELS: Record<Category, string> = {
  frontend: "Frontend",
  fullstack: "Full Stack",
  backend: "Backend",
  ml: "Makine Öğrenimi",
};

// --- Arama filtresi ---
export function filterBySearch(
  projects: Project[],
  query: string
): Project[] {
  if (!query.trim()) return projects;
  
  const lowQuery = fold(query);
  return projects.filter(
    (p) =>
      fold(p.title).includes(lowQuery) ||
      fold(p.description).includes(lowQuery) || // PDF spesifikasyonu eklendi
      p.tech.some((t) => fold(t).includes(lowQuery))
  );
}

// --- Kategori filtresi ---
export function filterByCategory(
  projects: Project[],
  category: Category | "all"
): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

// --- Siralama fonksiyonu ---
export function sortProjects(
  projects: Project[],
  field: SortField,
  order: SortOrder,
  lang: Lang = "tr"
): Project[] {
  const sorted = [...projects].sort((a, b) => {
    let comparison = 0;
    
    if (field === "year") {
      comparison = a.year - b.year;
    } else {
      // PDF spesifikasyonu: dile duyarlı sıralama (varsayılan Türkçe)
      comparison = a.title.localeCompare(b.title, lang);
    }

    return comparison;
  });

  // PDF spesifikasyonu: "desc" ise ters çevir
  return order === "desc" ? sorted.reverse() : sorted;
}

// --- Hepsini birleştir (PDF: applyFilters) ---
export function applyFilters(
  projects: Project[],
  search: string,
  category: Category | "all",
  sortField: SortField,
  sortOrder: SortOrder,
  lang: Lang = "tr"
): Project[] {
  let result = filterBySearch(projects, search);
  result = filterByCategory(result, category);
  result = sortProjects(result, sortField, sortOrder, lang);
  return result;
}
