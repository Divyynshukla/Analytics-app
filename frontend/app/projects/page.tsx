"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjects, createProject } from "@/services/project.service";

interface Project {
    id: number;
    name: string;
    url: string;
    eventsCount?: number;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", url: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const email = localStorage.getItem("userEmail");
            if (email) {
                const res = await getProjects(email);
                setProjects(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createProject(formData);
            setFormData({ name: "", url: "" });
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            console.error("Failed to create project:", err);
            alert("Failed to create project. Please ensure URL is valid.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold text-slate-800">
                    Your Projects
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-500/20 transition-all active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Create New Project
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 mb-4">No projects yet. Create your first one!</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Get Started
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="card flex items-center justify-between p-6 hover:shadow-lg transition-all bg-white border-2 border-slate-200 rounded-2xl group"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-bold text-slate-900 truncate">
                                        {project.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm truncate max-w-[200px] md:max-w-md">
                                        {project.url}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/dashboard"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/10"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Create New Project</h2>
                            <p className="text-slate-500 text-sm mb-6">Enter your project details to start tracking analytics.</p>

                            <form onSubmit={handleCreateProject} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. My Awesome App"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors text-slate-900"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project URL</label>
                                    <input
                                        required
                                        type="url"
                                        placeholder="https://example.com"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors text-slate-900"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                                    >
                                        {isSubmitting ? "Creating..." : "Create Project"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
