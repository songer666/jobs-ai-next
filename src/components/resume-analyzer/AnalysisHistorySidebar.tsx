'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import { useAnalyses } from '@/api/resume-analyzer';
import { useDashboardData } from '@/api/dashboard';
import { Loader2, Clock, BarChart3, Plus } from 'lucide-react';
import { useResumeAnalyzerLayout } from '@/app/[locale]/(dashboard)/dashboard/resume-analyzer/layout';
import { useTranslations } from 'next-intl';
import { sidebarStyles as styles } from './styles/sidebar';

function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
    
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

export function AnalysisHistorySidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { sidebarOpen, toggleSidebar, newAnalysisId, clearNewAnalysis } = useResumeAnalyzerLayout();
    const { data: analyses, isLoading } = useAnalyses();
    const { data: dashboardData } = useDashboardData();
    const t = useTranslations('resumeAnalyzer');
    const usage = dashboardData?.usage.analyze;

    const handleNewAnalysis = () => {
        router.push('/dashboard/resume-analyzer');
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    };

    useEffect(() => {
        if (newAnalysisId) {
            const timer = setTimeout(clearNewAnalysis, 3000);
            return () => clearTimeout(timer);
        }
    }, [newAnalysisId, clearNewAnalysis]);

    const currentAnalysisId = pathname.match(/\/resume-analyzer\/([^/]+)/)?.[1];

    return (
        <>
            {sidebarOpen && (
                <div 
                    className={styles.overlay}
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            <div className={`${styles.wrapper} ${sidebarOpen ? styles.wrapperOpen : styles.wrapperClosed}`}>
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className={styles.toggleButton}
                    aria-label={sidebarOpen ? t('history.toggleSidebar.close') : t('history.toggleSidebar.open')}
                >
                    <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <aside className={styles.sidebar}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <h2 className={styles.title}>{t('history.title')}</h2>
                            <button
                                type="button"
                                onClick={handleNewAnalysis}
                                className={styles.newButton}
                                title={t('history.newAnalysis')}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        {usage && (
                            <div className={styles.usage}>
                                <BarChart3 className={styles.usageIcon} />
                                <span>
                                    {t('history.todayRemaining')} <span className={styles.usageCount}>{usage.limit - usage.used}/{usage.limit}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.list}>
                        {isLoading ? (
                            <div className={styles.loading}>
                                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                            </div>
                        ) : !analyses || analyses.length === 0 ? (
                            <div className={styles.empty}>
                                <BarChart3 className={styles.emptyIcon} />
                                <p>{t('history.empty')}</p>
                                <p className="text-xs mt-1">{t('history.emptyTip')}</p>
                            </div>
                        ) : (
                            analyses.map((analysis) => {
                                const isActive = currentAnalysisId === analysis.id;
                                const isNew = newAnalysisId === analysis.id;
                                
                                return (
                                    <Link
                                        key={analysis.id}
                                        href={`/dashboard/resume-analyzer/${analysis.id}`}
                                        className={`
                                            ${styles.item}
                                            ${isActive ? styles.itemActive : ''}
                                            ${isNew ? styles.itemNew : ''}
                                        `}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) {
                                                toggleSidebar();
                                            }
                                        }}
                                    >
                                        <div className={styles.itemHeader}>
                                            <span className={styles.itemBadge}>
                                                {analysis.fileName}
                                            </span>
                                            <span className={styles.itemTime}>
                                                <Clock className="w-3 h-3" />
                                                {formatTime(analysis.createdAt)}
                                            </span>
                                        </div>
                                        <p className={styles.itemText}>
                                            {t('history.analysisRecord')}
                                        </p>
                                        {analysis.score !== null && (
                                            <p className={styles.itemScore}>
                                                {t('history.score')}: {analysis.score}/100
                                            </p>
                                        )}
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
}
