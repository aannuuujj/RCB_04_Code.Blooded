"use client";
import { useState } from "react";
import { BarChart2, TrendingUp, Target, Award, Mic, Briefcase, FileText, Orbit, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

const STATS = [
  { label: "Resume Score", value: "78/100", delta: "+12 pts", icon: FileText, href: "/resume" },
  { label: "Gravity Score", value: "84", delta: "Top Fit", icon: Orbit, href: "/gravity" },
  { label: "Interview Avg", value: "7.2/10", delta: "+0.8 last session", icon: Mic, href: "/interview" },
  { label: "Top Match", value: "92%", delta: "Google Intern", icon: Briefcase, href: "/internship" },
];

const ACTIVITY = [
  { label: "Resume analyzed", time: "2 min ago", icon: FileText },
  { label: "Completed mock interview (7 Qs)", time: "1 hour ago", icon: Mic },
  { label: "Calculated Gravity Score: 84", time: "1 hour ago", icon: Orbit },
  { label: "Viewed 8 internship matches", time: "Yesterday", icon: Briefcase },
  { label: "Resume uploaded", time: "Yesterday", icon: FileText },
];

const SKILLS_PROGRESS = [
  { name: "Technical Skills", pct: 78 },
  { name: "Communication", pct: 65 },
  { name: "Problem Solving", pct: 82 },
  { name: "Domain Knowledge", pct: 55 },
];

export default function DashboardPage() {
  const [hasData] = useState(true);

  return (
    <div className="min-h-screen pt-14 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 size={18} className="text-white/50" />
              <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Career Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gradient">Your Progress</h1>
            <p className="text-white/50 text-sm mt-1">Track your journey. Every score tells a story.</p>
          </div>
          <Link
            href="/gravity"
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            <Orbit size={14} /> Calculate Gravity
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white/4 border border-white/8 rounded-2xl p-5 hover:bg-white/7 hover:border-white/15 transition-all group block"
            >
              <stat.icon size={16} className="text-white/40 mb-3" />
              <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
              <p className="text-xs text-white/30 mt-1 group-hover:text-white/50 transition-colors">{stat.delta}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills progress */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-white/40" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Skill Progress</p>
            </div>
            {SKILLS_PROGRESS.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">{s.name}</span>
                  <span className="text-white/40 font-mono">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Activity feed */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} className="text-white/40" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Recent Activity</p>
            </div>
            {hasData ? (
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                      <a.icon size={11} className="text-white/50" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">{a.label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Target}
                title="No activity yet"
                description="Complete your first resume analysis to start tracking progress."
              />
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Award size={14} className="text-white/40" />
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Recommended Next Steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Do a mock interview", desc: "Practice with AI questions", href: "/interview", icon: Mic },
              { label: "Check your gravity", desc: "See how close you are to top jobs", href: "/gravity", icon: Orbit },
              { label: "Browse internships", desc: "92% match available now", href: "/internship", icon: Briefcase },
            ].map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="flex items-start gap-3 p-4 bg-white/4 border border-white/8 rounded-xl hover:bg-white/8 hover:border-white/20 transition-all group"
              >
                <n.icon size={16} className="text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{n.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{n.desc}</p>
                </div>
                <ArrowRight size={12} className="text-white/20 ml-auto mt-1 group-hover:translate-x-1 group-hover:text-white/50 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
