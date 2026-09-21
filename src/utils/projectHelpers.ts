import type { Project, Category, SortField, SortOrder } from "../types/project";

// --- Kategori görünen adları ---
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
  
  const lowQuery = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(lowQuery) ||
      p.description.toLowerCase().includes(lowQuery) || // PDF spesifikasyonu eklendi
      p.tech.some((t) => t.toLowerCase().includes(lowQuery))
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
  order: SortOrder
): Project[] {
  const sorted = [...projects].sort((a, b) => {
    let comparison = 0;
    
    if (field === "year") {
      comparison = a.year - b.year;
    } else {
      // PDF spesifikasyonu: Türkçe karakter duyarlı sıralama
      comparison = a.title.localeCompare(b.title, "tr");
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
  sortOrder: SortOrder
): Project[] {
  let result = filterBySearch(projects, search);
  result = filterByCategory(result, category);
  result = sortProjects(result, sortField, sortOrder);
  return result;
}
