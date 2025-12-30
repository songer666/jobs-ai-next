'use client';

import { workspaceStyles as styles } from '../styles/workspace';

interface UserAnswerCardProps {
    answer: string;
}

export function UserAnswerCard({ answer }: UserAnswerCardProps) {
    return (
        <div className={styles.answerCard}>
            <div className={styles.answerCardLabel}>你的答案</div>
            <div className={styles.answerCardText}>{answer}</div>
        </div>
    );
}
