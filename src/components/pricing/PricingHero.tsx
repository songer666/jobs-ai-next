'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

const styles = {
    section: 'relative pt-40 pb-24 px-4 overflow-hidden',
    bgRadial: 'absolute top-[100px] left-1/2 -translate-x-1/2 w-[1800px] h-[600px] bg-gradient-radial mix-blend-overlay',
    container: 'relative max-w-[1200px] mx-auto z-10',
    header: {
        wrapper: 'text-center mb-12',
        badge: 'inline-block gradient-btn text-white text-sm font-medium px-4 py-2 rounded-full mb-6',
        title: 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60',
    },
    toggle: {
        wrapper: 'flex items-center justify-center gap-4 mb-12',
        btn: 'px-6 py-2 rounded-full text-lg transition-colors',
        active: 'bg-primary text-black font-medium',
        inactive: 'text-white/60 hover:text-white',
        save: 'text-sm text-primary ml-2',
    },
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    card: {
        base: 'rounded-3xl p-8 border transition-all hover:scale-105',
        default: 'bg-white/5 border-white/10',
        popular: 'bg-white border-primary relative scale-105',
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
        description: 'text-sm mt-4 mb-6',
        descLight: 'text-white/60',
        descDark: 'text-black/60',
    },
    features: {
        list: 'space-y-4 mb-8',
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
    faq: {
        wrapper: 'mt-20',
        title: 'text-2xl font-bold text-white text-center mb-8',
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
        item: 'glass-card-sm p-6',
        question: 'text-lg font-medium text-white mb-2',
        answer: 'text-white/60',
    },
};

export default function PricingHero() {
    const t = useTranslations();
    const [isYearly, setIsYearly] = useState(false);

    const freeFeatures = t.raw('pricing.free.features') as string[];
    const proFeatures = t.raw('pricing.pro.features') as string[];
    const enterpriseFeatures = t.raw('pricing.enterprise.features') as string[];

    const faqs = [
        { q: t('faq.q1.question'), a: t('faq.q1.answer') },
        { q: t('faq.q2.question'), a: t('faq.q2.answer') },
        { q: t('faq.q3.question'), a: t('faq.q3.answer') },
        { q: t('faq.q4.question'), a: t('faq.q4.answer') },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.bgRadial} />
            
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <span className={styles.header.badge}>定价方案</span>
                    <h1 className={styles.header.title}>{t('pricing.title')}</h1>
                    <p className={styles.header.subtitle}>{t('pricing.subtitle')}</p>
                </div>

                {/* Toggle */}
                <div className={styles.toggle.wrapper}>
                    <button 
                        className={`${styles.toggle.btn} ${!isYearly ? styles.toggle.active : styles.toggle.inactive}`}
                        onClick={() => setIsYearly(false)}
                    >
                        {t('pricing.monthly')}
                    </button>
                    <button 
                        className={`${styles.toggle.btn} ${isYearly ? styles.toggle.active : styles.toggle.inactive}`}
                        onClick={() => setIsYearly(true)}
                    >
                        {t('pricing.yearly')}
                        <span className={styles.toggle.save}>省20%</span>
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
                        <p className={`${styles.plan.description} ${styles.plan.descLight}`}>
                            适合初次体验的用户
                        </p>
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
                                {isYearly ? '¥23' : t('pricing.pro.price')}
                            </span>
                            <span className={`${styles.plan.period} ${styles.plan.periodDark}`}>
                                {t('pricing.pro.period')}
                            </span>
                        </div>
                        <p className={`${styles.plan.description} ${styles.plan.descDark}`}>
                            适合求职中的用户
                        </p>
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
                                {isYearly ? '¥79' : t('pricing.enterprise.price')}
                            </span>
                            <span className={`${styles.plan.period} ${styles.plan.periodLight}`}>
                                {t('pricing.enterprise.period')}
                            </span>
                        </div>
                        <p className={`${styles.plan.description} ${styles.plan.descLight}`}>
                            适合企业和团队使用
                        </p>
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

                {/* FAQ */}
                <div className={styles.faq.wrapper}>
                    <h2 className={styles.faq.title}>常见问题</h2>
                    <div className={styles.faq.grid}>
                        {faqs.map((faq, index) => (
                            <div key={index} className={styles.faq.item}>
                                <h3 className={styles.faq.question}>{faq.q}</h3>
                                <p className={styles.faq.answer}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
