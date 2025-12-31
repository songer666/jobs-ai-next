import { setRequestLocale } from "next-intl/server";
import { GoalPositionList } from "@/components/goal-position";

interface GoalPositionPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GoalPositionPage({
  params,
}: GoalPositionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GoalPositionList />;
}
