'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Switch } from '@heroui/react';
import { toast } from 'sonner';
import { useGoalPositions, useDeleteGoalPosition } from '@/api/goal-position';
import { usePublicTemplateStore } from '@/store/public/store';
import { GoalPositionCard } from './GoalPositionCard';
import { GoalPositionEmpty } from './GoalPositionEmpty';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

const styles = {
    container: 'space-y-6',
    header: 'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
    titleWrapper: 'space-y-1',
    title: 'text-xl md:text-2xl font-bold text-white',
    subtitle: 'text-sm md:text-base text-white/60',
    controls: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
    switchWrapper: 'flex items-center gap-2',
    switchLabel: 'text-sm text-white/80',
    createButton: 'flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium gradient-btn transition-all hover:scale-105',
    createButtonIcon: 'w-4 h-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4',
    loading: 'flex items-center justify-center py-16',
    error: 'text-center py-16 text-red-400',
};

export function GoalPositionList() {
    const t = useTranslations('goalPosition');
    const includePublic = usePublicTemplateStore((state) => state.includePublic);
    const setIncludePublic = usePublicTemplateStore((state) => state.setIncludePublic);
    const { data: positions, isLoading, error } = useGoalPositions(includePublic);
    const deleteMutation = useDeleteGoalPosition();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

    const handleDeleteClick = (id: string, name: string) => {
        setDeleteTarget({ id, name });
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteTarget) return;
        
        deleteMutation.mutate(deleteTarget.id);
        setDeleteDialogOpen(false);
        setDeletingId(null);
        setDeleteTarget(null);
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
                    <div className={styles.switchWrapper}>
                        <Switch
                            isSelected={includePublic}
                            onChange={setIncludePublic}
                            size="sm"
                        >
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>
                        </Switch>
                        <span className={styles.switchLabel}>
                            {t('showPublicTemplates')}
                        </span>
                    </div>
                    <Link href="/dashboard/goal-position/new" className={styles.createButton}>
                        <Plus className={styles.createButtonIcon} />
                        {t('create')}
                    </Link>
                </div>
            </div>

            {!positions || positions.length === 0 ? (
                <GoalPositionEmpty />
            ) : (
                <div className={styles.grid}>
                    {positions.map((position) => (
                        <GoalPositionCard
                            key={position.id}
                            position={position}
                            onDelete={(id) => handleDeleteClick(id, position.name)}
                            isDeleting={deletingId === position.id}
                        />
                    ))}
                </div>
            )}

            <DeleteConfirmDialog
                isOpen={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                itemName={deleteTarget?.name}
                isDeleting={!!deletingId}
            />
        </div>
    );
}
