'use client';

import { Loader2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { analyzerStyles as styles } from '../styles';
import { CodeBlock } from '@/components/common/CodeBlock';

interface AnalysisResultProps {
    result: string;
    score: number | null;
    isAnalyzing: boolean;
    onReset: () => void;
}

export function AnalysisResult({
    result,
    score,
    isAnalyzing,
    onReset,
}: AnalysisResultProps) {
    return (
        <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
                <div className="flex items-center gap-3">
                    <span className={styles.resultTitle}>分析结果</span>
                    {score !== null && (
                        <span className="px-3 py-1 bg-gradient-to-r from-[#fd409a]/20 to-[#f5a867]/20 text-[#fd409a] rounded-full text-sm font-medium">
                            评分: {score}/100
                        </span>
                    )}
                </div>
                {!isAnalyzing && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        重新分析
                    </button>
                )}
            </div>
            
            <div className={styles.resultText}>
                {isAnalyzing && !result && (
                    <div className="flex items-center gap-2 text-white/60">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        正在分析中，请稍候...
                    </div>
                )}
                {result && (
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
                            {result}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
