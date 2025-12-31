import { setRequestLocale } from "next-intl/server";
import { QuestionWorkspace } from "@/components/questions/QuestionWorkspace";

interface QuestionsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function QuestionsPage({ params }: QuestionsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QuestionWorkspace />;
}
