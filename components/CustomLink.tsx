import NextLink from 'next/link';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';

// Reusable custom link component

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    navbar?: boolean;
}

export default function CustomLink({
        href,
        children,
        className,
        navbar = false,
    }: CustomLinkProps) {

    const linkStyling = "absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"

    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    const isInternal = !isExternal && href.startsWith('/');
    return (
        <NextLink
            href={href}
            className={clsx(
                linkStyles({ color: "foreground" }),
                "relative group data-[active=true]:text-primary data-[active=true]:font-medium text-md",
                !navbar && "text-gray-600", // Outside navbar, make links gray
                className // Append optional additional styles
            )}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
        >
            {children}

            {/* Underline Hover Animation */}
            <span className={linkStyling} />
        </NextLink>
    );
}
