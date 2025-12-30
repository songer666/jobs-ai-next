'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import { useResumes } from '@/api/resume-generator';
import { useDashboardData } from '@/api/dashboard';
import { Loader2, Clock, FileText, Plus } from 'lucide-react';
import { useResumeGeneratorLayout } from '@/app/[locale]/(dashboard)/dashboard/resume-generator/layout';
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

export function ResumeHistorySidebar() {
    const t = useTranslations('resumeGenerator');
    const pathname = usePathname();
    const router = useRouter();
    const { sidebarOpen, toggleSidebar, newResumeId, clearNewResume } = useResumeGeneratorLayout();
    const { data: resumes, isLoading } = useResumes();
    const { data: dashboardData } = useDashboardData();
    const usage = dashboardData?.usage.generate;

    const handleNewResume = () => {
        router.push('/dashboard/resume-generator');
        if (window.innerWidth < 1024) {
            toggleSidebar();
        }
    };

    useEffect(() => {
        if (newResumeId) {
            const timer = setTimeout(clearNewResume, 3000);
            return () => clearTimeout(timer);
        }
    }, [newResumeId, clearNewResume]);

    const currentResumeId = pathname.match(/\/resume-generator\/([^/]+)/)?.[1];

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
                                onClick={handleNewResume}
                                className={styles.newButton}
                                title={t('history.createNew')}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        {usage && (
                            <div className={styles.usage}>
                                <FileText className={styles.usageIcon} />
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
                        ) : !resumes || resumes.length === 0 ? (
                            <div className={styles.empty}>
                                <FileText className={styles.emptyIcon} />
                                <p>{t('history.empty')}</p>
                                <p className="text-xs mt-1">{t('history.emptyTip')}</p>
                            </div>
                        ) : (
                            resumes.map((resume) => {
                                const isActive = currentResumeId === resume.id;
                                const isNew = newResumeId === resume.id;
                                
                                return (
                                    <Link
                                        key={resume.id}
                                        href={`/dashboard/resume-generator/${resume.id}`}
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
                                                {resume.name || t('title')}
                                            </span>
                                            <span className={styles.itemTime}>
                                                <Clock className="w-3 h-3" />
                                                {formatTime(resume.createdAt)}
                                            </span>
                                        </div>
                                        <p className={styles.itemText}>
                                            {resume.name}
                                        </p>
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
