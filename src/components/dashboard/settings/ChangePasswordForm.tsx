'use client';

import { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
} from '@heroui/react';
import OTPInput from '@/components/auth/shared/OTPInput';
import { Mail, KeyRound, Lock, CheckCircle } from 'lucide-react';
import { passwordSchema, useSendOTP, useResetPassword, useCurrentSession } from '@/api/auth';
import { useTranslations } from 'next-intl';

type Step = 'email' | 'otp' | 'reset' | 'success';

const styles = {
    card: 'bg-[#1a1528] rounded-xl border border-white/10 p-6',
    stepIndicator: 'flex items-center justify-center gap-2 mb-6',
    stepDot: 'w-3 h-3 rounded-full transition-colors',
    stepDotActive: 'bg-primary',
    stepDotInactive: 'bg-white/20',
    stepLine: 'w-8 h-0.5 bg-white/20',
    description: 'text-white/60 text-sm mb-4',
};

export function ChangePasswordForm() {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(0);
    const t = useTranslations('settings.security');

    const { data: session } = useCurrentSession();
    const sendOTPMutation = useSendOTP();
    const resetPasswordMutation = useResetPassword();

    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSendOTP = async () => {
        if (!email) return;
        await sendOTPMutation.mutateAsync(email);
        setCountdown(60);
        setStep('otp');
    };

    const handleResendOTP = async () => {
        if (countdown > 0) return;
        await sendOTPMutation.mutateAsync(email);
        setCountdown(60);
    };

    const handleOTPComplete = (value: string) => {
        setOtp(value);
        if (value.length === 6) {
            setStep('reset');
        }
    };

    const handleResetPassword = async (newPassword: string) => {
        await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
        setStep('success');
    };

    const handleStartOver = () => {
        setStep('email');
        setOtp('');
    };

    const resetForm = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: async ({ value }) => {
            await handleResetPassword(value.newPassword);
        },
    });

    const renderStepIndicator = () => (
        <div className={styles.stepIndicator}>
            <div className={`${styles.stepDot} ${step === 'email' || step === 'otp' || step === 'reset' || step === 'success' ? styles.stepDotActive : styles.stepDotInactive}`} />
            <div className={styles.stepLine} />
            <div className={`${styles.stepDot} ${step === 'otp' || step === 'reset' || step === 'success' ? styles.stepDotActive : styles.stepDotInactive}`} />
            <div className={styles.stepLine} />
            <div className={`${styles.stepDot} ${step === 'reset' || step === 'success' ? styles.stepDotActive : styles.stepDotInactive}`} />
        </div>
    );

    if (step === 'success') {
        return (
            <div className={styles.card}>
                <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{t('steps.success')}</h3>
                    <p className="text-white/60 mb-6">{t('steps.successDesc')}</p>
                    <Button onPress={handleStartOver} variant="secondary">
                        {t('actions.return')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            {renderStepIndicator()}

            {step === 'email' && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-white" />
                        <h3 className="text-white font-medium">{t('steps.email')}</h3>
                    </div>
                    <p className={styles.description}>
                        {t('steps.emailDesc')}
                    </p>
                    <div className="space-y-4">
                        <TextField isReadOnly value={email}>
                            <Label>{t('fields.email')}</Label>
                            <Input />
                        </TextField>
                        <Button
                            fullWidth
                            isPending={sendOTPMutation.isPending}
                            onPress={handleSendOTP}
                            className="gradient-btn text-white font-semibold rounded-xl h-12"
                        >
                            {t('actions.sendCode')}
                        </Button>
                    </div>
                </div>
            )}

            {step === 'otp' && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <KeyRound className="w-5 h-5 text-white" />
                        <h3 className="text-white font-medium">{t('steps.otp')}</h3>
                    </div>
                    <p className={styles.description}>
                        {t('steps.otpDesc', { email })}
                    </p>
                    <div className="space-y-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            onComplete={handleOTPComplete}
                        />
                        <div className="flex justify-between items-center">
                            <Button variant="ghost" onPress={() => setStep('email')}>
                                {t('actions.back')}
                            </Button>
                            <Button
                                variant="ghost"
                                isDisabled={countdown > 0}
                                isPending={sendOTPMutation.isPending}
                                onPress={handleResendOTP}
                            >
                                {countdown > 0 ? t('actions.resendCountdown', { countdown }) : t('actions.resend')}
                            </Button>
                        </div>
                        <Button
                            fullWidth
                            isDisabled={otp.length !== 6}
                            onPress={() => setStep('reset')}
                            className="gradient-btn text-white font-semibold rounded-xl h-12"
                        >
                            {t('actions.next')}
                        </Button>
                    </div>
                </div>
            )}

            {step === 'reset' && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-5 h-5 text-white" />
                        <h3 className="text-white font-medium">{t('steps.reset')}</h3>
                    </div>
                    <p className={styles.description}>
                        {t('steps.resetDesc')}
                    </p>
                    <Form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            resetForm.handleSubmit();
                        }}
                    >
                        <resetForm.Field
                            name="newPassword"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = passwordSchema.safeParse(value);
                                    if (!result.success) {
                                        return t('validation.passwordMinLength');
                                    }
                                    return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <TextField
                                    isRequired
                                    name="newPassword"
                                    type="password"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isInvalid={field.state.meta.errors.length > 0}
                                >
                                    <Label>{t('fields.newPassword')}</Label>
                                    <Input placeholder={t('fields.newPasswordPlaceholder')} />
                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                                    )}
                                </TextField>
                            )}
                        </resetForm.Field>

                        <resetForm.Field
                            name="confirmPassword"
                            validators={{
                                onChangeListenTo: ['newPassword'],
                                onChange: ({ value, fieldApi }) => {
                                    const newPassword = fieldApi.form.getFieldValue('newPassword');
                                    if (value !== newPassword) {
                                        return t('validation.passwordMismatch');
                                    }
                                    return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <TextField
                                    isRequired
                                    name="confirmPassword"
                                    type="password"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isInvalid={field.state.meta.errors.length > 0}
                                >
                                    <Label>{t('fields.confirmPassword')}</Label>
                                    <Input placeholder={t('fields.confirmPasswordPlaceholder')} />
                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                                    )}
                                </TextField>
                            )}
                        </resetForm.Field>

                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                fullWidth
                                onPress={() => setStep('otp')}
                                className="rounded-xl h-12"
                            >
                                {t('actions.back')}
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                isPending={resetPasswordMutation.isPending}
                                className="gradient-btn text-white font-semibold rounded-xl h-12"
                            >
                                {t('actions.confirm')}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
}
