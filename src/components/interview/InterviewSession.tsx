'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { Loader2, ChevronLeft, RefreshCw, AlertTriangle, ArrowUp } from 'lucide-react';
import { AlertDialog, Button } from '@heroui/react';
import { useInterview, generateQuestion, submitAnswer, completeInterview, getChatMessages, addChatMessage, type ConversationMessage, type GenerateQuestionResult } from '@/api/interview';
import { useSpeechRecognition, useInterviewTimer, useSpeechSynthesis } from './hooks';
import { ChatMessage, ChatInput } from './chat';
import { InterviewHeader } from './layout';

interface InterviewSessionProps {
    interviewId: string;
}

const styles = {
    container: 'min-h-screen bg-[#0b081a]',
    main: 'max-w-7xl mx-auto px-4 md:px-6 py-8',
    chatContainer: 'space-y-4 mb-8',
    loading: 'flex flex-col items-center justify-center py-16',
    loadingIcon: 'w-8 h-8 text-primary animate-spin mb-4',
    loadingText: 'text-white/60',
    resultContainer: 'space-y-8',
    resultHeader: 'text-center',
    resultScore: 'text-6xl font-bold text-primary mb-2',
    resultLabel: 'text-white/60',
    resultStats: 'flex justify-center gap-8',
    resultStat: 'text-center',
    resultStatValue: 'text-2xl font-semibold text-white',
    resultStatLabel: 'text-sm text-white/60',
    feedbackCard: 'bg-white/5 border border-white/10 rounded-xl p-6',
    feedbackTitle: 'text-lg font-semibold text-white mb-4 flex items-center gap-2',
    feedbackIcon: 'w-5 h-5 text-primary',
    feedbackContent: 'prose prose-invert max-w-none',
    actions: 'flex justify-center gap-4 mt-8',
    actionButton: 'px-6 py-3 rounded-lg transition-colors',
    secondaryAction: 'bg-white/10 hover:bg-white/15 text-white',
    backButton: 'flex items-center gap-2 text-white/70 hover:text-white transition-colors',
};

