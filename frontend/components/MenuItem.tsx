import Link from 'next/link';

interface MenuItemProps {
    label: string;
    href: string;
}

export default function MenuItem({ label, href }: MenuItemProps) {
    return (
        <Link
            href={href}
            className="text-sm font-medium transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
            {label}
        </Link>
    );
}
