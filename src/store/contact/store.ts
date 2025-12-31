import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContactState {
  lastSentTime: number | null;
  canSend: () => boolean;
  recordSent: () => void;
  getRemainingTime: () => number;
}

const RATE_LIMIT_DURATION = 60 * 60 * 1000; // 1小时

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      lastSentTime: null,

      /**
       * 检查是否可以发送消息
       * 1小时内只能发送一次
       */
      canSend: () => {
        const { lastSentTime } = get();
        if (!lastSentTime) return true;

        const elapsed = Date.now() - lastSentTime;
        return elapsed >= RATE_LIMIT_DURATION;
      },

      /**
       * 记录发送时间
       */
      recordSent: () => {
        set({ lastSentTime: Date.now() });
      },

      /**
       * 获取剩余等待时间（秒）
       */
      getRemainingTime: () => {
        const { lastSentTime } = get();
        if (!lastSentTime) return 0;

        const elapsed = Date.now() - lastSentTime;
        const remaining = RATE_LIMIT_DURATION - elapsed;

        return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
      },
    }),
    {
      name: "contact-storage",
    },
  ),
);
