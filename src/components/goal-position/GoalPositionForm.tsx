'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { 
    useCreateGoalPosition, 
    useUpdateGoalPosition, 
    type GoalPosition, 
    type ExperienceLevel 
} from '@/api/goal-position';

interface GoalPositionFormProps {
    position?: GoalPosition;
    mode: 'create' | 'edit';
}

const styles = {
    container: 'max-w-2xl mx-auto',
    header: 'flex items-center gap-4 mb-8',
    backBtn: 'p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-white/80 hover:text-white',
    backIcon: 'w-5 h-5',
    title: 'text-2xl font-bold text-white',
    form: 'space-y-6',
    field: 'space-y-2',
    label: 'block text-sm font-medium text-white/80',
    input: 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
    textarea: 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[250px] md:min-h-[300px] lg:min-h-[450px] resize-none',
    select: 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer [&>option]:bg-[#0d0a1f] [&>option]:text-white [&>option]:py-2',
    error: 'text-sm text-red-400 mt-1',
    actions: 'flex items-center gap-4 pt-4',
    cancelButton: 'flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors text-center',
    saveButton: 'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium gradient-btn transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    saveIcon: 'w-4 h-4',
};

const experienceLevels: ExperienceLevel[] = ['junior', 'mid-level', 'senior'];

export function GoalPositionForm({ position, mode }: GoalPositionFormProps) {
    const t = useTranslations('goalPosition');
    const createMutation = useCreateGoalPosition();
    const updateMutation = useUpdateGoalPosition();

    const [formData, setFormData] = useState({
        name: position?.name || '',
        title: position?.title || '',
        description: position?.description || '',
        experienceLevel: position?.experienceLevel || 'junior' as ExperienceLevel,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (position) {
            setFormData({
                name: position.name,
                title: position.title || '',
                description: position.description,
                experienceLevel: position.experienceLevel,
            });
        }
    }, [position]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = t('form.nameRequired');
        }

        if (!formData.description.trim()) {
            newErrors.description = t('form.descriptionRequired');
        }

        if (!formData.experienceLevel) {
            newErrors.experienceLevel = t('form.experienceLevelRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (mode === 'create') {
            createMutation.mutate(formData);
        } else if (position) {
            updateMutation.mutate({
                id: position.id,
                data: formData,
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/dashboard/goal-position" className={styles.backBtn}>
                    <ArrowLeft className={styles.backIcon} />
                </Link>
                <h1 className={styles.title}>
                    {mode === 'create' ? t('create') : t('edit')}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>{t('form.name')}</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('form.namePlaceholder')}
                        className={styles.input}
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>{t('form.title')}</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder={t('form.titlePlaceholder')}
                        className={styles.input}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>{t('form.experienceLevel')}</label>
                    <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })}
                        className={styles.select}
                    >
                        {experienceLevels.map((level) => (
                            <option key={level} value={level}>
                                {t(`experienceLevel.${level}`)}
                            </option>
                        ))}
                    </select>
                    {errors.experienceLevel && <p className={styles.error}>{errors.experienceLevel}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>{t('form.description')}</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={t('form.descriptionPlaceholder')}
                        className={styles.textarea}
                    />
                    {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>

                <div className={styles.actions}>
                    <Link href="/dashboard/goal-position" className={styles.cancelButton}>
                        {t('cancel')}
                    </Link>
                    <Button 
                        type="submit" 
                        isPending={isSubmitting}
                        className={styles.saveButton}
                    >
                        <Save className={styles.saveIcon} />
                        {isSubmitting 
                            ? (mode === 'create' ? t('creating') : t('saving'))
                            : t('save')
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}
