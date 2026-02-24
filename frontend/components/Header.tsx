import Link from 'next/link';
import MenuItem from './MenuItem';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/[.08] bg-white/70 backdrop-blur-md dark:border-white/[.145] dark:bg-black/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-x-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                            Analytics<span className="text-zinc-500">App</span>
                        </span>
                    </Link>
                    <nav className="hidden md:flex md:gap-x-8">
                        <MenuItem label="Dashboard" href="/dashboard" />
                        <MenuItem label="Reports" href="/reports" />
                        <MenuItem label="Settings" href="/settings" />
                    </nav>
                </div>
                <div className="flex items-center gap-x-4">
                    <Link
                        href="/login"
                        className="text-sm font-semibold leading-6 text-black dark:text-white"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
}
