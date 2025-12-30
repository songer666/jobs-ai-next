'use client';

import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useResumeGenerator } from './hooks';
import { workspaceStyles as styles } from './styles';
import { CodeBlock } from '@/components/common/CodeBlock';
import { useTranslations } from 'next-intl';
import {
    WorkspaceHeader,
    ChatPanel,
    GeneratingState,
    ConfigPanel,
    StylePromptInput,
} from './components';

export function ResumeGeneratorWorkspace() {
    const t = useTranslations('resumeGenerator');
    const {
        usage,
        phase,
        messages,
        inputValue,
        isLoading,
        generatedText,
        selectedJobInfoId,
        language,
        model,
        stylePrompt,
        messagesEndRef,
        setInputValue,
        setSelectedJobInfoId,
        setLanguage,
        setModel,
        setStylePrompt,
        startGeneration,
        sendMessage,
        reset,
    } = useResumeGenerator();

    // 生成表单 - 默认显示
    if (phase === 'idle' || phase === 'wizard') {
        return (
            <div className={styles.container}>
                <WorkspaceHeader subtitle={t('workspace.subtitle')} />
                
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
                    
                    {/* 样式设置 */}
                    <StylePromptInput
                        value={stylePrompt}
                        onChange={setStylePrompt}
                    />
                    
                    {/* 个人信息提示 */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-400 text-sm font-medium">{t('workspace.tip')}</span>
                        </div>
                        <p className="text-white/60 text-sm">
                            {t('workspace.tipDescription')}
                        </p>
                    </div>
                    
                    {/* 生成按钮 */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={startGeneration}
                            disabled={isLoading || (usage && usage.generateRemaining <= 0)}
                            className={`${styles.primaryButton} ${(isLoading || (usage && usage.generateRemaining <= 0)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <Sparkles className="w-5 h-5 inline mr-2 animate-pulse" />
                                    {t('workspace.generatingBtn')}
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 inline mr-2" />
                                    {t('workspace.startGenerate')}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 对话状态
    if (phase === 'chatting') {
        return (
            <div className={styles.container}>
                <div className="flex justify-between items-center mb-4">
                    <WorkspaceHeader subtitle={t('workspace.chatting')} />
                    <button type="button" onClick={reset} className={styles.ghostButton}>
                        {t('workspace.backToList')}
                    </button>
                </div>
                
                <ChatPanel
                    messages={messages}
                    inputValue={inputValue}
                    isLoading={isLoading}
                    messagesEndRef={messagesEndRef}
                    onInputChange={setInputValue}
                    onSend={sendMessage}
                />
            </div>
        );
    }

    // 生成中状态
    if (phase === 'generating') {
        return (
            <div className={styles.container}>
                <WorkspaceHeader subtitle={t('workspace.generating')} />
                <GeneratingState generatedText={generatedText} />
            </div>
        );
    }

    // 完成状态
    return (
        <div className={styles.container}>
            <WorkspaceHeader subtitle={t('workspace.completed')} />
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ className, children }) {
                                const content = String(children).replace(/\n$/, '');
                                const isInline = !className;
                                return (
                                    <CodeBlock className={className} inline={isInline}>
                                        {content}
                                    </CodeBlock>
                                );
                            },
                        }}
                    >
                        {generatedText}
                    </ReactMarkdown>
                </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
                <button type="button" onClick={reset} className={styles.primaryButton}>
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    {t('workspace.continueGenerate')}
                </button>
            </div>
        </div>
    );
}
