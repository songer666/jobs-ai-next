"use client";

import { useEffect } from "react";

const styles = {
  wrapper:
    "min-h-screen bg-[#0b081a] flex flex-col items-center justify-center px-6",
  code: "text-[120px] md:text-[180px] font-black text-white italic tracking-tight leading-none",
  title:
    "text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mt-4",
  desc: "text-white/60 text-center max-w-md mt-4",
  btnGroup: "mt-8 flex items-center gap-4",
  btn: "flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors",
};

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className={styles.wrapper}>
          <h1 className={styles.code}>500</h1>
          <h2 className={styles.title}>Something Went Wrong</h2>
          <p className={styles.desc}>
            抱歉，服务器发生了严重错误。请刷新页面或稍后重试。
          </p>
          <div className={styles.btnGroup}>
            <button
              className={styles.btn}
              onClick={() => (window.location.href = "/")}
            >
              Go Home
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className={styles.btn} onClick={() => reset()}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 11-9-9" />
                <path d="M21 3v6h-6" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
