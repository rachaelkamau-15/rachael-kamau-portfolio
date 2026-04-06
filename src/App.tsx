import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  ArrowDown, 
  Code, 
  Shield, 
  Cloud, 
  Menu, 
  X,
  BookOpen,
  Moon,
  Sun,
  Award,
  BadgeCheck,
  Users,
  Server,
  Cpu
} from 'lucide-react';
import { PROJECTS, CONTACT_INFO, MEDIUM_ARTICLES } from './constants';
import { Project, MediumArticle } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Software Engineering' | 'Cybersecurity' | 'Cloud Security'>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const categories = ['All', 'Software Engineering', 'Cybersecurity', 'Cloud Security'] as const;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-alt/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-2xl font-display font-black tracking-tighter transition-colors group ${scrolled ? 'text-text-main' : 'text-white'}`}>
            RK<span className="text-accent group-hover:text-primary transition-colors">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest relative group ${scrolled ? 'text-text-main' : 'text-white'}`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#certifications"
              className="px-5 py-2 bg-accent text-primary text-xs font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest shadow-lg shadow-accent/20"
            >
              Certifications
            </a>
            <div className={`flex items-center space-x-4 pl-4 border-l ${scrolled ? 'border-border-main' : 'border-white/20'}`}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:text-accent transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>
                <Github size={20} />
              </a>
              <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-accent transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${scrolled ? 'text-text-main' : 'text-white'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`transition-colors ${scrolled || isMenuOpen ? 'text-text-main' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-bg-main flex flex-col items-center justify-center space-y-8 md:hidden"
            >
              {['About', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-display font-bold hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
                <a 
                  href="#certifications"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-white transition-all text-xl shadow-xl shadow-accent/20"
                >
                  Certifications
                </a>
              <div className="flex space-x-6 pt-8">
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-accent">
                  <Github size={32} />
                </a>
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-accent">
                  <Linkedin size={32} />
                </a>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent)] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(26,11,46,0.8),transparent)] z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/30 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 animate-pulse" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-none">
              RACHAEL <span className="text-accent">KAMAU</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Full-Stack Developer, Cybersecurity Specialist & Multi-Cloud Developer <br className="hidden md:block" />

            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#about" 
                className="px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl shadow-accent/20"
              >
                Learn More About Me <ArrowDown size={20} />
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all"
              >
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / Skills Section */}
      <section id="about" className="py-24 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Professional Summary</h2>
            
            <div className="space-y-4 mb-12">
              <p className="text-text-muted leading-relaxed text-lg">
                I am a results-driven <span className="text-text-main font-bold">Software Developer</span> , <span className="text-text-main font-bold">Cybersecurity Specialist </span> and <span className="text-text-main font-bold">Cloud Security Specialist</span> dedicated to building secure, high-performance digital solutions. I combine full-stack development expertise with strong cloud security practices to create scalable, resilient applications where security is embedded from the ground up, not added as an afterthought.
              </p>
              <p className="text-text-muted leading-relaxed text-lg">
                With experience spanning mobile application development and multi-cloud infrastructure security, I deliver end-to-end solutions that balance innovation, performance, and protection. My focus is on helping organizations leverage technology confidently, knowing their systems are both robust and secure.
              </p>
              <p className="text-text-muted leading-relaxed text-lg italic">
                Beyond technical expertise, I bring strong communication and collaboration skills, enabling me to work effectively within teams and translate complex concepts into practical, business-driven solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-16">
              <a 
                href="#certifications" 
                className="px-6 py-3 bg-accent/10 text-accent border border-accent/20 font-bold rounded-xl hover:bg-accent hover:text-primary transition-all flex items-center gap-2"
              >
                <Award size={18} /> View Certifications
              </a>
              {CONTACT_INFO.credly && (
                <a 
                  href={CONTACT_INFO.credly} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-text-main/5 text-text-main border border-border-main font-bold rounded-xl hover:bg-text-main hover:text-bg-main transition-all flex items-center gap-2"
                >
                  <BadgeCheck size={18} /> Credly Badges
                </a>
              )}
            </div>

            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-8">Technical Skills & Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Code className="text-accent" />, 
                    title: "Full-Stack Engineering", 
                    desc: "Building scalable web & mobile experiences with Python, Django, Node.js, and React. Expert in high-performance Flutter apps." 
                  },
                  { 
                    icon: <Shield className="text-accent" />, 
                    title: "Advanced Cybersecurity", 
                    desc: "Protecting assets through Penetration Testing, Network Security auditing, and Zero-Trust Identity Management (IAM)." 
                  },
                  { 
                    icon: <Cloud className="text-accent" />, 
                    title: "Cloud Security Architecture", 
                    desc: "Securing multi-cloud environments (AWS, Azure, GCP) with a focus on Kubernetes, Docker, and automated compliance." 
                  },
                  { 
                    icon: <BookOpen className="text-accent" />, 
                    title: "Technical Strategy", 
                    desc: "Translating complex tech into business value through strategic writing and comprehensive security documentation." 
                  },
                  { 
                    icon: <Users className="text-accent" />, 
                    title: "Professional Collaboration", 
                    desc: "Maintaining a professional, collaborative approach with strong interpersonal skills to ensure project success." 
                  }
                ].map((skill, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 p-6 bg-bg-alt rounded-2xl border border-border-main hover:border-primary/20 transition-all"
                  >
                    <div className="mt-1">{skill.icon}</div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">{skill.title}</h4>
                      <p className="text-sm text-text-muted">{skill.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black tracking-tight">FEATURED PROJECTS</h3>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-accent text-primary shadow-lg shadow-accent/20' 
                      : 'bg-primary/10 text-text-muted hover:text-accent border border-transparent hover:border-accent/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-bg-main rounded-2xl overflow-hidden border border-border-main hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-bg-alt/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-md border border-border-main">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-display font-bold group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors">
                            <Github size={18} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.mediumUrl && (
                          <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors">
                            <BookOpen size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-text-muted bg-text-main/5 px-2 py-1 rounded uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
            <a 
              href={CONTACT_INFO.medium} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-105 shadow-xl shadow-accent/20"
            >
              <BookOpen size={20} /> READ MORE ARTICLES ON MEDIUM
            </a>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Validation</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black tracking-tight">CERTIFICATIONS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate", issuer: "Oracle", date: "2025", icon: <Cloud size={24} /> },
              { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2025", icon: <Cloud size={24} /> },
              { title: "SC-900: Security, Compliance & Identity Fundamentals", issuer: "Microsoft", date: "2026", icon: <Shield size={24} /> },
              { title: "AI-900: Azure AI Fundamentals", issuer: "Microsoft", date: "2026", icon: <Cpu size={24} /> },
              { title: "Certified in Cybersecurity", issuer: "ISC2", date: "2026", icon: <Shield size={24} /> },
              { title: "Certified Kubernetes Cloud Native Associate (KCNA)", issuer: "Cloud Native Computing Foundation", date: "2026", icon: <Server size={24} /> },
              { title: "AWS AI Practitioner", issuer: "Amazon Web Services", date: "2026", icon: <Cpu size={24} /> }
            ].map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-bg-main rounded-2xl border border-border-main hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {cert.icon}
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors text-accent">
                  {cert.icon}
                </div>
                <h4 className="font-display font-bold text-xl mb-2">{cert.title}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-text-main/5 text-[10px] font-bold uppercase tracking-wider rounded border border-border-main">
                    {cert.issuer}
                  </span>
                </div>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">{cert.date}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href={CONTACT_INFO.credly} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-105 shadow-xl shadow-accent/20"
            >
              <BadgeCheck size={20} /> View All Badges on Credly
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-bg-alt relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-12">LET'S WORK TOGETHER</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a href={`mailto:${CONTACT_INFO.email}`} className="group p-10 bg-bg-main rounded-3xl border border-border-main hover:border-accent/30 transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all text-accent">
                <Mail size={32} />
              </div>
              <h4 className="font-display font-bold text-xl mb-2">Email Me</h4>
              <p className="text-text-muted break-all">{CONTACT_INFO.email}</p>
            </a>
            
            <a href={`tel:${CONTACT_INFO.phone}`} className="group p-10 bg-bg-main rounded-3xl border border-border-main hover:border-accent/30 transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all text-accent">
                <Phone size={32} />
              </div>
              <h4 className="font-display font-bold text-xl mb-2">Call Me</h4>
              <p className="text-text-muted">{CONTACT_INFO.phone}</p>
            </a>
            
            <div className="p-10 bg-bg-main rounded-3xl border border-border-main hover:border-accent/30 transition-all group">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all text-accent">
                <Shield size={32} />
              </div>
              <h4 className="font-display font-bold text-xl mb-2">Socials</h4>
              <div className="flex justify-center gap-4">
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-text-main/5 rounded-lg hover:bg-accent hover:text-primary transition-all">
                  <Linkedin size={20} />
                </a>
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-text-main/5 rounded-lg hover:bg-accent hover:text-primary transition-all">
                  <Github size={20} />
                </a>
                <a href={CONTACT_INFO.medium} target="_blank" rel="noopener noreferrer" className="p-2 bg-text-main/5 rounded-lg hover:bg-accent hover:text-primary transition-all">
                  <BookOpen size={20} />
                </a>
                <a href={CONTACT_INFO.credly} target="_blank" rel="noopener noreferrer" className="p-2 bg-text-main/5 rounded-lg hover:bg-accent hover:text-primary transition-all">
                  <BadgeCheck size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} Rachael Kamau Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 bg-bg-alt border-t border-border-main">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-display font-black tracking-tighter text-text-main">
            RK<span className="text-accent">.</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-text-muted">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-accent transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
          <div className="text-xs text-text-muted font-medium">
            Designed with precision by Rachael Kamau
          </div>
        </div>
      </footer>
    </div>
  );
}
