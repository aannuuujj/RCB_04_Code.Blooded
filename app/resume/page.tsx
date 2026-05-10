"use client";

import { useState, useRef } from "react";
import { useCareerStore } from "@/lib/store";
import ScoreRing from "@/components/ScoreRing";
import SectionCard from "@/components/SectionCard";
import StatCard from "@/components/StatCard";
import LoadingDots from "@/components/LoadingDots";
import { useSession } from "next-auth/react";
import { saveResume } from "@/lib/actions/saveResume";

// Types matching the expected API response
type AnalysisResult = {
  overall_score: number;
  scores: {
    skills: number;
    experience: number;
    format: number;
    keywords: number;
  };
  top_3_improvements: string[];
  ats_friendly: boolean;
  ai_rewrites: string[];
  extracted_skills?: string[];
};

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setResumeData = useCareerStore((state) => state.setResumeData);
  const { data: session } = useSession();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please upload a valid PDF file.");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Upload PDF
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadRes = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!uploadRes.ok) throw new Error("Failed to upload resume. Ensure API is running.");
      
      const uploadData = await uploadRes.json();
      const resumeText = uploadData.resume_text;

      // 2. Analyze Resume Text
      const analyzeRes = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          target_role: targetRole,
        }),
      });

      if (!analyzeRes.ok) throw new Error("Failed to analyze resume. Ensure API is running.");

      const analysisData = await analyzeRes.json();
      setResult(analysisData);
      
      // Store in Zustand
      setResumeData(
        resumeText, 
        analysisData.overall_score, 
        analysisData.extracted_skills || []
      );

      // Save to Supabase
      if (session?.user?.email) {
        const formDataToSave = new FormData();
        formDataToSave.append("email", session.user.email);
        formDataToSave.append("scores", JSON.stringify(analysisData));
        formDataToSave.append("file", file);
        
        const saveRes = await saveResume(formDataToSave);
        if (!saveRes.success) {
          console.error("Failed to save resume to Supabase:", saveRes.error);
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
      <h1 className="text-4xl font-bold mb-8">Resume Analyzer</h1>
      
      {!result ? (
        <div className="w-full max-w-xl flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-brand-light font-semibold text-sm">Target Role</label>
            <input 
              type="text" 
              placeholder="e.g. Software Engineer (Optional)" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 bg-brand-black border border-brand-gray text-brand-white rounded focus:outline-none focus:border-brand-white transition-colors"
            />
          </div>

          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-12 border-2 border-dashed border-brand-gray/50 bg-[#111] rounded-2xl cursor-pointer flex flex-col items-center justify-center hover:border-brand-white transition-all group min-h-[300px] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
          >
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            {file ? (
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 mb-4 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="text-xl font-semibold text-brand-white">{file.name}</p>
                <p className="text-brand-gray mt-2 text-sm">Click to change file</p>
              </div>
            ) : (
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <svg className="w-16 h-16 mb-6 text-brand-gray group-hover:text-brand-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                <p className="text-brand-white text-center text-xl font-bold mb-2">Drag & Drop your Resume PDF</p>
                <p className="text-brand-gray text-center text-sm">or click anywhere to browse files</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {file && (
            <button 
              onClick={handleAnalyze}
              disabled={isLoading}
              className="px-8 py-5 mt-4 bg-brand-white text-brand-black font-bold rounded-full hover:bg-brand-light transition-all w-full flex justify-center items-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-80 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <LoadingDots />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                "Analyze My Resume"
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-10">
          
          <div className="flex items-center justify-between border-b border-brand-gray pb-6">
            <div>
              <h2 className="text-3xl font-bold">Analysis Results</h2>
              <p className="text-brand-gray mt-2 text-lg">Target Role: <span className="text-brand-white">{targetRole || "General"}</span></p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-brand-gray text-sm uppercase tracking-wider font-bold mb-1">ATS Friendly</span>
              {result.ats_friendly ? (
                <div className="flex items-center gap-2 bg-green-900/30 text-green-400 px-4 py-2 rounded-full border border-green-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  <span className="font-bold">Passed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-900/30 text-red-400 px-4 py-2 rounded-full border border-red-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span className="font-bold">Failed</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-[1] flex flex-col items-center justify-center bg-[#111] p-10 border border-brand-gray rounded-xl">
              <ScoreRing score={result.overall_score} label="Overall Score" />
            </div>

            <div className="flex-[2] grid grid-cols-2 gap-4">
              <StatCard title="Skills Match" value={result.scores.skills} />
              <StatCard title="Experience" value={result.scores.experience} />
              <StatCard title="Formatting" value={result.scores.format} />
              <StatCard title="Keywords" value={result.scores.keywords} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <SectionCard title="Top 3 Improvements">
              <ul className="space-y-4 mt-2">
                {result.top_3_improvements.map((improvement, i) => (
                  <li key={i} className="flex gap-4 items-start bg-brand-black p-4 rounded-xl border border-brand-gray/30">
                    <span className="text-brand-gray font-bold text-xl">{i + 1}.</span>
                    <span className="text-brand-light text-base leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="AI Rewrites">
              <ul className="space-y-4 mt-2">
                {result.ai_rewrites.map((rewrite, i) => (
                  <li key={i} className="flex gap-4 items-start bg-brand-black p-4 rounded-xl border border-brand-gray/30">
                    <svg className="w-6 h-6 text-brand-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-brand-light text-base leading-relaxed">{rewrite}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                setResult(null);
                setFile(null);
              }}
              className="px-8 py-4 border-2 border-brand-white text-brand-white font-bold rounded hover:bg-brand-white hover:text-brand-black transition-colors"
            >
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
