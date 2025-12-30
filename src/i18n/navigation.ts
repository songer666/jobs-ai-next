import {createNavigation} from 'next-intl/navigation';  
import {routing} from './routing';  
  
/**  
 * 直接使用这里的Link来代替nextjs默认的Link即可，其余也是一样  
 * */  
export const {Link, redirect, usePathname, useRouter, getPathname} =  
    createNavigation(routing);
