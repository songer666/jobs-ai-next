"use client";

import { authStyles } from "../shared";

interface StepIndicatorProps {
  currentStep: "credentials" | "otp";
  onStepClick?: (step: "credentials" | "otp") => void;
  canGoBack?: boolean;
}

export default function StepIndicator({
  currentStep,
  onStepClick,
  canGoBack = false,
}: StepIndicatorProps) {
  const handleStep1Click = () => {
    if (currentStep === "otp" && canGoBack && onStepClick) {
      onStepClick("credentials");
    }
  };

  return (
    <div className={authStyles.steps.wrapper}>
      <div
        className={`${authStyles.steps.step} ${currentStep === "credentials" ? authStyles.steps.active : authStyles.steps.completed} ${currentStep === "otp" && canGoBack ? "cursor-pointer hover:opacity-80" : ""}`}
        onClick={handleStep1Click}
        role={currentStep === "otp" && canGoBack ? "button" : undefined}
        tabIndex={currentStep === "otp" && canGoBack ? 0 : undefined}
      >
        {currentStep === "credentials" ? "1" : "✓"}
      </div>
      <div
        className={
          currentStep !== "credentials"
            ? authStyles.steps.lineActive
            : authStyles.steps.line
        }
      />
      <div
        className={`${authStyles.steps.step} ${currentStep === "otp" ? authStyles.steps.active : authStyles.steps.inactive}`}
      >
        2
      </div>
    </div>
  );
}
