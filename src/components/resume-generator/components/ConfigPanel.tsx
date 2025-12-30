'use client';

import { Sparkles } from 'lucide-react';
import { useGoalPositions } from '@/api/goal-position';
import { workspaceStyles as styles } from '../styles';
import { useTranslations } from 'next-intl';

export type GeneratorLanguage = 'zh' | 'en';
export type GeneratorModel = 'deepseek' | 'gemini';

export const LANGUAGE_OPTIONS: { value: GeneratorLanguage; label: string }[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
];

export const MODEL_OPTIONS: { value: GeneratorModel; label: string }[] = [
    { value: 'deepseek', label: 'DeepSeek' }
];

interface ConfigPanelProps {
    selectedJobInfoId: string;
    language: GeneratorLanguage;
    model: GeneratorModel;
    onJobChange: (id: string) => void;
    onLanguageChange: (l: GeneratorLanguage) => void;
    onModelChange: (m: GeneratorModel) => void;
}

export function ConfigPanel({
    selectedJobInfoId,
    language,
    model,
    onJobChange,
    onLanguageChange,
    onModelChange,
}: ConfigPanelProps) {
    const t = useTranslations('resumeGenerator');
    const { data: jobInfos, isLoading: isLoadingJobs } = useGoalPositions(true);

    return (
        <div className={styles.configSection}>
            <div className={styles.configCard}>
                <h2 className={styles.configTitle}>
                    <Sparkles className="inline w-5 h-5 mr-2 text-primary" />
                    {t('config.title')}
                </h2>

                <div>
                    <label className={styles.label}>{t('config.targetPosition')}</label>
                    <select
                        value={selectedJobInfoId}
                        onChange={(e) => onJobChange(e.target.value)}
                        className={styles.select}
                        disabled={isLoadingJobs}
                    >
                        <option value="" className={styles.option}>
                            {isLoadingJobs ? t('config.loading') : t('config.noPosition')}
                        </option>
                        {(jobInfos || []).map((job) => (
                            <option key={job.id} value={job.id} className={styles.option}>
                                {job.name} - {job.title || job.experienceLevel}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={styles.label}>{t('config.selectModel')}</label>
                    <select
                        value={model}
                        onChange={(e) => onModelChange(e.target.value as GeneratorModel)}
                        className={styles.select}
                    >
                        {MODEL_OPTIONS.map((m) => (
                            <option key={m.value} value={m.value} className={styles.option}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={styles.label}>{t('config.selectLanguage')}</label>
                    <div className={styles.optionGroup}>
                        {LANGUAGE_OPTIONS.map((lang) => (
                            <button
                                key={lang.value}
                                type="button"
                                onClick={() => onLanguageChange(lang.value)}
                                className={`${styles.optionButton} ${
                                    language === lang.value
                                        ? styles.optionActive
                                        : styles.optionInactive
                                }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
