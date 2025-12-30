'use client';

import { useTranslations } from 'next-intl';

const styles = {
    section: 'py-24 px-4 relative bg-[#0b081a]',
    container: 'max-w-[1400px] mx-auto',
    header: {
        wrapper: 'text-center mb-16',
        title: 'text-4xl md:text-5xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60',
    },
    tools: {
        wrapper: 'mb-20',
        item: 'flex flex-col md:flex-row items-start gap-8 py-12 border-b border-white/10',
        number: 'text-6xl font-bold gradient-text',
        content: 'flex-1',
        title: 'text-2xl font-bold text-white mb-3',
        description: 'text-white/60 text-lg max-w-xl',
        btn: 'gradient-btn text-white font-medium rounded-full px-8 py-3 mt-4',
    },
    stats: {
        grid: 'grid grid-cols-1 md:grid-cols-3 gap-8 text-center',
        item: 'py-8',
        number: 'text-5xl md:text-6xl font-bold gradient-text mb-2',
        label: 'text-lg text-white/60',
    },
};

export default function ToolsSection() {
    const t = useTranslations();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <h2 className={styles.header.title}>{t('tools.title')}</h2>
                    <p className={styles.header.subtitle}>{t('tools.subtitle')}</p>
                </div>

                {/* Tools List */}
                <div className={styles.tools.wrapper}>
                    {/* Tool 1 */}
                    <div className={styles.tools.item}>
                        <span className={styles.tools.number}>{t('tools.tool1.number')}</span>
                        <div className={styles.tools.content}>
                            <h3 className={styles.tools.title}>{t('tools.tool1.title')}</h3>
                            <p className={styles.tools.description}>{t('tools.tool1.description')}</p>
                        </div>
                    </div>

                    {/* Tool 2 */}
                    <div className={styles.tools.item}>
                        <span className={styles.tools.number}>{t('tools.tool2.number')}</span>
                        <div className={styles.tools.content}>
                            <h3 className={styles.tools.title}>{t('tools.tool2.title')}</h3>
                            <p className={styles.tools.description}>{t('tools.tool2.description')}</p>
                        </div>
                    </div>

                    {/* Tool 3 */}
                    <div className={styles.tools.item}>
                        <span className={styles.tools.number}>{t('tools.tool3.number')}</span>
                        <div className={styles.tools.content}>
                            <h3 className={styles.tools.title}>{t('tools.tool3.title')}</h3>
                            <p className={styles.tools.description}>{t('tools.tool3.description')}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.stats.grid}>
                    <div className={styles.stats.item}>
                        <div className={styles.stats.number}>{t('stats.users')}</div>
                        <div className={styles.stats.label}>{t('stats.usersLabel')}</div>
                    </div>
                    <div className={styles.stats.item}>
                        <div className={styles.stats.number}>{t('stats.interviews')}</div>
                        <div className={styles.stats.label}>{t('stats.interviewsLabel')}</div>
                    </div>
                    <div className={styles.stats.item}>
                        <div className={styles.stats.number}>{t('stats.offers')}</div>
                        <div className={styles.stats.label}>{t('stats.offersLabel')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
