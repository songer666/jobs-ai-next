'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const styles = {
    header: 'h-16 bg-[#0d0a1f] border-b border-white/10 flex items-center justify-between px-6',
    left: {
        wrapper: 'flex items-center gap-4',
        title: 'text-lg font-medium text-white',
    },
    right: {
        wrapper: 'flex items-center gap-4',
        langBtn: 'text-white/60 hover:text-white text-sm transition-colors',
        notifBtn: 'w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors',
        upgradeBtn: 'gradient-btn text-white text-sm font-medium rounded-full px-4 py-2',
    },
};

export default function DashboardHeader() {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

    const getPageTitle = () => {
        if (pathname.includes('/interview')) return t('dashboard.pages.interview');
        if (pathname.includes('/resume')) return t('dashboard.pages.resume');
        if (pathname.includes('/questions')) return t('dashboard.pages.questions');
        if (pathname.includes('/settings')) return t('dashboard.pages.settings');
        if (pathname.includes('/billing')) return t('dashboard.pages.billing');
        return t('dashboard.pages.overview');
    };

    const toggleLocale = () => {
        const currentLocale = pathname.split('/')[1];
        const newLocale = currentLocale === 'zh-CN' ? 'en' : 'zh-CN';
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <header className={styles.header}>
            <div className={styles.left.wrapper}>
                <h1 className={styles.left.title}>{getPageTitle()}</h1>
            </div>

            <div className={styles.right.wrapper}>
                <button onClick={toggleLocale} className={styles.right.langBtn}>
                    {pathname.includes('/zh-CN') ? 'EN' : '中文'}
                </button>
                <button className={styles.right.notifBtn}>
                    🔔
                </button>
                <Button className={styles.right.upgradeBtn}>
                    {t('dashboard.upgrade')}
                </Button>
            </div>
        </header>
    );
}
