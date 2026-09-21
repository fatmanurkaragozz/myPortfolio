/**
 * LAB-6 | Uygulama-5 — ProjectFilter (forms) — Profesyonel Versiyon
 * Gelişmiş Glassmorphism + Filtre Sıfırlama + Mikro-Animasyonlar.
 */
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../Input';
import Button from '../Button';
import type { Category, SortField, SortOrder } from '../../types/project';
import { useLanguage } from '../../i18n/useLanguage';

interface ProjectFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | 'all';
  onCategoryChange: (value: Category | 'all') => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (value: SortOrder) => void;
  resultCount: number;
  totalCount: number;
}

const CATEGORIES: { value: Category | 'all'; emoji: string }[] = [
  { value: 'all',       emoji: '🌐' },
  { value: 'frontend',  emoji: '🎨' },
  { value: 'fullstack', emoji: '⚡' },
  { value: 'backend',   emoji: '⚙️' },
  { value: 'ml',        emoji: '🤖' },
];

export default function ProjectFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
  resultCount,
  totalCount,
}: ProjectFilterProps) {
  const { t } = useLanguage();

  const isAnyFilterActive = search.length > 0 || category !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
  };

  return (
    <motion.div
      className="space-y-6 mb-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl
                 border border-white/40 dark:border-slate-800/50 rounded-3xl p-6 md:p-8
                 shadow-2xl shadow-blue-500/5"
      role="search"
      aria-label={t('filter.aria')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between gap-6 items-end">
        {/* Arama Kutusu */}
        <div className="flex-1 w-full lg:basis-full relative flex flex-col gap-2">
          <label htmlFor="project-search" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
            {t('filter.searchLabel')}
          </label>
          <div className="relative flex items-center">
            {/* Magnifying Glass Icon */}
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              id="project-search"
              type="text"
              placeholder={t('filter.searchPlaceholder')}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-24 py-3 rounded-2xl border border-slate-200 dark:border-slate-700/50
                         bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md text-sm font-medium
                         text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
            />

            <AnimatePresence>
              {isAnyFilterActive && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearFilters}
                  className="absolute right-3 text-[10px] font-bold tracking-wider
                             bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl
                             hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  {t('filter.reset')}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Kategori Filtresi */}
        <div className="w-full lg:w-auto">
          <p className="text-xs font-bold mb-2 text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
            {t('filter.category')}
          </p>
          <div
            className="flex gap-2 flex-wrap"
            role="group"
            aria-label={t('filter.categoryAria')}
          >
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  aria-pressed={isActive}
                  className="relative px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide
                             transition-all duration-300 flex items-center gap-2 overflow-hidden cursor-pointer
                             text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {/* Sliding Background */}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/15 border border-blue-500/30 rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="text-sm">{cat.emoji}</span>
                  <span className={isActive ? "text-blue-600 dark:text-blue-400 font-bold" : ""}>
                    {t(`categories.${cat.value}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sıralama */}
        <div className="w-full lg:w-auto flex items-end gap-2">
          <div className="flex-1 lg:w-40">
            <p className="text-xs font-bold mb-2 text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
              {t('filter.sort')}
            </p>
            <div className="relative">
              <select
                value={sortField}
                onChange={(e) => onSortFieldChange(e.target.value as SortField)}
                className="w-full border border-slate-200 dark:border-slate-700/50 rounded-2xl
                           px-5 py-3 text-xs font-semibold bg-slate-50/50 dark:bg-slate-900/50
                           text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none
                           appearance-none cursor-pointer pr-10"
              >
                <option value="year">{t('filter.byYear')}</option>
                <option value="title">{t('filter.byTitle')}</option>
              </select>
              {/* Arrow Indicator */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
            }
            className="h-11 px-4 text-xs font-semibold bg-slate-50/50 dark:bg-slate-900/50 text-slate-700
                       dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700/50
                       hover:border-blue-500 dark:hover:border-blue-400 transition-all min-w-[80px] cursor-pointer"
          >
            {sortOrder === 'asc' ? t('filter.asc') : t('filter.desc')}
          </button>
        </div>
      </div>

      {/* Sonuç Sayacı */}
      <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-slate-700/40 pt-5">
        <motion.p 
          className="text-xs font-bold text-slate-500 dark:text-slate-400"
          key={resultCount}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-blue-600 dark:text-blue-400 text-sm font-black">{resultCount}</span>
          {' '}{t(resultCount === 1 ? 'filter.countOne' : 'filter.countOther')}
        </motion.p>
      </div>
    </motion.div>
  );
}
