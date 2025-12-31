import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { OTPFlowState, OTPFlowActions, FlowType } from "./type";

const initialState: OTPFlowState = {
  flowType: null,
  step: "credentials",
  email: "",
  password: "",
  name: "",
  rememberMe: false,
  countdownEndTime: null, // 全局共享的倒计时结束时间
  otp: "",
};

export const useOTPStore = create<OTPFlowState & OTPFlowActions>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      startFlow: (flowType, data) => {
        set((state) => {
          state.flowType = flowType;
          state.email = data.email;
          state.password = data.password || "";
          state.name = data.name || "";
          state.rememberMe = data.rememberMe || false;
        });
      },

      goToOTPStep: () => {
        set((state) => {
          state.step = "otp";
        });
      },

      goBack: () => {
        set((state) => {
          state.step = "credentials";
          state.otp = "";
        });
      },

      setOTP: (otp) => {
        set((state) => {
          state.otp = otp;
        });
      },

      startCountdown: (seconds) => {
        set((state) => {
          state.countdownEndTime = Date.now() + seconds * 1000;
        });
      },

      getRemainingSeconds: () => {
        const { countdownEndTime } = get();
        if (!countdownEndTime) return 0;
        const remaining = Math.ceil((countdownEndTime - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      },

      reset: () => {
        set(initialState);
      },

      clearFlow: (flowType: FlowType) => {
        const current = get();
        if (current.flowType === flowType) {
          set(initialState);
        }
      },
    })),
    {
      name: "otp-flow-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        flowType: state.flowType,
        step: state.step,
        email: state.email,
        password: state.password,
        name: state.name,
        rememberMe: state.rememberMe,
        countdownEndTime: state.countdownEndTime,
      }),
    },
  ),
);
