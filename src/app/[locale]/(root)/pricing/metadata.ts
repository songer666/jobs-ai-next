import type { Metadata, ResolvingMetadata } from 'next';

const SEO_CONFIG = {
  'zh-CN': {
    title: '定价方案',
    description: '选择适合您的订阅计划。免费试用 AI 简历生成、面试辅导和技术题练习功能，升级至专业版解锁更多高级功能。',
    keywords: '定价,订阅计划,免费试用,专业版,AI简历,面试辅导,会员价格',
  },
  'en': {
    title: 'Pricing Plans',
    description: 'Choose the plan that fits your needs. Try AI resume generation, interview coaching, and technical practice for free, or upgrade to Pro for advanced features.',
    keywords: 'pricing,subscription plans,free trial,pro version,AI resume,interview coaching,membership pricing',
  },
};

export async function generatePricingMetadata(
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
      card: 'summary_large_image',
      title: `${config.title} - ${parentTitle}`,
      description: config.description,
    },
  };
}
