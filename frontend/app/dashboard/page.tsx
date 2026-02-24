import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            {/* Header section */}
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Project Overview */}
            <section className="mb-10">
                <h2 className="text-lg font-bold text-slate-800 mb-6">
                    Project Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6 bg-white border-l-4 border-l-blue-500">
                        <p className="text-slate-500 text-sm font-medium mb-2">Total Events</p>
                        <p className="text-3xl font-bold text-slate-900">12.430</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4">
                            <div className="w-[70%] h-full bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="card p-6 bg-white border-l-4 border-l-green-400">
                        <p className="text-slate-500 text-sm font-medium mb-2">Event: Today</p>
                        <p className="text-3xl font-bold text-slate-900">56</p>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4">
                            <div className="w-[45%] h-full bg-green-400 rounded-full"></div>
                        </div>
                    </div>
                    <div className="card p-6 bg-white overflow-hidden relative">
                        <p className="text-slate-500 text-sm font-medium mb-2">Event This Week</p>
                        <p className="text-3xl font-bold text-slate-900">320</p>
                        {/* Small Sparkline simulation */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 opaity-50">
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
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-semibold text-slate-700">Last 30 Days</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                <div className="card p-10 bg-white h-[300px] flex items-center justify-center relative overflow-hidden">
                    {/* Mock Chart using SVG */}
                    <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="120" x2="1000" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="190" x2="1000" y2="190" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="260" x2="1000" y2="260" stroke="#f1f5f9" strokeWidth="1" />

                        {/* Path Area */}
                        <path
                            d="M0 260 L100 220 L200 180 L300 195 L400 140 L500 160 L600 120 L700 85 L800 110 L900 60 L1000 40 V300 H0 Z"
                            fill="url(#chartGradient)"
                        />
                        {/* Path Line */}
                        <path
                            d="M0 260 L100 220 L200 180 L300 195 L400 140 L500 160 L600 120 L700 85 L800 110 L900 60 L1000 40"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Points */}
                        <circle cx="400" cy="140" r="6" fill="white" stroke="#3b82f6" strokeWidth="3" />
                        <circle cx="700" cy="85" r="6" fill="white" stroke="#3b82f6" strokeWidth="3" />
                        <circle cx="1000" cy="40" r="6" fill="white" stroke="#3b82f6" strokeWidth="3" />

                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Chart Labels */}
                    <div className="absolute bottom-4 left-10 right-10 flex justify-between text-[10px] font-bold text-slate-400">
                        <span>10 AM</span>
                        <span>50 PM</span>
                        <span>30 AM</span>
                        <span>15 Mar</span>
                        <span>17 Feb</span>
                        <span>10 AM</span>
                        <span>12 PM</span>
                    </div>
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
