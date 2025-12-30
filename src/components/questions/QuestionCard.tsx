'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Calendar, Star, ChevronRight, BookOpen, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { AlertDialog } from '@heroui/react';
import type { Question } from '@/api/question';
import { getDifficultyLabel, getDifficultyColor } from '@/api/question';

interface QuestionCardProps {
    question: Question;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
}

const styles = {
    card: 'bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors group',
    header: 'flex items-start justify-between gap-4 mb-4',
    headerContent: 'flex-1 min-w-0',
    title: 'text-base font-medium text-white line-clamp-2 leading-relaxed',
    badges: 'flex items-center gap-2 flex-shrink-0',
    badge: 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
    badgeEasy: 'bg-green-500/20 text-green-400',
    badgeMedium: 'bg-yellow-500/20 text-yellow-400',
    badgeHard: 'bg-red-500/20 text-red-400',
    statusBadge: 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
    statusAnswered: 'bg-blue-500/20 text-blue-400',
    statusPending: 'bg-white/10 text-white/60',
    meta: 'flex flex-wrap items-center gap-4 text-sm text-white/60',
    metaItem: 'flex items-center gap-1.5',
    metaIcon: 'w-4 h-4',
    score: 'flex items-center gap-1.5',
    scoreValue: 'text-primary font-semibold',
    actions: 'flex items-center gap-2 mt-4 pt-4 border-t border-white/10',
    viewButton: 'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground text-sm font-semibold transition-all',
    viewButtonIcon: 'w-4 h-4',
    deleteButton: 'p-2.5 rounded-lg border border-white/10 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors',
    deleteButtonIcon: 'w-4 h-4',
    dialog: 'sm:max-w-[500px] bg-[#2a2a2a] border border-white/10',
    dialogHeader: 'flex items-start gap-4 pb-4',
    dialogIconWrapper: 'flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center',
    dialogIcon: 'w-6 h-6 text-red-500',
    dialogHeaderContent: 'flex-1',
    dialogHeading: 'text-xl font-semibold text-white mb-2',
    dialogBody: 'text-white/70 leading-relaxed',
    dialogFooter: 'flex items-center justify-end gap-3 pt-6',
    cancelButton: 'px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors',
    confirmDeleteButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium',
};

const difficultyStyles: Record<string, string> = {
    easy: styles.badgeEasy,
    medium: styles.badgeMedium,
    hard: styles.badgeHard,
};

export function QuestionCard({ question, onDelete, isDeleting }: QuestionCardProps) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isAnswered = !!question.answer;
    const truncatedText = question.text.length > 100 
        ? question.text.substring(0, 100) + '...' 
        : question.text;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h3 className={styles.title}>{truncatedText}</h3>
                </div>
                <div className={styles.badges}>
                    <span className={`${styles.badge} ${difficultyStyles[question.difficulty]}`}>
                        {getDifficultyLabel(question.difficulty)}
                    </span>
                    <span className={`${styles.statusBadge} ${isAnswered ? styles.statusAnswered : styles.statusPending}`}>
                        {isAnswered ? (
                            <>
                                <CheckCircle className="w-3 h-3" />
                                已答
                            </>
                        ) : (
                            <>
                                <HelpCircle className="w-3 h-3" />
                                待答
                            </>
                        )}
                    </span>
                </div>
            </div>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {formatDate(question.createdAt)}
                </span>
                {question.jobInfo && (
                    <span className={styles.metaItem}>
                        <BookOpen className={styles.metaIcon} />
                        {question.jobInfo.name}
                    </span>
                )}
                {question.score !== null && (
                    <span className={styles.score}>
                        <Star className={styles.metaIcon} />
                        <span className={styles.scoreValue}>{question.score}</span>/10
                    </span>
                )}
            </div>

            <div className={styles.actions}>
                <Link 
                    href={`/dashboard/questions/${question.id}`}
                    className={styles.viewButton}
                >
                    {isAnswered ? '查看答案' : '开始作答'}
                    <ChevronRight className={styles.viewButtonIcon} />
                </Link>
                <button 
                    type="button"
                    onClick={() => setIsDeleteOpen(true)}
                    disabled={isDeleting}
                    className={styles.deleteButton}
                    title="删除题目"
                >
                    <Trash2 className={styles.deleteButtonIcon} />
                </button>
                
                <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className={styles.dialog}>
                                <AlertDialog.CloseTrigger />
                                <div className={styles.dialogHeader}>
                                    <div className={styles.dialogIconWrapper}>
                                        <AlertCircle className={styles.dialogIcon} />
                                    </div>
                                    <div className={styles.dialogHeaderContent}>
                                        <h2 className={styles.dialogHeading}>删除题目？</h2>
                                        <p className={styles.dialogBody}>
                                            确定要永久删除这道题目吗？此操作无法撤销。
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.dialogFooter}>
                                    <button 
                                        type="button"
                                        onClick={() => setIsDeleteOpen(false)}
                                        className={styles.cancelButton}
                                    >
                                        取消
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            onDelete?.(question.id);
                                            setIsDeleteOpen(false);
                                        }}
                                        disabled={isDeleting}
                                        className={styles.confirmDeleteButton}
                                    >
                                        {isDeleting ? '删除中...' : '删除'}
                                    </button>
                                </div>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            </div>
        </div>
    );
}
