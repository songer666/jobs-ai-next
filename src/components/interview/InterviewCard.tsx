'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Trash2, Clock, Star, Calendar, ChevronRight, Mic, AlertCircle, Loader2 } from 'lucide-react';
import { AlertDialog } from '@heroui/react';
import type { Interview } from '@/api/interview';

interface InterviewCardProps {
    interview: Interview;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
}

const styles = {
    card: 'bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors group',
    header: 'flex items-start justify-between mb-4',
    headerContent: 'flex-1 min-w-0',
    title: 'text-lg font-semibold text-white truncate',
    subtitle: 'text-sm text-white/60 mt-1',
    badge: 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
    badgePending: 'bg-yellow-500/20 text-yellow-400',
    badgeInProgress: 'bg-blue-500/20 text-blue-400',
    badgeEvaluating: 'bg-[#fd409a]/20 text-[#fd409a]',
    badgeCompleted: 'bg-green-500/20 text-green-400',
    badgeIcon: 'w-3 h-3',
    meta: 'flex flex-wrap gap-4 mt-4 text-sm text-white/60',
    metaItem: 'flex items-center gap-1.5',
    metaIcon: 'w-4 h-4',
    score: 'flex items-center gap-1.5',
    scoreValue: 'text-primary font-semibold',
    actions: 'flex items-center gap-2 mt-4 pt-4 border-t border-white/10',
    viewButton: 'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground text-sm font-semibold transition-all',
    viewButtonIcon: 'w-4 h-4',
    deleteButton: 'p-2.5 rounded-lg border border-white/10 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors',
    deleteButtonIcon: 'w-4 h-4',
    // 删除确认框样式
    dialog: 'sm:max-w-[500px] bg-[#2a2a2a] border border-white/10',
    dialogHeader: 'flex items-start gap-4 pb-4',
    dialogIconWrapper: 'flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center',
    dialogIcon: 'w-6 h-6 text-red-500',
    dialogHeaderContent: 'flex-1',
    dialogHeading: 'text-xl font-semibold text-white mb-2',
    dialogBody: 'text-white/70 leading-relaxed',
    dialogHighlight: 'text-white font-medium',
    dialogFooter: 'flex items-center justify-end gap-3 pt-6',
    cancelButton: 'px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors',
    confirmDeleteButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium',
};

const statusConfig: Record<string, { label: string; style: string; icon?: React.ReactNode }> = {
    pending: { label: '待开始', style: styles.badgePending },
    in_progress: { label: '进行中', style: styles.badgeInProgress },
    evaluating: { label: '评分中', style: styles.badgeEvaluating, icon: <Loader2 className="w-3 h-3 animate-spin" /> },
    completed: { label: '已完成', style: styles.badgeCompleted },
};

export function InterviewCard({ interview, onDelete, isDeleting }: InterviewCardProps) {
    const t = useTranslations('interview');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDuration = (seconds: number | null) => {
        if (!seconds) return '--';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const status = interview.status || 'pending';
    const statusInfo = statusConfig[status];

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h3 className={styles.title}>
                        {interview.jobInfo?.name || '未知职位'}
                    </h3>
                    {interview.jobInfo?.title && (
                        <p className={styles.subtitle}>{interview.jobInfo.title}</p>
                    )}
                </div>
                <span className={`${styles.badge} ${statusInfo.style}`}>
                    {statusInfo.icon || <Mic className={styles.badgeIcon} />}
                    {statusInfo.label}
                </span>
            </div>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {formatDate(interview.createdAt)}
                </span>
                <span className={styles.metaItem}>
                    <Clock className={styles.metaIcon} />
                    {formatDuration(interview.duration)}
                </span>
                {interview.score !== null && (
                    <span className={styles.score}>
                        <Star className={styles.metaIcon} />
                        <span className={styles.scoreValue}>{interview.score}</span>/100
                    </span>
                )}
            </div>

            <div className={styles.actions}>
                <Link 
                    href={status === 'completed' || status === 'evaluating' 
                        ? `/dashboard/interview/${interview.id}/result`
                        : `/dashboard/interview/${interview.id}`}
                    className={styles.viewButton}
                >
                    {status === 'completed' ? '查看结果' : 
                     status === 'evaluating' ? '评分中...' :
                     status === 'in_progress' ? '继续面试' : '开始面试'}
                    {status !== 'evaluating' && <ChevronRight className={styles.viewButtonIcon} />}
                    {status === 'evaluating' && <Loader2 className="w-4 h-4 animate-spin" />}
                </Link>
                {status === 'completed' && (
                    <Link
                        href={`/dashboard/interview/${interview.id}`}
                        className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-sm font-medium transition-colors"
                    >
                        记录
                    </Link>
                )}
                <button 
                    type="button"
                    onClick={() => setIsDeleteOpen(true)}
                    disabled={isDeleting}
                    className={styles.deleteButton}
                    title="删除面试"
                >
                    <Trash2 className={styles.deleteButtonIcon} />
                </button>
                
                <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className={styles.dialog}>
                                <AlertDialog.CloseTrigger />
                                <div className={styles.dialogHeader}>
                                    <div className={styles.dialogIconWrapper}>
                                        <AlertCircle className={styles.dialogIcon} />
                                    </div>
                                    <div className={styles.dialogHeaderContent}>
                                        <h2 className={styles.dialogHeading}>
                                            删除面试记录？
                                        </h2>
                                        <p className={styles.dialogBody}>
                                            确定要永久删除 <span className={styles.dialogHighlight}>{interview.jobInfo?.name || '此面试'}</span> 的面试记录吗？此操作无法撤销。
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.dialogFooter}>
                                    <button 
                                        type="button"
                                        onClick={() => setIsDeleteOpen(false)}
                                        className={styles.cancelButton}
                                    >
                                        取消
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            onDelete?.(interview.id);
                                            setIsDeleteOpen(false);
                                        }}
                                        disabled={isDeleting}
                                        className={styles.confirmDeleteButton}
                                    >
                                        {isDeleting ? '删除中...' : '删除'}
                                    </button>
                                </div>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            </div>
        </div>
    );
}
