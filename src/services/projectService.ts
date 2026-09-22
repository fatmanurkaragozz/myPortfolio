import type { Project, ProjectData } from "../types/project";
import { localizeProject } from "../utils/projectHelpers";

const API_URL = "./data/projects.json";

// Ham kayıtlar: düzyazı alanları { tr, en } olabilir. Ziyaretçi sayfaları bunu kullanır
// ve aktif dile göre localizeProject ile düz Project'e çevirir.
export async function fetchProjectData(): Promise<ProjectData[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      // Ziyaretçiye gösterilen metin arayüzde çevrilir; bu yalnızca geliştirici mesajıdır.
      throw new Error(`Projects could not be loaded: ${response.status}`);
    }

    const data: ProjectData[] = await response.json();
    return data;

  } catch (error) {
    console.error("Veri cekme hatasi:", error);
    throw error; // Hatayi yukari ilet
  }
}

// Türkçe düz kayıtlar (ziyaretçiye görünmeyen eski sayfalar için, davranış aynı kalır).
export async function fetchProjects(): Promise<Project[]> {
  const data = await fetchProjectData();
  return data.map((project) => localizeProject(project, "tr"));
}
