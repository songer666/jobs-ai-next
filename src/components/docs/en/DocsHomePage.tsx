'use client';

import { Button, Link } from '@heroui/react';
import { useState } from 'react';
import { ArrowRight, BookOpen, Target, FileText, BarChart3, HelpCircle, User, Code } from 'lucide-react';

const styles = {
    section: 'pt-32 pb-24 px-4',
    container: 'max-w-[1400px] mx-auto',
    header: {
        wrapper: 'text-center mb-16',
        badge: 'inline-block gradient-btn text-white text-sm font-medium px-4 py-2 rounded-full mb-6',
        title: 'text-4xl md:text-5xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60 max-w-2xl mx-auto mb-8',
        search: 'max-w-xl mx-auto',
        searchInput: 'w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 outline-none focus:border-primary transition-colors text-lg',
    },
    categories: {
        wrapper: 'flex flex-wrap justify-center gap-3 mb-16',
        btn: 'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
        active: 'gradient-btn text-white',
        inactive: 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10',
    },
    content: {
        wrapper: 'grid grid-cols-1 lg:grid-cols-4 gap-8',
        sidebar: 'lg:col-span-1',
        sidebarCard: 'glass-card p-6 rounded-2xl sticky top-32',
        sidebarTitle: 'text-lg font-bold text-white mb-4',
        sidebarNav: 'space-y-2',
        sidebarLink: 'block px-4 py-2.5 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors',
        sidebarLinkActive: 'block px-4 py-2.5 rounded-xl bg-primary/20 text-primary font-medium',
        main: 'lg:col-span-3',
    },
    articles: {
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        card: 'glass-card p-6 rounded-2xl hover:border-primary/30 transition-all cursor-pointer group',
        cardIcon: 'w-12 h-12 rounded-xl gradient-btn flex items-center justify-center mb-4',
        cardIconText: 'text-xl',
        cardTitle: 'text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors',
        cardDesc: 'text-white/60 mb-4',
        cardMeta: 'flex items-center gap-4 text-sm text-white/40',
        cardMetaItem: 'flex items-center gap-1',
    },
    featured: {
        wrapper: 'glass-card p-8 rounded-2xl mb-8',
        badge: 'inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4',
        title: 'text-2xl font-bold text-white mb-3',
        desc: 'text-white/60 mb-6',
        btn: 'gradient-btn text-white font-medium rounded-full px-6 py-2.5',
    },
    cta: {
        wrapper: 'mt-16 glass-card p-8 md:p-12 rounded-3xl text-center',
        title: 'text-2xl md:text-3xl font-bold text-white mb-3',
        subtitle: 'text-white/60 mb-6',
        btn: 'gradient-btn text-white font-semibold rounded-full px-8 py-3',
    },
};

const categoryIcons: Record<string, React.ReactNode> = {
    'getting-started': <Code className="w-5 h-5" />,
    'interview': <Target className="w-5 h-5" />,
    'resume': <FileText className="w-5 h-5" />,
    'questions': <HelpCircle className="w-5 h-5" />,
    'account': <User className="w-5 h-5" />,
};

