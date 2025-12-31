"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const styles = {
  wrapper:
    "min-h-screen bg-[#0b081a] flex flex-col items-center justify-center px-6",
  code: "text-[120px] md:text-[180px] font-black text-white italic tracking-tight leading-none",
  title:
    "text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mt-4",
  desc: "text-white/60 text-center max-w-md mt-4",
  btn: "mt-8 flex cursor-pointer items-center justify-between gap-8 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors min-w-[200px]",
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.desc}>抱歉，您访问的页面不存在或已被移除。</p>
      <button className={styles.btn} onClick={() => router.back()}>
        <span>Go Back</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
