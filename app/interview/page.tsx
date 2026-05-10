"use client";

import { useState } from "react";
import ScoreRing from "@/components/ScoreRing";
import SkillTag from "@/components/SkillTag";
import SectionCard from "@/components/SectionCard";
import LoadingDots from "@/components/LoadingDots";

type FinalReport = {
  session_score: number;
  weak_areas: string[];
  strong_areas: string[];
  top_tip: string;
};

type FeedbackData = {
  score: string | number;
  feedback: string;
};

export default function MockInterviewPage() {
  const [step, setStep] = useState<"setup" | "interview" | "feedback" | "report">("setup");
  
  const [role, setRole] = useState("Frontend");
  const [companyType, setCompanyType] = useState("Big Tech");
  
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [nextQuestion, setNextQuestion] = useState("");
  const [report, setReport] = useState<FinalReport | null>(null);

  const startInterview = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company_type: companyType }),
      });
      if (!res.ok) throw new Error("Failed to start interview. Ensure API is running.");
      
      const data = await res.json();
      setCurrentQuestion(data.question);
      setQuestionNumber(1);
      setStep("interview");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: currentQuestion, 
          answer, 
          question_number: questionNumber 
        }),
      });
      if (!res.ok) throw new Error("Failed to submit answer. Ensure API is running.");
      
      const data = await res.json();
      
      setFeedback({ score: data.score, feedback: data.feedback });
      
      if (questionNumber < 5) {
        setNextQuestion(data.next_question);
        setStep("feedback");
      } else {
        setReport(data.final_report);
        setStep("feedback");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (questionNumber < 5) {
      setCurrentQuestion(nextQuestion);
      setAnswer("");
      setFeedback(null);
      setQuestionNumber(prev => prev + 1);
      setStep("interview");
    } else {
      setStep("report");
    }
  };

  const resetInterview = () => {
    setStep("setup");
    setRole("Frontend");
    setCompanyType("Big Tech");
    setQuestionNumber(1);
    setCurrentQuestion("");
    setAnswer("");
    setFeedback(null);
    setNextQuestion("");
    setReport(null);
    setError("");
  };

  if (step === "setup") {
    return (
      <div className="flex-1 flex flex-col items-center py-16 px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight">Mock Interview Setup</h1>
        <p className="text-brand-gray text-lg mb-10 text-center">Configure your AI interviewer parameters.</p>
        <div className="w-full max-w-md flex flex-col gap-8 bg-[#111] p-8 md:p-10 border border-brand-gray/50 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-3">
            <label className="text-brand-gray text-xs uppercase tracking-widest font-bold ml-1">Select Target Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 bg-brand-black border border-brand-gray/50 text-brand-white rounded-xl focus:border-brand-white outline-none appearance-none cursor-pointer transition-colors"
            >
              <option>Frontend Engineer</option>
              <option>Backend Engineer</option>
              <option>Data Scientist</option>
              <option>Machine Learning</option>
              <option>DevOps Engineer</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="text-brand-gray text-xs uppercase tracking-widest font-bold ml-1">Company Tier</label>
            <select 
              value={companyType} 
              onChange={(e) => setCompanyType(e.target.value)}
              className="w-full p-4 bg-brand-black border border-brand-gray/50 text-brand-white rounded-xl focus:border-brand-white outline-none appearance-none cursor-pointer transition-colors"
            >
              <option>Startup</option>
              <option>Mid-size</option>
              <option>Big Tech (FAANG)</option>
            </select>
          </div>

          {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}

          <button 
            onClick={startInterview}
            disabled={isLoading}
            className="mt-6 w-full py-5 bg-brand-white text-brand-black font-bold text-lg rounded-full hover:bg-brand-light transition-all flex justify-center items-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <LoadingDots /> : "Start Interview Session"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "interview") {
    return (
      <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-brand-gray/30 pb-4">
            <p className="text-brand-gray font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-white animate-pulse"></span>
              Live Interview Session
            </p>
            <p className="text-brand-white font-bold bg-[#111] px-4 py-1.5 rounded-full border border-brand-gray/50 text-sm">Question {questionNumber} / 5</p>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-brand-white text-brand-black flex items-center justify-center font-bold flex-shrink-0 mt-1">AI</div>
            <div className="bg-[#111] border border-brand-gray/30 p-6 md:p-8 rounded-2xl rounded-tl-sm w-full relative">
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed">{currentQuestion}</h2>
            </div>
          </div>
          
          <div className="flex gap-4 items-start mt-4">
            <div className="w-full flex flex-col gap-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your response... (Speak clearly and structure your answer)"
                className="w-full h-64 p-6 md:p-8 bg-brand-black border border-brand-gray/50 rounded-2xl rounded-tr-sm text-brand-white text-lg resize-none focus:border-brand-white outline-none transition-colors"
              ></textarea>

              {error && <p className="text-red-500 font-bold text-sm text-right">{error}</p>}

              <button 
                onClick={submitAnswer}
                disabled={isLoading || !answer.trim()}
                className="self-end px-10 py-4 bg-brand-white text-brand-black font-bold text-lg rounded-full hover:bg-brand-light transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? <LoadingDots /> : "Submit Answer"}
              </button>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#333] text-brand-white flex items-center justify-center font-bold flex-shrink-0 mt-1 text-sm border border-brand-gray/50">You</div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "feedback") {
    return (
      <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-brand-gray/30 pb-4">
            <p className="text-brand-gray font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              Feedback Report
            </p>
            <p className="text-brand-white font-bold bg-[#111] px-4 py-1.5 rounded-full border border-brand-gray/50 text-sm">Question {questionNumber} / 5</p>
          </div>
          
          <SectionCard title="AI Evaluation">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-2">
              <div className="flex flex-col items-center justify-center p-8 bg-[#111] rounded-2xl border border-brand-gray/30 min-w-[180px]">
                <span className="text-sm text-brand-gray uppercase font-bold tracking-widest mb-3">Score</span>
                <span className="text-5xl font-bold tracking-tight">{feedback?.score}</span>
              </div>
              <div className="flex-1">
                <p className="text-brand-white text-lg leading-relaxed bg-[#111] p-6 rounded-2xl border border-brand-gray/30">{feedback?.feedback}</p>
              </div>
            </div>
          </SectionCard>
          
          <button 
            onClick={handleNext}
            className="self-end px-10 py-4 bg-brand-white text-brand-black font-bold text-lg rounded-full hover:bg-brand-light transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {questionNumber < 5 ? "Continue to Next Question" : "Generate Final Report"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "report") {
    return (
      <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Interview Complete</h1>
            <p className="text-brand-gray text-lg">Here is your comprehensive performance breakdown.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-[1] flex flex-col items-center justify-center bg-[#111] p-10 border border-brand-gray/50 rounded-2xl">
              <ScoreRing score={report?.session_score || 0} label="Final Score" />
            </div>

            <div className="flex-[2] flex flex-col gap-6">
              <SectionCard title="Strong Areas">
                <div className="flex flex-wrap gap-3 mt-2">
                  {report?.strong_areas?.map((area, i) => (
                    <SkillTag key={i} text={area} variant="match" />
                  ))}
                  {(!report?.strong_areas || report.strong_areas.length === 0) && <span className="text-brand-gray italic">None identified</span>}
                </div>
              </SectionCard>
              
              <SectionCard title="Areas to Improve">
                <div className="flex flex-wrap gap-3 mt-2">
                  {report?.weak_areas?.map((area, i) => (
                    <SkillTag key={i} text={area} variant="missing" />
                  ))}
                  {(!report?.weak_areas || report.weak_areas.length === 0) && <span className="text-brand-gray italic">None identified</span>}
                </div>
              </SectionCard>
            </div>
          </div>

          <div className="relative border border-brand-gray/50 p-10 rounded-2xl bg-[#111] overflow-hidden mt-4 group hover:border-brand-white transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-white"></div>
            <p className="text-brand-gray text-sm uppercase tracking-widest font-bold flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Top Tip for Next Time
            </p>
            <p className="text-2xl leading-relaxed font-medium text-brand-white">{report?.top_tip}</p>
          </div>
          
          <button 
            onClick={resetInterview}
            className="mt-8 self-center px-12 py-5 bg-transparent border-2 border-brand-white text-brand-white font-bold text-lg rounded-full hover:bg-brand-white hover:text-brand-black transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Another Session
          </button>
        </div>
      </div>
    );
  }

  return null;
}