export default function DocsHomePage() {
    const [activeCategory, setActiveCategory] = useState('getting-started');
    const [activeSidebarItem, setActiveSidebarItem] = useState('introduction');

    const categories = [
        { key: 'getting-started', label: 'Getting Started' },
        { key: 'interview', label: 'AI Interview' },
        { key: 'resume', label: 'Resume Services' },
        { key: 'questions', label: 'Practice Questions' },
        { key: 'account', label: 'Account Management' },
    ];

    const sidebarItems = [
        { key: 'introduction', label: 'Introduction' },
        { key: 'quickStart', label: 'Quick Start' },
        { key: 'features', label: 'Features' },
        { key: 'faq', label: 'FAQ' },
    ];

    const featuredArticle = {
        title: 'Welcome to Jobs AI',
        desc: 'Smart job search assistant providing comprehensive support for your career development. Leverage AI technology to prepare for interviews, optimize resumes, and enhance your skills.',
        btnText: 'Get Started',
    };

    const articles = [
        {
            key: 'intro',
            icon: <BookOpen className="w-6 h-6" />,
            title: 'Product Introduction',
            desc: 'Learn about Jobs AI\'s core features and use cases, start your intelligent job search journey.',
            readTime: 3,
            category: 'getting-started',
        },
        {
            key: 'quickStart',
            icon: <Code className="w-6 h-6" />,
            title: 'Quick Start',
            desc: 'Get started in 5 minutes, experience core features like AI interviews and resume generation.',
            readTime: 5,
            category: 'getting-started',
        },
        {
            key: 'interview',
            icon: <Target className="w-6 h-6" />,
            title: 'AI Mock Interview',
            desc: 'Smart interviewer provides realistic interview experience to help you improve your interview skills.',
            readTime: 8,
            category: 'interview',
        },
        {
            key: 'resume',
            icon: <FileText className="w-6 h-6" />,
            title: 'Resume Generation & Analysis',
            desc: 'AI-powered professional resume generation with in-depth analysis and optimization suggestions.',
            readTime: 6,
            category: 'resume',
        },
        {
            key: 'questions',
            icon: <HelpCircle className="w-6 h-6" />,
            title: 'Question Bank',
            desc: 'Extensive technical question bank with targeted practice to enhance professional skills and interview competitiveness.',
            readTime: 7,
            category: 'questions',
        },
        {
            key: 'account',
            icon: <User className="w-6 h-6" />,
            title: 'Account Settings',
            desc: 'Manage personal information, security settings, and personalize your experience.',
            readTime: 4,
            category: 'account',
        },
    ];

    const filteredArticles = articles.filter(article => 
        activeCategory === 'getting-started' || article.category === activeCategory
    );

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <span className={styles.header.badge}>📚 Documentation</span>
                    <h1 className={styles.header.title}>
                        Welcome to Jobs AI
                    </h1>
                    <p className={styles.header.subtitle}>
                        Smart job search assistant providing comprehensive support for your career development
                    </p>
                    <div className={styles.header.search}>
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className={styles.header.searchInput}
                        />
                    </div>
                </div>

                {/* Featured Article */}
                <div className={styles.featured.wrapper}>
                    <span className={styles.featured.badge}>🎯 Featured</span>
                    <h2 className={styles.featured.title}>{featuredArticle.title}</h2>
                    <p className={styles.featured.desc}>{featuredArticle.desc}</p>
                    <Button className={styles.featured.btn}>
                        {featuredArticle.btnText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                {/* Categories */}
                <div className={styles.categories.wrapper}>
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            className={`${styles.categories.btn} ${
                                activeCategory === category.key
                                    ? styles.categories.active
                                    : styles.categories.inactive
                            }`}
                        >
                            {categoryIcons[category.key]}
                            <span className="ml-2">{category.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.content.wrapper}>
                    {/* Sidebar */}
                    <aside className={styles.content.sidebar}>
                        <div className={styles.content.sidebarCard}>
                            <h3 className={styles.content.sidebarTitle}>Quick Navigation</h3>
                            <nav className={styles.content.sidebarNav}>
                                {sidebarItems.map((item) => (
                                    <Link
                                        key={item.key}
                                        href="#"
                                        className={
                                            activeSidebarItem === item.key
                                                ? styles.content.sidebarLinkActive
                                                : styles.content.sidebarLink
                                        }
                                        onClick={() => setActiveSidebarItem(item.key)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={styles.content.main}>
                        <div className={styles.articles.grid}>
                            {filteredArticles.map((article) => (
                                <div key={article.key} className={styles.articles.card}>
                                    <div className={styles.articles.cardIcon}>
                                        {article.icon}
                                    </div>
                                    <h3 className={styles.articles.cardTitle}>
                                        {article.title}
                                    </h3>
                                    <p className={styles.articles.cardDesc}>
                                        {article.desc}
                                    </p>
                                    <div className={styles.articles.cardMeta}>
                                        <span className={styles.articles.cardMetaItem}>
                                            📖 {article.readTime} min read
                                        </span>
                                        <span className={styles.articles.cardMetaItem}>
                                            🏷️ {categories.find(c => c.key === article.category)?.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                {/* CTA */}
                <div className={styles.cta.wrapper}>
                    <h2 className={styles.cta.title}>Start Your Smart Job Search Journey</h2>
                    <p className={styles.cta.subtitle}>
                        Experience powerful features like AI interviews and resume generation
                    </p>
                    <Button className={styles.cta.btn}>
                        Try for Free
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
