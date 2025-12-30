'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, FileText, BarChart3, HelpCircle, User, Code, ChevronLeft } from 'lucide-react';

interface DocsSidebarProps {
    locale: string;
}

const styles = {
    sidebar: 'hidden lg:block w-72 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto',
    sidebarInner: 'bg-white/5 border border-white/10 rounded-2xl',
    sidebarOpen: 'translate-x-0',
    sidebarClosed: 'translate-x-full lg:translate-x-0',
    sidebarMobile: 'fixed right-0 top-0 z-50 h-screen bg-[#1a1528]',
    
    header: 'p-5 border-b border-white/10',
    headerTop: 'flex items-center justify-between mb-1',
    title: 'text-lg font-bold text-white',
    closeBtn: 'lg:hidden text-white/60 hover:text-white transition-colors',
    subtitle: 'text-sm text-white/50',
    
    nav: 'p-4',
    navSection: 'mb-5',
    navSectionTitle: 'text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-3',
    navList: 'space-y-1',
    navItem: 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors',
    navItemActive: 'flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary/20 text-primary font-medium text-sm',
    navIcon: 'w-4 h-4 shrink-0',
    
    toggleBtn: 'fixed right-4 bottom-6 z-40 lg:hidden bg-primary p-3 rounded-full shadow-lg shadow-primary/30',
    overlay: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
};

const sidebarContent = {
    'zh-CN': {
        title: '文档中心',
        subtitle: '了解如何使用 Jobs AI',
        sections: [
            {
                title: '开始使用',
                items: [
                    { href: '/docs', label: '简介', icon: Home },
                    { href: '/docs/quick-start', label: '快速开始', icon: Code },
                ],
            },
            {
                title: '核心功能',
                items: [
                    { href: '/docs/interview', label: 'AI 模拟面试', icon: Target },
                    { href: '/docs/resume-generator', label: '简历生成', icon: FileText },
                    { href: '/docs/resume-analyzer', label: '简历分析', icon: BarChart3 },
                    { href: '/docs/questions', label: '题目练习', icon: HelpCircle },
                ],
            },
            {
                title: '账户管理',
                items: [
                    { href: '/docs/account', label: '账户设置', icon: User },
                ],
            },
        ],
    },
    'en': {
        title: 'Documentation',
        subtitle: 'Learn how to use Jobs AI',
        sections: [
            {
                title: 'Getting Started',
                items: [
                    { href: '/docs', label: 'Introduction', icon: Home },
                    { href: '/docs/quick-start', label: 'Quick Start', icon: Code },
                ],
            },
            {
                title: 'Core Features',
                items: [
                    { href: '/docs/interview', label: 'AI Mock Interview', icon: Target },
                    { href: '/docs/resume-generator', label: 'Resume Generation', icon: FileText },
                    { href: '/docs/resume-analyzer', label: 'Resume Analysis', icon: BarChart3 },
                    { href: '/docs/questions', label: 'Practice Questions', icon: HelpCircle },
                ],
            },
            {
                title: 'Account Management',
                items: [
                    { href: '/docs/account', label: 'Account Settings', icon: User },
                ],
            },
        ],
    },
};

export function DocsSidebar({ locale }: DocsSidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    
    const content = sidebarContent[locale as keyof typeof sidebarContent] || sidebarContent['zh-CN'];
    const { title, subtitle, sections } = content;
    
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const isActive = (href: string) => {
        if (href === '/docs') {
            return pathname === `/${locale}/docs`;
        }
        return pathname?.startsWith(`/${locale}${href}`);
    };

    return (
        <>
            {/* 移动端切换按钮 */}
            <button
                onClick={toggleSidebar}
                className={styles.toggleBtn}
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* 桌面端侧边栏 */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarInner}>
                    {/* 头部 */}
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.subtitle}>{subtitle}</p>
                    </div>

                    {/* 导航 */}
                    <nav className={styles.nav}>
                        {sections.map((section) => (
                            <div key={section.title} className={styles.navSection}>
                                <h3 className={styles.navSectionTitle}>{section.title}</h3>
                                <ul className={styles.navList}>
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={`/${locale}${item.href}`}
                                                className={isActive(item.href) ? styles.navItemActive : styles.navItem}
                                            >
                                                <item.icon className={styles.navIcon} />
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 移动端侧边栏 */}
            {sidebarOpen && (
                <>
                    <div className={styles.overlay} onClick={toggleSidebar} />
                    <aside className={`${styles.sidebarMobile} w-72`}>
                        <div className={styles.header}>
                            <div className={styles.headerTop}>
                                <h2 className={styles.title}>{title}</h2>
                                <button onClick={toggleSidebar} className={styles.closeBtn}>
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>
                            <p className={styles.subtitle}>{subtitle}</p>
                        </div>
                        <nav className={styles.nav}>
                            {sections.map((section) => (
                                <div key={section.title} className={styles.navSection}>
                                    <h3 className={styles.navSectionTitle}>{section.title}</h3>
                                    <ul className={styles.navList}>
                                        {section.items.map((item) => (
                                            <li key={item.href}>
                                                <Link
                                                    href={`/${locale}${item.href}`}
                                                    className={isActive(item.href) ? styles.navItemActive : styles.navItem}
                                                    onClick={toggleSidebar}
                                                >
                                                    <item.icon className={styles.navIcon} />
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </aside>
                </>
            )}
        </>
    );
}
