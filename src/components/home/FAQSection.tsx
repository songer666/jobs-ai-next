'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

const styles = {
    section: 'py-24 px-4 bg-[#0b081a]',
    container: 'max-w-[1400px] mx-auto',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-16',
    left: {
        wrapper: '',
        title: 'text-4xl md:text-6xl font-bold text-white leading-tight mb-6',
        subtitle: 'text-xl text-white/70 mb-8',
        btn: 'gradient-btn text-white font-medium rounded-full px-8 py-4',
    },
    right: {
        wrapper: 'space-y-4',
    },
    faq: {
        item: 'border-b border-white/10 pb-4',
        header: 'flex items-center justify-between cursor-pointer py-4',
        question: 'text-xl md:text-2xl font-medium text-white pr-8',
        icon: 'w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0',
        iconText: 'text-2xl text-white',
        answer: 'text-white/60 text-lg leading-relaxed pb-4',
    },
};

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className={styles.faq.item}>
            <div className={styles.faq.header} onClick={onToggle}>
                <span className={styles.faq.question}>{question}</span>
                <div className={styles.faq.icon}>
                    <span className={styles.faq.iconText}>{isOpen ? '-' : '+'}</span>
                </div>
            </div>
            {isOpen && <p className={styles.faq.answer}>{answer}</p>}
        </div>
    );
}

export default function FAQSection() {
    const t = useTranslations();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
        { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
        { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
        { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Side */}
                    <div className={styles.left.wrapper}>
                        <h2 className={styles.left.title}>{t('faq.title')}</h2>
                        <p className={styles.left.subtitle}>{t('faq.subtitle')}</p>
                        <Button className={styles.left.btn}>
                            {t('faq.contact')}
                        </Button>
                    </div>

                    {/* Right Side - FAQ List */}
                    <div className={styles.right.wrapper}>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
