"use client";

import { authStyles } from "../shared";

interface StepIndicatorProps {
  currentStep: "info" | "otp";
  onStepClick?: (step: "info" | "otp") => void;
  canGoBack?: boolean;
}

export default function StepIndicator({
  currentStep,
  onStepClick,
  canGoBack = false,
}: StepIndicatorProps) {
  const handleStep1Click = () => {
    if (currentStep === "otp" && canGoBack && onStepClick) {
      onStepClick("info");
    }
  };

  return (
    <div className={authStyles.steps.wrapper}>
      <div
        className={`${authStyles.steps.step} ${currentStep === "info" ? authStyles.steps.active : authStyles.steps.completed} ${currentStep === "otp" && canGoBack ? "cursor-pointer hover:opacity-80" : ""}`}
        onClick={handleStep1Click}
        role={currentStep === "otp" && canGoBack ? "button" : undefined}
        tabIndex={currentStep === "otp" && canGoBack ? 0 : undefined}
      >
        {currentStep === "info" ? "1" : "✓"}
      </div>
      <div
        className={
          currentStep !== "info"
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
