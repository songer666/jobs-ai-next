'use client';

import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { workspaceStyles as styles } from '../styles/workspace';

interface GeneratingStateProps {
    questionText: string;
}

export function GeneratingState({ questionText }: GeneratingStateProps) {
    return (
        <div className={styles.generatingWrapper}>
            <Loader2 className={styles.generatingIcon} />
            <p className={styles.generatingText}>正在生成题目，请稍候...</p>
            
            {questionText && (
                <div className={styles.streamingContent}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {questionText}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}
