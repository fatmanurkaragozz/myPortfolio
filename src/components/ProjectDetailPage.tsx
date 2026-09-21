import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types/project';
import { CATEGORY_LABELS } from '../utils/projectHelpers';
import Button from './Button';
import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function ProjectDetailPage({
  project,
  onBack,
  isDarkMode,
  toggleDarkMode,
}: ProjectDetailPageProps) {
  const images = Array.isArray(project.image)
    ? project.image
    : project.image
    ? [project.image]
    : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <motion.main
      className="relative min-h-screen p-4 md:p-8 overflow-x-hidden font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageBackground isDarkMode={isDarkMode} />

      {/* Navigation - Back Button */}
      <div className="fixed top-6 left-6 md:left-24 z-[110]">
        <Button
          variant="ghost"
          onClick={onBack}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md dark:text-white border border-slate-200/50 dark:border-slate-700/50 px-6 h-12 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          ← Geri Dön
        </Button>
      </div>

      {/* Global Theme Toggle */}
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="relative max-w-7xl mx-auto z-10 pt-28 pb-20">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Gallery & Images (Takes 7 columns on large screens) */}
          <div className="lg:col-span-7 space-y-4">
            {images.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {/* Main Large Image Container */}
                <motion.div
                  className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 shadow-2xl bg-slate-50 dark:bg-slate-900/50 cursor-zoom-in group"
                  layoutId={`project-hero-${project.id}`}
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-300 z-10" />
                  
                  {/* Aspect Ratio box */}
                  <div className="relative aspect-[16/10] w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={images[activeImageIndex]}
                      alt={`${project.title} - Görsel ${activeImageIndex + 1}`}
                      className="w-full h-full object-contain max-h-[550px] transition-transform duration-700 hover:scale-102"
                      style={{ imageRendering: 'auto' }}
                    />
                  </div>

                  {/* Zoom Indicator Icon Overlay */}
                  <div className="absolute bottom-4 right-4 z-20 p-3 bg-slate-900/70 hover:bg-blue-600 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </motion.div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="flex flex-wrap gap-3 py-2 justify-center lg:justify-start">
                    {images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-xl overflow-hidden w-24 h-16 border-2 transition-all duration-300 hover:scale-105 bg-slate-100 dark:bg-slate-800/80 ${
                          activeImageIndex === idx
                            ? 'border-blue-600 shadow-md scale-105'
                            : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[16/10] w-full flex items-center justify-center rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">Görsel Bulunmamaktadır</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details & Info (Takes 5 columns on large screens) */}
          <div className="lg:col-span-5 space-y-8 bg-white/40 dark:bg-slate-900/40 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl">
            {/* Category and Year tags */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="px-3.5 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                {CATEGORY_LABELS[project.category]}
              </span>
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 italic font-mono bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg">
                📅 {project.year}
              </span>
              {project.isTeamProject && (
                <span className="px-3.5 py-1.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-black uppercase tracking-wider rounded-xl border border-violet-200/50 dark:border-violet-800/50 flex items-center gap-1">
                  👥 Ekip Projesi
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white tracking-wide leading-tight">
                {project.title}
              </h1>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full mt-4" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Proje Hakkında
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            {/* Team Role Card */}
            {project.teamRole && (
              <div className="p-5 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl border border-violet-500/20 dark:border-blue-500/15 shadow-md space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                  👥 Ekipteki Rolüm & Katkılarım
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  {project.teamRole}
                </p>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Kullanılan Teknolojiler
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700/80"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.sourceUrl && (
                <Button
                  variant="ghost"
                  onClick={() => window.open(project.sourceUrl, '_blank')}
                  className="flex-1 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-black tracking-widest uppercase transition-all rounded-xl h-14"
                >
                  Kodları İncele
                </Button>
              )}
              {project.demoUrl && (
                <Button
                  variant="primary"
                  onClick={() => window.open(project.demoUrl, '_blank')}
                  className="flex-1 text-xs font-black tracking-widest uppercase shadow-xl shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all rounded-xl h-14"
                >
                  Canlıya Git
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && images.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-[220] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg focus:outline-none"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Nav Arrow (Only visible if > 1 image) */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-[220] p-4 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all shadow-xl focus:outline-none"
                aria-label="Önceki Görsel"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Active Image Container */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] select-none flex items-center justify-center overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <img
                src={images[activeImageIndex]}
                alt={`${project.title} - Tam Ekran Görsel ${activeImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl cursor-default"
                style={{ imageRendering: 'auto' }}
              />
              
              {/* Image indicator count */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-semibold">
                {activeImageIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Right Nav Arrow (Only visible if > 1 image) */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[220] p-4 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all shadow-xl focus:outline-none"
                aria-label="Sonraki Görsel"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
