'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

const styles = {
    container: 'max-w-[1200px] mx-auto p-4 sm:p-6',
    header: {
        wrapper: 'text-center mb-8 sm:mb-12',
        title: 'text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3',
        subtitle: 'text-base sm:text-lg text-white/60',
    },
    toggle: {
        wrapper: 'flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10',
        btn: 'px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg transition-colors',
        active: 'bg-primary text-black font-medium',
        inactive: 'text-white/60 hover:text-white',
        save: 'text-xs sm:text-sm text-primary ml-2',
    },
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6',
    card: {
        base: 'rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all hover:scale-105',
        default: 'bg-white/5 border-white/10',
        popular: 'bg-white border-primary relative scale-105',
        badge: 'absolute -top-4 left-1/2 -translate-x-1/2 gradient-btn text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full',
    },
    plan: {
        name: 'text-lg sm:text-xl font-medium mb-3 sm:mb-4',
        nameLight: 'text-white',
        nameDark: 'text-black',
        price: 'text-4xl sm:text-5xl font-bold mb-1',
        priceLight: 'text-white',
        priceDark: 'text-black',
        period: 'text-base sm:text-lg',
        periodLight: 'text-white/60',
        periodDark: 'text-black/60',
        description: 'text-xs sm:text-sm mt-3 sm:mt-4 mb-4 sm:mb-6',
        descLight: 'text-white/60',
        descDark: 'text-black/60',
    },
    features: {
        list: 'space-y-3 sm:space-y-4 mb-6 sm:mb-8',
        item: 'flex items-center gap-2 sm:gap-3',
        iconLight: 'w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0',
        iconDark: 'w-4 h-4 sm:w-5 sm:h-5 text-accent-pink shrink-0',
        textLight: 'text-white/80 text-sm sm:text-base',
        textDark: 'text-black/80 text-sm sm:text-base',
    },
    cta: {
        light: 'w-full py-3 sm:py-4 rounded-full font-medium border-2 border-white/20 text-white hover:bg-white/10 text-sm sm:text-base',
        dark: 'w-full py-3 sm:py-4 rounded-full font-medium gradient-btn text-white text-sm sm:text-base',
    },
};

export default function BillingPage() {
    const t = useTranslations();
    const [isYearly, setIsYearly] = useState(false);

    const freeFeatures = t.raw('pricing.free.features') as string[];
    const proFeatures = t.raw('pricing.pro.features') as string[];
    const enterpriseFeatures = t.raw('pricing.enterprise.features') as string[];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header.wrapper}>
                <h1 className={styles.header.title}>订阅管理</h1>
                <p className={styles.header.subtitle}>选择适合你的方案，解锁更多功能</p>
            </div>

            {/* Toggle */}
            <div className={styles.toggle.wrapper}>
                <button 
                    type="button" 
                    onClick={() => setIsYearly(false)}
                    className={`${styles.toggle.btn} ${!isYearly ? styles.toggle.active : styles.toggle.inactive}`}
                >
                    {t('pricing.monthly')}
                </button>
                <button 
                    type="button" 
                    onClick={() => setIsYearly(true)}
                    className={`${styles.toggle.btn} ${isYearly ? styles.toggle.active : styles.toggle.inactive}`}
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
                        当前方案
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
                        升级到专业版
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
                        联系我们
                    </Button>
                </div>
            </div>
        </div>
    );
}
