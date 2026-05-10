"use client";
import { useState } from "react";
import GravityOrbit from "@/components/GravityOrbit";
import { SkeletonCard } from "@/components/SkeletonCard";
import { ErrorCard } from "@/components/ErrorCard";
import { Orbit, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, unit = "" }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-white/70">{label}</label>
        <span className="text-xs font-mono text-white bg-white/8 px-2 py-0.5 rounded">
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
    </div>
  );
}

const BADGE_COLORS: Record<string, string> = {
  "Top Fit": "bg-white text-black",
  "Strong Match": "bg-white/20 text-white border border-white/30",
  "Potential": "bg-white/10 text-white/80 border border-white/20",
  "Explore More": "bg-white/5 text-white/50 border border-white/10",
};

interface GravityResult {
  title: string;
  gravity_score: number;
  orbit_label: string;
  action: string;
  motivation_line: string;
}

const DEMO_JOBS: GravityResult[] = [
  { title: "SWE Intern", gravity_score: 72, orbit_label: "Strong Match", action: "", motivation_line: "" },
  { title: "Data Analyst", gravity_score: 55, orbit_label: "Potential", action: "", motivation_line: "" },
  { title: "PM Role", gravity_score: 35, orbit_label: "Explore More", action: "", motivation_line: "" },
  { title: "ML Engineer", gravity_score: 88, orbit_label: "Top Fit", action: "", motivation_line: "" },
];

export default function GravityPage() {
  const [title, setTitle] = useState("");
  const [resume_score, setResume] = useState(70);
  const [skill_match_pct, setSkill] = useState(65);
  const [interview_avg, setInterview] = useState(7);
  const [applications_sent, setApps] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GravityResult | null>(null);
  const [jobs, setJobs] = useState<GravityResult[]>(DEMO_JOBS);

  async function calculate() {
    if (!title.trim()) { setError("Please enter a job title."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/gravity/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, resume_score, skill_match_pct, interview_avg, applications_sent }),
      });
      if (!res.ok) throw new Error("API error");
      const data: GravityResult = await res.json();
      setResult(data);
      setJobs((prev) => {
        const next = [...prev.slice(-3), data];
        return next;
      });
    } catch {
      setError("Failed to calculate gravity score. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-14 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Orbit size={18} className="text-white/50" />
            <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Gravity Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">Job Gravity Score</h1>
          <p className="text-white/50 text-sm max-w-md">
            See how strongly a job role orbits around your profile. Higher gravity = closer orbit = better fit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-white">Configure Your Profile</h2>

            <div>
              <label className="text-xs font-medium text-white/70 block mb-2">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-all"
              />
            </div>

            <Slider label="Resume Score" value={resume_score} onChange={setResume} max={100} unit="/100" />
            <Slider label="Skill Match %" value={skill_match_pct} onChange={setSkill} max={100} unit="%" />
            <Slider label="Interview Average" value={interview_avg} onChange={setInterview} max={10} step={0.5} unit="/10" />
            <Slider label="Applications Sent" value={applications_sent} onChange={setApps} max={50} unit="" />

            {error && <p className="text-xs text-red-400 bg-red-400/8 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}

            <button
              onClick={calculate}
              disabled={loading}
              className="w-full py-3 bg-white text-black font-semibold text-sm rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Calculating…</>
              ) : (
                <><Orbit size={16} /> Calculate Gravity</>
              )}
            </button>
          </div>

          {/* Orbit Visual */}
          <div className="space-y-6">
            {loading ? (
              <SkeletonCard lines={4} className="h-[500px] !rounded-2xl" />
            ) : (
              <GravityOrbit jobs={jobs} />
            )}

            {/* Result card */}
            {result && !loading && (
              <div className="bg-white/4 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-1">Gravity Score</p>
                    <p className="text-5xl font-black text-white">{result.gravity_score}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${BADGE_COLORS[result.orbit_label] ?? "bg-white/10 text-white"}`}>
                    {result.orbit_label}
                  </span>
                </div>

                <div className="h-px bg-white/8" />

                <div>
                  <p className="text-white text-sm font-medium">{result.action}</p>
                  <p className="text-white/40 text-xs mt-1 italic">{result.motivation_line}</p>
                </div>

                <Link href="/internship" className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors group">
                  View matching internships <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {!result && !loading && (
              <ErrorCard
                title="No calculation yet"
                message="Fill in your profile details and click Calculate Gravity to see your orbit."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
