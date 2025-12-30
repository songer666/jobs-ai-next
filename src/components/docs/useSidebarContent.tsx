'use client';

import { useLocale } from 'next-intl';

// 侧边栏内容配置
const sidebarContent = {
  'zh-CN': {
    title: '文档中心',
    subtitle: '了解如何使用 Jobs AI',
    sections: [
      {
        title: '开始使用',
        items: [
          { href: '/docs', label: '简介' },
          { href: '/docs/quick-start', label: '快速开始' },
        ],
      },
      {
        title: '核心功能',
        items: [
          { href: '/docs/interview', label: 'AI 模拟面试' },
          { href: '/docs/resume-generator', label: '简历生成' },
          { href: '/docs/resume-analyzer', label: '简历分析' },
          { href: '/docs/questions', label: '题目练习' },
        ],
      },
      {
        title: '账户管理',
        items: [
          { href: '/docs/account', label: '账户设置' },
        ],
      },
    ],
  },
  'en': {
    title: 'Documentation',
    subtitle: 'Learn how to use Jobs AI',
    sections: [
      {
        title: 'Getting Started',
        items: [
          { href: '/docs', label: 'Introduction' },
          { href: '/docs/quick-start', label: 'Quick Start' },
        ],
      },
      {
        title: 'Core Features',
        items: [
          { href: '/docs/interview', label: 'AI Mock Interview' },
          { href: '/docs/resume-generator', label: 'Resume Generation' },
          { href: '/docs/resume-analyzer', label: 'Resume Analysis' },
          { href: '/docs/questions', label: 'Practice Questions' },
        ],
      },
      {
        title: 'Account Management',
        items: [
          { href: '/docs/account', label: 'Account Settings' },
        ],
      },
    ],
  },
};

export function useSidebarContent() {
  const locale = useLocale();
  
  const content = sidebarContent[locale as keyof typeof sidebarContent] || sidebarContent['zh-CN'];
  
  return content;
}
