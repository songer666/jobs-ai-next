"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSendRegisterOTP, useRegisterWithOTP } from "@/api/auth";
import { GitHubButton, Divider, authStyles } from "../shared";
import StepIndicator from "./StepIndicator";
import InfoStep from "./InfoStep";
import OTPStep from "./OTPStep";
import { useOTPStore } from "@/store/otp/store";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const {
    flowType,
    step,
    email,
    password,
    name,
    otp,
    startFlow,
    goToOTPStep,
    goBack,
    setOTP,
    startCountdown,
    getRemainingSeconds,
    clearFlow,
  } = useOTPStore();

  const [countdown, setCountdown] = useState(0);

  const sendOTPMutation = useSendRegisterOTP();
  const registerMutation = useRegisterWithOTP();

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
  }, []);

  // 注册成功后清除状态
  useEffect(() => {
    if (registerMutation.isSuccess) {
      clearFlow("register");
    }
  }, [registerMutation.isSuccess, clearFlow]);

  // 当前是否在注册流程的 OTP 步骤
  const currentStep =
    flowType === "register" && step === "otp" ? "otp" : "info";

  const handleInfoSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    startFlow("register", data);
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

  const handleRegister = async () => {
    if (otp.length !== 6) return;
    await registerMutation.mutateAsync({ name, email, password, otp });
  };

  const handleStepClick = (targetStep: "info" | "otp") => {
    if (targetStep === "info" && currentStep === "otp") {
      goBack();
    }
  };

  return (
    <div>
      <StepIndicator
        currentStep={currentStep}
        onStepClick={handleStepClick}
        canGoBack={true}
      />

      {currentStep === "info" ? (
        <InfoStep
          onSubmit={handleInfoSubmit}
          isPending={sendOTPMutation.isPending}
        />
      ) : (
        <OTPStep
          email={email}
          otp={otp}
          countdown={countdown}
          onOtpChange={setOTP}
          onResend={handleResendOTP}
          onSubmit={handleRegister}
          isResending={sendOTPMutation.isPending}
          isSubmitting={registerMutation.isPending}
        />
      )}

      {currentStep === "info" && (
        <>
          <Divider />
          <GitHubButton />
        </>
      )}

      <div className={authStyles.footer.wrapper}>
        <p className={authStyles.footer.text}>
          {t("hasAccount")}
          <Link href="/" className={authStyles.footer.link}>
            {t("loginNow")}
          </Link>
        </p>
      </div>
    </div>
  );
}
