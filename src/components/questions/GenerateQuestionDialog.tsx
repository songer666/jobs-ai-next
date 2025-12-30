'use client';

import { useState } from 'react';
import { Modal } from '@heroui/react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useGoalPositions } from '@/api/goal-position';
import { generateQuestion, type QuestionDifficulty, type QuestionLanguage, type AIModel, type StreamEvent } from '@/api/question';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';

interface GenerateQuestionDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const styles = {
    dialog: 'sm:max-w-[500px] bg-[#2a2a2a] border border-white/10 p-6',
    header: 'mb-6',
    title: 'text-xl font-semibold text-white mb-2',
    description: 'text-white/60 text-sm',
    form: 'space-y-4',
    label: 'block text-sm font-medium text-white/80 mb-2',
    select: 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50',
    option: 'bg-[#2a2a2a] text-white',
    difficultyGroup: 'flex gap-2',
    difficultyButton: 'flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all',
    difficultyActive: 'border-primary bg-primary/20 text-primary',
    difficultyInactive: 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10',
    footer: 'flex items-center justify-end gap-3 mt-6 pt-6 border-t border-white/10',
    cancelButton: 'px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors',
    generateButton: 'flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed',
};

const difficulties: { value: QuestionDifficulty; label: string }[] = [
    { value: 'easy', label: '简单' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困难' },
];

const languageOptions: { value: QuestionLanguage; label: string }[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
];

const modelOptions: { value: AIModel; label: string; desc: string }[] = [
    { value: 'deepseek', label: 'DeepSeek', desc: '国产模型 - 中文优化' },
];

export function GenerateQuestionDialog({ isOpen, onOpenChange }: GenerateQuestionDialogProps) {
    const { data: jobInfos, isLoading: isLoadingJobs } = useGoalPositions(true);
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const [selectedJobInfoId, setSelectedJobInfoId] = useState<string>('');
    const [difficulty, setDifficulty] = useState<QuestionDifficulty>('medium');
    const [language, setLanguage] = useState<QuestionLanguage>('zh');
    const [model, setModel] = useState<AIModel>('deepseek');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!selectedJobInfoId) {
            toast.error('请选择一个职位');
            return;
        }

        setIsGenerating(true);
        let questionId: string | null = null;

        try {
            await generateQuestion(
                { jobInfoId: selectedJobInfoId, difficulty, language, model },
                (event: StreamEvent) => {
                    if (event.type === 'done' && event.questionId) {
                        questionId = event.questionId;
                    } else if (event.type === 'error') {
                        throw new Error(event.message);
                    }
                }
            );

            await queryClient.invalidateQueries({ queryKey: ['questions'] });
            await queryClient.invalidateQueries({ queryKey: ['questionUsage'] });
            
            toast.success('题目生成成功');
            onOpenChange(false);
            
            if (questionId) {
                router.push(`/dashboard/questions/${questionId}`);
                // 延迟刷新确保路由跳转完成，更新 layout 中的使用次数
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '生成失败');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className={styles.dialog}>
                        <Modal.CloseTrigger />
                        <div className={styles.header}>
                            <h2 className={styles.title}>生成新题目</h2>
                            <p className={styles.description}>
                                选择职位和难度，AI 将为你生成针对性的技术题目
                            </p>
                        </div>

                        <div className={styles.form}>
                            <div>
                                <label className={styles.label}>选择职位</label>
                                <select
                                    value={selectedJobInfoId}
                                    onChange={(e) => setSelectedJobInfoId(e.target.value)}
                                    className={styles.select}
                                    disabled={isLoadingJobs || isGenerating}
                                >
                                    <option value="" className={styles.option}>
                                        {isLoadingJobs ? '加载中...' : '请选择职位'}
                                    </option>
                                    {(jobInfos || []).map((job) => (
                                        <option key={job.id} value={job.id} className={styles.option}>
                                            {job.name} - {job.title || job.experienceLevel}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={styles.label}>选择难度</label>
                                <div className={styles.difficultyGroup}>
                                    {difficulties.map((d) => (
                                        <button
                                            key={d.value}
                                            type="button"
                                            onClick={() => setDifficulty(d.value)}
                                            disabled={isGenerating}
                                            className={`${styles.difficultyButton} ${
                                                difficulty === d.value
                                                    ? styles.difficultyActive
                                                    : styles.difficultyInactive
                                            }`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={styles.label}>选择语言</label>
                                <div className={styles.difficultyGroup}>
                                    {languageOptions.map((lang) => (
                                        <button
                                            key={lang.value}
                                            type="button"
                                            onClick={() => setLanguage(lang.value)}
                                            disabled={isGenerating}
                                            className={`${styles.difficultyButton} ${
                                                language === lang.value
                                                    ? styles.difficultyActive
                                                    : styles.difficultyInactive
                                            }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={styles.label}>AI 模型</label>
                                <select
                                    value={model}
                                    onChange={(e) => setModel(e.target.value as AIModel)}
                                    className={styles.select}
                                    disabled={isGenerating}
                                >
                                    {modelOptions.map((m) => (
                                        <option key={m.value} value={m.value} className={styles.option}>
                                            {m.label} - {m.desc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                disabled={isGenerating}
                                className={styles.cancelButton}
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                disabled={isGenerating || !selectedJobInfoId}
                                className={styles.generateButton}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        生成题目
                                    </>
                                )}
                            </button>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
