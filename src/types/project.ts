// Kategori tipleri
export type Category =
  | "frontend"
  | "fullstack"
  | "backend"
  | "ml";

// Siralama secenekleri
export type SortField = "year" | "title";
export type SortOrder = "asc" | "desc";

// Proje veri modeli
export interface Project {
  readonly id: number;
  title: string;
  description: string;
  tech: string[];
  year: number;
  category: Category;
  featured: boolean;
  image: string | string[];
  demoUrl?: string; // PDF: demoUrl
  sourceUrl?: string; // PDF: sourceUrl
  isTeamProject?: boolean;
  teamRole?: string;
}

// Filtre durumu
export interface FilterState {
  search: string;
  category: Category | "all";
  sortField: SortField;
  sortOrder: SortOrder;
}
