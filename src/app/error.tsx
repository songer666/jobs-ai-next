"use client";

import { useEffect } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

const styles = {
  wrapper:
    "min-h-screen bg-[#0b081a] flex flex-col items-center justify-center px-6",
  code: "text-[120px] md:text-[180px] font-black text-white italic tracking-tight leading-none",
  title:
    "text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mt-4",
  desc: "text-white/60 text-center max-w-md mt-4",
  btnGroup: "mt-8 flex items-center gap-4",
  btn: "flex items-center justify-between gap-8 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors min-w-[180px]",
};

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>500</h1>
      <h2 className={styles.title}>Something Went Wrong</h2>
      <p className={styles.desc}>
        抱歉，服务器发生了错误。请稍后重试或联系支持团队。
      </p>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={() => (window.location.href = "/")}
        >
          <span>Go Home</span>
          <ArrowRight size={18} />
        </button>
        <button className={styles.btn} onClick={() => reset()}>
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
