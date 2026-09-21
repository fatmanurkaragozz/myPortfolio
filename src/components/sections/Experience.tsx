/**
 * Experience Section
 * Kariyer zaman çizelgesi — staj ve araştırma deneyimleri.
 * Veri: src/data/career.json
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import careerData from '../../data/career.json';
import { formatPeriod, sortCareer, localizeCareer, type CareerEntry } from '../../utils/career';
import { useLanguage } from '../../i18n/useLanguage';

const CAREER = sortCareer(careerData as CareerEntry[]);

export default function Experience() {
  const { t, lang } = useLanguage();
  const items = useMemo(() => CAREER.map((entry) => localizeCareer(entry, lang)), [lang]);

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-[0.3em] mb-3">
            {t('experience.eyebrow')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter">
            {t('experience.title')}
          </h2>
          <div className="w-16 h-1.5 bg-emerald-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Zaman çizelgesi */}
        <ol
          className="relative max-w-3xl mx-auto border-l-2 border-slate-200 dark:border-slate-700 space-y-10"
          aria-label={t('experience.timelineAria')}
        >
          {items.map((item, index) => {
            const isCurrent = item.end === null;
            return (
              <motion.li
                key={item.id}
                className="relative pl-8 md:pl-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Zaman çizgisi noktası */}
                <span
                  className={`absolute -left-[9px] top-7 flex h-4 w-4 rounded-full border-4
                              border-white dark:border-slate-950
                              ${isCurrent ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'}`}
                  aria-hidden="true"
                >
                  {isCurrent && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  )}
                </span>

                <div
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md
                             rounded-2xl p-6 md:p-8 border border-white/30 dark:border-slate-700/30 shadow-xl"
                >
                  {/* Dönem + durum */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <time
                      dateTime={item.start}
                      className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400"
                    >
                      {formatPeriod(item.start, item.end, lang)}
                    </time>
                    {isCurrent && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                                       bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                        {t('experience.current')}
                      </span>
                    )}
                  </div>

                  {/* Unvan + kurum */}
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-emerald-500 rounded-full inline-block flex-shrink-0" />
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-bold text-emerald-700 dark:text-emerald-300">
                    {item.organization}
                    {item.institution && (
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        {' · '}
                        {item.institution}
                      </span>
                    )}
                  </p>

                  <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="text-emerald-500" aria-hidden="true">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('experience.tagsAria')}>
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-3 py-1 text-xs font-bold rounded-lg
                                     bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
