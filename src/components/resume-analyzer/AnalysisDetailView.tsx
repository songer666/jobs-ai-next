'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, FileText, Calendar, Loader2, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { fetchAnalysisDetail, deleteAnalysis } from '@/api/resume-analyzer';
import { detailStyles as styles } from './styles/detail';
import { DeleteConfirmDialog } from '../resume-generator/components/DeleteConfirmDialog';
import { useState } from 'react';

interface AnalysisDetailViewProps {
    analysisId: string;
}

function getScoreColor(score: number | null): string {
    if (score === null) return 'text-gray-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
}

export function AnalysisDetailView({ analysisId }: AnalysisDetailViewProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const t = useTranslations('resumeAnalyzer');
    
    const { data: analysis, isLoading, error } = useQuery({
        queryKey: ['analysis', analysisId],
        queryFn: () => fetchAnalysisDetail(analysisId),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAnalysis,
        onSuccess: () => {
            toast.success(t('detail.deleteSuccess'));
            queryClient.invalidateQueries({ queryKey: ['analyses'] });
            router.push('/dashboard/resume-analyzer');
        },
        onError: () => {
            toast.error(t('detail.deleteFailed'));
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate(analysisId);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <Loader2 className="w-8 h-8 text-[#fd409a] animate-spin" />
                </div>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <FileText className={styles.emptyIcon} />
                    <div className={styles.emptyTitle}>{t('detail.notFound')}</div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-4 text-[#fd409a] hover:text-[#f5a867] transition-colors"
                    >
                        {t('detail.backToList')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* 头部 */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={styles.backButton}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('detail.back')}
                    </button>
                    <div>
                        <h1 className={styles.title}>{analysis.fileName}</h1>
                        <p className={styles.subtitle}>
                            {new Date(analysis.createdAt).toLocaleString('zh-CN')}
                        </p>
                    </div>
                </div>
                
                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() => setDeleteDialogOpen(true)}
                        className={styles.deleteButton}
                    >
                        <Trash2 className="w-4 h-4" />
                        {t('detail.delete')}
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                {/* 概览卡片 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 评分卡片 */}
                    <div className={styles.scoreCard}>
                        <div className={styles.scoreLabel}>{t('detail.aiScore')}</div>
                        <div className="flex items-baseline justify-center">
                            <span className={styles.scoreValue}>{analysis.score || 0}</span>
                            <span className={styles.scoreMax}>/ 100</span>
                        </div>
                    </div>

                    {/* 信息卡片 */}
                    <div className={`${styles.metaCard} lg:col-span-2`}>
                        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#fd409a]" />
                            {t('detail.basicInfo')}
                        </h3>
                        <div className={styles.metaGrid}>
                            <div className={styles.metaItem}>
                                <div className={styles.metaLabel}>{t('detail.fileName')}</div>
                                <div className={styles.metaValue}>{analysis.fileName}</div>
                            </div>
                            <div className={styles.metaItem}>
                                <div className={styles.metaLabel}>{t('detail.analysisTime')}</div>
                                <div className={styles.metaValue}>
                                    {new Date(analysis.createdAt).toLocaleString('zh-CN')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 分析结果 */}
                <div className={styles.feedbackCard}>
                    <div className={styles.feedbackHeader}>
                        <h2 className={styles.feedbackTitle}>{t('detail.detailedReport')}</h2>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 ${getScoreColor(analysis.score)}`}>
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-medium">{t('detail.overallRating')}</span>
                        </div>
                    </div>
                    
                    {analysis.feedback ? (
                        <div className={styles.feedbackContent}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {analysis.feedback}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <div className="text-white/40 text-center py-12">
                            {t('detail.noDetailedContent')}
                        </div>
                    )}
                </div>

                {/* 职位描述（如果有） */}
                {analysis.jobDescription && (
                    <div className={styles.feedbackCard}>
                        <h2 className={`${styles.feedbackTitle} mb-4`}>{t('detail.targetJobDescription')}</h2>
                        <div className="bg-white/5 rounded-xl p-4 text-white/70 whitespace-pre-wrap font-mono text-sm">
                            {analysis.jobDescription}
                        </div>
                    </div>
                )}
            </div>

            <DeleteConfirmDialog
                isOpen={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDelete}
                itemName={analysis.fileName}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}
