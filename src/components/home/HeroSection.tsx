'use client';

import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const styles = {
    section: 'relative pt-40 pb-20 px-4 overflow-hidden',
    bgImage: 'absolute inset-0 bg-gray-500/20 h-[1034px]',
    bgGradient: 'absolute bottom-0 left-0 right-0 h-[306px] bg-gradient-to-t from-[#0b081a] to-transparent',
    bgRadial: 'absolute top-[200px] left-1/2 -translate-x-1/2 w-[1800px] h-[783px] bg-gradient-radial mix-blend-overlay',
    container: 'relative max-w-[1560px] mx-auto z-10',
    hero: {
        wrapper: 'text-center mb-12',
        title: 'text-5xl md:text-7xl lg:text-[100px] font-black italic text-white leading-tight tracking-tight mb-6',
        subtitle: 'text-xl md:text-[28px] text-white max-w-3xl mx-auto mb-10 leading-relaxed',
    },
    input: {
        wrapper: 'max-w-[1005px] mx-auto mb-4',
        container: 'flex items-center bg-white rounded-2xl h-[90px] px-6 gap-4',
        field: 'flex-1 text-lg text-black placeholder:text-black/50 italic bg-transparent outline-none',
        btn: 'gradient-btn text-white font-semibold uppercase tracking-wider rounded-xl px-8 h-[58px] flex items-center gap-3',
        btnIcon: 'w-7 h-7',
    },
    tags: {
        wrapper: 'text-center mb-16',
        text: 'text-xl text-white',
        muted: 'text-white/40',
    },
    features: {
        grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        card: 'glass-card-sm p-8 shadow-[0px_-25px_50px_20px_rgba(0,0,0,0.02)]',
        iconWrapper: 'w-12 h-12 mb-6',
        title: 'text-2xl font-bold italic text-white mb-3 leading-relaxed',
        description: 'text-white/70 text-base leading-relaxed',
    },
};

export default function HeroSection() {
    const t = useTranslations();
    const router = useRouter();

    const handleStartInterview = () => {
        // 直接跳转到面试页面，让 AuthGuard 处理鉴权
        router.push('/dashboard/interview');
    };

    return (
        <section className={styles.section}>
            {/* Background */}
            <div className={styles.bgImage} />
            <div className={styles.bgRadial} />
            <div className={styles.bgGradient} />

            <div className={styles.container}>
                {/* Hero Title */}
                <div className={styles.hero.wrapper}>
                    <h1 className={styles.hero.title}>
                        <span>{t('hero.title1')}</span>
                        <br />
                        <span>{t('hero.title2')}</span>
                    </h1>
                    <p className={styles.hero.subtitle}>{t('hero.subtitle')}</p>
                </div>

                {/* Search Input */}
                <div className={styles.input.wrapper}>
                    <div className={styles.input.container}>
                        <input
                            type="text"
                            placeholder={t('hero.inputPlaceholder')}
                            className={styles.input.field}
                            readOnly
                        />
                        <Button className={styles.input.btn} onClick={handleStartInterview}>
                            {t('hero.startBtn')}
                            <svg className={styles.input.btnIcon} viewBox="0 0 29 28" fill="none">
                                <path d="M14.5 2L26.5 14L14.5 26M26.5 14H2.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Popular Tags */}
                <div className={styles.tags.wrapper}>
                    <p className={styles.tags.text}>
                        <span className={styles.tags.muted}>{t('hero.popularTags')}</span>
                        <span> {t('hero.tags')}</span>
                    </p>
                </div>

                {/* Feature Cards */}
                <div className={styles.features.grid}>
                    {/* Card 1 - AI Mock Interview */}
                    <div className={styles.features.card}>
                        <div className={styles.features.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round"/>
                                <circle cx="16" cy="20" r="3" fill="url(#grad1)"/>
                                <circle cx="32" cy="20" r="3" fill="url(#grad1)"/>
                                <path d="M16 30C16 30 20 36 24 36C28 36 32 30 32 30" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M38 4V16M32 10H44" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round"/>
                                <defs>
                                    <linearGradient id="grad1" x1="0" y1="0" x2="48" y2="48">
                                        <stop stopColor="#fd409a"/>
                                        <stop offset="1" stopColor="#f5a867"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h3 className={styles.features.title}>{t('features.card1.title')}</h3>
                        <p className={styles.features.description}>{t('features.card1.description')}</p>
                    </div>

                    {/* Card 2 - Resume Optimization */}
                    <div className={styles.features.card}>
                        <div className={styles.features.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect x="8" y="4" width="32" height="40" rx="4" stroke="url(#grad2)" strokeWidth="3"/>
                                <path d="M16 14H32M16 22H28M16 30H24" stroke="url(#grad2)" strokeWidth="3" strokeLinecap="round"/>
                                <circle cx="38" cy="38" r="8" fill="url(#grad2)"/>
                                <path d="M35 38L37 40L41 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <defs>
                                    <linearGradient id="grad2" x1="0" y1="0" x2="48" y2="48">
                                        <stop stopColor="#fd409a"/>
                                        <stop offset="1" stopColor="#f5a867"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h3 className={styles.features.title}>{t('features.card2.title')}</h3>
                        <p className={styles.features.description}>{t('features.card2.description')}</p>
                    </div>

                    {/* Card 3 - Practice Questions */}
                    <div className={styles.features.card}>
                        <div className={styles.features.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect x="4" y="8" width="40" height="32" rx="4" stroke="url(#grad3)" strokeWidth="3"/>
                                <path d="M4 16H44" stroke="url(#grad3)" strokeWidth="3"/>
                                <circle cx="10" cy="12" r="2" fill="url(#grad3)"/>
                                <circle cx="16" cy="12" r="2" fill="url(#grad3)"/>
                                <circle cx="22" cy="12" r="2" fill="url(#grad3)"/>
                                <path d="M14 26L20 32L34 22" stroke="url(#grad3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <defs>
                                    <linearGradient id="grad3" x1="0" y1="0" x2="48" y2="48">
                                        <stop stopColor="#fd409a"/>
                                        <stop offset="1" stopColor="#f5a867"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h3 className={styles.features.title}>{t('features.card3.title')}</h3>
                        <p className={styles.features.description}>{t('features.card3.description')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
