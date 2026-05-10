import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-brand-gray bg-brand-black/95 backdrop-blur-sm">
      <Link href="/" className="text-xl font-bold tracking-tight text-brand-white flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        AI Career Copilot
      </Link>
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Home</Link>
        <Link href="/resume" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Resume</Link>
        <Link href="/interview" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Interview</Link>
        <Link href="/dashboard" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider">Dashboard</Link>
        <Link href="/gravity" className="text-brand-gray hover:text-brand-white transition-colors text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
            Gravity Score
        </Link>
      </nav>
    </header>
  );
}
