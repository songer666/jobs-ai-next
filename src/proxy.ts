import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// 只处理国际化，鉴权逻辑移到客户端 AuthGuard 组件
export default intlMiddleware;

export const config = {
    matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
