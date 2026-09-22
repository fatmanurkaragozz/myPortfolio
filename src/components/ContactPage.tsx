/**
 * LAB-6 | ContactPage
 * ContactForm component'ini (forms/ContactForm.tsx) kullanan sayfa wrapper'ı.
 * Form logic'inin tamamı ContactForm'a taşındı (Uygulama-1).
 */
import { motion } from 'framer-motion';
import Button from './Button';
import PageBackground from './PageBackground';
import ThemeToggle from './ThemeToggle';
import ContactForm from './forms/ContactForm';

interface ContactPageProps {
  onBack: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function ContactPage({ onBack, isDarkMode, toggleDarkMode }: ContactPageProps) {
  const contacts = [
    {
      icon: "📧",
      title: "E-posta",
      value: "fk6895164@gmail.com",
      link: "mailto:fk6895164@gmail.com"
    },
    {
      icon: "📍",
      title: "Konum",
      value: "Ankara, Türkiye",
      link: "#"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/fatma-nur-karagöz-78678a294",
      link: "https://www.linkedin.com/in/fatma-nur-karag%C3%B6z-78678a294/"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: "🐙",
      url: "https://github.com/fatmanurkaragozz",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://www.linkedin.com/in/fatma-nur-karag%C3%B6z-78678a294/",
      color: "from-blue-600 to-indigo-700"
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "https://www.instagram.com/mind_of_dev1/",
      color: "from-pink-400 to-purple-600"
    },
    {
      name: "Medium",
      icon: "✍️",
      url: "https://medium.com/@fatmaNurK",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <motion.main 
      className="relative min-h-screen p-4 md:p-8 flex flex-col items-center pt-44 pb-20 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <PageBackground isDarkMode={isDarkMode} />

      {/* Üst Navigasyon - Geri Dön Butonu */}
      <div className="fixed top-6 left-24 z-20">
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

      <div className="relative max-w-7xl mx-auto z-10 pt-44 w-full">
        {/* Header */}
        <motion.header
          className="mb-12 text-center lg:text-left"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-black italic uppercase mb-4 tracking-widest">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              İletişime Geç
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium border-l-4 border-purple-500 pl-4 inline-block">
            Projeleriniz için benimle iletişime geçebilirsiniz
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ──────────────────────────────────────────
              LAB-6 Uygulama-1: ContactForm Component
              src/components/forms/ContactForm.tsx
              ────────────────────────────────────────── */}
          <motion.section
            className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-sm border border-white/10"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            aria-labelledby="contact-form-heading"
          >
            <h2
              id="contact-form-heading"
              className="text-2xl mb-6 font-bold text-gray-800 dark:text-white"
            >
              Mesaj Gönder
            </h2>

            {/* ✅ Uygulama-1: Controlled form, validation, state yönetimi */}
            <ContactForm />
          </motion.section>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <motion.div
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-2xl mb-6 font-bold text-gray-800 dark:text-white">İletişim Bilgileri</h2>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <motion.a
                    key={contact.title}
                    href={contact.link}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-colors group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{contact.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{contact.title}</p>
                      <p className="text-gray-600 dark:text-gray-400">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h2 className="text-2xl mb-6 font-bold text-gray-800 dark:text-white">Sosyal Medya</h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`bg-gradient-to-r ${social.color} text-white p-4 rounded-xl flex flex-col items-center justify-center hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-3xl mb-2">{social.icon}</span>
                    <span className="font-bold text-sm tracking-wide uppercase">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}