import { ReactNode } from 'react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';

interface DocsLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
    const { locale } = await params;
    
    return (
        <div className="min-h-screen bg-[#0b081a]">
            <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 flex">
                {/* 主内容区域 */}
                <main className="flex-1 min-w-0 pr-0 lg:pr-8">
                    <div className="max-w-4xl">
                        {children}
                    </div>
                </main>

                {/* 右侧文档导航侧边栏 */}
                <DocsSidebar locale={locale} />
            </div>
        </div>
    );
}
