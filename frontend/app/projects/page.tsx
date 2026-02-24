import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

const projects = [
    {
        id: 1,
        name: "E-commerce App",
        events: "1,250",
        color: "bg-blue-500",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
        ),
    },
    {
        id: 2,
        name: "Marketing Website",
        events: "920",
        color: "bg-orange-400",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6"></path>
            </svg>
        ),
    },
    {
        id: 3,
        name: "Mobile Startup",
        events: "3,410",
        color: "bg-blue-600",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
        ),
    },
];

export default function ProjectsPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Your Projects
                </h1>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-500/20 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Create New Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="card flex items-center justify-between p-6 hover:shadow-lg transition-shadow bg-white border border-slate-200 rounded-lg"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`${project.color} p-3 rounded-xl shadow-sm`}>
                                {project.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-gray">
                                    {project.name}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    Events Tracked: <span className="font-semibold text-slate-700 dark:text-slate-300">{project.events}</span>
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                        >
                            View Dashboard
                        </Link>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
