import { setRequestLocale } from "next-intl/server";
import { ResumeDetailView } from "@/components/resume-generator";

interface ResumeDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ResumeDetailPage({
  params,
}: ResumeDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ResumeDetailView resumeId={id} />;
}
