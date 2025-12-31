"use client";

import { usePathname, useRouter } from "next/navigation";

const styles = {
  wrapper: "flex items-center gap-2",
  btn: "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
  active: "bg-white/10 text-white",
  inactive: "text-white/60 hover:text-white hover:bg-white/5",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];
  const isZh = currentLocale === "zh-CN";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setTimeout(() => {
      router.refresh();
    }, 200);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => switchLocale("zh-CN")}
        className={`${styles.btn} ${isZh ? styles.active : styles.inactive}`}
      >
        中文
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`${styles.btn} ${!isZh ? styles.active : styles.inactive}`}
      >
        EN
      </button>
    </div>
  );
}
