export type FlowType = 'login' | 'register' | 'forgot-password';

export type Step = 'credentials' | 'otp';

export interface OTPFlowState {
  flowType: FlowType | null;
  step: Step;
  email: string;
  password: string;
  name: string;
  rememberMe: boolean;
  countdownEndTime: number | null;
  otp: string;
}

export interface OTPFlowActions {
  startFlow: (flowType: FlowType, data: { email: string; password?: string; name?: string; rememberMe?: boolean }) => void;
  goToOTPStep: () => void;
  goBack: () => void;
  setOTP: (otp: string) => void;
  startCountdown: (seconds: number) => void;
  getRemainingSeconds: () => number;
  reset: () => void;
  clearFlow: (flowType: FlowType) => void;
}

export type OTPStore = OTPFlowState & OTPFlowActions;
