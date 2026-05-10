"use client";

import { useState } from "react";
import GravityOrbit from "@/components/GravityOrbit";
import LoadingDots from "@/components/LoadingDots";
import Link from "next/link";
import ErrorCard from "@/components/ErrorCard";

type GravityResult = {
  gravity_score: number;
  orbit_label: string;
  action: string;
  motivation_line: string;
};

export default function GravityPage() {
  const [resumeScore, setResumeScore] = useState(70);
  const [skillMatch, setSkillMatch] = useState(60);
  const [interviewAvg, setInterviewAvg] = useState(65);
  const [applicationsSent, setApplicationsSent] = useState(5);
  const [jobTitle, setJobTitle] = useState("Software Engineer");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GravityResult | null>(null);
  const [error, setError] = useState("");

  const calculateGravity = async () => {
    if (!jobTitle.trim()) {
      setError("Please enter a target job title.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gravity/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_score: resumeScore,
          skill_match_pct: skillMatch,
          interview_avg: interviewAvg,
          applications_sent: applicationsSent,
          job_title: jobTitle
        })
      });

      if (!res.ok) throw new Error("Failed to calculate Gravity Score. Ensure API is running.");
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateJobsForOrbit = (res: GravityResult) => {
    return [
      { title: jobTitle, gravity_score: res.gravity_score, orbit_label: res.orbit_label },
      { title: `Senior ${jobTitle}`, gravity_score: Math.max(0, res.gravity_score - 20), orbit_label: "Outer Orbit" },
      { title: `Junior ${jobTitle}`, gravity_score: Math.min(100, res.gravity_score + 15), orbit_label: "Closer Orbit" },
      { title: "Adjacent Role", gravity_score: Math.max(0, res.gravity_score - 10), orbit_label: "Nearby Orbit" }
    ];
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 w-full min-h-screen bg-black text-white">
      <div className="w-full max-w-6xl flex flex-col items-center z-10">
        <div className="text-center mb-10 w-full relative">
           <Link href="/dashboard" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Gravity Score
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mt-4">
            Calculate your career gravity. Adjust your metrics to see how strong your pull is towards your dream roles.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-xl flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b border-gray-800 pb-4">Metrics Input</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Target Job Title</label>
              <input 
                type="text" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="p-3 bg-black border border-gray-800 rounded-xl text-white focus:outline-none focus:border-white transition-colors"
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                <label>Resume Score</label>
                <span className="text-white">{resumeScore}</span>
              </div>
              <input type="range" min="0" max="100" value={resumeScore} onChange={(e) => setResumeScore(Number(e.target.value))} className="w-full accent-white cursor-pointer" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                <label>Skill Match %</label>
                <span className="text-white">{skillMatch}%</span>
              </div>
              <input type="range" min="0" max="100" value={skillMatch} onChange={(e) => setSkillMatch(Number(e.target.value))} className="w-full accent-white cursor-pointer" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                <label>Interview Avg</label>
                <span className="text-white">{interviewAvg}/100</span>
              </div>
              <input type="range" min="0" max="100" value={interviewAvg} onChange={(e) => setInterviewAvg(Number(e.target.value))} className="w-full accent-white cursor-pointer" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                <label>Applications Sent</label>
                <span className="text-white">{applicationsSent}</span>
              </div>
              <input type="range" min="0" max="50" value={applicationsSent} onChange={(e) => setApplicationsSent(Number(e.target.value))} className="w-full accent-white cursor-pointer" />
            </div>

            {error && <ErrorCard message={error} />}

            <button 
              onClick={calculateGravity}
              disabled={isLoading}
              className="mt-6 w-full py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all flex justify-center items-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? <LoadingDots /> : "Calculate Gravity"}
            </button>
          </div>

          {/* Visualization Panel */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {result && !isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 text-center flex flex-col items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gravity Score</span>
                    <span className="text-5xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{result.gravity_score}</span>
                  </div>
                  <div className="md:col-span-2 bg-[#111] p-6 rounded-2xl border border-gray-800 flex flex-col justify-center gap-3 shadow-lg">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{result.orbit_label}</span>
                    </div>
                    <p className="text-white font-medium text-lg">{result.motivation_line}</p>
                    <p className="text-gray-400 text-sm mt-1"><span className="font-bold text-white">Next Action:</span> {result.action}</p>
                  </div>
                </div>
                <GravityOrbit jobs={generateJobsForOrbit(result)} />
              </>
            ) : (
              <div className="w-full h-[600px] bg-[#111] border border-dashed border-gray-800 rounded-3xl flex items-center justify-center shadow-lg">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-bold tracking-widest uppercase">Calculating Orbital Mass...</p>
                  </div>
                ) : (
                  <p className="text-gray-400 font-medium text-lg">Enter your metrics and calculate your gravity to visualize your orbit.</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
