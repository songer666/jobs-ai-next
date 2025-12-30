'use client';

import { BarChart3, Loader2 } from 'lucide-react';
import { useResumeAnalyzer } from './hooks';
import { analyzerStyles as styles } from './styles';
import { useTranslations } from 'next-intl';
import {
    WorkspaceHeader,
    FileUploader,
    AnalysisResult,
    ConfigPanel,
} from './components';

export function ResumeAnalyzerWorkspace() {
    const t = useTranslations('resumeAnalyzer');
    const {
        phase,
        selectedFile,
        jobDescription,
        analysisResult,
        score,
        selectedJobInfoId,
        language,
        model,
        fileInputRef,
        selectFile,
        removeFile,
        setJobDescription,
        setSelectedJobInfoId,
        setLanguage,
        setModel,
        analyze,
        reset,
    } = useResumeAnalyzer();

    const isAnalyzing = phase === 'analyzing';

    return (
        <div className={styles.container}>
            <WorkspaceHeader subtitle={t('subtitle')} />

            <div className="space-y-6">
                {/* 配置面板 */}
                <ConfigPanel
                    selectedJobInfoId={selectedJobInfoId}
                    language={language}
                    model={model}
                    onJobChange={setSelectedJobInfoId}
                    onLanguageChange={setLanguage}
                    onModelChange={setModel}
                />

                {/* 上传区域 */}
                <div className={styles.uploadCard}>
                    <h2 className={styles.uploadTitle}>{t('upload.title')}</h2>
                    <p className={styles.uploadDesc}>
                        {t('upload.description')}
                    </p>

                    <FileUploader
                        selectedFile={selectedFile}
                        fileInputRef={fileInputRef}
                        onFileSelect={selectFile}
                        onRemove={removeFile}
                        disabled={isAnalyzing}
                    />

                    <div className={styles.jobDescSection}>
                        <label className={styles.jobDescLabel}>
                            {t('jobDescription.label')}
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder={t('jobDescription.placeholder')}
                            disabled={isAnalyzing}
                            className={styles.jobDescTextarea}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={analyze}
                        disabled={!selectedFile || isAnalyzing}
                        className={styles.analyzeButton}
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t('actions.analyzing')}
                            </>
                        ) : (
                            <>
                                <BarChart3 className="w-5 h-5" />
                                {t('actions.analyze')}
                            </>
                        )}
                    </button>
                </div>

                {/* 分析结果 */}
                {(analysisResult || isAnalyzing) && (
                    <AnalysisResult
                        result={analysisResult}
                        score={score}
                        isAnalyzing={isAnalyzing}
                        onReset={reset}
                    />
                )}
            </div>
        </div>
    );
}
