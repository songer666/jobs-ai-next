"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LogOut, Home, Settings } from "lucide-react";
import { useCurrentSession, useLogout } from "@/api/auth";

const styles = {
  container: "relative",
  avatar: {
    btn: "flex items-center justify-center w-10 h-10 rounded-full bg-primary text-black font-bold text-sm border-2 border-white/20 hover:border-white/40 transition-colors cursor-pointer overflow-hidden",
    img: "w-full h-full object-cover",
  },
  dropdown: {
    container:
      "absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#1a1528] border border-white/10 overflow-hidden z-50 shadow-xl",
    header: "px-4 py-3 border-b border-white/10",
    name: "text-white font-medium text-sm truncate",
    email: "text-white/60 text-xs truncate",
    menu: "py-2",
    item: "flex items-center gap-3 px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm",
    divider: "h-px bg-white/10 my-1",
    logout:
      "flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm w-full",
  },
};

export default function UserDropdown() {
  const t = useTranslations("nav");
  const { data: session } = useCurrentSession();
  const logoutMutation = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const initials =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "?";

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.avatar.btn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || ""}
            className={styles.avatar.img}
          />
        ) : (
          initials
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown.container}>
          <div className={styles.dropdown.header}>
            <p className={styles.dropdown.name}>{user.name || t("user")}</p>
            <p className={styles.dropdown.email}>{user.email}</p>
          </div>
          <div className={styles.dropdown.menu}>
            <Link
              href="/"
              className={styles.dropdown.item}
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>{t("home")}</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={styles.dropdown.item}
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>{t("settings")}</span>
            </Link>
            <div className={styles.dropdown.divider} />
            <button
              className={styles.dropdown.logout}
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
