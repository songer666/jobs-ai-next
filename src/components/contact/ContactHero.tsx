'use client';

import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useSendContactMessage } from '@/api/contact';
import { useContactStore } from '@/store/contact/store';

const styles = {
    section: 'relative pt-40 pb-24 px-4 overflow-hidden',
    bgRadial: 'absolute top-[100px] left-1/2 -translate-x-1/2 w-[1800px] h-[600px] bg-gradient-radial mix-blend-overlay',
    container: 'relative max-w-[1200px] mx-auto z-10',
    header: {
        wrapper: 'text-center mb-16',
        badge: 'inline-block gradient-btn text-white text-sm font-medium px-4 py-2 rounded-full mb-6',
        title: 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4',
        subtitle: 'text-xl text-white/60',
    },
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-16',
    form: {
        wrapper: 'glass-card p-8',
        title: 'text-2xl font-bold text-white mb-6',
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4',
        field: 'space-y-2',
        label: 'text-sm text-white/60',
        input: 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary transition-colors',
        textarea: 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-primary transition-colors min-h-[150px] resize-none',
        btn: 'w-full gradient-btn text-white font-semibold rounded-full py-4 mt-4',
    },
    info: {
        wrapper: 'space-y-8',
        card: 'glass-card-sm p-6 flex items-start gap-4',
        icon: 'w-12 h-12 rounded-xl gradient-btn flex items-center justify-center flex-shrink-0',
        iconText: 'text-xl',
        content: 'flex-1',
        title: 'text-lg font-bold text-white mb-1',
        text: 'text-white/60',
        social: {
            wrapper: 'mt-8',
            title: 'text-lg font-bold text-white mb-4',
            icons: 'flex gap-4',
            icon: 'w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer',
        },
    },
};

const contactIcons = ['📍', '📧', '📞', '⏰'];
const infoKeys = ['address', 'email', 'phone', 'hours'] as const;

export default function ContactHero() {
    const t = useTranslations('contact');
    const sendMessage = useSendContactMessage();
    const { canSend, recordSent, getRemainingTime } = useContactStore();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        setRemainingTime(getRemainingTime());
        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [getRemainingTime]);

    const handleSubmit = async () => {
        if (!canSend()) {
            return;
        }

        // 表单验证
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return;
        }

        // 验证消息长度
        if (formData.message.length < 10) {
            return;
        }

        try {
            await sendMessage.mutateAsync(formData);
            recordSent();
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('发送失败:', error);
        }
    };

    // 表单验证
    const isFormValid = formData.name && 
                        formData.email && 
                        formData.subject && 
                        formData.message.length >= 10;
    
    const isDisabled = !canSend() || sendMessage.isPending || !isFormValid;
    
    const buttonText = !canSend() 
        ? `请等待 ${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`
        : sendMessage.isPending 
        ? '发送中...' 
        : t('form.submit');

    return (
        <section className={styles.section}>
            <div className={styles.bgRadial} />
            
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header.wrapper}>
                    <span className={styles.header.badge}>{t('badge')}</span>
                    <h1 className={styles.header.title}>{t('title')}</h1>
                    <p className={styles.header.subtitle}>{t('subtitle')}</p>
                </div>

                <div className={styles.grid}>
                    {/* Contact Form */}
                    <div className={styles.form.wrapper}>
                        <h2 className={styles.form.title}>{t('form.title')}</h2>
                        <div className={styles.form.grid}>
                            <div className={styles.form.field}>
                                <label className={styles.form.label}>{t('form.name')}</label>
                                <input 
                                    type="text" 
                                    placeholder={t('form.namePlaceholder')}
                                    className={styles.form.input}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.form.field}>
                                <label className={styles.form.label}>{t('form.email')}</label>
                                <input 
                                    type="email" 
                                    placeholder={t('form.emailPlaceholder')}
                                    className={styles.form.input}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className={styles.form.field}>
                            <label className={styles.form.label}>{t('form.subject')}</label>
                            <input 
                                type="text" 
                                placeholder={t('form.subjectPlaceholder')}
                                className={styles.form.input}
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>
                        <div className={`${styles.form.field} mt-4`}>
                            <div className="flex items-center justify-between mb-2">
                                <label className={styles.form.label}>{t('form.message')}</label>
                                <span className={`text-xs ${formData.message.length >= 10 ? 'text-green-400' : 'text-white/40'}`}>
                                    {formData.message.length}/10 字符
                                </span>
                            </div>
                            <textarea 
                                placeholder={t('form.messagePlaceholder')}
                                className={styles.form.textarea}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <Button 
                            className={styles.form.btn}
                            onClick={handleSubmit}
                            isDisabled={isDisabled}
                        >
                            {buttonText}
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.info.wrapper}>
                        {infoKeys.map((key, index) => (
                            <div key={index} className={styles.info.card}>
                                <div className={styles.info.icon}>
                                    <span className={styles.info.iconText}>{contactIcons[index]}</span>
                                </div>
                                <div className={styles.info.content}>
                                    <h3 className={styles.info.title}>{t(`info.${key}.title`)}</h3>
                                    <p className={styles.info.text}>{t(`info.${key}.text`)}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social */}
                        <div className={styles.info.social.wrapper}>
                            <h3 className={styles.info.social.title}>{t('social')}</h3>
                            <div className={styles.info.social.icons}>
                                <a href="#" className={styles.info.social.icon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a href="#" className={styles.info.social.icon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a href="#" className={styles.info.social.icon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
