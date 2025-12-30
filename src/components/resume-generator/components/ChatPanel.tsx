'use client';

import { RefObject } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { workspaceStyles as styles } from '../styles';
import type { ChatMessage } from '@/api/resume';
import { useTranslations } from 'next-intl';

interface ChatPanelProps {
    messages: ChatMessage[];
    inputValue: string;
    isLoading: boolean;
    messagesEndRef: RefObject<HTMLDivElement | null>;
    onInputChange: (value: string) => void;
    onSend: () => void;
}

export function ChatPanel({
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    onInputChange,
    onSend,
}: ChatPanelProps) {
    const t = useTranslations('resumeGenerator');
    
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatMessages}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`${styles.messageBubble} ${
                                msg.role === 'user' ? styles.messageUser : styles.messageAssistant
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`${styles.messageBubble} ${styles.messageAssistant}`}>
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatInputWrapper}>
                <div className={styles.chatInputRow}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSend()}
                        placeholder={t('chat.placeholder')}
                        disabled={isLoading}
                        className={styles.chatInput}
                    />
                    <button
                        type="button"
                        onClick={onSend}
                        disabled={!inputValue.trim() || isLoading}
                        className={styles.primaryButton}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
