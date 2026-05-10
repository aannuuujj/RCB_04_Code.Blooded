"use client";

import { useCareerStore } from "@/lib/store";
import SectionCard from "@/components/SectionCard";
import ScoreRing from "@/components/ScoreRing";
import SkillTag from "@/components/SkillTag";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
    const { resumeScore, skills, interviewSessions } = useCareerStore();

    return (
        <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
            <div className="w-full max-w-7xl flex flex-col gap-10">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-gray/30 pb-6 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                            Dashboard
                        </h1>
                        <p className="text-brand-gray text-lg">Welcome back. Here is your career trajectory.</p>
                    </div>
                    <div className="bg-[#111] px-5 py-2.5 rounded-full border border-brand-gray/50 flex items-center gap-3 shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-gray mt-0.5">Status: Ready to Apply</span>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Gravity Score" value={resumeScore || 0} subtext="Based on latest resume" trend="up" />
                    <StatCard title="Mock Interviews" value={interviewSessions.length} subtext="Total sessions completed" trend="up" />
                    <StatCard title="Avg Score" value={
                        interviewSessions.length > 0 
                            ? Math.round(interviewSessions.reduce((acc, curr) => acc + curr.score, 0) / interviewSessions.length)
                            : 0
                    } subtext="Across all mock interviews" />
                    <StatCard title="Jobs Applied" value="14" subtext="In the last 30 days" trend="up" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column (Wider) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* Placeholder Chart */}
                        <SectionCard title="Performance Trajectory">
                            <div className="h-72 w-full bg-[#111] border border-brand-gray/30 rounded-xl flex items-center justify-center relative overflow-hidden mt-2">
                                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                                {/* Simple CSS SVG line mock */}
                                <svg className="absolute w-full h-full" preserveAspectRatio="none">
                                    <path d="M0,250 Q200,180 400,100 T800,40 T1200,80" fill="none" stroke="#fff" strokeWidth="4" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"></path>
                                    <path d="M0,250 Q200,180 400,100 T800,40 T1200,80 L1200,300 L0,300 Z" fill="url(#gradient)" className="opacity-10"></path>
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="z-10 bg-brand-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-gray/50 shadow-lg">
                                    <p className="text-brand-white font-bold tracking-widest uppercase text-sm">Interview Scores Over Time</p>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Resume Profile */}
                        <SectionCard title="Current Profile Snapshot">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mt-2">
                                <ScoreRing score={resumeScore} label="Resume Strength" />
                                <div className="flex-1">
                                    <p className="text-brand-gray text-xs uppercase tracking-widest font-bold mb-4">Extracted Skills</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {skills.length > 0 ? (
                                            skills.map((skill, idx) => (
                                                <SkillTag key={idx} text={skill} variant="neutral" />
                                            ))
                                        ) : (
                                            <p className="text-brand-gray text-sm italic border border-dashed border-brand-gray/50 p-4 rounded-xl w-full">No skills extracted yet. Head over to the home page to upload your resume!</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Right Column (Narrower) */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        {/* Weekly Goals */}
                        <SectionCard title="Weekly Checklist">
                            <div className="flex flex-col gap-3 mt-2">
                                <label className="flex items-center gap-4 p-4 bg-[#111] border border-brand-gray/30 rounded-xl cursor-pointer hover:border-brand-gray transition-colors">
                                    <input type="checkbox" className="w-5 h-5 accent-brand-white bg-brand-black border-brand-gray" defaultChecked />
                                    <span className="text-brand-white font-medium line-through opacity-50">Upload updated resume</span>
                                </label>
                                <label className="flex items-center gap-4 p-4 bg-[#111] border border-brand-gray/30 rounded-xl cursor-pointer hover:border-brand-white transition-colors">
                                    <input type="checkbox" className="w-5 h-5 accent-brand-white bg-brand-black border-brand-gray" />
                                    <span className="text-brand-white font-medium">Complete 2 Mock Interviews</span>
                                </label>
                                <label className="flex items-center gap-4 p-4 bg-[#111] border border-brand-gray/30 rounded-xl cursor-pointer hover:border-brand-white transition-colors">
                                    <input type="checkbox" className="w-5 h-5 accent-brand-white bg-brand-black border-brand-gray" />
                                    <span className="text-brand-white font-medium">Apply to 5 matched roles</span>
                                </label>
                            </div>
                        </SectionCard>

                        {/* Interview History */}
                        <SectionCard title="Recent Activity">
                            <div className="mt-2">
                                {interviewSessions.length === 0 ? (
                                    <p className="text-brand-gray italic text-center py-10 bg-[#111] rounded-xl border border-dashed border-brand-gray/50">No mock interviews completed yet.</p>
                                ) : (
                                    <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
                                        {interviewSessions.slice().reverse().map((session, index) => (
                                            <li key={index} className="bg-[#111] p-5 border border-brand-gray/50 rounded-xl flex justify-between items-center hover:border-brand-white transition-colors group">
                                                <div>
                                                    <p className="font-bold text-brand-white group-hover:text-white transition-colors">{session.role}</p>
                                                    <p className="text-brand-gray text-xs mt-1 font-medium">{session.date}</p>
                                                </div>
                                                <div className="text-right flex items-center justify-center w-12 h-12 rounded-full border border-brand-gray/50 bg-brand-black group-hover:border-brand-white transition-colors">
                                                    <p className="text-lg font-bold text-brand-white">{session.score}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </SectionCard>
                    </div>

                </div>
            </div>
        </div>
    );
}