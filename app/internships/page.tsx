"use client";

import { useState } from "react";
import { useCareerStore } from "@/lib/store";
import SkillTag from "@/components/SkillTag";
import LoadingDots from "@/components/LoadingDots";

const jobs = [
  { id: 1, title: 'Frontend Intern', company: 'Google', description: 'React, TypeScript, CSS' },
  { id: 2, title: 'ML Intern', company: 'OpenAI', description: 'Python, PyTorch, NLP' },
  { id: 3, title: 'Backend Intern', company: 'Stripe', description: 'Node.js, PostgreSQL, APIs' },
  { id: 4, title: 'Data Intern', company: 'Netflix', description: 'SQL, Python, Tableau' },
  { id: 5, title: 'DevOps Intern', company: 'AWS', description: 'Docker, CI/CD, Linux' },
  { id: 6, title: 'iOS Intern', company: 'Apple', description: 'Swift, Xcode, UIKit' },
];

type MatchResult = {
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  recommendation: "Apply Now" | "Upskill First" | "Reach Goal" | string;
};

function JobCard({ job }: { job: typeof jobs[0] }) {
  const skills = useCareerStore((state) => state.skills);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/internship/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.length > 0 ? skills : ["React", "Python", "JavaScript"], // Using Zustand store or fallback
          description: job.description
        })
      });
      
      if (!res.ok) throw new Error("Failed to match. Ensure API is running.");
      
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-brand-gray p-6 rounded-xl flex flex-col bg-[#111] hover:border-brand-white transition-colors duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-brand-gray text-lg">{job.company}</p>
        </div>
      </div>
      
      <p className="text-brand-light mb-6 flex-1 text-sm mt-2">{job.description}</p>
      
      {!result && !isLoading && !error && (
        <button 
          onClick={handleMatch}
          className="w-full py-3 bg-brand-white text-brand-black font-bold rounded hover:bg-brand-light transition-colors"
        >
          Check Match
        </button>
      )}

      {isLoading && (
        <div className="w-full flex justify-center py-2">
          <LoadingDots />
        </div>
      )}

      {error && <p className="text-red-500 font-semibold text-sm mt-2 text-center">{error}</p>}

      {result && !isLoading && (
        <div className="mt-2 pt-6 border-t border-brand-gray/50 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-brand-gray text-xs uppercase tracking-widest font-bold">Match Score</span>
            <span className="text-3xl font-bold">{result.match_percentage}%</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs text-brand-gray uppercase tracking-widest font-bold">Matched Skills</span>
            <div className="flex flex-wrap gap-2">
              {result.matched_skills.map((s, i) => (
                <SkillTag key={i} text={s} variant="match" />
              ))}
              {result.matched_skills.length === 0 && <span className="text-xs text-brand-gray italic">None</span>}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs text-brand-gray uppercase tracking-widest font-bold">Missing Skills</span>
            <div className="flex flex-wrap gap-2">
              {result.missing_skills.map((s, i) => (
                <SkillTag key={i} text={s} variant="missing" />
              ))}
              {result.missing_skills.length === 0 && <span className="text-xs text-brand-gray italic">None</span>}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-brand-gray/50">
            {result.recommendation === "Apply Now" && (
              <div className="w-full text-center py-3 bg-brand-white text-brand-black font-bold rounded text-sm tracking-wide">
                Apply Now
              </div>
            )}
            {result.recommendation === "Upskill First" && (
              <div className="w-full text-center py-3 bg-[#222] text-brand-gray font-bold rounded text-sm border border-brand-gray tracking-wide">
                Upskill First
              </div>
            )}
            {result.recommendation === "Reach Goal" && (
              <div className="w-full text-center py-3 bg-transparent text-brand-white font-bold rounded text-sm border border-brand-white tracking-wide">
                Reach Goal
              </div>
            )}
            
            {/* Fallback for any other string */}
            {!["Apply Now", "Upskill First", "Reach Goal"].includes(result.recommendation) && (
              <div className="w-full text-center py-3 bg-[#222] text-brand-white font-bold rounded text-sm border border-brand-gray tracking-wide">
                {result.recommendation}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InternshipsPage() {
  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center md:text-left border-b border-brand-gray pb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Internship Feed</h1>
          <p className="text-brand-light text-lg max-w-2xl">
            Discover internships curated for your skill profile. Check your match percentage against real job requirements.
          </p>
        </div>
        
        {/* 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
