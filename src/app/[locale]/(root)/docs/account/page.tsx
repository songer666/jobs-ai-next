import { setRequestLocale } from 'next-intl/server';
import AccountContentZh from '@/components/docs/zh-CN/AccountContent';
import AccountContentEn from '@/components/docs/en/AccountContent';

interface AccountPageProps {
    params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const ContentComponent = locale === 'zh-CN' ? AccountContentZh : AccountContentEn;

    return <ContentComponent />;
}