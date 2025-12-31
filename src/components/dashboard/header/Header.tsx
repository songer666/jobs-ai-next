"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { SidebarToggle } from "../sidebar";
import UserDropdown from "./UserDropdown";

const styles = {
  header:
    "h-16 bg-[#0d0a1f] border-b border-white/10 flex items-center justify-between px-4 md:px-6",
  left: {
    wrapper: "flex items-center gap-4",
  },
  right: {
    wrapper: "flex items-center gap-4",
    langBtn: "text-white/60 hover:text-white text-sm transition-colors",
    notifBtn:
      "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors",
  },
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "zh-CN" ? "en" : "zh-CN";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className={styles.header}>
      <div className={styles.left.wrapper}>
        <SidebarToggle />
      </div>

      <div className={styles.right.wrapper}>
        <button onClick={toggleLocale} className={styles.right.langBtn}>
          {locale === "zh-CN" ? "EN" : "中文"}
        </button>
        <button className={styles.right.notifBtn}>🔔</button>
        <UserDropdown />
      </div>
    </header>
  );
}
