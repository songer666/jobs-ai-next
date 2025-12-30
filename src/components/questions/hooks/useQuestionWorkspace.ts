'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
    generateQuestion, 
    submitAnswer,
    type StreamEvent 
} from '@/api/question';
import { useQuestionsLayout } from '@/app/[locale]/(dashboard)/dashboard/questions/layout';
import type { WorkspaceState, WorkspaceConfig } from '../types';

const initialState: WorkspaceState = {
    phase: 'idle',
    questionText: '',
    questionId: null,
    answer: '',
    feedback: '',
    score: null,
};

export function useQuestionWorkspace() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { addNewQuestion } = useQuestionsLayout();
    
    // 配置状态
    const [config, setConfig] = useState<WorkspaceConfig>({
        selectedJobInfoId: '',
        difficulty: 'medium',
        language: 'zh',
    });
    
    // 工作区状态
    const [state, setState] = useState<WorkspaceState>(initialState);
    
    // Refs for scroll handling
    const contentEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 自动滚动逻辑
    useEffect(() => {
        if (state.feedback && contentEndRef.current && containerRef.current) {
            const container = containerRef.current;
            const endElement = contentEndRef.current;
            const endRect = endElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (endRect.bottom > containerRect.bottom) {
                endElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }, [state.feedback]);

    // 更新配置
    const updateConfig = useCallback(<K extends keyof WorkspaceConfig>(
        key: K, 
        value: WorkspaceConfig[K]
    ) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    }, []);

    // 更新状态
    const updateState = useCallback(<K extends keyof WorkspaceState>(
        key: K, 
        value: WorkspaceState[K]
    ) => {
        setState(prev => ({ ...prev, [key]: value }));
    }, []);

    // 开始生成题目
    const startGenerate = useCallback(async () => {
        if (!config.selectedJobInfoId) {
            toast.error('请选择一个职位');
            return;
        }

        setState({
            ...initialState,
            phase: 'generating',
        });

        try {
            await generateQuestion(
                { 
                    jobInfoId: config.selectedJobInfoId, 
                    difficulty: config.difficulty, 
                    language: config.language, 
                    model: 'deepseek' 
                },
                (event: StreamEvent) => {
                    if (event.type === 'text' && event.content) {
                        setState(prev => ({
                            ...prev,
                            questionText: prev.questionText + event.content,
                        }));
                    } else if (event.type === 'done' && event.questionId) {
                        setState(prev => ({
                            ...prev,
                            questionId: event.questionId!,
                            phase: 'answering',
                        }));
                        addNewQuestion(event.questionId);
                        queryClient.invalidateQueries({ queryKey: ['questions'] });
                        queryClient.invalidateQueries({ queryKey: ['questionUsage'] });
                    } else if (event.type === 'error') {
                        throw new Error(event.message);
                    }
                }
            );
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '生成失败');
            setState(prev => ({ ...prev, phase: 'idle' }));
        }
    }, [config, addNewQuestion, queryClient]);

    // 提交答案
    const submitUserAnswer = useCallback(async () => {
        if (!state.answer.trim()) {
            toast.error('请输入你的答案');
            return;
        }
        if (!state.questionId) return;

        setState(prev => ({
            ...prev,
            phase: 'submitting',
            feedback: '',
            score: null,
        }));

        try {
            await submitAnswer(
                state.questionId, 
                { answer: state.answer, language: config.language }, 
                (event: StreamEvent) => {
                    if (event.type === 'text' && event.content) {
                        setState(prev => ({
                            ...prev,
                            feedback: prev.feedback + event.content,
                        }));
                    } else if (event.type === 'done') {
                        setState(prev => ({
                            ...prev,
                            score: event.score ?? null,
                            phase: 'result',
                        }));
                        queryClient.invalidateQueries({ queryKey: ['questions'] });
                        queryClient.invalidateQueries({ queryKey: ['question', state.questionId] });
                    } else if (event.type === 'error') {
                        throw new Error(event.message);
                    }
                }
            );
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '提交失败');
            setState(prev => ({ ...prev, phase: 'answering' }));
        }
    }, [state.answer, state.questionId, config.language, queryClient]);

    // 重置为新题目
    const resetWorkspace = useCallback(() => {
        setState(initialState);
    }, []);

    return {
        config,
        state,
        refs: { contentEndRef, containerRef },
        actions: {
            updateConfig,
            updateState,
            startGenerate,
            submitUserAnswer,
            resetWorkspace,
        },
    };
}
