import type { Metadata, ResolvingMetadata } from 'next';

const SEO_CONFIG = {
  'zh-CN': {
    title: 'JobsAI - AI 驱动的求职准备平台',
    description: '使用 AI 技术提升您的求职竞争力。AI 简历生成、简历分析、模拟面试、技术题练习，助您轻松拿到心仪 offer。',
    keywords: 'AI简历生成,简历分析,模拟面试,技术题练习,求职准备,AI求职,面试辅导',
  },
  'en': {
    title: 'JobsAI - AI-Powered Job Preparation Platform',
    description: 'Boost your job search with AI technology. AI resume generation, resume analysis, mock interviews, and technical practice to help you land your dream job.',
    keywords: 'AI resume generator,resume analysis,mock interview,technical practice,job preparation,AI job search,interview coaching',
  },
};

export async function generateHomeMetadata(
  locale: string,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const config = SEO_CONFIG[locale as keyof typeof SEO_CONFIG] || SEO_CONFIG['en'];
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      locale: locale === 'zh-CN' ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
  };
}
