import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh-CN"],
  // 配置方案有:
  // 'always': 始终使用前缀，例如 /en/page
  // 'never': 永远不使用前缀，例如 /page
  // 'auto': 根据请求的主机名自动选择前缀
  localePrefix: "always",
  defaultLocale: "en",
});
