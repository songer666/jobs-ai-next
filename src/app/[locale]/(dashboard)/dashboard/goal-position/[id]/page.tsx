import { setRequestLocale } from "next-intl/server";
import { GoalPositionDetail } from "@/components/goal-position/GoalPositionDetail";

interface GoalPositionDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function GoalPositionDetailPage({
  params,
}: GoalPositionDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <GoalPositionDetail id={id} />;
}
