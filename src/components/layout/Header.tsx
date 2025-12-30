'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import UserMenu from './UserMenu';
import {useCurrentSession} from "@/api/auth";

const styles = {
    header: 'fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1695px]',
    nav: 'flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-90',
    logo: {
        container: 'flex items-center gap-2 md:gap-3',
        icon: 'w-7 h-7 md:w-9 md:h-9 flex items-center justify-center',
        text: 'text-lg md:text-xl font-bold text-white tracking-wide',
    },
    menu: {
        container: 'hidden md:flex items-center gap-4 lg:gap-10',
        link: 'text-white text-lg hover:text-primary hover:underline transition-colors',
        linkActive: 'text-primary text-lg no-underline transition-colors',
    },
    actions: {
        container: 'hidden md:flex items-center gap-3',
        langSwitcher: 'hidden lg:flex items-center gap-1',
        langActive: 'px-2 py-1 text-sm text-primary font-medium',
        langInactive: 'px-2 py-1 text-sm text-white/60 hover:text-white transition-colors',
        langDivider: 'text-white/30 text-sm',
        langSingle: 'hidden md:flex lg:hidden items-center px-2 py-1 text-sm text-white/60 hover:text-white transition-colors',
        startBtn: 'flex items-center gap-2 bg-primary text-black font-bold rounded-full px-6 h-11 border-2 border-white hover:bg-primary/90',
        startIcon: 'w-4 h-4',
    },
    mobile: {
        menuBtn: 'md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10',
        menuIcon: 'w-5 h-5 text-white',
        dropdown: 'absolute top-full left-0 right-0 mt-2 mx-2 rounded-2xl bg-black/90 backdrop-blur-md border border-white/10 overflow-hidden',
        dropdownInner: 'p-4 space-y-2',
        dropdownLink: 'block px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors',
        dropdownDivider: 'h-px bg-white/10 my-2',
        dropdownLang: 'flex items-center justify-center py-3',
        dropdownLangBtn: 'flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors',
        dropdownActions: 'pt-2',
        dropdownStartBtn: 'w-full flex items-center justify-center gap-2 bg-primary text-black font-bold rounded-full h-11 border-2 border-white hover:bg-primary/90',
    },
};

export default function Header() {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session } = useCurrentSession();
    const isLoggedIn = !!session?.user;



    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/docs', label: t('nav.docs') },
        { href: '/pricing', label: t('nav.pricing') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Logo */}
                <div className={styles.logo.container}>
                    <div className={styles.logo.icon}>
                        <svg viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 4C8 4 4 8 4 14C4 20 8 24 14 24H20C26 24 30 20 30 14C30 8 26 4 20 4" stroke="#ffda52" strokeWidth="3" strokeLinecap="round"/>
                            <circle cx="12" cy="14" r="2" fill="#ffda52"/>
                            <circle cx="22" cy="14" r="2" fill="#ffda52"/>
                            <path d="M14 18C14 18 17 21 20 18" stroke="#ffda52" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span className={styles.logo.text}>Jobs AI</span>
                </div>

                {/* Desktop Navigation */}
                <div className={styles.menu.container}>
                    {navLinks.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={isActive ? styles.menu.linkActive : styles.menu.link}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions */}
                <div className={styles.actions.container}>
                    {/* Language Switcher - lg以上显示 中 | en */}
                    <div className={styles.actions.langSwitcher}>
                        <button
                            type="button"
                            onClick={() => handleLocaleChange('zh-CN')}
                            className={locale === 'zh-CN' ? styles.actions.langActive : styles.actions.langInactive}
                        >
                            中
                        </button>
                        <span className={styles.actions.langDivider}>|</span>
                        <button
                            type="button"
                            onClick={() => handleLocaleChange('en')}
                            className={locale === 'en' ? styles.actions.langActive : styles.actions.langInactive}
                        >
                            en
                        </button>
                    </div>

                    {/* Language Switcher - md-lg显示单个切换按钮 */}
                    <button
                        type="button"
                        onClick={() => handleLocaleChange(locale === 'zh-CN' ? 'en' : 'zh-CN')}
                        className={styles.actions.langSingle}
                    >
                        {locale === 'zh-CN' ? 'en' : '中'}
                    </button>

                    {/* Get Start Button or User Menu */}
                    {isLoggedIn ? (
                        <UserMenu />
                    ) : (
                        <Link href="/login" className="no-underline">
                            <Button className={styles.actions.startBtn}>
                                <span>{t('nav.getStart')}</span>
                                <svg className={styles.actions.startIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile: Menu Button (left) + Avatar/Start Button (right) */}
                <div className="md:hidden flex items-center gap-2">
                    {/* Mobile User Avatar or Start Button */}
                    {isLoggedIn ? (
                        <UserMenu />
                    ) : (
                        <Link href="/login" className="no-underline">
                            <Button className="flex items-center gap-1.5 bg-primary text-black font-bold rounded-full px-4 h-9 border-2 border-white hover:bg-primary/90 text-sm">
                                <span>{t('nav.getStart')}</span>
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobile.menuBtn}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className={styles.mobile.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className={styles.mobile.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobile.dropdown}>
                    <div className={styles.mobile.dropdownInner}>
                        {navLinks.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.mobile.dropdownLink} ${isActive ? 'text-primary' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className={styles.mobile.dropdownDivider} />

                        {/* Mobile Language Switcher - 切换语言按钮 */}
                        <div className={styles.mobile.dropdownLang}>
                            <button
                                type="button"
                                onClick={() => {
                                    handleLocaleChange(locale === 'zh-CN' ? 'en' : 'zh-CN');
                                    setMobileMenuOpen(false);
                                }}
                                className={styles.mobile.dropdownLangBtn}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <span>{t('nav.switchLang')}: {locale === 'zh-CN' ? 'English' : '中文'}</span>
                            </button>
                        </div>

                        {isLoggedIn && (
                            <>
                                <div className={styles.mobile.dropdownDivider} />
                                <Link
                                    href="/dashboard"
                                    className={styles.mobile.dropdownLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('nav.dashboard')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
