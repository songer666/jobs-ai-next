import Image from 'next/image';
import iconSvg from '@/app/icon.svg';

interface LogoProps {
    size?: number;
    className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
    return (
        <Image
            src={iconSvg}
            alt="Jobs AI Logo"
            width={size}
            height={size}
            className={className}
        />
    );
}
