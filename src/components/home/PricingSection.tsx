'use client';

import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

const styles = {
    section: 'py-24 px-4 bg-[#0b081a]',
    container: 'max-w-[1400px] mx-auto',
    header: {
        wrapper: 'text-center mb-16',
        title: 'text-4xl md:text-5xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60',
    },
    toggle: {
        wrapper: 'flex items-center justify-center gap-4 mb-12',
        btn: 'px-6 py-2 rounded-full text-lg transition-colors',
        active: 'bg-primary text-black font-medium',
        inactive: 'text-white/60 hover:text-white',
    },
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    card: {
        base: 'rounded-3xl p-8 border transition-transform hover:scale-105',
        default: 'bg-white/5 border-white/10',
        popular: 'bg-white border-primary relative',
        badge: 'absolute -top-4 left-1/2 -translate-x-1/2 gradient-btn text-white text-sm font-medium px-4 py-1 rounded-full',
    },
    plan: {
        name: 'text-xl font-medium mb-4',
        nameLight: 'text-white',
        nameDark: 'text-black',
        price: 'text-5xl font-bold mb-1',
        priceLight: 'text-white',
        priceDark: 'text-black',
        period: 'text-lg',
        periodLight: 'text-white/60',
        periodDark: 'text-black/60',
    },
    features: {
        list: 'mt-8 mb-8 space-y-4',
        item: 'flex items-center gap-3',
        iconLight: 'w-5 h-5 text-primary',
        iconDark: 'w-5 h-5 text-accent-pink',
        textLight: 'text-white/80',
        textDark: 'text-black/80',
    },
    cta: {
        light: 'w-full py-4 rounded-full font-medium border-2 border-white/20 text-white hover:bg-white/10',
        dark: 'w-full py-4 rounded-full font-medium gradient-btn text-white',
    },
};

export default function PricingSection() {
    const t = useTranslations();

    const freeFeatures = t.raw('pricing.free.features') as string[];
    const proFeatures = t.raw('pricing.pro.features') as string[];
    const enterpriseFeatures = t.raw('pricing.enterprise.features') as string[];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <h2 className={styles.header.title}>{t('pricing.title')}</h2>
                    <p className={styles.header.subtitle}>{t('pricing.subtitle')}</p>
                </div>

                {/* Toggle */}
                <div className={styles.toggle.wrapper}>
                    <button className={`${styles.toggle.btn} ${styles.toggle.active}`}>
                        {t('pricing.monthly')}
                    </button>
                    <button className={`${styles.toggle.btn} ${styles.toggle.inactive}`}>
                        {t('pricing.yearly')}
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className={styles.grid}>
                    {/* Free Plan */}
                    <div className={`${styles.card.base} ${styles.card.default}`}>
                        <div className={`${styles.plan.name} ${styles.plan.nameLight}`}>
                            {t('pricing.free.name')}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className={`${styles.plan.price} ${styles.plan.priceLight}`}>
                                {t('pricing.free.price')}
                            </span>
                            <span className={`${styles.plan.period} ${styles.plan.periodLight}`}>
                                {t('pricing.free.period')}
                            </span>
                        </div>
                        <ul className={styles.features.list}>
                            {freeFeatures.map((feature, index) => (
                                <li key={index} className={styles.features.item}>
                                    <svg className={styles.features.iconLight} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                    <span className={styles.features.textLight}>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="ghost" className={styles.cta.light}>
                            {t('pricing.cta')}
                        </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className={`${styles.card.base} ${styles.card.popular}`}>
                        <span className={styles.card.badge}>{t('pricing.pro.popular')}</span>
                        <div className={`${styles.plan.name} ${styles.plan.nameDark}`}>
                            {t('pricing.pro.name')}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className={`${styles.plan.price} ${styles.plan.priceDark}`}>
                                {t('pricing.pro.price')}
                            </span>
                            <span className={`${styles.plan.period} ${styles.plan.periodDark}`}>
                                {t('pricing.pro.period')}
                            </span>
                        </div>
                        <ul className={styles.features.list}>
                            {proFeatures.map((feature, index) => (
                                <li key={index} className={styles.features.item}>
                                    <svg className={styles.features.iconDark} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                    <span className={styles.features.textDark}>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button className={styles.cta.dark}>
                            {t('pricing.cta')}
                        </Button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className={`${styles.card.base} ${styles.card.default}`}>
                        <div className={`${styles.plan.name} ${styles.plan.nameLight}`}>
                            {t('pricing.enterprise.name')}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className={`${styles.plan.price} ${styles.plan.priceLight}`}>
                                {t('pricing.enterprise.price')}
                            </span>
                            <span className={`${styles.plan.period} ${styles.plan.periodLight}`}>
                                {t('pricing.enterprise.period')}
                            </span>
                        </div>
                        <ul className={styles.features.list}>
                            {enterpriseFeatures.map((feature, index) => (
                                <li key={index} className={styles.features.item}>
                                    <svg className={styles.features.iconLight} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                    <span className={styles.features.textLight}>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="ghost" className={styles.cta.light}>
                            {t('pricing.cta')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
