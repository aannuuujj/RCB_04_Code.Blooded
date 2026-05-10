import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-white opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 z-10 drop-shadow-sm">
          Career Copilot<span className="text-brand-gray">.</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-brand-gray mb-12 max-w-3xl font-medium leading-relaxed z-10">
          Your AI-powered career partner. <br className="hidden md:block"/> Upload your resume, ace mock interviews, and land your dream job faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 z-10">
          <Link 
            href="/resume"
            className="px-10 py-5 bg-brand-white text-brand-black font-bold text-lg rounded-full hover:bg-brand-light transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Upload Resume
          </Link>
          <Link 
            href="/interview"
            className="px-10 py-5 bg-[#111] text-brand-white border border-brand-gray font-bold text-lg rounded-full hover:border-brand-white transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            Start Mock Interview
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-8 py-24 border-t border-brand-gray/30">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Supercharge your workflow.</h2>
          <p className="text-xl text-brand-gray max-w-2xl">Everything you need to bypass ATS systems and impress engineering managers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Resume Analysis" 
            description="Get instant AI feedback on your resume format, keywords, and ATS score." 
            href="/resume"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
          />
          <FeatureCard 
            title="Internship Matching" 
            description="Find roles tailored to your exact tech stack and skill profile." 
            href="/internships"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
          />
          <FeatureCard 
            title="Mock Interviews" 
            description="Practice technical questions with our AI interviewer and get instant grading." 
            href="/interview"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>}
          />
          <FeatureCard 
            title="Gravity Score" 
            description="Track your overall readiness and see how you stack up against top candidates." 
            href="/internships"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
          />
        </div>
      </section>
    </div>
  );
}