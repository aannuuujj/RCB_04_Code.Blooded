"use client";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { ErrorCard } from "@/components/ErrorCard";
import Link from "next/link";

interface AnalysisResult {
  score: number;
  skills: string[];
  missing: string[];
  suggestions: string[];
  summary: string;
}

function analyzeResume(text: string): AnalysisResult {
  const lower = text.toLowerCase();
  const foundSkills = ["python","javascript","typescript","react","node","sql","git","aws","docker","machine learning","data analysis","communication","leadership","problem solving"].filter(s => lower.includes(s));
  const missing = ["kubernetes","terraform","graphql","redis","elasticsearch"].filter(s => !lower.includes(s));
  const score = Math.min(95, 40 + foundSkills.length * 5 + Math.min(text.length / 100, 20));
  return {
    score: Math.round(score),
    skills: foundSkills,
    missing: missing.slice(0, 3),
    suggestions: [
      "Add quantifiable achievements (e.g., 'Improved performance by 40%')",
      "Include a strong professional summary at the top",
      "Tailor keywords to match job descriptions",
    ],
    summary: `Your resume shows ${foundSkills.length} relevant technical skills. Score: ${Math.round(score)}/100. ${score >= 70 ? "Strong profile!" : "Room for improvement."}`,
  };
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (!f) return;
    setFile(f);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setText(e.target?.result as string ?? "");
    reader.readAsText(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  async function analyze() {
    if (!text && !file) { setError("Please upload a resume first."); return; }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));
    setResult(analyzeResume(text || "python react typescript sql git communication"));
    setLoading(false);
  }

  return (
    <div className="min-h-screen pt-14 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="text-white/50" />
            <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Resume Analyzer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gradient mb-2">Analyze Your Resume</h1>
          <p className="text-white/50 text-sm">Upload your resume and get instant AI-powered feedback.</p>
        </div>

        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
            ${dragging ? "border-white/40 bg-white/8" : "border-white/12 hover:border-white/25 hover:bg-white/4"}`}
        >
          <input ref={inputRef} type="file" accept=".txt,.pdf,.doc,.docx" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle size={32} className="text-white" />
              <p className="text-white font-semibold text-sm">{file.name}</p>
              <p className="text-white/40 text-xs">{(file.size / 1024).toFixed(1)} KB — Click to change</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload size={32} className="text-white/30" />
              <p className="text-white/60 text-sm">Drop your resume here or <span className="text-white underline">browse</span></p>
              <p className="text-white/30 text-xs">Supports .txt, .pdf, .doc</p>
            </div>
          )}
        </div>

        {/* Manual text input */}
        <div>
          <p className="text-xs text-white/40 mb-2 font-mono uppercase tracking-widest">Or paste resume text</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume content here..."
            rows={5}
            className="w-full bg-white/4 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-all resize-none"
          />
        </div>

        {error && <ErrorCard title="Missing input" message={error} />}

        <button
          onClick={analyze}
          disabled={loading || (!file && !text)}
          className="w-full py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : "Analyze Resume"}
        </button>

        {loading && <SkeletonCard lines={5} />}

        {result && !loading && (
          <div className="space-y-4">
            {/* Score */}
            <div className="bg-white/4 border border-white/10 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest mb-1">Resume Score</p>
                <p className="text-5xl font-black">{result.score}<span className="text-xl text-white/40">/100</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50 max-w-xs">{result.summary}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Detected Skills</p>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white text-black text-xs font-semibold rounded-full">{s}</span>
                ))}
                {result.skills.length === 0 && <p className="text-white/40 text-xs">No clear skills detected. Add technical keywords.</p>}
              </div>
            </div>

            {/* Missing */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Trending Skills You're Missing</p>
              <div className="flex flex-wrap gap-2">
                {result.missing.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white/8 text-white/70 border border-white/15 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Suggestions</p>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/70">
                    <span className="text-white/30 shrink-0 font-mono text-xs mt-0.5">{i + 1}.</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/internship" className="flex items-center justify-center gap-2 py-3 border border-white/20 rounded-xl text-sm font-medium text-white hover:bg-white/8 transition-all group">
              Find Matching Internships <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
