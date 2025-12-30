import type { Metadata, ResolvingMetadata } from 'next';

const SEO_CONFIG = {
  'zh-CN': {
    title: '使用文档',
    description: '了解如何使用 JobsAI 的各项功能。包括 AI 简历生成、简历分析、模拟面试、技术题练习的详细教程和最佳实践。',
    keywords: '使用文档,教程,帮助中心,功能介绍,使用指南,AI简历教程,面试技巧',
  },
  'en': {
    title: 'Documentation',
    description: 'Learn how to use JobsAI features. Detailed tutorials and best practices for AI resume generation, resume analysis, mock interviews, and technical practice.',
    keywords: 'documentation,tutorials,help center,feature guide,user guide,AI resume tutorial,interview tips',
  },
};

export async function generateDocsMetadata(
  locale: string,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;
  const config = SEO_CONFIG[locale as keyof typeof SEO_CONFIG] || SEO_CONFIG['en'];
  const parentTitle = parentMetadata.title?.absolute || 'JobsAI';
  
  return {
    title: `${config.title} - ${parentTitle}`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: `${config.title} - ${parentTitle}`,
      description: config.description,
      type: 'website',
      locale: locale === 'zh-CN' ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `${config.title} - ${parentTitle}`,
      description: config.description,
    },
  };
}
