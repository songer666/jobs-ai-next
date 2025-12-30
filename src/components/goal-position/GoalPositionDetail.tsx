'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Pencil, Trash2, Globe, Lock, Clock, Briefcase, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGoalPosition, useDeleteGoalPosition } from '@/api/goal-position';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface GoalPositionDetailProps {
    id: string;
}

const styles = {
    container: 'max-w-2xl mx-auto',
    header: 'flex items-center gap-4 mb-8',
    backBtn: 'p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white/80 hover:text-white',
    backIcon: 'w-5 h-5',
    title: 'text-2xl font-bold text-white flex-1',
    actions: 'flex items-center gap-2',
    editButton: 'flex items-center gap-2 px-4 py-2.5 bg-[#1a1528] hover:bg-[#221a35] border border-white/10 rounded-lg text-white text-sm font-medium transition-colors',
    editIcon: 'w-4 h-4',
    deleteButton: 'flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    deleteIcon: 'w-4 h-4',
    card: 'bg-white/5 border border-white/10 rounded-xl p-6',
    section: 'mb-6',
    sectionTitle: 'text-sm font-medium text-white/60 mb-2',
    sectionContent: 'text-white',
    badge: 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
    badgePublic: 'bg-green-500/20 text-green-400',
    badgePrivate: 'bg-white/10 text-white/60',
    meta: 'flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10 text-sm text-white/60',
    metaItem: 'flex items-center gap-1.5',
    loading: 'flex items-center justify-center py-16',
    error: 'text-center py-16 text-red-400',
};

export function GoalPositionDetail({ id }: GoalPositionDetailProps) {
    const t = useTranslations('goalPosition');
    const router = useRouter();
    
    const { data: position, isLoading, error } = useGoalPosition(id);
    const deleteMutation = useDeleteGoalPosition();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteMutation.mutate(id);
        setIsDeleteDialogOpen(false);
    };

    const formatDate = (date: string | number) => {
        return new Date(date).toLocaleDateString();
    };

    const getExperienceLevelLabel = (level: string) => {
        return t(`experienceLevel.${level}`);
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (error || !position) {
        return (
            <div className={styles.error}>
                {error?.message || 'Position not found'}
            </div>
        );
    }

    const canEdit = position.isOwner !== false;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/dashboard/goal-position" className={styles.backBtn}>
                    <ArrowLeft className={styles.backIcon} />
                </Link>
                <h1 className={styles.title}>{position.name}</h1>
                {canEdit && (
                    <div className={styles.actions}>
                        <Link href={`/dashboard/goal-position/${id}/edit`} className={styles.editButton}>
                            <Pencil className={styles.editIcon} />
                            {t('edit')}
                        </Link>
                        <button 
                            type="button"
                            onClick={handleDeleteClick}
                            disabled={deleteMutation.isPending}
                            className={styles.deleteButton}
                        >
                            <Trash2 className={styles.deleteIcon} />
                            {t('delete')}
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.card}>
                {position.title && (
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>{t('form.title')}</div>
                        <div className={styles.sectionContent}>{position.title}</div>
                    </div>
                )}

                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('form.description')}</div>
                    <div className={styles.sectionContent + ' whitespace-pre-wrap'}>
                        {position.description}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('form.experienceLevel')}</div>
                    <div className={styles.sectionContent}>
                        {getExperienceLevelLabel(position.experienceLevel)}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('form.isPublic')}</div>
                    <span className={`${styles.badge} ${position.isPublic ? styles.badgePublic : styles.badgePrivate}`}>
                        {position.isPublic ? (
                            <>
                                <Globe className="w-3 h-3" />
                                {t('card.public')}
                            </>
                        ) : (
                            <>
                                <Lock className="w-3 h-3" />
                                {t('card.private')}
                            </>
                        )}
                    </span>
                </div>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <Briefcase className="w-4 h-4" />
                        {getExperienceLevelLabel(position.experienceLevel)}
                    </span>
                    <span className={styles.metaItem}>
                        <Clock className="w-4 h-4" />
                        {t('card.createdAt')}: {formatDate(position.createdAt)}
                    </span>
                </div>
            </div>

            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                itemName={position?.name}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}
