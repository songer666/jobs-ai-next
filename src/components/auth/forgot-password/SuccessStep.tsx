"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { authStyles } from "../shared";

export default function SuccessStep() {
  const t = useTranslations("auth");

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {t("passwordResetSuccess")}
      </h3>
      <p className="text-white/60 mb-6">{t("passwordResetSuccessDesc")}</p>
      <Link href="/login" className={authStyles.footer.link}>
        {t("backToLogin")}
      </Link>
    </div>
  );
}
