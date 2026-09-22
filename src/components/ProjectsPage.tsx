import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';
import Alert from './Alert'; // PDF: Uygulama-5
import Input from './Input'; // PDF: Uygulama-5

// Yeni modüllerin içe aktarılması
import { Project, FilterState, Category } from '../types/project';
import { fetchProjects } from '../services/projectService';
import { applyFilters, CATEGORY_LABELS } from '../utils/projectHelpers';

interface ProjectsPageProps {
  onBack: () => void;
  onProjectSelect: (project: Project) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function ProjectsPage({ onBack, onProjectSelect, isDarkMode, toggleDarkMode }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtreleme ve Sıralama State'i (FilterState yapısına uygun)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    sortField: 'year',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadData, 1000);
    return () => clearTimeout(timer);
  }, []);

  // PDF spesifikasyonuna uygun statik kategori listesi (Uygulama-5: Satır 2097)
  const categories: (Category | "all")[] = ["all", "frontend", "fullstack", "backend", "ml"];

  // Filtreleme ve Sıralama Mantığı (Helpers kullanarak)
  const processedProjects = useMemo(() => {
    return applyFilters(
      projects, 
      filters.search, 
      filters.category, 
      filters.sortField, 
      filters.sortOrder
    );
  }, [projects, filters]);

  // State Güncelleyiciler
  const updateSearch = (val: string) => setFilters(prev => ({ ...prev, search: val }));
  const updateCategory = (cat: Category | "all") => setFilters(prev => ({ ...prev, category: cat }));
  const setSortField = (field: "year" | "title") => setFilters(prev => ({ ...prev, sortField: field }));
  const toggleSortOrder = () => setFilters(prev => ({ 
    ...prev, 
    sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
  }));

  return (
    <motion.main
      className="relative min-h-screen p-4 md:p-8 overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <PageBackground isDarkMode={isDarkMode} />
      
      {/* Üst Navigasyon - Geri Dön Butonu */}
      <div className="fixed top-6 left-24 z-[110]">
        <Button
          variant="ghost"
          onClick={onBack}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md dark:text-white border border-white/20 px-6 h-14"
        >
          ← Geri Dön
        </Button>
      </div>

      {/* Global Tema Butonu */}
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="relative max-w-7xl mx-auto z-10 pt-44">
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-black italic uppercase mb-4 text-slate-900 dark:text-white tracking-widest">
            Projelerim
          </h1>
          
          {/* HATA DURUMU (PDF: Uygulama-5 / Satır 2128) */}
          {error && (
            <Alert variant="error" title="Hata" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Arama, Filtreleme ve Sıralama Bölümü (PDF: Uygulama-5 / Satır 2152) */}
          {!isLoading && (
            <motion.div 
              className="flex flex-col gap-6 bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl shadow-blue-500/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                {/* Arama Barı (PDF: Input bileşeni) */}
                <div className="w-full md:w-96">
                  <Input 
                    id="search"
                    placeholder="Proje ara..."
                    value={filters.search}
                    onChange={(e) => updateSearch(e.target.value)}
                    label="Hızlı Arama"
                  />
                </div>

                {/* Sıralama Kontrolleri (PDF: select ve Button) */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-tighter">Sırala</label>
                    <select 
                      value={filters.sortField}
                      onChange={(e) => setSortField(e.target.value as "year" | "title")}
                      className="border rounded-xl px-4 py-2 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300/30 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-bold"
                    >
                      <option value="year">📅 Yıla Göre</option>
                      <option value="title">🔤 Başlığa Göre</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1 justify-end">
                    <span className="text-xs font-black uppercase text-transparent tracking-tighter cursor-default">.</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSortOrder}
                      className="h-[42px] bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-300/30 hover:border-blue-500/50 transition-all font-black text-xs min-w-[60px]"
                    >
                      {filters.sortOrder === 'asc' ? 'A-Z ↑' : 'Z-A ↓'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Kategori Filtreleri (PDF: Button döngüsü) */}
              <div className="flex flex-wrap gap-2 border-t border-slate-200/50 dark:border-slate-800/50 pt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateCategory(cat)}
                    className={`px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                      filters.category === cat
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                        : "bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat === 'all' ? 'Tümü' : CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* Dynamic Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <motion.div
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-slate-600 dark:text-slate-400 font-bold text-xl animate-pulse uppercase tracking-[0.2em]">
              Yükleniyor...
            </p>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {processedProjects.length > 0 ? (
                <motion.section
                  key="grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  layout
                >
                  {processedProjects.map((project: Project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      {project.demoUrl && (
                        <span className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 flex items-center gap-1.5 backdrop-blur-md">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                          Canlı
                        </span>
                      )}
                      <Card
                        title={project.title}
                        image={project.image}
                        imageAlt={project.title}
                        variant="elevated"
                        className="h-full flex flex-col group border border-slate-200 dark:border-slate-700/50"
                        onClick={() => onProjectSelect(project)}
                        imageFit="contain"
                        footer={
                          <div className="flex space-x-3">
                            {project.sourceUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-[10px] font-black tracking-widest uppercase transition-all"
                                onClick={() => window.open(project.sourceUrl, '_blank')}
                              >
                                GitHub
                              </Button>
                            )}
                            {project.demoUrl && (
                              <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 text-[10px] font-black tracking-widest uppercase shadow-lg shadow-emerald-500/25 transition-all bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                                onClick={() => window.open(project.demoUrl, '_blank')}
                              >
                                Canlıya Git
                              </Button>
                            )}
                          </div>
                        }
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-tighter rounded-md border border-blue-200/50 dark:border-blue-800/50">
                                {CATEGORY_LABELS[project.category]}
                              </span>
                              {project.isTeamProject && (
                                <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-[9px] font-black uppercase tracking-tighter rounded-md border border-violet-200/50 dark:border-violet-800/50 flex items-center gap-0.5">
                                  👥 Ekip
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 italic">
                              {project.year}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 text-[9px] font-bold rounded-full border border-slate-200 dark:border-slate-700"
                              >
                                #{tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.section>
              ) : (
                <motion.div 
                  key="empty"
                  className="flex flex-col items-center justify-center py-40 bg-white/20 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-6xl mb-6">🏜️</span>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-widest mb-2">
                    Eşleşen proje bulunamadı.
                  </h3>
                  <Button 
                    variant="ghost" 
                    onClick={() => setFilters({ search: '', category: 'all', sortField: 'year', sortOrder: 'desc' })}
                    className="underline text-blue-500 font-bold"
                  >
                    Tüm Filtreleri Sıfırla
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.main>
  );
}