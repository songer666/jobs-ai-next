"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { AuthGuard } from "@/components/common/AuthGuard";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const styles = {
  wrapper: "min-h-screen bg-[#0b081a] flex relative",
  langSwitcher: "absolute top-6 right-6 z-20",
  left: "hidden lg:flex lg:w-1/2 relative overflow-hidden",
  bgGradient:
    "absolute inset-0 bg-gradient-to-br from-[#fd409a]/20 via-[#0b081a] to-[#f5a867]/20",
  bgRadial:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-30",
  leftContent:
    "relative z-10 flex flex-col justify-center items-center w-full p-12",
  logo: "text-4xl font-bold text-white mb-8",
  logoHighlight: "gradient-text",
  tagline: "text-3xl font-bold text-white text-center mb-4",
  taglineDesc: "text-white/60 text-center max-w-md",
  features: "mt-12 space-y-4",
  featureItem: "flex items-center gap-3 text-white/80",
  featureIcon:
    "w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-sm",
  right: "flex-1 flex flex-col items-center justify-center p-6 lg:p-12",
  mobileLogo: {
    wrapper: "flex lg:hidden items-center gap-3 mb-8",
    icon: "w-10 h-10 rounded-xl gradient-btn flex items-center justify-center",
    text: "text-2xl font-bold text-white",
    highlight: "gradient-text",
  },
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations("authLayout");

  return (
    <AuthGuard requireAuth={false}>
      <div className={styles.wrapper}>
        {/* Language Switcher */}
        <div className={styles.langSwitcher}>
          <LanguageSwitcher />
        </div>

        {/* Left Side - Branding */}
        <div className={styles.left}>
          <div className={styles.bgGradient} />
          <div className={styles.bgRadial} />
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              Jobs<span className={styles.logoHighlight}>AI</span>
            </div>
            <h1 className={styles.tagline}>{t("tagline")}</h1>
            <p className={styles.taglineDesc}>{t("taglineDesc")}</p>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🎯</span>
                <span>{t("feature1")}</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📝</span>
                <span>{t("feature2")}</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📚</span>
                <span>{t("feature3")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className={styles.right}>
          {/* Mobile Logo - Only visible on lg and below */}
          <div className={styles.mobileLogo.wrapper}>
            <div className={styles.mobileLogo.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                <circle cx="8" cy="10" r="1.5" fill="#fff" />
                <circle cx="16" cy="10" r="1.5" fill="#fff" />
                <path
                  d="M8 15c1.5 2 6.5 2 8 0"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className={styles.mobileLogo.text}>
              Jobs<span className={styles.mobileLogo.highlight}>AI</span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
