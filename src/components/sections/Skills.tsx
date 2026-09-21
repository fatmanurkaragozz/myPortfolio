/**
 * LAB-6 | Skills Section
 * Teknoloji yetkinlikleri — kategorize animasyonlu badge grid.
 */
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/useLanguage';

interface Skill {
  name?: string; // Teknoloji adları çevrilmez
  nameKey?: string; // Çevrilecek adlar sözlük anahtarı taşır
  emoji: string;
  level: number; // 1-5
}

const SKILL_GROUPS: { id: string; color: string; skills: Skill[] }[] = [
  {
    id: 'frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', emoji: '⚛️', level: 5 },
      { name: 'TypeScript', emoji: '📘', level: 4 },
      { name: 'Next.js', emoji: '▲', level: 4 },
      { name: 'Tailwind CSS', emoji: '🎨', level: 5 },
      { name: 'Framer Motion', emoji: '✨', level: 3 },
    ],
  },
  {
    id: 'backend',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', emoji: '🟢', level: 4 },
      { name: 'Express.js', emoji: '🚂', level: 4 },
      { name: 'PostgreSQL', emoji: '🐘', level: 3 },
      { name: 'C#', emoji: '🎯', level: 3 },
      { name: 'REST API', emoji: '🔌', level: 4 },
    ],
  },
  {
    id: 'ml',
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Python', emoji: '🐍', level: 4 },
      { name: 'scikit-learn', emoji: '🤖', level: 4 },
      { name: 'Pandas', emoji: '🐼', level: 3 },
      { name: 'LLM & RAG', emoji: '🧠', level: 3 },
      { nameKey: 'skills.names.dataAnalysis', emoji: '📊', level: 3 },
    ],
  },
  {
    id: 'tools',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Git & GitHub', emoji: '🐙', level: 5 },
      { name: 'VS Code', emoji: '💻', level: 5 },
      { name: 'Figma', emoji: '🖌️', level: 3 },
      { name: 'Vite', emoji: '⚡', level: 4 },
      { name: 'Colab', emoji: '🧪', level: 2 },
    ],
  },
];

function SkillBar({ level }: { level: number }) {
  const { t } = useLanguage();
  return (
    <div className="flex gap-1 mt-1.5" aria-label={t('skills.level', { level })}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`h-1 flex-1 rounded-full transition-all ${dot <= level
              ? 'bg-blue-500 dark:bg-blue-400'
              : 'bg-slate-200 dark:bg-slate-700'
            }`}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="py-24 px-4 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-purple-600 dark:text-purple-400 font-bold text-sm uppercase tracking-[0.3em] mb-3">
            {t('skills.eyebrow')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter">
            {t('skills.title')}
          </h2>
          <div className="w-16 h-1.5 bg-purple-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Kategoriler */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl
                         border border-white/40 dark:border-slate-700/40 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: gi * 0.15 }}
            >
              {/* Kategori Başlığı */}
              <div className={`bg-gradient-to-r ${group.color} p-5`}>
                <h3 className="text-white font-black text-lg uppercase tracking-widest">
                  {t(`skills.groups.${group.id}`)}
                </h3>
              </div>

              {/* Skill Listesi */}
              <motion.ul
                className="p-6 space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.skills.map((skill) => (
                  <motion.li key={skill.name ?? skill.nameKey} variants={itemVariants}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{skill.emoji}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                          {skill.nameKey ? t(skill.nameKey) : skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-slate-400">
                        {skill.level}/5
                      </span>
                    </div>
                    <SkillBar level={skill.level} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
