import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth";

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
}

const styles = {
  wrapper: "w-full max-w-md",
  card: "glass-card p-8 rounded-3xl",
  header: {
    wrapper: "text-center mb-8",
    title: "text-2xl font-bold text-white mb-2",
    subtitle: "text-white/60",
  },
  home: "text-center mt-6",
  homeLink: "text-white/40 text-sm hover:text-white/60 transition-colors",
};

export default async function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header.wrapper}>
          <h2 className={styles.header.title}>{t("forgotTitle")}</h2>
          <p className={styles.header.subtitle}>{t("forgotSubtitle")}</p>
        </div>

        <ForgotPasswordForm />
      </div>

      <div className={styles.home}>
        <Link href="/" className={styles.homeLink}>
          ← {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
