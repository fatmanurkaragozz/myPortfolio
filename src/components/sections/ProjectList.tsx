/**
 * LAB-6 | Uygulama-6 — ProjectList Section — Profesyonel Versiyon
 * Skeleton Screens + Kademeli Animasyonlar + Etkileşimli Etiketler.
 */
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, Category, SortField, SortOrder } from '../../types/project';
import { fetchProjects } from '../../services/projectService';
import { applyFilters, CATEGORY_LABELS } from '../../utils/projectHelpers';
import ProjectFilter from '../forms/ProjectFilter';
import Card from '../Card';
import Button from '../Button';
import Alert from '../Alert';

// ── Skeleton UI Bileşeni (Yükleme Durumu İçin) ──────────────────────────────
const SkeletonCard = () => (
  <div className="h-[420px] rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 p-5 space-y-4 animate-pulse">
    <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
    <div className="flex justify-between">
      <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="w-12 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
    </div>
    <div className="w-3/4 h-7 bg-slate-200 dark:bg-slate-800 rounded-md" />
    <div className="w-full h-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
    <div className="flex gap-2">
      {[1, 2, 3].map(i => <div key={i} className="w-12 h-4 bg-slate-200 dark:bg-slate-800 rounded-full" />)}
    </div>
    <div className="flex gap-3 pt-2">
      <div className="flex-1 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="flex-1 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  </div>
);

interface ProjectListProps {
  onProjectSelect: (project: Project) => void;
}

export default function ProjectList({ onProjectSelect }: ProjectListProps) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Veri Çekme ─────────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // Simüle edilmiş gecikme (Skeleton'ı görebilmek için)
        await new Promise(r => setTimeout(r, 1200));
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Veri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Filtreleme ─────────────────────────────────────────────────────────────
  const filtered = useMemo(
    () => applyFilters(projects, search, category, sortField, sortOrder),
    [projects, search, category, sortField, sortOrder]
  );

  // ── Etiket Tıklama Mantığı ────────────────────────────────────────────────
  const handleTagClick = (tag: string) => {
    setSearch(tag);
    // Smooth scroll back to filter search input if needed? 
    // Usually, users want visual feedback immediately.
  };

  // ── Animasyon Varyantları ──────────────────────────────────────────────────
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-600 dark:text-blue-400 font-black text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4">
            SEÇKİN PORTFÖY
          </p>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter mb-6 relative inline-block">
            Projelerim
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-2 bg-blue-500/20 rounded-full -z-10"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base font-medium">
            Modern teknolojilerle geliştirdiğim uçtan uca çözümler ve kişisel çalışmalarım.
          </p>
        </motion.div>

        {/* Hata Durumu */}
        {error && (
          <Alert variant="error" title="Sistemsel Hata" className="mb-10 rounded-2xl">
            {error}
            <button onClick={() => window.location.reload()} className="ml-3 font-black underline">Yenile</button>
          </Alert>
        )}

        {/* Filtre Paneli */}
        {!error && (
          <ProjectFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            resultCount={filtered.length}
            totalCount={projects.length}
          />
        )}

        {/* Yükleme Durumu (Skeleton) */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Boş Sonuç Durumu */}
        {!loading && !error && filtered.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-40 bg-slate-50/50 dark:bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-8">🔍</div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-widest mb-4">
              Kriterlere Uygun Proje Yok
            </h3>
            <p className="text-slate-500 mb-8">Arama terimini veya kategoriyi değiştirmeyi dene.</p>
            <Button
              variant="primary"
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="rounded-2xl"
            >
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}

        {/* Proje Grid — Kademeli Animasyonlu */}
        {!loading && (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 && (
              <motion.div
                key="project-grid"
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filtered.map((project: Project) => (
                  <motion.article
                    key={project.id}
                    variants={item}
                    layout
                    whileHover={{ y: -10 }}
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
                      className="h-full flex flex-col group border-slate-200/60 dark:border-slate-800/60 !rounded-[2.5rem] overflow-hidden"
                      onClick={() => onProjectSelect(project)}
                      imageFit="contain"
                      footer={
                        <div className="flex gap-3">
                          {project.sourceUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-black tracking-widest uppercase transition-all"
                              onClick={() => window.open(project.sourceUrl, '_blank')}
                            >
                              KODLARI İNCELE
                            </Button>
                          )}
                          {project.demoUrl && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="flex-1 text-[10px] font-black tracking-widest uppercase shadow-lg shadow-emerald-500/25 transition-all bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                              onClick={() => window.open(project.demoUrl, '_blank')}
                            >
                              CANLIYA GİT
                            </Button>
                          )}
                        </div>
                      }
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100 dark:border-blue-800/40">
                              {CATEGORY_LABELS[project.category]}
                            </span>
                            {project.isTeamProject && (
                              <span className="px-2.5 py-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-[8px] font-black uppercase tracking-widest rounded-md border border-violet-200/50 dark:border-violet-800/50 flex items-center gap-0.5">
                                👥 Ekip
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-black text-slate-400 italic font-mono">
                            //{project.year}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((tech: string) => (
                            <button
                              key={tech}
                              onClick={() => handleTagClick(tech)}
                              className="px-2.5 py-1 bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[9px] font-bold rounded-md border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
                              title={`${tech} ile filtrelenmiş projeleri gör`}
                            >
                              #{tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
