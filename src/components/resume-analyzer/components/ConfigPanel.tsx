'use client';

import { BarChart3 } from 'lucide-react';
import { useGoalPositions } from '@/api/goal-position';
import { useTranslations } from 'next-intl';
import { analyzerStyles as styles } from '../styles';

export type AnalyzerLanguage = 'zh' | 'en';
export type AnalyzerModel = 'deepseek' | 'gemini';

export const LANGUAGE_OPTIONS: { value: AnalyzerLanguage; label: string }[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
];

export const MODEL_OPTIONS: { value: AnalyzerModel; label: string }[] = [
    { value: 'deepseek', label: 'DeepSeek' },
];

interface ConfigPanelProps {
    selectedJobInfoId: string;
    language: AnalyzerLanguage;
    model: AnalyzerModel;
    onJobChange: (id: string) => void;
    onLanguageChange: (l: AnalyzerLanguage) => void;
    onModelChange: (m: AnalyzerModel) => void;
}

export function ConfigPanel({
    selectedJobInfoId,
    language,
    model,
    onJobChange,
    onLanguageChange,
    onModelChange,
}: ConfigPanelProps) {
    const { data: jobInfos, isLoading: isLoadingJobs } = useGoalPositions(true);
    const t = useTranslations('resumeAnalyzer');

    return (
        <div className={styles.configSection}>
            <div className={styles.configCard}>
                <h2 className={styles.configTitle}>
                    <BarChart3 className="inline w-5 h-5 mr-2 text-primary" />
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
                        onChange={(e) => onModelChange(e.target.value as AnalyzerModel)}
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
