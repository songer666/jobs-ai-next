'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { OTPInput, authStyles } from '../shared';

interface OTPStepProps {
  email: string;
  otp: string;
  countdown: number;
  onOtpChange: (value: string) => void;
  onResend: () => void;
  onSubmit: () => void;
  isResending: boolean;
  isSubmitting: boolean;
}

export default function OTPStep({
  email,
  otp,
  countdown,
  onOtpChange,
  onResend,
  onSubmit,
  isResending,
  isSubmitting,
}: OTPStepProps) {
  const t = useTranslations('auth');

  return (
    <>
      <div className="text-center mb-6">
        <p className="text-white/60 text-sm">
          {t('otpSentTo')} <span className="text-white">{email}</span>
        </p>
      </div>

      <OTPInput value={otp} onChange={onOtpChange} onComplete={onSubmit} />

      <div className={authStyles.resend.wrapper}>
        <button
          className={authStyles.resend.btn}
          onClick={onResend}
          disabled={countdown > 0 || isResending}
          type="button"
        >
          {countdown > 0 ? `${t('resendIn')} ${countdown}s` : t('resendOTP')}
        </button>
      </div>

      <Button
        fullWidth
        isDisabled={otp.length !== 6 || countdown > 0}
        isPending={isSubmitting}
        onPress={onSubmit}
        className="gradient-btn text-white font-semibold rounded-xl h-12 mt-6"
      >
        {countdown > 0 ? `${t('registerBtn')} (${countdown}s)` : t('registerBtn')}
      </Button>
    </>
  );
}
