'use client';

import { Send } from 'lucide-react';
import { workspaceStyles as styles } from '../styles/workspace';
import { useTranslations } from 'next-intl';

interface AnswerInputProps {
    answer: string;
    onAnswerChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export function AnswerInput({ 
    answer, 
    onAnswerChange, 
    onSubmit, 
    disabled = false 
}: AnswerInputProps) {
    const t = useTranslations('questions');
    
    return (
        <div className={styles.answerSection}>
            <label className={styles.answerLabel}>{t('answerInput.label')}</label>
            <textarea
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder={t('answerInput.placeholder')}
                className={styles.textarea}
            />
            <button
                type="button"
                onClick={onSubmit}
                disabled={disabled || !answer.trim()}
                className={styles.submitButton}
            >
                <Send className="w-4 h-4" />
                {t('answerInput.submit')}
            </button>
        </div>
    );
}
