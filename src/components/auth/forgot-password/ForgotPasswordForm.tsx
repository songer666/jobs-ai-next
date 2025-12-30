'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSendOTP, useResetPassword } from '@/api/auth';
import { authStyles } from '../shared';
import StepIndicator from './StepIndicator';
import EmailStep from './EmailStep';
import OTPStep from './OTPStep';
import ResetStep from './ResetStep';
import SuccessStep from './SuccessStep';
import { useOTPStore } from '@/store/otp/store';

type LocalStep = 'email' | 'otp' | 'reset' | 'success';

export default function ForgotPasswordForm() {
  const t = useTranslations('auth');
  const {
    flowType,
    step: storeStep,
    email: storeEmail,
    otp: storeOtp,
    startFlow,
    goToOTPStep,
    goBack,
    setOTP,
    startCountdown,
    getRemainingSeconds,
    clearFlow,
  } = useOTPStore();

  const [localStep, setLocalStep] = useState<LocalStep>('email');
  const [countdown, setCountdown] = useState(0);

  const sendOTPMutation = useSendOTP();
  const resetPasswordMutation = useResetPassword();

  // 使用全局共享的倒计时
  useEffect(() => {
    // 初始化时从 store 恢复倒计时
    setCountdown(getRemainingSeconds());

    // 每秒更新倒计时
    const interval = setInterval(() => {
      const remaining = getRemainingSeconds();
      setCountdown(remaining);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 同步 store 步骤到本地步骤
  useEffect(() => {
    if (flowType === 'forgot-password' && storeStep === 'otp') {
      setLocalStep('otp');
    }
  }, [flowType, storeStep]);

  const handleEmailSubmit = async (emailValue: string) => {
    startFlow('forgot-password', { email: emailValue });
    goToOTPStep();
    setLocalStep('otp');
    // 只有在倒计时结束后才重新发送验证码
    if (countdown === 0) {
      startCountdown(60);
      sendOTPMutation.mutate(emailValue);
    }
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    startCountdown(60);
    sendOTPMutation.mutate(storeEmail);
  };

  const handleOTPComplete = (value: string) => {
    setOTP(value);
    if (value.length === 6) {
      setLocalStep('reset');
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    await resetPasswordMutation.mutateAsync({ email: storeEmail, otp: storeOtp, newPassword });
    clearFlow('forgot-password');
    setLocalStep('success');
  };

  const handleBack = () => {
    if (localStep === 'otp') {
      goBack();
      setLocalStep('email');
    } else if (localStep === 'reset') {
      setLocalStep('otp');
    }
  };

  const handleStepClick = (targetStep: 'email' | 'otp' | 'reset' | 'success') => {
    if (targetStep === 'email' && (localStep === 'otp' || localStep === 'reset')) {
      goBack();
      setLocalStep('email');
    } else if (targetStep === 'otp' && localStep === 'reset') {
      setLocalStep('otp');
    }
  };

  if (localStep === 'success') {
    return <SuccessStep />;
  }

  return (
    <div>
      <StepIndicator 
        currentStep={localStep}
        onStepClick={handleStepClick}
        canGoBack={true}
      />

      {localStep === 'email' && (
        <EmailStep onSubmit={handleEmailSubmit} isPending={sendOTPMutation.isPending} />
      )}

      {localStep === 'otp' && (
        <OTPStep
          email={storeEmail}
          otp={storeOtp}
          countdown={countdown}
          onOtpChange={setOTP}
          onComplete={handleOTPComplete}
          onResend={handleResendOTP}
          onNext={() => setLocalStep('reset')}
          isResending={sendOTPMutation.isPending}
        />
      )}

      {localStep === 'reset' && (
        <ResetStep
          onSubmit={handleResetPassword}
          isPending={resetPasswordMutation.isPending}
        />
      )}

      <div className={authStyles.footer.wrapper}>
        <Link href="/login" className={authStyles.footer.link}>
          ← {t('backToLogin')}
        </Link>
      </div>
    </div>
  );
}
