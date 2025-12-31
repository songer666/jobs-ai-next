import { setRequestLocale } from "next-intl/server";
import { GoalPositionEdit } from "@/components/goal-position/GoalPositionEdit";

interface EditGoalPositionPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function EditGoalPositionPage({
  params,
}: EditGoalPositionPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <GoalPositionEdit id={id} />;
}
