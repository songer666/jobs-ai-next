'use client';

import { useState, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { analyzeResume } from '@/api/resume-analyzer';
import { useResumeUsage } from '@/api/resume';
import type { AnalyzerLanguage, AnalyzerModel } from '../components';

export type AnalyzerPhase = 'idle' | 'analyzing' | 'done';

export function useResumeAnalyzer() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: usage } = useResumeUsage();

    const [phase, setPhase] = useState<AnalyzerPhase>('idle');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [score, setScore] = useState<number | null>(null);
    
    // 配置选项
    const [selectedJobInfoId, setSelectedJobInfoId] = useState('');
    const [language, setLanguage] = useState<AnalyzerLanguage>('zh');
    const [model, setModel] = useState<AnalyzerModel>('deepseek');

    const selectFile = useCallback((file: File | null) => {
        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error('文件大小不能超过 10MB');
            return;
        }

        setSelectedFile(file);
    }, []);

    const removeFile = useCallback(() => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const analyze = useCallback(async () => {
        if (!selectedFile) {
            toast.error('请上传简历文件');
            return;
        }

        setPhase('analyzing');
        setAnalysisResult('');
        setScore(null);

        try {
            await analyzeResume(
                {
                    file: selectedFile,
                    jobInfoId: selectedJobInfoId || undefined,
                    jobDescription: jobDescription || undefined,
                    model,
                    language,
                },
                (event) => {
                    if (event.type === 'text' && event.content) {
                        setAnalysisResult(prev => prev + event.content);
                    } else if (event.type === 'done') {
                        toast.success('分析完成！');
                        if (event.score) {
                            setScore(event.score);
                        }
                        queryClient.invalidateQueries({ queryKey: ['analyzerUsage'] });
                        queryClient.invalidateQueries({ queryKey: ['analyses'] });
                        queryClient.invalidateQueries({ queryKey: ['resumeUsage'] });
                        setPhase('done');
                        // 跳转到详情页并刷新页面以更新 layout 中的使用次数
                        if (event.analysisId) {
                            router.push(`/dashboard/resume-analyzer/${event.analysisId}`);
                            // 延迟刷新确保路由跳转完成
                            setTimeout(() => {
                                window.location.reload();
                            }, 100);
                        }
                    } else if (event.type === 'error') {
                        toast.error(event.message || '分析失败');
                        setPhase('idle');
                    }
                }
            );
        } catch (error: any) {
            toast.error(error.message || '分析简历失败');
            setPhase('idle');
        }
    }, [selectedFile, jobDescription, selectedJobInfoId, model, language, queryClient]);

    const reset = useCallback(() => {
        setPhase('idle');
        setSelectedFile(null);
        setJobDescription('');
        setAnalysisResult('');
        setScore(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    return {
        // 状态
        phase,
        selectedFile,
        jobDescription,
        analysisResult,
        score,
        usage,
        
        // 配置
        selectedJobInfoId,
        language,
        model,
        
        // Refs
        fileInputRef,
        
        // 操作
        selectFile,
        removeFile,
        setJobDescription,
        setSelectedJobInfoId,
        setLanguage,
        setModel,
        analyze,
        reset,
    };
}
