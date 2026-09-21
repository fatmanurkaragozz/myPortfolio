/**
 * CvMenu
 * Hero'daki tek "CV" düğmesi. Tıklanınca dile göre CV'yi yeni sekmede
 * görüntüleme ve indirme seçeneklerini açar.
 * Dosyalar: public/cv/*.pdf, liste: src/data/cv.json
 */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cvFiles from '../data/cv.json';

const ACTION_LABELS: Record<string, { view: string; download: string }> = {
  tr: { view: 'Görüntüle', download: 'İndir' },
  en: { view: 'View', download: 'Download' },
};

const ACTION_CLASS =
  'px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500';

export default function CvMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca veya Escape ile kapat.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Button bileşeninin ghost varyantı hover rengini eziyor, bu yüzden düz <button>. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="cv-menu"
        className="inline-flex items-center justify-center rounded-lg px-10 py-5
                   text-sm md:text-base font-black uppercase tracking-widest
                   text-slate-800 dark:text-white bg-transparent backdrop-blur-sm
                   border-2 border-emerald-500/40 transition-all duration-300 cursor-pointer
                   hover:bg-emerald-700 hover:border-emerald-700 hover:text-white
                   aria-expanded:bg-emerald-700 aria-expanded:border-emerald-700 aria-expanded:text-white
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        📄 CV'mi İncele
        <span aria-hidden="true" className={`ml-2 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="cv-menu"
            role="group"
            aria-label="CV dosyaları"
            className="absolute left-0 right-0 mx-auto top-full mt-3 w-72 z-30 space-y-2 p-3
                       bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl
                       border border-slate-200 dark:border-slate-700 shadow-2xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {cvFiles.map((cv) => {
              const labels = ACTION_LABELS[cv.lang] ?? ACTION_LABELS.en;
              return (
                <div
                  key={cv.lang}
                  className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl
                             bg-slate-50 dark:bg-slate-800/60"
                >
                  <span lang={cv.lang} className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {cv.label}
                  </span>
                  <span className="flex gap-2">
                    <a
                      href={cv.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      lang={cv.lang}
                      className={`${ACTION_CLASS} bg-emerald-700 text-white hover:bg-emerald-800`}
                    >
                      {labels.view}
                    </a>
                    <a
                      href={cv.file}
                      download={cv.downloadName}
                      lang={cv.lang}
                      className={`${ACTION_CLASS} bg-slate-200 dark:bg-slate-700 text-slate-700
                                  dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600`}
                    >
                      {labels.download}
                    </a>
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
