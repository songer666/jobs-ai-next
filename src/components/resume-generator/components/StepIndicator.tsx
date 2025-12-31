"use client";

import { Check } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* 步骤圆圈 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                currentStep > step.id
                  ? "bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white"
                  : currentStep === step.id
                    ? "bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white ring-4 ring-[#fd409a]/30"
                    : "bg-white/10 text-white/50"
              }`}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                currentStep >= step.id ? "text-white" : "text-white/50"
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* 连接线 */}
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 transition-all ${
                currentStep > step.id
                  ? "bg-gradient-to-r from-[#fd409a] to-[#f5a867]"
                  : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export const RESUME_STEPS: Step[] = [
  { id: 1, title: "基本配置" },
  { id: 2, title: "样式设置" },
];
