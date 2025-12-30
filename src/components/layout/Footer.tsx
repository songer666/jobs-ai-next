'use client';

import { Link } from '@heroui/react';
import { useTranslations } from 'next-intl';

const styles = {
    footer: 'w-full bg-[#0b081a]',
    container: 'max-w-[1420px] mx-auto px-4 py-16',
    subscribe: {
        wrapper: 'mb-16',
        title: 'text-4xl md:text-5xl font-bold text-white mb-8',
        form: 'glass-card p-4 flex items-center max-w-[481px]',
        input: 'flex-1 bg-transparent text-white placeholder-white/50 outline-none px-4',
        button: 'gradient-btn text-white p-3 rounded-full hover:opacity-90 transition-opacity',
    },
    links: {
        grid: 'grid grid-cols-2 md:grid-cols-4 gap-8 mb-16',
        sectionTitle: 'text-white font-semibold mb-4',
        list: 'space-y-3',
        link: 'text-white/60 hover:text-white text-sm transition-colors',
    },
    contact: {
        info: 'space-y-3 text-white/60 text-sm leading-relaxed',
        socialWrapper: 'flex gap-3 mt-6',
        socialPrimary: 'w-14 h-14 rounded-full gradient-btn flex items-center justify-center hover:opacity-80 transition-opacity',
        socialSecondary: 'w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors',
    },
    bottom: {
        wrapper: 'border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4',
        text: 'text-white/60 text-sm',
        brand: 'text-white font-bold',
    },
};

export default function Footer() {
    const t = useTranslations();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Subscribe Section */}
                <div className={styles.subscribe.wrapper}>
                    <h2 className={styles.subscribe.title}>{t('footer.subscribeTitle')}</h2>
                    <div className={styles.subscribe.form}>
                        <input
                            type="email"
                            placeholder={t('footer.emailPlaceholder')}
                            className={styles.subscribe.input}
                        />
                        <button className={styles.subscribe.button}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Links Grid */}
                <div className={styles.links.grid}>
                    {/* About */}
                    <div>
                        <h3 className={styles.links.sectionTitle}>{t('footer.about')}</h3>
                        <ul className={styles.links.list}>
                            <li><Link href="#" className={styles.links.link}>{t('footer.aboutUs')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.features')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.news')}</Link></li>
                        </ul>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className={styles.links.sectionTitle}>{t('footer.menu')}</h3>
                        <ul className={styles.links.list}>
                            <li><Link href="#" className={styles.links.link}>{t('footer.interview')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.resume')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.questions')}</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className={styles.links.sectionTitle}>{t('footer.support')}</h3>
                        <ul className={styles.links.list}>
                            <li><Link href="#" className={styles.links.link}>{t('footer.account')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.supportCenter')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.feedback')}</Link></li>
                            <li><Link href="#" className={styles.links.link}>{t('footer.contactUs')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className={styles.links.sectionTitle}>{t('footer.getInTouch')}</h3>
                        <div className={styles.contact.info}>
                            <p>{t('footer.address')}</p>
                            <p>{t('footer.phone')}</p>
                            <p>{t('footer.email')}</p>
                        </div>
                        {/* Social Icons */}
                        <div className={styles.contact.socialWrapper}>
                            <a href="#" className={styles.contact.socialPrimary}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.contact.socialSecondary}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.contact.socialSecondary}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom.wrapper}>
                    <p className={styles.bottom.text}>
                        <span className={styles.bottom.brand}>@2024 Jobs AI</span>. {t('footer.copyright')}
                    </p>
                    <p className={styles.bottom.text}>Demo · Partners · Careers</p>
                </div>
            </div>
        </footer>
    );
}
