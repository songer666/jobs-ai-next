'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Target, BookOpen, Settings, CreditCard, Crosshair, Sparkles, BarChart3 } from 'lucide-react';
import { useSidebar } from './SidebarContext';

const styles = {
    nav: {
        wrapper: 'flex-1 py-4',
        section: 'mb-6',
        sectionTitle: 'px-6 text-xs font-medium text-white/40 uppercase tracking-wider mb-2',
        sectionTitleCollapsed: 'px-3 text-xs font-medium text-white/40 uppercase tracking-wider mb-2 text-center',
        list: 'space-y-1',
        item: 'flex items-center gap-3 px-6 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors',
        itemCollapsed: 'flex items-center justify-center px-3 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors',
        itemActive: 'flex items-center gap-3 px-6 py-3 text-white bg-white/10 border-r-2 border-primary',
        itemActiveCollapsed: 'flex items-center justify-center px-3 py-3 text-white bg-white/10 border-r-2 border-primary',
        icon: 'w-5 h-5',
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

export default function SidebarNav() {
    const t = useTranslations();
    const pathname = usePathname();
    const { isCollapsed } = useSidebar();

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname.endsWith('/dashboard');
        }
        return pathname.includes(href);
    };

    const getItemClass = (href: string) => {
        const active = isActive(href);
        if (isCollapsed) {
            return active ? styles.nav.itemActiveCollapsed : styles.nav.itemCollapsed;
        }
        return active ? styles.nav.itemActive : styles.nav.item;
    };

    return (
        <nav className={styles.nav.wrapper}>
            <div className={styles.nav.section}>
                {!isCollapsed && (
                    <div className={styles.nav.sectionTitle}>{t('dashboard.nav.main')}</div>
                )}
                <ul className={styles.nav.list}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={getItemClass(item.href)} title={isCollapsed ? t(item.label) : undefined}>
                                <item.icon className={styles.nav.icon} />
                                {!isCollapsed && <span>{t(item.label)}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.nav.section}>
                {!isCollapsed && (
                    <div className={styles.nav.sectionTitle}>{t('dashboard.nav.account')}</div>
                )}
                <ul className={styles.nav.list}>
                    {settingsItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={getItemClass(item.href)} title={isCollapsed ? t(item.label) : undefined}>
                                <item.icon className={styles.nav.icon} />
                                {!isCollapsed && <span>{t(item.label)}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
