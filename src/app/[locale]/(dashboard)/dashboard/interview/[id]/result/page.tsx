'use client';

import { use, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Clock, Star, Loader2 } from 'lucide-react';
import { useInterview } from '@/api/interview';
import ReactMarkdown from 'react-markdown';

interface ResultPageProps {
    params: Promise<{ id: string; locale: string }>;
}

const styles = {
    container: 'min-h-screen bg-[#0b081a]',
    main: 'max-w-4xl mx-auto px-4 md:px-6 py-8',
    backButton: 'flex items-center gap-2 text-white/60 hover:text-white transition-colors',
    resultContainer: 'space-y-8',
    resultHeader: 'text-center',
    resultScore: 'text-6xl font-bold text-primary mb-2',
    resultLabel: 'text-white/60',
    resultStats: 'flex justify-center gap-8',
    resultStat: 'text-center',
    resultStatValue: 'text-xl font-semibold text-white',
    resultStatLabel: 'text-sm text-white/60',
    feedbackCard: 'bg-white/5 border border-white/10 rounded-xl p-6',
    feedbackContent: 'prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-strong:text-white prose-ul:text-white/80 prose-li:text-white/80',
    actions: 'flex justify-center gap-4 pt-4',
    actionButton: 'px-6 py-3 rounded-lg font-medium transition-all',
    secondaryAction: 'bg-white/10 hover:bg-white/20 text-white',
};

export default function InterviewResultPage({ params }: ResultPageProps) {
    const { id: interviewId } = use(params);
    const router = useRouter();
    const t = useTranslations('interview');
    const queryClient = useQueryClient();
    const { data: interview, isLoading, error } = useInterview(interviewId);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // 页面进入时强制重新获取数据，避免使用缓存的旧数据
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["interview", interviewId] });
    }, [interviewId, queryClient]);

    // 使用 useEffect 处理重定向，避免在渲染期间调用 router.push
    useEffect(() => {
        if (interview && interview.status !== 'completed' && interview.status !== 'evaluating') {
            router.push(`/dashboard/interview/${interviewId}`);
        }
    }, [interview, interviewId, router]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </div>
        );
    }

    // 错误处理
    if (error || !interview) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="text-center py-12">
                        <p className="text-white/60 mb-4">{error?.message || '加载失败'}</p>
                        <button
                            onClick={() => router.push('/dashboard/interview')}
                            className="text-primary hover:underline"
                        >
                            返回列表
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    // 如果面试还在评分中
    if (interview.status === 'evaluating') {
        return (
            <div className={styles.container}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <button onClick={() => router.push('/dashboard/interview')} className={styles.backButton}>
                        <ChevronLeft className="w-5 h-5" />
                        返回列表
                    </button>
                    <h1 className="text-lg font-semibold text-white">AI 评分中</h1>
                    <div className="w-20" />
                </div>

                <main className={styles.main}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                        <h2 className="text-2xl font-semibold text-white mb-2">正在生成评分报告</h2>
                        <p className="text-white/60 max-w-md">
                            AI 正在分析您的面试表现，这可能需要 1-2 分钟。您可以返回列表页面，评分完成后会自动更新。
                        </p>
                        <button
                            onClick={() => router.push('/dashboard/interview')}
                            className="mt-8 px-6 py-3 bg-gradient-to-r from-[#f5a867] to-[#fd409a] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            返回面试列表
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    // 如果面试未完成，显示加载状态（实际会在 useEffect 中重定向）
    if (interview.status !== 'completed') {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <button onClick={() => router.push('/dashboard/interview')} className={styles.backButton}>
                    <ChevronLeft className="w-5 h-5" />
                    返回列表
                </button>
                <h1 className="text-lg font-semibold text-white">{t('result.title')}</h1>
                <button
                    onClick={() => router.push(`/dashboard/interview/${interviewId}`)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                    面试记录
                </button>
            </div>

            <main className={styles.main}>
                <div className={styles.resultContainer}>
                    {/* 分数 */}
                    <div className={styles.resultHeader}>
                        <div className={styles.resultScore}>{interview.score || '--'}</div>
                        <div className={styles.resultLabel}>总分 / 100</div>
                    </div>

                    {/* 统计 */}
                    <div className={styles.resultStats}>
                        <div className={styles.resultStat}>
                            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                            <div className={styles.resultStatValue}>
                                {interview.duration ? formatTime(interview.duration) : '--:--'}
                            </div>
                            <div className={styles.resultStatLabel}>{t('result.duration')}</div>
                        </div>
                        <div className={styles.resultStat}>
                            <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                            <div className={styles.resultStatValue}>{interview.score || '--'}</div>
                            <div className={styles.resultStatLabel}>{t('result.score')}</div>
                        </div>
                    </div>

                    {/* 评分反馈 */}
                    {interview.feedback && (
                        <div className={styles.feedbackCard}>
                            <div className={styles.feedbackContent}>
                                <ReactMarkdown>{interview.feedback}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                    {/* 操作按钮 */}
                    <div className={styles.actions}>
                        <button
                            onClick={() => router.push('/dashboard/interview')}
                            className={`${styles.actionButton} ${styles.secondaryAction}`}
                        >
                            {t('result.back')}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
