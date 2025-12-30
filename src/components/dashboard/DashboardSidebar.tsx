'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Target, BookOpen, Settings, CreditCard, Crosshair, Sparkles, BarChart3 } from 'lucide-react';

const styles = {
    sidebar: 'hidden md:flex w-64 bg-[#0d0a1f] border-r border-white/10 flex-col',
    logo: {
        wrapper: 'p-6 border-b border-white/10',
        text: 'text-2xl font-bold text-white',
        highlight: 'gradient-text',
    },
    nav: {
        wrapper: 'flex-1 py-4',
        section: 'mb-6',
        sectionTitle: 'px-6 text-xs font-medium text-white/40 uppercase tracking-wider mb-2',
        list: 'space-y-1',
        item: 'flex items-center gap-3 px-6 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors',
        itemActive: 'flex items-center gap-3 px-6 py-3 text-white bg-white/10 border-r-2 border-primary',
        icon: 'w-5 h-5',
    },
    user: {
        wrapper: 'p-4 border-t border-white/10',
        card: 'flex items-center gap-3 p-3 rounded-xl bg-white/5',
        avatar: 'w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-white font-medium',
        info: 'flex-1 min-w-0',
        name: 'text-sm font-medium text-white truncate',
        plan: 'text-xs text-white/60',
    },
};

const navItems = [
    { icon: Home, label: 'dashboard.nav.overview', href: '/dashboard' },
    { icon: Target, label: 'dashboard.nav.interview', href: '/dashboard/interview' },
    { icon: Sparkles, label: 'dashboard.nav.resumeGenerator', href: '/dashboard/resume-generator' },
    { icon: BarChart3, label: 'dashboard.nav.resumeAnalyzer', href: '/dashboard/resume-analyzer' },
    { icon: BookOpen, label: 'dashboard.nav.questions', href: '/dashboard/questions' },
];

const settingsItems = [
    { icon: Crosshair, label: 'dashboard.nav.goalPosition', href: '/dashboard/goal-position' },
    { icon: Settings, label: 'dashboard.nav.settings', href: '/dashboard/settings' },
    { icon: CreditCard, label: 'dashboard.nav.billing', href: '/dashboard/billing' },
];

export default function DashboardSidebar() {
    const t = useTranslations();
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname.endsWith('/dashboard');
        }
        return pathname.includes(href);
    };

    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.logo.wrapper}>
                <Link href="/" className={styles.logo.text}>
                    Jobs<span className={styles.logo.highlight}>AI</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className={styles.nav.wrapper}>
                <div className={styles.nav.section}>
                    <div className={styles.nav.sectionTitle}>{t('dashboard.nav.main')}</div>
                    <ul className={styles.nav.list}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActive(item.href) ? styles.nav.itemActive : styles.nav.item}
                                >
                                    <item.icon className={styles.nav.icon} />
                                    <span>{t(item.label)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.nav.section}>
                    <div className={styles.nav.sectionTitle}>{t('dashboard.nav.account')}</div>
                    <ul className={styles.nav.list}>
                        {settingsItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActive(item.href) ? styles.nav.itemActive : styles.nav.item}
                                >
                                    <item.icon className={styles.nav.icon} />
                                    <span>{t(item.label)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* User */}
            <div className={styles.user.wrapper}>
                <div className={styles.user.card}>
                    <div className={styles.user.avatar}>U</div>
                    <div className={styles.user.info}>
                        <div className={styles.user.name}>{t('dashboard.user.name')}</div>
                        <div className={styles.user.plan}>{t('dashboard.user.plan')}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
