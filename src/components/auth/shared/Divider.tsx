"use client";

import { useTranslations } from "next-intl";
import { authStyles } from "./styles";

export default function Divider() {
  const t = useTranslations("auth");

  return (
    <div className={authStyles.divider.wrapper}>
      <div className={authStyles.divider.line} />
      <span className={authStyles.divider.text}>{t("orContinueWith")}</span>
      <div className={authStyles.divider.line} />
    </div>
  );
}
