'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSendLoginOTP, useLoginWithOTP } from '@/api/auth';
import { GitHubButton, Divider, authStyles } from '../shared';
import StepIndicator from './StepIndicator';
import CredentialsStep from './CredentialsStep';
import OTPStep from './OTPStep';
import { useOTPStore } from '@/store/otp/store';

export default function LoginForm() {
  const t = useTranslations('auth');
  const {
    flowType,
    step,
    email,
    password,
    rememberMe,
    otp,
    startFlow,
    goToOTPStep,
    goBack,
    setOTP,
    startCountdown,
    getRemainingSeconds,
    clearFlow,
  } = useOTPStore();

  const sendOTPMutation = useSendLoginOTP();
  const loginMutation = useLoginWithOTP();

  // 使用全局共享的倒计时
  const [countdown, setCountdown] = useState(0);

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

  // 登录成功后清除状态
  useEffect(() => {
    if (loginMutation.isSuccess) {
      clearFlow('login');
    }
  }, [loginMutation.isSuccess, clearFlow]);

  // 当前是否在登录流程的 OTP 步骤
  const currentStep = flowType === 'login' && step === 'otp' ? 'otp' : 'credentials';

  const handleCredentialsSubmit = async (data: { email: string; password: string; rememberMe: boolean }) => {
    // 保存数据并立即进入 OTP 步骤
    startFlow('login', data);
    goToOTPStep();
    // 只有在倒计时结束后才重新发送验证码
    if (countdown === 0) {
      startCountdown(60);
      sendOTPMutation.mutate(data.email);
    }
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    startCountdown(60);
    sendOTPMutation.mutate(email);
  };

  const handleLogin = async () => {
    if (otp.length !== 6) return;
    await loginMutation.mutateAsync({
      email,
      password,
      otp,
    });
  };

  const handleBack = () => {
    goBack();
  };

  const handleStepClick = (targetStep: 'credentials' | 'otp') => {
    if (targetStep === 'credentials' && step === 'otp') {
      goBack();
    }
  };

  return (
    <div>
      <StepIndicator 
        currentStep={step} 
        onStepClick={handleStepClick}
        canGoBack={true}
      />

      {step === 'credentials' ? (
        <CredentialsStep onSubmit={handleCredentialsSubmit} isPending={sendOTPMutation.isPending} />
      ) : (
        <OTPStep
          email={email}
          otp={otp}
          countdown={countdown}
          onOtpChange={setOTP}
          onResend={handleResendOTP}
          onSubmit={handleLogin}
          isResending={sendOTPMutation.isPending}
          isSubmitting={loginMutation.isPending}
        />
      )}

      {step === 'credentials' && (
        <>
          <Divider />
          <GitHubButton />
        </>
      )}

      <div className={authStyles.footer.wrapper}>
        <p className={authStyles.footer.text}>
          {t('noAccount')}
          <Link href="/register" className={authStyles.footer.link}>
            {t('registerNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}
