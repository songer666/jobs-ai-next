import { setRequestLocale, getTranslations } from "next-intl/server";
import { SettingsTabs } from "@/components/dashboard/settings/SettingsTabs";

interface SettingsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings");

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-8">{t("title")}</h1>
        <SettingsTabs />
      </div>
    </div>
  );
}
