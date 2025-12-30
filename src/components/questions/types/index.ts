import type { QuestionDifficulty, QuestionLanguage } from '@/api/question';

export type WorkspacePhase = 'idle' | 'generating' | 'answering' | 'submitting' | 'result';

export interface WorkspaceState {
    phase: WorkspacePhase;
    questionText: string;
    questionId: string | null;
    answer: string;
    feedback: string;
    score: number | null;
}

export interface WorkspaceConfig {
    selectedJobInfoId: string;
    difficulty: QuestionDifficulty;
    language: QuestionLanguage;
}

export interface DifficultyOption {
    value: QuestionDifficulty;
    label: string;
}

export interface LanguageOption {
    value: QuestionLanguage;
    label: string;
}

export const DIFFICULTIES: DifficultyOption[] = [
    { value: 'easy', label: '简单' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困难' },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
];
