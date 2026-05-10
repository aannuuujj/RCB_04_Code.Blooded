import Link from "next/link";
import { Zap, FileText, Briefcase, Mic, Orbit, BarChart2, ArrowRight, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "Instant AI feedback on your resume. Skills detected, gaps found, improvements suggested.",
    href: "/resume",
    badge: "AI-Powered",
  },
  {
    icon: Briefcase,
    title: "Internship Matching",
    desc: "Browse AI-ranked internships based on your profile match percentage.",
    href: "/internship",
    badge: "Smart Ranking",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    desc: "Practice with curated questions and get scored feedback. Voice input supported.",
    href: "/interview",
    badge: "Voice Ready",
  },
  {
    icon: Orbit,
    title: "Gravity Score",
    desc: "Our signature visual. See how close jobs orbit you based on your profile strength.",
    href: "/gravity",
    badge: "★ Signature",
  },
  {
    icon: BarChart2,
    title: "Career Dashboard",
    desc: "Track your resume score, gravity, interview performance, and growth over time.",
    href: "/dashboard",
    badge: "Progress Tracking",
  },
];

const FLOW = [
  { step: "01", label: "Upload Resume", href: "/resume" },
  { step: "02", label: "Analyze Skills", href: "/resume" },
  { step: "03", label: "Browse Matches", href: "/internship" },
  { step: "04", label: "Mock Interview", href: "/interview" },
  { step: "05", label: "Gravity Score", href: "/gravity" },
  { step: "06", label: "Track Growth", href: "/dashboard" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-14 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/12 bg-white/4 text-xs text-white/60 font-mono">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            AI Career Copilot · Hackathon Edition
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Your Career,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #fff 0%, #999 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Supercharged.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Resume analysis, internship matching, mock interviews, and our signature{" "}
              <span className="text-white font-semibold">Gravity Score</span> — all in one AI-powered platform.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/resume"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              <Zap size={16} /> Get Started Free
            </Link>
            <Link
              href="/gravity"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium text-sm rounded-xl hover:bg-white/6 transition-all"
            >
              <Orbit size={16} /> See Gravity Score
            </Link>
          </div>

          {/* Scroll hint */}
          <p className="text-xs text-white/20 font-mono">scroll to explore ↓</p>
        </div>
      </section>

      {/* Demo Flow */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-xs text-white/30 font-mono uppercase tracking-widest text-center mb-10">How it works</p>
        <div className="flex flex-wrap justify-center gap-2 items-center">
          {FLOW.map((f, i) => (
            <div key={f.step} className="flex items-center gap-2">
              <Link
                href={f.href}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/20 hover:bg-white/7 transition-all"
              >
                <span className="text-white/30 font-mono text-xs">{f.step}</span>
                {f.label}
              </Link>
              {i < FLOW.length - 1 && <ChevronRight size={14} className="text-white/20 hidden sm:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-10 pb-24">
        <p className="text-xs text-white/30 font-mono uppercase tracking-widest text-center mb-10">Features</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:bg-white/6 hover:border-white/18 transition-all group block space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center">
                  <f.icon size={16} className="text-white/70" />
                </div>
                <span className="text-xs px-2 py-0.5 bg-white/6 border border-white/10 rounded-full text-white/50">{f.badge}</span>
              </div>
              <div>
                <h2 className="font-semibold text-white text-sm mb-1">{f.title}</h2>
                <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
