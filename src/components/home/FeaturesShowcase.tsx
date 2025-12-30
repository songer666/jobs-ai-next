'use client';

import { useTranslations } from 'next-intl';
import { Button, Link } from '@heroui/react';

const styles = {
    section: 'py-24 px-4 bg-[#0b081a]',
    container: 'max-w-[1400px] mx-auto',
    header: {
        wrapper: 'text-center mb-20',
        badge: 'inline-block gradient-btn text-white text-sm font-medium px-4 py-2 rounded-full mb-6',
        title: 'text-4xl md:text-5xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60 max-w-2xl mx-auto',
    },
    features: {
        grid: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
        card: 'glass-card p-8 md:p-10 rounded-3xl group hover:border-primary/30 transition-all duration-300',
        cardHeader: 'flex items-start gap-4 mb-6',
        cardIcon: 'w-16 h-16 rounded-2xl gradient-btn flex items-center justify-center flex-shrink-0',
        cardIconText: 'text-3xl',
        cardInfo: 'flex-1',
        cardTitle: 'text-2xl font-bold text-white mb-2',
        cardDesc: 'text-white/60',
        cardFeatures: 'space-y-4 mb-8',
        cardFeatureItem: 'flex items-start gap-3',
        cardFeatureIcon: 'w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5',
        cardFeatureCheck: 'text-primary text-sm',
        cardFeatureText: 'text-white/80',
        cardBtn: 'gradient-btn text-white font-medium rounded-full px-8 py-3 group-hover:scale-105 transition-transform',
    },
    demo: {
        wrapper: 'mt-20 glass-card p-8 md:p-12 rounded-3xl',
        grid: 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
        content: 'space-y-6',
        title: 'text-3xl md:text-4xl font-bold text-white',
        desc: 'text-lg text-white/60',
        featureList: 'space-y-3',
        featureItem: 'flex items-center gap-3',
        featureDot: 'w-2 h-2 bg-primary rounded-full flex-shrink-0',
        featureText: 'text-white/80',
        preview: 'relative',
        previewCard: 'bg-white/5 rounded-2xl p-6 border border-white/10',
        previewHeader: 'flex items-center gap-4 mb-4',
        previewAvatar: 'w-12 h-12 rounded-full gradient-btn flex items-center justify-center',
        previewAvatarIcon: 'text-xl',
        previewInfo: 'flex-1',
        previewName: 'text-white font-medium',
        previewRole: 'text-white/60 text-sm',
        previewChat: 'space-y-3',
        previewMsg: 'p-3 rounded-xl text-sm',
        previewMsgAi: 'bg-white/10 text-white',
        previewMsgUser: 'bg-primary text-black ml-8',
    },
    cta: {
        wrapper: 'mt-20 text-center',
        title: 'text-3xl md:text-4xl font-bold text-white mb-4',
        subtitle: 'text-lg text-white/60 mb-8',
        btn: 'gradient-btn text-white font-semibold rounded-full px-10 py-4 text-lg',
    },
};

export default function FeaturesShowcase() {
    const t = useTranslations('showcase');

    const features = [
        {
            icon: '🎯',
            title: t('interview.title'),
            desc: t('interview.desc'),
            items: [
                t('interview.feature1'),
                t('interview.feature2'),
                t('interview.feature3'),
                t('interview.feature4'),
            ],
            btnText: t('interview.btn'),
            href: '/register',
        },
        {
            icon: '📝',
            title: t('resume.title'),
            desc: t('resume.desc'),
            items: [
                t('resume.feature1'),
                t('resume.feature2'),
                t('resume.feature3'),
                t('resume.feature4'),
            ],
            btnText: t('resume.btn'),
            href: '/register',
        },
        {
            icon: '💻',
            title: t('technical.title'),
            desc: t('technical.desc'),
            items: [
                t('technical.feature1'),
                t('technical.feature2'),
                t('technical.feature3'),
                t('technical.feature4'),
            ],
            btnText: t('technical.btn'),
            href: '/register',
        },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <span className={styles.header.badge}>{t('badge')}</span>
                    <h2 className={styles.header.title}>{t('title')}</h2>
                    <p className={styles.header.subtitle}>{t('subtitle')}</p>
                </div>

                {/* Feature Cards */}
                <div className={styles.features.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.features.card}>
                            <div className={styles.features.cardHeader}>
                                <div className={styles.features.cardIcon}>
                                    <span className={styles.features.cardIconText}>{feature.icon}</span>
                                </div>
                                <div className={styles.features.cardInfo}>
                                    <h3 className={styles.features.cardTitle}>{feature.title}</h3>
                                    <p className={styles.features.cardDesc}>{feature.desc}</p>
                                </div>
                            </div>
                            <div className={styles.features.cardFeatures}>
                                {feature.items.map((item, i) => (
                                    <div key={i} className={styles.features.cardFeatureItem}>
                                        <div className={styles.features.cardFeatureIcon}>
                                            <span className={styles.features.cardFeatureCheck}>✓</span>
                                        </div>
                                        <span className={styles.features.cardFeatureText}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href={feature.href} underline="none">
                                <Button className={styles.features.cardBtn}>
                                    {feature.btnText}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Demo Preview */}
                <div className={styles.demo.wrapper}>
                    <div className={styles.demo.grid}>
                        <div className={styles.demo.content}>
                            <h3 className={styles.demo.title}>{t('demo.title')}</h3>
                            <p className={styles.demo.desc}>{t('demo.desc')}</p>
                            <div className={styles.demo.featureList}>
                                <div className={styles.demo.featureItem}>
                                    <div className={styles.demo.featureDot}></div>
                                    <span className={styles.demo.featureText}>{t('demo.feature1')}</span>
                                </div>
                                <div className={styles.demo.featureItem}>
                                    <div className={styles.demo.featureDot}></div>
                                    <span className={styles.demo.featureText}>{t('demo.feature2')}</span>
                                </div>
                                <div className={styles.demo.featureItem}>
                                    <div className={styles.demo.featureDot}></div>
                                    <span className={styles.demo.featureText}>{t('demo.feature3')}</span>
                                </div>
                                <div className={styles.demo.featureItem}>
                                    <div className={styles.demo.featureDot}></div>
                                    <span className={styles.demo.featureText}>{t('demo.feature4')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.demo.preview}>
                            <div className={styles.demo.previewCard}>
                                <div className={styles.demo.previewHeader}>
                                    <div className={styles.demo.previewAvatar}>
                                        <span className={styles.demo.previewAvatarIcon}>🤖</span>
                                    </div>
                                    <div className={styles.demo.previewInfo}>
                                        <div className={styles.demo.previewName}>{t('demo.chat.aiName')}</div>
                                        <div className={styles.demo.previewRole}>{t('demo.chat.role')}</div>
                                    </div>
                                </div>
                                <div className={styles.demo.previewChat}>
                                    <div className={`${styles.demo.previewMsg} ${styles.demo.previewMsgAi}`}>
                                        {t('demo.chat.msg1')}
                                    </div>
                                    <div className={`${styles.demo.previewMsg} ${styles.demo.previewMsgUser}`}>
                                        {t('demo.chat.msg2')}
                                    </div>
                                    <div className={`${styles.demo.previewMsg} ${styles.demo.previewMsgAi}`}>
                                        {t('demo.chat.msg3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.cta.wrapper}>
                    <h3 className={styles.cta.title}>{t('cta.title')}</h3>
                    <p className={styles.cta.subtitle}>{t('cta.subtitle')}</p>
                    <Link href="/pricing" underline="none">
                        <Button className={styles.cta.btn}>{t('cta.btn')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
