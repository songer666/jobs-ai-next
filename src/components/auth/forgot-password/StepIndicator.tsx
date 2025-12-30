'use client';

import { authStyles } from '../shared';

type Step = 'email' | 'otp' | 'reset' | 'success';

interface StepIndicatorProps {
  currentStep: Step;
  onStepClick?: (step: Step) => void;
  canGoBack?: boolean;
}

export default function StepIndicator({ currentStep, onStepClick, canGoBack = false }: StepIndicatorProps) {
  const handleStep1Click = () => {
    if ((currentStep === 'otp' || currentStep === 'reset') && canGoBack && onStepClick) {
      onStepClick('email');
    }
  };

  const handleStep2Click = () => {
    if (currentStep === 'reset' && onStepClick) {
      onStepClick('otp');
    }
  };

  return (
    <div className={authStyles.steps.wrapper}>
      <div 
        className={`${authStyles.steps.step} ${currentStep === 'email' ? authStyles.steps.active : authStyles.steps.completed} ${(currentStep === 'otp' || currentStep === 'reset') && canGoBack ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={handleStep1Click}
        role={(currentStep === 'otp' || currentStep === 'reset') && canGoBack ? 'button' : undefined}
        tabIndex={(currentStep === 'otp' || currentStep === 'reset') && canGoBack ? 0 : undefined}
      >
        {currentStep === 'email' ? '1' : '✓'}
      </div>
      <div className={currentStep !== 'email' ? authStyles.steps.lineActive : authStyles.steps.line} />
      <div 
        className={`${authStyles.steps.step} ${currentStep === 'otp' ? authStyles.steps.active : currentStep === 'reset' || currentStep === 'success' ? authStyles.steps.completed : authStyles.steps.inactive} ${currentStep === 'reset' ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={handleStep2Click}
        role={currentStep === 'reset' ? 'button' : undefined}
        tabIndex={currentStep === 'reset' ? 0 : undefined}
      >
        {currentStep === 'reset' || currentStep === 'success' ? '✓' : '2'}
      </div>
      <div className={currentStep === 'reset' || currentStep === 'success' ? authStyles.steps.lineActive : authStyles.steps.line} />
      <div className={`${authStyles.steps.step} ${currentStep === 'reset' ? authStyles.steps.active : currentStep === 'success' ? authStyles.steps.completed : authStyles.steps.inactive}`}>
        {currentStep === 'success' ? '✓' : '3'}
      </div>
    </div>
  );
}
