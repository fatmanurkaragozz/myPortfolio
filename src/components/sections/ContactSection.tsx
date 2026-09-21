/**
 * LAB-6 | Uygulama-7 — ContactSection — Profesyonel Versiyon
 * Yerleşim Optimizasyonu (Sol: Bilgi, Sağ: Form) + Staggered Animasyonlar.
 */
import { motion } from 'framer-motion';
import ContactForm from '../forms/ContactForm';

const CONTACTS = [
  { icon: '📧', label: 'E-posta',  value: 'fk6895164@gmail.com',         link: 'mailto:fk6895164@gmail.com' },
  { icon: '📍', label: 'Konum',    value: 'Ankara, Türkiye',              link: '#' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/fatmanurkaragoz', link: 'https://www.linkedin.com/in/fatmanurkaragoz' },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/fatmanurkaragozz',  link: 'https://github.com/fatmanurkaragozz' },
];

export default function ContactSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-32 px-4 bg-slate-50/30 dark:bg-slate-950/20 relative overflow-hidden">
      {/* Dekoratif Arka Plan */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 dark:bg-blue-500/2 skew-x-12 transform origin-top-right -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-pink-600 dark:text-pink-400 font-black text-xs uppercase tracking-[0.5em] mb-4">
            İletişime Geç
          </p>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter mb-6">
            Benimle Çalış
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ✅ SOL — İletişim Bilgileri (Lab-6 Doküman Uyumu) */}
          <motion.div
            className="space-y-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-blue-600 rounded-full inline-block" />
                İletişim Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {CONTACTS.map((c) => (
                  <motion.a
                    key={c.label}
                    href={c.link}
                    variants={item}
                    target={c.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 p-5 rounded-3xl bg-white dark:bg-slate-900/50 
                               border border-slate-200/60 dark:border-slate-800/60 
                               hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 
                               transition-all group"
                  >
                    <span className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {c.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        {c.label}
                      </p>
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm break-all">
                        {c.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Glowing CTA Kartı */}
            <motion.div
              variants={item}
              className="relative group overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <div
                className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 
                           border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    Yeni Fırsatlara Açığım 🚀
                  </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  Full Stack Developer alanında yeni fırsatlar için hazırım. Projeleriniz ve iş birlikleri için mesaj atabilirsiniz.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ✅ SAĞ — Mesaj Formu (Lab-6 Doküman Uyumu) */}
          <motion.div
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] p-10
                       border border-slate-200 dark:border-slate-800/80 shadow-2xl shadow-slate-900/5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl" />
            
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center justify-between">
              <span>Mesaj Gönder</span>
              <span className="text-4xl">📧</span>
            </h3>

            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
