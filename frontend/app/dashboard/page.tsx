"use client";

import DashboardLayout from "@/components/DashboardLayout";
import LineChart from "@/components/LineChart";
import { useState, useRef, useEffect, useMemo } from "react";

export default function DashboardPage() {
    const [selectedRange, setSelectedRange] = useState("Last 30 Days");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const headerMenuRef = useRef<HTMLDivElement>(null);

    const timeOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Last 90 Days", "All Time"];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
                setIsHeaderMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsHeaderMenuOpen(false);
        // Simulate data fetch
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const chartData = useMemo(() => {
        // Different data based on selectedRange
        const points = selectedRange === "Today" ? 12 : 30;
        return Array.from({ length: points }, (_, i) => ({
            name: selectedRange === "Today" ? `${i}h` : `Mar ${i + 1}`,
            value: Math.floor(Math.random() * 500) + 100,
        }));
    }, [selectedRange]);

    return (
        <DashboardLayout>
            {/* Header section */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    {isRefreshing && (
                        <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg animate-pulse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Refreshing...</span>
                        </div>
                    )}
                </div>

                <div className="relative" ref={headerMenuRef}>
                    <button
                        onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                        className={`p-2 rounded-xl transition-all ${isHeaderMenuOpen ? "bg-slate-100 text-slate-900 shadow-inner" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>

                    {isHeaderMenuOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] py-3 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="px-4 py-2 mb-2 border-b border-slate-50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dashboard Actions</p>
                            </div>

                            <button
                                onClick={handleRefresh}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors group"
                            >
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                Refresh Data
                            </button>

                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors group">
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Export Report (CSV)
                            </button>

                            <div className="mx-3 mt-2 pt-2 border-t border-slate-50">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Settings
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Overview */}
            <section className="mb-10">
                <h2 className="text-lg font-bold text-slate-800 mb-6">
                    Project Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6 bg-white border-l-4 border-l-blue-500 text-slate-900 border-2 border-slate-200 rounded-2xl">
                        <p className="text-slate-500 text-sm font-medium mb-2">Total Events</p>
                        <p className="text-3xl font-bold text-slate-900">12.430</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4">
                            <div className="w-[70%] h-full bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="card p-6 bg-white border-l-4 border-l-green-400 rounded-2xl border-2 border-slate-200">
                        <p className="text-slate-500 text-sm font-medium mb-2">Event: Today</p>
                        <p className="text-3xl font-bold text-slate-900">56</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4">
                            <div className="w-[45%] h-full bg-green-400 rounded-full"></div>
                        </div>
                    </div>
                    <div className="card p-6 bg-white overflow-hidden relative rounded-2xl border-2 border-slate-200">
                        <p className="text-slate-500 text-sm font-medium mb-2">Event This Week</p>
                        <p className="text-3xl font-bold text-slate-900">320</p>
                        {/* Small Sparkline simulation */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 opacity-50">
                            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0 20 L20 15 L40 18 L60 10 L80 12 L100 5 L100 20 Z" fill="rgba(59, 130, 246, 0.1)"></path>
                                <path d="M0 20 L20 15 L40 18 L60 10 L80 12 L100 5" fill="none" stroke="#3b82f6" strokeWidth="1"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Over Time */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800">
                        Events Over Time
                    </h2>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <span className="text-xs font-semibold text-slate-700">{selectedRange}</span>
                            <svg className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                {timeOptions.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            setSelectedRange(option);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors ${selectedRange === option
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="card p-6 bg-white h-[350px] flex items-center justify-center relative overflow-hidden">
                    <LineChart data={chartData} />
                </div>
            </section>

            {/* Recent Events */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-6">
                    Recent Events
                </h2>
                <div className="card overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Event</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-4 h-4 rounded bg-orange-400/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-orange-400 rounded-sm"></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 italic">button_click</span>
                                    </td>
                                    <td className="p-4 text-xs font-semibold text-slate-500">Checkout Button</td>
                                    <td className="p-4 text-xs font-bold text-slate-800 text-right uppercase tracking-tight">10:15 AM</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 italic">signup_submit</span>
                                    </td>
                                    <td className="p-4 text-xs font-semibold text-slate-500">Signup Form</td>
                                    <td className="p-4 text-xs font-bold text-slate-800 text-right uppercase tracking-tight">09:15 AM</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-4 h-4 rounded bg-green-400/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 italic">page_view</span>
                                    </td>
                                    <td className="p-4 text-xs font-semibold text-slate-500">Home Page</td>
                                    <td className="p-4 text-xs font-bold text-slate-800 text-right uppercase tracking-tight">08:30 AM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
