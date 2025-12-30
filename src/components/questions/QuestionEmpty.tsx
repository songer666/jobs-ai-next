'use client';

import { BookOpen, Sparkles } from 'lucide-react';

interface QuestionEmptyProps {
    onGenerate?: () => void;
}

const styles = {
    container: 'flex flex-col items-center justify-center py-16 text-center',
    iconWrapper: 'w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6',
    icon: 'w-10 h-10 text-primary',
    title: 'text-xl font-semibold text-white mb-2',
    description: 'text-white/60 mb-6 max-w-md',
    button: 'flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium gradient-btn transition-all hover:scale-105',
};

export function QuestionEmpty({ onGenerate }: QuestionEmptyProps) {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <BookOpen className={styles.icon} />
            </div>
            <h2 className={styles.title}>还没有练习题目</h2>
            <p className={styles.description}>
                选择一个职位，让 AI 为你生成针对性的技术题目，开始你的练习之旅吧！
            </p>
            <button onClick={onGenerate} className={styles.button}>
                <Sparkles className="w-4 h-4" />
                生成第一道题目
            </button>
        </div>
    );
}
