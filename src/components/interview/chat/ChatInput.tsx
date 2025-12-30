'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    isRecording?: boolean;
    onToggleRecording?: () => void;
    showMic?: boolean;
    placeholder?: string;
}

const styles = {
    controls: 'fixed bottom-0 left-0 right-0 bg-[#0b081a] border-t border-white/10 p-4 md:p-6',
    controlsInner: 'max-w-7xl mx-auto flex items-end justify-center gap-3 md:gap-4',
    textarea: 'flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 resize-none text-sm md:text-base min-h-[48px] max-h-[200px] overflow-y-auto',
    micButton: 'w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shrink-0',
    micButtonActive: 'bg-red-500 animate-pulse',
    micButtonInactive: 'bg-gradient-to-r from-[#fd409a] to-[#f5a867] hover:scale-105',
    micIcon: 'w-5 h-5 md:w-6 md:h-6 text-white',
};

export function ChatInput({
    value,
    onChange,
    onSubmit,
    disabled,
    isRecording,
    onToggleRecording,
    showMic,
    placeholder = '输入你的回答，按 Enter 发送...',
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 自动调整高度
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    }, [value]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={styles.controls}>
            <div className={styles.controlsInner}>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={styles.textarea}
                    rows={1}
                    disabled={disabled}
                />
                {showMic && onToggleRecording && (
                    <button
                        onClick={onToggleRecording}
                        disabled={disabled}
                        className={`${styles.micButton} ${isRecording ? styles.micButtonActive : styles.micButtonInactive}`}
                        title={isRecording ? '停止录音' : '开始语音输入'}
                    >
                        {isRecording ? (
                            <MicOff className={styles.micIcon} />
                        ) : (
                            <Mic className={styles.micIcon} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
