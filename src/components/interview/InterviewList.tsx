'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Plus, Loader2, Mic } from 'lucide-react';
import { useInterviews, useInterviewUsage, useDeleteInterview } from '@/api/interview';
import { InterviewCard } from './InterviewCard';
import { InterviewEmpty } from './InterviewEmpty';
import { StartInterviewDialog } from './StartInterviewDialog';

const styles = {
    container: 'space-y-6',
    header: 'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
    titleWrapper: 'space-y-1',
    title: 'text-xl md:text-2xl font-bold text-white',
    subtitle: 'text-sm md:text-base text-white/60',
    controls: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
    usageWrapper: 'flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10',
    usageText: 'text-sm text-white/70',
    usageCount: 'text-primary font-semibold',
    createButton: 'flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium gradient-btn transition-all hover:scale-105',
    createButtonIcon: 'w-4 h-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4',
    loading: 'flex items-center justify-center py-16',
    error: 'text-center py-16 text-red-400',
};

export function InterviewList() {
    const t = useTranslations('interview');
    const { data: interviews, isLoading, error } = useInterviews();
    const { data: usage } = useInterviewUsage();
    const deleteMutation = useDeleteInterview();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteMutation.mutateAsync(id);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error.message}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.subtitle}>{t('subtitle')}</p>
                </div>
                <div className={styles.controls}>
                    {usage && usage.limit > 0 && (
                        <div className={styles.usageWrapper}>
                            <Mic className="w-4 h-4 text-primary" />
                            <span className={styles.usageText}>
                                今日剩余: <span className={styles.usageCount}>{usage.remaining}/{usage.limit}</span>
                            </span>
                        </div>
                    )}
                    <button 
                        onClick={() => setIsDialogOpen(true)}
                        className={styles.createButton}
                        disabled={usage?.remaining === 0}
                    >
                        <Plus className={styles.createButtonIcon} />
                        {t('create')}
                    </button>
                </div>
            </div>

            {!interviews || interviews.length === 0 ? (
                <InterviewEmpty onStart={() => setIsDialogOpen(true)} />
            ) : (
                <div className={styles.grid}>
                    {interviews.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onDelete={handleDelete}
                            isDeleting={deletingId === interview.id}
                        />
                    ))}
                </div>
            )}

            <StartInterviewDialog 
                isOpen={isDialogOpen} 
                onOpenChange={setIsDialogOpen}
            />
        </div>
    );
}
