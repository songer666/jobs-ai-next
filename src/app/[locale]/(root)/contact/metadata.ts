import type { Metadata, ResolvingMetadata } from 'next';

const SEO_CONFIG = {
  'zh-CN': {
    title: '联系我们',
    description: '有任何问题或建议？欢迎联系 JobsAI 团队。我们致力于为您提供最优质的 AI 求职辅导服务。',
    keywords: '联系我们,客服支持,反馈建议,技术支持,合作咨询',
  },
  'en': {
    title: 'Contact Us',
    description: 'Have questions or suggestions? Contact the JobsAI team. We are committed to providing you with the best AI job preparation services.',
    keywords: 'contact us,customer support,feedback,technical support,partnership inquiry',
  },
};

export async function generateContactMetadata(
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