export function InterviewSession({ interviewId }: InterviewSessionProps) {
    const t = useTranslations('interview');
    const router = useRouter();
    const { data: interview, isLoading } = useInterview(interviewId);
    
    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [generateError, setGenerateError] = useState<string | null>(null);
    const [showEndConfirm, setShowEndConfirm] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const { elapsedTime, formattedTime, exceeded, isLoaded: timerLoaded, start: startTimer, stop: stopTimer } = useInterviewTimer(interviewId, false);
    
    const { isRecording, isSupported: speechSupported, toggleRecording } = useSpeechRecognition({
        language: interview?.language === 'en' ? 'en-US' : 'zh-CN',
        onResult: (transcript) => setUserAnswer(prev => prev + transcript),
    });

    // AI 语音输出
    const { speak: speakAi, stop: stopAiSpeech, isSpeaking: isAiSpeaking } = useSpeechSynthesis({
        language: interview?.language === 'en' ? 'en-US' : 'zh-CN',
        rate: 1.1,
    });

    // 加载持久化的聊天消息
    useEffect(() => {
        // 已完成或评分中状态：立即加载消息，不等待计时器
        if (interview && !messagesLoaded && (interview.status === 'completed' || interview.status === 'evaluating')) {
            setMessagesLoaded(true);
            getChatMessages(interviewId).then(savedMessages => {
                if (savedMessages.length > 0) {
                    setMessages(savedMessages.map(m => ({ role: m.role, content: m.content })));
                }
            }).catch(console.error);
            return;
        }
        
        // 进行中状态：等待计时器加载后再加载消息
        if (interview && !messagesLoaded && timerLoaded) {
            setMessagesLoaded(true);
            getChatMessages(interviewId).then(savedMessages => {
                if (savedMessages.length > 0) {
                    setMessages(savedMessages.map(m => ({ role: m.role, content: m.content })));
                }
                if (interview.status !== 'completed' && !exceeded) {
                    startTimer();
                    const aiCount = savedMessages.filter(m => m.role === 'assistant').length;
                    const userCount = savedMessages.filter(m => m.role === 'user').length;
                    if (savedMessages.length === 0 || aiCount <= userCount) {
                        generateNewQuestion();
                    }
                }
            }).catch(console.error);
        }
    }, [interview, messagesLoaded, interviewId, timerLoaded, exceeded]);

    // 处理超时自动结束面试（1小时）
    useEffect(() => {
        if (exceeded && interview?.status !== 'completed' && interview?.status !== 'evaluating') {
            console.log('面试时间已达1小时，自动结束面试');
            handleEndInterview();
        }
    }, [exceeded, interview?.status]);

    // 处理AI消息数量达到10次自动结束
    useEffect(() => {
        const aiCount = messages.filter(m => m.role === 'assistant').length;
        if (aiCount >= 10 && interview?.status === 'in_progress' && !isGenerating) {
            console.log('AI消息数量已达10次，自动结束面试');
            // 延迟5秒让用户看到最后的消息
            const timer = setTimeout(() => {
                handleEndInterview();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [messages, interview?.status, isGenerating]);

    // 滚动监听 - 显示/隐藏滚动到顶部按钮
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            // 页面高度足够且向上滚动超过200px时显示
            setShowScrollTop(scrollY > 200 && pageHeight > viewportHeight * 1.5);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 获取 AI 消息数量
    const aiMessageCount = messages.filter(m => m.role === 'assistant').length;

    const generateNewQuestion = async (): Promise<boolean> => {
        setIsGenerating(true);
        setCurrentQuestion('');
        setGenerateError(null);
        
        try {
            let question = '';
            const result = await generateQuestion(interviewId, 'medium', (chunk) => {
                question += chunk;
                setCurrentQuestion(question);
            });
            
            // 如果达到问题限制，自动结束面试
            if (result.reachedLimit) {
                setCurrentQuestion('');
                await handleEndInterview();
                return true; // 已达到限制
            }
            
            // 只有在有内容时才保存消息（不保存空消息或错误消息）
            if (question.trim()) {
                await addChatMessage(interviewId, 'assistant', question);
                const newMessages = [...messages, { role: 'assistant' as const, content: question }];
                setMessages(newMessages);
                setCurrentQuestion('');
                
                // AI 语音播放
                speakAi(question);
            }
            return false;
        } catch (error) {
            console.error('生成问题失败:', error);
            // 生成失败时显示错误，不保存任何内容到后端
            setCurrentQuestion('');
            setGenerateError(error instanceof Error ? error.message : '生成问题失败，请重试');
            return false;
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!userAnswer.trim() || isGenerating) return;
        
        const answer = userAnswer;
        const question = currentQuestion;
        setUserAnswer('');
        setIsGenerating(true);

        setGenerateError(null);
        
        try {
            // 保存用户消息
            await addChatMessage(interviewId, 'user', answer);
            setMessages(prev => [...prev, { role: 'user', content: answer }]);
            
            // 获取反馈
            if (question) {
                let feedback = '';
                await submitAnswer(interviewId, question, answer, (chunk) => {
                    feedback += chunk;
                    setCurrentQuestion(feedback);
                });
                // 只有在有内容时才保存
                if (feedback.trim()) {
                    await addChatMessage(interviewId, 'assistant', feedback);
                    setMessages(prev => [...prev, { role: 'assistant', content: feedback }]);
                }
            }
            
            // 生成下一个问题
            setCurrentQuestion('');
            let nextQuestion = '';
            const result = await generateQuestion(interviewId, 'medium', (chunk) => {
                nextQuestion += chunk;
                setCurrentQuestion(nextQuestion);
            });
            
            // 如果达到问题限制，自动结束面试
            if (result.reachedLimit) {
                setCurrentQuestion('');
                setIsGenerating(false);
                await handleEndInterview();
                return;
            }
            
            // 只有在有内容时才保存
            if (nextQuestion.trim()) {
                await addChatMessage(interviewId, 'assistant', nextQuestion);
                setMessages(prev => [...prev, { role: 'assistant', content: nextQuestion }]);
            }
            setCurrentQuestion('');
        } catch (error) {
            console.error('操作失败:', error);
            setCurrentQuestion('');
            setGenerateError(error instanceof Error ? error.message : '生成失败，请重试');
        } finally {
            setIsGenerating(false);
        }
    };

    // 点击结束按钮时显示确认框
    const confirmEndInterview = () => {
        setShowEndConfirm(true);
    };

    const handleEndInterview = async () => {
        setShowEndConfirm(false);
        stopTimer();
        try {
            await completeInterview(interviewId, messages, elapsedTime);
            // 直接返回面试列表页面，后台异步处理评分
            router.push('/dashboard/interview');
        } catch (error) {
            console.error('结束面试失败:', error);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <Loader2 className={styles.loadingIcon} />
                    <p className={styles.loadingText}>加载中...</p>
                </div>
            </div>
        );
    }

    // 评分中 - 重定向到结果页面
    if (interview?.status === 'evaluating') {
        router.push(`/dashboard/interview/${interviewId}/result`);
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <Loader2 className={styles.loadingIcon} />
                </div>
            </div>
        );
    }

    // 已完成 - 显示聊天记录（只读模式）
    const isCompleted = interview?.status === 'completed';

    // 进行中或已完成 - 显示聊天界面
    return (
        <div className={styles.container}>
            {isCompleted ? (
                // 已完成 - 显示只读 Header
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <button onClick={() => router.push('/dashboard/interview')} className={styles.backButton}>
                        <ChevronLeft className="w-5 h-5" />
                        返回列表
                    </button>
                    <h1 className="text-lg font-semibold text-white">面试记录</h1>
                    <button 
                        onClick={() => router.push(`/dashboard/interview/${interviewId}/result`)}
                        className="px-4 py-2 bg-gradient-to-r from-[#f5a867] to-[#fd409a] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        查看结果
                    </button>
                </div>
            ) : (
                // 进行中 - 显示正常 Header
                <InterviewHeader
                    title={interview?.jobInfo?.name || 'AI 面试'}
                    model={interview?.model || undefined}
                    language={interview?.language || undefined}
                    formattedTime={formattedTime}
                    onEnd={confirmEndInterview}
                    isEnding={isGenerating}
                />
            )}

            {/* 结束面试确认框 */}
            <AlertDialog isOpen={showEndConfirm} onOpenChange={setShowEndConfirm}>
                <AlertDialog.Backdrop variant="blur">
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[420px] bg-[#1a1625] border border-white/10">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status={aiMessageCount < 10 ? "warning" : "accent"} />
                                <AlertDialog.Heading>确认结束面试</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                {aiMessageCount < 10 ? (
                                    <p className="text-yellow-400">
                                        当前面试只进行了 {aiMessageCount} 轮问答，建议完成 10 轮以获得更全面的评估。确定要提前结束吗？
                                    </p>
                                ) : (
                                    <p>面试将结束并生成评估报告，确定要结束吗？</p>
                                )}
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button 
                                    variant="secondary"
                                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                                    onPress={() => setShowEndConfirm(false)}
                                >
                                    继续面试
                                </Button>
                                <Button 
                                    className="bg-gradient-to-r from-[#f5a867] to-[#fd409a] text-white"
                                    onPress={handleEndInterview}
                                >
                                    确认结束
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
            
            <main className={`${styles.main} pb-32`}>
                <div className={styles.chatContainer}>
                    {messages.map((msg, idx) => (
                        <ChatMessage 
                            key={idx} 
                            role={msg.role} 
                            content={msg.content} 
                            language={interview?.language === 'en' ? 'en-US' : 'zh-CN'}
                        />
                    ))}
                    
                    {isGenerating && currentQuestion && (
                        <ChatMessage 
                            role="assistant" 
                            content={currentQuestion} 
                            isStreaming 
                            language={interview?.language === 'en' ? 'en-US' : 'zh-CN'}
                        />
                    )}
                    
                    {isGenerating && !currentQuestion && !generateError && (
                        <ChatMessage role="assistant" content="" isStreaming />
                    )}
                    
                    {/* 错误提示和重试按钮 */}
                    {generateError && !isGenerating && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <span className="flex-1 text-sm">{generateError}</span>
                            <button
                                onClick={() => generateNewQuestion()}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                重试
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* 只在进行中显示输入框 */}
            {!isCompleted && (
                <ChatInput
                    value={userAnswer}
                    onChange={setUserAnswer}
                    onSubmit={handleSubmitAnswer}
                    disabled={isGenerating}
                    isRecording={isRecording}
                    onToggleRecording={toggleRecording}
                    showMic={speechSupported}
                />
            )}

            {/* 滚动到顶部按钮 */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full shadow-lg transition-all z-50"
                    title="滚动到顶部"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </button>
            )}
        </div>
    );
}
