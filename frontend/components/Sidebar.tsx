"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h.01a1 1 0 100-2H12z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
    },
    {
        label: "Projects",
        href: "/projects",
        icon: (
            <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
        ),
    },
    {
        label: "API Keys",
        href: "/api-keys",
        icon: (
            <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h.01a1 1 0 100-2H12z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? "w-20" : "w-64"} flex-shrink-0 bg-sidebar-bg text-sidebar-foreground flex flex-col h-screen sticky top-0 border-r border-slate-100 transition-all duration-300 ease-in-out overflow-hidden`}>
            {/* Profile Section */}
            <div className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "gap-3"} border-b border-sidebar-active/30 transition-all duration-300`}>
                <div className="w-10 h-10 rounded-full bg-sidebar-active flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
                {!isCollapsed && (
                    <>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-900 truncate">Abhishek S.</span>
                            <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">Admin</span>
                        </div>
                    </>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`${isCollapsed ? "absolute -right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:scale-110 transition-transform" : "ml-auto text-slate-400 hover:text-slate-600"}`}
                >
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-lg text-sm font-semibold transition-all group relative ${isActive
                                ? "bg-sidebar-active text-blue-600 shadow-sm"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <span className={`flex-shrink-0 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className={`p-4 border-t border-slate-100 transition-all duration-300 ${isCollapsed ? "flex justify-center" : ""}`}>
                <button className={`flex items-center ${isCollapsed ? "justify-center w-10 h-10" : "gap-3 w-full px-4 py-2"} text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-all group relative`}>
                    <span className="flex-shrink-0 text-slate-400 group-hover:text-red-500">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                    {!isCollapsed && <span>Logout</span>}
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-red-600 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
